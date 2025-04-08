import React, { useState } from 'react';
import { problemsByDifficulty } from '../data/dsaData';

const ProblemTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('SCHOOL');

  const difficulties = ['SCHOOL', 'BASIC', 'EASY', 'MEDIUM', 'HARD'];

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Practice Problems</h2>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => setActiveTab(difficulty)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === difficulty
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{difficulty}</span>
            <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-sm">
              {problemsByDifficulty[difficulty].length}
            </span>
          </button>
        ))}
      </div>

      {/* Problems List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {problemsByDifficulty[activeTab].map((problem) => (
          <div
            key={problem.id}
            className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900 font-medium">{problem.title}</h3>
              <span className="text-sm text-gray-600">{problem.points} points</span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                problem.completed
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {problem.completed ? 'Completed' : 'Not Started'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemTabs; 