import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL || 'localhost';
const MONGODB_PORT = process.env.MONGODB_PORT || '27017';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + MONGODB_URL + '/files');

export default function initDB (callback) {
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    callback();
  });
}
