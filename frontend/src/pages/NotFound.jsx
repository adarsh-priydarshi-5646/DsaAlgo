import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex flex-col items-center justify-center text-white px-4 text-center">
      <div className="max-w-xl">
        {/* Emoji or Inline SVG instead of Ghost icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl text-6xl">
          👻
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent mb-6">
          404
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Oops! This page doesn’t exist or got lost in the algorithmic void.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
        >
          {/* Left Arrow as SVG inline */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
