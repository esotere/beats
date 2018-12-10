const mongoose = require("mongoose");

// Save a reference to the Schema constructor
let Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
let BeatSchema = new Schema({
  
// _id         :   {
//     type        :   String,
//     require     :   false
// },

beatName: {
    type: String,
    trim: true,
    // required: "beatname is Required"
  },
  
  producer: {
    type: String,
    trim: true,
    // required: "Producer is Required",
    // validate: [
    //   function(input) {
    //     return input.length >= 6;
    //   },
    //   "Password should be longer."
    // ]
  },
  price: {
    type: Number,
    unique: false,
  },
  source: {
    type: String,
    // unique: true,
    require: true,
  }
//   // `email` must be of type String
//   // `email` must be unique
//   // `email` must match the regex pattern below and throws a custom error message if it does not
//   // You can read more about RegEx Patterns here https://www.regexbuddy.com/regex.html
//   email: {
//     type: String,
//     unique: true,
//     match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
//   },
  // `date` must be of type Date. The default value is the current date
//   userCreated: {
//     type: Date,
//     default: Date.now
//   }
});

// This creates our model from the above schema, using mongoose's model method
let BeatAlt = mongoose.model("BeatAlt", BeatSchema);
// let newBeat = new BeatAlt({"_id": 0, "beatName":"V", "producer": "x", "price": 1.00, "source": "path"}); // you also need here to define _id since, since you set it as required.

// Export the User model
module.exports = BeatAlt;
