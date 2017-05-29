import express from "express";
import ocrScanner from "../scanners/ocr_scanner";
import receiptScanner from "../scanners/receipt_scanner";
import invoice from "../models/invoice";

let router = express.Router();

router.route("/")
    /*
    * Will return full receipt info. Requires:
    * invoice_id.
    */
    .get((req, res) => {
        if (req.query.id == null) {
            res.json({
                "id": "Missing. Please pass with id=value."
            });
        }
        invoice.findOne({
            _id: req.query.id
            },
            (err, doc) => {
                if (doc) res.json(doc);
            });
    })

    /*
    * Will be called from front-end service.
    * Will create a liability based on a bill. Requires:
    * file_url: The url of the uploaded receipt.
    * user_id: The user who is creating the invoice.
    */
    .post((req, res) => {
        if (req.body["file_url"] == null) {
            res.json({
                "file_url": "Missing"
            });
        }
        if (req.body["user_id"] == null) {
            res.json({
                "user_id": "Missing"
            });
        }
        else {
            let ocr_scanner = new ocrScanner();
            let receipt_scanner = new receiptScanner();

            ocr_scanner.scanRemote(req.body["file_url"])
                .then((result) => {
                    receipt_scanner.extractTotalPrice(result)
                        .then((result) => {
                            // Attempt to save the new model.
                            var new_invoice = invoice({
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
        if (req.body["id"] == null) {
            res.json({
                "id": "Missing."
            });
        }
        if (req.body["total_price"] == null) {
            res.json({
                "total_price": "Missing."
            });
        }
        else {
            invoice.findOne({_id: req.body["id"]}, (err, doc) => {
                if (doc) res.total_price = req.body["total_price"];

                doc.save((err) => {
                    if (err) res.json({"error": err});
                    else res.json(doc);
                });
            })
        }
    })

export default router;