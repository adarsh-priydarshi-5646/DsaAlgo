import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Arrays' },
      update: {},
      create: {
        name: 'Arrays',
        description: 'Array manipulation and algorithms',
        icon: '📊',
        color: '#3B82F6',
        order: 1
      }
    }),
    prisma.category.upsert({
      where: { name: 'Linked Lists' },
      update: {},
      create: {
        name: 'Linked Lists',
        description: 'Linked list operations and problems',
        icon: '🔗',
        color: '#10B981',
        order: 2
      }
    }),
    prisma.category.upsert({
      where: { name: 'Trees' },
      update: {},
      create: {
        name: 'Trees',
        description: 'Binary trees, BST, and tree algorithms',
        icon: '🌳',
        color: '#F59E0B',
        order: 3
      }
    }),
    prisma.category.upsert({
      where: { name: 'Graphs' },
      update: {},
      create: {
        name: 'Graphs',
        description: 'Graph algorithms and traversals',
        icon: '🕸️',
        color: '#8B5CF6',
        order: 4
      }
    }),
    prisma.category.upsert({
      where: { name: 'Dynamic Programming' },
      update: {},
      create: {
        name: 'Dynamic Programming',
        description: 'DP problems and optimization',
        icon: '⚡',
        color: '#EF4444',
        order: 5
      }
    }),
    prisma.category.upsert({
      where: { name: 'Sorting & Searching' },
      update: {},
      create: {
        name: 'Sorting & Searching',
        description: 'Sorting algorithms and search techniques',
        icon: '🔍',
        color: '#06B6D4',
        order: 6
      }
    })
  ]);

  console.log('✅ Categories created');

  // Create sample problems
  const arrayCategory = categories.find(c => c.name === 'Arrays');
  
  const problems = await Promise.all([
    prisma.problem.upsert({
      where: { slug: 'two-sum' },
      update: {},
      create: {
        title: 'Two Sum',
        slug: 'two-sum',
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        difficulty: 'EASY',
        tags: JSON.stringify(['array', 'hash-table']),
        examples: JSON.stringify([
          {
            input: 'nums = [2,7,11,15], target = 9',
            output: '[0,1]',
            explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
          }
        ]),
        constraints: `• 2 <= nums.length <= 10^4
• -10^9 <= nums[i] <= 10^9
• -10^9 <= target <= 10^9
• Only one valid answer exists.`,
        categoryId: arrayCategory.id,
        order: 1
      }
    }),
    prisma.problem.upsert({
      where: { slug: 'reverse-array' },
      update: {},
      create: {
        title: 'Reverse Array',
        slug: 'reverse-array',
        description: `Given an array of integers, reverse the array in-place.

You must do this by modifying the input array in-place with O(1) extra memory.`,
        difficulty: 'EASY',
        tags: JSON.stringify(['array', 'two-pointers']),
        examples: JSON.stringify([
          {
            input: 'nums = [1,2,3,4,5]',
            output: '[5,4,3,2,1]',
            explanation: 'The array is reversed in-place.'
          }
        ]),
        constraints: `• 1 <= nums.length <= 10^5
• -2^31 <= nums[i] <= 2^31 - 1`,
        categoryId: arrayCategory.id,
        order: 2
      }
    })
  ]);

  console.log('✅ Problems created');

  // Create solutions for problems
  const twoSumProblem = problems.find(p => p.slug === 'two-sum');
  
  await prisma.solution.create({
    data: {
      language: 'javascript',
      code: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
      explanation: 'Use a hash map to store numbers and their indices. For each number, check if its complement exists in the map.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      isOptimal: true,
      problemId: twoSumProblem.id
    }
  });

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  await prisma.user.upsert({
    where: { email: 'admin@dsaalgo.com' },
    update: {},
    create: {
      email: 'admin@dsaalgo.com',
      username: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      password: hashedPassword,
      role: 'ADMIN',
      isVerified: true
    }
  });

  console.log('✅ Admin user created');
  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
