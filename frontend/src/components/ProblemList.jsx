import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, Box } from '@react-three/drei';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  BookOpen,
  Code,
  TrendingUp,
  Star,
  Play,
  Award,
  Target,
  Zap,
  Grid,
  List,
  Users
} from 'lucide-react';
import useProblemStore from '../store/problemStore';
import DynamicIcon from '../utils/iconMapping.jsx';

function FloatingCode() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <Box args={[0.4, 0.4, 0.4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8B5CF6" transparent opacity={0.6} wireframe />
      </Box>
    </Float>
  );
}

const ProblemList = () => {
  const {
    problems,
    categories,
    filters,
    pagination,
    isLoading,
    setFilters,
    fetchProblems,
    fetchCategories,
    setPage
  } = useProblemStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProblems();
    fetchCategories();
  }, [fetchProblems, fetchCategories]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setFilters({ search: searchTerm });
      fetchProblems();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, setFilters, fetchProblems]);

  const handleFilterChange = (key, value) => {
    setFilters({ [key]: value });
    fetchProblems();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchProblems();
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'EASY': return 'text-green-400 bg-green-400/10';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-400/10';
      case 'HARD': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SOLVED': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'ATTEMPTED': return <Clock className="w-5 h-5 text-yellow-400" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const solvedCount = problems.filter(p => p.userProgress?.status === 'SOLVED').length;
  const attemptedCount = problems.filter(p => p.userProgress?.status === 'ATTEMPTED').length;
  const totalCount = problems.length;

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with 3D Element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 hidden lg:block">
            <Canvas>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={0.5} />
              <FloatingCode />
            </Canvas>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 flex items-center gap-3">
            <Code className="w-12 h-12 text-blue-400" />
            Problem Arena
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-6">
            Challenge yourself with our comprehensive collection of DSA problems. 
            From beginner-friendly to expert-level challenges.
          </p>
          
          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="backdrop-blur-lg bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{solvedCount}</p>
                  <p className="text-gray-400 text-sm">Solved</p>
                </div>
              </div>
            </div>
            
            <div className="backdrop-blur-lg bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{attemptedCount}</p>
                  <p className="text-gray-400 text-sm">Attempted</p>
                </div>
              </div>
            </div>
            
            <div className="backdrop-blur-lg bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{totalCount}</p>
                  <p className="text-gray-400 text-sm">Total</p>
                </div>
              </div>
            </div>
            
            <div className="backdrop-blur-lg bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0}%
                  </p>
                  <p className="text-gray-400 text-sm">Progress</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-3 py-1 bg-white/10 rounded-lg text-white text-sm"
              >
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">View:</span>
              <div className="flex bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-purple-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list' 
                      ? 'bg-purple-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Category Filter */}
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>

              {/* Difficulty Filter */}
              <select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Difficulties</option>
                <option value="EASY">🟢 Easy</option>
                <option value="MEDIUM">🟡 Medium</option>
                <option value="HARD">🔴 Hard</option>
              </select>

              {/* Status Filter */}
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Status</option>
                <option value="NOT_STARTED">⚪ Not Started</option>
                <option value="ATTEMPTED">🟡 Attempted</option>
                <option value="SOLVED">🟢 Solved</option>
              </select>
            </div>
            
            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => handleFilterChange('difficulty', 'EASY')}
                className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm hover:bg-green-500/30 transition-all"
              >
                Easy Problems
              </button>
              <button
                onClick={() => handleFilterChange('status', 'NOT_STARTED')}
                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm hover:bg-blue-500/30 transition-all"
              >
                New Challenges
              </button>
              <button
                onClick={() => handleFilterChange('status', 'ATTEMPTED')}
                className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm hover:bg-yellow-500/30 transition-all"
              >
                Retry Problems
              </button>
              <button
                onClick={() => {
                  setFilters({ category: '', difficulty: '', status: '', search: '' });
                  setSearchTerm('');
                  fetchProblems();
                }}
                className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-sm hover:bg-gray-500/30 transition-all"
              >
                Clear All
              </button>
            </div>
          </div>
        </motion.div>

        {/* Problems Display */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading problems...</p>
            </div>
          </div>
        ) : problems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No problems found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setFilters({ category: '', difficulty: '', status: '', search: '' });
                setSearchTerm('');
                fetchProblems();
              }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}
          >
            {problems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: viewMode === 'grid' ? 1.02 : 1.01 }}
                className="backdrop-blur-lg bg-white/10 rounded-xl border border-white/20 hover:border-purple-500/50 transition-all group"
              >
                <Link to={`/problems/${problem.slug}`} className="block p-6">
                  {viewMode === 'grid' ? (
                    // Grid View
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(problem.userProgress?.status)}
                          <div>
                            <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors mb-1">
                              {problem.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: problem.category.color }}
                              ></span>
                              <span className="text-gray-400 text-sm">
                                {problem.category.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                          <Play className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {problem.tags.slice(0, 4).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {problem.submissionCount}
                          </span>
                          {problem.userProgress?.attempts > 0 && (
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {problem.userProgress.attempts} attempts
                            </span>
                          )}
                        </div>
                        {problem.userProgress?.bestTime && (
                          <span className="flex items-center gap-1">
                            <Zap className="w-4 h-4" />
                            {problem.userProgress.bestTime}ms
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    // List View
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center justify-center w-12 h-12">
                          {getStatusIcon(problem.userProgress?.status)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                              {problem.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <span 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: problem.category.color }}
                              ></span>
                              <span>{problem.category.name}</span>
                            </div>
                            <span>{problem.submissionCount} submissions</span>
                            {problem.userProgress?.attempts > 0 && (
                              <span>{problem.userProgress.attempts} attempts</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex flex-wrap gap-1">
                          {problem.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Play className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      </div>
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Enhanced Pagination */}
        {pagination.pages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-400 text-sm">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} problems
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Problems per page:</span>
                  <select
                    value={pagination.limit}
                    onChange={(e) => {
                      setFilters({ ...filters });
                      fetchProblems();
                    }}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={pagination.page === 1}
                    className="px-3 py-2 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    First
                  </button>
                  
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-3 py-2 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    let page;
                    if (pagination.pages <= 5) {
                      page = i + 1;
                    } else if (pagination.page <= 3) {
                      page = i + 1;
                    } else if (pagination.page >= pagination.pages - 2) {
                      page = pagination.pages - 4 + i;
                    } else {
                      page = pagination.page - 2 + i;
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg transition-all ${
                          page === pagination.page
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="px-3 py-2 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                  
                  <button
                    onClick={() => handlePageChange(pagination.pages)}
                    disabled={pagination.page === pagination.pages}
                    className="px-3 py-2 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Last
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 text-center">
            <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Daily Challenge</h3>
            <p className="text-gray-400 text-sm mb-4">
              Solve today's featured problem and earn bonus points!
            </p>
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all">
              Start Challenge
            </button>
          </div>
          
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 text-center">
            <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Random Problem</h3>
            <p className="text-gray-400 text-sm mb-4">
              Challenge yourself with a randomly selected problem.
            </p>
            <button 
              onClick={() => {
                if (problems.length > 0) {
                  const randomProblem = problems[Math.floor(Math.random() * problems.length)];
                  window.location.href = `/problems/${randomProblem.slug}`;
                }
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Surprise Me
            </button>
          </div>
          
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 text-center">
            <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Study Plan</h3>
            <p className="text-gray-400 text-sm mb-4">
              Follow a structured learning path tailored to your level.
            </p>
            <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all">
              View Plans
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProblemList;
