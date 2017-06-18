import express from "express";
import Invoice from "../models/invoice";
import Payment from "../models/payment";


let router = express.Router();

router.route("/")
    .post((req, res) => {
        if (!req.body["invoice_id"]) {
            res.json({
                "invoice_id": "Missing."
            });
        }
        if (!req.body["sender_user_id"]) {
            res.json({
                "sender_user_id": "Missing."
            });
        }
        if (!req.body["receiver_user_id"]) {
            res.json({
                "receiver_user_id": "Missing."
            });
        }
        if (!req.body["money_amount"]) {
            res.json({
                "money_amount": "Missing."
            });
        }

        // Check if an invoice with the passed id exists.
        Invoice.count({_id: req.body["invoice_id"]}, (err, count) => {
            if (count <= 0) {
                res.json({
                    "id": "Invoice with this ID not found."
                });
            } else {
                // TODO: Check if invoice is already settled.
                // TODO: Check if user actually has to pay the receiver.
                // TODO: Check how much the user owes at max.

                var new_payment = Payment({
                    invoice_id: req.body["invoice_id"],
                    sender_user_id: req.body["sender_user_id"],
                    receiver_user_id: req.body["receiver_user_id"],
                    money_amount: req.body["money_amount"]
                });

                new_payment.save((err) => {
                   if (err) {
                       res.json({ "error": err })
                   } else {
                       res.json({ "payment_id": new_payment })
                   }
                });
            }
        })
    });

module.exports = router;