// Import the ORM to create functions that will interact with the database.
let orm = require("../config/orm.js");

let member = {
  all: function(cb) {
    orm.all("logins", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("logins", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("logins", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("logins", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (usersController.js).
module.exports = member;
