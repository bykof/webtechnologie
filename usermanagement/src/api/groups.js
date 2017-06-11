var express = require('express');

var router = express.Router();

var User = require('../schemas/User');
var Group = require('../schemas/Group');


function error_response(response, error) {
  console.log(error);
  response.status(500).json(error);
}

router.get(
  '/',
  function (request, response) {
    Group.find().then(
      function (groups) {
        response.json(groups);
      }
    ).catch(
      function (error) {
        error_response(response, error);
      }
    )
  }
);

router.post(
  '/',
  function (request, response) {
    var group = new Group({name: request.body.name});
    group.save().then(
      function (group) {
        response.status(201).json(group);
      }
    ).catch(
      function (error) {
        error_response(response, error);
      }
    )
  }
);

router.get(
  '/:group_id',
  function (request, response) {
    Group.find({_id: request.params.group_id}).then(
      function (group) {
        response.status(201).json(group);
      }
    ).catch(
      function (error) {
        error_response(response, error);
      }
    )
  }
);

router.post(
  '/:group_id/add_user/:user_id',
  function (request, response) {
    Group.findOneAndUpdate({_id: request.params.group_id}, {$addToSet: {users: request.params.user_id}}).then(
      function () {
        User.findOneAndUpdate({_id: request.params.user_id}, {$addToSet: {groups: request.params.group_id}}).then(
          function () {
            return response.sendStatus(200);
          }
        ).catch(
          function (error) {
            error_response(response, error);
          }
        );
      }
    ).catch(
      function (error) {
        error_response(response, error);
      }
    )
  }
);


router.post(
  '/:group_id/remove_user/:user_id',
  function (request, response) {
    Group.update(
      {_id: request.params.group_id},
      {$pull: {users: request.params.user_id}}
    ).then(
      function () {
        User.update(
          {_id: request.params.user_id},
          {$pull: {groups: request.params.group_id}}
        ).then(
          function () {
            response.sendStatus(200);
          }
        ).catch(
          function (error) {
            error_response(response, error);
          }
        );
      }
    ).catch(
      function (error) {
        error_response(response, error);
      }
    );
  }
);


module.exports = router;
