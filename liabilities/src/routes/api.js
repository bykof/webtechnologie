import express from "express";
import invoice from "../models/invoice";

let router = express.Router();
let Invoice = invoice;

Invoice.methods(["get"]);
Invoice.register(router, "/");

export default router;