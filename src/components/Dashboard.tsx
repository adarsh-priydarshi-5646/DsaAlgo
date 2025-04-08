import React, { useState } from 'react';
import { Brain, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { dsaTopics, TopicData, Question } from '../data/dsaQuestions';
import { getProgress } from '../utils/localStorage';
import QuestionList from './QuestionList';
import ProgressCircle from './ProgressCircle';

interface ActiveQuestion {
  topic: TopicData;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
}

export default function Dashboard() {
  const [activeQuestion, setActiveQuestion] = useState<ActiveQuestion | null>(null);
  const progress = getProgress();

  const getTopicProgress = (topicName: string) => {
    if (!progress[topicName]) return 0;
    const topic = progress[topicName];
    const total = Object.values(topic).flat().length;
    const completed = Object.values(topic).flat().filter(Boolean).length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const getDifficultyProgress = (topicName: string, difficulty: 'easy' | 'medium' | 'hard') => {
    if (!progress[topicName]) return 0;
    const topic = progress[topicName];
    const total = topic[difficulty].length;
    const completed = topic[difficulty].filter(Boolean).length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const getDifficultyCount = (topicName: string, difficulty: 'easy' | 'medium' | 'hard') => {
    const topic = dsaTopics.find(t => t.name === topicName);
    return topic ? topic[difficulty].length : 0;
  };

  const hasCompletedQuestions = (topicName: string, difficulty: 'easy' | 'medium' | 'hard') => {
    if (!progress[topicName]) return false;
    const topic = progress[topicName];
    return topic[difficulty].some(Boolean);
  };

  const handlePracticeClick = (topic: TopicData, difficulty: 'easy' | 'medium' | 'hard') => {
    setActiveQuestion({
      topic,
      difficulty,
      questions: topic[difficulty]
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            DSA Learning Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Track your progress and practice DSA topics
          </p>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dsaTopics.map((topic) => (
            <div
              key={topic.name}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <h2 className="text-xl font-semibold text-gray-900">{topic.name}</h2>
                </div>
                <ProgressCircle
                  easyProgress={getDifficultyProgress(topic.name, 'easy')}
                  mediumProgress={getDifficultyProgress(topic.name, 'medium')}
                  hardProgress={getDifficultyProgress(topic.name, 'hard')}
                  showEasy={hasCompletedQuestions(topic.name, 'easy')}
                  showMedium={hasCompletedQuestions(topic.name, 'medium')}
                  showHard={hasCompletedQuestions(topic.name, 'hard')}
                />
              </div>

              <p className="text-gray-600">{topic.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => handlePracticeClick(topic, 'easy')}
                    className="flex items-center space-x-2 hover:bg-green-50 px-2 py-1 rounded-lg transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Easy ({getDifficultyCount(topic.name, 'easy')})</span>
                  </button>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {getDifficultyProgress(topic.name, 'easy')}% complete
                    </span>
                    <button 
                      onClick={() => handlePracticeClick(topic, 'easy')}
                      className="flex items-center space-x-1 text-green-600 hover:text-green-800 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Practice</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => handlePracticeClick(topic, 'medium')}
                    className="flex items-center space-x-2 hover:bg-yellow-50 px-2 py-1 rounded-lg transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span>Medium ({getDifficultyCount(topic.name, 'medium')})</span>
                  </button>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {getDifficultyProgress(topic.name, 'medium')}% complete
                    </span>
                    <button 
                      onClick={() => handlePracticeClick(topic, 'medium')}
                      className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-800 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Practice</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => handlePracticeClick(topic, 'hard')}
                    className="flex items-center space-x-2 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Hard ({getDifficultyCount(topic.name, 'hard')})</span>
                  </button>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {getDifficultyProgress(topic.name, 'hard')}% complete
                    </span>
                    <button 
                      onClick={() => handlePracticeClick(topic, 'hard')}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Practice</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {activeQuestion && (
        <QuestionList
          questions={activeQuestion.questions}
          difficulty={activeQuestion.difficulty}
          topic={activeQuestion.topic.name}
          onClose={() => setActiveQuestion(null)}
        />
      )}
    </div>
  );
}