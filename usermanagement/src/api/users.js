var express = require('express');
var bcrypt = require('bcrypt');

var router = express.Router();

var User = require('../schemas/User');

var config = require('../config');

function error_response(response, error) {
  console.log(error);
  response.status(500).json(error);
}

router.get(
  '/',
  function (request, response) {
    User.find().then(
      function (users) {
        response.json(users);
      }
    ).catch(function (error) {
      error_response(response, error);
    });
  }
);

router.delete(
  '/',
  function (request, response) {
    User.remove({}).then(
      function (users) {
        response.sendStatus(203);
      }
    ).catch(function (error) {
      error_response(response, error);
    });
  }
);


router.get(
  '/:user_id',
  function (request, response) {
    User.findOne({_id: request.params.user_id}).then(
      function (user) {
        if (!user) return response.sendStatus(404);
        response.json(user);
      }
    ).catch(function (error) {
      error_response(response, error);
    });
  }
);

router.post(
  '/:user_id/clear_groups/',
  function (request, response) {
    User.findOne({_id: request.params.user_id}).then(
      function (user) {
        if (!user) return response.sendStatus(404);
        user.groups = [];
        user.save().then(
          () => {
            response.json(user);
          }
        ).catch(
          function (error) {
            error_response(response, error);
          }
        );
      }
    ).catch(function (error) {
      error_response(response, error);
    });
  }
);

router.post(
  '/',
  function (request, response) {
    var body = request.body;
    
    User.findOne({email: body.email}).then(
      function (user) {
        if (user) return response.status(400).json({error: 'user_already_exists'});
        bcrypt.genSalt(config.SALT_ROUNDS, function (err, salt) {
          bcrypt.hash(body.password, salt, function (err, hash) {
            var user = new User(
              {
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                password: hash
              }
            );
            user.save().then(
              function (user) {
                return response.status(201).json(user);
              }
            ).catch(function (error) {
              return error_response(response, error);
            });
          });
        });
      }
    ).catch(
      function (error) {
        return error_response(response, error);
      }
    );
  }
);

router.post(
  '/login',
  function (request, response) {
    var body = request.body;
    User.findOne(
      {email: body.email}
    ).then(
      function (user) {
        if (!user) return response.status(403).json({error: 'user_not_found'});
        bcrypt.compare(body.password, user.password, function (error, result) {
          if (result) {
            response.status(200).json(user);
          } else {
            response.status(403).json({error: 'password_not_correct'});
          }
        });
      }
    ).catch(function (error) {
      error_response(response, error);
    });
  }
);

router.delete(
  '/:user_id',
  function (request, response) {
    var user_id = request.params.user_id;
    User.find(
      {_id: user_id}
    ).remove().then(
      function () {
        response.sendStatus(203);
      }
    ).catch(function (error) {
      error_response(response, error);
    });
  }
);

module.exports = router;