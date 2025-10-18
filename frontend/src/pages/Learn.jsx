import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Code, Database, Server, Globe, Lock, Layers, Copy, Check } from 'lucide-react';

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedCode, setCopiedCode] = useState('');

  // Categories of interview questions
  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen },
    { id: 'javascript', name: 'JavaScript', icon: Code },
    { id: 'react', name: 'React', icon: Globe },
    { id: 'node', name: 'Node.js', icon: Server },
    { id: 'express', name: 'Express', icon: Server },
    { id: 'mongodb', name: 'MongoDB', icon: Database },
    { id: 'mysql', name: 'MySQL', icon: Database },
    { id: 'auth', name: 'Authentication', icon: Lock },
    { id: 'fullstack', name: 'Full Stack', icon: Layers },
  ];

  // Copy functionality
  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  // Code Block Component
  const CodeBlock = ({ code, language = 'javascript', id }) => {
    const lines = code.trim().split('\n');
    
    return (
      <div className="relative bg-slate-900 rounded-lg overflow-hidden border border-slate-700 my-4">
        {/* macOS Style Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 uppercase tracking-wider">{language}</span>
            <button
              onClick={() => copyToClipboard(code, id)}
              className="flex items-center space-x-1 px-2 py-1 text-xs text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600 rounded transition-colors"
            >
              {copiedCode === id ? (
                <><Check className="w-3 h-3" /> <span>Copied!</span></>
              ) : (
                <><Copy className="w-3 h-3" /> <span>Copy</span></>
              )}
            </button>
          </div>
        </div>
        
        {/* Code Content */}
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm">
            {lines.map((line, index) => (
              <div key={index} className="flex">
                <span className="text-slate-500 select-none w-8 text-right mr-4 font-mono">
                  {index + 1}
                </span>
                <code className="text-slate-200 font-mono">{line}</code>
              </div>
            ))}
          </pre>
        </div>
      </div>
    );
  };

  // Interview questions data
  const interviewQuestions = [
    {
      id: 1,
      category: 'javascript',
      question: 'What is closure in JavaScript?',
      difficulty: 'Intermediate',
      explanation: 'A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).',
      hinglish: 'Closure ek function ke andar ka function hota hai jo bahar wale function ke variables ko access kar sakta hai, even after bahar wala function execute ho chuka hai.',
      code: `function outerFunction() {
  const outerVariable = "I am outside!";
  
  function innerFunction() {
    console.log(outerVariable); // Access variable from outer scope
  }
  
  return innerFunction;
}

const myFunction = outerFunction();
myFunction(); // Logs: "I am outside!"`,
      useCase: 'Used in module patterns, event handlers, and maintaining private variables.'
    },
    {
      id: 2,
      category: 'react',
      question: 'What is useState Hook in React?',
      difficulty: 'Basic',
      explanation: 'useState is a React Hook that lets you add state to functional components. It returns an array with the current state value and a function to update it.',
      hinglish: 'useState ek React Hook hai jo functional components mein state add karne ke liye use hota hai. Ye current state value aur usko update karne wala function return karta hai.',
      code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
      useCase: 'Managing component state, form inputs, toggles, counters, and any dynamic data.'
    },
    {
      id: 3,
      category: 'node',
      question: 'What is Node.js and how does it work?',
      difficulty: 'Basic',
      explanation: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.',
      hinglish: 'Node.js ek JavaScript runtime hai jo Chrome ke V8 engine pe banaya gaya hai. Ye event-driven aur non-blocking I/O model use karta hai jo ise fast aur efficient banata hai.',
      code: `// Simple HTTP server in Node.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
      useCase: 'Building web servers, APIs, real-time applications, and command-line tools.'
    },
    {
      id: 4,
      category: 'express',
      question: 'What is Express.js middleware?',
      difficulty: 'Intermediate',
      explanation: 'Middleware functions are functions that have access to the request object (req), response object (res), and the next middleware function in the application\'s request-response cycle.',
      hinglish: 'Middleware functions wo functions hain jo request object (req), response object (res), aur next middleware function ko access kar sakte hain application ke request-response cycle mein.',
      code: `const express = require('express');
const app = express();

// Built-in middleware
app.use(express.json());

// Custom middleware
const logger = (req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // Call next middleware
};

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World!');
});`,
      useCase: 'Authentication, logging, parsing request bodies, error handling, and CORS.'
    },
    {
      id: 5,
      category: 'mongodb',
      question: 'What is MongoDB and how is it different from SQL databases?',
      difficulty: 'Basic',
      explanation: 'MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents. Unlike SQL databases, it doesn\'t require a predefined schema.',
      hinglish: 'MongoDB ek NoSQL document database hai jo data ko flexible, JSON-like documents mein store karta hai. SQL databases ke unlike, isme predefined schema ki zarurat nahi hoti.',
      code: `// MongoDB document example
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "skills": ["JavaScript", "React", "Node.js"],
  "address": {
    "city": "New York",
    "country": "USA"
  }
}

// MongoDB query
db.users.find({ "age": { "$gte": 25 } })`,
      useCase: 'Content management, real-time analytics, IoT applications, and rapid prototyping.'
    },
    {
      id: 6,
      category: 'auth',
      question: 'What is JWT (JSON Web Token)?',
      difficulty: 'Intermediate',
      explanation: 'JWT is a compact, URL-safe means of representing claims to be transferred between two parties. It consists of three parts: Header, Payload, and Signature.',
      hinglish: 'JWT ek compact, URL-safe tarika hai claims ko represent karne ka do parties ke beech transfer karne ke liye. Isme teen parts hain: Header, Payload, aur Signature.',
      code: `// JWT structure: header.payload.signature
const jwt = require('jsonwebtoken');

// Create token
const token = jwt.sign(
  { userId: 123, email: 'user@example.com' },
  'secret-key',
  { expiresIn: '1h' }
);

// Verify token
const decoded = jwt.verify(token, 'secret-key');
console.log(decoded); // { userId: 123, email: 'user@example.com', ... }`,
      useCase: 'User authentication, API authorization, secure data transmission, and stateless sessions.'
    },
    {
      id: 7,
      category: 'fullstack',
      question: 'What is CORS and how to handle it?',
      difficulty: 'Intermediate',
      explanation: 'CORS (Cross-Origin Resource Sharing) is a security feature that restricts web pages from making requests to a different domain than the one serving the web page.',
      hinglish: 'CORS ek security feature hai jo web pages ko different domain se requests banane se rokta hai, jahan se web page serve ho raha hai.',
      code: `// Express.js CORS setup
const cors = require('cors');

// Allow all origins (development only)
app.use(cors());

// Specific CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Manual CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});`,
      useCase: 'API security, preventing unauthorized cross-origin requests, and enabling controlled resource sharing.'
    }
  ];

  // Filter questions based on search and category
  const filteredQuestions = interviewQuestions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || question.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Difficulty color mapping
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Basic': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Full-Stack Interview Prep
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Master web development concepts with interactive examples
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Questions */}
        <div className="space-y-6">
          {filteredQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-6"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {question.question}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty}
                </span>
              </div>

              {/* Explanation */}
              <div className="mb-4">
                <p className="text-gray-300 mb-3">{question.explanation}</p>
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
                  <p className="text-blue-200">
                    <span className="font-medium text-blue-300">Hinglish:</span> {question.hinglish}
                  </p>
                </div>
              </div>

              {/* Code Example */}
              <div className="mb-4">
                <h4 className="text-lg font-medium text-white mb-2">Code Example:</h4>
                <CodeBlock 
                  code={question.code} 
                  language="javascript" 
                  id={`code-${question.id}`}
                />
              </div>

              {/* Use Case */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-white mb-2">Real-world Use Case:</h4>
                <p className="text-gray-300">{question.useCase}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredQuestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-white/60">No questions found matching your search...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Learn;
