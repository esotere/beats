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
router.get("/landing", function(req, res) {
  beat.all(function(data) {
    let hbsObject = {
      beats: data
    };
    console.log(hbsObject);
    res.sendFile(path.join(__dirname, "../public/landing.html"));
  });
});

router.get("/catalog", function(req, res) {
  beat.all(function(data) {
    let hbsObject = {
      beats: data
    };
    console.log(hbsObject);
    // res.json(hbsObject);
    res.sendFile(path.join(__dirname, "../public/catalog.html"));
  });
});

router.get("/contact", function(req, res) {
  beat.all(function(data) {
    let hbsObject = {
      beats: data
    };
    console.log(hbsObject);
    // res.json(hbsObject);
    res.sendFile(path.join(__dirname, "../public/contact.html"));
  });
});

router.get("/api/beats", function(req, res) {
  beat.all(function(data) {
    let hbsObject = {
      beats: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
    // res.sendFile(path.join(__dirname, "../public/catalog.html"));
  });
});

router.post("/api/beats", function(req, res) {
  // console.log(req)
  // console.log(req.body)
  beat.create([
    "beat_name", "producer_name","source"
  ], [
    req.body.beat_name, req.body.producer_name, req.body.file_source
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/beats/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  console.log("condition", condition);

  beat.update({
    triumph: req.body.triumph
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/beats/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  beat.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
