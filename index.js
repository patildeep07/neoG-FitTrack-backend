const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const { initialiseDatabase } = require('./database/db.connection')

// Importing routes
const exercises = require('./routes/exercises.router')
const food = require('./routes/food.router')
const goals = require('./routes/goals.router')

// Cors
app.use(cors())
app.use(helmet())

app.use(express.json())

initialiseDatabase()





app.get('/', (req, res) => {
  res.send('Welcome to FitTrack API')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`)
})

// Routes
app.use('/api/exercises', exercises)
app.use('/api/food', food)
app.use('/api/goals', goals)


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})