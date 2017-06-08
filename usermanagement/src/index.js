var express = require('express');
var initDatabase = require('./initDatabase');
var app = express();
var bodyParser = require('body-parser');

var users = require('./api/users');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/users', users);

initDatabase(
  function () {
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });
  }
);


