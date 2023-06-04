import { Router } from "express";
import { fetchQuery } from "../utils.js";

const router = Router();

/* GET members latest file uploads */
router.get("/uploads", async (req, res, next) => {
  const league = req.query.league;

  if (!league || !["college", "pro"].includes(league)) {
    res
      .status(400)
      .send(
        'The query parameter "league" is required and must be "pro" or "college".'
      );
    return;
  }

  const dbUploads = await fetchQuery(
    `SELECT * FROM ${league}_team_uploads ORDER BY teamID, latestUpload DESC`
  );

  const uploads = [];
  let current = {};

  dbUploads.forEach(({ teamID, fileType, latestUpload }, i) => {
    if (Object.hasOwn(current, "id") && current.id === teamID) {
      current.uploads.push({
        fileType,
        latestUpload,
      });
    } else {
      current = {
        id: teamID,
        uploads: [
          {
            fileType,
            latestUpload,
          },
        ],
      };
      uploads.push(current);
    }
  });

  uploads.push(current);

  res.json(uploads);
});

export default router;
