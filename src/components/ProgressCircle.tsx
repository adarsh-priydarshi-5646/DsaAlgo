import React from 'react';

interface ProgressCircleProps {
  easyProgress: number;
  mediumProgress: number;
  hardProgress: number;
  showEasy: boolean;
  showMedium: boolean;
  showHard: boolean;
  size?: number;
}

export default function ProgressCircle({ 
  easyProgress,
  mediumProgress,
  hardProgress,
  showEasy,
  showMedium,
  showHard,
  size = 100
}: ProgressCircleProps) {
  const radius = size / 2;
  const center = size / 2;
  const sectionAngle = (2 * Math.PI) / 3; // 120 degrees in radians
  const strokeWidth = 8; // Increased stroke width for better visibility

  // Calculate total progress
  const totalProgress = Math.round((easyProgress + mediumProgress + hardProgress) / 3);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth/2}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />

        {/* Easy Section - Green */}
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth/2}
          fill="none"
          stroke={showEasy ? "#10B981" : "transparent"}
          strokeWidth={strokeWidth}
          strokeDasharray={`${2 * Math.PI * (radius - strokeWidth/2) / 3} ${2 * Math.PI * (radius - strokeWidth/2) * 2 / 3}`}
          strokeDashoffset={0}
          className="transition-colors duration-300"
        />

        {/* Medium Section - Yellow */}
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth/2}
          fill="none"
          stroke={showMedium ? "#F59E0B" : "transparent"}
          strokeWidth={strokeWidth}
          strokeDasharray={`${2 * Math.PI * (radius - strokeWidth/2) / 3} ${2 * Math.PI * (radius - strokeWidth/2) * 2 / 3}`}
          strokeDashoffset={-2 * Math.PI * (radius - strokeWidth/2) / 3}
          className="transition-colors duration-300"
        />

        {/* Hard Section - Red */}
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth/2}
          fill="none"
          stroke={showHard ? "#EF4444" : "transparent"}
          strokeWidth={strokeWidth}
          strokeDasharray={`${2 * Math.PI * (radius - strokeWidth/2) / 3} ${2 * Math.PI * (radius - strokeWidth/2) * 2 / 3}`}
          strokeDashoffset={-4 * Math.PI * (radius - strokeWidth/2) / 3}
          className="transition-colors duration-300"
        />
      </svg>
      
      {/* Total Progress in Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-gray-700">{totalProgress}%</span>
      </div>
    </div>
  );
} 