import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Box } from '@react-three/drei';
import { BookOpen, Search, Code, Database, Server, Globe, Lock, Layers } from 'lucide-react';

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

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
    { id: 'architecture', name: 'Architecture', icon: Layers },
  ];

  // Sample interview questions (to be expanded)
  const interviewQuestions = [
    {
      id: 1,
      category: 'javascript',
      question: 'What is closure in JavaScript?',
      answer: `
        <p class="mb-4">A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).</p>
        
        <p class="mb-4">In simple terms, a closure gives you access to an outer function's scope from an inner function, even after the outer function has returned.</p>
        
         <p class="mb-4"><span class="text-white/90 font-medium">In Hinglish:</span> Closure ek function ke andar ka function hota hai jo bahar wale function ke variables ko access kar sakta hai, even after bahar wala function execute ho chuka hai.</p>
        
        <div class="backdrop-blur-lg bg-white/5 rounded-lg p-4 my-4 border border-white/10">
          <pre><code class="language-javascript">function outerFunction() {
  const outerVariable = "I am outside!";
  
  function innerFunction() {
    console.log(outerVariable); // Access variable from outer scope
  }
  
  return innerFunction;
}

const myFunction = outerFunction();
myFunction(); // Logs: "I am outside!"</code></pre>
        </div>
        
        <p class="mb-4">In this example:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><code>innerFunction</code> forms a closure with <code>outerFunction</code>'s scope</li>
          <li>Even after <code>outerFunction</code> has completed execution, <code>myFunction</code> (which is <code>innerFunction</code>) can still access <code>outerVariable</code></li>
          <li>This is because the inner function "remembers" the environment in which it was created</li>
        </ul>
        
        <p class="mb-4"><strong>Real-world use cases:</strong></p>
        <ul class="list-disc pl-6 mb-4">
          <li>Data privacy / encapsulation</li>
          <li>Event handlers and callbacks</li>
          <li>Function factories</li>
          <li>Module pattern implementation</li>
        </ul>
      `,
    },
    {
      id: 2,
      category: 'javascript',
      question: 'Explain the event loop in JavaScript',
      answer: `
        <p class="mb-4">The JavaScript Event Loop is a mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded.</p>
        
         <p class="mb-4"><span class="text-white/90 font-medium">In Hinglish:</span> Event Loop ek mechanism hai jo JavaScript ko single-threaded hone ke bawajood bhi non-blocking operations perform karne deta hai. Iska matlab hai ki JavaScript ek hi thread par chalta hai, lekin async operations ko handle kar leta hai.</p>
        
        <div class="backdrop-blur-lg bg-white/5 rounded-lg p-4 my-4 border border-white/10">
          <pre><code class="language-javascript">console.log("Start");

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
// Timeout callback</code></pre>
        </div>
        
        <p class="mb-4">Key components of the Event Loop:</p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Call Stack:</strong> Where function calls are tracked</li>
          <li><strong>Callback Queue:</strong> Where callbacks from async operations wait</li>
          <li><strong>Microtask Queue:</strong> Higher priority queue for Promises</li>
          <li><strong>Event Loop:</strong> Constantly checks if Call Stack is empty, then processes queues</li>
        </ul>
        
        <p class="mb-4">The execution flow:</p>
        <ol class="list-decimal pl-6 mb-4">
          <li>Synchronous code executes on the Call Stack</li>
          <li>Async operations are offloaded to Web APIs (in browsers) or C++ APIs (in Node.js)</li>
          <li>When async operations complete, callbacks go to appropriate queues</li>
          <li>Once Call Stack is empty, Event Loop processes Microtask Queue first (Promises)</li>
          <li>Then processes the Callback Queue (setTimeout, I/O, etc.)</li>
        </ol>
        
        <div class="mt-4 p-4 backdrop-blur-lg bg-white/10 rounded-lg border border-white/20">
          <p class="font-semibold mb-2">🔍 Interview Tip:</p>
          <p>Mention that understanding the Event Loop is crucial for debugging and optimizing JavaScript applications, especially when dealing with asynchronous operations.</p>
        </div>
      `,
    },
    {
      id: 3,
      category: 'react',
      question: 'What are React hooks and why were they introduced?',
      answer: `
        <p class="mb-4">React Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8.</p>
        
         <p class="mb-4"><span class="text-white/90 font-medium">In Hinglish:</span> React Hooks special functions hote hain jo aapko function components mein state aur lifecycle features ka use karne dete hain. Hooks se pehle, in features ke liye class components zaruri the.</p>
        
        <div class="backdrop-blur-lg bg-white/5 rounded-lg p-4 my-4 border border-white/10">
          <pre><code class="language-javascript">import React, { useState, useEffect } from 'react';

function Counter() {
  // State Hook
  const [count, setCount] = useState(0);
  
  // Effect Hook
  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
    
    // Cleanup function (componentWillUnmount equivalent)
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run if count changes
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}</code></pre>
        </div>
        
        <p class="mb-4"><strong>Why Hooks were introduced:</strong></p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Reuse stateful logic</strong> between components without complex patterns like render props or HOCs</li>
          <li><strong>Split complex components</strong> into smaller functions based on related pieces</li>
          <li><strong>Use React features without classes</strong>, avoiding issues with 'this' binding</li>
          <li><strong>Reduce bundle size</strong> as function components with hooks can be more optimizable</li>
          <li><strong>Better TypeScript integration</strong> compared to class components</li>
        </ul>
        
        <p class="mb-4"><strong>Common built-in hooks:</strong></p>
        <ul class="list-disc pl-6 mb-4">
          <li><code>useState</code> - Adds state to function components</li>
          <li><code>useEffect</code> - Handles side effects (similar to componentDidMount, componentDidUpdate, componentWillUnmount)</li>
          <li><code>useContext</code> - Subscribes to React context</li>
          <li><code>useReducer</code> - State management with reducer pattern</li>
          <li><code>useCallback</code> - Returns memoized callback function</li>
          <li><code>useMemo</code> - Returns memoized value</li>
          <li><code>useRef</code> - Creates a mutable reference</li>
        </ul>
        
        <div class="mt-4 p-4 backdrop-blur-lg bg-white/10 rounded-lg border border-white/20">
          <p class="font-semibold mb-2">🔍 Interview Tip:</p>
          <p>Mention that hooks follow rules: only call hooks at the top level (not inside loops, conditions, or nested functions) and only call hooks from React function components or custom hooks.</p>
        </div>
      `,
    },
    {
      id: 4,
      category: 'node',
      question: 'What is Node.js and how does it work?',
      answer: `
        <p class="mb-4">Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. It allows developers to use JavaScript for server-side scripting.</p>
        
         <p class="mb-4"><span class="text-white/90 font-medium">In Hinglish:</span> Node.js ek aisa platform hai jo JavaScript ko browser ke bahar chalane ki capability deta hai. Isse hum JavaScript ka use server-side programming ke liye kar sakte hain, jisse frontend aur backend dono jagah same language use kar sakte hain.</p>
        
        <p class="mb-4"><strong>How Node.js works:</strong></p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>V8 Engine:</strong> Google's open-source JavaScript engine that compiles JavaScript to native machine code</li>
          <li><strong>Event Loop:</strong> Single-threaded non-blocking I/O model that handles multiple concurrent operations</li>
          <li><strong>libuv:</strong> C library that provides the event loop, thread pool, and asynchronous I/O operations</li>
          <li><strong>Node.js Bindings:</strong> Connect JavaScript and C++ features</li>
        </ul>
        
        <div class="backdrop-blur-lg bg-white/5 rounded-lg p-4 my-4 border border-white/10">
          <pre><code class="language-javascript">// Simple Node.js HTTP server
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\\n');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000/');
});</code></pre>
        </div>
        
        <p class="mb-4"><strong>Key features of Node.js:</strong></p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Asynchronous & Non-blocking:</strong> Operations don't block the thread, callbacks are used when tasks complete</li>
          <li><strong>Fast Execution:</strong> Built on Chrome's V8 JavaScript engine</li>
          <li><strong>Single-threaded:</strong> Uses event loop for handling multiple clients</li>
          <li><strong>No Buffering:</strong> Applications never buffer data, output is in chunks</li>
          <li><strong>NPM:</strong> Huge ecosystem of open-source libraries</li>
        </ul>
        
        <p class="mb-4"><strong>Use cases for Node.js:</strong></p>
        <ul class="list-disc pl-6 mb-4">
          <li>Real-time applications (chat, gaming)</li>
          <li>Single-page applications</li>
          <li>API servers</li>
          <li>Streaming applications</li>
          <li>Microservices architecture</li>
        </ul>
        
        <div class="mt-4 p-4 backdrop-blur-lg bg-white/10 rounded-lg border border-white/20">
          <p class="font-semibold mb-2">🔍 Interview Tip:</p>
          <p>Highlight that while Node.js is single-threaded, it can handle concurrent operations efficiently through its non-blocking I/O model. For CPU-intensive tasks, you can use the cluster module or worker threads.</p>
        </div>
      `,
    },
    {
      id: 5,
      category: 'auth',
      question: 'Explain JWT (JSON Web Tokens) authentication',
      answer: `
        <p class="mb-4">JWT (JSON Web Token) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.</p>
        
         <p class="mb-4"><span class="text-white/90 font-medium">In Hinglish:</span> JWT ek secure tarika hai information transfer karne ka. Ye ek encoded string hota hai jisme user ki information hoti hai, aur server ise verify kar sakta hai bina database query kiye.</p>
        
        <p class="mb-4"><strong>JWT Structure:</strong> A JWT consists of three parts separated by dots:</p>
        <ol class="list-decimal pl-6 mb-4">
          <li><strong>Header:</strong> Contains the type of token and the signing algorithm</li>
          <li><strong>Payload:</strong> Contains the claims (user data and metadata)</li>
          <li><strong>Signature:</strong> Verifies that the sender of the JWT is who it says it is</li>
        </ol>
        
        <div class="backdrop-blur-lg bg-white/5 rounded-lg p-4 my-4 border border-white/10">
          <pre><code>// JWT format
xxxxx.yyyyy.zzzzz

// Example
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></pre>
        </div>
        
        <div class="backdrop-blur-lg bg-white/5 rounded-lg p-4 my-4 border border-white/10">
          <pre><code class="language-javascript">// Node.js JWT implementation
const jwt = require('jsonwebtoken');

// Creating a token
const token = jwt.sign(
  { userId: user.id, email: user.email }, // payload
  'your-secret-key',                      // secret key
  { expiresIn: '1h' }                     // options
);

// Verifying a token
try {
  const decoded = jwt.verify(token, 'your-secret-key');
  // User is authenticated, proceed with decoded.userId
} catch (error) {
  // Invalid token
}</code></pre>
        </div>
        
        <p class="mb-4"><strong>JWT Authentication Flow:</strong></p>
        <ol class="list-decimal pl-6 mb-4">
          <li>User logs in with credentials</li>
          <li>Server validates credentials and creates a JWT</li>
          <li>Server sends the JWT to the client</li>
          <li>Client stores the JWT (localStorage, cookie, etc.)</li>
          <li>Client sends the JWT with subsequent requests in Authorization header</li>
          <li>Server validates the JWT signature and processes the request if valid</li>
        </ol>
        
        <p class="mb-4"><strong>Advantages of JWT:</strong></p>
        <ul class="list-disc pl-6 mb-4">
          <li><strong>Stateless:</strong> Server doesn't need to store session information</li>
          <li><strong>Scalability:</strong> Works well with distributed systems and microservices</li>
          <li><strong>Cross-domain:</strong> Can be used across different domains</li>
          <li><strong>Mobile friendly:</strong> Works well with native mobile apps</li>
        </ul>
        
        <p class="mb-4"><strong>Security Considerations:</strong></p>
        <ul class="list-disc pl-6 mb-4">
          <li>Store JWT securely (HttpOnly cookies preferred over localStorage)</li>
          <li>Use HTTPS to prevent token interception</li>
          <li>Set appropriate expiration times</li>
          <li>Don't store sensitive data in payload (it's base64 encoded, not encrypted)</li>
          <li>Use strong secret keys and consider key rotation</li>
        </ul>
        
        <div class="mt-4 p-4 backdrop-blur-lg bg-white/10 rounded-lg border border-white/20">
          <p class="font-semibold mb-2">🔍 Interview Tip:</p>
          <p>Mention that while JWTs are popular for authentication, they have trade-offs. They can't be invalidated before expiry without additional backend logic, and the payload increases request size.</p>
        </div>
      `,
    }
  ];

  // Filter questions based on search and category
  const filteredQuestions = interviewQuestions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || q.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-20 px-4 pb-8 learn-page">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Full-Stack Interview Preparation
              </h1>
               <p className="text-white/85 text-lg">
                 Comprehensive guide to web development interview questions with detailed explanations and examples.
               </p>
            </div>
            
            <div className="hidden md:block w-32 h-32">
              <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={0.5} />
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
                  <Box args={[0.8, 0.8, 0.8]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#FFFFFF" transparent opacity={0.6} />
                  </Box>
                </Float>
              </Canvas>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 max-w-2xl"
        >
          <div className="relative">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
            <input
              type="text"
              placeholder="Search interview questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 overflow-x-auto"
        >
          <div className="flex space-x-2 pb-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                 className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                   activeCategory === category.id
                     ? 'bg-white/30 text-white border border-white'
                     : 'backdrop-blur-lg bg-white/10 border border-white/20 text-white/75 hover:bg-white/20'
                 }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Questions and Answers */}
        <div className="space-y-6">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="backdrop-blur-lg bg-white/10 rounded-2xl overflow-hidden border border-white/20 hover:border-white/50 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm">
                      {categories.find(c => c.id === item.category)?.name || item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{item.question}</h3>
                  <div 
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20"
            >
               <BookOpen className="w-16 h-16 mx-auto text-white/70 mb-4" />
              <h3 className="text-xl font-medium text-white">No questions found</h3>
              <p className="text-white/70 mt-2">Try adjusting your search or category filter</p>
            </motion.div>
          )}
        </div>

        {/* More content indicator */}
        {filteredQuestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-white/60">More questions are being added regularly...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Learn;
