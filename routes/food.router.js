const {Food} = require('../models/food.model')

const express = require('express')
const router = express.Router()

// GET /api/food

const fetchAllFood = async () => {
  try {
    const foundFood = await Food.find()

    if (foundFood) {
      return {message:'Successfully fetched all food items', foundFood }
    }
  } catch (error){
    return {message:'Failed to fetch all food items', error}
  }
}

router.get('/', async (req,res) => {
  try {
    const response = await fetchAllFood()

    if (response.message === 'Successfully fetched all food items') {
      res.json(response)
    } else {
      res.status(404).json(response)
    }

  } catch (error) {
    res.status(500).json({message:'Failed to fetch data'})
  }
})

// POST /api/food

const addFood = async (foodDetails) => {
  try {
    const newFoodItem = await Food(foodDetails)

    await newFoodItem.save()

    return {message:'Successfully added a new food item', newFoodItem}
  } catch (error) {
    return {message:'Failed to add this food item', error}
  }
}

router.post('/', async (req,res) => {
  try {
    const response = await addFood(req.body)

    if (response) {
      res.json(response)
    } else {
      res.status(404).json(response)
    }

  } catch (error) {
    res.status(500).json({message:'Failed to fetch data'})
  }
})

// DELETE /api/food/:foodId

const deleteFood = async (foodId) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(foodId)


    return {message:'Food item deleted'}


  } catch (error) {
    return {message:'Failed to delete this food item', error}
  }
}

router.delete('/:foodId' , async (req, res) => {
  try {
    const response = await deleteFood(req.params.foodId)

    if (response.message === 'Food item deleted') {
      res.status(204).json(response)
    } else {
      res.status(404).json(response)
    }

  } catch (error) {
    res.status(500).json({message:'Failed to fetch data'})
  }
})

module.exports = router