// controllers/feedbackController.js
let mockFrillStore = [];

const submitFeedback = (req, res) => {
  const { category, rating, comment } = req.body;
  const user = req.user;

  if (!user) return res.status(401).json({ error: 'Login required' });
  if (!category || !rating || !comment) return res.status(400).json({ error: 'All fields are required' });

  const feedback = {
    id: Date.now(),
    category,
    rating,
    comment,
    userId: user.id,
    email: user.emails?.[0]?.value,
    createdAt: new Date()
  };

  mockFrillStore.push(feedback);
  res.status(201).json({ message: 'Feedback submitted', data: feedback });
};

const getFeedbackByCategory = (req, res) => {
  const { category } = req.params;
  const filtered = mockFrillStore.filter(f => f.category === category);
  res.json(filtered);
};

const updateFeedback = (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const user = req.user;
  const feedback = mockFrillStore.find(f => f.id == id);

  if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
  if (feedback.userId !== user.id) return res.status(403).json({ error: 'Unauthorized' });

  feedback.rating = rating;
  feedback.comment = comment;
  res.json({ message: 'Feedback updated', data: feedback });
};

const deleteFeedback = (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const index = mockFrillStore.findIndex(f => f.id == id);

  if (index === -1) return res.status(404).json({ error: 'Feedback not found' });
  if (mockFrillStore[index].userId !== user.id) return res.status(403).json({ error: 'Unauthorized' });

  mockFrillStore.splice(index, 1);
  res.json({ message: 'Feedback deleted' });
};

module.exports = {
  submitFeedback,
  getFeedbackByCategory,
  updateFeedback,
  deleteFeedback
};
