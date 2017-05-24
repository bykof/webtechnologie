import express from "express";
import ocrScanner from "../scanners/ocr_scanner";
import receiptScanner from "../scanners/receipt_scanner";

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
            ret["file_url"] = "missing";
        }
        if (req.body["user_id"] == null) {
            ret["user_id"] = "missing";
        }
        else {
            let ocr_scanner = new ocrScanner();
            let receipt_scanner = new receiptScanner();

            ocr_scanner.scanRemote(req.body["file_url"])
                .then((result) => {
                    receipt_scanner.extractTotalPrice(result)
                        .then((result) => {

                        });
                })
                .catch((error) => {
                    console.error(error)
                })
            ret["success"] = "OK";
        }
        res.json(ret);
    })

export default router;