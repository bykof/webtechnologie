import mongoose from 'mongoose'

class File extends mongoose.Schema {
  constructor() {
    super({
      uploaded: Date,
      user_id: String,
    })
  }
}

export default mongoose.model('File', new File());
