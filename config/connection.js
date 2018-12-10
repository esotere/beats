// Set up MySQL connection.
let mySql = require("mysql");
let mongojs = require("mongojs");
let mongoose = require("mongoose");


let connection = mySql.createConnection({
  host: "localhost",
  port: 3306 || process.env.DATABASE_URL,
  user: "root",
  password: "2823",
  database: "music"
}); 

let connex = mySql.createPool({
  connectionLimit : 10,
  host: "us-cdbr-iron-east-01.cleardb.net",
  port: 3306 || process.env.DATABASE_URL,
  user: "b8f110d168277b",
  password: "7943e50b",
  database: "heroku_97cebdf044d1a55"
});

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/music")
let db = mongoose.connection


// Database configuration
// Save the URL of our database as well as the name of our collection
let databaseUrl = "music";
let collections = ["beats"];

// Use mongojs to hook the database to the db variable
let db2 = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

db2.on("error", function(error) {
  console.log("Database Error:", error);
});

// let connection2 = mySql.createConnection({
//   host: "localhost",
//   port: 3306 || process.env.PORT,
//   user: "root",
//   password: "2823",
//   database: "profile"
// });

// let db_connect = mySql.createConnection({
//   host: "us-cdbr-iron-east-01.cleardb.net",
//   port: process.env.DATABASE_URL,
//   user: "bf9e08609b0e0f",
//   password: "2823",
//   database: "profile"
// });

// let db_connect = mySql.createConnection({
//     host: "localhost",
//     port: 3306 || process.env.DATABASE_URL,
//     user: "bf9e08609b0e0f",
//     password: "2823",
//     database: "music"
//   });

// let db_connect2 = mySql.createConnection({
//     host: "localhost",
//     port: 3306 || process.env.DATABASE_URL,
//     user: "bf9e08609b0e0f",
//     password: "2823",
//     database: "profile"
//   });

  
//   let pool = mySql.createPool({
//     connectionLimit : 10,
//     host            : process.env.MYSQL_HOST,
//     user            : process.env.MYSQL_USER,
//     password        : process.env.MYSQL_SECRET,
//     database        : process.env.MYSQL_DB,
//     port            : process.env.DATABASE_URL,
//     // ssl             : "Amazon RDS",
// })
  
// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// connection2.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

// db_connect.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

// db_connect2.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });


// pool.getConnection(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

// db_connect.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

// db_connect2.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

// db_connect.query("SELECT * FROM Beats", function (err, result) {
//   if (err) throw err;
//   let sound =[];
//   for (let i = 0; i < result.length; i++) {
//       const element = result[i];
//       sound.push(element)
//       console.log(JSON.stringify(element))
//      }
//   })


// let populate = () => {
//   connection.query("SELECT * FROM Beats", function (err, result) {
//       if (err) throw err;
//       let sound =[];
//       for (let i = 0; i < result.length; i++) {
//           const element = result[i];
//           sound.push(element)
//           console.log(JSON.stringify(element))
          
//       }

//   })
// }
// populate();

// Export connection for our ORM to use.
// module.exports =  connection;
// module.exports = {
//   url: 'mongodb://localhost:27017/music'
// }

module.exports = {
  connection: connection,
  url: 'mongodb://localhost:27017/music'
}
