const mongoose = require('mongoose');
const path = require('path');


const MONGO_URI = "mongodb://0.0.0.0:27017/test";
console.log(MONGO_URI);
const db = mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));


module.exports=db;
