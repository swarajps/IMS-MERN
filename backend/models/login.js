const mongoose = require('mongoose');

// Define a schema for your data
const loginSchema = new mongoose.Schema({
  login_id:String,
  username: String,
  password: String,
  type: String,

});




// Create a model from the schema
const Login = mongoose.model('logindata', loginSchema);

module.exports = Login;