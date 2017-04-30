import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import config from './config';
import files from './api/files';
import 'express-resource';
import initDB from './db';

let app = express();
app.use(morgan('dev'));

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
    let listener = app.listen(process.env.PORT || config.port, function(){
      console.log('Listening on port ' + listener.address().port);
    });
  }
);
