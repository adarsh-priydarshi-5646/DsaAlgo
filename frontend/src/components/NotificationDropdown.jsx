import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  X, 
  Check, 
  CheckCheck,
  Clock,
  Trash2,
  ExternalLink
} from 'lucide-react';
import useNotificationStore from '../store/notificationStore';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    isLoading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    removeNotification
  } = useNotificationStore();

  useEffect(() => {
    if (isOpen && notifications.length === 0) {
      fetchNotifications();
    }
  }, [isOpen, fetchNotifications, notifications.length]);

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.action && notification.action.type === 'navigate') {
      navigate(notification.action.path);
      onClose();
    }
  };

  const getNotificationIcon = (type) => {
    const iconMap = {
      welcome: '🎉',
      reminder: '🔥',
      feature: '✨',
      achievement: '🏆',
      system: '⚙️',
      problem: '💡',
      leaderboard: '📊'
    };
    return iconMap[type] || '📢';
  };

  const getNotificationColor = (type) => {
    const colorMap = {
      welcome: 'from-purple-500 to-pink-500',
      reminder: 'from-orange-500 to-red-500',
      feature: 'from-blue-500 to-cyan-500',
      achievement: 'from-yellow-500 to-orange-500',
      system: 'from-gray-500 to-slate-500',
      problem: 'from-green-500 to-emerald-500',
      leaderboard: 'from-indigo-500 to-purple-500'
    };
    return colorMap[type] || 'from-gray-500 to-slate-500';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return time.toLocaleDateString();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          
          {/* Notification Panel */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-96 max-h-96 backdrop-blur-lg bg-black/90 rounded-xl border border-white/20 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                      <CheckCheck className="w-3 h-3" />
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                </div>
              ) : notifications.length > 0 ? (
                <div className="divide-y divide-white/10">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 hover:bg-white/5 transition-all cursor-pointer relative ${
                        !notification.read ? 'bg-purple-500/10' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getNotificationColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-sm">
                            {notification.icon || getNotificationIcon(notification.type)}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`text-sm font-medium ${
                              notification.read ? 'text-gray-300' : 'text-white'
                            }`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center gap-2 ml-2">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeNotification(notification.id);
                                }}
                                className="text-gray-500 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          
                          <p className={`text-xs mt-1 ${
                            notification.read ? 'text-gray-400' : 'text-gray-300'
                          }`}>
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {formatTimestamp(notification.timestamp)}
                            </div>
                            
                            {notification.action && (
                              <div className="flex items-center gap-1 text-xs text-purple-400">
                                <ExternalLink className="w-3 h-3" />
                                View
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">No notifications yet</p>
                  <p className="text-xs text-gray-500 mt-1">
                    We'll notify you about important updates
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-white/10 bg-white/5">
                <button
                  onClick={() => {
                    // In future, navigate to notifications page
                    onClose();
                  }}
                  className="w-full text-center text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View all notifications
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown;
