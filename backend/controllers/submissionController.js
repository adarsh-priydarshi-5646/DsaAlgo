import prisma from '../config/database.js';

// Submit solution for a problem
export const submitSolution = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;
    const userId = req.userId;


    // Validate input
    if (!problemId || !code || !language) {
      return res.status(400).json({ 
        error: 'Problem ID, code, and language are required' 
      });
    }

    // Check if problem exists
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
      include: { testCases: true }
    });

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    // Simple code execution simulation
    // In real implementation, this would run the code against test cases
    const isCorrect = await simulateCodeExecution(code, problem.testCases);
    const status = isCorrect ? 'ACCEPTED' : 'WRONG_ANSWER';
    const executionTime = Math.floor(Math.random() * 1000) + 100; // Random execution time

    // Create submission record
    const submission = await prisma.submission.create({
      data: {
        userId,
        problemId,
        code,
        language,
        status,
        executionTime,
        memoryUsed: Math.floor(Math.random() * 50) + 10, // Random memory usage
      },
      include: {
        problem: {
          select: {
            title: true,
            difficulty: true
          }
        },
        user: {
          select: {
            username: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    // If accepted, update user stats
    if (status === 'ACCEPTED') {
      await updateUserStats(userId, problem.difficulty);
      
      // Add achievement notification
      await addAchievementNotification(userId, problem);
    }


    res.json({
      success: true,
      submission: {
        id: submission.id,
        status: submission.status,
        executionTime: submission.executionTime,
        memoryUsed: submission.memoryUsed,
        createdAt: submission.createdAt
      },
      message: status === 'ACCEPTED' ? 'Solution accepted! 🎉' : 'Wrong answer. Try again! 💪'
    });

  } catch (error) {
    console.error('Submit solution error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Simulate code execution (simplified)
const simulateCodeExecution = async (code, testCases) => {
  try {
    // Simple heuristics to determine if code might be correct
    const codeLength = code.length;
    const hasLoops = /for|while|forEach/.test(code);
    const hasConditions = /if|else|switch/.test(code);
    const hasReturn = /return/.test(code);
    
    // Basic scoring system
    let score = 0;
    if (codeLength > 50) score += 20;
    if (hasLoops) score += 30;
    if (hasConditions) score += 25;
    if (hasReturn) score += 25;
    
    // Random factor to simulate test case results
    const randomFactor = Math.random() * 100;
    
    // Higher chance of success if code looks more complete
    return (score + randomFactor) > 70;
  } catch (error) {
    return false;
  }
};

// Update user statistics after successful submission
const updateUserStats = async (userId, difficulty) => {
  try {
    // Get current user stats
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        problemsSolved: true,
        totalSubmissions: true,
        points: true
      }
    });

    // Calculate points based on difficulty
    const pointsMap = {
      'EASY': 10,
      'MEDIUM': 25,
      'HARD': 50
    };
    const points = pointsMap[difficulty] || 10;

    // Update user stats
    await prisma.user.update({
      where: { id: userId },
      data: {
        problemsSolved: (user?.problemsSolved || 0) + 1,
        totalSubmissions: (user?.totalSubmissions || 0) + 1,
        points: (user?.points || 0) + points
      }
    });

  } catch (error) {
    console.error('Error updating user stats:', error);
  }
};

// Add achievement notification
const addAchievementNotification = async (userId, problem) => {
  try {
    // This would integrate with notification system
    // Achievement notification would be created here
    
    // In future, create notification record in database
    // await prisma.notification.create({
    //   data: {
    //     userId,
    //     type: 'ACHIEVEMENT',
    //     title: 'Problem Solved! 🎉',
    //     message: `You successfully solved "${problem.title}"`,
    //     data: { problemId: problem.id, difficulty: problem.difficulty }
    //   }
    // });
  } catch (error) {
    console.error('Error adding achievement notification:', error);
  }
};

// Get user submissions
export const getUserSubmissions = async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 20, status, problemId } = req.query;

    const where = { userId };
    if (status) where.status = status;
    if (problemId) where.problemId = problemId;

    const submissions = await prisma.submission.findMany({
      where,
      include: {
        problem: {
          select: {
            title: true,
            difficulty: true,
            slug: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit)
    });

    const total = await prisma.submission.count({ where });

    res.json({
      submissions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get user submissions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get submission details
export const getSubmissionDetails = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const userId = req.userId;

    const submission = await prisma.submission.findFirst({
      where: { 
        id: submissionId,
        userId // Ensure user can only see their own submissions
      },
      include: {
        problem: {
          select: {
            title: true,
            difficulty: true,
            description: true
          }
        }
      }
    });

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json({ submission });
  } catch (error) {
    console.error('Get submission details error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get problem statistics
export const getProblemStats = async (req, res) => {
  try {
    const { problemId } = req.params;

    const stats = await prisma.submission.groupBy({
      by: ['status'],
      where: { problemId },
      _count: { status: true }
    });

    const totalSubmissions = await prisma.submission.count({
      where: { problemId }
    });

    const acceptedSubmissions = stats.find(s => s.status === 'ACCEPTED')?._count?.status || 0;
    const acceptanceRate = totalSubmissions > 0 ? (acceptedSubmissions / totalSubmissions * 100).toFixed(1) : 0;

    res.json({
      totalSubmissions,
      acceptedSubmissions,
      acceptanceRate: parseFloat(acceptanceRate),
      statusBreakdown: stats
    });
  } catch (error) {
    console.error('Get problem stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
