const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
  goalName: {type:String, required: true},
  description: {type:String, required: true},
  targetDate: {type: String, required: true},
  targetCalories: {type: Number, required: true},
  status: {type:String, default:'onGoing'},
})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = { Goal }