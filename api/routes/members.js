import mysql from "mysql";
import { Router } from "express";

const router = Router();

/* GET members latest file uploads */
router.get("/uploads", async (req, res, next) => {
  const league = req.query.league;

  if (!league || !["college", "pro"].includes(league)) {
    res
      .status(400)
      .send("The query league is required and must be 'pro' or 'college'.");
    return;
  }

  const cmsResponse = await fetch(`${process.env.CMS_URL}/${league}-info`);

  if (!cmsResponse.ok) throw new Error(cmsResponse.statusText);

  const leagueInfo = await cmsResponse.json();
  const teams = leagueInfo.data.attributes.teams;

  console.log(teams);

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "averyinc_siba",
  });

  connection.connect();

  connection.query(
    `SELECT * FROM ${league}_team_uploads ORDER BY teamID`,
    function (error, results) {
      if (error) {
        next(error);
      }

      console.log(results);
    }
  );

  connection.end();

  res.end();
});

export default router;
