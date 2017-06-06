import express from "express";
import Invoice from "../models/invoice";
import InvoiceItem from "../models/invoice_item";


let router = express.Router();

router.route("/")
/*
    * Will create role on the invoice for the user.
    */
    .post((req, res) => {
        if (!req.body["invoice_id"]) {
            res.json({
                "invoice_id": "Missing."
            });
        }
        else if (!req.body["user_id"]) {
            res.json({
                "user_id": "Missing."
            });
        }
        else if (!req.body["role"]) {
            res.json({
                "role": "Missing."
            });
        }

        // Check if passed invoice id exists.
        Invoice.count({_id: req.body["invoice_id"]}, function (err, count){
            if(count <= 0) {
                res.json({
                    "id": "Invoice with this ID not found."
                });
            }
            else {
                // Create the item.
                var new_invoice_item = InvoiceItem({
                    invoice_id: req.body["invoice_id"],
                    user_id: req.body["user_id"],
                    role: req.body["role"]
                });

                new_invoice_item.save((err) => {
                    if (err) {
                        res.json({
                            "error": err
                        });
                    } else {
                        // Search invoice and add invoice item.
                        Invoice.findOne({
                                _id: new_invoice_item.invoice_id
                            },
                            (err, invoice_found) => {
                                if (invoice_found) {
                                    invoice_found.invoice_items.push(new_invoice_item);

                                    invoice_found.save((err) => {
                                        if (err) res.json({"error": err});
                                        else {
                                            res.json({
                                                invoice_item_id: new_invoice_item._id
                                            })
                                        }
                                    });
                                }
                            });
                    }
                });
            }
        })

    })

export default router;