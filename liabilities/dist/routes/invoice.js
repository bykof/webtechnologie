"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route("/").get(function (req, res) {
    res.json({ message: 'Invoice GET reachable.' });
})

/*
* Will be called from front-end service.
* Will create a liability based on a bill. Requires:
* file_url:
* user_id:
*/
.post(function (req, res) {
    console.log(req.body["test"]);
    res.json({ message: 'Invoice POST reachable.' });
});

exports.default = router;