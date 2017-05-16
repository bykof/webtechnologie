"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _invoice = require("./routes/invoice");

var _invoice2 = _interopRequireDefault(_invoice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Setup Mongoose
_mongoose2.default.connect("mongodb://localhost/liabilities");

// Setup Express
var app = (0, _express2.default)();

// Setup BodyParser
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// Routes
app.use("/invoices", _invoice2.default);
app.use("/", function (req, res) {
  res.json({ message: 'API reachable.' });
});

var port = 3000;
app.listen(port);
console.log("Listening on port " + port);