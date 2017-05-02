import mongoose from 'mongoose';


mongoose.connect('mongodb://localhost/test_db');

schema = new Schema({
    user: { type: String, required: true, validate: validate },
});