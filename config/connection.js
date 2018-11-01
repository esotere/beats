// Set up MySQL connection.
let mySql = require("mysql");

let connection = mySql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
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
