// Set up MySQL connection.
let mySql = require("mysql");

let connection = mySql.createConnection({
  host: "localhost",
  port: 3306 || process.env.PORT,
  user: "root",
  password: "2823",
  database: "music"
});

let connection2 = mySql.createConnection({
  host: "localhost",
  port: 3306 || process.env.PORT,
  user: "root",
  password: "2823",
  database: "profile"
});

// let db_connect = mySql.createConnection({
//   host: "us-cdbr-iron-east-01.cleardb.net",
//   port: process.env.DATABASE_URL,
//   user: "bf9e08609b0e0f",
//   password: "2823",
//   database: "music"
// });

let db_connect = mySql.createConnection({
    host: "localhost",
    port: 3306 || process.env.DATABASE_URL,
    user: "bf9e08609b0e0f",
    password: "2823",
    database: "music"
  });

let db_connect2 = mySql.createConnection({
    host: "localhost",
    port: 3306 || process.env.DATABASE_URL,
    user: "bf9e08609b0e0f",
    password: "2823",
    database: "profile"
  });

  
//   let pool = db_connect.createPool({
//     connectionLimit : 10,
//     host            : process.env.MYSQL_HOST,
//     user            : process.env.MYSQL_USER,
//     password        : process.env.MYSQL_SECRET,
//     database        : process.env.MYSQL_DB,
//     port            : '3306',
//     ssl             : "Amazon RDS",
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

db_connect.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

db_connect2.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

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
