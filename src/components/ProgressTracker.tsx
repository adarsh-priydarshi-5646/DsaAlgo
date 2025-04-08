import React, { useState } from 'react';

interface Step {
  id: number;
  title: string;
  completed: boolean;
}

const ProgressTracker: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, title: 'Step 1', completed: false },
    { id: 2, title: 'Step 2', completed: false },
    { id: 3, title: 'Step 3', completed: false },
    { id: 4, title: 'Step 4', completed: false },
  ]);

  const totalSteps = steps.length;
  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const toggleStep = (id: number) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, completed: !step.completed } : step
    ));
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="relative w-32 h-32 mb-8">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          {/* Progress circle */}
          <circle
            className="text-blue-500 transition-all duration-300"
            strokeWidth="8"
            strokeDasharray={`${progressPercentage * 2.51} 251`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
          {Math.round(progressPercentage)}%
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              {step.id}
            </div>
            <span className="flex-1">{step.title}</span>
            <input
              type="checkbox"
              checked={step.completed}
              onChange={() => toggleStep(step.id)}
              className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker; 