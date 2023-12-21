const express = require('express');
const router = express.Router();
const mcqController = require('../controllers/mcqController');

router.post('/', async (req, res, next) => {
  try {
    await mcqController.createMCQ(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    await mcqController.getAllMCQs(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    await mcqController.getMCQById(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    await mcqController.updateMCQ(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await mcqController.deleteMCQ(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;