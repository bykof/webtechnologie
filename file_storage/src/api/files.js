import File from '../models/file';

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
  }
}
