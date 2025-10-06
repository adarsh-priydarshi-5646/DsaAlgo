import React from 'react';
import { Users, MessageSquare, Calendar, TrendingUp, BookOpen } from 'lucide-react';

export default function Community() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">DSA Hub Community</h1>
          <p className="text-xl text-gray-300">Connect, learn, and grow together</p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">10,000+</h3>
            <p className="text-gray-300">Active Members</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">5,000+</h3>
            <p className="text-gray-300">Discussions</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">1,000+</h3>
            <p className="text-gray-300">Tutorials</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">500+</h3>
            <p className="text-gray-300">Daily Active Users</p>
          </div>
        </div>

        {/* Recent Discussions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Recent Discussions</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Discussion Topic {item}</h3>
                  <span className="text-sm text-gray-300">2 hours ago</span>
                </div>
                <p className="text-gray-300 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-300">@user{item}</span>
                  <span className="text-sm text-gray-300">{item * 5} comments</span>
                  <span className="text-sm text-gray-300">{item * 10} likes</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
                <div className="h-48 bg-purple-600"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-purple-500 mr-2" />
                    <span className="text-gray-300">Next Week</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">DSA Workshop {item}</h3>
                  <p className="text-gray-300 mb-4">
                    Join us for an interactive workshop on advanced DSA concepts.
                  </p>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Guidelines */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Community Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Be Respectful</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                  Treat everyone with respect
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                  No harassment or discrimination
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                  Be constructive in feedback
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Stay On Topic</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Focus on DSA and programming
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Share relevant resources
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Help others learn
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 