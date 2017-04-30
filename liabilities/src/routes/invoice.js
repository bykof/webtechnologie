import express from "express";

let router = express.Router();

router.route("/")
    .get((req, res) => {
        res.json({ message: 'Invoice GET reachable.' });
    })

    .post((req, res) => {
        res.json({ message: 'Invoice POST reachable.' });
    })

export default router;