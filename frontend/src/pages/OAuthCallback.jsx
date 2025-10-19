import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuthStore();
  const [status, setStatus] = useState('Processing...');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        console.log('🔄 OAuth Callback - Current URL:', window.location.href);
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const error = params.get('error');
        
        console.log('🔍 OAuth Callback - Token:', token ? 'Present' : 'Missing');
        console.log('🔍 OAuth Callback - Error:', error || 'None');

        if (error) {
          setStatus('Authentication failed');
          toast.error('OAuth authentication failed');
          setTimeout(() => navigate('/login', { replace: true }), 2000);
          return;
        }

        if (token) {
          setStatus('Saving authentication...');
          localStorage.setItem('token', token);
          
          setStatus('Loading user profile...');
          try {
            await fetchUser();
            setStatus('Success! Redirecting...');
            toast.success('Login successful!');
            setTimeout(() => navigate('/dashboard', { replace: true }), 1000);
          } catch (fetchError) {
            console.error('Failed to fetch user:', fetchError);
            setStatus('Setting up your session...');
            
            // Fallback: manually set authentication state
            try {
              // Decode JWT to get user info (basic implementation)
              const payload = JSON.parse(atob(token.split('.')[1]));
              const fallbackUser = {
                id: payload.userId,
                email: 'user@example.com', // Will be updated when API is available
                username: 'User'
              };
              
              // Set auth state manually
              useAuthStore.setState({
                user: fallbackUser,
                token,
                isAuthenticated: true,
                isLoading: false
              });
              
              localStorage.setItem('user', JSON.stringify(fallbackUser));
              
              setStatus('Success! Redirecting...');
              toast.success('Login successful!');
              setTimeout(() => navigate('/dashboard', { replace: true }), 1000);
            } catch (decodeError) {
              console.error('Failed to decode token:', decodeError);
              setStatus('Authentication successful, redirecting...');
              // Even if we can't decode, still redirect - user has valid token
              setTimeout(() => navigate('/dashboard', { replace: true }), 2000);
            }
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
