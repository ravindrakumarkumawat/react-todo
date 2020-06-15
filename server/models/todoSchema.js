const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tasks: [
    {
      name: {
        type: String,
        required: true
      },
      completed: {
        type: Boolean,
        default: false
      },
      priority: {
        type: String,
        default: 'None'
      },
      date: {
        type: String,
        default: ''
      },
      note: {
        type: String,
        default: ''
      }
    }
  ],
  createdOn: {
    type: Date,
    default: Date.now
  }
})

const Todo = mongoose.model('todos', todoSchema)

module.exports = Todo
