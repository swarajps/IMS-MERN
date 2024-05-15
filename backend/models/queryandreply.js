const mongoose = require('mongoose');

// Define a schema for your data
const QueryandreplySchema = new mongoose.Schema({
  allocation_id: {type: mongoose.Schema.Types.ObjectId, ref: 'allocationdata', required: true},
  query: String,
  reply: { type: String, default: 'Pending'},
  date:  { type: Date, default: Date.now },
});





// Create a model from the schema
const QueryandReply = mongoose.model('queryandreplydata', QueryandreplySchema);

module.exports = QueryandReply;