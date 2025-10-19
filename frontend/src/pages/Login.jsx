import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, LogIn, Code, Zap, Shield, Crown, Users, ChevronDown } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { ownerAPI } from '../services/api';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [oauthError, setOauthError] = useState('');
  const [loginType, setLoginType] = useState('user'); // 'user' or 'owner'
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      const errorMessages = {
        oauth_failed: 'Google OAuth authentication failed. Please try again.',
        oauth_no_user: 'No user information received from Google. Please try again.',
        oauth_processing_failed: 'Failed to process OAuth login. Please try again.',
        oauth_not_configured: 'Google OAuth is temporarily unavailable. Please use email/password login.'
      };
      setOauthError(errorMessages[error] || 'OAuth authentication failed. Please try again.');
    }
  }, [searchParams]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onSubmit = async (data) => {
    try {
      if (loginType === 'owner') {
        // Owner login logic
        if (data.login === 'owner@dsaalgo.com' && data.password === 'owner123') {
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
          
          // Set auth state
          useAuthStore.setState({
            user: mockOwnerUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false
          });
          
          // Store in localStorage
          localStorage.setItem('token', mockToken);
          localStorage.setItem('user', JSON.stringify(mockOwnerUser));
          
          navigate('/owner/dashboard');
          return;
        } else {
          // Try API call for owner login
          try {
            const response = await ownerAPI.login({
              email: data.login,
              password: data.password
            });
            
            if (response.data.user && response.data.token) {
              useAuthStore.setState({
                user: response.data.user,
                token: response.data.token,
                isAuthenticated: true,
                isLoading: false
              });
              
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.user));
              
              navigate('/owner/dashboard');
              return;
            }
          } catch (ownerError) {
            console.error('Owner login failed:', ownerError);
            throw new Error('Invalid owner credentials');
          }
        }
      } else {
        // Regular user login
        const result = await login(data);
        
        if (result && result.success) {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)]"></div>
      
      <div className="relative z-10 max-w-6xl w-full flex items-center justify-between gap-12">
        {/* Left Side - Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block flex-1"
        >
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Master DSA
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Join thousands of developers improving their problem-solving skills
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                { icon: Code, title: 'Interactive Coding', desc: 'Practice with real-time feedback' },
                { icon: Zap, title: 'Fast Learning', desc: 'Optimized learning paths' },
                { icon: Shield, title: 'Secure Platform', desc: 'Your progress is safe with us' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <div className="flex-1 max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4"
          >
            <LogIn className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to continue your DSA journey</p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
            {/* OAuth Error Display */}
            {oauthError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-300">{oauthError}</p>
              </div>
            )}
            
            {/* Login Type Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Login As
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <div className="flex items-center gap-3">
                    {loginType === 'owner' ? (
                      <Crown className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Users className="w-5 h-5 text-blue-400" />
                    )}
                    <span className="font-medium">
                      {loginType === 'owner' ? 'Platform Owner' : 'Regular User'}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-2xl z-50"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setLoginType('user');
                        setShowDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors ${
                        loginType === 'user' ? 'bg-blue-500/20 text-blue-300' : 'text-gray-300'
                      }`}
                    >
                      <Users className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="font-medium">Regular User</p>
                        <p className="text-xs text-gray-400">Access problems and dashboard</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginType('owner');
                        setShowDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors rounded-b-lg ${
                        loginType === 'owner' ? 'bg-yellow-500/20 text-yellow-300' : 'text-gray-300'
                      }`}
                    >
                      <Crown className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="font-medium">Platform Owner</p>
                        <p className="text-xs text-gray-400">Administrative access</p>
                      </div>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email or Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('login', { required: 'Email or username is required' })}
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your email or username"
                />
              </div>
              {errors.login && (
                <p className="mt-1 text-sm text-red-400">{errors.login.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded bg-white/10"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          {/* OAuth Providers */}
          <div className="mt-4">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => {
                // Smart environment detection for OAuth URL
                const isVercelProduction = window.location.hostname === 'dsa-algo-chi.vercel.app';
                const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                
                let apiUrl;
                if (isVercelProduction) {
                  apiUrl = 'https://dsaalgo.onrender.com/api';
                  console.log('🚀 Production OAuth - Using production API');
                } else if (isLocalhost) {
                  apiUrl = 'http://localhost:5001/api';
                  console.log('🔧 Local OAuth - Using local API');
                } else {
                  // Fallback to environment variables
                  const nodeEnv = import.meta.env.VITE_NODE_ENV || import.meta.env.MODE || 'development';
                  if (nodeEnv === 'production') {
                    apiUrl = 'https://dsaalgo.onrender.com/api';
                  } else {
                    apiUrl = 'http://localhost:5001/api';
                  }
                }
                
                const url = `${apiUrl.replace(/\/$/, '')}/auth/oauth/google`;
                console.log(`🔗 OAuth URL: ${url}`);
                console.log(`🌐 Current hostname: ${window.location.hostname}`);
                window.location.href = url;
              }}
              className="w-full mb-4 bg-white text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={oauthError && oauthError.includes('not configured')}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              {oauthError && oauthError.includes('not configured') ? 'Google OAuth Unavailable' : 'Continue with Google'}
            </button>
          </div>

          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
          
        </motion.div>
      </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login; 