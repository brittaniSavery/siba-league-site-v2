import { Router } from "express";

const router = Router();

/* GET api information */
router.get("/", (req, res, next) => {
  res.send(`This will almost be like a README.md for the api.`);
});

export default router;
