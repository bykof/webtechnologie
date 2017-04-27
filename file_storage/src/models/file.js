import mongoose from 'mongoose'

class File extends mongoose.Schema {
  constructor() {
    super({
      uploaded: Date,
      user_id: Number,
    })
  }
}

export default mongoose.model('File', new File());
