import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Sparkles } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 animate-pulse">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-teal-200 rounded-full animate-spin border-t-teal-600"></div>
          </div>
          <Sparkles className="absolute top-4 right-8 w-8 h-8 text-teal-500 animate-bounce" />
          <Sparkles className="absolute bottom-4 left-8 w-6 h-6 text-blue-500 animate-bounce delay-300" />
        </div>

        {/* Content */}
        <div className="glass p-8 rounded-3xl shadow-2xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, even the best explorers sometimes take a wrong turn!
          </p>

          {/* Animated illustration */}
          <div className="mb-8">
            <div className="relative w-64 h-32 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-100 to-blue-100 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute top-4 left-8 w-4 h-4 bg-teal-500 rounded-full animate-bounce"></div>
              <div className="absolute top-8 right-12 w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
              <div className="absolute bottom-6 left-16 w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-300"></div>
              <Search className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-gray-400 animate-pulse" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-xl font-semibold hover:bg-teal-50 transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>

          {/* Help text */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              If you think this is a mistake, please contact our support team.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/about" className="text-teal-600 hover:text-teal-500 transition-colors">
                About Us
              </Link>
              <Link to="/post-job" className="text-teal-600 hover:text-teal-500 transition-colors">
                Post a Project
              </Link>
              <Link to="/login" className="text-teal-600 hover:text-teal-500 transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-teal-300 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-blue-300 rounded-full animate-float-delayed opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-purple-300 rounded-full animate-float opacity-60"></div>
      </div>
    </div>
  );
};

export default NotFound;