import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      // Fetch current user details with the new token
      fetchUser().finally(() => {
        navigate('/dashboard', { replace: true });
      });
    } else {
      // No token found; redirect to login
      navigate('/login', { replace: true });
    }
  }, [fetchUser, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-white">Signing you in...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
