import React from 'react';
import { BookOpen, Code2, Brain, Trophy } from 'lucide-react';

export default function Learn() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Learn Data Structures & Algorithms</h1>
          <p className="text-xl text-gray-300">Master the fundamentals and advanced concepts of DSA</p>
        </div>

        {/* Learning Paths */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Beginner's Guide</h3>
            <p className="text-gray-300">Start your DSA journey with basic concepts and fundamentals</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Data Structures</h3>
            <p className="text-gray-300">Master arrays, linked lists, trees, and more</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Algorithms</h3>
            <p className="text-gray-300">Learn sorting, searching, and optimization techniques</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all">
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Topics</h3>
            <p className="text-gray-300">Explore dynamic programming, graphs, and more</p>
          </div>
        </div>

        {/* Featured Courses */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
              <div className="h-48 bg-purple-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Introduction to DSA</h3>
                <p className="text-gray-300 mb-4">Learn the basics of data structures and algorithms</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Start Learning
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
              <div className="h-48 bg-blue-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Advanced Algorithms</h3>
                <p className="text-gray-300 mb-4">Master complex algorithms and optimization</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Learning
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
              <div className="h-48 bg-green-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Competitive Programming</h3>
                <p className="text-gray-300 mb-4">Prepare for coding competitions</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Start Learning
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Resources */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Interactive Tutorials</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                  Step-by-step explanations
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                  Visual demonstrations
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                  Practice exercises
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Practice Problems</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Difficulty levels
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Real-world scenarios
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Detailed solutions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 