import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import invoiceRoutes from "./routes/invoices"
import invoiceItemRoutes from "./routes/invoice_items";
import paymentRoutes from "./routes/payments";

// Setup Mongoose
mongoose.connect("mongodb://localhost/liabilities");

// Setup Express
let app = express();

// Setup BodyParser
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

// Routes
app.use("/invoices", invoiceRoutes);
app.use("/invoice_items", invoiceItemRoutes);
app.use("/payments", paymentRoutes);
app.use("/", (req, res) => { res.json({ message: 'API reachable.' }); });


let port = 8001;
app.listen(port);
console.log("Listening on port " + port);