const express = require("express");
const { createQuiz, getAllquizes, getQuizDetails, submitQuiz } = require("../controllers/quiz");

const router = express.Router();

/**
 * @route   POST /api/quiz/create-quiz
 * @desc    Create a new quiz
 * @access  Private
 */
router.post("/create-quiz", createQuiz);

/**
 * @route   GET /api/quiz/get-quizes
 * @desc    Get all available quizzes
 * @access  Public
 */
router.get("/get-quizes", getAllquizes);

/**
 * @route   GET /api/quiz/:quizId
 * @desc    Get details of a specific quiz by its ID
 * @access  Public
 */
router.get("/:quizId", getQuizDetails);

/**
 * @route   POST /api/quiz/:quizId/submit
 * @desc    Submit answers for a specific quiz and get the result
 * @access  Private
 */
router.post("/:quizId/submit", submitQuiz);

module.exports = router;
