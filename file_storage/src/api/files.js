import File from '../models/file';
import redis_client from '../redis_client';
import redis from 'redis';

export default {
  index: (req, res) => {
    redis_client.set("bla", new Date(), redis.print);
    redis_client.get("bla", (error, reply) => {
      console.log(reply);
    });

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
        res.json(file);
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
  }
}
