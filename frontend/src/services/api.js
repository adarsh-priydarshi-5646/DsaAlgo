import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/password', data),
  updateSettings: (preferences) => api.patch('/auth/settings', { preferences }),
};

// Problems API
export const problemsAPI = {
  getProblems: (params) => api.get('/problems', { params }),
  getProblem: (slug) => api.get(`/problems/${slug}`),
  submitSolution: (slug, data) => api.post(`/problems/${slug}/submit`, data),
  getCategories: () => api.get('/problems/categories/all'),
  createProblem: (data) => api.post('/problems', data),
};

// Users API
export const usersAPI = {
  getProfile: (username) => api.get(`/users/${username}`),
  getStats: (username) => api.get(`/users/${username}/stats`),
  exportUser: (id) => api.get(`/users/${id}/export`, { responseType: 'blob' }),
};

// Progress API
export const progressAPI = {
  getProgress: () => api.get('/progress'),
  getUserStats: () => api.get('/progress/stats'),
  getProblemProgress: (problemId) => api.get(`/progress/problem/${problemId}`),
  updateProgress: (problemId, data) => api.put(`/progress/problem/${problemId}`, data),
};

// Leaderboard API
export const leaderboardAPI = {
  getLeaderboard: (params) => api.get('/leaderboard', { params }),
  getUserRank: (username) => api.get(`/leaderboard/user/${username}`),
};

export default api;
