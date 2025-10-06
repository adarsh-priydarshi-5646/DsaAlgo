import React from 'react';
import { Mail, Lock, Github, Twitter, Linkedin } from 'lucide-react';

export default function Login() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome Back</h1>
          <p className="text-xl text-gray-600">Sign in to continue your DSA journey</p>
        </div>

        <div className="bg-gray-50 shadow-lg rounded-xl p-8">
          {/* Login Form */}
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center w-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2">
                <Github className="h-5 w-5 text-gray-600" />
              </button>
              <button className="flex items-center justify-center w-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2">
                <Twitter className="h-5 w-5 text-gray-600" />
              </button>
              <button className="flex items-center justify-center w-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2">
                <Linkedin className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 