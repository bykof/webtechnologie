import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import config from './config';
import files, {file_custom_routes} from './api/files';
import 'express-resource';
import initDB from './db';
import fileUpload from 'express-fileupload';

let app = express();
app.use(morgan('dev'));
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());

initDB(
  () => {
    app.use(middleware({config}));
    app.resource('files', files);
    app.use(file_custom_routes);
    let listener = app.listen(process.env.PORT || config.port, function () {
      console.log('Listening on port ' + listener.address().port);
    });
  }
);
