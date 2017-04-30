import restful from "node-restful";
let mongoose = restful.mongoose;

let invoiceSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    file_url: String,
    debt: Number,
    payer: Number,
    settled: { type: Boolean, default: false }
});

invoiceSchema.statics.OCR = (a, b) => {
}

export default restful.model("Invoice", invoiceSchema);