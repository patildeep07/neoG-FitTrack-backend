const {Goal} = require('../models/goals.model')

const express = require('express')
const router = express.Router()

// GET /api/goals

const fetchAllGoals = async () => {
  try {
    const foundGoals = await Goal.find()

    if (foundGoals) {
      return {message:'Successfully fetched all goals', foundGoals }
    }
  } catch (error){
    return {message:'Failed to fetch all goals', error}
  }
}

router.get('/', async (req,res) => {
  try {
    const response = await fetchAllGoals()

    if (response.message === 'Successfully fetched all goals') {
      res.json(response)
    } else {
      res.status(404).json(response)
    }

  } catch (error) {
    res.status(500).json({message:'Failed to fetch data'})
  }
})

// POST /api/goals

const addGoals = async (goalDetails) => {
  try {
    const newGoal = await Goal(goalDetails)

    await newGoal.save()

    return {message:'Successfully added a new goal', newGoal}
  } catch (error) {
    return {message:'Failed to add this goal', error}
  }
}

router.post('/', async (req,res) => {
  try {
    const response = await addGoals(req.body)

    if (response) {
      res.json(response)
    } else {
      res.status(404).json(response)
    }

  } catch (error) {
    res.status(500).json({message:'Failed to fetch data'})
  }
})

// /api/goals/:goalId

const deleteGoal = async (goalId) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(goalId)


    return {message:'Goal deleted'}


  } catch (error) {
    return {message:'Failed to delete this goal', error}
  }
}

router.delete('/:goalId' , async (req, res) => {
  try {
    const response = await deleteGoal(req.params.goalId)

    if (response.message === 'Goal deleted') {
      res.status(204).json(response)
    } else {
      res.status(404).json(response)
    }

  } catch (error) {
    res.status(500).json({message:'Failed to fetch data'})
  }
})

module.exports = router