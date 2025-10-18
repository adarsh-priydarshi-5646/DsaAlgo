import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Code, Database, Server, Globe, Lock, Layers, Star, Bookmark, BookmarkCheck, Palette, Shield, Key, Users, FileText, Zap, Terminal, Copy, Check, Rocket, Book, Lightbulb, ArrowLeft, Target, ArrowRight, CheckCircle, BarChart3 } from 'lucide-react';

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());
  const [copiedCode, setCopiedCode] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or language id
  const [showLanguagePage, setShowLanguagePage] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());

  // Categories of interview questions
  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen },
    { id: 'javascript', name: 'JavaScript', icon: Code },
    { id: 'react', name: 'React', icon: Globe },
    { id: 'html', name: 'HTML', icon: FileText },
    { id: 'css', name: 'CSS', icon: Palette },
    { id: 'tailwind', name: 'Tailwind CSS', icon: Zap },
    { id: 'node', name: 'Node.js', icon: Server },
    { id: 'express', name: 'Express', icon: Server },
    { id: 'mongodb', name: 'MongoDB', icon: Database },
    { id: 'mysql', name: 'MySQL', icon: Database },
    { id: 'sql', name: 'SQL', icon: Database },
    { id: 'prisma', name: 'Prisma', icon: Layers },
    { id: 'auth', name: 'Authentication', icon: Lock },
    { id: 'oauth', name: 'OAuth', icon: Shield },
    { id: 'fullstack', name: 'Full Stack', icon: Users },
  ];

  // Load bookmarks and completed questions from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('interviewBookmarks');
    if (savedBookmarks) {
      setBookmarkedItems(new Set(JSON.parse(savedBookmarks)));
    }
    
    const savedCompleted = localStorage.getItem('completedQuestions');
    if (savedCompleted) {
      setCompletedQuestions(new Set(JSON.parse(savedCompleted)));
    }
  }, []);

  // Toggle bookmark
  const toggleBookmark = (itemId) => {
    const newBookmarks = new Set(bookmarkedItems);
    if (newBookmarks.has(itemId)) {
      newBookmarks.delete(itemId);
    } else {
      newBookmarks.add(itemId);
    }
    setBookmarkedItems(newBookmarks);
    localStorage.setItem('interviewBookmarks', JSON.stringify([...newBookmarks]));
  };

  // Handle category change - show questions for selected topic
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setSelectedQuestion(null);
    setCurrentPage('home');
    setShowLanguagePage(false);
  };

  // Go back to home page
  const goBackToHome = () => {
    setCurrentPage('home');
    setShowLanguagePage(false);
    setActiveCategory('all');
    setSelectedQuestion(null);
  };

  // Copy code to clipboard
  const copyCode = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Mark question as completed
  const markQuestionCompleted = (questionId) => {
    const newCompleted = new Set(completedQuestions);
    newCompleted.add(questionId);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('completedQuestions', JSON.stringify([...newCompleted]));
  };

  // Get current category questions
  const getCurrentCategoryQuestions = () => {
    return interviewQuestions.filter(q => q.category === activeCategory);
  };

  // Get current question index
  const getCurrentQuestionIndex = () => {
    const categoryQuestions = getCurrentCategoryQuestions();
    return categoryQuestions.findIndex(q => q.id === selectedQuestion?.id);
  };

  // Navigate to next question
  const goToNextQuestion = () => {
    const categoryQuestions = getCurrentCategoryQuestions();
    const currentIndex = getCurrentQuestionIndex();
    if (currentIndex < categoryQuestions.length - 1) {
      const nextQuestion = categoryQuestions[currentIndex + 1];
      setSelectedQuestion(nextQuestion);
      markQuestionCompleted(selectedQuestion.id);
    }
  };

  // Navigate to previous question
  const goToPreviousQuestion = () => {
    const categoryQuestions = getCurrentCategoryQuestions();
    const currentIndex = getCurrentQuestionIndex();
    if (currentIndex > 0) {
      const prevQuestion = categoryQuestions[currentIndex - 1];
      setSelectedQuestion(prevQuestion);
    }
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    const categoryQuestions = getCurrentCategoryQuestions();
    const completedInCategory = categoryQuestions.filter(q => completedQuestions.has(q.id)).length;
    return categoryQuestions.length > 0 ? (completedInCategory / categoryQuestions.length) * 100 : 0;
  };


  // Enhanced Code Component with better colors and copy functionality
  const CodeBlock = ({ language, code, title, id }) => {
    const codeId = id || `code-${Math.random().toString(36).substr(2, 9)}`;
    
    const getLanguageColor = (lang) => {
      const colors = {
        javascript: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
        react: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
        html: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
        css: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
        sql: 'bg-green-500/20 text-green-300 border-green-500/50',
        json: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
        bash: 'bg-red-500/20 text-red-300 border-red-500/50',
        node: 'bg-green-600/20 text-green-300 border-green-600/50'
      };
      return colors[lang] || 'bg-blue-500/20 text-blue-300 border-blue-500/50';
    };

    const highlightSyntax = (code, lang) => {
      // Return clean code without any color styling
      return code;
    };

    return (
      <div className="bg-slate-900/95 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden my-8 shadow-2xl">
        {/* Enhanced Header */}
        <div className="bg-slate-800/90 backdrop-blur-sm px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* macOS Traffic Light Buttons */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer shadow-sm"></div>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-400" />
              {title && (
                <span className="text-sm font-medium text-slate-300">{title}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageColor(language)}`}>
              {language.toUpperCase()}
            </div>
            <button
              onClick={() => copyCode(code, codeId)}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-all duration-200 text-xs font-medium"
            >
              {copiedCode === codeId ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Code Content */}
        <div className="relative bg-slate-900">
          <div className="absolute top-4 left-4 flex flex-col gap-1 text-xs text-slate-500 select-none font-mono">
            {code.split('\n').map((_, index) => (
              <div key={index} className="leading-7 text-right w-10 pr-2">
                {index + 1}
              </div>
            ))}
          </div>
          <pre className="pl-20 pr-6 py-6 overflow-x-auto text-sm leading-7 font-mono whitespace-pre-wrap break-words">
            <code 
              className="text-slate-100 block"
              style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{ 
                __html: highlightSyntax(code.replace(/</g, '&lt;').replace(/>/g, '&gt;'), language) 
              }}
            />
          </pre>
        </div>
      </div>
    );
  };

  // Enhanced Diagram Component for Visual Explanations
  const DiagramBox = ({ title, content, color = "purple", icon: Icon = Target }) => {
    const colorClasses = {
      purple: 'bg-purple-900/20 border-purple-500/30 text-purple-300',
      blue: 'bg-blue-900/20 border-blue-500/30 text-blue-300',
      green: 'bg-green-900/20 border-green-500/30 text-green-300',
      orange: 'bg-orange-900/20 border-orange-500/30 text-orange-300',
      red: 'bg-red-900/20 border-red-500/30 text-red-300',
      yellow: 'bg-yellow-900/20 border-yellow-500/30 text-yellow-300'
    };

    return (
      <div className={`${colorClasses[color]} backdrop-blur-sm rounded-xl border p-6 my-6 shadow-lg`}>
        <h4 className="font-bold text-lg mb-4 flex items-center gap-3">
          <Icon className="w-5 h-5" />
          {title}
        </h4>
        <div className="text-gray-200 leading-relaxed">
          {content}
        </div>
      </div>
    );
  };

  // Interview Tip Component
  const InterviewTip = ({ children }) => (
    <div className="mt-6 p-5 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">💡</span>
        </div>
        <div>
          <p className="font-bold text-purple-300 mb-2">Interview Tip</p>
          <div className="text-gray-200 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );

  // Enhanced interview questions with React components
  const getQuestionContent = (questionId) => {
    switch(questionId) {
      case 1: // JavaScript - Closure (Intermediate)
        return (
          <div className="space-y-10">
            {/* Topic Header */}
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-2xl p-8">
              <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
                <Rocket className="w-10 h-10 text-blue-400" />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">JavaScript Closures</span>
              </h1>
              <p className="text-slate-300 text-lg">Understanding function scope and lexical environment</p>
            </div>

            {/* Definition Section */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold">1</span>
                <span className="text-blue-400">Definition</span>
              </h2>
              
              <div className="space-y-6">
                <div className="bg-slate-700/30 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    English:
                  </h3>
                  <div className="text-slate-200 leading-relaxed space-y-2">
                    <p>A <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded font-semibold">closure</span> is the combination of a <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded font-semibold">function</span> bundled together with references to its surrounding <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded font-semibold">lexical environment</span>.</p>
                    <p>Key points:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li><span className="text-blue-300 font-semibold">Inner function</span> has access to <span className="text-green-300 font-semibold">outer function's variables</span></li>
                      <li>Variables remain accessible even after <span className="text-orange-300 font-semibold">outer function returns</span></li>
                      <li>Creates <span className="text-purple-300 font-semibold">private variables</span> and <span className="text-cyan-300 font-semibold">data encapsulation</span></li>
                      <li>Commonly used in <span className="text-yellow-300 font-semibold">module patterns</span> and <span className="text-pink-300 font-semibold">callbacks</span></li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    Hinglish:
                  </h3>
                  <p className="text-slate-200 leading-relaxed">
                    Closure ek function ke andar ka function hota hai jo bahar wale function ke variables ko access kar sakta hai, even after bahar wala function execute ho chuka hai. Ye data privacy aur encapsulation ke liye use hota hai.
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Example */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-lg font-bold">2</span>
                <span className="text-purple-400">Basic Closure Example</span>
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-yellow-400 mb-3">Syntax:</h3>
                <CodeBlock 
                  language="javascript" 
                  title="Basic Closure Pattern"
                  id="closure-syntax"
                  code={`function outerFunction(parameter) {
  const outerVariable = "I'm in outer scope";
  
  function innerFunction() {
    // Can access outerVariable and parameter
    console.log(outerVariable);
  }
  
  return innerFunction;
}`}
                />
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-3">Example 1: Simple Closure</h3>
                <CodeBlock 
                  language="javascript" 
                  title="Simple Closure"
                  id="closure-basic"
                  code={`function outerFunction() {
  const outerVariable = "I am outside!";
  
  function innerFunction() {
    console.log(outerVariable);
  }
  
  return innerFunction;
}

const myFunction = outerFunction();
myFunction();`}
                />

                <div className="mt-4 bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-white font-bold mb-2">Explanation:</h4>
                  <ul className="text-slate-300 space-y-1 text-sm">
                    <li><code>outerFunction()</code> → creates closure</li>
                    <li><code>outerVariable</code> → accessible to inner function</li>
                    <li><code>return innerFunction</code> → returns function with closure</li>
                    <li><code>myFunction()</code> → executes with access to outer scope</li>
                  </ul>
                  <div className="mt-3 bg-slate-800/50 rounded p-3">
                    <p className="text-green-400 font-bold">Output:</p>
                    <p className="text-white font-mono">I am outside!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Example */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-bold">3</span>
                <span className="text-green-400">Practical Example - Counter</span>
              </h2>

              <CodeBlock 
                language="javascript" 
                title="Counter with Closure"
                id="closure-counter"
                code={`function createCounter() {
  let count = 0;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
console.log(counter.decrement()); // 1`}
              />

              <div className="mt-4 bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-white font-bold mb-2">Step-by-step execution:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-mono">Step 1:</span>
                    <span className="text-slate-300">createCounter() called → count = 0 (private)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 font-mono">Step 2:</span>
                    <span className="text-slate-300">counter.increment() → count becomes 1 → returns 1</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 font-mono">Step 3:</span>
                    <span className="text-slate-300">counter.increment() → count becomes 2 → returns 2</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 font-mono">Step 4:</span>
                    <span className="text-slate-300">counter.getCount() → returns current count (2)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400 font-mono">Step 5:</span>
                    <span className="text-slate-300">counter.decrement() → count becomes 1 → returns 1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-world Use Cases */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-lg font-bold">4</span>
                <span className="text-orange-400">Real-world Use Cases</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-lg">
                    <div className="w-3 h-3 bg-green-400 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-white font-bold">Data Privacy & Encapsulation</p>
                      <p className="text-slate-300 text-sm">Creating private variables and methods</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-lg">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-white font-bold">Event Handlers & Callbacks</p>
                      <p className="text-slate-300 text-sm">Maintaining state in asynchronous operations</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-lg">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-white font-bold">Function Factories</p>
                      <p className="text-slate-300 text-sm">Creating specialized functions dynamically</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-lg">
                    <div className="w-3 h-3 bg-orange-400 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-white font-bold">Module Pattern</p>
                      <p className="text-slate-300 text-sm">Implementing modular code architecture</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deep Dive: Memory & Performance */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-lg font-bold">5</span>
                <span className="text-purple-400">Memory & Performance Implications</span>
              </h2>
              
              <div className="space-y-6">
                <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
                  <h3 className="text-lg font-bold text-red-300 mb-4 flex items-center gap-2">
                    <span>⚠️</span> Memory Leaks & Garbage Collection
                  </h3>
                  <div className="text-slate-200 leading-relaxed space-y-3">
                    <p>Closures can prevent <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded font-semibold">garbage collection</span> because they maintain references to outer scope variables:</p>
                    
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/30">
                      <h4 className="text-white font-bold mb-2">Memory Leak Example:</h4>
                      <pre className="text-sm text-slate-300 font-mono">
{`function createHeavyFunction() {
  const heavyData = new Array(1000000).fill('data'); // 1MB array
  
  return function() {
    console.log('Function called');
    // heavyData is still referenced, can't be garbage collected
  };
}

const func = createHeavyFunction(); // Memory leak!`}
                      </pre>
                    </div>
                    
                    <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                      <h4 className="text-green-300 font-bold mb-2">Memory Optimized Version:</h4>
                      <pre className="text-sm text-slate-300 font-mono">
{`function createOptimizedFunction() {
  const heavyData = new Array(1000000).fill('data');
  
  return function() {
    console.log('Function called');
    // Don't reference heavyData if not needed
  };
}

// Or explicitly null the reference
let func = createHeavyFunction();
// ... use func
func = null; // Allow garbage collection`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-lg font-bold text-blue-300 mb-4">Execution Context & Scope Chain</h3>
                  <div className="text-slate-200 leading-relaxed space-y-3">
                    <p>Understanding how closures work requires knowledge of <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded font-semibold">execution context</span> and <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded font-semibold">scope chain</span>:</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-700/30 rounded-lg p-4">
                        <h4 className="text-cyan-300 font-bold mb-2">1. Creation Phase</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Variable Environment created</li>
                          <li>• Lexical Environment established</li>
                          <li>• Scope chain formed</li>
                          <li>• 'this' binding determined</li>
                        </ul>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-4">
                        <h4 className="text-yellow-300 font-bold mb-2">2. Execution Phase</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Variables assigned values</li>
                          <li>• Functions executed</li>
                          <li>• Closure references maintained</li>
                          <li>• Scope chain traversed</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-900/20 rounded-xl p-6 border border-orange-500/30">
                  <h3 className="text-lg font-bold text-orange-300 mb-4">Common Closure Pitfalls</h3>
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <h4 className="text-red-300 font-bold mb-2">❌ Loop Problem:</h4>
                      <pre className="text-sm text-slate-300 font-mono mb-2">
{`for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints: 3, 3, 3
}`}
                      </pre>
                      <p className="text-slate-400 text-sm">All closures reference the same 'i' variable</p>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <h4 className="text-green-300 font-bold mb-2">✅ Solutions:</h4>
                      <pre className="text-sm text-slate-300 font-mono">
{`// Solution 1: Use let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints: 0, 1, 2
}

// Solution 2: IIFE (Immediately Invoked Function Expression)
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100); // Prints: 0, 1, 2
  })(i);
}

// Solution 3: bind()
for (var i = 0; i < 3; i++) {
  setTimeout(console.log.bind(null, i), 100); // Prints: 0, 1, 2
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interview Tip */}
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-300 mb-3">Advanced Interview Tips</h3>
                  <div className="text-slate-200 leading-relaxed space-y-2">
                    <p>• <strong>Explain execution context:</strong> How closures maintain reference to lexical environment</p>
                    <p>• <strong>Memory implications:</strong> Discuss garbage collection and potential memory leaks</p>
                    <p>• <strong>Performance considerations:</strong> When closures might impact performance</p>
                    <p>• <strong>Practical examples:</strong> Module pattern, event handlers, async operations</p>
                    <p>• <strong>Common pitfalls:</strong> Loop problems and how to solve them</p>
                    <p>• <strong>ES6 alternatives:</strong> When to use arrow functions vs regular functions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // JavaScript - Hoisting (Basic)
        return (
          <div className="space-y-10">
            {/* Topic Header */}
            <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-500/30 rounded-2xl p-8">
              <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
                <Rocket className="w-10 h-10 text-green-400" />
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">JavaScript Hoisting</span>
              </h1>
              <p className="text-slate-300 text-lg">Understanding variable and function declaration behavior</p>
            </div>

            {/* Definition Section */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold">1</span>
                <span className="text-blue-400">Definition</span>
              </h2>
              
              <div className="space-y-6">
                <div className="bg-slate-700/30 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    English:
                  </h3>
                  <div className="text-slate-200 leading-relaxed space-y-2">
                    <p><span className="px-2 py-1 bg-green-500/20 text-green-300 rounded font-semibold">Hoisting</span> is JavaScript's default behavior of moving <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded font-semibold">declarations</span> to the top of their containing <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded font-semibold">scope</span> during <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded font-semibold">compilation</span>.</p>
                    <p>Types of hoisting:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li><span className="text-green-300 font-semibold">var</span> → hoisted with <span className="text-yellow-300 font-semibold">undefined initialization</span></li>
                      <li><span className="text-blue-300 font-semibold">let/const</span> → hoisted but in <span className="text-red-300 font-semibold">temporal dead zone</span></li>
                      <li><span className="text-purple-300 font-semibold">function declarations</span> → <span className="text-green-300 font-semibold">fully hoisted</span></li>
                      <li><span className="text-orange-300 font-semibold">function expressions</span> → <span className="text-red-300 font-semibold">not hoisted</span></li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    Hinglish:
                  </h3>
                  <p className="text-slate-200 leading-relaxed">
                    Hoisting ka matlab hai ki JavaScript variables aur functions ko unke scope ke top par le jata hai compilation ke time. Lekin sirf declaration hoist hoti hai, initialization nahi.
                  </p>
                </div>
              </div>
            </div>

            {/* Variable Hoisting */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-lg font-bold">2</span>
                <span className="text-purple-400">Variable Hoisting</span>
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-yellow-400 mb-3">Example 1: var hoisting</h3>
                <CodeBlock 
                  language="javascript" 
                  title="var Hoisting Behavior"
                  id="hoisting-var"
                  code={`console.log(x); // undefined (not error)
var x = 5;
console.log(x); // 5

// How JavaScript interprets it:
var x; // Declaration hoisted to top
console.log(x); // undefined
x = 5; // Assignment stays in place
console.log(x); // 5`}
                />

                <div className="mt-4 bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-white font-bold mb-2">Explanation:</h4>
                  <ul className="text-slate-300 space-y-1 text-sm">
                    <li><code>var x</code> → declaration moved to top</li>
                    <li><code>x = 5</code> → assignment stays in original position</li>
                    <li>First <code>console.log(x)</code> → prints undefined</li>
                    <li>Second <code>console.log(x)</code> → prints 5</li>
                  </ul>
                  <div className="mt-3 bg-slate-800/50 rounded p-3">
                    <p className="text-green-400 font-bold">Output:</p>
                    <p className="text-white font-mono">undefined</p>
                    <p className="text-white font-mono">5</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-3">Example 2: let/const hoisting</h3>
                <CodeBlock 
                  language="javascript" 
                  title="let/const Temporal Dead Zone"
                  id="hoisting-letconst"
                  code={`console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

console.log(z); // ReferenceError: Cannot access 'z' before initialization  
const z = 20;`}
                />

                <div className="mt-4 bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-white font-bold mb-2">Explanation:</h4>
                  <ul className="text-slate-300 space-y-1 text-sm">
                    <li><code>let/const</code> → hoisted but not initialized</li>
                    <li>Temporal Dead Zone → cannot access before declaration</li>
                    <li>ReferenceError → thrown when accessed early</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Function Hoisting */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-bold">3</span>
                <span className="text-green-400">Function Hoisting</span>
              </h2>

              <CodeBlock 
                language="javascript" 
                title="Function Declaration vs Expression"
                id="hoisting-function"
                code={`// Function declarations are fully hoisted
console.log(add(2, 3)); // 5 (works!)

function add(a, b) {
  return a + b;
}

// Function expressions are not hoisted
console.log(multiply(2, 3)); // TypeError: multiply is not a function

var multiply = function(a, b) {
  return a * b;
};

console.log(multiply(2, 3)); // 6 (works after declaration)`}
              />

              <div className="mt-4 bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-white font-bold mb-2">Hoisting Behavior:</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded">
                    <div className="w-3 h-3 bg-green-400 rounded-full mt-1"></div>
                    <div>
                      <p className="text-green-300 font-bold">Function Declaration</p>
                      <p className="text-slate-300 text-sm">Fully hoisted - can be called before definition</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-900/20 rounded">
                    <div className="w-3 h-3 bg-red-400 rounded-full mt-1"></div>
                    <div>
                      <p className="text-red-300 font-bold">Function Expression</p>
                      <p className="text-slate-300 text-sm">Only variable declaration hoisted, not the function</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hoisting Rules */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-lg font-bold">4</span>
                <span className="text-orange-400">Hoisting Rules Summary</span>
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <h3 className="text-green-400 font-bold">var</h3>
                  </div>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Declaration hoisted</li>
                    <li>• Initialized with undefined</li>
                    <li>• Function scoped</li>
                    <li>• Can be redeclared</li>
                  </ul>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <h3 className="text-yellow-400 font-bold">let/const</h3>
                  </div>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Declaration hoisted</li>
                    <li>• Temporal dead zone</li>
                    <li>• Block scoped</li>
                    <li>• Cannot be redeclared</li>
                  </ul>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <h3 className="text-blue-400 font-bold">function</h3>
                  </div>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Fully hoisted</li>
                    <li>• Can be called before</li>
                    <li>• Function scoped</li>
                    <li>• Declarations only</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Interview Tip */}
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">💡</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-300 mb-3">Interview Tips</h3>
                  <div className="text-slate-200 leading-relaxed space-y-2">
                    <p>• Explain the difference between var, let, and const hoisting</p>
                    <p>• Mention temporal dead zone for let/const</p>
                    <p>• Distinguish function declarations vs expressions</p>
                    <p>• Give practical examples of hoisting behavior</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // React - useState Hook (Basic)
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-slate-200 leading-relaxed text-lg">
                <span className="text-blue-400">useState</span> is a React Hook that lets you add state to functional components. It returns an array with the current state value and a function to update it.
              </p>
              
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6">
                <p className="text-blue-300 mb-3 flex items-center gap-2">
                  <span>🇮🇳</span> In Hinglish:
                </p>
                <p className="text-slate-200 leading-relaxed">
                  useState hook functional components mein state add karne ke liye use hota hai. Ye ek array return karta hai jisme current state value aur usse update karne ka function hota hai.
                </p>
              </div>
            </div>

            <CodeBlock 
              language="react" 
              title="Basic useState Example"
              id="usestate-basic"
              code={`import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
}`}
            />

            <div className="bg-slate-800/50 rounded-xl p-6 mt-6 border border-slate-700/30">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                Line-by-Line Explanation
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L1:</span>
                  <span className="text-slate-300">Import React and useState hook from react library</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L3:</span>
                  <span className="text-slate-300">Define functional component named Counter</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L4:</span>
                  <span className="text-slate-300">Declare state variable 'count' with initial value 0, and 'setCount' function to update it</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L6:</span>
                  <span className="text-slate-300">Create increment function that increases count by 1</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L10:</span>
                  <span className="text-slate-300">Create decrement function that decreases count by 1</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L14:</span>
                  <span className="text-slate-300">Return JSX that displays current count and two buttons</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 rounded-xl p-6 mt-6 border border-blue-500/30">
              <h4 className="text-lg font-bold text-blue-300 mb-4">🔄 Dry Run Example</h4>
              <div className="space-y-2 text-sm font-mono">
                <div className="text-slate-300">Initial render: count = 0</div>
                <div className="text-green-300">User clicks "Increment" → setCount(0 + 1) → count = 1</div>
                <div className="text-green-300">User clicks "Increment" → setCount(1 + 1) → count = 2</div>
                <div className="text-red-300">User clicks "Decrement" → setCount(2 - 1) → count = 1</div>
                <div className="text-slate-400">Component re-renders each time state changes</div>
              </div>
            </div>

            <CodeBlock 
              language="react" 
              title="Form Validation with Multiple State"
              id="usestate-multiple"
              code={`function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.includes('@')) newErrors.email = 'Valid email required';
    if (age < 18) newErrors.age = 'Must be 18 or older';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      console.log('User data:', { name, email, age });
      setName('');
      setEmail('');
      setAge(0);
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      {errors.name && <span>{errors.name}</span>}
      
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email}</span>}
      
      <input 
        type="number"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value) || 0)}
        placeholder="Age"
      />
      {errors.age && <span>{errors.age}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}`}
            />

            <div className="bg-slate-800/50 rounded-xl p-6 mt-6 border border-slate-700/30">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                Line-by-Line Explanation
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L2-5:</span>
                  <span className="text-slate-300">Initialize four state variables: name, email, age, and errors object</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L7:</span>
                  <span className="text-slate-300">Define validation function that returns error object</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L8-11:</span>
                  <span className="text-slate-300">Check each field and add error messages if validation fails</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L15:</span>
                  <span className="text-slate-300">Prevent default form submission behavior</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L18-25:</span>
                  <span className="text-slate-300">If no errors, log data and reset form; otherwise set error messages</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 rounded-xl p-6 mt-6 border border-blue-500/30">
              <h4 className="text-lg font-bold text-blue-300 mb-4">🔄 Dry Run Example</h4>
              <div className="space-y-2 text-sm font-mono">
                <div className="text-slate-300">Initial: name='', email='', age=0, errors={}</div>
                <div className="text-yellow-300">User types "John" → setName('John') → name='John'</div>
                <div className="text-yellow-300">User types "john@email" → setEmail('john@email') → email='john@email'</div>
                <div className="text-yellow-300">User types "25" → setAge(25) → age=25</div>
                <div className="text-green-300">User clicks Submit → validateForm() → no errors → console.log data</div>
                <div className="text-red-300">If age was 16 → errors=&#123;age: 'Must be 18 or older'&#125; → show error</div>
              </div>
            </div>

            <InterviewTip>
              <p>Explain that useState is asynchronous and batched. Mention functional updates when the new state depends on the previous state: setCount(prevCount =&gt; prevCount + 1).</p>
            </InterviewTip>
          </div>
        );

      case 4: // JavaScript - Event Loop (Intermediate)
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-slate-200 leading-relaxed text-lg">
                The <span className="text-blue-400">Event Loop</span> is JavaScript's mechanism for handling asynchronous operations in a single-threaded environment.
              </p>
              
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6">
                <p className="text-blue-300 mb-3 flex items-center gap-2">
                  <span>🇮🇳</span> In Hinglish:
                </p>
                <p className="text-slate-200 leading-relaxed">
                  Event Loop JavaScript ka mechanism hai jo asynchronous operations ko single-threaded environment mein handle karta hai. Ye call stack, callback queue, aur microtask queue ko manage karta hai.
                </p>
              </div>
            </div>

            <CodeBlock 
              language="javascript" 
              title="Event Loop Execution Order"
              id="event-loop-basic"
              code={`console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise resolved");
});

console.log("End");

// Output:
// Start
// End  
// Promise resolved
// Timeout callback`}
            />

            <div className="bg-slate-800/50 rounded-xl p-6 mt-6 border border-slate-700/30">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                Line-by-Line Explanation
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L1:</span>
                  <span className="text-slate-300">Synchronous console.log executes immediately</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L3-5:</span>
                  <span className="text-slate-300">setTimeout schedules callback in macrotask queue</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L7-9:</span>
                  <span className="text-slate-300">Promise.then schedules callback in microtask queue</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L11:</span>
                  <span className="text-slate-300">Another synchronous console.log executes immediately</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L13-17:</span>
                  <span className="text-slate-300">Comments showing execution order based on event loop priority</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 rounded-xl p-6 mt-6 border border-blue-500/30">
              <h4 className="text-lg font-bold text-blue-300 mb-4">🔄 Dry Run Example</h4>
              <div className="space-y-2 text-sm font-mono">
                <div className="text-slate-300">Call Stack: console.log("Start") → prints "Start"</div>
                <div className="text-yellow-300">setTimeout callback → goes to Macrotask Queue</div>
                <div className="text-yellow-300">Promise callback → goes to Microtask Queue</div>
                <div className="text-slate-300">Call Stack: console.log("End") → prints "End"</div>
                <div className="text-green-300">Event Loop: Process Microtask Queue first → prints "Promise resolved"</div>
                <div className="text-cyan-300">Event Loop: Process Macrotask Queue → prints "Timeout callback"</div>
              </div>
            </div>

            <CodeBlock 
              language="javascript" 
              title="Complex Event Loop Example"
              id="event-loop-complex"
              code={`console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
  Promise.resolve().then(() => console.log("Promise inside timeout"));
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
  return Promise.resolve();
}).then(() => {
  console.log("Promise 2");
});

setTimeout(() => {
  console.log("Timeout 2");
}, 0);

console.log("End");

// Output:
// Start
// End
// Promise 1
// Promise 2
// Timeout 1
// Promise inside timeout
// Timeout 2`}
            />

            <InterviewTip>
              <p>Remember: Microtasks (Promises) have higher priority than macrotasks (setTimeout). The event loop processes all microtasks before moving to the next macrotask.</p>
            </InterviewTip>
          </div>
        );

      case 13: // Node.js - Fundamentals (Basic)
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-slate-200 leading-relaxed text-lg">
                <span className="text-blue-400">Node.js</span> is a JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript on the server side.
              </p>
              
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6">
                <p className="text-blue-300 mb-3 flex items-center gap-2">
                  <span>🇮🇳</span> In Hinglish:
                </p>
                <p className="text-slate-200 leading-relaxed">
                  Node.js ek JavaScript runtime hai jo Chrome ke V8 engine par bana hai. Isse hum JavaScript ko server side par run kar sakte hain, matlab backend development kar sakte hain.
                </p>
              </div>
            </div>

            <CodeBlock 
              language="node" 
              title="Basic HTTP Server"
              id="node-server"
              code={`const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  
  if (req.url === '/api/users' && req.method === 'GET') {
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ];
    res.end(JSON.stringify(users));
  } else if (req.url === '/api/health') {
    res.end(JSON.stringify({ status: 'OK', timestamp: Date.now() }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}
            />

            <div className="bg-slate-800/50 rounded-xl p-6 mt-6 border border-slate-700/30">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                Line-by-Line Explanation
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L1:</span>
                  <span className="text-slate-300">Import built-in HTTP module from Node.js</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L3:</span>
                  <span className="text-slate-300">Create HTTP server with callback function for requests</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L4-5:</span>
                  <span className="text-slate-300">Set default response status and content type</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L7-12:</span>
                  <span className="text-slate-300">Handle GET request to /api/users endpoint</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L13-14:</span>
                  <span className="text-slate-300">Handle health check endpoint</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L15-18:</span>
                  <span className="text-slate-300">Handle 404 for unknown routes</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-500 font-mono w-8">L21-24:</span>
                  <span className="text-slate-300">Start server on specified port with callback</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 rounded-xl p-6 mt-6 border border-blue-500/30">
              <h4 className="text-lg font-bold text-blue-300 mb-4">🔄 Dry Run Example</h4>
              <div className="space-y-2 text-sm font-mono">
                <div className="text-slate-300">Server starts → listening on port 3000</div>
                <div className="text-green-300">GET /api/users → returns JSON array of users</div>
                <div className="text-green-300">GET /api/health → returns status object</div>
                <div className="text-red-300">GET /unknown → returns 404 error</div>
                <div className="text-slate-400">Each request creates new req/res objects</div>
              </div>
            </div>

            <CodeBlock 
              language="node" 
              title="File System Operations"
              id="node-fs"
              code={`const fs = require('fs');
const path = require('path');

// Asynchronous file operations
const readFileAsync = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Write file with error handling
const writeFileAsync = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('File written successfully');
      }
    });
  });
};

// Usage example
async function processFile() {
  try {
    const data = await readFileAsync('input.txt');
    const processedData = data.toUpperCase();
    await writeFileAsync('output.txt', processedData);
    console.log('File processing completed');
  } catch (error) {
    console.error('Error processing file:', error.message);
  }
}`}
            />

            <InterviewTip>
              <p>Emphasize Node.js's non-blocking I/O model and event-driven architecture. Mention how it's single-threaded but uses libuv for handling I/O operations efficiently.</p>
            </InterviewTip>
          </div>
        );
      
      case 50: // JavaScript - Data Types (Basic)
        return (
          <div className="space-y-10">
            {/* Topic Header */}
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-2xl p-8">
              <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
                <Code className="w-10 h-10 text-blue-400" />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">JavaScript Data Types</span>
              </h1>
              <p className="text-slate-300 text-lg">Understanding primitive and non-primitive data types</p>
            </div>

            {/* Definition Section */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold">1</span>
                <span className="text-blue-400">Definition</span>
              </h2>
              
              <div className="space-y-6">
                <div className="bg-slate-700/30 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    English:
                  </h3>
                  <div className="text-slate-200 leading-relaxed space-y-2">
                    <p>JavaScript has <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded font-semibold">8 data types</span> divided into two categories:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                        <h4 className="text-green-300 font-bold mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Primitive Types (7):
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li><code className="text-yellow-300">string</code> - Text data</li>
                          <li><code className="text-yellow-300">number</code> - Numeric values</li>
                          <li><code className="text-yellow-300">boolean</code> - true/false</li>
                          <li><code className="text-yellow-300">undefined</code> - Declared but not assigned</li>
                          <li><code className="text-yellow-300">null</code> - Intentionally empty</li>
                          <li><code className="text-yellow-300">symbol</code> - Unique identifier</li>
                          <li><code className="text-yellow-300">bigint</code> - Large integers</li>
                        </ul>
                      </div>
                      <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30">
                        <h4 className="text-purple-300 font-bold mb-2 flex items-center gap-2">
                          <Database className="w-4 h-4" />
                          Non-Primitive (1):
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li><code className="text-yellow-300">object</code> - Complex data structures</li>
                          <li className="text-xs text-slate-400">Includes: arrays, functions, objects, dates</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    Hinglish:
                  </h3>
                  <p className="text-slate-200 leading-relaxed">
                    JavaScript mein 8 data types hain - 7 primitive (basic) aur 1 non-primitive (complex). Primitive types directly value store karte hain, jabki objects reference store karte hain.
                  </p>
                </div>
              </div>
            </div>

            {/* Examples Section */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-lg font-bold">2</span>
                <span className="text-purple-400">Data Type Examples</span>
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-yellow-400 mb-3">Primitive Types:</h3>
                <CodeBlock 
                  language="javascript" 
                  title="Primitive Data Types"
                  id="primitive-types"
                  code={`// String
let name = "John Doe";
let message = 'Hello World';

// Number
let age = 25;
let price = 99.99;
let infinity = Infinity;

// Boolean
let isActive = true;
let isComplete = false;

// Undefined
let undefinedVar;
console.log(undefinedVar); // undefined

// Null
let emptyValue = null;

// Symbol (ES6+)
let id = Symbol('id');
let anotherId = Symbol('id');
console.log(id === anotherId); // false

// BigInt (ES2020+)
let bigNumber = 1234567890123456789012345678901234567890n;`}
                />
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-3">Non-Primitive Types:</h3>
                <CodeBlock 
                  language="javascript" 
                  title="Non-Primitive Data Types"
                  id="non-primitive-types"
                  code={`// Object
let person = {
  name: "John",
  age: 30,
  city: "New York"
};

// Array (special type of object)
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "hello", true, null];

// Function (special type of object)
function greet() {
  return "Hello!";
}

// Date (built-in object)
let now = new Date();

// Check types
console.log(typeof person);   // "object"
console.log(typeof numbers);  // "object"
console.log(typeof greet);    // "function"
console.log(typeof now);      // "object"`}
                />
              </div>
            </div>

            {/* Type Checking Section */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-bold">3</span>
                <span className="text-green-400">Type Checking Methods</span>
              </h2>

              <CodeBlock 
                language="javascript" 
                title="Type Checking in JavaScript"
                id="type-checking"
                code={`// Using typeof operator
console.log(typeof "hello");        // "string"
console.log(typeof 42);             // "number"
console.log(typeof true);           // "boolean"
console.log(typeof undefined);      // "undefined"
console.log(typeof null);           // "object" (known quirk!)
console.log(typeof Symbol('id'));   // "symbol"
console.log(typeof 123n);           // "bigint"
console.log(typeof {});             // "object"
console.log(typeof []);             // "object"
console.log(typeof function(){});   // "function"

// Better type checking methods
console.log(Array.isArray([]));           // true
console.log(Object.prototype.toString.call([])); // "[object Array]"
console.log(null === null);               // true (for null check)

// Check for specific object types
console.log(new Date() instanceof Date);  // true
console.log(/regex/ instanceof RegExp);   // true`}
              />
            </div>

            <InterviewTip>
              <p><strong>Key Interview Points:</strong> Remember that <code>typeof null</code> returns "object" (historical bug). Use <code>Array.isArray()</code> to check arrays. Primitive types are immutable and passed by value, while objects are mutable and passed by reference.</p>
            </InterviewTip>
          </div>
        );

      default:
        return <div className="text-slate-400">Content not available</div>;
    }
  };

  // Comprehensive interview questions organized by technology and difficulty
  const interviewQuestions = [
    // JavaScript Questions (Basic to Advanced)
    {
      id: 2,
      category: 'javascript',
      difficulty: 'basic',
      question: 'What is hoisting in JavaScript?',
      content: getQuestionContent(2)
    },
    {
      id: 1,
      category: 'javascript',
      difficulty: 'intermediate',
      question: 'What is closure in JavaScript and how does it work?',
      content: getQuestionContent(1)
    },
    {
      id: 4,
      category: 'javascript',
      difficulty: 'intermediate',
      question: 'Explain the event loop in JavaScript',
      content: getQuestionContent(4)
    },
    {
      id: 5,
      category: 'javascript',
      difficulty: 'advanced',
      question: 'What are Promises and async/await in JavaScript?',
      content: getQuestionContent(5)
    },
    {
      id: 50,
      category: 'javascript',
      difficulty: 'basic',
      question: 'What are JavaScript data types?',
      content: getQuestionContent(50)
    },
    {
      id: 51,
      category: 'javascript',
      difficulty: 'intermediate',
      question: 'What is the difference between let, const, and var?',
      content: { explanation: 'var has function scope, let and const have block scope. const cannot be reassigned after declaration.' }
    },
    {
      id: 52,
      category: 'javascript',
      difficulty: 'advanced',
      question: 'What are JavaScript modules and how do they work?',
      content: { explanation: 'Modules allow you to break up your code into separate files and import/export functionality between them.' }
    },

    // React Questions (Basic to Advanced)
    {
      id: 3,
      category: 'react',
      difficulty: 'basic',
      question: 'What is useState hook and how to use it?',
      content: getQuestionContent(3)
    },
    {
      id: 6,
      category: 'react',
      difficulty: 'intermediate',
      question: 'What is useEffect hook and its lifecycle?',
      content: getQuestionContent(6)
    },
    {
      id: 7,
      category: 'react',
      difficulty: 'advanced',
      question: 'What is React Context API and when to use it?',
      content: getQuestionContent(7)
    },
    {
      id: 53,
      category: 'react',
      difficulty: 'basic',
      question: 'What is JSX and how does it work?',
      content: { explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in React components.' }
    },
    {
      id: 54,
      category: 'react',
      difficulty: 'intermediate',
      question: 'What are React props and how to use them?',
      content: { explanation: 'Props are arguments passed into React components to pass data from parent to child components.' }
    },
    {
      id: 55,
      category: 'react',
      difficulty: 'advanced',
      question: 'What is React Router and how to implement routing?',
      content: { explanation: 'React Router is a library for handling routing in React applications, allowing navigation between different components.' }
    },

    // HTML Questions (Basic to Advanced)
    {
      id: 8,
      category: 'html',
      difficulty: 'basic',
      question: 'What is semantic HTML and why is it important?',
      content: getQuestionContent(8)
    },
    {
      id: 9,
      category: 'html',
      difficulty: 'intermediate',
      question: 'What are HTML5 new features and APIs?',
      content: getQuestionContent(9)
    },

    // CSS Questions (Basic to Advanced)
    {
      id: 10,
      category: 'css',
      difficulty: 'basic',
      question: 'What is the CSS Box Model?',
      content: getQuestionContent(10)
    },
    {
      id: 11,
      category: 'css',
      difficulty: 'intermediate',
      question: 'What is Flexbox and how does it work?',
      content: getQuestionContent(11)
    },
    {
      id: 12,
      category: 'css',
      difficulty: 'advanced',
      question: 'What is CSS Grid and how is it different from Flexbox?',
      content: getQuestionContent(12)
    },
    {
      id: 59,
      category: 'css',
      difficulty: 'basic',
      question: 'What are CSS selectors and their types?',
      content: { explanation: 'CSS selectors are patterns used to select HTML elements. Types include element, class, ID, attribute, and pseudo selectors.' }
    },
    {
      id: 60,
      category: 'css',
      difficulty: 'intermediate',
      question: 'What is CSS positioning and its values?',
      content: { explanation: 'CSS position property specifies how an element is positioned. Values include static, relative, absolute, fixed, and sticky.' }
    },
    {
      id: 61,
      category: 'css',
      difficulty: 'advanced',
      question: 'What are CSS animations and transitions?',
      content: { explanation: 'CSS animations allow you to animate HTML elements without JavaScript. Transitions provide smooth changes between property values.' }
    },

    // Node.js Questions (Basic to Advanced)
    {
      id: 13,
      category: 'node',
      difficulty: 'basic',
      question: 'What is Node.js and how does it work?',
      content: getQuestionContent(13)
    },
    {
      id: 14,
      category: 'node',
      difficulty: 'intermediate',
      question: 'What are Node.js modules and how do they work?',
      content: getQuestionContent(14)
    },
    {
      id: 15,
      category: 'node',
      difficulty: 'advanced',
      question: 'What is clustering in Node.js and why use it?',
      content: getQuestionContent(15)
    },
    {
      id: 56,
      category: 'node',
      difficulty: 'basic',
      question: 'What is npm and how to manage packages?',
      content: { explanation: 'npm (Node Package Manager) is a package manager for JavaScript that allows you to install, update, and manage dependencies.' }
    },
    {
      id: 57,
      category: 'node',
      difficulty: 'intermediate',
      question: 'What is the Event Loop in Node.js?',
      content: { explanation: 'The Event Loop is what allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel.' }
    },
    {
      id: 58,
      category: 'node',
      difficulty: 'advanced',
      question: 'What are Streams in Node.js and their types?',
      content: { explanation: 'Streams are objects that let you read data from a source or write data to a destination in a continuous fashion.' }
    },

    // Express Questions (Basic to Advanced)
    {
      id: 16,
      category: 'express',
      difficulty: 'basic',
      question: 'What is Express.js and how to create a basic server?',
      content: getQuestionContent(16)
    },
    {
      id: 17,
      category: 'express',
      difficulty: 'intermediate',
      question: 'What are Express middleware and how do they work?',
      content: getQuestionContent(17)
    },

    // MongoDB Questions (Basic to Advanced)
    {
      id: 18,
      category: 'mongodb',
      difficulty: 'basic',
      question: 'What is MongoDB and how is it different from SQL databases?',
      content: getQuestionContent(18)
    },
    {
      id: 19,
      category: 'mongodb',
      difficulty: 'intermediate',
      question: 'What are MongoDB aggregation pipelines?',
      content: getQuestionContent(19)
    },

    // Authentication Questions (Basic to Advanced)
    {
      id: 20,
      category: 'auth',
      difficulty: 'basic',
      question: 'What is authentication vs authorization?',
      content: getQuestionContent(20)
    },
    {
      id: 21,
      category: 'auth',
      difficulty: 'intermediate',
      question: 'What is JWT (JSON Web Token) authentication?',
      content: getQuestionContent(21)
    },
    {
      id: 22,
      category: 'oauth',
      difficulty: 'advanced',
      question: 'What is OAuth 2.0 and how does it work?',
      content: getQuestionContent(22)
    },

    // Full Stack Questions (Intermediate to Advanced)
    {
      id: 23,
      category: 'fullstack',
      difficulty: 'intermediate',
      question: 'How do you handle CORS in a full-stack application?',
      content: getQuestionContent(23)
    },
    {
      id: 24,
      category: 'fullstack',
      difficulty: 'advanced',
      question: 'How do you optimize a full-stack application for performance?',
      content: getQuestionContent(24)
    }
  ];

  // Organize questions by language and difficulty
  const getQuestionsByLanguage = (language) => {
    const languageQuestions = interviewQuestions.filter(q => q.category === language);
    const sortedQuestions = languageQuestions.sort((a, b) => {
      const difficultyOrder = { basic: 1, intermediate: 2, advanced: 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });
    return sortedQuestions;
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'basic': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'advanced': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
    }
  };

  // Enhanced Sidebar Component
  const QuestionSidebar = ({ language, questions, onQuestionSelect }) => (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-sm shadow-2xl">
      <div className="flex-shrink-0 p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/90 to-slate-700/90">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
            {React.createElement(categories.find(c => c.id === language)?.icon || Code, { 
              className: "w-6 h-6 text-white" 
            })}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              {categories.find(c => c.id === language)?.name || language}
            </h3>
            <p className="text-slate-400 text-sm">
              {questions.length} questions • Interview Prep
            </p>
          </div>
        </div>
        
        <div className="bg-slate-700/40 rounded-xl p-4 border border-slate-600/30">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Difficulty Levels
          </h4>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-300 font-medium">Basic</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-300 font-medium">Inter</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-red-300 font-medium">Adv</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {questions.map((question, index) => (
          <motion.button
            key={question.id}
            onClick={() => onQuestionSelect(question)}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
              selectedQuestion?.id === question.id
                ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/50 text-white shadow-lg'
                : 'bg-slate-700/40 border-slate-600/40 text-slate-300 hover:bg-slate-700/60 hover:border-slate-500/60 hover:shadow-md'
            }`}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-slate-500 bg-slate-600/30 px-2 py-0.5 rounded">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getDifficultyColor(question.difficulty)}`}>
                    {question.difficulty.toUpperCase()}
                  </span>
                </div>
                <p className="font-medium text-sm leading-tight line-clamp-2">
                  {question.question}
                </p>
              </div>
              {selectedQuestion?.id === question.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0 mt-1 shadow-lg"
                />
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );

  // Filter questions based on search and category
  const filteredQuestions = interviewQuestions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || question.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Language Page Component
  const LanguagePage = ({ language }) => {
    const languageQuestions = getQuestionsByLanguage(language);
    const languageInfo = categories.find(c => c.id === language);

    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col overflow-hidden">
        {/* Fixed Header - No Footer */}
        <div className="flex-shrink-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black border-b border-slate-700/30 pt-20 z-30 relative">
          <div className="px-6 py-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-4"
            >
              <button
                onClick={goBackToHome}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 text-white font-semibold shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-xl">
                  {React.createElement(languageInfo?.icon || Code, { className: "w-5 h-5 text-white" })}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  {languageInfo?.name || language}
                </h1>
              </div>
              <p className="text-sm text-slate-400">
                {languageQuestions.length} interview questions • Basic to Advanced
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content - Flex Layout with Independent Scrolling */}
        <div className="flex flex-1 h-full">
          {/* Sidebar with Independent Scrolling */}
          <div className="w-80 bg-slate-800/90 backdrop-blur-sm border-r border-slate-700/50 flex-shrink-0 relative z-20 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <QuestionSidebar 
                language={language}
                questions={languageQuestions}
                onQuestionSelect={setSelectedQuestion}
              />
            </div>
          </div>

          {/* Content Area with Independent Scrolling */}
          <div className="flex-1 bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-black/50 relative z-10 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <div className="p-6 pb-20">
              {selectedQuestion ? (
                <motion.div
                  key={selectedQuestion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl mb-8"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span className="px-4 py-2 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                          {languageInfo?.name || language}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleBookmark(`interview-${selectedQuestion.id}`)}
                        className="text-yellow-400 hover:text-yellow-300 transition-all duration-300 hover:scale-110"
                      >
                        {bookmarkedItems.has(`interview-${selectedQuestion.id}`) ? 
                          <BookmarkCheck className="w-6 h-6" /> : 
                          <Bookmark className="w-6 h-6" />
                        }
                      </button>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold text-white leading-tight mb-4">{selectedQuestion.question}</h3>
                      {selectedQuestion.difficulty && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                          {selectedQuestion.difficulty.toUpperCase()}
                        </span>
                      )}
                    </div>
                    
                    <div className="question-content">
                      {selectedQuestion.content || (
                        <div 
                          className="prose prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: selectedQuestion.answer }}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-full"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      {React.createElement(languageInfo?.icon || Code, { className: "w-10 h-10 text-blue-400" })}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-300 mb-2">Select a Question</h3>
                    <p className="text-slate-500">Choose a question from the sidebar to view detailed explanation</p>
                  </div>
                </motion.div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };



  // Render language page if selected
  if (showLanguagePage) {
    return <LanguagePage language={currentPage} />;
  }

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none z-0"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-20">
        {/* Enhanced Header with better spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 px-4"
        >
          <div className="flex flex-col items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-4">
                Full-Stack Interview Prep
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Master <span className="text-blue-400 font-semibold">Full-Stack Web Development</span> with comprehensive interview questions, 
                <span className="text-cyan-400 font-semibold"> practical code examples</span>, and detailed explanations.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-400" />
              <span className="font-medium">Interactive Code Examples</span>
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              <span className="font-medium">Real Interview Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Book className="w-4 h-4 text-teal-400" />
              <span className="font-medium">Detailed Explanations</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar and Navigation - Replaces Search Bar */}
        {activeCategory !== 'all' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 max-w-4xl mx-auto px-4"
          >
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {categories.find(c => c.id === activeCategory)?.icon && (
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      {React.createElement(categories.find(c => c.id === activeCategory).icon, { 
                        className: "w-5 h-5 text-blue-400" 
                      })}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {categories.find(c => c.id === activeCategory)?.name} Progress
                    </h3>
                    <p className="text-sm text-slate-400">
                      {getCurrentCategoryQuestions().filter(q => completedQuestions.has(q.id)).length} of {getCurrentCategoryQuestions().length} questions completed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">
                    {Math.round(getProgressPercentage())}%
                  </div>
                  <div className="text-xs text-slate-400">Complete</div>
                </div>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500 relative"
                  style={{ width: `${getProgressPercentage()}%` }}
                >
                  <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  {getCurrentCategoryQuestions().filter(q => completedQuestions.has(q.id)).length} completed
                </span>
                
                {selectedQuestion && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPreviousQuestion}
                      disabled={getCurrentQuestionIndex() === 0}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs transition-all ${
                        getCurrentQuestionIndex() === 0
                          ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed'
                          : 'bg-slate-700 hover:bg-slate-600 text-white'
                      }`}
                    >
                      <ArrowLeft className="w-3 h-3" />
                      Prev
                    </button>
                    
                    <span className="text-xs text-slate-400 px-2">
                      {getCurrentQuestionIndex() + 1} / {getCurrentCategoryQuestions().length}
                    </span>
                    
                    <button
                      onClick={goToNextQuestion}
                      disabled={getCurrentQuestionIndex() === getCurrentCategoryQuestions().length - 1}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs transition-all ${
                        getCurrentQuestionIndex() === getCurrentCategoryQuestions().length - 1
                          ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      Next
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
                
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <BarChart3 className="w-3 h-3" />
                  {getCurrentCategoryQuestions().length - getCurrentCategoryQuestions().filter(q => completedQuestions.has(q.id)).length} remaining
                </span>
              </div>
            </div>
          </motion.div>
        )}


        {/* Main Content Area with proper spacing */}
        <div className="flex gap-8 mt-8">
          {/* Sidebar - Scrollable independently - shifted up */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-2 max-h-[calc(100vh-6rem)] overflow-y-auto bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Topics</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                        activeCategory === category.id
                          ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30'
                          : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content Area - Scrollable independently */}
          <div className="flex-1 min-w-0 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
            {/* Selected Question Display */}
            {selectedQuestion ? (
              <motion.div
                key={selectedQuestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                        {categories.find(c => c.id === selectedQuestion.category)?.name || selectedQuestion.category}
                      </span>
                      {categories.find(c => c.id === selectedQuestion.category)?.icon && (
                        <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                          {React.createElement(categories.find(c => c.id === selectedQuestion.category).icon, { 
                            className: "w-4 h-4 text-blue-400" 
                          })}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => toggleBookmark(`interview-${selectedQuestion.id}`)}
                      className="text-yellow-400 hover:text-yellow-300 transition-all duration-300 hover:scale-110"
                    >
                      {bookmarkedItems.has(`interview-${selectedQuestion.id}`) ? 
                        <BookmarkCheck className="w-6 h-6" /> : 
                        <Bookmark className="w-6 h-6" />
                      }
                    </button>
                  </div>
                  
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-white leading-tight mb-4">{selectedQuestion.question}</h3>
                      {selectedQuestion.difficulty && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                          {selectedQuestion.difficulty.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="question-content mb-8">
                    {selectedQuestion.content || (
                      <div 
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: selectedQuestion.answer }}
                      />
                    )}
                  </div>


                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-700/50">
                    <button
                      onClick={goToPreviousQuestion}
                      disabled={getCurrentQuestionIndex() === 0}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        getCurrentQuestionIndex() === 0
                          ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed'
                          : 'bg-slate-700 hover:bg-slate-600 text-white'
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => markQuestionCompleted(selectedQuestion.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          completedQuestions.has(selectedQuestion.id)
                            ? 'bg-green-600 text-white'
                            : 'bg-green-600/20 hover:bg-green-600/30 text-green-400'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        {completedQuestions.has(selectedQuestion.id) ? 'Completed' : 'Mark Complete'}
                      </button>

                      <span className="text-sm text-slate-400">
                        {getCurrentQuestionIndex() + 1} of {getCurrentCategoryQuestions().length}
                      </span>
                    </div>

                    <button
                      onClick={goToNextQuestion}
                      disabled={getCurrentQuestionIndex() === getCurrentCategoryQuestions().length - 1}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        getCurrentQuestionIndex() === getCurrentCategoryQuestions().length - 1
                          ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : activeCategory === 'all' ? (
              /* Show message when no specific category is selected */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <BookOpen className="w-20 h-20 mx-auto text-slate-600 mb-6" />
                <h3 className="text-2xl font-bold text-slate-400 mb-4">Select a Topic to Get Started</h3>
                <p className="text-slate-500 mb-8">Choose a technology from the sidebar to view interview questions and practice materials.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {categories.slice(1, 6).map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-lg transition-all"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : activeCategory !== 'all' ? (
              /* Questions Display for Selected Category */
              <div className="space-y-6 pb-8">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedQuestion(item)}
                      className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:shadow-blue-500/10"
                    >
                      <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <span className="px-4 py-2 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                            {categories.find(c => c.id === item.category)?.name || item.category}
                          </span>
                          {categories.find(c => c.id === item.category)?.icon && (
                            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                              {React.createElement(categories.find(c => c.id === item.category).icon, { 
                                className: "w-4 h-4 text-blue-400" 
                              })}
                            </div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(`interview-${item.id}`);
                            }}
                            className="text-yellow-400 hover:text-yellow-300 transition-all duration-300 hover:scale-110"
                          >
                            {bookmarkedItems.has(`interview-${item.id}`) ? 
                              <BookmarkCheck className="w-6 h-6" /> : 
                              <Bookmark className="w-6 h-6" />
                            }
                          </button>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white leading-tight mb-4 text-center">{item.question}</h3>
                        
                        <div className="flex items-center justify-center gap-4 mb-4">
                          {item.difficulty && (
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(item.difficulty)}`}>
                              {item.difficulty.toUpperCase()}
                            </span>
                          )}
                          <div className="flex items-center gap-1 text-slate-400 text-sm">
                            <Target className="w-4 h-4" />
                            <span>Interview Question</span>
                          </div>
                        </div>
                        
                        <p className="text-slate-400 text-sm">Click to view detailed explanation →</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <BookOpen className="w-20 h-20 mx-auto text-slate-600 mb-6" />
                    <h3 className="text-2xl font-bold text-slate-400 mb-2">No questions found</h3>
                    <p className="text-slate-500">Try adjusting your search or category filter</p>
                  </motion.div>
                )}
              </div>
            ) : (
              /* Show message when 'All Topics' is selected */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <BookOpen className="w-20 h-20 mx-auto text-slate-600 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Select a Topic to Get Started</h3>
                <p className="text-slate-400 text-lg max-w-md mx-auto">
                  Choose a specific topic from the sidebar to view related interview questions and start learning.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
