import express from 'express';
import config from './config.json';

let app = express();
app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(process.env.PORT || config.PORT, function () {
  console.log('Usermanagement listening on port ' + process.env.PORT || config.PORT + '!');
});