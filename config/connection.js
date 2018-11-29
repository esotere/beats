// Set up MySQL connection.
let mySql = require("mysql");

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

let connection2 = mySql.createConnection({
  host: "z37udk8g6jiaqcbx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306 || process.env.JAWSDB_URL,
  user: "kg5nho8mdqkri9th",
  password: "yf6nwn8qb33urs68",
  database: "uaxmv188hre8n38t"
});

let connection3 = mySql.createPool({
  connectionLimit : 100,
  host : "us-cdbr-iron-east-01.cleardb.net",
  port:  3306 || process.env.DATABASE_URL,
  user : "bf9e08609b0e0f",
  password : "936b3524",
  database : 'heroku_37f45dbc402f94e',
  // debug : 'false'
});

// let connection3 = mySql.createConnection(process.env.JAWSDB_URL);

// connection3.connect();

// connection3.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0].solution);
// });

// connection3.end();


// let connection2 = mySql.createConnection({
//   host: "localhost",
//   port: 3306 || process.env.DATABASE_URL,
//   user: "root",
//   password: "2823",
//   database: "profile"
// });

// // let connection3 = mySql.createConnection({
// //   host: "localhost",
// //   port: 3306 || process.env.DATABASE_URL,
// //   user: "root",
// //   password: "2823",
// //   database: "profile"
// // });

// // let db_connect = mySql.createConnection({
// //   host: "us-cdbr-iron-east-01.cleardb.net",
// //   port: process.env.DATABASE_URL,
// //   user: "bf9e08609b0e0f",
// //   password: "2823",
// //   database: "music"
// // });

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

connection2.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

connex.getConnection(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

connection3.getConnection(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


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
module.exports = connection;
 
