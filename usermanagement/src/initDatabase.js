var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/usermanagement');

var db = mongoose.connection;

mongoose.Promise = global.Promise;

module.exports = function(callback) {
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    callback();
  });
};
