import express from "express";

let router = express.Router();

router.route("/")
    .get((req, res) => {
        res.json({ message: 'Invoice GET reachable.' });
    })

    /*
    * Will be called from front-end service. Will create a liability based on a bill.
    * Requires: "bill_url", "payer_id" as user who pays the bill.
    */
    .post((req, res) => {
        console.log(req.body["test"]);
        res.json({ message: 'Invoice POST reachable.' });
    })

export default router;