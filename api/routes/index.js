var express = require("express");
var router = express.Router();

/* GET api information */
router.get("/", function (req, res, next) {
  res.send(`This will almost be like a README.md for the api.`);
});

module.exports = router;
