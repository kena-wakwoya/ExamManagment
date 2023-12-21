const Exam = require('../models/exam');
const AppError = require('../errors/AppError');

exports.createExam = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.duration) {
      throw new AppError('Title and duration are required', 400);
    }
    const exam = await Exam.create(req.body);
    res.status(201).json(exam);
  } catch (error) {
    console.error('Error creating exam:', error);
    next(error);
  }
};

exports.getAllExams = async (req, res, next) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    next(error);
  }
};

exports.getExamById = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      throw new AppError('Exam not found', 404);
    }
    res.status(200).json(exam);
  } catch (error) {
    next(error);
  }
};

exports.updateExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exam) {
      throw new AppError('Exam not found', 404);
    }
    res.status(200).json(exam);
  } catch (error) {
    next(error);
  }
};

exports.deleteExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) {
      throw new AppError('Exam not found', 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};