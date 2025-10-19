import { create } from 'zustand';
import { usersAPI } from '../services/api';

const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  // Generate real notifications based on user activity
  generateRealNotifications: async () => {
    try {
      // Get user stats to generate relevant notifications
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.username) return [];

      const notifications = [];
      const now = new Date();

      // Welcome notification for new users
      const userCreated = new Date(user.createdAt || now);
      const daysSinceJoined = Math.floor((now - userCreated) / (1000 * 60 * 60 * 24));
      
      if (daysSinceJoined <= 1) {
        notifications.push({
          id: 'welcome',
          type: 'welcome',
          title: 'Welcome to DSA Algo! 🎉',
          message: 'Start your coding journey by solving your first problem!',
          timestamp: new Date(now.getTime() - 5 * 60 * 1000), // 5 minutes ago
          read: false,
          icon: '🚀',
          action: { type: 'navigate', path: '/problems' }
        });
      }

      // Daily coding reminder
      const lastActive = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
      notifications.push({
        id: 'daily_reminder',
        type: 'reminder',
        title: 'Daily Coding Challenge 💪',
        message: 'Keep your streak alive! Solve a problem today.',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
        icon: '🔥',
        action: { type: 'navigate', path: '/problems' }
      });

      // New features notification
      notifications.push({
        id: 'new_features',
        type: 'feature',
        title: 'New Features Added! ✨',
        message: 'Check out the enhanced Learn section with interview prep.',
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
        read: false,
        icon: '🆕',
        action: { type: 'navigate', path: '/learn' }
      });

      // Leaderboard update
      notifications.push({
        id: 'leaderboard_update',
        type: 'achievement',
        title: 'Leaderboard Updated 🏆',
        message: 'See where you rank among other coders!',
        timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000), // 12 hours ago
        read: true,
        icon: '📊',
        action: { type: 'navigate', path: '/leaderboard' }
      });

      // System update notification
      notifications.push({
        id: 'system_update',
        type: 'system',
        title: 'Platform Updates 🔧',
        message: 'We\'ve improved performance and fixed bugs.',
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
        read: true,
        icon: '⚙️',
        action: null
      });

      return notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
      console.error('Error generating notifications:', error);
      return [];
    }
  },

  // Fetch notifications
  fetchNotifications: async () => {
    set({ isLoading: true });
    
    try {
      // For now, generate real-looking notifications
      // In future, this would fetch from backend API
      const notifications = await get().generateRealNotifications();
      
      const unreadCount = notifications.filter(n => !n.read).length;
      
      set({
        notifications,
        unreadCount,
        isLoading: false
      });
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      set({ isLoading: false });
    }
  },

  // Mark notification as read
  markAsRead: (notificationId) => {
    set(state => ({
      notifications: state.notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1)
    }));
  },

  // Mark all as read
  markAllAsRead: () => {
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0
    }));
  },

  // Add new notification (for real-time updates)
  addNotification: (notification) => {
    set(state => ({
      notifications: [
        {
          ...notification,
          id: notification.id || Date.now().toString(),
          timestamp: notification.timestamp || new Date(),
          read: false
        },
        ...state.notifications
      ],
      unreadCount: state.unreadCount + 1
    }));
  },

  // Remove notification
  removeNotification: (notificationId) => {
    set(state => {
      const notification = state.notifications.find(n => n.id === notificationId);
      return {
        notifications: state.notifications.filter(n => n.id !== notificationId),
        unreadCount: notification && !notification.read 
          ? Math.max(0, state.unreadCount - 1) 
          : state.unreadCount
      };
    });
  }
}));

export default useNotificationStore;
