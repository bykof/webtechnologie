import mongoose from "mongoose";

let invoiceSchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  file_url: {type: String},
  group_id: {type: String, required: true},
  total_price: {type: Number, required: true},
  invoice_items: [{}]
});

export default mongoose.model("Invoice", invoiceSchema);