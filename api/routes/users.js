var express = require("express");
var router = express.Router();

/* GET members listing. */
router.get("/uploads", function (req, res, next) {
  res.send(
    "This will send back a json that contains the current human players and their latest file uploads."
  );
});

module.exports = router;
