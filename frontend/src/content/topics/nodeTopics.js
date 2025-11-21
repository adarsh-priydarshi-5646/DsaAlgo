// Node.js Topics Content - Comprehensive Interview Questions
export const nodeTopics = {
  basics: {
    id: 13,
    category: 'node',
    difficulty: 'basic',
    question: 'What is Node.js and how does it work?',
    title: 'Node.js Fundamentals',
    subtitle: 'Understanding Node.js architecture and event loop',
    sections: [
      {
        type: 'definition',
        title: 'What is Node.js?',
        content: {
          english: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine that allows you to run JavaScript on the server-side. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for building scalable network applications.',
          hinglish: 'Node.js ek JavaScript runtime hai jo Chrome ke V8 engine pe bana hai. Ye server-side pe JavaScript run karne deta hai. Event-driven aur non-blocking I/O model use karta hai jo isko fast aur scalable banata hai.',
          keyPoints: [
            'JavaScript runtime built on V8 engine',
            'Event-driven, non-blocking I/O',
            'Single-threaded with event loop',
            'Perfect for I/O intensive applications',
            'NPM - largest ecosystem of packages',
            'Cross-platform (Windows, Linux, macOS)'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Node.js vs Browser JavaScript',
        examples: [
          {
            title: 'Browser JavaScript',
            code: `// Browser environment
console.log(window); // Global object
console.log(document); // DOM manipulation
console.log(localStorage); // Browser APIs

// No file system access
// No direct network access
// Runs in sandbox`,
            note: 'Limited to browser capabilities'
          },
          {
            title: 'Node.js JavaScript  ',
            code: `// Node.js environment
console.log(global); // Global object (not window)
console.log(process); // Process information
console.log(__dirname); // Current directory

// File system access
const fs = require('fs');
fs.readFileSync('file.txt');

// Network access
const http = require('http');
http.createServer();

// Operating system access
const os = require('os');
console.log(os.platform());`,
            note: 'Full system access and capabilities'
          }
        ]
      },
      {
        type: 'examples',
        title: 'Event Loop - The Heart of Node.js',
        examples: [
          {
            title: 'How Event Loop Works',
            code: `console.log('1. Start');

setTimeout(() => {
  console.log('4. Timeout callback (Task Queue)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise (Microtask Queue)');
});

console.log('2. End');

// Output Order:
// 1. Start
// 2. End
// 3. Promise (Microtask Queue)
// 4. Timeout callback (Task Queue)
//
// WHY? 
// 1. Synchronous code executes first
// 2. Microtasks (Promises) run before Macrotasks
// 3. Macrotasks (setTimeout, setInterval) run last`,
            explanation: 'Event loop prioritizes: Sync → Microtasks → Macrotasks'
          },
          {
            title: 'Event Loop Phases',
            code: `// Event Loop has 6 phases (simplified):
/*
   ┌───────────────────────────┐
┌─>│           timers          │ setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │ I/O callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │ Internal
│  └─────────────┬─────────────┘      
│  ┌─────────────┴─────────────┐
│  │           poll            │ Retrieve new I/O events
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │ setImmediate
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │ socket.on('close')
   └───────────────────────────┘
*/

// Example showing phases
const fs = require('fs');

console.log('1. Sync');

setImmediate(() => console.log('2. setImmediate (check phase)'));

setTimeout(() => console.log('3. setTimeout (timers phase)'), 0);

fs.readFile(__filename, () => {
  console.log('4. File I/O (poll phase)');
  
  setImmediate(() => console.log('5. setImmediate in I/O'));
  setTimeout(() => console.log('6. setTimeout in I/O'), 0);
});

process.nextTick(() => console.log('7. nextTick (Microtask)'));

Promise.resolve().then(() => console.log('8. Promise (Microtask)'));`,
            explanation: 'Understanding when different async operations execute'
          }
        ]
      },
      {
        type: 'realworld',
        title: 'Real-World Examples',
        examples: [
          {
            title: 'Simple HTTP Server',
            code: `const http = require('http');

const server = http.createServer((req, res) => {
  console.log(\`\${req.method} \${req.url}\`);
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello from Node.js!</h1>');
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// WHY Node.js is great for this:
// - Event-driven: handles multiple requests concurrently
// - Non-blocking: doesn't wait for each request to finish
// - Single thread: but can handle thousands of connections`,
            explanation: 'Node.js efficiently handles concurrent connections'
          },
          {
            title: 'Reading Files Async vs Sync',
            code: `const fs = require('fs');

// ❌ BLOCKING (Synchronous) - Bad Practice
console.log('Start reading...');
const data = fs.readFileSync('large-file.txt', 'utf8');
console.log('File read complete');
// Server is BLOCKED while reading file

// ✅ NON-BLOCKING (Asynchronous) - Good Practice
console.log('Start reading...');
fs.readFile('large-file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('File read complete');
});
console.log('Continuing other work...');
// Server continues serving other requests

// ✅ Using Promises (Modern)
const fsPromises = require('fs').promises;

async function readLargeFile() {
  try {
    console.log('Start reading...');
    const data = await fsPromises.readFile('large-file.txt', 'utf8');
    console.log('File read complete');
    return data;
  } catch (err) {
    console.error('Error:', err);
  }
}`,
            explanation: 'Non-blocking I/O allows handling multiple operations simultaneously'
          }
        ]
      },
      {
        type: 'pitfalls',
        title: 'Common Pitfalls',
        pitfalls: [
          {
            title: 'Blocking the Event Loop',
            wrong: `// ❌ CPU-intensive task blocks everything
const server = require('http').createServer((req, res) => {
  // This blocks ALL requests!
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i;
  }
  res.end(result.toString());
});`,
            reason: 'Heavy computation blocks event loop, preventing other requests',
            correct: `// ✅ Use Worker Threads for CPU-intensive tasks
const { Worker } = require('worker_threads');

const server = require('http').createServer((req, res) => {
  const worker = new Worker('./heavy-calc.js');
  
  worker.on('message', (result) => {
    res.end(result.toString());
  });
  
  worker.on('error', (err) => {
    res.statusCode = 500;
    res.end('Error');
  });
});`,
            solution: 'Offload CPU-intensive work to worker threads'
          },
          {
            title: 'Not Handling Errors',
            wrong: `// ❌ Unhandled promise rejection crashes app
async function fetchData() {
  const data = await fetch('https://api.ex.com/data');
  return data.json();
}`,
            reason: 'Unhandled errors can crash Node.js process',
            correct: `// ✅ Always handle errors
async function fetchData() {
  try {
    const data = await fetch('https://api.example.com/data');
    return await data.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // or handle appropriately
  }
}

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // Log to error tracking service
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1); // Graceful shutdown
});`,
            solution: 'Always use try-catch and global error handlers'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain Node.js architecture (V8, libuv, event loop)',
          'Discuss single-threaded nature and how it handles concurrency',
          'Know event loop phases and execution order',
          'Explain difference between setImmediate vs setTimeout',
          'Discuss process.nextTick() vs Promises (microtasks)',
          'Know when Node.js is good/bad choice (I/O heavy vs CPU heavy)',
          'Explain blocking vs non-blocking operations',
          'Discuss cluster module for utilizing multiple cores',
          'Know npm, package.json, node_modules structure',
          'Understand CommonJS vs ES6 modules'
        ]
      }
    ]
  },

  streams: {
    id: 58,
    category: 'node',
    difficulty: 'advanced',
    question: 'What are Streams in Node.js and their types?',
    title: 'Node.js Streams',
    subtitle: 'Efficient data handling with streams',
    sections: [
      {
        type: 'definition',
        title: 'What are Streams?',
        content: {
          english: 'Streams are objects that let you read data from a source or write data to a destination in a continuous fashion, chunk by chunk. They are perfect for handling large amounts of data efficiently without loading it all into memory.',
          hinglish: 'Streams objects hain jo data ko continuously chunk by chunk read/write karne dete hain. Ye large data ko efficiently handle karte hain bina pura memory mein load kiye.',
          keyPoints: [
            'Process data piece by piece (chunks)',
            'Memory efficient for large files',
            'Four types: Readable, Writable, Duplex, Transform',
            'Event-driven (data, end, error events)',
            'Can be piped together',
            'Built-in backpressure handling'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Stream Types',
        examples: [
          {
            title: '1. Readable Streams',
            code: `const fs = require('fs');

// Create readable stream
const readableStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 16 // 16 bytes per chunk
});

// Listen to events
readableStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length, 'bytes');
});

readableStream.on('end', () => {
  console.log('No more data');
});

readableStream.on('error', (err) => {
  console.error('Error:', err);
});

// WHY useful?
// - Read 1GB file without consuming 1GB RAM
// - Process data as it arrives
// - Can pause/resume reading`,
            explanation: 'Read data chunk by chunk'
          },
          {
            title: '2. Writable Streams',
            code: `const fs = require('fs');

const writableStream = fs.createWriteStream('output.txt');

// Write data
writableStream.write('First line\\n');
writableStream.write('Second line\\n');

// Signal end of writing
writableStream.end('Final line\\n');

writableStream.on('finish', () => {
  console.log('All data written');
});

writableStream.on('error', (err) => {
  console.error('Write error:', err);
});`,
            explanation: 'Write data chunk by chunk'
          },
          {
            title: '3. Pipe - Connect Streams',
            code: `const fs = require('fs');

// Copy file efficiently
const readStream = fs.createReadStream('source.txt');
const writeStream = fs.createWriteStream('destination.txt');

readStream.pipe(writeStream);

// WHY pipe is powerful:
// - Automatic backpressure handling
// - Memory efficient
// - Simple syntax

// Pipe with error handling
readStream
  .on('error', err => console.error('Read error:', err))
  .pipe(writeStream)
  .on('error', err => console.error('Write error:', err))
  .on('finish', () => console.log('Copy complete!'));`,
            explanation: 'Pipe connects readable to writable stream'
          },
          {
            title: '4. Transform Streams',
            code: `const { Transform } = require('stream');

// Create custom transform stream
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    // Transform the chunk
    const upperChunk = chunk.toString().toUpperCase();
    this.push(upperChunk);
    callback();
  }
});

// Use in pipe chain
readStream
  .pipe(upperCaseTransform)
  .pipe(writeStream);

// Real example: Compress file
const zlib = require('zlib');
const gzip = zlib.createGzip();

fs.createReadStream('input.txt')
  .pipe(gzip)
  .pipe(fs.createWriteStream('input.txt.gz'));`,
            explanation: 'Transform data while passing through'
          }
        ]
      },
      {
        type: 'realworld',
        title: 'Real-World Use Cases',
        examples: [
          {
            title: 'Video Streaming Server',
            code: `const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/video') {
    const videoPath = 'movie.mp4';
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      // Parse range header
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;

      // Create stream for range
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': \`bytes \${start}-\${end}/\${fileSize}\`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  }
});

server.listen(3000);
// Streams large video without loading into memory!`,
            explanation: 'Efficiently stream large files to clients'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain four stream types with examples',
          'Discuss backpressure and how Node.js handles it',
          'Know stream events (data, end, error, finish)',
          'Explain pipe() method and chaining',
          'Discuss when to use streams vs loading entire file',
          'Know difference between readable.read() and data event',
          'Explain Transform streams for data processing',
          'Discuss object mode vs buffer mode streams'
        ]
      }
    ]
  }
};
