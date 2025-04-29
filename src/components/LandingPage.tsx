import React, { useState } from 'react';
import { ArrowRight, Brain, Code, Clock, Users, Trophy, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ContributionGraph from './ContributionGraph';
import { mockContributionData } from '../data/contributionData';
import Navbar from './Navbar';
import ProblemTabs from './ProblemTabs';
import BadgeProgression from './BadgeProgression';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [userCoins, setUserCoins] = useState(1150);
  const navigate = useNavigate();

  const handleProblemComplete = (coins: number) => {
    setUserCoins(prevCoins => prevCoins + coins);
  };

  const handleEnterDashboard = () => {
    onEnter();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-6 animate-fade-in">
            <Brain className="w-20 h-20 mx-auto text-purple-600" />
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900">
              DSA Algo & Practice Hub
            </h1>
            <p className="text-xl md:text-2xl text-gray-600">
              Master Data Structures and Algorithms, one question at a time
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center bg-white rounded-lg shadow-lg px-4 py-2">
              <Coins className="w-6 h-6 text-yellow-500 mr-2" />
              <span className="text-gray-900 font-medium">{userCoins} coins</span>
            </div>
            <button
              onClick={handleEnterDashboard}
              className="group bg-purple-600 text-white px-8 py-4 rounded-lg text-xl font-semibold 
                       hover:bg-purple-700 transition-all duration-300 
                       transform hover:scale-105 animate-bounce-subtle flex items-center 
                       justify-center space-x-2 shadow-lg"
            >
              <span>Start Practicing</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        {/* Problem Tabs Section */}
        <div className="mb-16">
          <ProblemTabs onProblemComplete={handleProblemComplete} />
        </div>

        {/* Badge Progression Section */}
        <div className="mb-16">
          <BadgeProgression userPoints={userCoins} />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Code className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor your DSA journey with detailed analytics and progress tracking.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Clock className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Daily Practice</h3>
            <p className="text-gray-600">Build consistency with daily practice and maintain your coding streak.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Trophy className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Achieve Goals</h3>
            <p className="text-gray-600">Set and achieve your DSA goals with our structured learning path.</p>
          </div>
        </div>

        {/* Contribution Graph Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Coding Journey</h2>
          <ContributionGraph data={mockContributionData} />
        </div>

        {/* Topics Preview */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Popular Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                name: 'Arrays & Strings 📊', 
                level: 'Basic',
                subtopics: [
                  'Array Operations',
                  'String Manipulation',
                  'Two Pointers',
                  'Sliding Window',
                  'Prefix Sum'
                ]
              },
              { 
                name: 'Linked Lists 🔗', 
                level: 'Basic',
                subtopics: [
                  'Singly Linked List',
                  'Doubly Linked List',
                  'Circular Linked List',
                  'Fast & Slow Pointers',
                  'Linked List Operations'
                ]
              },
              { 
                name: 'Stacks & Queues 📚', 
                level: 'Basic',
                subtopics: [
                  'Stack Operations',
                  'Queue Operations',
                  'Monotonic Stack',
                  'Priority Queue',
                  'Circular Queue'
                ]
              },
              { 
                name: 'Trees & BSTs 🌳', 
                level: 'Intermediate',
                subtopics: [
                  'Binary Trees',
                  'Binary Search Trees',
                  'Tree Traversals',
                  'Balanced Trees',
                  'Tree Operations'
                ]
              },
              { 
                name: 'Graphs & Traversals 🕸️', 
                level: 'Intermediate',
                subtopics: [
                  'Graph Representation',
                  'BFS & DFS',
                  'Shortest Path',
                  'Minimum Spanning Tree',
                  'Topological Sort'
                ]
              },
              { 
                name: 'Dynamic Programming 💡', 
                level: 'Advanced',
                subtopics: [
                  '0/1 Knapsack',
                  'Longest Common Subsequence',
                  'Matrix Chain Multiplication',
                  'Coin Change',
                  'DP on Trees'
                ]
              },
              { 
                name: 'Greedy Algorithms 🎯', 
                level: 'Intermediate',
                subtopics: [
                  'Activity Selection',
                  'Fractional Knapsack',
                  'Huffman Coding',
                  'Job Sequencing',
                  'Minimum Spanning Tree'
                ]
              },
              { 
                name: 'Backtracking 🔄', 
                level: 'Advanced',
                subtopics: [
                  'N-Queens',
                  'Sudoku Solver',
                  'Subset Sum',
                  'Permutations',
                  'Combinations'
                ]
              },
              { 
                name: 'Bit Manipulation 🔢', 
                level: 'Advanced',
                subtopics: [
                  'Bitwise Operations',
                  'Bit Masking',
                  'Bit Counting',
                  'Bit Shifting',
                  'Bit Tricks'
                ]
              }
            ].map((topic) => (
              <div
                key={topic.name}
                className="bg-white rounded-xl p-6 transform hover:scale-105 transition-all shadow-lg"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{topic.name}</h3>
                <p className="text-gray-600 mb-3">Level: {topic.level}</p>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Subtopics:</p>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    {topic.subtopics.map((subtopic, index) => (
                      <li key={index}>{subtopic}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Ready to Start Your DSA Journey?</h2>
          <p className="text-gray-600 mb-6">Join thousands of developers who are mastering DSA with our platform.</p>
          <button
            onClick={handleEnterDashboard}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold 
                     hover:bg-purple-700 transition-all duration-300 shadow-lg"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}
