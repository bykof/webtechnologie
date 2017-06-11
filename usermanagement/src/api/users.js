var express = require('express');

var router = express.Router();

var User = require('../schemas/User');

router.get(
  '/',
  function(request, response) {
    User.find(
      function (error, users) {
        if (error) return console.error(error);
        response.json(users);
      }
    );
  }
);

router.post(
  '/',
  function(request, response) {
    var body = request.body;
    var user = new User({name: body.name, email: body.email, password: body.password});
    user.save(function (error, user) {
      if (error) return console.error(error);
      response.json(user);
    });
  }
);

router.delete(
  '/:user_id',
  function(request, response) {
    var user_id = request.params.user_id;
    User.find(
      {_id: user_id}
    ).remove(
      function(error, removed) {
        if (error) return console.error(error);
        response.sendStatus(203);
      }
    );
  }
);
module.exports = router;