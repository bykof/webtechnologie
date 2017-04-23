import mongoose from 'mongoose'

class File extends mongoose.Schema {
  constructor() {
    super({
      uploaded: Date,
    })
  }
}

export default mongoose.model('File', new File());
