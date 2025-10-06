import React from 'react';
import { Brain, Home, Phone, Trophy, User, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">DSA Algo</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Contact</span>
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Trophy className="w-5 h-5" />
              <span>Leaderboard</span>
            </Link>
            <Link
              to="/creator"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Code2 className="w-5 h-5" />
              <span>Creator</span>
            </Link>
            <Link
              to="/sdesheet"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Code2 className="w-5 h-5" />
              <span>SDE Sheet</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 
