import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 to-blue-100">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome </h1>
        <p className="text-gray-600 mb-8">Login to submit feedback for the product</p>
        
        <a href="http://localhost:4000/auth/google">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-all duration-200">
            Login with Google
          </button>
        </a>
      </div>
    </div>
  );
};

export default Login;
