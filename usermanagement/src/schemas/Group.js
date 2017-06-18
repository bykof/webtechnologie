var mongoose = require('mongoose');
var User = require('./User');

var groupSchema = mongoose.Schema({
  name: String,
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

// Delete references in all users to the deleted group
groupSchema.pre('remove', function (next) {
  User.update(
    {},
    {
      $pull: {
        groups: this._id
      }
    }
  ).then(
    function () {
      next();
    }
  );
});

module.exports = mongoose.model('Group', groupSchema);