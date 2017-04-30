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
let router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'API reachable.' });
});


app.use("/invoice", invoiceRoutes);


let port = 3000;
app.listen(port);
console.log("Listening on port " + port);