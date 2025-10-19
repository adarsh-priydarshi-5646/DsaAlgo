import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield,
  Crown,
  AlertCircle
} from 'lucide-react';
import { ownerAPI } from '../services/api';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const OwnerLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log('🔍 Owner login attempt:', data);
    
    // Quick bypass for demo - check credentials directly
    if (data.email === 'owner@dsaalgo.com' && data.password === 'owner123') {
      console.log('✅ Direct credential match - bypassing API');
      
      // Create mock owner user
      const mockOwnerUser = {
        id: 'owner_admin',
        email: 'owner@dsaalgo.com',
        username: 'admin',
        firstName: 'Admin',
        lastName: 'Owner',
        role: 'OWNER',
        isVerified: true
      };
      
      const mockToken = 'owner_demo_token_' + Date.now();
      
      // Set auth state using zustand setState
      useAuthStore.setState({
        user: mockOwnerUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false
      });
      
      // Store in localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockOwnerUser));
      
      toast.success('Owner login successful! 👑');
      navigate('/owner/dashboard');
      setIsLoading(false);
      return;
    }
    
    try {
      console.log('📡 Calling owner API...');
      const response = await ownerAPI.login(data);
      console.log('✅ Owner API response:', response);
      
      if (response.data.user && response.data.token) {
        // Set auth state using zustand setState
        useAuthStore.setState({
          user: response.data.user,
          token: response.data.token,
          isAuthenticated: true,
          isLoading: false
        });
        
        // Store in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast.success('Owner login successful! 👑');
        navigate('/owner/dashboard');
      }
    } catch (error) {
      console.error('❌ Owner login error:', error);
      console.error('❌ Error details:', error.response);
      toast.error(error.response?.data?.error || error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Crown className="w-8 h-8 text-white" />
            </motion.div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
              Owner Portal
            </h1>
            <p className="text-gray-300">
              Administrative access to DSA Algo platform
            </p>
          </div>

          {/* Warning Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-300 font-medium">Restricted Access</p>
              <p className="text-xs text-yellow-200 mt-1">
                This portal is for authorized administrators only.
              </p>
            </div>
          </motion.div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('email', { 
                    required: 'Email is required'
                  })}
                  type="email"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  placeholder="Enter admin email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('password', { 
                    required: 'Password is required'
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Access Owner Portal
                </>
              )}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-3 bg-gray-800/50 rounded-lg"
          >
            <p className="text-xs text-gray-400 text-center mb-2">Demo Owner Credentials:</p>
            <div className="text-xs text-gray-300 text-center space-y-1">
              <p><span className="text-gray-500">Email:</span> owner@dsaalgo.com</p>
              <p><span className="text-gray-500">Password:</span> owner123</p>
            </div>
          </motion.div>

          {/* Back to Main Site */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Main Site
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OwnerLogin;
