import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import config from './config.json';
import mongoose from 'mongoose';
import files from './api/files';
import 'express-resource';
import swagger from 'swagger-express';

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
  limit: config.bodyLimit
}));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://file_storage_mongo_db/files');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  
  app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    swaggerURL: '/swagger',
    swaggerUI: './public/swagger/',
    basePath: 'http://localhost:3000',
    apis: ['./api/files'],
  }));
  
  app.use(middleware({config}));
  app.resource('files', files);
  
  app.server.listen(process.env.PORT || config.port);
  
  console.log(`Started on port ${app.server.address().port}`);
});