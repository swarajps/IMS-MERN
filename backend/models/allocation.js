const mongoose = require('mongoose');

// Define a schema for your data
const AllocationSchema = new mongoose.Schema({
  allocation_id: String,
  mentor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'mentordata', required: true},
  // mentor_id: String,
  // intern_id: String,
  intern_id: {type: mongoose.Schema.Types.ObjectId, ref: 'interndata', required: true},
  date: Date,

});





// Create a model from the schema
const Allocation = mongoose.model('allocationdata', AllocationSchema);

module.exports = Allocation;