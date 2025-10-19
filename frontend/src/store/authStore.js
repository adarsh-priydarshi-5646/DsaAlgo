import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true });
        try {
          console.log('🔄 Attempting login with:', { login: credentials.login });
          const response = await authAPI.login(credentials);
          const { user, token } = response.data;
          
          console.log('✅ Login successful:', { userId: user.id, email: user.email });
          
          // Store token and update state
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          toast.success('Login successful!');
          return { success: true, user, token };
        } catch (error) {
          set({ isLoading: false });
          console.error('❌ Login failed:', error);
          
          let message = 'Login failed';
          
          if (!error.response) {
            message = 'Network error - please check your connection';
          } else if (error.response?.data?.error) {
            message = error.response.data.error;
          } else if (error.response?.data?.message) {
            message = error.response.data.message;
          } else if (error.message) {
            message = error.message;
          }
          
          toast.error(message);
          return { success: false, error: message };
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          console.log('🔄 Attempting registration for:', { email: userData.email, username: userData.username });
          const response = await authAPI.register(userData);
          const { user, token } = response.data;
          
          console.log('✅ Registration successful:', { userId: user.id, email: user.email });
          
          // Store token and user data
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          toast.success('Registration successful!');
          return { success: true, user, token };
        } catch (error) {
          set({ isLoading: false });
          console.error('❌ Registration failed:', error);
          
          let message = 'Registration failed';
          
          if (!error.response) {
            message = 'Network error - please check your connection';
          } else if (error.response?.data?.error) {
            message = error.response.data.error;
          } else if (error.response?.data?.details) {
            // Handle validation errors
            const details = error.response.data.details;
            if (Array.isArray(details) && details.length > 0) {
              message = details[0].msg || details[0].message || message;
            }
          } else if (error.message) {
            message = error.message;
          }
          
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
          console.log('Updating profile with data:', data);
          
          const response = await authAPI.updateProfile(data);
          console.log('Profile update response:', response.data);
          
          const { user } = response.data;
          
          // Update localStorage with new user data
          localStorage.setItem('user', JSON.stringify(user));
          
          // Update store state immediately
          set({ user, isLoading: false });
          
          console.log('Profile updated successfully in store');
          
          return { success: true, user };
        } catch (error) {
          console.error('Profile update failed:', error);
          set({ isLoading: false });
          const message = error.response?.data?.error || error.message || 'Update failed';
          return { success: false, error: message };
        }
      },

      fetchUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('🔍 No token found, skipping fetchUser');
          return;
        }

        set({ isLoading: true });
        try {
          console.log('🔄 Fetching user profile...');
          const response = await authAPI.getMe();
          const { user } = response.data;
          
          console.log('✅ User profile fetched:', { userId: user.id, email: user.email });
          
          // Update localStorage with fresh user data
          localStorage.setItem('user', JSON.stringify(user));
          
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          console.error('❌ Failed to fetch user:', error);
          
          // Only clear auth state if it's a 401 error
          if (error.response?.status === 401) {
            console.log('🔄 Token invalid, clearing auth state');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            set({ 
              user: null, 
              token: null, 
              isAuthenticated: false, 
              isLoading: false 
            });
          } else {
            // For network errors, keep existing auth state
            console.log('⚠️ Network error, keeping existing auth state');
            set({ isLoading: false });
          }
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

      updateSettings: async (preferences) => {
        set({ isLoading: true });
        try {
          const res = await authAPI.updateSettings(preferences);
          const { user } = res.data;
          set({ user, isLoading: false });
          toast.success('Settings saved');
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          const message = error.response?.data?.error || 'Failed to save settings';
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
