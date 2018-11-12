let express = require("express");
let path = require("path")
let router = express.Router();

// Import the model (beat.js) to use its database functions.
let beat = require("../models/beat.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  beat.all(function(data) {
    let hbsObject = {
      beats: data
    };
    console.log(hbsObject);
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
});

module.exports = router;