// ContributionData structure:
// { date: string, count: number }

// Helper function to generate random submission counts
const generateRandomCount = () => {
  const random = Math.random();
  if (random < 0.6) return 0; // 60% chance of no submissions
  if (random < 0.8) return 1; // 20% chance of 1 submission
  if (random < 0.9) return 2; // 10% chance of 2 submissions
  if (random < 0.95) return 3; // 5% chance of 3 submissions
  return 4; // 5% chance of 4+ submissions
};

// Generate data for the past year
export const mockContributionData = (() => {
  const data = [];
  const today = new Date();
  
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    // Add some streaks of activity
    const isInStreak = Math.random() < 0.3; // 30% chance of being in a streak
    const count = isInStreak ? generateRandomCount() + 1 : generateRandomCount();
    
    data.push({
      date: dateString,
      count: count
    });
  }
  
  return data;
})(); 