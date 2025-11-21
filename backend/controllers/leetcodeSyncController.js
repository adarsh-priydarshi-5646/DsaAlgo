import prisma from '../config/database.js';
import { fetchAllProblems, fetchProblemDetails, parseProblemContent } from '../services/leetcodeService.js';

export const syncLeetCodeProblems = async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    
    console.log('Fetching problems from LeetCode...');
    const leetcodeData = await fetchAllProblems(parseInt(limit));
    
    let syncedCount = 0;
    let errorCount = 0;

    for (const problem of leetcodeData.questions) {
      try {
        if (problem.paidOnly) continue;

        const details = await fetchProblemDetails(problem.titleSlug);
        const parsedProblem = parseProblemContent(details);

        const category = await getOrCreateCategory(parsedProblem.topicTags[0] || 'General');

        const existingProblem = await prisma.problem.findUnique({
          where: { slug: parsedProblem.slug }
        });

        if (existingProblem) {
          await prisma.problem.update({
            where: { id: existingProblem.id },
            data: {
              title: parsedProblem.title,
              description: parsedProblem.description,
              difficulty: parsedProblem.difficulty,
              tags: parsedProblem.topicTags.join(','),
              hints: JSON.stringify(parsedProblem.hints),
              examples: JSON.stringify(parsedProblem.examples),
              constraints: parsedProblem.constraints,
              isActive: true
            }
          });
        } else {
          const newProblem = await prisma.problem.create({
            data: {
              title: parsedProblem.title,
              slug: parsedProblem.slug,
              description: parsedProblem.description,
              difficulty: parsedProblem.difficulty,
              categoryId: category.id,
              tags: parsedProblem.topicTags.join(','),
              hints: JSON.stringify(parsedProblem.hints),
              examples: JSON.stringify(parsedProblem.examples),
              constraints: parsedProblem.constraints,
              order: parseInt(parsedProblem.id) || 0,
              isActive: true
            }
          });

          if (parsedProblem.examples && parsedProblem.examples.length > 0) {
            await prisma.testCase.createMany({
              data: parsedProblem.examples.map((example, idx) => ({
                problemId: newProblem.id,
                input: example.input,
                output: example.output,
                isSample: true,
                isHidden: false,
                explanation: example.explanation || '',
                order: idx + 1
              }))
            });
          }
        }

        syncedCount++;
        console.log(`Synced: ${parsedProblem.title}`);

        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.error(`Error syncing ${problem.title}:`, error.message);
        errorCount++;
      }
    }

    res.json({
      success: true,
      message: 'LeetCode problems synced successfully',
      synced: syncedCount,
      errors: errorCount,
      total: leetcodeData.total
    });

  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ 
      error: 'Failed to sync problems',
      details: error.message 
    });
  }
};

async function getOrCreateCategory(topicName) {
  const categoryMap = {
    'Array': { name: 'Arrays', icon: 'BarChart3', color: '#3B82F6' },
    'String': { name: 'Strings', icon: 'Type', color: '#10B981' },
    'Linked List': { name: 'Linked Lists', icon: 'Link', color: '#10B981' },
    'Tree': { name: 'Trees', icon: 'GitBranch', color: '#F59E0B' },
    'Binary Tree': { name: 'Trees', icon: 'GitBranch', color: '#F59E0B' },
    'Graph': { name: 'Graphs', icon: 'Network', color: '#8B5CF6' },
    'Dynamic Programming': { name: 'Dynamic Programming', icon: 'Zap', color: '#EF4444' },
    'Stack': { name: 'Stack', icon: 'Layers', color: '#F59E0B' },
    'Queue': { name: 'Queue', icon: 'Layers', color: '#F59E0B' },
    'Hash Table': { name: 'Hash Table', icon: 'Hash', color: '#06B6D4' },
    'Binary Search': { name: 'Sorting & Searching', icon: 'Search', color: '#06B6D4' }
  };

  const categoryData = categoryMap[topicName] || { 
    name: topicName, 
    icon: 'Code', 
    color: '#6B7280' 
  };

  let category = await prisma.category.findFirst({
    where: { name: categoryData.name }
  });

  if (!category) {
    const maxOrder = await prisma.category.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true }
    });

    category = await prisma.category.create({
      data: {
        name: categoryData.name,
        description: `${categoryData.name} problems and algorithms`,
        icon: categoryData.icon,
        color: categoryData.color,
        order: (maxOrder?.order || 0) + 1
      }
    });
  }

  return category;
}
