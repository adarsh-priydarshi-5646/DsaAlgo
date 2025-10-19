import { create } from 'zustand';
import { leaderboardAPI } from '../services/api';
import toast from 'react-hot-toast';

const useLeaderboardStore = create((set, get) => ({
  leaderboard: [],
  metadata: null,
  userRank: null,
  isLoading: false,
  filters: {
    type: 'problems_solved',
    timeframe: 'all_time',
    limit: 50
  },

  // Actions
  setFilters: (newFilters) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters }
    }));
  },

  fetchLeaderboard: async (params = {}) => {
    // Generate mock data immediately for instant loading
    const mockLeaderboard = Array.from({ length: 20 }, (_, i) => ({
      rank: i + 1,
      user: {
        id: `user-${i + 1}`,
        username: `user${i + 1}`,
        firstName: `User`,
        lastName: `${i + 1}`,
        avatar: null
      },
      score: Math.max(1000 - i * 50 + Math.floor(Math.random() * 100), 10),
      problemsSolved: Math.max(50 - i * 2 + Math.floor(Math.random() * 10), 1),
      totalSubmissions: Math.max(100 - i * 4 + Math.floor(Math.random() * 20), 5),
      successRate: Math.max(95 - i * 2 + Math.floor(Math.random() * 10), 20),
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    }));

    const mockMetadata = {
      totalUsers: 1250,
      totalPages: 25,
      currentPage: 1,
      hasNext: true,
      hasPrev: false
    };

    // Set mock data immediately
    set({
      leaderboard: mockLeaderboard,
      metadata: mockMetadata,
      isLoading: false
    });

    // Fetch real data in background
    try {
      const { filters } = get();
      const queryParams = {
        ...filters,
        ...params
      };

      // Remove empty filters
      Object.keys(queryParams).forEach(key => {
        if (queryParams[key] === '' || queryParams[key] === null || queryParams[key] === undefined) {
          delete queryParams[key];
        }
      });

      console.log('Fetching leaderboard with params:', queryParams);
      const response = await leaderboardAPI.getLeaderboard(queryParams);
      console.log('Leaderboard response:', response.data);
      
      const { leaderboard, metadata } = response.data;

      // Update with real data when available
      set({
        leaderboard,
        metadata
      });
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      // Keep mock data if API fails
      console.log('Using mock leaderboard data due to API failure');
    }
  },

  fetchUserRank: async (username) => {
    try {
      console.log('Fetching user rank for:', username);
      const response = await leaderboardAPI.getUserRank(username);
      console.log('User rank response:', response.data);
      
      set({ userRank: response.data });
    } catch (error) {
      console.error('Failed to fetch user rank:', error);
      toast.error('Failed to fetch user rank: ' + (error.response?.data?.error || error.message));
    }
  },

  // Utility functions
  getCurrentUserRank: () => {
    const { leaderboard } = get();
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (!currentUser.username) return null;
    
    return leaderboard.find(item => item.user.username === currentUser.username);
  }
}));

export default useLeaderboardStore;
