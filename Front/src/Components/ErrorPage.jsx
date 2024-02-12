import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600 mb-8">
          Oops! It seems like you need to log in to access this feature.
        </p>
        <a
          href="/"
          className="bg-black text-white py-3 font-bold  px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
        >
          Log In
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
