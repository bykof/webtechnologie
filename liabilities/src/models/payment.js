import mongoose from "mongoose";

let paymentSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    invoice_id: { type: String, required: true },
    sender_user_id: { type: Number, required: true },
    receiver_user_id: { type: Number, required: true },
    money_amount: { type: Number, required: true },
});

export default mongoose.model("Payment", paymentSchema);