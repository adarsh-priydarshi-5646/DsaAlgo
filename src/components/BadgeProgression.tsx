import React from 'react';
import { Trophy, Coins } from 'lucide-react';
import { badges } from '../data/dsaData';

interface BadgeProgressionProps {
  userPoints: number;
}

export default function BadgeProgression({ userPoints }: BadgeProgressionProps) {
  const nextBadge = badges.find(badge => badge.threshold > userPoints) || badges[badges.length - 1];
  const progressPercentage = Math.min((userPoints / nextBadge.threshold) * 100, 100);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Progress</h2>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="h-2 bg-gray-200 rounded-full mb-8">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Badges */}
        <div className="flex justify-between relative">
          {badges.map((badge, index) => {
            const isActive = userPoints >= badge.threshold;
            return (
              <div
                key={badge.id}
                className="flex flex-col items-center relative z-10"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    isActive ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{badge.name}</p>
                  <p className="text-xs text-gray-500">{badge.threshold} coins</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Progress */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Coins className="w-6 h-6 text-yellow-500" />
            <span className="text-gray-900 font-medium">{userPoints} coins</span>
          </div>
          <div className="text-gray-500">
            {nextBadge.threshold - userPoints} coins until {nextBadge.name}
          </div>
        </div>
      </div>
    </div>
  );
} 