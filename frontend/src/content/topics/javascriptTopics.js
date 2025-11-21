// JavaScript Topics - Comprehensive 65 Interview Questions
// Organized by category with deep-dive explanations

export const javascriptTopics = {
  // BASICS CATEGORY - Question 5
  equalityOperators: {
    id: 100,
    category: 'javascript',
    difficulty: 'basic',
    question: '"===" vs "==" in JavaScript - What is the difference?',
    title: 'Equality Operators: === vs ==',
    subtitle: 'Understanding strict vs loose equality',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: '== (loose equality) compares values after type coercion, while === (strict equality) compares both value AND type without coercion. Always prefer === to avoid unexpected bugs.',
          hinglish: '== loose equality hai jo type coercion ke baad values compare karta hai. === strict equality hai jo value AUR type dono check karta hai bina conversion ke. Hamesha === use karo bugs avoid karne ke liye.',
          keyPoints: [
            '== performs type coercion before comparison',
            '=== checks both type and value (strict)',
            '=== is faster (no coercion overhead)',
            '=== prevents unexpected type conversions',
            'null == undefined is true, but null === undefined is false',
            'Always use === unless you specifically need coercion'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Basic Comparison Examples',
        examples: [
          {
            title: 'Number vs String',
            code: `// == with type coercion
console.log(5 == '5');    // true (string '5' converted to number)
console.log(5 === '5');   // false (different types)

// WHY this happens:
// '5' (string) → 5 (number conversion) → 5 == 5 → true

// WHAT JavaScript does internally:
// 1. Check if types are same - NO
// 2. Try to convert string to number
// 3. Compare numbers`,
            explanation: '== converts string to number before comparing'
          },
          {
            title: 'Boolean Comparisons',
            code: `console.log(true == 1);      // true
console.log(true === 1);     // false

console.log(false == 0);     // true
console.log(false === 0);    // false

console.log('' == false);    // true (both falsy)
console.log('' === false);   // false (different types)

// HOW coercion works:
// true → 1 (ToNumber conversion)
// false → 0 (ToNumber conversion)
// '' → 0 (empty string to number)`,
            explanation: 'Booleans convert to numbers: true→1, false→0'
          },
          {
            title: 'null and undefined',
            code: `console.log(null == undefined);   // true (special case)
console.log(null === undefined);  // false (different types)

console.log(null == 0);           // false (another special case)
console.log(null === 0);          // false

console.log(undefined == 0);      // false
console.log(undefined === 0);     // false

// SPECIAL RULES:
// null == undefined → true (only for these two)
// null and undefined DON'T convert to numbers in ==
// This is JavaScript's ONLY exception to coercion rules`,
            explanation: 'null and undefined are only equal to each other with =='
          }
        ]
      },
      {
        type: 'examples',
        title: 'Tricky Cases & Deep Dive',
        examples: [
          {
            title: 'Array Comparisons',
            code: `console.log([] == false);     // true (!!)
console.log([] === false);    // false

console.log([1] == 1);        // true
console.log([1] === 1);       // false

console.log([1,2] == '1,2');  // true
console.log([1,2] === '1,2'); // false

// INTERNAL PROCESS for [] == false:
// Step 1: [] (object) → ToPrimitive([]) → "" (empty string)
// Step 2: "" == false
// Step 3: "" (string) → 0, false → 0
// Step 4: 0 == 0 → true

// WHY dangerous:
if ([] == false) { 
  console.log('This runs!'); // Unexpected!
}
if ([]) { 
  console.log('This also runs!'); // Arrays are truthy in boolean context
}`,
            explanation: 'Arrays convert to strings, then to numbers in =='
          },
          {
            title: 'Object Comparisons',
            code: `const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = obj1;

console.log(obj1 == obj2);    // false (different references)
console.log(obj1 === obj2);   // false (different references)
console.log(obj1 === obj3);   // true (same reference)

// Objects compare by REFERENCE, not value
// == and === behave the SAME for objects

// DEEP EQUALITY requires custom function:
function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
console.log(deepEqual(obj1, obj2)); // true`,
            explanation: 'Objects compare by reference in both == and ==='
          },
          {
            title: 'Type Coercion Algorithm',
            code: `// COMPLETE ALGORITHM for == comparison:
/*
1. If types are same → compare values (like ===)
2. If null == undefined → true
3. If number == string → convert string to number
4. If boolean == anything → convert boolean to number
5. If object == primitive → convert object to primitive (ToPrimitive)
6. Otherwise → false
*/

// Examples showing each rule:

// Rule 1: Same types
console.log(5 == 5);              // true

// Rule 2: null == undefined
console.log(null == undefined);   // true

// Rule 3: number == string
console.log(5 == '5');            // true (string → number)

// Rule 4: boolean == anything
console.log(true == 1);           // true (boolean → number)
console.log(true == '1');         // true (both → numbers)

// Rule 5: object == primitive
console.log([1] == 1);            // true ([1] → "1" → 1)
console.log({} == '[object Object]'); // true

// Rule 6: Everything else
console.log(null == 0);           // false`,
            explanation: 'Complete internal algorithm JavaScript uses'
          }
        ]
      },
      {
        type: 'pitfalls',
        title: 'Common Pitfalls',
        pitfalls: [
          {
            title: 'Unexpected Coercions',
            wrong: `// ❌ Dangerous comparisons
if (user.age == '18') {  // What if age is 18 or "18"?
  console.log('Adult');
}

if (items.length == 0) {  // What if length is "0"?
  console.log('Empty');
}

if (isActive == 1) {  // What if isActive is true?
  console.log('Active');
}`,
            reason: 'Type coercion can cause unexpected bugs',
            correct: `// ✅ Safe strict comparisons
if (user.age === 18) {  // Only number 18
  console.log('Adult');
}

if (items.length === 0) {  // Only number 0
  console.log('Empty');
}

if (isActive === true) {  // Only boolean true
  console.log('Active');
}`,
            solution: 'Always use === unless you specifically need coercion'
          },
          {
            title: 'Array and Object Checks',
            wrong: `// ❌ Wrong array check
if (arr == []) {  // Always false!
  console.log('Empty');
}

// ❌ Wrong object check
if (obj == {}) {  // Always false!
  console.log('Empty');
}`,
            reason: 'Objects and arrays compare by reference',
            correct: `// ✅ Correct array check
if (Array.isArray(arr) && arr.length === 0) {
  console.log('Empty array');
}

// ✅ Correct object check
if (typeof obj === 'object' && Object.keys(obj).length === 0) {
  console.log('Empty object');
}`,
            solution: 'Check type and length/keys for arrays/objects'
          }
        ]
      },
      {
        type: 'realworld',
        title: 'Real-World Best Practices',
        examples: [
          {
            title: 'API Response Validation',
            code: `// ❌ Unsafe
function processUser(user) {
  if (user.id == 123) {  // "123" would also match
    // Process admin
  }
}

// ✅ Safe
function processUser(user) {
  if (typeof user.id === 'number' && user.id === 123) {
    // Only number 123 matches
  }
}`,
            explanation: 'Strict checks prevent type confusion in API data'
          },
          {
            title: 'Form Input Validation',
            code: `// ❌ Wrong
const input = document.getElementById('age').value;
if (input == 18) {  // input is always string!
  console.log('Valid');
}

// ✅ Correct
const input = document.getElementById('age').value;
const age = parseInt(input, 10);
if (!isNaN(age) && age === 18) {
  console.log('Valid');
}`,
            explanation: 'DOM inputs are always strings - convert explicitly'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain type coercion process for ==',
          'Know special cases: null == undefined',
          'Understand ToPrimitive conversion for objects',
          'Explain why === is preferred',
          'Discuss performance: === is faster (no coercion)',
          'Know the complete comparison algorithm',
          'Give example of == causing bugs',
          'Explain Object.is() as alternative for special cases (NaN, -0)',
          'Discuss when == might be useful (null/undefined checks)',
          'Know falsy vs truly values vs equality'
        ]
      }
    ]
  },

  // BASICS - Question 6
  firstClassFunction: {
    id: 101,
    category: 'javascript',
    difficulty: 'basic',
    question: 'What is a First Class Function in JavaScript?',
    title: 'First Class Functions',
    subtitle: 'Functions as first-class citizens',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'In JavaScript, functions are first-class citizens, meaning they can be treated like any other value: assigned to variables, passed as arguments, returned from other functions, and stored in data structures.',
          hinglish: 'JavaScript mein functions first-class citizens hain. Matlab functions ko variables ki tarah treat kar sakte hain - variables mein store karo, arguments ki tarah pass karo, functions se return karo.',
          keyPoints: [
            'Functions can be assigned to variables',
            'Functions can be passed as arguments',
            'Functions can be returned from functions',
            'Functions can be stored in arrays/objects',
            'Functions have properties and methods',
            'Enables functional programming patterns'
          ]
        }
      },
      {
        type: 'examples',
        title: 'First-Class Function Features',
        examples: [
          {
            title: '1. Assign to Variables',
            code: `// Function expression
const greet = function(name) {
  return \`Hello, \${name}!\`;
};

console.log(greet('John')); // "Hello, John!"

// Arrow function
const add = (a, b) => a + b;
console.log(add(5, 3)); // 8

// WHY this works:
// Functions in JS are objects
// Can be stored like any other value`,
            explanation: 'Functions can be stored in variables like any value'
          },
          {
            title: '2. Pass as Arguments (Callbacks)',
            code: `// Function as argument
function executeOperation(a, b, operation) {
  return operation(a, b);
}

// Pass functions
const result1 = executeOperation(5, 3, (a, b) => a + b);
console.log(result1); // 8

const result2 = executeOperation(5, 3, (a, b) => a * b);
console.log(result2); // 15

// Real-world example: Array methods
const numbers = [1, 2, 3, 4, 5];

// Pass function to map
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Pass function to filter
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// HOW it works internally:
// Array.map receives function
// Calls it for each element
// Returns new array with results`,
            explanation: 'Functions can be passed to other functions'
          },
          {
            title: '3. Return from Functions (Higher-Order)',
            code: `// Function returning function
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Real-world: Function factory
function createGreeting(greeting) {
  return function(name) {
    return \`\${greeting}, \${name}!\`;
  };
}

const sayHello = createGreeting('Hello');
const sayHi = createGreeting('Hi');

console.log(sayHello('John')); // "Hello, John!"
console.log(sayHi('Jane'));    // "Hi, Jane!"

// WHY useful:
// Create specialized functions
// Maintain configuration/state
// Functional composition`,
            explanation: 'Functions can return other functions'
          },
          {
            title: '4. Store in Data Structures',
            code: `// Functions in array
const operations = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => a / b
];

console.log(operations[0](10, 5)); // 15 (add)
console.log(operations[2](10, 5)); // 50 (multiply)

// Functions in object
const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};

console.log(calculator.add(10, 5));      // 15
console.log(calculator.multiply(10, 5)); // 50

// Real-world: Strategy pattern
const validators = {
  email: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
  phone: (value) => /^\\d{10}$/.test(value),
  url: (value) => /^https?:\\/\\//.test(value)
};

console.log(validators.email('test@example.com')); // true`,
            explanation: 'Functions can be stored in arrays and objects'
          }
        ]
      },
      {
        type: 'realworld',
        title: 'Real-World Use Cases',
        examples: [
          {
            title: 'Event Handlers',
            code: `// Functions as event handlers
button.addEventListener('click', function() {
  console.log('Button clicked!');
});

// Or with arrow function
button.addEventListener('click', () => {
  console.log('Clicked!');
});

// Function stored and reused
const handleClick = (event) => {
  console.log('Click coordinates:', event.clientX, event.clientY);
};

button1.addEventListener('click', handleClick);
button2.addEventListener('click', handleClick);

// WHY first-class functions enable this:
// Can pass functions directly
// Can store and reuse handlers
// Can remove listeners later`,
            explanation: 'Event-driven programming relies on first-class functions'
          },
          {
            title: 'Functional Composition',
            code: `// Composing functions
const compose = (...fns) => x => 
  fns.reduceRight((acc, fn) => fn(acc), x);

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const compute = compose(square, double, addOne);
console.log(compute(3)); // ((3 + 1) * 2)² = 64

// Practical example: Data transformation
const users = [
  { name: 'john', age: 25 },
  { name: 'jane', age: 30 }
];

const pipeline = compose(
  data => data.map(u => u.name),
  data => data.map(n => n.toUpperCase())
);

console.log(pipeline(users)); // ['JOHN', 'JANE']`,
            explanation: 'Function composition for complex transformations'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain what first-class means with examples',
          'Discuss all 4 properties: assign, pass, return, store',
          'Give real-world examples (callbacks, event handlers)',
          'Explain how this enables functional programming',
          'Discuss difference from languages without first-class functions',
          'Know higher-order functions concept',
          'Explain closures connection',
          'Discuss benefits: flexibility, composition, reusability'
        ]
      }
    ]
  },

  // BASICS - Question 10
  letVsVar: {
    id: 102,
    category: 'javascript',
    difficulty: 'basic',
    question: 'What is the difference between let and var?',
    title: 'let vs var',
    subtitle: 'Understanding variable declarations and scope',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'var is function-scoped and can be redeclared, while let is block-scoped, cannot be redeclared in the same scope, and exists in Temporal Dead Zone before declaration.',
          hinglish: 'var function-scoped hai aur redeclare ho sakta hai. let block-scoped hai, same scope mein redeclare nahi hota, aur declaration se pehle TDZ mein hota hai.',
          keyPoints: [
            'var - function scoped, let - block scoped',
            'var - can be redeclared, let - cannot',
            'var - hoisted and initialized with undefined',
            'let - hoisted but in Temporal Dead Zone',
            'var - creates window property, let - doesn\'t',
            'Always prefer let/const over var'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Scoping Differences',
        examples: [
          {
            title: 'Block Scope vs Function Scope',
            code: `// var - function scoped
function varExample() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 (accessible outside if block)
}

// let - block scoped
function letExample() {
  if (true) {
    let y = 10;
  }
  console.log(y); // ReferenceError: y is not defined
}

// WHY this happens:
// var ignores block scope (if, for, while)
// let respects block scope {}

// Loop example
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 (var is function-scoped, same i)

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}
// Output: 0, 1, 2 (let is block-scoped, new j each iteration)`,
            explanation: 'var ignores blocks, let respects block scope'
          },
          {
            title: 'Redeclaration',
            code: `// var - allows redeclaration
var name = 'John';
var name = 'Jane'; // No error
console.log(name); // 'Jane'

// let - prevents redeclaration
let age = 25;
let age = 30; // SyntaxError: Identifier 'age' has already been declared

// WHY let prevents bugs:
let count = 0;
// ... 100 lines of code
let count = 10; // Error! Catches accidental redeclaration`,
            explanation: 'let prevents accidental variable redeclaration'
          },
          {
            title: 'Hoisting Behavior',
            code: `// var - hoisted and initialized
console.log(x); // undefined (not error!)
var x = 5;
console.log(x); // 5

// Internally:
// var x; // hoisted, initialized with undefined
// console.log(x); // undefined
// x = 5;

// let - hoisted but in TDZ
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 5;
console.log(y); // 5

// Internally:
// let y; // hoisted but NOT initialized (TDZ)
// console.log(y); // Error - in TDZ
// y = 5; // TDZ ends here`,
            explanation: 'var initializes to undefined, let has Temporal Dead Zone'
          }
        ]
      },
      {
        type: 'pitfalls',
        title: 'Common Pitfalls',
        pitfalls: [
          {
            title: 'Loop Closures',
            wrong: `// ❌ Classic var problem
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 3, 3, 3
  }, 100);
}
// All closures reference same i`,
            reason: 'var is function-scoped, all iterations share same variable',
            correct: `// ✅ Solution 1: Use let
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 0, 1, 2
  }, 100);
}
// let creates new i for each iteration

// ✅ Solution 2: IIFE with var
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // 0, 1, 2
    }, 100);
  })(i);
}`,
            solution: 'Use let in loops or IIFE with var'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain scope difference clearly (function vs block)',
          'Demonstrate redeclaration behavior',
          'Discuss Temporal Dead Zone for let',
          'Show loop closure problem with var',
          'Explain hoisting for both',
          'Mention const as third option',
          'Discuss when var might still be used (legacy code)',
          'Know that let doesn\'t create window properties'
        ]
      }
    ]
  },

  // ADVANCED - Question 17
  promises: {
    id: 103,
    category: 'javascript',
    difficulty: 'advanced',
    question: 'What are Promises in JavaScript?',
    title: 'JavaScript Promises',
    subtitle: 'Asynchronous programming with Promises',
    sections: [
      {
        type: 'definition',
        title: 'What are Promises?',
        content: {
          english: 'A Promise is an object representing the eventual completion or failure of an asynchronous operation. It provides a cleaner alternative to callbacks with three states: pending, fulfilled, or rejected.',
          hinglish: 'Promise ek object hai jo async operation ke future result ko represent karta hai. Teen states hain: pending (wait kar raha), fulfilled (success), rejected (error).',
          keyPoints: [
            'Represents async operation result',
            'Three states: pending, fulfilled, rejected',
            'Solves callback hell problem',
            'Chainable with .then() and .catch()',
            'Immutable once settled',
            'Can be awaited with async/await'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Promise Basics',
        examples: [
          {
            title: 'Creating a Promise',
            code: `// Basic Promise creation
const promise = new Promise((resolve, reject) => {
  // Async operation
  const success = true;
  
  if (success) {
    resolve('Operation successful!'); // fulfilled
  } else {
    reject('Operation failed!'); // rejected
  }
});

// Consuming Promise
promise
  .then(result => console.log(result)) // Success handler
  .catch(error => console.error(error)); // Error handler

// INTERNAL STATES:
/*
1. pending → initial state
2. fulfilled → resolve() called → .then() executes
3. rejected → reject() called → .catch() executes
*/`,
            explanation: 'Promise wraps async operation with resolve/reject'
          },
          {
            title: 'Real Async Example',
            code: `// Simulating API call
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: 'John', email: 'john@example.com' });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 1000);
  });
}

// Using the promise
fetchUser(1)
  .then(user => {
    console.log('User:', user);
    return user.id; // Return value becomes next promise
  })
  .then(id => {
    console.log('User ID:', id);
  })
  .catch(error => {
    console.error('Error:', error.message);
  })
  .finally(() => {
    console.log('Cleanup code');
  });`,
            explanation: 'Promises handle async operations elegantly'
          }
        ]
      },
      {
        type: 'examples',
        title: 'Promise Chaining',
        examples: [
          {
            title: 'Sequential Operations',
            code: `// Promise chain - operations run in sequence
fetch('https://api.example.com/user/1')
  .then(response => response.json()) // Parse JSON
  .then(user => {
    console.log('User:', user.name);
    return fetch(\`https://api.example.com/posts?userId=\${user.id}\`);
  })
  .then(response => response.json()) // Parse posts
  .then(posts => {
    console.log('Posts:', posts.length);
  })
  .catch(error => {
    console.error('Error at any step:', error);
  });

// WHY chaining is powerful:
// - Each .then() returns new promise
// - Values automatically wrapped in Promise
// - Single .catch() handles all errors
// - Clean, readable async flow`,
            explanation: 'Chain promises for sequential async operations'
          },
          {
            title: 'Error Handling in Chain',
            code: `// Error propagation
fetchUser(1)
  .then(user => {
    if (!user.email) {
      throw new Error('Email missing'); // Goes to catch
    }
    return user;
  })
  .then(user => {
    console.log('Valid user:', user);
  })
  .catch(error => {
    console.error('Caught:', error.message);
    // Can return value to continue chain
    return { id: 0, name: 'Guest' };
  })
  .then(user => {
    console.log('Recovered:', user); // Continues after catch
  });

// Error recovery:
// .catch() can return value
// Chain continues after catch
// Like try-catch for promises`,
            explanation: 'Errors bubble up to nearest catch handler'
          }
        ]
      },
      {
        type: 'examples',
        title: 'Promise Static Methods',
        examples: [
          {
            title: 'Promise.all()',
            code: `// Run multiple promises in parallel
const promise1 = fetch('/api/users');
const promise2 = fetch('/api/posts');
const promise3 = fetch('/api/comments');

Promise.all([promise1, promise2, promise3])
  .then(([users, posts, comments]) => {
    console.log('All completed:', users, posts, comments);
  })
  .catch(error => {
    console.error('Any failed:', error);
  });

// BEHAVIOR:
// - Waits for ALL to complete
// - Returns array of results
// - Rejects if ANY promise rejects
// - Results in same order as input

// Use case: Load page data in parallel`,
            explanation: 'Promise.all runs promises concurrently'
          },
          {
            title: 'Promise.race()',
            code: `// First promise to settle wins
const timeout = new Promise((_, reject) => 
  setTimeout(() => reject(new Error('Timeout')), 3000)
);

const apiCall = fetch('/api/data');

Promise.race([apiCall, timeout])
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Failed or timeout:', error));

// BEHAVIOR:
// - Returns first settled promise
// - Useful for timeouts
// - Race condition by design`,
            explanation: 'Promise.race returns first completed promise'
          },
          {
            title: 'Promise.allSettled()',
            code: `// Wait for all, regardless of success/failure
const promises = [
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/invalid') // This will fail
];

Promise.allSettled(promises)
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(\`Promise \${index} succeeded:\`, result.value);
      } else {
        console.log(\`Promise \${index} failed:\`, result.reason);
      }
    });
  });

// BEHAVIOR:
// - Waits for ALL to settle (fulfilled or rejected)
// - Never rejects
// - Returns array of {status, value/reason} objects
// - Useful when you need all results regardless of failures`,
            explanation: 'Promise.allSettled waits for all regardless of outcome'
          }
        ]
      },
      {
        type: 'examples',
        title: 'Async/Await with Promises',
        examples: [
          {
            title: 'Modern Syntax',
            code: `// Same logic with async/await
async function loadUserData() {
  try {
    const userResponse = await fetch('/api/user/1');
    const user = await userResponse.json();
    
    const postsResponse = await fetch(\`/api/posts?userId=\${user.id}\`);
    const posts = await postsResponse.json();
    
    console.log(user, posts);
    return { user, posts };
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw if needed
  }
}

// Call async function
loadUserData()
  .then(data => console.log('Loaded:', data))
  .catch(error => console.error('Failed:', error));

// WHY async/await:
// - Looks synchronous
// - Easier error handling with try-catch
// - Better debugging
// - Still uses promises under the hood`,
            explanation: 'Async/await is syntactic sugar over promises'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain three promise states clearly',
          'Demonstrate promise creation and consumption',
          'Discuss promise chaining and error handling',
          'Know Promise.all, race, allSettled, any',
          'Explain how promises solve callback hell',
          'Discuss async/await relationship with promises',
          'Know microtask queue for promise resolution',
          'Explain promise immutability once settled',
          'Discuss error propagation in chains',
          'Show real-world examples (API calls)'
        ]
      }
    ]
  },

  // ARRAY - Question 2
  callApplyBind: {
    id: 104,
    category: 'javascript',
    difficulty: 'intermediate',
    question: 'What are call, apply and bind in JavaScript?',
    title: 'call, apply, and bind',
    subtitle: 'Function context manipulation methods',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'call, apply, and bind are methods to explicitly set the "this" context of a function. call and apply invoke the function immediately, while bind returns a new function with bound context.',
          hinglish: 'call, apply, aur bind methods hain jo function ke "this" context ko set karte hain. call aur apply function ko turant call karte hain, bind ek naya function return karta hai.',
          keyPoints: [
            'All three set "this" context explicitly',
            'call - invokes immediately, args individually',
            'apply - invokes immediately, args as array',
            'bind - returns new function, doesn\'t invoke',
            'Used for function borrowing',
            'Useful for fixing this in callbacks'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Understanding "this" Problem',
        examples: [
          {
            title: 'The "this" Problem',
            code: `const person = {
  name: 'John',
  greet: function() {
    console.log('Hello, ' + this.name);
  }
};

person.greet(); // "Hello, John" ✅

const greetFunc = person.greet;
greetFunc(); // "Hello, undefined" ❌

// WHY undefined?
// "this" depends on HOW function is called
// person.greet() → this = person
// greetFunc() → this = global/undefined

// SOLUTION: Use call, apply, or bind to fix "this"`,
            explanation: 'this context is lost when method is extracted'
          }
        ]
      },
      {
        type: 'examples',
        title: 'call() Method',
        examples: [
          {
            title: 'Basic call()',
            code: `function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const person1 = { name: 'John' };
const person2 = { name: 'Jane' };

// Syntax: func.call(thisArg, arg1, arg2, ...)
greet.call(person1, 'Hello', '!'); // "Hello, John!"
greet.call(person2, 'Hi', '.'); // "Hi, Jane."

// WHAT HAPPENS:
// 1. Sets "this" to person1
// 2. Calls greet immediately
// 3. Passes arguments individually`,
            explanation: 'call sets this and invokes function with individual arguments'
          },
          {
            title: 'Function Borrowing with call',
            code: `const person = {
  firstName: 'John',
  lastName: 'Doe',
  getFullName: function() {
    return this.firstName + ' ' + this.lastName;
  }
};

const anotherPerson = {
  firstName: 'Jane',
  lastName: 'Smith'
};

// Borrow method
const fullName = person.getFullName.call(anotherPerson);
console.log(fullName); // "Jane Smith"

// Real-world: Array-like to Array
function example() {
  // arguments is array-like, not real array
  const args = Array.prototype.slice.call(arguments);
  console.log(args); // Real array
}
example(1, 2, 3); // [1, 2, 3]`,
            explanation: 'Borrow methods from other objects'
          }
        ]
      },
      {
        type: 'examples',
        title: 'apply() Method',
        examples: [
          {
            title: 'Basic apply()',
            code: `function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'John' };

// Syntax: func.apply(thisArg, [argsArray])
greet.apply(person, ['Hello', '!']); // "Hello, John!"

// DIFFERENCE from call:
// apply takes array of arguments
// call takes individual arguments

// When to use apply:
const numbers = [1, 2, 3, 4, 5];
const max = Math.max.apply(null, numbers);
console.log(max); // 5

// Modern alternative:
const max2 = Math.max(...numbers); // Spread operator`,
            explanation: 'apply is like call but takes array of arguments'
          }
        ]
      },
      {
        type: 'examples',
        title: 'bind() Method',
        examples: [
          {
            title: 'Basic bind()',
            code: `function greet(greeting) {
  console.log(greeting + ', ' + this.name);
}

const person = { name: 'John' };

// Syntax: func.bind(thisArg, arg1, arg2, ...)
const greetJohn = greet.bind(person);

// Doesn't invoke immediately - returns new function
greetJohn('Hello'); // "Hello, John"
greetJohn('Hi'); // "Hi, John"

// Original function unchanged
greet('Hello'); // "Hello, undefined"`,
            explanation: 'bind creates new function with fixed this'
          },
          {
            title: 'Partial Application with bind',
            code: `function multiply(a, b) {
  return a * b;
}

// Pre-fill first argument
const double = multiply.bind(null, 2);
const triple = multiply.bind(null, 3);

console.log(double(5)); // 10 (2 * 5)
console.log(triple(5)); // 15 (3 * 5)

// Real-world: Event handlers
class Button {
  constructor(value) {
    this.value = value;
  }
  
  handleClick() {
    console.log('Button value:', this.value);
  }
}

const btn = new Button('Submit');
const button = document.querySelector('button');

// ❌ Without bind - this is lost
button.addEventListener('click', btn.handleClick); // undefined

// ✅ With bind - this preserved
button.addEventListener('click', btn.handleClick.bind(btn)); // "Submit"`,
            explanation: 'bind is perfect for callbacks and event handlers'
          }
        ]
      },
      {
        type: 'realworld',
        title: 'Comparison Table',
        examples: [
          {
            title: 'call vs apply vs bind',
            code: `const person = { name: 'John' };

function introduce(greeting, age) {
  return \`\${greeting}, I'm \${this.name}, \${age} years old\`;
}

// call - individual arguments, invokes immediately
const result1 = introduce.call(person, 'Hello', 30);
console.log(result1); // "Hello, I'm John, 30 years old"

// apply - array of arguments, invokes immediately
const result2 = introduce.apply(person, ['Hi', 30]);
console.log(result2); // "Hi, I'm John, 30 years old"

// bind - returns function, doesn't invoke
const boundFunc = introduce.bind(person, 'Hey');
const result3 = boundFunc(30);
console.log(result3); // "Hey, I'm John, 30 years old"

/*
COMPARISON:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Method  | Arguments     | Invokes  | Returns
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
call    | Individual    | Yes      | Result
apply   | Array         | Yes      | Result
bind    | Individual    | No       | Function
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/`,
            explanation: 'Choose based on argument format and timing needs'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain "this" context problem clearly',
          'Demonstrate all three methods with examples',
          'Discuss call vs apply difference (individual vs array args)',
          'Explain bind returns new function without invoking',
          'Show function borrowing use case',
          'Discuss partial application with bind',
          'Know when to use each method',
          'Explain arrow functions don\'t have own this (can\'t bind)',
          'Show real-world event handler example',
          'Discuss performance: bind creates new function each time'
        ]
      }
    ]
  },

  // ADVANCED - Question 8: Currying
  currying: {
    id: 105,
    category: 'javascript',
    difficulty: 'advanced',
    question: 'What is Currying in JavaScript?',
    title: 'Currying',
    subtitle: 'Function transformation for partial application',
    sections: [
      {
        type: 'definition',
        title: 'What is Currying?',
        content: {
          english: 'Currying transforms a function with multiple arguments into a sequence of functions each taking a single argument. f(a,b,c) becomes f(a)(b)(c).',
          hinglish: 'Currying ek function jo multiple arguments leta hai use chhote functions mein tod deta hai. Har function ek argument leta hai.',
          keyPoints: [
            'Transforms f(a, b, c) → f(a)(b)(c)',
            'Each function returns next function',
            'Enables partial application',
            'Useful for function composition',
            'Creates specialized functions from generic ones'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Basic Currying',
        examples: [
          {
            title: 'Simple Example',
            code: `// Normal function
const add = (a, b, c) => a + b + c;
console.log(add(1, 2, 3)); // 6

// Curried version
const curriedAdd = a => b => c => a + b + c;
console.log(curriedAdd(1)(2)(3)); // 6

// Partial application
const add1 = curriedAdd(1);
const add1And2 = add1(2);
console.log(add1And2(3)); // 6`,
            explanation: 'Currying enables step-by-step argument application'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain transformation pattern',
          'Show partial application benefits',
          'Demonstrate real use cases',
          'Know how to create generic curry function'
        ]
      }
    ]
  },

  // FUNCTIONS - Question 20: Callbacks
  callbacks: {
    id: 109,
    category: 'javascript',
    difficulty: 'basic',
    question: 'What are Callbacks in JavaScript?',
    title: 'Callback Functions',
    subtitle: 'Understanding asynchronous callbacks',
    sections: [
      {
        type: 'definition',
        title: 'What are Callbacks?',
        content: {
          english: 'A callback is a function passed as an argument to another function and executed after a certain event or task completes. They enable asynchronous programming.',
          hinglish: 'Callback ek function hai jo dusre function ko argument ki tarah pass kiya jata hai aur kisi event ya task complete hone ke baad execute hota hai.',
          keyPoints: [
            'Function passed as argument to another function',
            'Executed after task completion',
            'Enables asynchronous operations',
            'Common in event handlers and timers',
            'Can lead to callback hell if nested deeply'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Basic Callbacks',
        examples: [
          {
            title: 'Simple Callback',
            code: `// Function that takes callback
function greet(name, callback) {
  console.log('Hello ' + name);
  callback();
}

// Callback function
function sayGoodbye() {
  console.log('Goodbye!');
}

greet('John', sayGoodbye);
// Output:
// Hello John
// Goodbye!

// WHY callbacks:
// Execute code AFTER greet completes`,
            explanation: 'Callback executes after main function'
          },
          {
            title: 'Async Callback',
            code: `// setTimeout with callback
console.log('Start');

setTimeout(function() {
  console.log('Delayed callback');
}, 1000);

console.log('End');

// Output:
// Start
// End
// Delayed callback (after 1 second)

// HOW it works:
// 1. Start prints
// 2. setTimeout registers callback
// 3. End prints  
// 4. After 1s, callback executes`,
            explanation: 'Callbacks handle async timing'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain callback as function argument',
          'Show sync vs async callbacks',
          'Discuss callback hell problem',
          'Know alternatives: Promises, async/await'
        ]
      }
    ]
  },

  // BASICS - Question 29: null vs undefined  
  nullVsUndefined: {
    id: 110,
    category: 'javascript',
    difficulty: 'basic',
    question: 'What is the difference between null and undefined?',
    title: 'null vs undefined',
    subtitle: 'Understanding absence of value',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'undefined means a variable has been declared but not assigned a value. null is an assignment value representing intentional absence of any object value.',
          hinglish: 'undefined ka matlab variable declare hua hai par value assign nahi hui. null ek intentional assignment hai jo represent karta hai ki koi value nahi hai.',
          keyPoints: [
            'undefined - automatic (not assigned)',
            'null - intentional (programmer assigned)',
            'typeof undefined → "undefined"',
            'typeof null → "object" (JavaScript bug)',
            'Both are falsy values',
            'null == undefined → true, null === undefined → false'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Differences Explained',
        examples: [
          {
            title: 'undefined Cases',
            code: `// 1. Variable declared but not initialized
let x;
console.log(x); // undefined

// 2. Function parameter not provided
function test(param) {
  console.log(param); // undefined
}
test();

// 3. Object property doesn't exist
const obj = { a: 1 };
console.log(obj.b); // undefined

// 4. Function with no return
function noReturn() {}
console.log(noReturn()); // undefined

// WHAT: JavaScript automatically assigns undefined`,
            explanation: 'undefined happens automatically'
          },
          {
            title: 'null Cases',
            code: `// Intentional assignment
let user = null; // No user yet

// Clear object reference
let data = { name: 'John' };
data = null; // Explicitly remove

// API returns null
const result = findUser('nonexistent'); // returns null

// WHY use null:
// - Explicitly show "no value"
// - Different from "not yet assigned"
// - Intent is clear to other developers`,
            explanation: 'null is programmer intention'
          },
          {
            title: 'Comparison',
            code: `console.log(null == undefined);  // true (loose equality)
console.log(null === undefined); // false (strict equality)

console.log(typeof null);      // "object" (JavaScript bug!)
console.log(typeof undefined); // "undefined"

// Checking for both
if (value == null) {
  // true for both null AND undefined
}

// Checking specifically
if (value === null) {
  // Only null
}
if (value === undefined) {
  // Only undefined
}`,
            explanation: 'Different types, similar meaning'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain automatic vs intentional',
          'Know typeof null returns "object"',
          'Discuss == vs === behavior',
          'Show when to use each',
          'Mention both are falsy'
        ]
      }
    ]
  },

  // FUNCTIONS - Question 14: IIFE
  iife: {
    id: 111,
    category: 'javascript',
    difficulty: 'intermediate',
    question: 'What is IIFE (Immediately Invoked Function Expression)?',
    title: 'IIFE',
    subtitle: 'Self-executing functions',
    sections: [
      {
        type: 'definition',
        title: 'What is IIFE?',
        content: {
          english: 'IIFE is a function that executes immediately after it\'s defined. It creates a private scope, preventing variable pollution.',
          hinglish: 'IIFE ek function hai jo define hote hi turant execute ho jata hai. Ye private scope banata hai aur variable pollution rokta hai.',
          keyPoints: [
            'Executes immediately upon definition',
            'Creates private scope',
            'Prevents global namespace pollution',
            'Syntax: (function() { })() or (() => {})()',
            'Used in modules and libraries',
            'Variables inside not accessible outside'
          ]
        }
      },
      {
        type: 'examples',
        title: 'IIFE Syntax',
        examples: [
          {
            title: 'Basic IIFE',
            code: `// Regular function
function greet() {
  console.log('Hello');
}
greet(); // Must call

// IIFE - executes immediately
(function() {
  console.log('Hello from IIFE');
})();
// Output: Hello from IIFE

// Arrow IIFE
(() => {
  console.log('Arrow IIFE');
})();

// WHY parentheses:
// (function() {}) - Makes it an expression
// () - Immediately invokes it`,
            explanation: 'IIFE executes without calling'
          },
          {
            title: 'Private Scope',
            code: `// Global variable (bad)
var counter = 0;

// IIFE creates private scope
(function() {
  var privateVar = 'Secret';
  console.log(privateVar); // Works
})();

console.log(privateVar); // Error: not defined

// Real use: Counter with private state
const counter = (function() {
  let count = 0; // Private
  
  return {
    increment: function() { return ++count; },
    decrement: function() { return --count; },
    getValue: function() { return count; }
  };
})();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.count); // undefined (private!)`,
            explanation: 'IIFE protects variables from global scope'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain immediate execution',
          'Discuss private scope creation',
          'Show module pattern use case',
          'Know modern alternative: ES6 modules',
          'Explain parentheses syntax'
        ]
      }
    ]
  },

  // FUNCTIONS - Question 41: setTimeout
  setTimeout: {
    id: 112,
    category: 'javascript',
    difficulty: 'basic',
    question: 'What is setTimeout in JavaScript?',
    title: 'setTimeout',
    subtitle: 'Delayed function execution',
    sections: [
      {
        type: 'definition',
        title: 'What is setTimeout?',
        content: {
          english: 'setTimeout executes a function after a specified delay in milliseconds. It returns a timeout ID that can be used to cancel the timeout.',
          hinglish: 'setTimeout ek function ko specified milliseconds ke baad execute karta hai. Ye timeout ID return karta hai jise cancel karne ke liye use kar sakte hain.',
          keyPoints: [
            'Executes function after delay',
            'Delay in milliseconds',
            'Returns timeout ID',
            'clearTimeout() cancels it',
            'Minimum delay is ~4ms (browser dependent)',
            'Asynchronous execution'
          ]
        }
      },
      {
        type: 'examples',
        title: 'setTimeout Usage',
        examples: [
          {
            title: 'Basic Usage',
            code: `// Syntax: setTimeout(function, delay, ...args)
setTimeout(function() {
  console.log('Executed after 2 seconds');
}, 2000);

// With arguments
setTimeout(function(name, age) {
  console.log(\`\${name} is \${age} years old\`);
}, 1000, 'John', 30);

// Arrow function
setTimeout(() => {
  console.log('Arrow function');
}, 1000);

// WHAT happens:
// Code continues executing
// After delay, callback added to queue
// Event loop picks it up when call stack empty`,
            explanation: 'setTimeout delays execution'
          },
          {
            title: 'Canceling Timeout',
            code: `// Save timeout ID
const timeoutId = setTimeout(() => {
  console.log('This will not run');
}, 3000);

// Cancel before it executes
clearTimeout(timeoutId);
console.log('Timeout canceled');

// Real example: Debounce search
let searchTimeout;
function handleSearch(query) {
  clearTimeout(searchTimeout); // Cancel previous
  
  searchTimeout = setTimeout(() => {
    console.log('Searching for:', query);
    // API call here
  }, 500); // Wait 500ms after user stops typing
}`,
            explanation: 'clearTimeout cancels pending timeout'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain async nature',
          'Know minimum delay',
          'Discuss clearTimeout',
          'Show debounce use case',
          'Explain how event loop handles it'
        ]
      }
    ]
  },

  // DOM - Question 32: Event Bubbling
  eventBubbling: {
    id: 113,
    category: 'javascript',
    difficulty: 'intermediate',
    question: 'What is Event Bubbling in JavaScript?',
    title: 'Event Bubbling',
    subtitle: 'Understanding event propagation',
    sections: [
      {
        type: 'definition',
        title: 'What is Event Bubbling?',
        content: {
          english: 'Event bubbling is when an event starts at the target element and propagates up through its ancestors to the document root.',
          hinglish: 'Event bubbling tab hota hai jab event target element se shuru hoke uske parent elements tak propagate hota hai document root tak.',
          keyPoints: [
            'Events bubble up from target to root',
            'Opposite of capturing',
            'Default behavior in browsers',
            'Can be stopped with stopPropagation()',
            'Useful for event delegation',
            'Order: target → parent → grandparent → ... → document'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Bubbling Example',
        examples: [
          {
            title: 'Bubbling Flow',
            code: `// HTML structure:
// <div id="outer">
//   <div id="middle">
//     <button id="inner">Click</button>
//   </div>
// </div>

document.getElementById('outer').addEventListener('click', () => {
  console.log('Outer clicked');
});

document.getElementById('middle').addEventListener('click', () => {
  console.log('Middle clicked');
});

document.getElementById('inner').addEventListener('click', () => {
  console.log('Inner clicked');
});

// Click button → Output:
// Inner clicked
// Middle clicked  
// Outer clicked

// WHY: Event bubbles from button → middle → outer`,
            explanation: 'Events bubble up the DOM tree'
          },
          {
            title: 'Stop Bubbling',
            code: `document.getElementById('inner').addEventListener('click', (e) => {
  console.log('Inner clicked');
  e.stopPropagation(); // Stop bubbling!
});

document.getElementById('outer').addEventListener('click', () => {
  console.log('Outer clicked'); // Won't execute
});

// Click button → Output:
// Inner clicked
// (No "Outer clicked")`,
            explanation: 'stopPropagation() prevents bubbling'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain bubbling vs capturing',
          'Show stopPropagation() usage',
          'Discuss event delegation benefit',
          'Know event.target vs event.currentTarget',
          'Explain useCapture parameter'
        ]
      }
    ]
  },

  // FUNCTIONS - Question 44: JSON.stringify
  jsonStringify: {
    id: 114,
    category: 'javascript',
    difficulty: 'basic',
    question: 'What is JSON.stringify() in JavaScript?',
    title: 'JSON.stringify()',
    subtitle: 'Converting objects to JSON strings',
    sections: [
      {
        type: 'definition',
        title: 'What is JSON.stringify()?',
        content: {
          english: 'JSON.stringify() converts a JavaScript value to a JSON string. Useful for storing data, sending to servers, or deep copying objects.',
          hinglish: 'JSON.stringify() JavaScript value ko JSON string mein convert karta hai. Data store karne, server ko bhejna ya deep copy ke liye useful hai.',
          keyPoints: [
            'Converts JS values to JSON string',
            'Syntax: JSON.stringify(value, replacer, space)',
            'Ignores functions, undefined, symbols',
            'Handles nested objects',
            'Can format output with space parameter',
            'Opposite: JSON.parse()'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Usage Examples',
        examples: [
          {
            title: 'Basic Usage',
            code: `const obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};

const jsonString = JSON.stringify(obj);
console.log(jsonString);
// '{"name":"John","age":30,"city":"New York"}'

// WHY useful:
// - Send to API
// - Save to localStorage
// - Deep copy (with parse)`,
            explanation: 'Converts object to JSON string'
          },
          {
            title: 'Advanced Features',
            code: `const data = {
  name: 'John',
  age: 30,
  greet: function() {}, // Functions ignored!
  symbol: Symbol('test'), // Symbols ignored!
  undef: undefined // undefined ignored!
};

console.log(JSON.stringify(data));
// {"name":"John","age":30}

// Pretty print
console.log(JSON.stringify(data, null, 2));
/* 
{
  "name": "John",
  "age": 30
}
*/

// Custom replacer
const filtered = JSON.stringify(data, ['name']); // Only name
// {"name":"John"}`,
            explanation: 'Advanced options for stringification'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain conversion process',
          'Know whatgets ignored (functions, undefined)',
          'Discuss pretty print with space parameter',
          'Show localStorage use case',
          'Mention circular reference error'
        ]
      }
    ]
  },

  // BASICS - Question 25: Strict Mode
  strictMode: {
    id: 115,
    category: 'javascript',
    difficulty: 'basic',
    question: 'What is Strict Mode in JavaScript?',
    title: 'Strict Mode ("use strict")',
    subtitle: 'Enforcing stricter parsing and error handling',
    sections: [
      {
        type: 'definition',
        title: 'What is Strict Mode?',
        content: {
          english: 'Strict mode is a way to opt into a restricted variant of JavaScript that eliminates some silent errors and improves performance.',
          hinglish: 'Strict mode JavaScript ka ek restricted version hai jo silent errors ko eliminate karta hai aur performance improve karta hai.',
          keyPoints: [
            'Enabled with "use strict"',
            'Catches common coding mistakes',
            'Prevents unsafe actions',
            'Makes debugging easier',
            'Slightly better performance',
            'Can be applied to whole script or function'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Strict Mode Features',
        examples: [
          {
            title: 'Enabling Strict Mode',
            code: `// Entire script
"use strict";

x = 10; // Error: x is not defined

// Function only
function test() {
  "use strict";
  y = 20; // Error: y is not defined
}

// WHY: Prevents accidental globals`,
            explanation: 'Strict mode prevents implicit globals'
          },
          {
            title: 'What Strict Mode Prevents',
            code: `"use strict";

// 1. No implicit globals
undeclaredVar = 10; // Error!

// 2. No deleting variables
let x = 1;
delete x; // Error!

// 3. No duplicate parameters
function sum(a, a, c) { // Error!
  return a + a + c;
}

// 4. No octal literals
const num = 010; // Error!

// 5. 'this' is undefined in functions
function test() {
  console.log(this); // undefined (not global)
}`,
            explanation: 'Strict mode catches common mistakes'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain how to enable ("use strict")',
          'List key restrictions it imposes',
          'Discuss benefits: fewer bugs, better performance',
          'Know it\'s default in ES6 modules',
          'Mention this binding changes'
        ]
      }
    ]
  },

  // BASICS - Question 13: Temporal Dead Zone
  temporalDeadZone: {
    id: 116,
    category: 'javascript',
    difficulty: 'intermediate',
    question: 'What is Temporal Dead Zone (TDZ)?',
    title: 'Temporal Dead Zone',
    subtitle: 'Understanding let/const hoisting behavior',
    sections: [
      {
        type: 'definition',
        title: 'What is TDZ?',
        content: {
          english: 'TDZ is the period between entering scope and variable declaration where accessing the variable throws ReferenceError. Applies to let and const.',
          hinglish: 'TDZ wo period hai jab scope start hota hai aur variable declare hota hai, us time variable access karne pe ReferenceError aata hai. let aur const ke liye apply hota hai.',
          keyPoints: [
            'Applies to let and const (not var)',
            'Period from scope start to declaration',
            'Accessing variable in TDZ throws error',
            'Variables are hoisted but not initialized',
            'Prevents using variables before declaration',
            'Helps catch bugs early'
          ]
        }
      },
      {
        type: 'examples',
        title: 'TDZ Examples',
        examples: [
          {
            title: 'TDZ with let',
            code: `console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 10;

// WHAT happens:
// 1. Scope starts → x hoisted
// 2. x in TDZ (not initialized)
// 3. Trying to access → Error
// 4. Declaration reached → TDZ ends

// Compare with var:
console.log(y); // undefined (no TDZ)
var y = 10;`,
            explanation: 'let/const have TDZ, var doesn\'t'
          },
          {
            title: 'Function Scope TDZ',
            code: `function test() {
  // TDZ starts for 'a'
  console.log(a); // Error!
  
  let a = 5; // TDZ ends
  console.log(a); // 5
}

// WHY TDZ exists:
// Prevents using variables before initialization
// Catches bugs early
// Encourages better code structure`,
            explanation: 'TDZ prevents premature access'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Define TDZ clearly',
          'Explain it applies to let/const only',
          'Show example with error',
          'Discuss why it exists (catch bugs)',
          'Contrast with var behavior',
          'Mention typeof in TDZ also errors'
        ]
      }
    ]
  },

  // ADVANCED - Question 3: Object Creation
  objectCreation: {
    id: 117,
    category: 'javascript',
    difficulty: 'intermediate',
    question: 'What are different ways to create objects in JavaScript?',
    title: 'Object Creation Patterns',
    subtitle: 'Multiple ways to create objects',
    sections: [
      {
        type: 'definition',
        title: 'Object Creation Methods',
        content: {
          english: 'JavaScript provides multiple ways to create objects: object literals, constructor functions, Object.create(), class syntax, and factory functions.',
          hinglish: 'JavaScript mein objects create karne ke kayi tarike hain: object literals, constructor functions, Object.create(), class syntax, aur factory functions.',
          keyPoints: [
            'Object literal - simplest way',
            'Constructor function - with "new"',
            'Object.create() - inherit from prototype',
            'Class syntax - ES6 syntactic sugar',
            'Factory function - returns object',
            'Each has different use cases'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Creation Methods',
        examples: [
          {
            title: '1. Object Literal',
            code: `// Simplest way
const person = {
  name: 'John',
  age: 30,
  greet() {
    console.log(\`Hi, I'm \${this.name}\`);
  }
};

person.greet(); // Hi, I'm John

// WHEN to use:
// - Single object needed
// - Simple structure
// - Quick creation`,
            explanation: 'Object literal for simple objects'
          },
          {
            title: '2. Constructor Function',
            code: `// Constructor with 'new'
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    console.log(\`Hi, I'm \${this.name}\`);
  };
}

const john = new Person('John', 30);
const jane = new Person('Jane', 25);

// HOW 'new' works:
// 1. Creates empty object {}
// 2. Sets 'this' to new object
// 3. Sets prototype
// 4. Returns 'this'`,
            explanation: 'Constructor for multiple similar objects'
          },
          {
            title: '3. ES6 Class',
            code: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    console.log(\`Hi, I'm \${this.name}\`);
  }
}

const john = new Person('John', 30);

// WHY use class:
// - Cleaner syntax
// - Easier inheritance
// - More familiar to OOP developers`,
            explanation: 'Class syntax is syntactic sugar'
          },
          {
            title: '4. Object.create()',
            code: `const personProto = {
  greet() {
    console.log(\`Hi, I'm \${this.name}\`);
  }
};

const john = Object.create(personProto);
john.name = 'John';
john.age = 30;

john.greet(); // Hi, I'm John

// WHAT it does:
// Creates object with specified prototype
// Useful for inheritance`,
            explanation: 'Object.create for prototype inheritance'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'List all 5 methods',
          'Explain when to use each',
          'Discuss "new" keyword behavior',
          'Know class is syntactic sugar',
          'Explain Object.create() use case',
          'Mention factory functions'
        ]
      }
    ]
  },

  // ADVANCED - Question 7: Higher Order Functions (Enhanced)
  higherOrderFunctions: {
    id: 106,
    category: 'javascript',
    difficulty: 'advanced',
    question: 'What are Higher Order Functions?',
    title: 'Higher Order Functions',
    subtitle: 'Functions that work with functions',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'A Higher Order Function either takes functions as arguments, returns a function, or both. Core concept in functional programming.',
          hinglish: 'Higher Order Function wo function hai jo functions ko arguments leta hai ya function return karta hai. Functional programming ka core concept hai.',
          keyPoints: [
            'Takes functions as parameters',
            'Returns function as result',
            'Enables abstraction and composition',
            'Examples: map, filter, reduce',
            'Creates specialized functions',
            'Makes code more reusable'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Common Higher Order Functions',
        examples: [
          {
            title: 'Array Higher Order Functions',
            code: `const numbers = [1, 2, 3, 4, 5];

// map - transforms each element
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter - selects elements
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce - accumulates value
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// WHY higher order:
// They take FUNCTION as argument
// Abstraction over iteration`,
            explanation: 'Array methods are higher order functions'
          },
          {
            title: 'Creating Higher Order Functions',
            code: `// Returns function
function multiplyBy(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Takes function as argument
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, i => console.log(\`Line \${i}\`));`,
            explanation: 'Custom higher order functions'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Define clearly: takes/returns functions',
          'Give examples: map, filter, reduce',
          'Create custom HOF',
          'Discuss benefits: abstraction, reusability',
          'Know relation to closures'
        ]
      }
    ]
  },

  // INTERMEDIATE - Closures (Enhanced)
  closures: {
    id: 118,
    category: 'javascript',
    difficulty: 'intermediate',
    question: 'What are Closures in JavaScript and how do they work?',
    title: 'Closures in Depth',
    subtitle: 'Understanding lexical scoping and closures',
    sections: [
      {
        type: 'definition',
        title: 'What are Closures?',
        content: {
          english: 'A closure gives you access to an outer function\'s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.',
          hinglish: 'Closure tab banta hai jab inner function outer function ke variables ko access kar sakta hai, even after outer function execute ho chuka hai.',
          keyPoints: [
            'Inner function has access to outer function variables',
            'Created when function is defined, not called',
            'Preserves outer function scope',
            'Enables data privacy',
            'Used in callbacks, event handlers',
            'Common in module pattern'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Basic Closure Examples',
        examples: [
          {
            title: 'Simple Closure',
            code: `function outer() {
  const message = 'Hello';
  
  function inner() {
    console.log(message); // Accesses outer variable
  }
  
  return inner;
}

const myFunc = outer();
myFunc(); // "Hello"

// WHAT happens:
// 1. outer() executes, creates 'message'
// 2. Returns inner function
// 3. outer() finishes, but inner still has access to 'message'
// 4. This is CLOSURE - inner "closes over" message`,
            explanation: 'Inner function retains access to outer scope'
          },
          {
            title: 'Practical Counter',
            code: `function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
console.log(counter.count); // undefined (private!)

// WHY powerful:
// count is private, only accessible via provided methods`,
            explanation: 'Closures enable data privacy'
          }
        ]
      },
      {
        type: 'realworld',
        title: 'Real-World Use Cases',
        examples: [
          {
            title: 'Event Handlers',
            code: `function setupButtons() {
  const buttons = document.querySelectorAll('button');
  
  buttons.forEach((button, index) => {
    button.addEventListener('click', function() {
      console.log(\`Button \${index} clicked\`);
      // Closure: arrow function closes over 'index'
    });
  });
}

// Each handler has its own closure with unique index`,
            explanation: 'Closures in event handling'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain closure forms when inner function accesses outer scope',
          'Show practical example like counter or module',
          'Discuss data privacy benefit',
          'Mention memory implications',
          'Know lexical scoping',
          'Explain difference from regular function'
        ]
      }
    ]
  },

  // ADVANCED - Prototypes
  prototypes: {
    id: 120,
    category: 'javascript',
    difficulty: 'advanced',
    question: 'What is Prototype and Prototype Chain?',
    title: 'Prototypes & Prototype Chain',
    subtitle: 'Understanding JavaScript inheritance',
    sections: [
      {
        type: 'definition',
        title: 'What are Prototypes?',
        content: {
          english: 'Every JavaScript object has a hidden [[Prototype]] property that references another object. This creates a chain for property lookup - the prototype chain.',
          hinglish: 'Har JavaScript object ke paas ek hidden prototype property hoti hai jo dusre object ko point karti hai. Ye chain banati hai property lookup ke liye.',
          keyPoints: [
            'Every object has internal [[Prototype]]',
            'Accessed via __proto__ or Object.getPrototypeOf()',
            'Forms chain for property lookup',
            'Enables inheritance',
            'Functions have prototype property',
            'Object.prototype is end of chain'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Prototype Examples',
        examples: [
          {
            title: 'Prototype Chain Lookup',
            code: `const person = {
  greet: function() {
    console.log('Hello!');
  }
};

const student = Object.create(person);
student.name = 'John';

console.log(student.name); // 'John' (own property)
student.greet(); // 'Hello!' (from prototype)

// HOW lookup works:
// 1. Check student object → greet not found
// 2. Check student.__proto__ (person) → greet found!
// 3. Execute greet

console.log(student.__proto__ === person); // true`,
            explanation: 'Prototype chain enables property lookup'
          },
          {
            title: 'Constructor Prototype',
            code: `function Person(name) {
  this.name = name;
}

// Add method to prototype (shared by all instances)
Person.prototype.greet = function() {
  console.log(\`Hi, I'm \${this.name}\`);
};

const john = new Person('John');
const jane = new Person('Jane');

john.greet(); // "Hi, I'm John"
jane.greet(); // "Hi, I'm Jane"

// WHY use prototype:
// greet method is shared, not duplicated per instance
console.log(john.greet === jane.greet); // true (same function)`,
            explanation: 'Prototype methods are shared efficiently'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain prototype chain lookup process',
          'Discuss __proto__ vs prototype',
          'Show constructor function example',
          'Mention Object.create() for inheritance',
          'Know Object.prototype is root',
          'Discuss performance benefits'
        ]
      }
    ]
  },

  // ADVANCED - Spread Operator
  spreadOperator: {
    id: 122,
    category: 'javascript',
    difficulty: 'intermediate',
    question: 'What is the Spread Operator (...) in JavaScript?',
    title: 'Spread Operator',
    subtitle: 'ES6 spread syntax',
    sections: [
      {
        type: 'definition',
        title: 'What is Spread Operator?',
        content: {
          english: 'The spread operator (...) expands an iterable (like array or string) into individual elements. It can be used in function calls, array literals, and object literals.',
          hinglish: 'Spread operator (...) ek iterable ko individual elements mein expand kar deta hai. Arrays, objects, aur function arguments mein use hota hai.',
          keyPoints: [
            'Syntax: ...arrayOrObject',
            'Expands iterables into elements',
            'Used in arrays, objects, functions',
            'Creates shallow copies',
            'Combines/merges arrays and objects',
            'ES6 feature'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Spread with Arrays',
        examples: [
          {
            title: 'Array Operations',
            code: `// Copy array
const arr1 = [1, 2, 3];
const arr2 = [...arr1];
console.log(arr2); // [1, 2, 3]

// Combine arrays
const arr3 = [4, 5];
const combined = [...arr1, ...arr3];
console.log(combined); // [1, 2, 3, 4, 5]

// Insert elements
const inserted = [0, ...arr1, 4];
console.log(inserted); // [0, 1, 2, 3, 4]

// WHY better than concat:
// More readable, flexible positioning`,
            explanation: 'Spread makes array manipulation elegant'
          },
          {
            title: 'With Objects',
            code: `// Copy object
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 };
console.log(obj2); // { a: 1, b: 2 }

// Merge objects
const obj3 = { c: 3 };
const merged = { ...obj1, ...obj3 };
console.log(merged); // { a: 1, b: 2, c: 3 }

// Override properties
const override = { ...obj1, b: 99 };
console.log(override); // { a: 1, b: 99 }

// WHAT happens with conflicts:
// Later properties override earlier ones`,
            explanation: 'Spread works with objects too (ES2018)'
          },
          {
            title: 'Function Arguments',
            code: `function sum(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];

// Old way
sum.apply(null, numbers); // 6

// With spread
sum(...numbers); // 6

// WHAT spread does:
// Expands array into individual arguments
// sum(...[1,2,3]) → sum(1, 2, 3)`,
            explanation: 'Spread expands arrays into arguments'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Show array and object spread examples',
          'Discuss shallow vs deep copy',
          'Mention ES6/ES2018 versions',
          'Compare with rest parameters',
          'Know merge behavior with duplicates',
          'Explain use in immutable updates'
        ]
      }
    ]
  },

  // BASICS - Arrow Functions
  arrowFunctions: {
    id: 123,
    category: 'javascript',
    difficulty: 'basic',
    question: 'What are Arrow Functions in JavaScript?',
    title: 'Arrow Functions',
    subtitle: 'ES6 function syntax',
    sections: [
      {
        type: 'definition',
        title: 'What are Arrow Functions?',
        content: {
          english: 'Arrow functions are a concise way to write functions in ES6. They have shorter syntax and don\'t have their own "this" binding.',
          hinglish: 'Arrow functions ES6 mein functions likhne ka short way hai. Inka apna "this" nahi hota, parent scope ka "this" use hota hai.',
          keyPoints: [
            'Syntax: () => {}',
            'Shorter than regular functions',
            'No own "this" binding (lexical this)',
            'Cannot be used as constructors',
            'No arguments object',
            'Implicit return for single expressions'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Arrow Function Syntax',
        examples: [
          {
            title: 'Syntax Variations',
            code: `// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => {
  return a + b;
};

// Implicit return (single expression)
const add = (a, b) => a + b;

// Single parameter (parens optional)
const square = x => x * x;

// No parameters
const greet = () => console.log('Hello');

// Returning object (wrap in parens)
const createPerson = name => ({ name: name });`,
            explanation: 'Arrow functions have flexible syntax'
          },
          {
            title: 'Lexical "this"',
            code: `// Regular function - "this" depends on call
const obj1 = {
  name: 'John',
  greet: function() {
    console.log(this.name);
  }
};
obj1.greet(); // 'John'

// Arrow function - "this" from parent scope
const obj2 = {
  name: 'John',
  greet: () => {
    console.log(this.name); // undefined (this from global scope)
  }
};

// WHEN to use arrow:
class Timer {
  constructor() {
    this.seconds = 0;
    setInterval(() => {
      this.seconds++; // 'this' refers to Timer instance
      console.log(this.seconds);
    }, 1000);
  }
}

// WHY: Arrow function doesn't bind its own 'this'`,
            explanation: 'Arrow functions inherit "this" from parent'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain lexical "this" binding',
          'Show when NOT to use (methods, constructors)',
          'Discuss shorter syntax benefits',
          'Mention no arguments object',
          'Know implicit return rules',
          'Compare with regular functions'
        ]
      }
    ]
  },

  // DOM - Event Delegation
  eventDelegation: {
    id: 125,
    category: 'javascript',
    difficulty: 'intermediate',
    question: 'What is Event Delegation?',
    title: 'Event Delegation',
    subtitle: 'Efficient event handling pattern',
    sections: [
      {
        type: 'definition',
        title: 'What is Event Delegation?',
        content: {
          english: 'Event delegation is a pattern where you attach a single event listener to a parent element to handle events for multiple child elements, using event bubbling.',
          hinglish: 'Event delegation ek pattern hai jisme ek parent element pe listener lagake multiple child elements ke events handle karte hain. Event bubbling use karta hai.',
          keyPoints: [
            'Single listener on parent handles child events',
            'Uses event bubbling',
            'More efficient than multiple listeners',
            'Works for dynamically added elements',
            'Use event.target to identify element',
            'Reduces memory usage'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Event Delegation Examples',
        examples: [
          {
            title: 'Without Delegation (Bad)',
            code: `// ❌ Attaching listener to each item
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', () => {
    console.log('Item clicked');
  });
});

// Problems:
// - Multiple listeners (memory intensive)
// - Doesn't work for dynamically added items
// - Have to update when items change`,
            explanation: 'Multiple listeners are inefficient'
          },
          {
            title: 'With Delegation (Good)',
            code: `// ✅ Single listener on parent
const list = document.querySelector('.list');

list.addEventListener('click', (e) => {
  // Check if clicked element is an item
  if (e.target.classList.contains('item')) {
    console.log('Item clicked:', e.target.textContent);
  }
});

// Benefits:
// - Single listener (efficient)
// - Works for dynamically added items
// - Less memory usage

// HOW it works:
// 1. Click on child item
// 2. Event bubbles up to parent (.list)
// 3. Check event.target to identify clicked element
// 4. Handle accordingly`,
            explanation: 'Event delegation is efficient and flexible'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain event bubbling relationship',
          'Show efficiency benefits',
          'Discuss dynamic element handling',
          'Mention event.target vs event.currentTarget',
          'Know when to use delegation',
          'Explain memory advantages'
        ]
      }
    ]
  },

  // ES6 - Destructuring
  destructuring: {
    id: 128,
    category: 'javascript',
    difficulty: 'intermediate',
    question: 'What is Destructuring in JavaScript?',
    title: 'Destructuring Assignment',
    subtitle: 'ES6 unpacking syntax',
    sections: [
      {
        type: 'definition',
        title: 'What is Destructuring?',
        content: {
          english: 'Destructuring is a convenient way to extract values from arrays or properties from objects into distinct variables.',
          hinglish: 'Destructuring ek easy tarika hai arrays se values ya objects se properties ko alag variables mein nikalne ka.',
          keyPoints: [
            'Works with arrays and objects',
            'ES6 feature',
            'Makes code more readable',
            'Supports default values',
            'Can rename variables',
            'Works in function parameters'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Destructuring Examples',
        examples: [
          {
            title: 'Array Destructuring',
            code: `// Old way
const arr = [1, 2, 3];
const first = arr[0];
const second = arr[1];

// With destructuring
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// Skip elements
const [x, , z] = [1, 2, 3];
console.log(x, z); // 1 3

// Rest operator
const [head, ...tail] = [1, 2, 3, 4];
console.log(head); // 1
console.log(tail); // [2, 3, 4]

// Default values
const [p = 10, q = 20] = [5];
console.log(p, q); // 5 20`,
            explanation: 'Array destructuring extracts by position'
          },
          {
            title: 'Object Destructuring',
            code: `// Old way
const user = { name: 'John', age: 30 };
const name = user.name;
const age = user.age;

// With destructuring
const { name, age } = user;
console.log(name, age); // 'John' 30

// Rename variables
const { name: userName, age: userAge } = user;
console.log(userName); // 'John'

// Default values
const { city = 'Unknown' } = user;
console.log(city); // 'Unknown'

// Nested destructuring
const data = {
  user: {
    profile: { name: 'John' }
  }
};
const { user: { profile: { name: n } } } = data;
console.log(n); // 'John'`,
            explanation: 'Object destructuring uses property names'
          },
          {
            title: 'Function Parameters',
            code: `// Destructure in parameters
function greet({ name, age }) {
  console.log(\`Hi \${name}, you are \${age}\`);
}

greet({ name: 'John', age: 30 });
// "Hi John, you are 30"

// With defaults
function display({ title = 'Untitled', author = 'Unknown' }) {
  console.log(\`\${title} by \${author}\`);
}

display({ title: 'Book' }); 
// "Book by Unknown"`,
            explanation: 'Destructuring in function signatures'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Show both array and object destructuring',
          'Explain default values',
          'Discuss renaming with object destructuring',
          'Show function parameter usage',
          'Mention rest operator combination',
          'Know nested destructuring'
        ]
      }
    ]
  },

  // ADVANCED - async/await
  asyncAwait: {
    id: 129,
    category: 'javascript',
    difficulty: 'advanced',
    question: 'What is async/await in JavaScript?',
    title: 'Async/Await',
    subtitle: 'Modern asynchronous programming',
    sections: [
      {
        type: 'definition',
        title: 'What is async/await?',
        content: {
          english: 'async/await is syntactic sugar built on top of Promises. It allows you to write asynchronous code that looks and behaves like synchronous code, making it easier to read and maintain.',
          hinglish: 'async/await Promises ke upar bana ek syntax hai. Ye async code ko synchronous jaisa likhne deta hai, jisse code padhna aur samajhna aasaan ho jata hai.',
          keyPoints: [
            'Built on top of Promises',
            'Makes async code look synchronous',
            'Use "async" keyword before function',
            'Use "await" keyword before Promise',
            'Error handling with try/catch',
            'Returns a Promise implicitly'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Async/Await Examples',
        examples: [
          {
            title: 'Basic Syntax',
            code: `// Promise approach
function getData() {
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

// Async/Await approach
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// WHY better:
// No nesting (.then chaining)
// Error handling uses standard try/catch`,
            explanation: 'Cleaner syntax for async operations'
          },
          {
            title: 'Parallel Execution',
            code: `async function fetchUsers() {
  // Serial (Slow) - waits for each one
  // const user1 = await fetch('/user/1');
  // const user2 = await fetch('/user/2');

  // Parallel (Fast) - starts both at once
  const [user1, user2] = await Promise.all([
    fetch('/user/1'),
    fetch('/user/2')
  ]);
  
  return [await user1.json(), await user2.json()];
}

// HOW it works:
// Promise.all runs requests concurrently
// await pauses only for the combined result`,
            explanation: 'Handling multiple async operations'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Mention it returns a Promise',
          'Explain error handling with try/catch',
          'Discuss serial vs parallel execution',
          'Know that await blocks execution within the async function',
          'Compare with raw Promises',
          'Mention top-level await (ES2022)'
        ]
      }
    ]
  },

  // ADVANCED - Promise Methods
  promiseMethods: {
    id: 130,
    category: 'javascript',
    difficulty: 'advanced',
    question: 'What are Promise.all, Promise.race, Promise.allSettled?',
    title: 'Promise Combinators',
    subtitle: 'Handling multiple promises',
    sections: [
      {
        type: 'definition',
        title: 'Promise Methods',
        content: {
          english: 'These are static methods to handle multiple concurrent promises. Promise.all waits for all to succeed, Promise.race waits for the first one, and Promise.allSettled waits for all regardless of outcome.',
          hinglish: 'Ye multiple promises ko handle karne ke methods hain. Promise.all sabke success ka wait karta hai, Promise.race first wale ka, aur Promise.allSettled sabke complete hone ka.',
          keyPoints: [
            'Promise.all: Fails if ANY fails',
            'Promise.race: Returns first settled (success or fail)',
            'Promise.allSettled: Returns all results (ES2020)',
            'Promise.any: Returns first SUCCESS (ES2021)',
            'Used for concurrent operations',
            'Improves performance'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Promise Combinator Examples',
        examples: [
          {
            title: 'Promise.all()',
            code: `const p1 = Promise.resolve(3);
const p2 = 42;
const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // [3, 42, "foo"]
});

// If one fails:
Promise.all([p1, Promise.reject('Error')]).catch(err => {
  console.log(err); // "Error" (Fail fast)
});

// USE CASE: Fetching dependent data that all must succeed`,
            explanation: 'Waits for all promises to fulfill'
          },
          {
            title: 'Promise.allSettled()',
            code: `const promises = [
  Promise.resolve('Success'),
  Promise.reject('Failed')
];

Promise.allSettled(promises).then((results) =>
  results.forEach((result) => console.log(result.status))
);
// "fulfilled"
// "rejected"

// USE CASE: Batch operations where some can fail`,
            explanation: 'Waits for all to finish, success or fail'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Know the difference between all, race, allSettled, any',
          'Explain "fail fast" behavior of Promise.all',
          'Discuss use cases for each',
          'Mention browser support/polyfills',
          'Explain return values structure',
          'Show code examples'
        ]
      }
    ]
  },

  // ADVANCED - Event Loop Enhanced
  eventLoopEnhanced: {
    id: 131,
    category: 'javascript',
    difficulty: 'advanced',
    question: 'Explain Event Loop with Microtasks and Macrotasks',
    title: 'Event Loop Deep Dive',
    subtitle: 'Microtasks vs Macrotasks',
    sections: [
      {
        type: 'definition',
        title: 'Event Loop Mechanics',
        content: {
          english: 'The Event Loop processes the Call Stack, then Microtask Queue (Promises), then Macrotask Queue (setTimeout, I/O). Microtasks have higher priority and run immediately after the current script.',
          hinglish: 'Event Loop pehle Call Stack clear karta hai, fir Microtask Queue (Promises), fir Macrotask Queue (setTimeout). Microtasks ki priority high hoti hai.',
          keyPoints: [
            'Call Stack executes synchronous code',
            'Microtasks: Promises, queueMicrotask, MutationObserver',
            'Macrotasks: setTimeout, setInterval, I/O',
            'Microtask queue must empty before next Macrotask',
            'Starvation possible with too many microtasks',
            'Render updates happen between tasks'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Execution Order Examples',
        examples: [
          {
            title: 'Microtask vs Macrotask',
            code: `console.log('1. Start');

setTimeout(() => {
  console.log('5. Timeout (Macrotask)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise (Microtask)');
});

queueMicrotask(() => {
  console.log('4. Microtask Queue');
});

console.log('2. End');

// OUTPUT:
// 1. Start
// 2. End
// 3. Promise (Microtask)
// 4. Microtask Queue
// 5. Timeout (Macrotask)`,
            explanation: 'Microtasks run before Macrotasks'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Draw the loop: Stack -> Microtasks -> Render -> Macrotask',
          'List examples of micro vs macro tasks',
          'Explain why Promises run before setTimeout(0)',
          'Discuss potential UI blocking',
          'Mention queueMicrotask() API',
          'Explain starvation concept'
        ]
      }
    ]
  },

  // INTERMEDIATE - Map/Filter/Reduce
  mapFilterReduce: {
    id: 132,
    category: 'javascript',
    difficulty: 'intermediate',
    question: 'Explain map, filter, and reduce with examples',
    title: 'Array Methods: Map, Filter, Reduce',
    subtitle: 'Functional array manipulation',
    sections: [
      {
        type: 'definition',
        title: 'Array Transformation Methods',
        content: {
          english: 'These are higher-order functions for array manipulation. Map transforms elements, Filter selects elements, and Reduce accumulates elements into a single value.',
          hinglish: 'Ye array manipulation ke liye functions hain. Map elements badalta hai, Filter select karta hai, aur Reduce sabko ek value mein jodta hai.',
          keyPoints: [
            'map: Returns new array same length',
            'filter: Returns new array subset',
            'reduce: Returns single value',
            'All are immutable (don\'t change original)',
            'Chainable methods',
            'Functional programming core'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Method Examples',
        examples: [
          {
            title: 'Map & Filter',
            code: `const nums = [1, 2, 3, 4, 5];

// Map: Double each number
const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Filter: Keep evens
const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// Chaining
const result = nums
  .filter(n => n > 2)
  .map(n => n * 10);
console.log(result); // [30, 40, 50]`,
            explanation: 'Transforming and selecting data'
          },
          {
            title: 'Reduce Power',
            code: `const nums = [1, 2, 3, 4];

// Sum
const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10

// Grouping objects
const people = [
  { name: 'Alice', role: 'Admin' },
  { name: 'Bob', role: 'User' },
  { name: 'Charlie', role: 'Admin' }
];

const byRole = people.reduce((acc, person) => {
  acc[person.role] = acc[person.role] || [];
  acc[person.role].push(person);
  return acc;
}, {});

console.log(byRole);
// { Admin: [...], User: [...] }`,
            explanation: 'Reduce can transform array to anything'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain immutability benefit',
          'Show how to implement map using reduce',
          'Discuss performance vs for loops',
          'Show chaining example',
          'Explain initial value in reduce',
          'Know when to use which'
        ]
      }
    ]
  },

  // BASICS - setInterval
  setInterval: {
    id: 133,
    category: 'javascript',
    difficulty: 'basic',
    question: 'How does setInterval work and how to stop it?',
    title: 'setInterval & clearInterval',
    subtitle: 'Repeated execution',
    sections: [
      {
        type: 'definition',
        title: 'What is setInterval?',
        content: {
          english: 'setInterval repeatedly calls a function or executes a code snippet, with a fixed time delay between each call. It returns an interval ID used to cancel it.',
          hinglish: 'setInterval ek function ko baar-baar call karta hai ek fixed time delay ke sath. Ye ek ID return karta hai jisse isse roka ja sakta hai.',
          keyPoints: [
            'Repeats execution indefinitely',
            'Fixed delay in milliseconds',
            'Returns unique Interval ID',
            'Stopped using clearInterval(id)',
            'Does not wait for execution to finish',
            'Can drift over time'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Timer Examples',
        examples: [
          {
            title: 'Basic Timer',
            code: `let count = 0;
const id = setInterval(() => {
  count++;
  console.log(count);
  
  if (count === 5) {
    clearInterval(id); // Stop after 5
    console.log('Done');
  }
}, 1000);

// HOW it works:
// Runs every 1000ms (1 sec)
// Stops when clearInterval is called`,
            explanation: 'Creating a simple counter'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain drift issue (execution time adds up)',
          'Mention recursive setTimeout as alternative',
          'Discuss memory leaks if not cleared',
          'Know return value is an ID',
          'Explain behavior when tab is inactive',
          'Show how to stop it'
        ]
      }
    ]
  },

  // INTERMEDIATE - Shallow vs Deep Copy
  shallowDeepCopy: {
    id: 134,
    category: 'javascript',
    difficulty: 'intermediate',
    question: 'What is the difference between Shallow Copy and Deep Copy?',
    title: 'Shallow vs Deep Copy',
    subtitle: 'Cloning objects and arrays',
    sections: [
      {
        type: 'definition',
        title: 'Copy Types',
        content: {
          english: 'A shallow copy creates a new object but references nested objects. A deep copy creates a new object and recursively copies all nested objects, disconnecting them from the original.',
          hinglish: 'Shallow copy naya object banata hai par nested objects ka reference same rakhta hai. Deep copy pura naya structure banata hai, nested objects bhi copy hote hain.',
          keyPoints: [
            'Shallow: Top level copy, nested are references',
            'Deep: Full recursive copy',
            'Spread (...) and Object.assign do SHALLOW copy',
            'JSON.parse(JSON.stringify()) does DEEP copy',
            'structuredClone() is modern deep copy',
            'Reference types share memory address'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Copying Examples',
        examples: [
          {
            title: 'Shallow Copy Issue',
            code: `const original = { 
  name: 'John', 
  details: { age: 30 } 
};

const shallow = { ...original };

shallow.name = 'Jane'; // OK, separate
shallow.details.age = 99; // AFFECTS ORIGINAL!

console.log(original.details.age); // 99
// WHY: 'details' is an object reference, shared by both`,
            explanation: 'Nested objects are shared in shallow copy'
          },
          {
            title: 'Deep Copy Solutions',
            code: `const original = { a: { b: 1 } };

// 1. JSON method (Simple but limited)
const deep1 = JSON.parse(JSON.stringify(original));
// Limitation: Loses functions, undefined, dates

// 2. structuredClone (Modern standard)
const deep2 = structuredClone(original);

// 3. Lodash _.cloneDeep (Library)
// const deep3 = _.cloneDeep(original);

deep2.a.b = 99;
console.log(original.a.b); // 1 (Unaffected)`,
            explanation: 'Creating truly independent copies'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Demonstrate nested object mutation issue',
          'List methods for shallow copy',
          'List methods for deep copy',
          'Mention JSON method limitations',
          'Discuss structuredClone() support',
          'Explain performance implications'
        ]
      }
    ]
  },

  // ES6 - Rest Parameters
  restParameters: {
    id: 135,
    category: 'javascript',
    difficulty: 'basic',
    question: 'What are Rest Parameters in JavaScript?',
    title: 'Rest Parameters',
    subtitle: 'Handling variable arguments',
    sections: [
      {
        type: 'definition',
        title: 'What are Rest Parameters?',
        content: {
          english: 'Rest parameters allow a function to accept an indefinite number of arguments as an array. It uses the ... syntax in the function definition.',
          hinglish: 'Rest parameters function ko allow karte hain ki wo kitne bhi arguments accept kare ek array ke form mein. Ye ... syntax use karta hai.',
          keyPoints: [
            'Syntax: function(...args)',
            'Collects remaining args into array',
            'Must be the last parameter',
            'Replaces "arguments" object',
            'Works with arrow functions',
            'True array (has map, filter, etc.)'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Rest Examples',
        examples: [
          {
            title: 'Variable Arguments',
            code: `function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3, 4)); // 10

// Comparison with 'arguments'
// arguments is array-like, rest is real array`,
            explanation: 'Handling any number of inputs'
          },
          {
            title: 'With Other Params',
            code: `function introduce(greeting, ...names) {
  names.forEach(name => {
    console.log(\`\${greeting}, \${name}!\`);
  });
}

introduce('Hi', 'Alice', 'Bob');
// "Hi, Alice!"
// "Hi, Bob!"

// Note: ...names must be LAST`,
            explanation: 'Combining fixed and variable args'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Compare with "arguments" object',
          'Explain it must be last parameter',
          'Show usage in array destructuring',
          'Discuss array methods availability',
          'Mention cleaner syntax',
          'Show difference from Spread operator'
        ]
      }
    ]
  },

  // ES6 - Template Literals
  templateLiterals: {
    id: 136,
    category: 'javascript',
    difficulty: 'basic',
    question: 'What are Template Literals?',
    title: 'Template Literals',
    subtitle: 'Enhanced string syntax',
    sections: [
      {
        type: 'definition',
        title: 'What are Template Literals?',
        content: {
          english: 'Template literals are string literals allowing embedded expressions. They use backticks (`) instead of quotes and support multi-line strings and interpolation.',
          hinglish: 'Template literals backticks (`) use karte hain aur variables ya expressions ko string mein embed karne dete hain using ${}. Multi-line strings bhi support karte hain.',
          keyPoints: [
            'Use backticks (`)',
            'String interpolation ${expression}',
            'Multi-line strings support',
            'Tagged templates support',
            'Cleaner than string concatenation',
            'ES6 feature'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Usage Examples',
        examples: [
          {
            title: 'Interpolation & Multi-line',
            code: `const name = 'John';
const age = 30;

// Old way
const str1 = 'User ' + name + ' is ' + age + ' years old.';

// Template Literal
const str2 = \`User \${name} is \${age} years old.\`;

// Multi-line
const html = \`
  <div>
    <h1>\${name}</h1>
  </div>
\`;

// Expressions
console.log(\`Next year: \${age + 1}\`);`,
            explanation: 'Cleaner string construction'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Show interpolation syntax',
          'Demonstrate multi-line capability',
          'Mention tagged templates (advanced)',
          'Discuss readability benefits',
          'Compare with concatenation',
          'Explain expression support'
        ]
      }
    ]
  },

  // ES6 - Default Parameters
  defaultParameters: {
    id: 137,
    category: 'javascript',
    difficulty: 'basic',
    question: 'How do Default Parameters work?',
    title: 'Default Parameters',
    subtitle: 'Function argument defaults',
    sections: [
      {
        type: 'definition',
        title: 'Default Parameters',
        content: {
          english: 'Default parameters allow named parameters to be initialized with default values if no value or undefined is passed.',
          hinglish: 'Default parameters se hum function arguments ko default value de sakte hain agar koi value pass na ho ya undefined pass ho.',
          keyPoints: [
            'Syntax: func(a = 10)',
            'Used when argument is missing/undefined',
            'Evaluated at call time',
            'Can use previous parameters',
            'Replaces manual checks',
            'null does NOT trigger default'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Default Params Examples',
        examples: [
          {
            title: 'Basic Usage',
            code: `function greet(name = 'Guest') {
  console.log(\`Hello, \${name}\`);
}

greet('John'); // "Hello, John"
greet();       // "Hello, Guest"
greet(undefined); // "Hello, Guest"
greet(null);   // "Hello, null" (Gotcha!)

// Old way check:
// name = name || 'Guest';`,
            explanation: 'Handling missing arguments'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain undefined vs null behavior',
          'Show how it simplifies code',
          'Mention evaluation order',
          'Discuss using expressions as defaults',
          'Compare with old || operator pattern',
          'Explain impact on function.length'
        ]
      }
    ]
  },

  // ES6 - Symbol
  symbolType: {
    id: 138,
    category: 'javascript',
    difficulty: 'advanced',
    question: 'What is the Symbol primitive type?',
    title: 'Symbol Type',
    subtitle: 'Unique identifiers',
    sections: [
      {
        type: 'definition',
        title: 'What is Symbol?',
        content: {
          english: 'Symbol is a primitive data type introduced in ES6. Every Symbol() call guarantees a unique value, often used as object property keys to avoid name collisions.',
          hinglish: 'Symbol ek primitive type hai jo hamesha unique value deta hai. Ye mainly object properties ke liye use hota hai taaki name collision na ho.',
          keyPoints: [
            'Primitive type (like number, string)',
            'Always unique: Symbol() !== Symbol()',
            'Used for hidden/private properties',
            'Not enumerable in for...in loops',
            'Well-known Symbols (iterator, etc.)',
            'Cannot use "new" keyword'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Symbol Examples',
        examples: [
          {
            title: 'Uniqueness',
            code: `const sym1 = Symbol('foo');
const sym2 = Symbol('foo');

console.log(sym1 === sym2); // false

const obj = {
  [sym1]: 'value'
};

console.log(obj[sym1]); // 'value'
// Keys don't clash with string keys`,
            explanation: 'Symbols are always unique'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain uniqueness guarantee',
          'Discuss use as object keys',
          'Mention Symbol.iterator',
          'Explain privacy (not truly private but hidden)',
          'Show syntax (no "new")',
          'Discuss Global Symbol Registry'
        ]
      }
    ]
  }
};
