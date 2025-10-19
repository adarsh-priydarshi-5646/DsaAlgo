import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
  Users, 
  Code, 
  Activity, 
  Settings,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Shield,
  LogOut,
  BookOpen,
  FileText,
  Search,
  Filter,
  Eye,
  Save,
  X,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Database,
  Globe,
  TrendingUp,
  Calendar,
  Star,
  Award,
  Layers,
  Terminal,
  GitBranch,
  Hash
} from 'lucide-react';
import { ownerAPI } from '../services/api';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import OwnerModals from '../components/OwnerModals';

const OwnerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [problems, setProblems] = useState([]);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'problem', 'question', 'user'
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
    fetchProblems();
    fetchInterviewQuestions();
    fetchUsers();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await ownerAPI.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      // Set demo stats if API fails
      setStats({
        overview: {
          totalUsers: 5,
          totalProblems: 12,
          totalSubmissions: 45,
          acceptedSubmissions: 28,
          acceptanceRate: 62.2,
          totalTestCases: 48,
          recentUsers: 2,
          recentSubmissions: 8
        },
        problemsByDifficulty: [
          { difficulty: 'EASY', _count: { difficulty: 5 } },
          { difficulty: 'MEDIUM', _count: { difficulty: 4 } },
          { difficulty: 'HARD', _count: { difficulty: 3 } }
        ],
        submissionsByStatus: [
          { status: 'ACCEPTED', _count: { status: 28 } },
          { status: 'WRONG_ANSWER', _count: { status: 12 } },
          { status: 'TIME_LIMIT_EXCEEDED', _count: { status: 5 } }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProblems = async () => {
    // Mock problems data
    setProblems([
      { id: 1, title: 'Two Sum', difficulty: 'EASY', category: 'Arrays', status: 'ACTIVE', submissions: 15 },
      { id: 2, title: 'Add Two Numbers', difficulty: 'MEDIUM', category: 'Linked Lists', status: 'ACTIVE', submissions: 8 },
      { id: 3, title: 'Longest Substring', difficulty: 'MEDIUM', category: 'Strings', status: 'DRAFT', submissions: 0 },
      { id: 4, title: 'Median of Arrays', difficulty: 'HARD', category: 'Arrays', status: 'ACTIVE', submissions: 3 }
    ]);
  };

  const fetchInterviewQuestions = async () => {
    // Mock interview questions data
    setInterviewQuestions([
      { id: 1, title: 'What is Closure in JavaScript?', category: 'JavaScript', difficulty: 'MEDIUM', status: 'PUBLISHED' },
      { id: 2, title: 'Explain React Hooks', category: 'React', difficulty: 'EASY', status: 'PUBLISHED' },
      { id: 3, title: 'Node.js Event Loop', category: 'Node.js', difficulty: 'HARD', status: 'DRAFT' },
      { id: 4, title: 'CSS Flexbox vs Grid', category: 'CSS', difficulty: 'MEDIUM', status: 'PUBLISHED' }
    ]);
  };

  const fetchUsers = async () => {
    // Mock users data
    setUsers([
      { id: 1, username: 'john_doe', email: 'john@example.com', role: 'USER', isVerified: true, problemsSolved: 8, joinDate: '2024-01-15' },
      { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'USER', isVerified: true, problemsSolved: 12, joinDate: '2024-02-20' },
      { id: 3, username: 'dev_master', email: 'dev@example.com', role: 'USER', isVerified: false, problemsSolved: 3, joinDate: '2024-03-10' }
    ]);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setEditingItem(null);
  };

  const handleDelete = async (type, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        if (type === 'problem') {
          await ownerAPI.deleteProblem(id);
          setProblems(problems.filter(p => p.id !== id));
          toast.success('Problem deleted successfully');
        } else if (type === 'question') {
          setInterviewQuestions(interviewQuestions.filter(q => q.id !== id));
          toast.success('Interview question deleted successfully');
        } else if (type === 'user') {
          setUsers(users.filter(u => u.id !== id));
          toast.success('User deleted successfully');
        }
      } catch (error) {
        toast.error('Failed to delete item');
      }
    }
  };

  const handleSave = (savedItem) => {
    if (modalType === 'problem') {
      if (editingItem) {
        setProblems(problems.map(p => p.id === savedItem.id ? savedItem : p));
      } else {
        setProblems([...problems, savedItem]);
      }
    } else if (modalType === 'question') {
      if (editingItem) {
        setInterviewQuestions(interviewQuestions.map(q => q.id === savedItem.id ? savedItem : q));
      } else {
        setInterviewQuestions([...interviewQuestions, savedItem]);
      }
    } else if (modalType === 'user') {
      if (editingItem) {
        setUsers(users.map(u => u.id === savedItem.id ? savedItem : u));
      } else {
        setUsers([...users, savedItem]);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-white">Loading owner dashboard...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'problems', name: 'Problems', icon: Code },
    { id: 'questions', name: 'Interview Questions', icon: BookOpen },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Enhanced Header */}
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Crown className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Owner Control Panel
                </h1>
                <p className="text-gray-400 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Welcome back, {user?.firstName || 'Admin'} • Full Administrative Access
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">System Online</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all relative ${
                  activeTab === tab.id
                    ? 'text-yellow-400 bg-yellow-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Total Users',
                    value: stats?.overview?.totalUsers || 0,
                    icon: Users,
                    color: 'from-blue-500 to-cyan-500',
                    change: `+${stats?.overview?.recentUsers || 0} this week`,
                    trend: 'up'
                  },
                  {
                    title: 'Total Problems',
                    value: stats?.overview?.totalProblems || 0,
                    icon: Code,
                    color: 'from-green-500 to-emerald-500',
                    change: 'Active & Draft',
                    trend: 'up'
                  },
                  {
                    title: 'Total Submissions',
                    value: stats?.overview?.totalSubmissions || 0,
                    icon: Activity,
                    color: 'from-purple-500 to-pink-500',
                    change: `${stats?.overview?.acceptanceRate || 0}% acceptance rate`,
                    trend: 'up'
                  },
                  {
                    title: 'System Health',
                    value: '99.9%',
                    icon: Shield,
                    color: 'from-orange-500 to-red-500',
                    change: 'All systems operational',
                    trend: 'stable'
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex items-center gap-1">
                        {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
                        {stat.trend === 'stable' && <Target className="w-4 h-4 text-blue-400" />}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                    <p className="text-gray-300 font-medium mb-1">{stat.title}</p>
                    <p className="text-xs text-gray-500">{stat.change}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Problems Tab */}
        {activeTab === 'problems' && (
          <motion.div
            key="problems"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Code className="w-8 h-8 text-blue-400" />
                Problem Management
              </h2>
              <button
                onClick={() => openModal('problem')}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Problem
              </button>
            </div>
            
            <div className="grid gap-4">
              {problems.map((problem) => (
                <div key={problem.id} className="backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{problem.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className={`px-2 py-1 rounded ${
                            problem.difficulty === 'EASY' ? 'bg-green-500/20 text-green-400' :
                            problem.difficulty === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {problem.difficulty}
                          </span>
                          <span>{problem.category}</span>
                          <span>{problem.submissions} submissions</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal('problem', problem)}
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete('problem', problem.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Interview Questions Tab */}
        {activeTab === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-purple-400" />
                Interview Questions
              </h2>
              <button
                onClick={() => openModal('question')}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Question
              </button>
            </div>
            
            <div className="grid gap-4">
              {interviewQuestions.map((question) => (
                <div key={question.id} className="backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{question.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className={`px-2 py-1 rounded ${
                            question.difficulty === 'EASY' ? 'bg-green-500/20 text-green-400' :
                            question.difficulty === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {question.difficulty}
                          </span>
                          <span>{question.category}</span>
                          <span className={`px-2 py-1 rounded ${
                            question.status === 'PUBLISHED' ? 'bg-green-500/20 text-green-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {question.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal('question', question)}
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete('question', question.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Users className="w-8 h-8 text-green-400" />
                User Management
              </h2>
              <button
                onClick={() => openModal('user')}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add User
              </button>
            </div>
            
            <div className="grid gap-4">
              {users.map((user) => (
                <div key={user.id} className="backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{user.username}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{user.email}</span>
                          <span className={`px-2 py-1 rounded ${
                            user.isVerified ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {user.isVerified ? 'Verified' : 'Unverified'}
                          </span>
                          <span>{user.problemsSolved} problems solved</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal('user', user)}
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete('user', user.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-orange-400" />
                Platform Analytics
              </h2>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {stats?.overview?.acceptanceRate || 0}%
                </h3>
                <p className="text-gray-300 text-sm mb-1">Acceptance Rate</p>
                <p className="text-xs text-green-400">+5.2% from last month</p>
              </div>

              <div className="backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">2.3s</h3>
                <p className="text-gray-300 text-sm mb-1">Avg Response Time</p>
                <p className="text-xs text-blue-400">Optimal performance</p>
              </div>

              <div className="backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {stats?.overview?.recentSubmissions || 0}
                </h3>
                <p className="text-gray-300 text-sm mb-1">Daily Submissions</p>
                <p className="text-xs text-green-400">+12% from yesterday</p>
              </div>
            </div>

            {/* Problem Difficulty Distribution */}
            <div className="backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                Problem Difficulty Distribution
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats?.problemsByDifficulty?.map((item, index) => (
                  <div key={item.difficulty} className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                      item.difficulty === 'EASY' ? 'bg-green-500/20 text-green-400' :
                      item.difficulty === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      <span className="text-2xl font-bold">{item._count?.difficulty || 0}</span>
                    </div>
                    <p className="text-white font-medium">{item.difficulty}</p>
                    <p className="text-xs text-gray-400">Problems</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-purple-400" />
                Recent Platform Activity
              </h3>
              <div className="space-y-4">
                {[
                  { action: 'New user registered', user: 'john_doe', time: '2 minutes ago', icon: Users, color: 'text-green-400' },
                  { action: 'Problem solved', user: 'jane_smith', time: '5 minutes ago', icon: CheckCircle, color: 'text-blue-400' },
                  { action: 'New submission', user: 'dev_master', time: '8 minutes ago', icon: Code, color: 'text-purple-400' },
                  { action: 'User verified', user: 'alice_wonder', time: '12 minutes ago', icon: Shield, color: 'text-yellow-400' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                    <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ${activity.color}`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-gray-400 text-xs">by {activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <OwnerModals
        showModal={showModal}
        modalType={modalType}
        editingItem={editingItem}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default OwnerDashboard;
