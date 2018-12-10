// let mySql = require("mysql");
// let fs = require("fs");
// let http = require("http");
let express = require("express");
let bodyParser = require("body-parser");
// Initialize Express
let app = express();
let connect = require("connect")
// let path = require("path");
// let db = require("../database");
let routes = require("./controllers/beatsController.js");
// let session = require("express-session");
// let mongojs = require("mongojs");




// // Database configuration
// // Save the URL of our database as well as the name of our collection
// let databaseUrl = "music";
// let collections = ["beats"];

// // Use mongojs to hook the database to the db variable
// let db = mongojs(databaseUrl, collections);

// // This makes sure that any errors are logged if mongodb runs into an issue
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });
// let WaveSurfer = require('wavesurfer.js');
// let TimelinePlugin = require('wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js');
// let MinimapPlugin = require('wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js');
 

// Requiring passport as we've configured it
// let passport = require("./config/passport.js");



// Define a port to listen for incoming requests
let PORT = process.env.PORT || 8080;


app.use(express.static(__dirname + "/public"))


// // Sets up the Express app to handle data parsing
// app.use(require('connect').bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type: "application/*+json"}));
app.use(bodyParser.raw({type:"application/*+json"}));
app.use(bodyParser.text({ type:"text/html"}));
// app.use(bodyParser);

// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());


// app.use(WaveSurfer());
// app.use(passport.session());


app.use(routes);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "Access-Control-Allow-Origin: http://localhost:8080");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




// // Basic route that sends the user to the Page
// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "./public/landing.html"));
// });

// // Basic route that sends the user first to the Page
// app.get("/landing", function(req, res) {
//     res.sendFile(path.join(__dirname, "./public/landing.html"));
// });

// app.get("/catalog", function(req, res) {
//     res.sendFile(path.join(__dirname, "./public/catalog.html"));
// });

// app.get("/contact", function(req, res) {
//     res.sendFile(path.join(__dirname, "./public/contact.html"));
// });

app.listen(PORT, function() {

  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});


// var express = require("express");
// var bodyParser = require("body-parser");

// var PORT = process.env.PORT || 8080;

// var app = express();

// // Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static("public"));

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// // parse application/json
// app.use(bodyParser.json());

// // Set Handlebars.
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// // Import routes and give the server access to them.
// var routes = require("./controllers/catsController.js");

// app.use(routes);

// // Start our server so that it can begin listening to client requests.
// app.listen(PORT, function() {
//   // Log (server-side) when our server has started
//   console.log("Server listening on: http://localhost:" + PORT);
// });
