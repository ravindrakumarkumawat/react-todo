require('dotenv').config()
const mongoose = require('mongoose')

const URI = process.env.DATABASE_URL

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    console.log('MongoDB is ready')
  } catch (err) {
    console.error(err)
  }
}

module.exports = { connectDB }
