const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./configs/db');
const AppError = require('./errors/AppError');
const cors = require('cors');
// Load environment variables from .env
require('dotenv').config();
const PORT = process.env.PORT || 4040;
console.log(PORT)
const app = express();

// Database connection
connectDB();

app.use(bodyParser.json());
app.use(cors())
// Load routes
const examRoutes = require('./routes/examRoutes');
const mcqRoutes = require('./routes/mcqRoutes');

// Use routes
app.use('/exams', examRoutes);
app.use('/mcqs', mcqRoutes);

// Centralized error handler
app.use((err, req, res, next) => {
  let error = err;

  if (!(error instanceof AppError)) {
    error = new AppError('Internal Server Error', 500);
  }

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});