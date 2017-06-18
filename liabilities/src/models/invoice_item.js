import mongoose from "mongoose";

let invoiceItemSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    invoice_id: { type: String, required: true },
    user_id: { type: Number, required: true, unique: true, dropDups: true },
    role: { type: String, enum: ["creditor", "debtor"] },
    advanced_price: { type: Number, required: false },
});

/*
*
*/
invoiceItemSchema.statics.IsSettled = (money_amount) => {
    if (this.role == "debtor") {
        // Check if debtor still has payments to pay regarding
        // this invoice.
    } else {
      // Check if creditor still has money to get.
    }
}

export default mongoose.model("InvoiceItem", invoiceItemSchema);