import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import config from './config.json';
import files from './api/files';
import 'express-resource';
import initDB from './db';

let app = express();

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
  limit: config.bodyLimit
}));

initDB(
  () => {
    app.use(middleware({config}));
    app.resource('files', files);
    app.listen(process.env.PORT || config.PORT, function () {
      console.log('Example app listening on port ' + process.env.PORT || config.PORT + '!');
    });
  }
);
