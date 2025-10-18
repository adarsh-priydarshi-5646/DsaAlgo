import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import LandingPage from './components/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import ProblemList from './components/ProblemList';
import ProblemDetail from './components/ProblemDetail';
import Playground from './pages/Playground';
import TestPlayground from './pages/TestPlayground';
import Leaderboard from './pages/Leaderboard';
import Learn from './pages/Learn';
import Login from './pages/Login';
import Register from './pages/Register';
import OAuthCallback from './pages/OAuthCallback';
import NotFound from './pages/NotFound';
import Profile from './components/Profile';
import Error404 from './components/Error404';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Store
import useAuthStore from './store/authStore';

// Styles
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

// Layout Component for Protected Routes
const ProtectedLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Layout Component for Public Routes
const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  const { fetchUser, isAuthenticated, isLoading, user } = useAuthStore();

  useEffect(() => {
    // Check for existing token and fetch user data
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser && !isAuthenticated) {
      try {
        const userData = JSON.parse(storedUser);
        // Restore user state from localStorage
        useAuthStore.setState({
          user: userData,
          token,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        // If stored data is corrupted, fetch fresh data
        fetchUser();
      }
    } else if (token && !isAuthenticated) {
      fetchUser();
    }
  }, [fetchUser, isAuthenticated]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <PublicLayout>
                    <LandingPage />
                  </PublicLayout>
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <PublicLayout>
                    <Login />
                  </PublicLayout>
                </PublicRoute>
              }
            />
            <Route
              path="/oauth/callback"
              element={
                <PublicLayout>
                  <OAuthCallback />
                </PublicLayout>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <PublicLayout>
                    <Register />
                  </PublicLayout>
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <Dashboard />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/problems"
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <ProblemList />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/problems/:slug"
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <ProblemDetail />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/playground"
              element={
                <ProtectedLayout>
                  <Playground />
                </ProtectedLayout>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <Leaderboard />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/learn"
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <Learn />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:username"
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <Profile />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />

            {/* 404 Not Found - Catch all route (must be last) */}
            <Route 
              path="*" 
              element={
                <PublicLayout>
                  <Error404 />
                </PublicLayout>
              } 
            />
          </Routes>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(15, 23, 42, 0.9)',
                color: '#fff',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          </div>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;