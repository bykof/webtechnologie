import express from "express";
import OCRScanner from "../scanners/ocr_scanner";
import ReceiptScanner from "../scanners/receipt_scanner";
import Invoice from "../models/invoice";
import BalanceObserver from "../balance_teller";


let router = express.Router();

router.route("/")
/*
 * Will return full receipt info. Requires:
 * invoice_id.
 */
    .get((req, res) => {
        /* Dev options */
        if (req.query.dev == "all") {
            Invoice.find({}, (err, doc) => {
                if (doc) res.json(doc);
                else {
                    res.json ({
                        "Result": "No invoices found"
                    });
                }
            });
        }
        else if (req.query.billing != null) {
            let balanceObserver = new BalanceObserver();
            balanceObserver.GetBalancesOfUser(1)
                .then((result) => {
                    res.json(result);
                })
                .catch((error) => {
                    res.json(error);
                })
        }
        else if (!req.query.id) {
            res.json({
                "id": "Missing. Please pass with id=value."
            });
        }
        else {
            Invoice.findOne({
                    _id: req.query.id
                },
                (err, doc) => {
                    if (doc) res.json(doc);
                });
        }
    })

    /*
     * Will be called from front-end service.
     * Will create a liability based on a bill. Requires:
     * file_url: The url of the uploaded receipt.
     * user_id: The user who is creating the Invoice.
     */
    .post((req, res) => {
        if (!req.body["file_url"]) {
            res.json({
                "file_url": "Missing"
            });
        }
        else if (!req.body["user_id"]) {
            res.json({
                "user_id": "Missing"
            });
        }
        else {
            let ocr_scanner = new OCRScanner();
            let receipt_scanner = new ReceiptScanner();

            ocr_scanner.scanRemote(req.body["file_url"])
                .then((result) => {
                    receipt_scanner.extractTotalPrice(result)
                        .then((result) => {
                            // Attempt to save the new model.
                            var new_invoice = Invoice({
                                file_url: req.body["file_url"],
                                user_id: req.body["user_id"],
                                total_price: result
                            });

                            new_invoice.save((err) => {
                                if (err) {
                                    res.json({
                                        "error": err
                                    });
                                } else {
                                    res.json({
                                        invoice_id: new_invoice._id
                                    })
                                }
                            });
                        });
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    })

    .put((req, res) => {
        if (!req.body["id"]) {
            res.json({
                "id": "Missing."
            });
        }
        if (!req.body["total_price"]) {
            res.json({
                "total_price": "Missing."
            });
        }
        else {
            Invoice.findOne({_id: req.body["id"]}, (err, invoice_found) => {
                if (invoice_found) {
                    if (req.body["total_price"])
                        invoice_found.total_price = req.body["total_price"];

                    invoice_found.save((err) => {
                        if (err) res.json({"error": err});
                        else res.json(invoice_found);
                    });
                }
            })
        }
    })

export default router;