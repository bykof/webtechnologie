/**
 * Created by chris on 08.06.17.
 */
import mongoose from 'mongoose';
import * as Schema from "mongoose/lib/schema";


mongoose.connect('mongodb://localhost/test_db');

let GroupSchema = new Schema({
    name: { type: String, required: true},
    user: [{ type: Schema.Types.ObjectId, ref: 'User'}],
});

let Group = mongoose.model('Group', GroupSchema);