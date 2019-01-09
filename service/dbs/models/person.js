const mongoose = require('mongoose')
const Schema = mongoose.Schema
const personSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true,
  }
})
const person = mongoose.model('person', personSchema)

module.exports = person