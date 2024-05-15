const mongoose = require('mongoose');

// Define a schema for your data
const userSchema = new mongoose.Schema({
  name: String,
  gender: String,
  dob: String,
  email: String,
  phone: String,
  password: String,

});





// Create a model from the schema
const User = mongoose.model('userdata', userSchema);

module.exports = User;