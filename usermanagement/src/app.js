import express from 'express';
import config from './config.json';

let app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.PORT || config.PORT, function () {
  console.log('Example app listening on port ' + process.env.PORT || config.PORT + '!');
});