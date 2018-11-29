// Import the ORM to create functions that will interact with the database.
let orm = require("../config/orm.js");

let user = {
  all: function(cb) {
    orm.all("signup", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("signup", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("signup", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("signup", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (beatsController.js).
module.exports = user;