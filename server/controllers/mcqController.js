const MCQ = require('../models/mcq');
const AppError = require('../errors/AppError');

exports.createMCQ = async (req, res, next) => {
  try {
    if (!req.body.question || !req.body.options || !req.body.correctAnswer || !req.body.exam) {
      throw new AppError('Question, options, correctAnswer, and exam are required', 400);
    }

    const mcq = await MCQ.create(req.body);
    res.status(201).json(mcq);
  } catch (error) {
    next(error);
  }
};

exports.getAllMCQs = async (req, res, next) => {
  try {
    const mcqs = await MCQ.find();
    res.status(200).json(mcqs);
  } catch (error) {
    next(error);
  }
};

exports.getMCQById = async (req, res, next) => {
  try {
    const mcq = await MCQ.findById(req.params.id);
    if (!mcq) {
      throw new AppError('MCQ not found', 404);
    }
    res.status(200).json(mcq);
  } catch (error) {
    next(error);
  }
};

exports.updateMCQ = async (req, res, next) => {
  try {
    const mcq = await MCQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mcq) {
      throw new AppError('MCQ not found', 404);
    }
    res.status(200).json(mcq);
  } catch (error) {
    next(error);
  }
};

exports.deleteMCQ = async (req, res, next) => {
  try {
    const mcq = await MCQ.findByIdAndDelete(req.params.id);
    if (!mcq) {
      throw new AppError('MCQ not found', 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};