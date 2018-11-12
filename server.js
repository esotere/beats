// let mySql = require("mysql");
// let fs = require("fs");
// let http = require("http");
let express = require("express");
let bodyParser = require("body-parser");
let app = express();
// let path = require("path");
// let db = require("../database");
let routes = require("./controllers/beatsController.js");



// Define a port to listen for incoming requests
let PORT = process.env.PORT || 8000;


app.use(express.static(__dirname + "/public"))


// // Sets up the Express app to handle data parsing
// app.use(require('connect').bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type: "application/*+json"}));
app.use(bodyParser.raw({type:"application/*+json"}));
app.use(bodyParser.text({ type:"text/html"}));
// app.use(jsonParser);

app.use(routes);




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
