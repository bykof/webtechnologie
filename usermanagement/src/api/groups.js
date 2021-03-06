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

router.delete(
  '/',
  function (request, response) {
    Group.find({}).then(
      function (groups) {
        groups.forEach(
          function (group) {
            group.remove();
          }
        );
        response.sendStatus(203);
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
    Group.findOne({_id: request.params.group_id}).then(
      function (group) {
        if (!group) return response.sendStatus(404);
        response.json(group);
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
  '/:group_id/invite',
  function (request, response) {
    if (!request.body.email) return response.status(400).json({error: 'Keine Email angegeben!'});
    
    User.findOne({email: request.body.email}).then(
      function (user) {
        if (!user) return response.status(400).json({error: 'Email wurde nicht gefunden!'});
        Group.findOne({_id: request.params.group_id}).then(
          function (group) {
            if (!group) return response.status(400).json({error: 'Gruppe wurde nicht gefunden!'});
            if (group.users.indexOf(user._id) !== -1) {
              return response.status(400).json({error: 'User ist schon in dieser Gruppe!'});
            }
            group.users.push(user._id);
            group.save().then(
              function () {
                if (user.groups.indexOf(user._id) !== -1) {
                  return response.status(400).json({error: 'User ist schon in dieser Gruppe!'});
                }
                user.groups.push(group._id);
                user.save().then(
                  function () {
                    return response.sendStatus(200);
                  }
                );
              }
            );
          }
        );
      }
    ).catch(
      function (error) {
        return error_response(response, error);
      }
    )
  }
);

router.delete(
  '/:group_id',
  function (request, response) {
    Group.find({_id: request.params.group_id}).then(
      function (groups) {
        if (!groups) return response.sendStatus(404);
        groups.forEach(
          function (group) {
            group.remove().then(
              function () {
                return response.sendStatus(203);
              }
            );
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
