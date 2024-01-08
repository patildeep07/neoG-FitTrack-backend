const {Exercise} = require('../models/exercises.model')

const express = require('express')
const router = express.Router()

// GET /api/exercises

const fetchAllExercises = async () => {
  try {
    const foundExercises = await Exercise.find()

    if (foundExercises) {
      return {message:'Successfully fetched all exercises', foundExercises }
    }
  } catch (error){
    return {message:'Failed to fetch all exercises', error}
  }
}

router.get('/', async (req,res) => {
  try {
    const response = await fetchAllExercises()

    if (response.message === 'Successfully fetched all exercises') {
      res.json(response)
    } else {
      res.status(404).json(response)
    }
    
  } catch (error) {
    res.status(500).json({message:'Failed to fetch data'})
  }
})

// POST /api/exercises

const addExercise = async (exerciseDetails) => {
  try {
    const newExercise = await Exercise(exerciseDetails)

    await newExercise.save()

    return {message:'Successfully added a new exercise', newExercise}
  } catch (error) {
    return {message:'Failed to add this exercise', error}
  }
}

router.post('/', async (req,res) => {
  try {
    const response = await addExercise(req.body)

    if (response) {
      res.json(response)
    } else {
      res.status(404).json(response)
    }
    
  } catch (error) {
    res.status(500).json({message:'Failed to fetch data'})
  }
})

// DELETE /api/exercises/:exerciseId

const deleteExercise = async (exerciseId) => {
  try {
    const deletedExercise = await Exercise.findByIdAndDelete(exerciseId)

    
    return {message:'Exercise deleted'}
    
 
  } catch (error) {
    return {message:'Failed to delete exercise', error}
  }
}

router.delete('/:exerciseId' , async (req, res) => {
  try {
    const response = await deleteExercise(req.params.exerciseId)
 
    if (response.message === 'Exercise deleted') {
      res.status(204).json(response)
    } else {
      res.status(404).json(response)
    }
    
  } catch (error) {
    res.status(500).json({message:'Failed to fetch data'})
  }
})

module.exports = router