import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ category, onSubmitSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/feedback', {
        category,
        rating,
        comment
      }, { withCredentials: true });

      setComment('');
      setRating(5);
      if (onSubmitSuccess) onSubmitSuccess(); 
    } catch (err) {
      console.error("AXIOS ERROR:", err.message);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <input
            type="number"
            min={1}
            max={5}
            className="w-full mt-1 p-2 border rounded"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Comment</label>
          <textarea
            className="w-full mt-1 p-2 border rounded"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your feedback here..."
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
