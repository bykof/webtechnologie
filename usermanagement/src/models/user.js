import mongoose from 'mongoose';


mongoose.connect('mongodb://localhost/test_db');

let UserSchema = new Schema({
    user: { type: String, required: true, validate: validate },
});

let User = mongoose.model('User', UserSchema);