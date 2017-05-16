import express from "express";

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
            res.json({ message: 'Invoice POST reachable.' });
        }
        res.json(ret);
    })

export default router;