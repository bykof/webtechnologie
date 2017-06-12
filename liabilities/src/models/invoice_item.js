import mongoose from "mongoose";

let invoiceItemSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    settle_date: { type: Date },
    invoice_id: { type: String, required: true },
    user_id: { type: Number, required: true, unique: true, dropDups: true },
    role: { type: String, enum: ["creditor", "debtor"] },
    advanced_price: { type: Number, required: false},
    settled: { type: Boolean }
});

invoiceItemSchema.statics.Settle = (money_amount) => {
}

export default mongoose.model("InvoiceItem", invoiceItemSchema);