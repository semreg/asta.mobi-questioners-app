import { Schema, model } from 'mongoose'

const QuestionerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [{
    _id: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true
    },
    content: String
  }]
})

const Questioner = model('questioners', QuestionerSchema)

export default Questioner
