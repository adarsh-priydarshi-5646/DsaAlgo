import React, { useState, useEffect } from 'react';

interface ContributionData {
  date: string;
  count: number;
}

interface ContributionGraphProps {
  data: ContributionData[];
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ data }) => {
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [activeDays, setActiveDays] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Generate dates for the last year
  const generateDates = () => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 365; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  // Calculate stats
  useEffect(() => {
    let total = 0;
    let active = 0;
    let currentStreak = 0;
    let maxStreakCount = 0;

    data.forEach(item => {
      total += item.count;
      if (item.count > 0) {
        active++;
        currentStreak++;
        maxStreakCount = Math.max(maxStreakCount, currentStreak);
      } else {
        currentStreak = 0;
      }
    });

    setTotalSubmissions(total);
    setActiveDays(active);
    setMaxStreak(maxStreakCount);
  }, [data]);

  // Create a map of date to count for easy lookup
  const dataMap = new Map(data.map(item => [item.date, item.count]));

  // Get color based on count (GitHub's exact colors)
  const getColor = (count: number) => {
    if (count === 0) return 'bg-[#161b22]';
    if (count <= 2) return 'bg-[#0e4429]';
    if (count <= 4) return 'bg-[#006d32]';
    if (count <= 6) return 'bg-[#26a641]';
    return 'bg-[#39d353]';
  };

  const dates = generateDates();
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  // Group dates by week
  const weeks: string[][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  return (
    <div className="p-4 bg-[#0d1117] rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">
          {totalSubmissions} submissions in the past one year
        </h2>
        <div className="text-sm text-gray-400 space-x-4">
          <span>Total active days: {activeDays}</span>
          <span>Max streak: {maxStreak}</span>
        </div>
      </div>

      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 mr-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="h-3 text-xs text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Graph grid */}
        <div className="flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((date) => {
                const count = dataMap.get(date) || 0;
                return (
                  <div
                    key={date}
                    className={`w-3 h-3 rounded-sm ${getColor(count)}`}
                    title={`${count} submissions on ${date}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-2 text-xs text-gray-400 ml-8">
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
};

export default ContributionGraph; 