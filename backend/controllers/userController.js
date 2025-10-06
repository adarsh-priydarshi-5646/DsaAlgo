import prisma from '../config/database.js';

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const { username } = req.params;

    // Try to get real user first, fallback to mock data
    try {
      const user = await prisma.user.findUnique({
        where: { username },
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          email: true,
          avatar: true,
          role: true,
          createdAt: true
        }
      });

      if (user) {
        return res.json({ user });
      }
    } catch (dbError) {
      console.log('Database not available, using mock data');
    }

    // Return mock user data
    const mockUser = {
      id: '1',
      username: username,
      firstName: 'John',
      lastName: 'Doe',
      email: `${username}@example.com`,
      avatar: null,
      role: 'USER',
      createdAt: new Date().toISOString()
    };

    res.json({ user: mockUser });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user statistics
export const getStats = async (req, res) => {
  try {
    const { username } = req.params;

    // Mock statistics data
    const mockStats = {
      problemsSolved: Math.floor(Math.random() * 100) + 20,
      problemsAttempted: Math.floor(Math.random() * 150) + 50,
      totalSubmissions: Math.floor(Math.random() * 200) + 100,
      completionRate: Math.floor(Math.random() * 40) + 60,
      difficultyBreakdown: {
        EASY: Math.floor(Math.random() * 30) + 10,
        MEDIUM: Math.floor(Math.random() * 25) + 5,
        HARD: Math.floor(Math.random() * 15) + 2
      },
      recentSubmissions: [
        {
          id: '1',
          problem: {
            title: 'Two Sum',
            difficulty: 'EASY',
            category: { name: 'Arrays' }
          },
          status: 'ACCEPTED',
          language: 'javascript',
          runtime: 85,
          createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        },
        {
          id: '2',
          problem: {
            title: 'Reverse Array',
            difficulty: 'EASY',
            category: { name: 'Arrays' }
          },
          status: 'ACCEPTED',
          language: 'python',
          runtime: 92,
          createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
        }
      ],
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
        }
      ]
    };

    res.json({ stats: mockStats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
