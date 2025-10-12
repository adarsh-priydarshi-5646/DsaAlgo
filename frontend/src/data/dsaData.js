// Problem structure:
// { id: string, title: string, difficulty: 'SCHOOL'|'BASIC'|'EASY'|'MEDIUM'|'HARD', points: number, completed: boolean }

// Badge structure:
// { id: string, name: string, icon: string, threshold: number, description: string }

export const problemsByDifficulty = {
  SCHOOL: [
    { id: 's1', title: 'Array Search', difficulty: 'SCHOOL', points: 10, completed: false },
    { id: 's2', title: 'Min and Max in Array', difficulty: 'SCHOOL', points: 10, completed: false },
    { id: 's3', title: 'Sorted Array Search', difficulty: 'SCHOOL', points: 10, completed: false },
  ],
  BASIC: [
    { id: 'b1', title: 'Binary Search', difficulty: 'BASIC', points: 20, completed: false },
    { id: 'b2', title: 'Two Sum', difficulty: 'BASIC', points: 20, completed: false },
    { id: 'b3', title: 'Reverse Array', difficulty: 'BASIC', points: 20, completed: false },
  ],
  EASY: [
    { id: 'e1', title: 'Search in Rotated Array', difficulty: 'EASY', points: 30, completed: false },
    { id: 'e2', title: 'Missing Number', difficulty: 'EASY', points: 30, completed: false },
    { id: 'e3', title: 'First Missing Positive', difficulty: 'EASY', points: 30, completed: false },
  ],
  MEDIUM: [
    { id: 'm1', title: 'Median of Two Sorted Arrays', difficulty: 'MEDIUM', points: 50, completed: false },
    { id: 'm2', title: 'Longest Palindromic Substring', difficulty: 'MEDIUM', points: 50, completed: false },
    { id: 'm3', title: 'Container With Most Water', difficulty: 'MEDIUM', points: 50, completed: false },
  ],
  HARD: [
    { id: 'h1', title: 'Trapping Rain Water', difficulty: 'HARD', points: 100, completed: false },
    { id: 'h2', title: 'Regular Expression Matching', difficulty: 'HARD', points: 100, completed: false },
    { id: 'h3', title: 'Merge k Sorted Lists', difficulty: 'HARD', points: 100, completed: false },
  ],
};

export const badges = [
  {
    id: 'contributor',
    name: 'Contributor',
    icon: '🌟',
    threshold: 1,
    description: 'Started the journey',
  },
  {
    id: 'proficient',
    name: 'Proficient',
    icon: '🏆',
    threshold: 100,
    description: 'Mastered the basics',
  },
  {
    id: 'scholar',
    name: 'Scholar',
    icon: '🎓',
    threshold: 1000,
    description: 'Advanced knowledge',
  },
  {
    id: 'master',
    name: 'Master',
    icon: '👑',
    threshold: 10000,
    description: 'Expert level',
  },
  {
    id: 'ace',
    name: 'Ace',
    icon: '💫',
    threshold: 50000,
    description: 'Legendary status',
  },
]; 