import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
//import api from "./routes/api";

// Setup Mongoose
mongoose.connect("mongodb://localhost/noderest_test");

// Setup Express
let app = express();

// Setup BodyParser
app.use(bodyparser.urlencoded( { extended: true } ));
app.use(bodyparser.json());

// Routes
//app.use("/", api);

let port = 3000;
app.listen(port);
console.log("Listening on port " + port);