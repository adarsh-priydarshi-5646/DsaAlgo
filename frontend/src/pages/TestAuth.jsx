import React, { useState } from 'react';
import { authAPI } from '../services/api';

const TestAuth = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testDemoLogin = async () => {
    setLoading(true);
    setResult('Testing demo login...');
    
    try {
      const response = await authAPI.login({
        login: 'demo@example.com',
        password: 'demo123'
      });
      
      setResult(`✅ Demo login successful!\n${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      setResult(`❌ Demo login failed:\n${JSON.stringify({
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      }, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  const testApiHealth = async () => {
    setLoading(true);
    setResult('Testing API health...');
    
    try {
      const response = await fetch('https://dsaalgo.onrender.com/health');
      const data = await response.json();
      
      setResult(`✅ API health check successful!\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`❌ API health check failed:\n${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testOAuth = () => {
    window.location.href = 'https://dsaalgo.onrender.com/api/auth/oauth/google';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Authentication Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={testApiHealth}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Test API Health
          </button>
          
          <button
            onClick={testDemoLogin}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Test Demo Login
          </button>
          
          <button
            onClick={testOAuth}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Test Google OAuth
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Test Results:</h2>
          <pre className="text-green-300 text-sm whitespace-pre-wrap overflow-auto max-h-96">
            {result || 'Click a button to run a test...'}
          </pre>
        </div>
        
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Current Status:</h2>
          <div className="text-sm text-gray-300 space-y-2">
            <p>• Backend URL: https://dsaalgo.onrender.com</p>
            <p>• Frontend URL: https://dsa-algo-chi.vercel.app</p>
            <p>• Demo Credentials: demo@example.com / demo123</p>
            <p>• OAuth Callback: /oauth/callback</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAuth;
