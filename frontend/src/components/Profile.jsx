import React, { useEffect, useState, memo, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Trophy, 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  Award,
  Star,
  Zap,
  Code,
  BookOpen,
  Activity,
  Edit,
  Settings,
  Share,
  Download,
  GitBranch,
  Flame,
  Medal,
  Crown
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import DynamicIcon from '../utils/iconMapping.jsx';
import { usersAPI } from '../services/api';
import toast from 'react-hot-toast';
import EditProfileModal from './Profile/EditProfileModal';
import SettingsModal from './Profile/Settings';
import useAuthStore from '../store/authStore';

// Removed 3D component for better stability

const Profile = () => {
  const { username } = useParams();
  const { user: currentUser } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const profileQuery = useQuery({
    queryKey: ['userProfile', username],
    queryFn: async () => {
      const res = await usersAPI.getProfile(username);
      return res.data.user;
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    cacheTime: 10 * 60 * 1000, // 10 minutes cache
  });

  const statsQuery = useQuery({
    queryKey: ['userStats', username],
    queryFn: async () => {
      const res = await usersAPI.getStats(username);
      return res.data.stats;
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    cacheTime: 10 * 60 * 1000, // 10 minutes cache
  });

  useEffect(() => {
    // Set mock data immediately for instant loading
    if (!profile && username) {
      setProfile({
        id: '1',
        username: username,
        firstName: 'User',
        lastName: 'Profile',
        email: `${username}@example.com`,
        avatar: null,
        role: 'USER',
        createdAt: new Date().toISOString()
      });
    }
    
    if (!stats) {
      setStats({
        problemsSolved: 0,
        problemsAttempted: 0,
        totalSubmissions: 0,
        successRate: 0,
        rank: 0,
        points: 0,
        streak: 0,
        difficultyBreakdown: { EASY: 0, MEDIUM: 0, HARD: 0 },
        recentSubmissions: [],
        activitySeries: [],
        languageDistribution: [],
        achievements: []
      });
    }
    
    // Update with real data when available
    if (profileQuery.data) setProfile(profileQuery.data);
    if (statsQuery.data) setStats(statsQuery.data);
    setIsOwnProfile(currentUser?.username === username);
  }, [profileQuery.data, statsQuery.data, currentUser, username, profile, stats]);

  const handleExport = async () => {
    if (!profile?.id) return;
    try {
      setExporting(true);
      const res = await usersAPI.exportUser(profile.id);
      const blob = new Blob([res.data], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `user_${profile.username}_export.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Export downloaded');
    } catch (e) {
      console.error('Export failed', e);
      toast.error('Export failed');
    } finally {
      setExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 p-8 rounded-2xl border border-white/10 bg-white/5 animate-pulse">
            <div className="h-8 w-1/3 bg-white/10 rounded mb-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-white/10 rounded-xl"></div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-white/10 rounded-xl border border-white/10 animate-pulse"></div>
            ))}
          </div>
          <div className="h-80 bg-white/10 rounded-2xl border border-white/10 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">User not found</h2>
          <p className="text-gray-400">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const difficultyData = [
    { name: 'Easy', value: stats?.difficultyBreakdown?.EASY || 0, color: '#10B981' },
    { name: 'Medium', value: stats?.difficultyBreakdown?.MEDIUM || 0, color: '#F59E0B' },
    { name: 'Hard', value: stats?.difficultyBreakdown?.HARD || 0, color: '#EF4444' }
  ];

  const activityData = stats?.recentSubmissions?.slice(0, 7).reverse().map((submission, index) => ({
    day: `Day ${index + 1}`,
    submissions: 1,
    accepted: submission.status === 'ACCEPTED' ? 1 : 0
  })) || [];

  // Achievements from backend
  const achievements = stats?.achievements || [];

  // 30-day progress from backend stats.activitySeries
  const progressData = (stats?.activitySeries || []).map((d, i) => ({
    day: i + 1,
    problems: d.submissions || 0,
    accepted: d.accepted || 0,
  }));

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8"
        >
          {/* Background Element */}
          <div className="absolute top-0 right-0 w-32 h-32 hidden lg:block">
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-16 h-16 text-green-400 animate-pulse" />
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Profile Picture and Basic Info */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center p-1">
                    <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                      {profile.avatar ? (
                        <img
                          src={profile.avatar}
                          alt={profile.username}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-16 h-16 text-white" />
                      )}
                    </div>
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">
                    {profile.firstName && profile.lastName 
                      ? `${profile.firstName} ${profile.lastName}`
                      : profile.username
                    }
                  </h1>
                  <p className="text-gray-400 text-xl mb-3">@{profile.username}</p>
                  
                  {/* Profile Stats Row */}
                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Joined {new Date(profile.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      {stats?.problemsSolved || 0} solved
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4" />
                      {stats?.streak || 0} day streak
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {isOwnProfile ? (
                      <>
                        <button onClick={() => setShowEdit(true)} className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all">
                          <Edit className="w-4 h-4" />
                          Edit Profile
                        </button>
                        <button onClick={() => setShowSettings(true)} className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-all">
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all">
                          <User className="w-4 h-4" />
                          Follow
                        </button>
                        <button className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-all">
                          <Share className="w-4 h-4" />
                          Share
                        </button>
                      </>
                    )}
                    <button onClick={handleExport} disabled={exporting} className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-all disabled:opacity-60">
                      <Download className="w-4 h-4" />
                      {exporting ? 'Exporting...' : 'Export'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Rank', value: stats?.rank ? `#${stats.rank}` : '—', icon: Medal, color: 'text-yellow-400' },
                  { label: 'Points', value: stats?.points ?? 0, icon: Star, color: 'text-purple-400' },
                  { label: 'Streak', value: stats?.streak ? `${stats.streak} days` : '0 days', icon: Flame, color: 'text-orange-400' },
                  { label: 'Rate', value: stats?.rate || '—', icon: Target, color: 'text-green-400' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Problems Solved',
              value: stats?.problemsSolved || 0,
              icon: Target,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Problems Attempted',
              value: stats?.problemsAttempted || 0,
              icon: Clock,
              color: 'from-yellow-500 to-orange-500'
            },
            {
              title: 'Total Submissions',
              value: stats?.totalSubmissions || 0,
              icon: TrendingUp,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Success Rate',
              value: typeof stats?.successRate === 'number' ? `${Math.round(stats.successRate)}%` : '0%',
              icon: Trophy,
              color: 'from-purple-500 to-pink-500'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Award className="w-6 h-6" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {(achievements || []).map((achievement, index) => (
              <motion.div
                key={achievement.id || index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`backdrop-blur-lg rounded-2xl p-6 border text-center transition-all hover:scale-105 ${
                  achievement.earnedAt 
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                {achievement.icon ? (
                  <DynamicIcon iconName={achievement.icon} className={`w-12 h-12 mx-auto mb-3 ${achievement.earnedAt ? 'text-yellow-400' : 'text-gray-500'}`} />
                ) : (
                  <Star className={`w-12 h-12 mx-auto mb-3 ${achievement.earnedAt ? 'text-yellow-400' : 'text-gray-500'}`} />
                )}
                <h3 className={`font-semibold mb-2 ${achievement.earnedAt ? 'text-white' : 'text-gray-400'}`}>
                  {achievement.name || achievement.title}
                </h3>
                <p className={`text-sm ${achievement.earnedAt ? 'text-gray-300' : 'text-gray-500'}`}>
                  {achievement.description || ''}
                </p>
                {achievement.earnedAt && (
                  <p className="text-xs text-yellow-400 mt-2">
                    Earned {new Date(achievement.earnedAt).toLocaleDateString()}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Progress Over Time */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              30-Day Progress
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData}>
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
                  <Area 
                    type="monotone" 
                    dataKey="problems" 
                    stroke="#8B5CF6" 
                    fill="url(#colorGradient)" 
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Difficulty Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Difficulty Split
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
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

          {/* Language Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Code className="w-5 h-5" />
              Languages Used
            </h3>
            <div className="space-y-4">
              {(stats?.languageDistribution || []).map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-white font-medium">{lang.name}</span>
                    <span className="text-gray-400">{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.percentage || 0}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                      className="h-2 rounded-full bg-purple-500"
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
              {(!stats?.languageDistribution || stats.languageDistribution.length === 0) && (
                <div className="text-center text-gray-400">No language data yet</div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Recent Submissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Recent Submissions</h3>
          <div className="space-y-3">
            {stats?.recentSubmissions?.slice(0, 10).map((submission) => (
              <div
                key={submission.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    submission.status === 'ACCEPTED' ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                  <div>
                    <h4 className="text-white font-medium">{submission.problem.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span className={`${
                        submission.problem.difficulty === 'EASY' ? 'text-green-400' :
                        submission.problem.difficulty === 'MEDIUM' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {submission.problem.difficulty}
                      </span>
                      <span>{submission.language}</span>
                      {submission.runtime && <span>{submission.runtime}ms</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${
                    submission.status === 'ACCEPTED' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {submission.status.replace('_', ' ')}
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
            
            {(!stats?.recentSubmissions || stats.recentSubmissions.length === 0) && (
              <div className="text-center py-8 text-gray-400">
                No submissions yet
              </div>
            )}
          </div>
        </motion.div>
      </div>
      {/* Modals */}
      <EditProfileModal
        open={showEdit}
        onClose={() => setShowEdit(false)}
        initial={profile}
      />
      <SettingsModal
        open={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
};

export default memo(Profile);

