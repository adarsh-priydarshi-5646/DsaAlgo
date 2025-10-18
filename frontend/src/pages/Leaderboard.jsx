import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Users, 
  TrendingUp, 
  Medal, 
  Crown,
  Award,
  Zap,
  Calendar,
  Filter,
  Search,
  Target,
  Clock,
  Flame,
  Shield,
  Gem,
  Sword,
  Rocket,
  Brain,
  Code,
  ChevronUp,
  ChevronDown,
  Eye,
  BarChart3,
  Activity
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import useLeaderboardStore from '../store/leaderboardStore';
import { leaderboardAPI } from '../services/api';

// Removed 3D component for better stability

export default function Leaderboard() {
  const { user } = useAuthStore();
  const { 
    leaderboard, 
    metadata, 
    isLoading, 
    filters,
    fetchLeaderboard,
    setFilters 
  } = useLeaderboardStore();
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, [filters.type, filters.timeframe, fetchLeaderboard]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter leaderboard based on search term
  const filteredLeaderboard = leaderboard.filter(item =>
    item.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-sm font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600';
    return 'bg-gradient-to-r from-purple-500 to-blue-500';
  };

  // Achievement badges as simple React icons
  const getAchievementBadges = (score) => {
    const badges = [];
    
    if (score >= 1000) badges.push({ icon: Crown, color: 'text-yellow-400', name: 'Legend' });
    if (score >= 500) badges.push({ icon: Flame, color: 'text-orange-400', name: 'Fire Solver' });
    if (score >= 300) badges.push({ icon: Rocket, color: 'text-blue-400', name: 'Speed Demon' });
    if (score >= 200) badges.push({ icon: Shield, color: 'text-green-400', name: 'Defender' });
    if (score >= 100) badges.push({ icon: Sword, color: 'text-red-400', name: 'Warrior' });
    if (score >= 50) badges.push({ icon: Star, color: 'text-purple-400', name: 'Rising Star' });
    if (score >= 25) badges.push({ icon: Gem, color: 'text-cyan-400', name: 'Gem Collector' });
    if (score >= 10) badges.push({ icon: Brain, color: 'text-pink-400', name: 'Thinker' });
    
    return badges.slice(0, 3); // Show max 3 badges
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  // Use the already filtered data from above

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with 3D Element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 hidden md:block">
            <div className="w-full h-full flex items-center justify-center">
              <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4 flex items-center gap-3">
            <Trophy className="w-12 h-12 text-yellow-400" />
            Leaderboard
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Compete with the best minds in DSA. Climb the ranks and showcase your problem-solving skills!
          </p>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Participants',
              value: metadata?.totalUsers || '1,234',
              subtitle: '+12% this week',
              icon: Users,
              color: 'from-blue-500 to-cyan-500',
              trend: 'up'
            },
            {
              title: 'Problems Solved',
              value: metadata?.totalProblems || '15.2K',
              subtitle: 'Across all users',
              icon: Code,
              color: 'from-green-500 to-emerald-500',
              trend: 'up'
            },
            {
              title: 'Total Submissions',
              value: metadata?.totalSubmissions || '50K+',
              subtitle: 'Last 30 days',
              icon: Activity,
              color: 'from-purple-500 to-pink-500',
              trend: 'up'
            },
            {
              title: 'Active Now',
              value: '234',
              subtitle: 'Online users',
              icon: Zap,
              color: 'from-orange-500 to-red-500',
              trend: 'stable'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  {stat.trend === 'up' && <ChevronUp className="w-4 h-4 text-green-400" />}
                  {stat.trend === 'down' && <ChevronDown className="w-4 h-4 text-red-400" />}
                  {stat.trend === 'stable' && <BarChart3 className="w-4 h-4 text-gray-400" />}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Tabs */}
              <div className="flex bg-white/5 rounded-lg p-1">
                {[
                  { id: 'problems_solved', label: 'Problems Solved' },
                  { id: 'submissions', label: 'Submissions' },
                  { id: 'recent_activity', label: 'Recent Activity' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => handleFilterChange({ type: tab.id })}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      filters.type === tab.id
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Timeframe Filter */}
              <select
                value={filters.timeframe}
                onChange={(e) => handleFilterChange({ timeframe: e.target.value })}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all_time">All Time</option>
                <option value="this_month">This Month</option>
                <option value="this_week">This Week</option>
              </select>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        {filteredLeaderboard.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex justify-center items-end gap-8 mb-8">
              {/* Second Place */}
              {filteredLeaderboard[1] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <div className="text-center">
                    <Medal className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-gray-300 font-semibold text-sm">2nd</span>
                  </div>
                  <div className="mt-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-2 flex items-center justify-center">
                      {filteredLeaderboard[1].user.avatar ? (
                        <img src={filteredLeaderboard[1].user.avatar} alt="" className="w-full h-full rounded-full" />
                      ) : (
                        <Users className="w-8 h-8 text-gray-300" />
                      )}
                    </div>
                    <p className="text-white font-semibold">{filteredLeaderboard[1].user.username}</p>
                    <p className="text-gray-400 text-sm">{filteredLeaderboard[1].score} {filteredLeaderboard[1].metric}</p>
                  </div>
                </motion.div>
              )}

              {/* First Place */}
              {filteredLeaderboard[0] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center"
                >
                  <div className="text-center">
                    <Crown className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
                    <span className="text-yellow-400 font-bold text-base">1st</span>
                  </div>
                  <div className="mt-4">
                    <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-2 flex items-center justify-center">
                      {filteredLeaderboard[0].user.avatar ? (
                        <img src={filteredLeaderboard[0].user.avatar} alt="" className="w-full h-full rounded-full" />
                      ) : (
                        <Users className="w-10 h-10 text-yellow-400" />
                      )}
                    </div>
                    <p className="text-white font-semibold text-lg">{filteredLeaderboard[0].user.username}</p>
                    <p className="text-gray-400">{filteredLeaderboard[0].score} {filteredLeaderboard[0].metric}</p>
                  </div>
                </motion.div>
              )}

              {/* Third Place */}
              {filteredLeaderboard[2] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center"
                >
                  <div className="text-center">
                    <Award className="w-7 h-7 text-amber-600 mx-auto mb-2" />
                    <span className="text-amber-500 font-semibold text-sm">3rd</span>
                  </div>
                  <div className="mt-4">
                    <div className="w-14 h-14 bg-gray-700 rounded-full mx-auto mb-2 flex items-center justify-center">
                      {filteredLeaderboard[2].user.avatar ? (
                        <img src={filteredLeaderboard[2].user.avatar} alt="" className="w-full h-full rounded-full" />
                      ) : (
                        <Users className="w-7 h-7 text-amber-500" />
                      )}
                    </div>
                    <p className="text-white font-semibold">{filteredLeaderboard[2].user.username}</p>
                    <p className="text-gray-400 text-sm">{filteredLeaderboard[2].score} {filteredLeaderboard[2].metric}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Leaderboard List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 overflow-hidden"
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : filteredLeaderboard.length > 0 ? (
            <div className="divide-y divide-white/10">
              {filteredLeaderboard.map((item, index) => (
                <motion.div
                  key={item.user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-6 hover:bg-white/5 transition-all ${
                    item.user.username === user?.username ? 'bg-purple-500/20 border-l-4 border-purple-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(item.rank)}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${getRankBadge(item.rank)} rounded-full flex items-center justify-center`}>
                          {item.user.avatar ? (
                            <img src={item.user.avatar} alt="" className="w-full h-full rounded-full" />
                          ) : (
                            <Users className="w-6 h-6 text-white" />
                          )}
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-semibold text-lg">
                              {item.user.firstName && item.user.lastName 
                                ? `${item.user.firstName} ${item.user.lastName}`
                                : item.user.username
                              }
                            </h3>
                            {item.user.username === user?.username && (
                              <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full">You</span>
                            )}
                          </div>
                          <p className="text-gray-400 mb-2">@{item.user.username}</p>
                          
                          {/* Achievement Badges */}
                          <div className="flex items-center gap-1">
                            {getAchievementBadges(item.score).slice(0, 2).map((badge, badgeIndex) => {
                              const BadgeIcon = badge.icon;
                              return (
                                <BadgeIcon 
                                  key={badgeIndex}
                                  className={`w-3 h-3 ${badge.color}`} 
                                  title={badge.name}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2 mb-2">
                        <div className="text-2xl font-bold text-white">
                          {item.score}
                        </div>
                        <Eye className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="text-gray-400 text-sm mb-1">
                        {item.metric}
                      </div>
                      <div className="flex items-center justify-end gap-1 text-xs text-gray-500">
                        <Activity className="w-3 h-3" />
                        <span>Last active: 2h ago</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No users found</p>
            </div>
          )}
        </motion.div>

        {/* Enhanced Weekly Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-400" />
              Weekly Challenges
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Zap className="w-4 h-4" />
              <span>2 active challenges</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Dynamic Programming Marathon',
                description: 'Solve 10 DP problems to earn 500 bonus points!',
                participants: 1234,
                timeLeft: '3 days',
                difficulty: 'Hard',
                reward: '500 XP',
                progress: 30,
                icon: Brain,
                color: 'from-red-500 to-pink-500'
              },
              {
                title: 'Array Mastery Challenge',
                description: 'Complete 15 array problems in optimal time complexity.',
                participants: 856,
                timeLeft: '5 days',
                difficulty: 'Medium',
                reward: '300 XP',
                progress: 60,
                icon: Code,
                color: 'from-blue-500 to-cyan-500'
              }
            ].map((challenge, index) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 bg-gradient-to-r ${challenge.color} rounded-xl flex items-center justify-center`}>
                        <challenge.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{challenge.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-4">{challenge.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                        <span>Your Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${challenge.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {challenge.timeLeft}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {challenge.participants} joined
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)} bg-current/10`}>
                        {challenge.difficulty}
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">
                        {challenge.reward}
                      </span>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all"
                >
                  Join Challenge
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 