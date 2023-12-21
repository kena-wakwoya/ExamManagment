const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.post('/', async (req, res, next) => {
  try {
    await examController.createExam(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    await examController.getAllExams(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    await examController.getExamById(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    await examController.updateExam(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await examController.deleteExam(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;