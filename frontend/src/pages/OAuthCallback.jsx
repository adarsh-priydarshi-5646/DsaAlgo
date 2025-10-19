import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuthStore();
  const [status, setStatus] = useState('Processing OAuth callback...');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        console.log('🔄 OAuth Callback - Current URL:', window.location.href);
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const error = params.get('error');
        
        console.log('🔍 OAuth Callback - Token:', token ? `Present (${token.substring(0, 20)}...)` : 'Missing');
        console.log('🔍 OAuth Callback - Error:', error || 'None');
        console.log('🔍 OAuth Callback - All params:', Object.fromEntries(params));

        if (error) {
          setStatus('Authentication failed');
          toast.error('OAuth authentication failed');
          setTimeout(() => navigate('/login', { replace: true }), 2000);
          return;
        }

        if (token) {
          setStatus('Saving authentication...');
          localStorage.setItem('token', token);
          
          // First, try to decode the token to get user info
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log('🔍 Decoded token payload:', payload);
            
            // Create a basic user object from token
            const basicUser = {
              id: payload.userId,
              email: 'oauth-user@example.com',
              username: 'OAuth User',
              firstName: 'OAuth',
              lastName: 'User',
              role: 'USER',
              isVerified: true
            };
            
            // Set auth state immediately for faster UX
            useAuthStore.setState({
              user: basicUser,
              token,
              isAuthenticated: true,
              isLoading: false
            });
            
            localStorage.setItem('user', JSON.stringify(basicUser));
            
            setStatus('Loading your profile...');
            
            // Try to fetch full user profile in background
            try {
              await fetchUser();
              console.log('✅ Successfully fetched full user profile');
            } catch (fetchError) {
              console.warn('⚠️ Could not fetch full profile, using basic info:', fetchError);
              // Continue with basic user info - this is not a blocking error
            }
            
            setStatus('Success! Redirecting to dashboard...');
            toast.success('Login successful! Welcome back!');
            
            // Redirect to dashboard
            setTimeout(() => {
              navigate('/dashboard', { replace: true });
            }, 1500);
            
          } catch (decodeError) {
            console.error('Failed to decode token:', decodeError);
            setStatus('Processing authentication...');
            
            // Even if we can't decode, set basic auth state
            useAuthStore.setState({
              user: {
                id: 'oauth-user',
                email: 'oauth-user@example.com',
                username: 'OAuth User'
              },
              token,
              isAuthenticated: true,
              isLoading: false
            });
            
            localStorage.setItem('user', JSON.stringify({
              id: 'oauth-user',
              email: 'oauth-user@example.com',
              username: 'OAuth User'
            }));
            
            toast.success('Authentication successful!');
            setTimeout(() => navigate('/dashboard', { replace: true }), 2000);
          }
        } else {
          setStatus('No authentication token received');
          toast.error('Authentication token not found');
          setTimeout(() => navigate('/login', { replace: true }), 2000);
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('Authentication processing failed');
        toast.error('Something went wrong during authentication');
        setTimeout(() => navigate('/login', { replace: true }), 2000);
      }
    };

    handleOAuthCallback();
  }, [fetchUser, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-white text-lg mb-2">Signing you in...</p>
        <p className="text-gray-300 text-sm">{status}</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
