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
    `SELECT * FROM ${league}_team_uploads ORDER BY teamID`
  );

  const uploads = {};
  dbUploads.forEach(({ teamID, fileType, latestUpload }) => {
    if (Object.hasOwn(uploads, teamID)) {
      const current = uploads[teamID];
      current[fileType] = latestUpload;
    } else {
      uploads[teamID] = { [fileType]: latestUpload };
    }
  });

  res.json(uploads);
});

export default router;
