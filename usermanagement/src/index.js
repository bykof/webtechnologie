var express = require('express');
var initDatabase = require('./initDatabase');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

var users = require('./api/users');
var groups = require('./api/groups');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Please use /users or /groups');
});

app.use('/users', users);
app.use('/groups', groups);

initDatabase(
  function () {
    app.listen(process.env.PORT || 8002, function () {
      console.log('Example app listening on port ' + (process.env.PORT || 3001) + '!');
    });
  }
);


