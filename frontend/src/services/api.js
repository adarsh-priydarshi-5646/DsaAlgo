import axios from 'axios';

// Smart environment detection for API URL
const getApiUrl = () => {
  // Check if running on Vercel production
  const isVercelProduction = window.location.hostname === 'dsa-algo-chi.vercel.app';
  // Check if running locally
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isVercelProduction) {
    console.log('🚀 Auto-detected: VERCEL PRODUCTION - Using production API');
    return 'https://dsaalgo.onrender.com/api';
  } else if (isLocalhost) {
    console.log('🔧 Auto-detected: LOCAL DEVELOPMENT - Using local API');
    return 'http://localhost:5001/api';
  } else {
    // Fallback to environment variables
    const nodeEnv = import.meta.env.VITE_NODE_ENV || import.meta.env.MODE || 'development';
    console.log(`🔍 Environment fallback: ${nodeEnv}`);
    
    if (nodeEnv === 'production') {
      return import.meta.env.VITE_API_URL_PROD || 'https://dsaalgo.onrender.com/api';
    } else {
      return import.meta.env.VITE_API_URL_DEV || 'http://localhost:5001/api';
    }
  }
};

const API_BASE_URL = import.meta.env.VITE_API_URL || getApiUrl();

console.log(`🌐 API Base URL: ${API_BASE_URL}`);
console.log(`🌐 Current hostname: ${window.location.hostname}`);
console.log(`🌐 Current protocol: ${window.location.protocol}`);
console.log(`🌐 Environment: ${import.meta.env.MODE}`);

// Test API connectivity
const testApiConnectivity = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`, {
      method: 'GET',
      mode: 'cors'
    });
    if (response.ok) {
      console.log('✅ API connectivity test passed');
    } else {
      console.warn('⚠️ API connectivity test failed:', response.status);
    }
  } catch (error) {
    console.error('❌ API connectivity test error:', error.message);
  }
};

// Run connectivity test
testApiConnectivity();

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
  withCredentials: true, // Include credentials for CORS
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
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        method: error.config?.method,
        url: error.config?.url,
        baseURL: error.config?.baseURL
      }
    });
    
    // Handle network errors
    if (!error.response) {
      console.error('Network Error - No response received');
      // Don't redirect on network errors, let the component handle it
      return Promise.reject({
        ...error,
        message: 'Network error - please check your connection and try again'
      });
    }
    
    // Handle 401 errors
    if (error.response?.status === 401) {
      console.log('Unauthorized - clearing auth state');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/oauth/callback') {
        window.location.href = '/login';
      }
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
