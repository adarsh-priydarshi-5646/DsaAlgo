import React from 'react';
import { Brain, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-white" />
              <span className="text-xl font-bold text-white">DSA Hub</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 