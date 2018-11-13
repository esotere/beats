let express = require("express");
let path = require("path")
let router = express.Router();

// Import the model (login.js) to use its database functions.
// let login = require("../models/login.js");

// Create all our routes and set up logic within those routes where required.
router2.get("/login", function(req, res) {
  if (req.user) {
    res.redirect("/members");
  }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });


module.exports = router;