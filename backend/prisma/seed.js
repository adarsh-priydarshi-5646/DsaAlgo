import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  {
    name: 'Arrays',
    description: 'Array manipulation and algorithms',
    icon: 'BarChart3',
    color: '#3B82F6',
    order: 1
  },
  {
    name: 'Linked Lists',
    description: 'Linked list operations and problems',
    icon: 'Link',
    color: '#10B981',
    order: 2
  },
  {
    name: 'Trees',
    description: 'Binary trees, BST, and tree algorithms',
    icon: 'GitBranch',
    color: '#F59E0B',
    order: 3
  },
  {
    name: 'Graphs',
    description: 'Graph algorithms and traversals',
    icon: 'Network',
    color: '#8B5CF6',
    order: 4
  },
  {
    name: 'Dynamic Programming',
    description: 'DP problems and optimization',
    icon: 'Zap',
    color: '#EF4444',
    order: 5
  },
  {
    name: 'Sorting & Searching',
    description: 'Sorting algorithms and search techniques',
    icon: 'Search',
    color: '#06B6D4',
    order: 6
  },
  {
    name: 'Stack',
    description: 'Stack data structure and operations',
    icon: 'Layers',
    color: '#F59E0B',
    order: 7
  }
];

const problems = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'EASY',
    categoryName: 'Arrays',
    tags: 'array,hash-table',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: JSON.stringify([
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ]),
    order: 1,
    testCases: [
      { input: JSON.stringify({ nums: [2, 7, 11, 15], target: 9 }), output: JSON.stringify([0, 1]), isSample: true, order: 1 },
      { input: JSON.stringify({ nums: [3, 2, 4], target: 6 }), output: JSON.stringify([1, 2]), isSample: true, order: 2 },
      { input: JSON.stringify({ nums: [3, 3], target: 6 }), output: JSON.stringify([0, 1]), isSample: false, order: 3 }
    ]
  },
  {
    title: 'Reverse Array',
    slug: 'reverse-array',
    difficulty: 'EASY',
    categoryName: 'Arrays',
    tags: 'array,two-pointers',
    description: 'Write a function to reverse an array in-place.',
    examples: JSON.stringify([
      {
        input: '[1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]',
        explanation: 'The array is reversed in-place.'
      }
    ]),
    order: 2,
    testCases: [
      { input: JSON.stringify({ arr: [1, 2, 3, 4, 5] }), output: JSON.stringify([5, 4, 3, 2, 1]), isSample: true, order: 1 },
      { input: JSON.stringify({ arr: ['a', 'b', 'c'] }), output: JSON.stringify(['c', 'b', 'a']), isSample: true, order: 2 }
    ]
  },
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'EASY',
    categoryName: 'Stack',
    tags: 'stack,string',
    description: 'Given a string s containing just the characters (, ), {, }, [ and ], determine if the input string is valid.',
    examples: JSON.stringify([
      { input: 's = "()"', output: 'true', explanation: 'The parentheses are properly matched.' },
      { input: 's = "()[]{}"', output: 'true', explanation: 'All brackets are properly matched.' }
    ]),
    order: 3,
    testCases: [
      { input: JSON.stringify({ s: "()" }), output: JSON.stringify(true), isSample: true, order: 1 },
      { input: JSON.stringify({ s: "()[]{}" }), output: JSON.stringify(true), isSample: true, order: 2 },
      { input: JSON.stringify({ s: "(]" }), output: JSON.stringify(false), isSample: false, order: 3 }
    ]
  },
  {
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    difficulty: 'MEDIUM',
    categoryName: 'Dynamic Programming',
    tags: 'array,dynamic-programming',
    description: 'Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.',
    examples: JSON.stringify([
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: '[4,-1,2,1] has the largest sum = 6.'
      }
    ]),
    order: 4,
    testCases: [
      { input: JSON.stringify({ nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }), output: JSON.stringify(6), isSample: true, order: 1 },
      { input: JSON.stringify({ nums: [1] }), output: JSON.stringify(1), isSample: true, order: 2 },
      { input: JSON.stringify({ nums: [5, 4, -1, 7, 8] }), output: JSON.stringify(23), isSample: false, order: 3 }
    ]
  },
  {
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    difficulty: 'EASY',
    categoryName: 'Dynamic Programming',
    tags: 'dynamic-programming',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. Find how many distinct ways you can climb to the top.',
    examples: JSON.stringify([
      { input: 'n = 2', output: '2', explanation: 'There are two ways: 1+1 or 2.' }
    ]),
    order: 5,
    testCases: [
      { input: JSON.stringify({ n: 2 }), output: JSON.stringify(2), isSample: true, order: 1 },
      { input: JSON.stringify({ n: 3 }), output: JSON.stringify(3), isSample: true, order: 2 },
      { input: JSON.stringify({ n: 5 }), output: JSON.stringify(8), isSample: false, order: 3 }
    ]
  }
];

async function main() {
  console.log('Starting database seed...');

  console.log('Cleaning existing data...');
  await prisma.testCase.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.solution.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.problem.deleteMany();
  await prisma.category.deleteMany();

  console.log('Creating categories...');
  const createdCategories = {};
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    createdCategories[cat.name] = created;
    console.log(`Created category: ${cat.name}`);
  }

  console.log('Creating problems with test cases...');
  for (const prob of problems) {
    const { categoryName, testCases, ...problemData } = prob;
    const category = createdCategories[categoryName];
    
    const problem = await prisma.problem.create({
      data: {
        ...problemData,
        categoryId: category.id,
        testCases: {
          create: testCases
        }
      }
    });
    
    console.log(`Created problem: ${problem.title} with ${testCases.length} test cases`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
