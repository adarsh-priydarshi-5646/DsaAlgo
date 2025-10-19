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
    set({ isLoading: true });
    
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

      // Update with real data
      set({
        leaderboard,
        metadata,
        isLoading: false
      });
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      // Set empty data if API fails
      set({
        leaderboard: [],
        metadata: {
          totalUsers: 0,
          totalProblems: 0,
          totalSubmissions: 0,
          activeUsers: 0
        },
        isLoading: false
      });
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
