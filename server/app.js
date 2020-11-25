const express = require('express')
const cors = require('cors')
const path = require('path')

const listsRouter = require('./routes/lists')
const taskRouter = require('./routes/tasks')

const { connectDB } = require('./db/connectDb')

const app = express()

// Database connecting
connectDB()

// Middleware
app.use(cors())
app.use(express.json()) // req.body
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.use('/lists', listsRouter)
app.use('/lists/:id/tasks', taskRouter)

// Production
if (process.env.NODE_ENV === 'production') {
  app.use(Express.static(path.join(__dirname, '../app/build')))
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/build/index.html'))
  })
}

// Start server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is started on ${port}`))
