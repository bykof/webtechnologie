"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invoiceItemSchema = new _mongoose2.default.Schema({
    date: { type: Date, default: Date.now },
    invoice_id: { type: String, required: true },
    user_id: { type: Number, required: true },
    role: { type: String, enum: ["creditor", "debtor"] }
});

exports.default = _mongoose2.default.model("InvoiceItem", invoiceItemSchema);