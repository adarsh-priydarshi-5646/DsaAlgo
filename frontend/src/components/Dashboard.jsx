import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, Box } from '@react-three/drei';
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
  Activity
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useAuthStore from '../store/authStore';
import useProblemStore from '../store/problemStore';
import { progressAPI } from '../services/api';
import DynamicIcon from '../utils/iconMapping.jsx';

function FloatingStats() {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <Sphere args={[0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8B5CF6" transparent opacity={0.6} />
      </Sphere>
    </Float>
  );
}

const Dashboard = () => {
  const { user } = useAuthStore();
  const { categories, fetchCategories } = useProblemStore();
  const [progress, setProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await fetchCategories();
        const progressRes = await progressAPI.getProgress();
        setProgress(progressRes.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchCategories]);

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

  const stats = [
    {
      title: 'Problems Solved',
      value: progress?.summary?.totalSolved || 0,
      icon: Trophy,
      color: 'from-green-500 to-emerald-500',
      change: '+12%'
    },
    {
      title: 'Current Streak',
      value: '7 days',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      change: '+2 days'
    },
    {
      title: 'Total Attempts',
      value: progress?.summary?.totalAttempted || 0,
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      change: '+8%'
    },
    {
      title: 'Success Rate',
      value: `${progress?.summary?.completionRate || 0}%`,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      change: '+5%'
    }
  ];

  const difficultyData = [
    { name: 'Easy', value: 45, color: '#10B981' },
    { name: 'Medium', value: 30, color: '#F59E0B' },
    { name: 'Hard', value: 15, color: '#EF4444' }
  ];

  const weeklyData = [
    { day: 'Mon', problems: 3 },
    { day: 'Tue', problems: 5 },
    { day: 'Wed', problems: 2 },
    { day: 'Thu', problems: 7 },
    { day: 'Fri', problems: 4 },
    { day: 'Sat', problems: 6 },
    { day: 'Sun', problems: 3 }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {user?.firstName || user?.username}! 👋
              </h1>
              <p className="text-gray-400 text-lg">
                Ready to continue your DSA journey? Let's solve some problems!
              </p>
            </div>
            
            <div className="hidden md:block w-32 h-32">
              <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={0.5} />
                <FloatingStats />
              </Canvas>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Weekly Progress
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(148, 163, 184, 0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="problems" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Difficulty Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Difficulty Split
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(148, 163, 184, 0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {difficultyData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-400 text-sm">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
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
            {categories.slice(0, 6).map((category, index) => (
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
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <DynamicIcon 
                        iconName={category.icon} 
                        className="w-6 h-6"
                        style={{ color: category.color }}
                      />
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
            ))}
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
          
          {progress?.recentActivity && progress.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {progress.recentActivity.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'SOLVED' ? 'bg-green-400' : 'bg-yellow-400'
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
                        <span>{activity.problem.category.name}</span>
                        <span>{activity.attempts} attempts</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      activity.status === 'SOLVED' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {activity.status === 'SOLVED' ? 'Solved' : 'Attempted'}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(activity.lastAttempt).toLocaleDateString()}
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

export default Dashboard;
