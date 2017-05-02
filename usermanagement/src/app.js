import express from 'express';
import config from './config';
import mongoose from 'mongoose';

let app = express();

mongoose.connect('mongodb://localhost/test_db');

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(process.env.PORT || config.port, function () {
  console.log('Usermanagement listening on port ' + (process.env.PORT || config.port) + '!');
});