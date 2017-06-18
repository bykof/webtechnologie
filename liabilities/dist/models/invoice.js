"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invoiceSchema = new _mongoose2.default.Schema({
    date: { type: Date, default: Date.now },
    file_url: { type: String, required: true }
});

invoiceSchema.statics.OCR = function (a, b) {
    //TODO
};

exports.default = _mongoose2.default.model("Invoice", invoiceSchema);