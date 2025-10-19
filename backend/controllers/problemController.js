import prisma from '../config/database.js';

const mockProblems = [
  {
    id: '1',
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'EASY',
    category: {
      id: '1',
      name: 'Arrays',
      icon: 'BarChart3',
      color: '#3B82F6'
    },
    tags: ['array', 'hash-table'],
    submissionCount: 1234,
    solutionCount: 1,
    userProgress: null,
    order: 1,
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ],
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, output: [0, 1] },
      { input: { nums: [3, 2, 4], target: 6 }, output: [1, 2] },
      { input: { nums: [3, 3], target: 6 }, output: [0, 1] }
    ]
  },
  {
    id: '2',
    title: 'Reverse Array',
    slug: 'reverse-array',
    difficulty: 'EASY',
    category: {
      id: '1',
      name: 'Arrays',
      icon: 'BarChart3',
      color: '#3B82F6'
    },
    tags: ['array', 'two-pointers'],
    submissionCount: 856,
    solutionCount: 0,
    userProgress: null,
    order: 2,
    leetcodeUrl: 'https://leetcode.com/problems/reverse-string/',
    description: 'Write a function to reverse an array in-place.',
    examples: [
      {
        input: '[1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]',
        explanation: 'The array is reversed in-place.'
      }
    ],
    testCases: [
      { input: { arr: [1, 2, 3, 4, 5] }, output: [5, 4, 3, 2, 1] },
      { input: { arr: ['a', 'b', 'c'] }, output: ['c', 'b', 'a'] }
    ]
  },
  {
    id: '3',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'EASY',
    category: {
      id: '7',
      name: 'Stack',
      icon: 'Layers',
      color: '#F59E0B'
    },
    tags: ['stack', 'string'],
    submissionCount: 2341,
    solutionCount: 1,
    userProgress: null,
    order: 3,
    leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
    description: 'Given a string s containing just the characters (, ), {, }, [ and ], determine if the input string is valid.',
    examples: [
      { input: 's = "()"', output: 'true', explanation: 'The parentheses are properly matched.' },
      { input: 's = "()[]{}"', output: 'true', explanation: 'All brackets are properly matched.' }
    ],
    testCases: [
      { input: { s: "()" }, output: true },
      { input: { s: "()[]{}" }, output: true },
      { input: { s: "(]" }, output: false }
    ]
  },
  {
    id: '4',
    title: 'Merge Two Sorted Lists',
    slug: 'merge-two-sorted-lists',
    difficulty: 'EASY',
    category: {
      id: '2',
      name: 'Linked Lists',
      icon: 'Link',
      color: '#10B981'
    },
    tags: ['linked-list', 'recursion'],
    submissionCount: 1876,
    solutionCount: 1,
    userProgress: null,
    order: 4,
    leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in one sorted list.',
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]',
        explanation: 'The merged list is sorted.'
      }
    ],
    testCases: [
      { input: { list1: [1, 2, 4], list2: [1, 3, 4] }, output: [1, 1, 2, 3, 4, 4] }
    ]
  },
  {
    id: '5',
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    difficulty: 'MEDIUM',
    category: {
      id: '5',
      name: 'Dynamic Programming',
      icon: 'Zap',
      color: '#EF4444'
    },
    tags: ['array', 'dynamic-programming'],
    submissionCount: 3421,
    solutionCount: 1,
    userProgress: null,
    order: 5,
    leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/',
    description: 'Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.',
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: '[4,-1,2,1] has the largest sum = 6.'
      }
    ],
    testCases: [
      { input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }, output: 6 },
      { input: { nums: [1] }, output: 1 },
      { input: { nums: [5, 4, -1, 7, 8] }, output: 23 }
    ]
  },
  {
    id: '6',
    title: 'Binary Tree Inorder Traversal',
    slug: 'binary-tree-inorder-traversal',
    difficulty: 'EASY',
    category: {
      id: '3',
      name: 'Trees',
      icon: 'GitBranch',
      color: '#F59E0B'
    },
    tags: ['tree', 'depth-first-search'],
    submissionCount: 1654,
    solutionCount: 1,
    userProgress: null,
    order: 6,
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
    description: 'Given the root of a binary tree, return the inorder traversal of its nodes values.',
    examples: [
      {
        input: 'root = [1,null,2,3]',
        output: '[1,3,2]',
        explanation: 'Inorder traversal: left, root, right.'
      }
    ],
    testCases: [
      { input: { root: [1, null, 2, 3] }, output: [1, 3, 2] }
    ]
  },
  {
    id: '7',
    title: 'Search in Rotated Sorted Array',
    slug: 'search-in-rotated-sorted-array',
    difficulty: 'MEDIUM',
    category: {
      id: '6',
      name: 'Sorting & Searching',
      icon: 'Search',
      color: '#06B6D4'
    },
    tags: ['binary-search', 'array'],
    submissionCount: 2145,
    solutionCount: 1,
    userProgress: null,
    order: 7,
    leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    description: 'Given the sorted rotated array nums and an integer target, return the index of target if it is in nums, or -1 if not.',
    examples: [
      {
        input: 'nums = [4,5,6,7,0,1,2], target = 0',
        output: '4',
        explanation: 'Target 0 is at index 4.'
      }
    ],
    testCases: [
      { input: { nums: [4,5,6,7,0,1,2], target: 0 }, output: 4 },
      { input: { nums: [4,5,6,7,0,1,2], target: 3 }, output: -1 }
    ]
  },
  {
    id: '8',
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    difficulty: 'EASY',
    category: {
      id: '5',
      name: 'Dynamic Programming',
      icon: 'Zap',
      color: '#EF4444'
    },
    tags: ['dynamic-programming'],
    submissionCount: 2987,
    solutionCount: 1,
    userProgress: null,
    order: 8,
    leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. Find how many distinct ways you can climb to the top.',
    examples: [
      { input: 'n = 2', output: '2', explanation: 'There are two ways: 1+1 or 2.' }
    ],
    testCases: [
      { input: { n: 2 }, output: 2 },
      { input: { n: 3 }, output: 3 }
    ]
  },
  {
    id: '9',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'MEDIUM',
    category: {
      id: '1',
      name: 'Arrays',
      icon: 'BarChart3',
      color: '#3B82F6'
    },
    tags: ['string', 'sliding-window'],
    submissionCount: 4567,
    solutionCount: 2,
    userProgress: null,
    order: 9,
    leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with length 3.'
      }
    ],
    testCases: [
      { input: { s: 'abcabcbb' }, output: 3 },
      { input: { s: 'bbbbb' }, output: 1 },
      { input: { s: 'pwwkew' }, output: 3 }
    ]
  },
  {
    id: '10',
    title: 'Implement Queue using Stacks',
    slug: 'implement-queue-using-stacks',
    difficulty: 'EASY',
    category: {
      id: '7',
      name: 'Stack',
      icon: 'Layers',
      color: '#F59E0B'
    },
    tags: ['stack', 'design'],
    submissionCount: 1793,
    solutionCount: 1,
    userProgress: null,
    order: 10,
    leetcodeUrl: 'https://leetcode.com/problems/implement-queue-using-stacks/',
    description: 'Implement a first in first out (FIFO) queue using only two stacks.',
    examples: [
      {
        input: '["MyQueue", "push", "push", "peek", "pop", "empty"] → [[], [1], [2], [], [], []]',
        output: '[null, null, null, 1, 1, false]',
        explanation: 'Queue sequence behaves as expected.'
      }
    ],
    testCases: [
      { input: { operations: ["push", "push", "peek", "pop", "empty"], values: [1, 2, null, null, null] },
        output: [null, null, 1, 1, false] }
    ]
  },
  {
    id: '11',
    title: 'Number of Islands',
    slug: 'number-of-islands',
    difficulty: 'MEDIUM',
    category: {
      id: '4',
      name: 'Graphs',
      icon: 'Network',
      color: '#8B5CF6'
    },
    tags: ['dfs', 'bfs', 'graph'],
    submissionCount: 2789,
    solutionCount: 1,
    userProgress: null,
    order: 11,
    leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
    description: 'Given an m x n 2D binary grid grid which represents a map of "1"s (land) and "0"s (water), return the number of islands.',
    examples: [
      {
        input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: '3',
        explanation: 'There are 3 separate islands.'
      }
    ],
    testCases: [
      { input: { grid: [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]] }, output: 3 }
    ]
  },
  {
    id: '7',
    title: 'Move Zeroes',
    slug: 'move-zeroes',
    difficulty: 'EASY',
    category: {
      id: '1',
      name: 'Arrays',
      icon: 'BarChart3',
      color: '#3B82F6'
    },
    tags: ['array', 'two-pointers'],
    submissionCount: 1987,
    solutionCount: 1,
    userProgress: null,
    order: 7,
    leetcodeUrl: 'https://leetcode.com/problems/move-zeroes/',
    description: 'Given an integer array nums, move all 0\'s to the end of it while maintaining the relative order of the non-zero elements.',
    examples: [
      {
        input: 'nums = [0,1,0,3,12]',
        output: '[1,3,12,0,0]',
        explanation: 'All zeros are moved to the end while non-zero elements remain in their original order.'
      }
    ],
    testCases: [
      {
        input: { nums: [0, 1, 0, 3, 12] },
        output: [1, 3, 12, 0, 0]
      },
      {
        input: { nums: [0, 0, 1] },
        output: [1, 0, 0]
      }
    ]
  },
  {
    id: '8',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'MEDIUM',
    category: {
      id: '5',
      name: 'Dynamic Programming',
      icon: 'Zap',
      color: '#EF4444'
    },
    tags: ['string', 'sliding-window', 'hash-table'],
    submissionCount: 2675,
    solutionCount: 1,
    userProgress: null,
    order: 8,
    leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      }
    ],
    testCases: [
      {
        input: { s: "abcabcbb" },
        output: 3
      },
      {
        input: { s: "bbbbb" },
        output: 1
      },
      {
        input: { s: "pwwkew" },
        output: 3
      }
    ]
  },
  {
    id: '9',
    title: 'Add Two Numbers',
    slug: 'add-two-numbers',
    difficulty: 'MEDIUM',
    category: {
      id: '2',
      name: 'Linked Lists',
      icon: 'Link',
      color: '#10B981'
    },
    tags: ['linked-list', 'math'],
    submissionCount: 3542,
    solutionCount: 1,
    userProgress: null,
    order: 9,
    leetcodeUrl: 'https://leetcode.com/problems/add-two-numbers/',
    description: 'You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.',
    examples: [
      {
        input: 'l1 = [2,4,3], l2 = [5,6,4]',
        output: '[7,0,8]',
        explanation: '342 + 465 = 807.'
      }
    ],
    testCases: [
      {
        input: { l1: [2, 4, 3], l2: [5, 6, 4] },
        output: [7, 0, 8]
      },
      {
        input: { l1: [0], l2: [0] },
        output: [0]
      }
    ]
  },
  {
    id: '10',
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    difficulty: 'EASY',
    category: {
      id: '5',
      name: 'Dynamic Programming',
      icon: 'Zap',
      color: '#EF4444'
    },
    tags: ['dynamic-programming', 'math'],
    submissionCount: 2987,
    solutionCount: 1,
    userProgress: null,
    order: 10,
    leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation: 'There are two ways: (1 + 1) and (2).'
      },
      {
        input: 'n = 3',
        output: '3',
        explanation: 'There are three ways: (1+1+1), (1+2), (2+1).'
      }
    ],
    testCases: [
      {
        input: { n: 2 },
        output: 2
      },
      {
        input: { n: 3 },
        output: 3
      },
      {
        input: { n: 5 },
        output: 8
      }
    ]
  },
  {
    id: '11',
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    difficulty: 'EASY',
    category: {
      id: '1',
      name: 'Arrays',
      icon: 'BarChart3',
      color: '#3B82F6'
    },
    tags: ['array', 'dynamic-programming'],
    submissionCount: 3321,
    solutionCount: 1,
    userProgress: null,
    order: 11,
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    description: 'You are given an array prices where prices[i] is the price of a stock on the ith day. You want to maximize your profit by choosing a day to buy and a day to sell. Return the maximum profit you can achieve.',
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2 (price=1) and sell on day 5 (price=6), profit = 6-1 = 5.'
      }
    ],
    testCases: [
      {
        input: { prices: [7, 1, 5, 3, 6, 4] },
        output: 5
      },
      {
        input: { prices: [7, 6, 4, 3, 1] },
        output: 0
      }
    ]
  },
  {
  id: '12',
  title: 'Fibonacci Number',
  slug: 'fibonacci-number',
  difficulty: 'EASY',
  category: {
    id: '5',
    name: 'Dynamic Programming',
    icon: 'Zap',
    color: '#EF4444'
  },
  tags: ['dynamic-programming', 'recursion', 'math'],
  submissionCount: 4125,
  solutionCount: 1,
  userProgress: null,
  order: 12,
  leetcodeUrl: 'https://leetcode.com/problems/fibonacci-number/',
  description: 'The Fibonacci numbers, commonly denoted F(n), form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. Given n, calculate F(n).',
  examples: [
    {
      input: 'n = 2',
      output: '1',
      explanation: 'F(2) = F(1) + F(0) = 1 + 0 = 1.'
    },
    {
      input: 'n = 4',
      output: '3',
      explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3.'
    }
  ],
  testCases: [
    {
      input: { n: 0 },
      output: 0
    },
    {
      input: { n: 1 },
      output: 1
    },
    {
      input: { n: 5 },
      output: 5
    },
    {
      input: { n: 10 },
      output: 55
    }
  ]
}


];

const mockCategories = [
  {
    id: '1',
    name: 'Arrays',
    description: 'Array manipulation and algorithms',
    icon: 'BarChart3',
    color: '#3B82F6',
    problemCount: 3,
    order: 1
  },
  {
    id: '2',
    name: 'Linked Lists',
    description: 'Linked list operations and problems',
    icon: 'Link',
    color: '#10B981',
    problemCount: 1,
    order: 2
  },
  {
    id: '3',
    name: 'Trees',
    description: 'Binary trees, BST, and tree algorithms',
    icon: 'GitBranch',
    color: '#F59E0B',
    problemCount: 1,
    order: 3
  },
  {
    id: '4',
    name: 'Graphs',
    description: 'Graph algorithms and traversals',
    icon: 'Network',
    color: '#8B5CF6',
    problemCount: 0,
    order: 4
  },
  {
    id: '5',
    name: 'Dynamic Programming',
    description: 'DP problems and optimization',
    icon: 'Zap',
    color: '#EF4444',
    problemCount: 1,
    order: 5
  },
  {
    id: '6',
    name: 'Sorting & Searching',
    description: 'Sorting algorithms and search techniques',
    icon: 'Search',
    color: '#06B6D4',
    problemCount: 0,
    order: 6
  },
  {
    id: '7',
    name: 'Stack',
    description: 'Stack data structure and operations',
    icon: 'Layers',
    color: '#F59E0B',
    problemCount: 1,
    order: 7
  }
];

// Get all problems with filters
export const getProblems = async (req, res) => {
  try {
    const {
      category,
      difficulty,
      status,
      search,
      page = 1,
      limit = 20
    } = req.query;

    let filteredProblems = [...mockProblems];

    // Apply filters
    if (category) {
      filteredProblems = filteredProblems.filter(p =>
        p.category.name.toLowerCase() === category.toLowerCase()
      );
    }

    if (difficulty) {
      filteredProblems = filteredProblems.filter(p =>
        p.difficulty === difficulty.toUpperCase()
      );
    }

    if (search) {
      filteredProblems = filteredProblems.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedProblems = filteredProblems.slice(startIndex, endIndex);

    const pagination = {
      page: pageNum,
      limit: limitNum,
      total: filteredProblems.length,
      pages: Math.ceil(filteredProblems.length / limitNum)
    };

    res.json({
      problems: paginatedProblems,
      pagination
    });
  } catch (error) {
    console.error('Get problems error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get single problem by slug
export const getProblem = async (req, res) => {
  try {
    const { slug } = req.params;

    const problem = mockProblems.find(p => p.slug === slug);

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    res.json({ problem });
  } catch (error) {
    console.error('Get problem error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    res.json({ categories: mockCategories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Submit solution
export const submitSolution = async (req, res) => {
  try {
    const { slug } = req.params;
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required' });
    }

    const problem = mockProblems.find(p => p.slug === slug);
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    // Mock submission result
    const submission = {
      id: Date.now().toString(),
      problemId: problem.id,
      userId: req.userId,
      code,
      language,
      status: Math.random() > 0.3 ? 'ACCEPTED' : 'WRONG_ANSWER',
      runtime: Math.floor(Math.random() * 100) + 50,
      memory: Math.floor(Math.random() * 50) + 10,
      createdAt: new Date().toISOString()
    };

    res.json({
      message: 'Solution submitted successfully',
      submission
    });
  } catch (error) {
    console.error('Submit solution error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create new problem (admin only)
export const createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      categoryId,
      tags,
      examples,
      constraints
    } = req.body;

    // Mock creation
    const newProblem = {
      id: Date.now().toString(),
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      description,
      difficulty: difficulty.toUpperCase(),
      categoryId,
      tags: tags || [],
      examples: examples || [],
      constraints: constraints || [],
      submissionCount: 0,
      solutionCount: 0,
      createdAt: new Date().toISOString()
    };

    res.status(201).json({
      message: 'Problem created successfully',
      problem: newProblem
    });
  } catch (error) {
    console.error('Create problem error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
