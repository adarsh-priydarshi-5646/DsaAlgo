import { useState } from 'react';
import { Home, ArrowLeft, RefreshCw, Search, BookOpen, Code, Trophy, User, HelpCircle, Mail, AlertTriangle, Compass, Zap } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Error404() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10"></div>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Error Icon and Title */}
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 animate-bounce">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          
          <p className="text-lg text-gray-300 mb-2 max-w-2xl mx-auto">
            The page you're looking for seems to have wandered off into the digital wilderness.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8">
            <Compass className="w-4 h-4" />
            <span>Lost at: <code className="bg-gray-800 px-2 py-1 rounded text-gray-300">{location.pathname}</code></span>
          </div>
        </div>

        {/* Quick Search */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    if (searchQuery.toLowerCase().includes('dashboard')) navigate('/dashboard');
                    else if (searchQuery.toLowerCase().includes('problem')) navigate('/problems');
                    else if (searchQuery.toLowerCase().includes('learn')) navigate('/learn');
                    else if (searchQuery.toLowerCase().includes('leaderboard')) navigate('/leaderboard');
                    else if (searchQuery.toLowerCase().includes('profile')) navigate('/profile');
                    else navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                  }
                }}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh
          </button>
        </div>

        {/* Popular Pages */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Or try these popular pages:</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { path: '/dashboard', icon: Home, label: 'Dashboard', color: 'text-blue-400' },
              { path: '/problems', icon: Code, label: 'Problems', color: 'text-green-400' },
              { path: '/learn', icon: BookOpen, label: 'Learn', color: 'text-purple-400' },
              { path: '/leaderboard', icon: Trophy, label: 'Leaderboard', color: 'text-yellow-400' },
              { path: '/profile', icon: User, label: 'Profile', color: 'text-pink-400' },
            ].map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-800/30 hover:bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-lg transition-all transform hover:scale-105"
                >
                  <Icon className={`w-6 h-6 ${link.color}`} />
                  <span className="text-sm text-gray-300">{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-full">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Error 404 • Page Not Found</span>
            </div>
            <div className="w-px h-4 bg-gray-600"></div>
            <button
              onClick={() => window.open('mailto:support@dsaalgo.com', '_blank')}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Report Issue</span>
            </button>
            <button
              onClick={() => navigate('/help')}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Get Help</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
