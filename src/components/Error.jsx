import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl mt-4 text-gray-700">Oops! The page you are looking for doesn't exist.</p>
        <Link to="/" className="mt-6 text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default Error;
