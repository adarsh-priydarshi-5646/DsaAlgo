import { create } from 'zustand';
import { problemsAPI, progressAPI } from '../services/api';
import toast from 'react-hot-toast';

const useProblemStore = create((set, get) => ({
  problems: [],
  categories: [],
  currentProblem: null,
  userProgress: null,
  submissions: [],
  isLoading: false,
  filters: {
    category: '',
    difficulty: '',
    status: '',
    search: ''
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  },

  // Actions
  setFilters: (newFilters) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, page: 1 }
    }));
  },

  fetchProblems: async (params = {}) => {
    set({ isLoading: true });
    try {
      const { filters, pagination } = get();
      const queryParams = {
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
        ...params
      };

      // Remove empty filters
      Object.keys(queryParams).forEach(key => {
        if (queryParams[key] === '' || queryParams[key] === null || queryParams[key] === undefined) {
          delete queryParams[key];
        }
      });

      console.log('Fetching problems with params:', queryParams);
      const response = await problemsAPI.getProblems(queryParams);
      console.log('Problems response:', response.data);
      
      const { problems, pagination: paginationData } = response.data;

      set({
        problems,
        pagination: paginationData,
        isLoading: false
      });
    } catch (error) {
      console.error('Failed to fetch problems:', error);
      set({ isLoading: false });
      toast.error('Failed to fetch problems: ' + (error.response?.data?.error || error.message));
    }
  },

  fetchProblem: async (slug) => {
    set({ isLoading: true });
    try {
      const response = await problemsAPI.getProblem(slug);
      const { problem } = response.data;

      set({
        currentProblem: problem,
        userProgress: problem.userProgress,
        submissions: problem.userSubmissions || [],
        isLoading: false
      });
    } catch {
      set({ isLoading: false });
      toast.error('Failed to fetch problem');
    }
  },

  fetchCategories: async () => {
    try {
      console.log('Fetching categories...');
      const response = await problemsAPI.getCategories();
      console.log('Categories response:', response.data);
      const { categories } = response.data;
      set({ categories });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('Failed to fetch categories: ' + (error.response?.data?.error || error.message));
    }
  },

  submitSolution: async (slug, solutionData) => {
    set({ isLoading: true });
    try {
      const response = await problemsAPI.submitSolution(slug, solutionData);
      const { submission } = response.data;

      // Update submissions list
      set(state => ({
        submissions: [submission, ...state.submissions],
        isLoading: false
      }));

      // Refresh problem to get updated progress
      await get().fetchProblem(slug);

      if (submission.status === 'ACCEPTED') {
        toast.success('🎉 Solution accepted!');
      } else {
        toast.error(`Solution ${submission.status.toLowerCase().replace('_', ' ')}`);
      }

      return { success: true, submission };
    } catch (error) {
      set({ isLoading: false });
      const message = error.response?.data?.error || 'Submission failed';
      toast.error(message);
      return { success: false, error: message };
    }
  },

  updateProgress: async (problemId, data) => {
    try {
      await progressAPI.updateProgress(problemId, data);
      toast.success('Progress updated');
    } catch {
      toast.error('Failed to update progress');
    }
  },

  setPage: (page) => {
    set(state => ({
      pagination: { ...state.pagination, page }
    }));
  },

  clearCurrentProblem: () => {
    set({
      currentProblem: null,
      userProgress: null,
      submissions: []
    });
  },

  // Utility functions
  getProblemsByDifficulty: () => {
    const { problems } = get();
    return problems.reduce((acc, problem) => {
      acc[problem.difficulty] = (acc[problem.difficulty] || 0) + 1;
      return acc;
    }, {});
  },

  getSolvedProblems: () => {
    const { problems } = get();
    return problems.filter(p => p.userProgress?.status === 'SOLVED');
  },

  getAttemptedProblems: () => {
    const { problems } = get();
    return problems.filter(p => p.userProgress?.status === 'ATTEMPTED');
  }
}));

export default useProblemStore;
