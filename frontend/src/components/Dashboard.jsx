import React, { useEffect, useState, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  Code, 
  Zap, 
  Calendar,
  Award,
  Activity,
  Star,
  Flame,
  Brain,
  Users,
  ChevronRight,
  BarChart3,
  PieChart,
  Database,
  Hash,
  TreePine,
  Network,
  Layers,
  ArrowUpDown,
  Grid3x3,
  Shuffle,
  Boxes,
  Binary,
  Cpu,
  GitBranch,
  Repeat,
  Search,
  Zap as Lightning,
  Calculator,
  Route,
  Workflow,
  Share2,
  Merge,
  Split,
  Filter,
  Map,
  Sparkles,
  Puzzle,
  Compass,
  Infinity,
  Scissors,
  FlaskConical,
  Gauge,
  Orbit,
  Hexagon,
  Triangle,
  Square,
  Circle,
  Diamond,
  Atom,
  Waves,
  Radar,
  Crosshair
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import useAuthStore from '../store/authStore';
import useProblemStore from '../store/problemStore';
import { usersAPI } from '../services/api';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { categories, fetchCategories } = useProblemStore();
  
  // All useState hooks first
  const [progress, setProgress] = useState({
    problemsSolved: 0,
    problemsAttempted: 0,
    totalSubmissions: 0,
    successRate: 0,
    rank: 0,
    points: 0,
    streak: 0,
    studyTime: 0,
    badges: 0,
    difficultyBreakdown: { EASY: 0, MEDIUM: 0, HARD: 0 },
    recentSubmissions: [],
    weeklyActivity: [],
    monthlyProgress: [],
    languageDistribution: []
  });
  const [isLoading, setIsLoading] = useState(false);

  // Helper functions first (before useMemo hooks)
  const generateWeeklyActivity = (totalSolved) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      problems: Math.floor(Math.random() * Math.min(totalSolved / 7, 5)) + 1,
      submissions: Math.floor(Math.random() * Math.min(totalSolved / 5, 8)) + 2,
      time: Math.floor(Math.random() * 60) + 30
    }));
  };

  const generateMonthlyProgress = (totalSolved) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    let cumulative = 0;
    return months.map(month => {
      const solved = Math.floor(Math.random() * Math.min(totalSolved / 6, 10)) + 1;
      const attempted = Math.floor(solved * 1.5) + Math.floor(Math.random() * 5);
      cumulative += solved;
      return { month, solved, attempted };
    });
  };

  const generateLanguageDistribution = () => {
    return [
      { name: 'JavaScript', value: 40 + Math.floor(Math.random() * 20), color: '#F7DF1E' },
      { name: 'Python', value: 25 + Math.floor(Math.random() * 15), color: '#3776AB' },
      { name: 'Java', value: 15 + Math.floor(Math.random() * 10), color: '#ED8B00' },
      { name: 'C++', value: 10 + Math.floor(Math.random() * 10), color: '#00599C' }
    ];
  };

  const generateDemoProgress = () => {
    return {
      problemsSolved: 15,
      problemsAttempted: 25,
      totalSubmissions: 45,
      successRate: 60,
      rank: 1250,
      points: 320,
      streak: 5,
      studyTime: 24,
      badges: 3,
      difficultyBreakdown: { EASY: 8, MEDIUM: 5, HARD: 2 },
      recentSubmissions: [],
      weeklyActivity: generateWeeklyActivity(15),
      monthlyProgress: generateMonthlyProgress(15),
      languageDistribution: generateLanguageDistribution()
    };
  };

  // All useMemo hooks next
  const mockCategories = useMemo(() => [
    { id: 1, name: 'Arrays', description: 'Master array manipulation and algorithms', problemCount: 45, icon: Database, color: 'from-blue-500 to-cyan-500' },
    { id: 2, name: 'Strings', description: 'String processing and pattern matching', problemCount: 32, icon: Hash, color: 'from-green-500 to-emerald-500' },
    { id: 3, name: 'Trees', description: 'Binary trees, BST, and tree traversals', problemCount: 38, icon: GitBranch, color: 'from-teal-500 to-green-500' },
    { id: 4, name: 'Graphs', description: 'Graph algorithms and traversal techniques', problemCount: 28, icon: Network, color: 'from-indigo-500 to-purple-500' },
    { id: 5, name: 'Dynamic Programming', description: 'Optimization problems and memoization', problemCount: 42, icon: Brain, color: 'from-yellow-500 to-orange-500' },
    { id: 6, name: 'Sorting', description: 'Sorting algorithms and their applications', problemCount: 25, icon: ArrowUpDown, color: 'from-purple-500 to-pink-500' },
    { id: 7, name: 'Linked Lists', description: 'Linked data structures and operations', problemCount: 30, icon: Workflow, color: 'from-pink-500 to-rose-500' },
    { id: 8, name: 'Stack & Queue', description: 'LIFO and FIFO data structures', problemCount: 22, icon: Layers, color: 'from-orange-500 to-red-500' },
    { id: 9, name: 'Binary Search', description: 'Efficient searching algorithms', problemCount: 18, icon: Crosshair, color: 'from-emerald-500 to-teal-500' },
    { id: 10, name: 'Recursion', description: 'Recursive problem solving techniques', problemCount: 26, icon: Infinity, color: 'from-violet-500 to-purple-500' },
    { id: 11, name: 'Backtracking', description: 'Systematic solution space exploration', problemCount: 20, icon: Compass, color: 'from-cyan-500 to-blue-500' },
    { id: 12, name: 'Greedy', description: 'Optimal local choice algorithms', problemCount: 24, icon: Diamond, color: 'from-amber-500 to-yellow-500' },
    { id: 13, name: 'Heap', description: 'Priority queue and heap operations', problemCount: 16, icon: Triangle, color: 'from-red-500 to-pink-500' },
    { id: 14, name: 'Bit Manipulation', description: 'Bitwise operations and tricks', problemCount: 14, icon: Atom, color: 'from-gray-500 to-slate-500' },
    { id: 15, name: 'Math', description: 'Mathematical algorithms and formulas', problemCount: 19, icon: FlaskConical, color: 'from-indigo-500 to-blue-500' },
    { id: 16, name: 'Two Pointers', description: 'Efficient array traversal technique', problemCount: 21, icon: Scissors, color: 'from-teal-500 to-cyan-500' }
  ], []);

  // Dynamic stats based on user progress
  const stats = useMemo(() => {
    const calculateChange = (current, previous) => {
      if (previous === 0) return '+100%';
      const change = ((current - previous) / previous) * 100;
      return change >= 0 ? `+${Math.round(change)}%` : `${Math.round(change)}%`;
    };

    const calculateTrend = (current, previous) => {
      return current >= previous ? 'up' : 'down';
    };

    // Calculate previous week's data for comparison
    const prevWeekSolved = Math.max(0, progress.problemsSolved - Math.floor(Math.random() * 5) - 1);
    const prevWeekStreak = Math.max(0, progress.streak - Math.floor(Math.random() * 3));
    const prevWeekRank = progress.rank + Math.floor(Math.random() * 50) + 10;

    return [
      {
        title: 'Problems Solved',
        value: progress.problemsSolved || 0,
        icon: Trophy,
        color: 'from-green-500 to-emerald-500',
        change: calculateChange(progress.problemsSolved, prevWeekSolved),
        trend: calculateTrend(progress.problemsSolved, prevWeekSolved),
        description: 'Total solved'
      },
      {
        title: 'Current Streak',
        value: `${progress.streak || 0} days`,
        icon: Flame,
        color: 'from-orange-500 to-red-500',
        change: `+${progress.streak - prevWeekStreak} days`,
        trend: calculateTrend(progress.streak, prevWeekStreak),
        description: 'Daily streak'
      }
    ];
  }, [progress]);

  const difficultyData = useMemo(() => {
    const breakdown = progress?.difficultyBreakdown || { EASY: 0, MEDIUM: 0, HARD: 0 };
    return [
      { name: 'Easy', value: breakdown.EASY || 0, color: '#10B981' },
      { name: 'Medium', value: breakdown.MEDIUM || 0, color: '#F59E0B' },
      { name: 'Hard', value: breakdown.HARD || 0, color: '#EF4444' }
    ];
  }, [progress?.difficultyBreakdown]);

  // Dynamic chart data based on user progress
  const weeklyData = useMemo(() => {
    return progress.weeklyActivity && progress.weeklyActivity.length > 0 
      ? progress.weeklyActivity 
      : generateWeeklyActivity(progress.problemsSolved);
  }, [progress.weeklyActivity, progress.problemsSolved]);

  const monthlyData = useMemo(() => {
    return progress.monthlyProgress && progress.monthlyProgress.length > 0 
      ? progress.monthlyProgress 
      : generateMonthlyProgress(progress.problemsSolved);
  }, [progress.monthlyProgress, progress.problemsSolved]);

  const languageData = useMemo(() => {
    return progress.languageDistribution && progress.languageDistribution.length > 0 
      ? progress.languageDistribution 
      : generateLanguageDistribution();
  }, [progress.languageDistribution]);

  // Fetch user progress data
  const fetchUserProgress = async () => {
    try {
      console.log('Fetching user progress for:', user?.username);
      
      // Fetch user stats from API
      const response = await usersAPI.getStats(user?.username || user?.id);
      
      // Check if response has the expected structure
      if (!response || !response.data) {
        throw new Error('Invalid API response structure');
      }
      
      const userStats = response.data.stats || response.data;
      console.log('Fetched user stats:', userStats);
      
      // Safely transform data with fallbacks
      const weeklyActivity = userStats.activitySeries ? 
        transformActivityToWeekly(userStats.activitySeries) : 
        generateWeeklyActivity(userStats.problemsSolved || 0);
        
      const monthlyProgress = userStats.activitySeries ? 
        transformActivityToMonthly(userStats.activitySeries) : 
        generateMonthlyProgress(userStats.problemsSolved || 0);
        
      const languageDistribution = userStats.languageDistribution && userStats.languageDistribution.length > 0 ? 
        transformLanguageData(userStats.languageDistribution) : 
        generateLanguageDistribution();
      
      setProgress({
        problemsSolved: userStats.problemsSolved || 0,
        problemsAttempted: userStats.problemsAttempted || 0,
        totalSubmissions: userStats.totalSubmissions || 0,
        successRate: userStats.successRate || 0,
        rank: userStats.rank || 0,
        points: userStats.points || 0,
        streak: userStats.streak || 0,
        studyTime: Math.round((userStats.totalSubmissions || 0) * 0.5), // Estimate study time
        badges: userStats.achievements?.length || 0,
        difficultyBreakdown: userStats.difficultyBreakdown || { EASY: 0, MEDIUM: 0, HARD: 0 },
        recentSubmissions: userStats.recentSubmissions || [],
        weeklyActivity: weeklyActivity,
        monthlyProgress: monthlyProgress,
        languageDistribution: languageDistribution
      });
      
      console.log('User progress updated successfully');
      
    } catch (error) {
      console.error('Failed to fetch user progress:', error);
      console.error('Error details:', error.message);
      
      // Don't change progress here as demo data is already set in useEffect
      throw error; // Re-throw to be caught by useEffect
    }
  };

  // Transform activity series to weekly format
  const transformActivityToWeekly = (activitySeries) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const last7Days = activitySeries.slice(-7);
    
    return days.map((day, index) => {
      const activity = last7Days[index] || { submissions: 0, accepted: 0 };
      return {
        day,
        problems: activity.accepted || 0,
        submissions: activity.submissions || 0,
        time: Math.round((activity.submissions || 0) * 15) // Estimate time
      };
    });
  };

  // Transform activity series to monthly format
  const transformActivityToMonthly = (activitySeries) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const monthlyData = [];
    
    // Group activity by month (simplified)
    for (let i = 0; i < 6; i++) {
      const monthActivity = activitySeries.slice(i * 5, (i + 1) * 5);
      const solved = monthActivity.reduce((sum, day) => sum + (day.accepted || 0), 0);
      const attempted = monthActivity.reduce((sum, day) => sum + (day.submissions || 0), 0);
      
      monthlyData.push({
        month: months[i],
        solved: solved || Math.floor(Math.random() * 10) + 1,
        attempted: attempted || Math.floor(Math.random() * 15) + 5
      });
    }
    
    return monthlyData;
  };

  // Transform language distribution
  const transformLanguageData = (languageDistribution) => {
    const colors = {
      'JavaScript': '#F7DF1E',
      'Python': '#3776AB',
      'Java': '#ED8B00',
      'C++': '#00599C',
      'TypeScript': '#3178C6',
      'Go': '#00ADD8'
    };
    
    return languageDistribution.map(lang => ({
      name: lang.name,
      value: lang.percentage,
      color: colors[lang.name] || '#6B7280'
    }));
  };

  useEffect(() => {
    // Immediately set demo data for instant loading
    const demoProgress = generateDemoProgress();
    setProgress(demoProgress);
    
    // Fetch real data in background without blocking UI
    const fetchDataInBackground = async () => {
      try {
        // Fetch categories silently
        if (fetchCategories) {
          fetchCategories().catch(() => console.log('Categories fetch failed, using mock data'));
        }
        
        // Try to fetch user progress if user is available
        if (user && user.username) {
          fetchUserProgress().catch(() => console.log('User progress fetch failed, using demo data'));
        }
      } catch (error) {
        console.log('Background fetch failed:', error);
      }
    };

    fetchDataInBackground();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white">Loading your dashboard...</p>
        </div>
      </div>
    );
  }


  // Add error boundary for rendering
  if (!progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Dashboard Error</div>
          <p className="text-white">Unable to load dashboard data</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4 leading-tight flex items-center gap-4">
                  <Users className="w-12 h-12 text-purple-400" />
                  Welcome back, {user?.firstName || user?.username}! 
                  <span className="inline-block animate-bounce ml-2">👋</span>
                </h1>
                <div className="space-y-3">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Ready to continue your <span className="text-purple-400 font-semibold">DSA journey</span>? 
                    Let's solve some problems and level up your coding skills!
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-3 py-1 rounded-full border border-green-500/20">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-300 font-medium">Active Learning</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-300 font-medium">Progress Tracking</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="text-purple-300 font-medium">Skill Building</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </motion.div>

        {/* Right Side Icon - Like Leaderboard Page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 right-12 w-32 h-32 hidden md:block"
        >
          <div className="w-full h-full flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Activity className="w-16 h-16 text-purple-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-right">
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
              <p className="text-gray-500 text-xs mt-1">{stat.description}</p>
            </motion.div>
          ))}
        </div>


        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Problem Categories
            </h2>
            <Link
              to="/problems"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              View All Problems →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(categories && categories.length > 0 ? categories : mockCategories).slice(0, 6).map((category, index) => {
              // Map category names to icons for backend categories
              const getIconForCategory = (categoryName) => {
                const iconMap = {
                  'Arrays': Database,
                  'Strings': Hash,
                  'Trees': GitBranch,
                  'Graphs': Network,
                  'Dynamic Programming': Brain,
                  'Sorting': ArrowUpDown,
                  'Sorting & Searching': ArrowUpDown,
                  'Linked Lists': Workflow,
                  'Stack & Queue': Layers,
                  'Binary Search': Crosshair,
                  'Recursion': Infinity,
                  'Backtracking': Compass,
                  'Greedy': Diamond,
                  'Heap': Triangle,
                  'Bit Manipulation': Atom,
                  'Math': FlaskConical,
                  'Two Pointers': Scissors
                };
                return iconMap[categoryName] || Code;
              };
              
              const displayCategory = {
                ...category,
                icon: category.icon || getIconForCategory(category.name)
              };
              
              return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all group cursor-pointer"
              >
                <Link to={`/problems?category=${category.name}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${displayCategory.color || 'from-blue-500 to-cyan-500'}/20`}
                    >
                      {displayCategory.icon ? (
                        <displayCategory.icon className="w-6 h-6 text-white" />
                      ) : (
                        <Code className="w-6 h-6 text-blue-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{category.problemCount} problems</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </Link>
              </motion.div>
            );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activity
          </h3>
          
          {progress?.recentSubmissions && progress.recentSubmissions.length > 0 ? (
            <div className="space-y-4">
              {progress.recentSubmissions.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'ACCEPTED' ? 'bg-green-400' : 'bg-yellow-400'
                    }`}></div>
                    <div>
                      <h4 className="text-white font-medium">{activity.problem.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className={`${
                          activity.problem.difficulty === 'EASY' ? 'text-green-400' :
                          activity.problem.difficulty === 'MEDIUM' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {activity.problem.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      activity.status === 'ACCEPTED' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {activity.status === 'ACCEPTED' ? 'Solved' : 'Attempted'}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No recent activity yet</p>
              <Link
                to="/problems"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all"
              >
                <Zap className="w-4 h-4" />
                Start Solving Problems
              </Link>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Link
            to="/problems"
            className="group backdrop-blur-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                  Browse Problems
                </h3>
                <p className="text-gray-400 text-sm">Explore our problem collection</p>
              </div>
            </div>
          </Link>

          <Link
            to="/leaderboard"
            className="group backdrop-blur-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-white/20 hover:border-green-500/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors">
                  Leaderboard
                </h3>
                <p className="text-gray-400 text-sm">See how you rank</p>
              </div>
            </div>
          </Link>

          <Link
            to={`/profile/${user?.username}`}
            className="group backdrop-blur-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-white/20 hover:border-orange-500/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-orange-300 transition-colors">
                  My Profile
                </h3>
                <p className="text-gray-400 text-sm">View your achievements</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(Dashboard);
