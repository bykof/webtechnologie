import express from "express";
import ocrScanner from "../scanners/ocr_scanner";
import receiptScanner from "../scanners/receipt_scanner";
import invoice from "../models/invoice";

let router = express.Router();

router.route("/")
    .get((req, res) => {
        res.json({ message: 'Invoice GET reachable.' });
    })

    /*
    * Will be called from front-end service.
    * Will create a liability based on a bill. Requires:
    * file_url:
    * user_id:
    */
    .post((req, res) => {
        let ret = {};

        if (req.body["file_url"] == null) {
            res.json({
                "file_url": "missing"
            });
        }
        if (req.body["user_id"] == null) {
            res.json({
                "user_id": "missing"
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

export default router;