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
        res.status(500).json(error);
      }
    );
  },
  create: (req, res) => {
    let file = new File(
      {
        uploaded: new Date()
      }
    );
  
    file.save().then(
      (file) => {
        redis_client.set(
          file.id,
          req.files.image.data.toString('binary'),
          (error, reply) => {
            if (error) return res.status(500).json(error);
            res.json(file);
          }
        );
      }
    ).catch(
      (error) => {
        return res.status(500).json(error);
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
        res.status(500).json(error);
      }
    )
  },
  update: (req, res) => {
  
  },
  destroy: (req, res) => {
    redis_client.del(req.params.file, (error, reply) => {
      if (error) res.status(500).json(error);
      File.remove({_id: req.params.file}, (error) => {
        if (error) return res.status(500).json(error);
        res.sendStatus(204);
      });
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
