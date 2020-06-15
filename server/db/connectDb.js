const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://reactMongoDB-TodoApp:1J@n1997@cluster0-dt8na.mongodb.net/REACTMOGODB-TODOAPP?retryWrites=true&w=majority', {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    console.log('MongoDB is ready')
  } catch (err) {
    console.error(err)
  }
}

module.exports = { connectDB }
