import mongoose from "mongoose";

let invoiceItemSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    invoice_id: { type: String, required: true },
    user_id: { type: Number, required: true },
    role: { type: String, enum: ["creditor", "debtor"] }
});

export default mongoose.model("InvoiceItem", invoiceItemSchema);