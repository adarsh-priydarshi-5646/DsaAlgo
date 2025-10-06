import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const response = await authAPI.login(credentials);
          const { user, token } = response.data;
          
          localStorage.setItem('token', token);
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          toast.success('Login successful!');
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          const message = error.response?.data?.error || 'Login failed';
          toast.error(message);
          return { success: false, error: message };
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          const response = await authAPI.register(userData);
          const { user, token } = response.data;
          
          localStorage.setItem('token', token);
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          toast.success('Registration successful!');
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          const message = error.response?.data?.error || 'Registration failed';
          toast.error(message);
          return { success: false, error: message };
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
        toast.success('Logged out successfully');
      },

      updateProfile: async (data) => {
        set({ isLoading: true });
        try {
          const response = await authAPI.updateProfile(data);
          const { user } = response.data;
          
          set({ user, isLoading: false });
          toast.success('Profile updated successfully!');
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          const message = error.response?.data?.error || 'Update failed';
          toast.error(message);
          return { success: false, error: message };
        }
      },

      fetchUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        set({ isLoading: true });
        try {
          const response = await authAPI.getMe();
          const { user } = response.data;
          
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          localStorage.removeItem('token');
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        }
      },

      changePassword: async (data) => {
        set({ isLoading: true });
        try {
          await authAPI.changePassword(data);
          set({ isLoading: false });
          toast.success('Password changed successfully!');
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          const message = error.response?.data?.error || 'Password change failed';
          toast.error(message);
          return { success: false, error: message };
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useAuthStore;
