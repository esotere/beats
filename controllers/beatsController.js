let express = require("express");
let path = require("path")
let router = express.Router();

// Import the model (beat.js) to use its database functions.
let beat = require("../models/beat.js");
let isAuthenticated = require("../config/middleware/isAuthenticated");


// Requiring our models and passport as we've configured it
let db = require("../models/login.js");
let passport = require("../config/passport");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  if (req.user) {
    res.redirect("/landing");
  }
   
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });



router.get("/login", function(req, res) {
  // If the user already has an account send them to the landing page
  if (req.user) {
    res.redirect("/landing");
  }
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/members", isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, "../public/landing.html"));
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




// define a route music it creates readstream to the requested file and pipes the output to response

router.get('/music', function(req,res){
	
	var fileId = req.query.id; 
	var file = __dirname + '/music/' + fileId;
	fs.exists(file,function(exists){
		if(exists)
		{
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}
	
	});
});

// following is the code for downloading music files, note that the code remains same except that we add 2 headers viz
// Content-disposition and Content-Type which forces the chrome browser to force download rather than playing the media
// Note that the following is tested with google chrome and it may work differently in Mozilla and Opera based on your 
// installed plugins.

router.get('/download', function(req,res){
	var fileId = req.query.id;
	var file = __dirname + '/music/' + fileId;
	fs.exists(file,function(exists){
		if(exists)
		{
			res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
			res.setHeader('Content-Type', 'application/audio/mpeg3')
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}
	});
});




router.get("/contact", isAuthenticated, function(req, res) {
  beat.all(function(data) {
    let hbsObject = {
      beats: data
    };
    console.log(hbsObject);
    // res.json(hbsObject);
    res.sendFile(path.join(__dirname, "../public/contact.html"));
  });
});

router.get("/api/music", function(req, res) {
  beat.all(function(data) {
    let hbsObject = {
      beats: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
    // res.sendFile(path.join(__dirname, "../public/catalog.html"));
  });
});

router.post("/api/music", function(req, res) {
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

router.put("/api/music/:id", function(req, res) {
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

router.delete("/api/music/:id", function(req, res) {
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




// Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  router.post("/api/music", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will hrouteren on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  router.post("/api/music", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  

  // Route for logging user out
  router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  router.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

// Export routes for server.js to use.
module.exports = router;
