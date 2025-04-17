import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackDisplay = ({ feedback, category, user, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(5);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/feedback/${id}`, {
      withCredentials: true
    });
    onUpdate();
  };

  const handleEdit = (f) => {
    setEditingId(f.id);
    setEditText(f.comment);
    setEditRating(f.rating);
  };

  const saveEdit = async (id) => {
    await axios.put(`http://localhost:4000/feedback/${id}`, {
      comment: editText,
      rating: editRating
    }, { withCredentials: true });

    setEditingId(null);
    setEditText('');
    setEditRating(5);
    onUpdate(); 
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Feedback for: <span className="text-indigo-600">{category}</span>
      </h3>

      {feedback.length === 0 ? (
        <p className="text-gray-500">No feedback yet for this category.</p>
      ) : (
        <div className="space-y-4">
          {feedback.map((f) => (
            <div key={f.id} className="bg-white border shadow-sm rounded-lg p-4">
              {editingId === f.id ? (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Rating</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editRating}
                    onChange={(e) => setEditRating(e.target.value)}
                    className="border p-2 rounded w-20"
                  />

                  <label className="block text-sm font-medium text-gray-600 mt-2">Comment</label>
                  <textarea
                    className="border w-full p-2 rounded"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />

                  <div className="mt-2 flex gap-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => saveEdit(f.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 px-3 py-1 rounded"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p><strong>Rating:</strong> {f.rating}</p>
                  <p><strong>Comment:</strong> {f.comment}</p>

                  {user && f.userId === user.id && (
                    <div className="mt-3 flex gap-2">
                      <button
                        className="text-sm px-3 py-1 rounded bg-yellow-400 text-black hover:bg-yellow-500"
                        onClick={() => handleEdit(f)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handleDelete(f.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackDisplay;
