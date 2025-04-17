// routes/feedbackRoutes.js
const express = require('express');
const {
  submitFeedback,
  getFeedbackByCategory,
  updateFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');

const router = express.Router();

// POST feedback
router.post('/', submitFeedback);

// GET feedback by category
router.get('/:category', getFeedbackByCategory);

// PUT edit feedback
router.put('/:id', updateFeedback);

// DELETE feedback
router.delete('/:id', deleteFeedback);

module.exports = router;
