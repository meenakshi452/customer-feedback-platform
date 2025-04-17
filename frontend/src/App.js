import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import FeedbackForm from './components/FeedbackForm';
import FeedbackDisplay from './components/FeedbackDisplay';
import axios from 'axios';

function App() {
  const [category, setCategory] = useState('Product Features');
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState([]);

  // Get current user
  useEffect(() => {
    axios.get('http://localhost:4000/me', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  // Load feedback for selected category
  useEffect(() => {
    axios.get(`http://localhost:4000/feedback/${category}`, {
      withCredentials: true
    }).then(res => setFeedback(res.data));
  }, [category]);

  const refreshFeedback = () => {
    axios.get(`http://localhost:4000/feedback/${category}`, {
      withCredentials: true
    }).then(res => setFeedback(res.data));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {!user ? (
          <Login />
        ) : (
          <>
            <div className="bg-white p-6 rounded shadow mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{user.displayName}</h2>
                <p className="text-gray-500 text-sm">{user.emails?.[0]?.value}</p>
              </div>
              <a href="http://localhost:4000/logout">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Logout
                </button>
              </a>
            </div>

            <FeedbackForm category={category} onSubmitSuccess={refreshFeedback} />

            <div className="my-6">
              <label className="font-semibold mr-2">Select Category:</label>
              <select
                className="p-2 border rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Product Features</option>
                <option>Product Pricing</option>
                <option>Product Usability</option>
              </select>
            </div>

            <FeedbackDisplay feedback={feedback} category={category} user={user} onUpdate={refreshFeedback} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
