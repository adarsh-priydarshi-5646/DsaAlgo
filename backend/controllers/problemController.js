import prisma from '../config/database.js';

// Mock data for development
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
      {
        input: { nums: [2, 7, 11, 15], target: 9 },
        output: [0, 1]
      },
      {
        input: { nums: [3, 2, 4], target: 6 },
        output: [1, 2]
      },
      {
        input: { nums: [3, 3], target: 6 },
        output: [0, 1]
      }
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
      {
        input: { arr: [1, 2, 3, 4, 5] },
        output: [5, 4, 3, 2, 1]
      },
      {
        input: { arr: ['a', 'b', 'c'] },
        output: ['c', 'b', 'a']
      }
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
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    examples: [
      {
        input: 's = "()"',
        output: 'true',
        explanation: 'The parentheses are properly matched.'
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
        explanation: 'All brackets are properly matched.'
      }
    ],
    testCases: [
      {
        input: { s: "()" },
        output: true
      },
      {
        input: { s: "()[]{}" },
        output: true
      },
      {
        input: { s: "(]" },
        output: false
      }
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
    description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list.',
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]',
        explanation: 'The merged list is sorted.'
      }
    ],
    testCases: [
      {
        input: { list1: [1, 2, 4], list2: [1, 3, 4] },
        output: [1, 1, 2, 3, 4, 4]
      }
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
    description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: '[4,-1,2,1] has the largest sum = 6.'
      }
    ],
    testCases: [
      {
        input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
        output: 6
      },
      {
        input: { nums: [1] },
        output: 1
      },
      {
        input: { nums: [5, 4, -1, 7, 8] },
        output: 23
      }
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
    description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
    examples: [
      {
        input: 'root = [1,null,2,3]',
        output: '[1,3,2]',
        explanation: 'Inorder traversal: left, root, right.'
      }
    ],
    testCases: [
      {
        input: { root: [1, null, 2, 3] },
        output: [1, 3, 2]
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
