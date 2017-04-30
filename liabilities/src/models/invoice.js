import mongoose from "mongoose";

let invoiceSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    file_url: String,
    debt: Number,
    payer: Number,
    settled: { type: Boolean, default: false }
});

invoiceSchema.statics.OCR = (a, b) => {
}

export default mongoose.model("Invoice", invoiceSchema);