const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://tharidhuphigera:yYE5wlHYT99MQ5eL@cluster0.0omjvod.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

testConnection();