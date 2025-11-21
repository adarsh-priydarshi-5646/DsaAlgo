// React Topics Content
export const reactTopics = {
  useEffect: {
    id: 5,
    category: 'react',
    difficulty: 'intermediate',
    question: 'What is useEffect hook and how does it work?',
    title: 'React useEffect Hook',
    subtitle: 'Managing side effects in React functional components',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'useEffect is a React Hook that lets you synchronize a component with an external system or perform side effects. It runs after render and can optionally clean up.',
          hinglish: 'useEffect ek React Hook hai jo component ke render hone ke baad side effects run karta hai. Jaise API calls, subscriptions, timers etc.',
          keyPoints: [
            'Runs after DOM updates (by default)',
            'Can run on mount, update, or unmount',
            'Replaces componentDidMount, componentDidUpdate, componentWillUnmount',
            'Supports dependency array for conditional execution'
          ]
        }
      },
      {
        type: 'syntax',
        title: 'Basic Syntax',
        code: {
          language: 'javascript',
          title: 'useEffect Syntax',
          content: `import { useEffect } from 'react';

useEffect(() => {
  // Side effect code here
  console.log('Effect ran!');
  
  // Optional cleanup function
  return () => {
    console.log('Cleanup!');
  };
}, [dependencies]); // Dependency array`
        },
        explanation: {
          parameters: [
            { name: 'setup function', description: 'Function with effect logic' },
            { name: 'dependencies', description: 'Optional array of dependencies' },
            { name: 'return cleanup', description: 'Optional cleanup function' }
          ]
        }
      },
      {
        type: 'examples',
        title: 'Dependency Array Patterns',
        examples: [
          {
            title: 'No Dependency Array (Runs on Every Render)',
            code: `useEffect(() => {
  console.log('Runs on every render');
  // This runs after EVERY render
});`,
            note: 'Runs after every render - use carefully!'
          },
          {
            title: 'Empty Dependency Array (Runs Once on Mount)',
            code: `useEffect(() => {
  console.log('Runs only once on mount');
  
  return () => {
    console.log('Cleanup on unmount');
  };
}, []); // Empty array = run once`,
            note: 'Perfect for initialization logic'
          },
          {
            title: 'With Dependencies (Runs When Dependencies Change)',
            code: `const [count, setCount] = useState(0);

useEffect(() => {
  console.log(\`Count changed to: \${count}\`);
}, [count]); // Runs when count changes`,
            note: 'Re-runs only when specified values change'
          }
        ]
      },
      {
        type: 'realworld',
        title: 'Real World Examples',
        examples: [
          {
            title: 'API Data Fetching',
            code: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        
        if (!cancelled) {
          setUser(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      cancelled = true; // Cleanup
    };
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}`,
            explanation: 'Fetch data when component mounts or userId changes, with proper cleanup'
          },
          {
            title: 'Event Listeners',
            code: `function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div>Size: {size.width} x {size.height}</div>;
}`,
            explanation: 'Add event listener on mount, remove on unmount'
          },
          {
            title: 'Timer/Interval',
            code: `function Countdown({ initialSeconds }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  return <div>Time left: {seconds}s</div>;
}`,
            explanation: 'Create interval that auto-cleans up'
          }
        ]
      },
      {
        type: 'pitfalls',
        title: 'Common Pitfalls & Solutions',
        pitfalls: [
          {
            title: 'Infinite Loop',
            wrong: `const [data, setData] = useState([]);

useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData);
}); // No dependency array!`,
            reason: 'Runs on every render, sets state, triggers render again',
            correct: `useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData);
}, []); // Empty array = runs once`,
            solution: 'Always specify dependency array'
          },
          {
            title: 'Missing Dependencies (Stale Closure)',
            wrong: `const [count, setCount] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // Always logs 0!
  }, 1000);
  return () => clearInterval(timer);
}, []); // Missing count!`,
            reason: 'Effect captures initial count value',
            correct: `useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // Logs current count
  }, 1000);
  return () => clearInterval(timer);
}, [count]); // Include all dependencies`,
            solution: 'Include all used values in dependency array'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain the purpose of the dependency array',
          'Discuss cleanup functions and when they run',
          'Explain how useEffect differs from lifecycle methods',
          'Discuss common pitfalls (infinite loops, stale closures)',
          'Explain best practices for data fetching',
          'Know when to use useEffect vs useLayoutEffect'
        ]
      }
    ]
  },

  useMemo: {
    id: 6,
    category: 'react',
    difficulty: 'advanced',
    question: 'What are useMemo and useCallback hooks?',
    title: 'React useMemo & useCallback',
    subtitle: 'Performance optimization through memoization',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'useMemo and useCallback are React Hooks for performance optimization. useMemo caches the result of expensive calculations, while useCallback caches function references.',
          hinglish: 'useMemo aur useCallback performance optimization ke liye use hote hain. useMemo expensive calculations ko cache karta hai, useCallback function references ko cache karta hai.',
          keyPoints: [
            'useMemo caches computed values',
            'useCallback caches function instances',
            'Both prevent unnecessary re-renders',
            'Use only when needed - not always beneficial'
          ]
        }
      },
      {
        type: 'syntax',
        title: 'Basic Syntax',
        code: {
          language: 'javascript',
          title: 'useMemo & useCallback Syntax',
          content: `import { useMemo, useCallback } from 'react';

// useMemo - cache computed value
const memoizedValue = useMemo(() => {
  return expensiveComputation(a, b);
}, [a, b]); // Recompute only when a or b changes

// useCallback - cache function reference
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]); // New function only when a or b changes`
        }
      },
      {
        type: 'examples',
        title: 'Practical Examples',
        examples: [
          {
            title: 'useMemo - Expensive Calculation',
            code: `function ProductList({ products, filterTerm }) {
  // Without useMemo - runs on every render
  // const filtered = products.filter(p => 
  //   p.name.includes(filterTerm)
  // );

  // With useMemo - only recalculates when dependencies change
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(p => 
      p.name.toLowerCase().includes(filterTerm.toLowerCase())
    );
  }, [products, filterTerm]);

  return (
    <div>
      {filteredProducts.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}`,
            explanation: 'Expensive filtering only runs when products or filterTerm changes'
          },
          {
            title: 'useCallback - Prevent Child Re-renders',
            code: `function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Without useCallback - new function on every render
  // const handleClick = () => {
  //   console.log('Clicked!');
  // };

  // With useCallback - same function reference
  const handleClick = useCallback(() => {
    console.log('Clicked with count:', count);
  }, [count]); // New function only when count changes

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

// Child component with React.memo
const ChildComponent = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});`,
            explanation: 'Child only re-renders when handleClick reference changes'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain the difference between useMemo and useCallback',
          'Discuss when NOT to use memoization (premature optimization)',
          'Explain referential equality and why it matters',
          'Discuss React.memo and how it works with useCallback',
          'Know the performance trade-offs of memoization'
        ]
      }
    ]
  },

  useState: {
    id: 3,
    category: 'react',
    difficulty: 'basic',
    question: 'What is useState hook and how does it work?',
    title: 'React useState Hook',
    subtitle: 'Managing state in functional components',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'useState is a React Hook that lets you add state to functional components. It returns an array with the current state value and a function to update it.',
          hinglish: 'useState ek React Hook hai jo functional components mein state add karne ke liye use hota hai. Ye current value aur update function return karta hai.',
          keyPoints: [
            'Returns [state, setState] array',
            'Can initialize with value or function',
            'setState triggers re-render',
            'State updates are batched'
          ]
        }
      },
      {
        type: 'syntax',
        title: 'Basic Syntax',
        code: {
          language: 'javascript',
          title: 'useState Syntax',
          content: `import { useState } from 'react';

function Component() {
  // Initialize with value
  const [count, setCount] = useState(0);
  
  // Initialize with function (lazy initialization)
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user'));
  });
  
  // Multiple state variables
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  
  return <div>{count}</div>;
}`
        }
      },
      {
        type: 'examples',
        title: 'State Update Patterns',
        examples: [
          {
            title: 'Direct Value Update',
            code: `const [count, setCount] = useState(0);

// Direct update
setCount(5); // count = 5

// Based on previous state
setCount(count + 1); // ❌ May be stale in async updates`,
            note: 'Direct updates may have stale state issues'
          },
          {
            title: 'Functional Update (Recommended)',
            code: `const [count, setCount] = useState(0);

// Functional update - always gets latest state
setCount(prevCount => prevCount + 1); // ✅ Always correct

// Multiple updates
setCount(prev => prev + 1);
setCount(prev => prev + 1);
// Both updates apply correctly`,
            note: 'Functional updates guarantee latest state'
          },
          {
            title: 'Object State',
            code: `const [user, setUser] = useState({
  name: 'John',
  age: 30
});

// ❌ Wrong - mutates state
user.name = 'Jane';

// ✅ Correct - create new object
setUser({ ...user, name: 'Jane' });

// ✅ Correct - functional update
setUser(prev => ({ ...prev, age: prev.age + 1 }));`,
            note: 'Always create new object, never mutate'
          }
        ]
      },
      {
        type: 'pitfalls',
        title: 'Common Pitfalls',
        pitfalls: [
          {
            title: 'State Updates Are Asynchronous',
            wrong: `const [count, setCount] = useState(0);

setCount(count + 1);
console.log(count); // Still 0!`,
            reason: 'setState is asynchronous, state not updated immediately',
            correct: `setCount(prev => {
  const newCount = prev + 1;
  console.log(newCount); // Correct value
  return newCount;
});`,
            solution: 'Use functional update or useEffect to see updated value'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain useState syntax and return values',
          'Discuss functional updates vs direct updates',
          'Explain state batching in React 18',
          'Know lazy initialization for expensive computations',
          'Discuss when to split state vs combine in object'
        ]
      }
    ]
  },

  virtualDOM: {
    id: 51,
    category: 'react',
    difficulty: 'intermediate',
    question: 'What is Virtual DOM and how does React use it?',
    title: 'Virtual DOM',
    subtitle: 'Understanding React\'s rendering optimization',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'Virtual DOM is a lightweight JavaScript representation of the actual DOM. React uses it to optimize updates by comparing the virtual and real DOM, then applying only necessary changes.',
          hinglish: 'Virtual DOM ek lightweight JavaScript object hai jo actual DOM ko represent karta hai. React isme changes compare karke sirf zaruri updates ko real DOM mein apply karta hai.',
          keyPoints: [
            'In-memory representation of DOM',
            'Diffing algorithm compares changes',
            'Batch updates for better performance',
            'Reconciliation process updates real DOM'
          ]
        }
      },
      {
        type: 'examples',
        title: 'How Virtual DOM Works',
        examples: [
          {
            title: 'Virtual DOM Process',
            code: `// 1. Initial render - create Virtual DOM
const vdom = {
  type: 'div',
  props: { className: 'container' },
  children: [
    { type: 'h1', props: {}, children: ['Hello'] }
  ]
};

// 2. State changes - create new Virtual DOM
const newVdom = {
  type: 'div',
  props: { className: 'container' },
  children: [
    { type: 'h1', props: {}, children: ['Hello World'] }
  ]
};

// 3. Diff - React compares old vs new
// 4. Update - Only change text node 'Hello' → 'Hello World'`,
            explanation: 'React only updates what changed, not entire DOM'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Explain Virtual DOM vs Real DOM',
          'Discuss reconciliation algorithm',
          'Know Fiber architecture in React 16+',
          'Explain why keys are important in lists',
          'Discuss performance benefits'
        ]
      }
    ]
  },

  propsVsState: {
    id: 52,
    category: 'react',
    difficulty: 'basic',
    question: 'What is the difference between Props and State?',
    title: 'Props vs State',
    subtitle: 'Understanding data flow in React',
    sections: [
      {
        type: 'definition',
        title: 'Definition',
        content: {
          english: 'Props are read-only data passed from parent to child components. State is mutable data managed within a component that can change over time.',
          hinglish: 'Props parent se child ko pass hote hain aur read-only hote hain. State component ke andar ka data hai jo change ho sakta hai.',
          keyPoints: [
            'Props: immutable, passed from parent',
            'State: mutable, managed by component',
            'Props trigger re-render when changed',
            'State updates trigger re-render'
          ]
        }
      },
      {
        type: 'examples',
        title: 'Props vs State Comparison',
        examples: [
          {
            title: 'Using Props',
            code: `// Parent component
function Parent() {
  return <Child name="John" age={30} />;
}

// Child component
function Child({ name, age }) {
  // ❌ Cannot modify props
  // name = 'Jane'; // Error!
  
  return <div>{name} is {age} years old</div>;
}`,
            note: 'Props are read-only'
          },
          {
            title: 'Using State',
            code: `function Counter() {
  const [count, setCount] = useState(0);
  
  // ✅ Can update state
  const increment = () => {
    setCount(count + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}`,
            note: 'State is mutable within component'
          }
        ]
      },
      {
        type: 'interview',
        title: 'Interview Tips',
        tips: [
          'Clearly explain props vs state differences',
          'Discuss one-way data flow',
          'Know when to use props vs state',
          'Explain lifting state up pattern',
          'Discuss prop drilling and solutions (Context API)'
        ]
      }
    ]
  }
};
