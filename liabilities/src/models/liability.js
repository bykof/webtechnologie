import restful from "node-restful";

let mongoose = restful.mongoose;

let liabilitySchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    debt: Number,
    debtor: Number,
    settled: { type: Boolean, default: false }
});

liabilitySchema.statics.placerholder = (a, b) => {

}