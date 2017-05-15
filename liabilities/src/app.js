import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import invoiceRoutes from "./routes/invoice"

// Setup Mongoose
mongoose.connect("mongodb://localhost/liabilities");

// Setup Express
let app = express();

// Setup BodyParser
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

// Routes
app.use("/invoices", invoiceRoutes);
app.use("/", (req, res) => { res.json({ message: 'API reachable.' }); });


let port = 3000;
app.listen(port);
console.log("Listening on port " + port);