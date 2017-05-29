import mongoose from "mongoose";

let invoiceSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    file_url: { type: String, required: true },
    total_price: { type: Number, required: true },
});

export default mongoose.model("Invoice", invoiceSchema);