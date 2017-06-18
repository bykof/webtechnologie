import File from '../models/file';
import redis_client from '../redis_client';
import express from 'express';


export default {
  index: (req, res) => {
    File.find().then(
      (files) => {
        res.json(files);
      }
    ).catch(
      (error) => {
        res.json(error);
      }
    );
  },
  create: (req, res) => {
    let file = new File({uploaded: new Date()});
    file.save().then(
      (file) => {
        redis_client.set(
          file.id,
          req.files.image.data.toString('binary'),
          (error, reply) => {
            res.json(file);
          }
        );
      }
    ).catch(
      (error) => {
        res.json(error);
      }
    );
  },
  show: (req, res) => {
    File.find({_id: req.params.file}).then(
      (file) => {
        if (file.length === 0) res.sendStatus(404);
        res.json(file);
      }
    ).catch(
      (error) => {
        res.json(error);
      }
    )
  },
  update: (req, res) => {

  },
  destroy: (req, res) => {
    redis_client.del(req.params.file, (error, reply) => {
      if (error) res.json(error);
      File.remove({_id: req.params.file}, (error) => {
        if (error) return res.json(error);
      });
      res.sendStatus(200);
    });
  }
}

export let file_custom_routes = express();
file_custom_routes.get('/files/:file/file', (req, res) => {
  redis_client.get(req.params.file, (error, reply) => {
    if (reply === null) return res.sendStatus(404);
    res.header('Content-Type', 'image/jpg');
    res.send(new Buffer(reply, 'binary'));
  });
});
