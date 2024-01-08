const mongoose = require('mongoose')

const exerciseSchema = mongoose.Schema({
  exerciseName: {type:String, required: true},
  duration: {type: Number, required: true},
  caloriesBurned: {type: Number, required: true}
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = { Exercise }