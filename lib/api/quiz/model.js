import mongoose, { Schema } from 'mongoose'

const quizSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  questions: [{
    type: Schema.ObjectId,
    ref: 'Question'
  }]
}, {
  timestamps: true
})

quizSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author.view(full),
      title: this.title,
      questions: this.questions,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Quiz', quizSchema)

export const schema = model.schema
export default model
