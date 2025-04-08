import React from 'react';
import { Question } from '../data/dsaQuestions';
import { ExternalLink, Check } from 'lucide-react';
import { toggleQuestion, getProgress } from '../utils/localStorage';

interface QuestionListProps {
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  onClose: () => void;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
};

export default function QuestionList({ questions, difficulty, topic, onClose }: QuestionListProps) {
  const progress = getProgress();
  const topicProgress = progress[topic] || { easy: [], medium: [], hard: [] };

  const getQuestionProgress = (index: number) => {
    return topicProgress[difficulty][index] || false;
  };

  const handleCheckboxClick = (index: number) => {
    toggleQuestion(topic, difficulty, index);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-900">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Questions
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[difficulty]}`}>
              {questions.length} questions
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleCheckboxClick(index)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        getQuestionProgress(index)
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {getQuestionProgress(index) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </button>
                    <h3 className="text-lg font-medium text-gray-900">
                      {index + 1}. {question.title}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <a
                      href={question.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <img src="https://cdn.iconscout.com/icon/free/png-256/free-leetcode-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-4-pack-logos-icons-2944960.png" alt="LeetCode" className="w-7 h-6" style={{ fill: 'currentColor' }} />
                      <span>LeetCode</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={question.gfg}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-green-600 hover:text-green-800 transition-colors"
                    >
                      <img src="https://img.icons8.com/?size=512&id=AbQBhN9v62Ob&format=png" alt="GeeksForGeeks" className="w-5 h-6 mr-1" style={{ fill: 'currentColor' }} />
                      <span>GeeksForGeeks</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
