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
//   port: 3306 || process.env.PORT,
//   user: "bf9e08609b0e0f",
//   password: "936b3524",
//   database: "heroku_37f45dbc402f94e"
// });

let db_connect = mySql.createConnection({
    host: "localhost",
    port: 3306 || process.env.PORT,
    user: "bf9e08609b0e0f",
    password: "2823",
    database: "music"
  });
  
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

db_connect.query("SELECT * FROM Beats", function (err, result) {
  if (err) throw err;
  let sound =[];
  for (let i = 0; i < result.length; i++) {
      const element = result[i];
      sound.push(element)
      console.log(JSON.stringify(element))
     }
  })


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
