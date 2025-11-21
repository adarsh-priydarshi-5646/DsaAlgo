import prisma from '../config/database.js';

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

    const userId = req.userId;
    const where = { isActive: true };

    if (category) {
      where.category = {
        name: { equals: category, mode: 'insensitive' }
      };
    }

    if (difficulty) {
      where.difficulty = difficulty.toUpperCase();
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { tags: { contains: search, mode: 'insensitive' } }
      ];
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [problems, total] = await Promise.all([
      prisma.problem.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              icon: true,
              color: true
            }
          },
          submissions: userId ? {
            where: {
              userId,
              status: 'ACCEPTED'
            },
            select: {
              id: true,
              status: true
            },
            take: 1
          } : false,
          _count: {
            select: {
              submissions: true
            }
          }
        },
        orderBy: { order: 'asc' },
        skip,
        take: limitNum
      }),
      prisma.problem.count({ where })
    ]);

    const problemsWithStats = problems.map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      difficulty: p.difficulty,
      category: p.category,
      tags: p.tags ? p.tags.split(',') : [],
      submissionCount: p._count.submissions,
      order: p.order,
      isSolved: userId && p.submissions && p.submissions.length > 0
    }));

    res.json({
      problems: problemsWithStats,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
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

    const problem = await prisma.problem.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
            color: true
          }
        },
        testCases: {
          where: { isSample: true },
          orderBy: { order: 'asc' }
        },
        _count: {
          select: {
            submissions: true
          }
        }
      }
    });

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const formattedProblem = {
      id: problem.id,
      title: problem.title,
      slug: problem.slug,
      description: problem.description,
      difficulty: problem.difficulty,
      category: problem.category,
      tags: problem.tags ? problem.tags.split(',') : [],
      examples: problem.examples ? JSON.parse(problem.examples) : [],
      hints: problem.hints ? JSON.parse(problem.hints) : [],
      constraints: problem.constraints,
      testCases: problem.testCases.map(tc => ({
        input: tc.input,
        output: tc.output,
        explanation: tc.explanation
      })),
      submissionCount: problem._count.submissions
    };

    res.json({ problem: formattedProblem });
  } catch (error) {
    console.error('Get problem error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: {
            problems: true
          }
        }
      }
    });

    const formattedCategories = categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      icon: cat.icon,
      color: cat.color,
      problemCount: cat._count.problems,
      order: cat.order
    }));

    res.json({ categories: formattedCategories });
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

    const problem = await prisma.problem.findUnique({
      where: { slug },
      include: {
        testCases: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    res.json({
      message: 'Use /api/submissions endpoint to run code against test cases',
      problemId: problem.id,
      totalTests: problem.testCases.length
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
