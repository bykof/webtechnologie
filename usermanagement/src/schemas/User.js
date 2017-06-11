var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}]
});

module.exports = mongoose.model('User', userSchema);