let express = require("express");
let path = require("path")
let router = express.Router();
let fs = require("fs");

// Import the model (beat.js) to use its database functions.
let beat = require("../models/beat.js");
let db = require("../models/beatModel.js");
let buy = require("../models/purchaseModel.js");
// let BeatAlt = require('mongoose').model('BeatAlt')

// Requiring our models and passport as we've configured it
// let db = require("../models/login.js");
// let passport = require("../config/passport");
 

// router.get("/api/music", function(req, res) {
//   db.find({}, function(data) {
//     let trkObject = {
//       beats: data
//     };
//     console.log(trkObject);
//     res.json(trkObject);
//     // res.sendFile(path.join(__dirname, "../public/catalog.html"));
//   });
// });

router.get("/api/music", function(req, res) {
  db.find({}, (err, db) => {
    if(err){
        res.send(err);
    }
    res.json(db);
    // res.json();
    // res.sendFile(path.join(__dirname, "../public/catalog.html"));
  });
})



// Post a beat to the mongoose database
router.post("/api/music", (req,res) => {
              console.log(req.body);
              // console.log(req);

  
  // Save the request body as an object called track
  let track = { 
    // _id: req.body.id,
    beatName: req.body.beat_name,
    producer: req.body.producer_name,
    price: req.body.price,
    source: req.body.file_source,
  };
  console.log(track);
 
  db.create(track)
    .then(function(item) {
    // Show any errors
      // item = track;
      // console.log(item);
    }).catch(function(err) {
      console.log(err.message);
    });

  // db.BeatAlt.create([
  //   "beat_name", "producer_name", "price", "source"
  // ], [
  //   req.body.beat_name, req.body.producer_name, req.body.price, req.body.file_source
  // ], function(res) {
  //   // Send back the ID of the new quote
  //   res.json({ id: result.insertId });
  // });
  
  // let beatAlt = new BeatAlt({data: track});
  //   beatAlt.save(function (err) {
  //       if (err) { 
  //           console.log(err);
  //     }
  //     else {
  //       // Otherwise, send the response to the client (for AJAX success function)
  //       res.send(saved);
  //     }
  //   })

  // If we want the object to have a boolean value of false,
  // we have to do it here, because the ajax post will convert it
  // to a string instead of a boolean
  // beat.read = false;

  // Save the beat object as an entry into the beats collection in mongo
  // db.BeatAlt.save(track.name, track.producer, track.price, track.source).then(function(item) {
  //   // Show any errors
  //     // item = track;
  //     // console.log(item);
  //   }).catch(function(err) {
  //     console.log(err.message);
  //   });
  
    // else {
    //   // Otherwise, send the response to the client (for AJAX success function)
    //   res.send(saved);
    // }
 // });
});


// Fetch all Beats
// exports.findAll = (req, res) =>  {
// 	console.log("Fetch all Beats");
	
//     BeatAlt.find()
//     .then(beats => {
//         res.send(beats);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message
//         });
//     });
// };


// //Save a beat to MongoDB
// router.post('/api/music', BeatAlt.save);
 
// // Retrieve all beats
// router.get('/api/music/all', BeatAlt.findAll);

// router.use("/",router);

// router.use("*", (req,res) => {
// res.sendFile(path + "404.html");
// });






// Route for getting all beats from the db
router.get("/landing", function(req, res) {
  // Using our BeatAlt model, "find" every beat in our db
  db.find({}, (err, db) => {
    if(err){
        res.send(err);
    }
    res.json(db);
    // res.json();
    // res.sendFile(path.join(__dirname, "../public/catalog.html"));
  });
 
  // db.BeatAlt.find({})
  //   .then(function(beat) {
  //     // If any Beats are found, send them to the client
  //     res.json(beat);
  //   })
  //   .catch(function(err) {
  //     // If an error occurs, send it back to the client
  //     res.json(err);
  //   });
});







// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  beat.all(function(data) {
    let hbsObject = {
      beats: data
    };
    console.log(hbsObject);
    res.sendFile(path.join(__dirname, "../public/landing.html"));
    });
  });



// router.get("/login", function(req, res) {
//   // If the user already has an account send them to the members page
//   if (req.user) {
//     res.redirect("/members");
//   }
//   res.sendFile(path.join(__dirname, "../public/login.html"));
// });

// // Here we've add our isAuthenticated middleware to this route.
// // If a user who is not logged in tries to access this route they will be redirected to the signup page
// router.get("/members", isAuthenticated, function(req, res) {
//   res.sendFile(path.join(__dirname, "../public/members.html"));
// });

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

router.get("/api/music/purchase", function(req, res) {
  buy.find({}, (err, db) => {
    if(err){
      res.send(err);
  }
  res.json(db);
    // res.sendFile(path.join(__dirname, "../public/shoppingCart.html"));
  });
});

// Post a beat to the mongoose cart database
router.post("/api/music/purchase", (req,res) => {
  console.log(req.body);
  // console.log(req);

    // Save the request body as an object called track
    let track = { 
    // _id: req.body.id,
    beatName: req.body.beat_name,
    producer: req.body.producer_name,
    price: req.body.price,
    source: req.body.file_source,
    };
    console.log(track);

    buy.create(track)
       .then(function(item) {
      // Show any errors
      // item = track;
      // console.log(item);
      }).catch(function(err) {
    console.log(err.message);
    });

});










// define a route music it creates readstream to the requested file and pipes the output to response

router.get('/api/music/beatalts', function(req,res){

  console.log(req)
  // console.log(req)
  // console.log(req.url)

  // db.find({source: filename}, (err, db) => {
  //   if(err){
  //       res.send(err);
  //   }
  //   res.json(db);
  //   // res.json();
  //   // res.sendFile(path.join(__dirname, "../public/catalog.html"));
  // });
	
  let fileId = req.output; 
  // console.log(JSON.stringify(fileId))
  let filename = __dirname + '/api/music/beatalts/' + "AUD-20170805-WA0000.mp3";
  console.log(filename)

  // let readStream = fs.createReadStream(filename);

  // readStream.on('open', function () {
  //   // This just pipes the read stream to the response object (which goes to the client)
  //   readStream.pipe(res);
  // });

  // // This catches any errors that happen while creating the readable stream (usually invalid names)
  // readStream.on('error', function(err) {
  //   res.end(err);
  // });


	fs.exists(filename, function(exists){
		if(exists)
		{
			let rstream = fs.createReadStream(filename);
			rstream.pipe(res);
		}
		else
		{
			res.send(404, 'Sorry, cant find that');
			res.end();
		}
	
	});
});

// following is the code for downloading music files, note that the code remains same except that we add 2 headers viz
// Content-disposition and Content-Type which forces the chrome browser to force download rather than playing the media
// Note that the following is tested with google chrome and it may work differently in Mozilla and Opera based on your 
// installed plugins.

router.get('/download', function(req,res){
	let fileId = req.query.id;
	let file = __dirname + '/music/' + fileId;
	fs.exists(file,function(exists){
		if(exists)
		{
			res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
			res.setHeader('Content-Type', 'application/audio/mpeg3')
			let rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send(404, 'Sorry, cant find that');
			res.end();
		}
	});
});




router.get("/contact", function(req, res) {
  // beat.all(function(data) {
  //   let hbsObject = {
  //     beats: data
  //   };
  //   console.log(hbsObject);
    // res.json(hbsObject);
    res.sendFile(path.join(__dirname, "../public/contact.html"));
  // });
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
    "beat_name", "producer_name", "price", "source"
  ], [
    req.body.beat_name, req.body.producer_name, req.body.price, req.body.file_source
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




// // Using the passport.authenticate middleware with our local strategy.
//   // If the user has valid login credentials, send them to the members page.
//   // Otherwise the user will be sent an error
//   router.post("/api/login", passport.authenticate("local"), function(req, res) {
//     // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
//     // So we're sending the user back the route to the members page because the redirect will hrouteren on the front end
//     // They won't get this or even be able to access this page if they aren't authed
//     res.json("/members");
//   });

//   // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
//   // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
//   // otherwise send back an error
//   router.post("/api/signup", function(req, res) {
//     console.log(req.body);
//     db.User.create({
//       email: req.body.email,
//       password: req.body.password
//     }).then(function() {
//       res.redirect(307, "/api/login");
//     }).catch(function(err) {
//       console.log(err);
//       res.json(err);
//       // res.status(422).json(err.errors[0].message);
//     });
//   });

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
