import prisma from '../config/database.js';

// Get user progress
export const getProgress = async (req, res) => {
  try {
    const userId = req.userId;

    // Mock progress data
    const mockProgress = {
      summary: {
        totalSolved: Math.floor(Math.random() * 50) + 20,
        totalAttempted: Math.floor(Math.random() * 80) + 40,
        completionRate: Math.floor(Math.random() * 40) + 60
      },
      recentActivity: [
        {
          id: '1',
          problem: {
            title: 'Two Sum',
            difficulty: 'EASY',
            category: { name: 'Arrays' }
          },
          status: 'SOLVED',
          attempts: 2,
          lastAttempt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '2',
          problem: {
            title: 'Reverse Array',
            difficulty: 'EASY',
            category: { name: 'Arrays' }
          },
          status: 'ATTEMPTED',
          attempts: 1,
          lastAttempt: new Date(Date.now() - 172800000).toISOString()
        }
      ]
    };

    res.json(mockProgress);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get problem-specific progress
export const getProblemProgress = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.userId;

    // Mock problem progress
    const mockProblemProgress = {
      status: Math.random() > 0.5 ? 'SOLVED' : 'ATTEMPTED',
      attempts: Math.floor(Math.random() * 5) + 1,
      bestTime: Math.floor(Math.random() * 100) + 50,
      lastAttempt: new Date().toISOString()
    };

    res.json(mockProblemProgress);
  } catch (error) {
    console.error('Get problem progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update problem progress
export const updateProgress = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.userId;
    const { status, runtime } = req.body;

    // Mock update
    const updatedProgress = {
      status,
      runtime,
      updatedAt: new Date().toISOString()
    };

    res.json({
      message: 'Progress updated successfully',
      progress: updatedProgress
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
