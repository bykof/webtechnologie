import MongoClient from 'mongodb';

export default callback => {
  MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
    if (err) {
      throw err;
    }
    callback(db);
  });
  
}
