const mongoose = require('mongoose');
require('dotenv').config();
// const uri = process.env.MONGO_URL
const uri = 'mongodb+srv://kena_wk:admin@cluster0.taevken.mongodb.net/ExamManagment?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;