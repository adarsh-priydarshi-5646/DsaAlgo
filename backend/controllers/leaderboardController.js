import prisma from '../config/database.js';

// Get real leaderboard statistics from database
const getLeaderboardStats = async () => {
  try {
    // Get total users count
    const totalUsers = await prisma.user.count();
    
    // Get total submissions count
    const totalSubmissions = await prisma.submission.count();
    
    // Get total problems solved (unique problem-user combinations with ACCEPTED status)
    const totalProblemsSolved = await prisma.submission.count({
      where: {
        status: 'ACCEPTED'
      },
      distinct: ['userId', 'problemId']
    });
    
    // Get submissions from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentSubmissions = await prisma.submission.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    });
    
    // Get active users (users who submitted in last 24 hours)
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    const activeUsers = await prisma.user.count({
      where: {
        submissions: {
          some: {
            createdAt: {
              gte: oneDayAgo
            }
          }
        }
      }
    });
    
    return {
      totalUsers,
      totalSubmissions,
      totalProblemsSolved,
      recentSubmissions,
      activeUsers
    };
  } catch (error) {
    console.error('Error getting leaderboard stats:', error);
    // Return fallback data if database query fails
    return {
      totalUsers: 0,
      totalSubmissions: 0,
      totalProblemsSolved: 0,
      recentSubmissions: 0,
      activeUsers: 0
    };
  }
};

// Get real leaderboard data from database
const getRealLeaderboardData = async (type = 'problems_solved', limit = 50) => {
  try {
    let leaderboardData = [];
    
    if (type === 'problems_solved') {
      // Get users ranked by problems solved
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
          submissions: {
            where: {
              status: 'ACCEPTED'
            },
            distinct: ['problemId'],
            select: {
              problemId: true
            }
          },
          _count: {
            select: {
              submissions: {
                where: {
                  status: 'ACCEPTED'
                }
              }
            }
          }
        },
        take: limit
      });
      
      leaderboardData = users.map((user, index) => ({
        rank: index + 1,
        user: {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar
        },
        score: user.submissions.length, // Unique problems solved
        metric: 'problems'
      })).sort((a, b) => b.score - a.score);
      
    } else if (type === 'submissions') {
      // Get users ranked by total submissions
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
          _count: {
            select: {
              submissions: true
            }
          }
        },
        orderBy: {
          submissions: {
            _count: 'desc'
          }
        },
        take: limit
      });
      
      leaderboardData = users.map((user, index) => ({
        rank: index + 1,
        user: {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar
        },
        score: user._count.submissions,
        metric: 'submissions'
      }));
    }
    
    // Re-rank based on score
    leaderboardData.sort((a, b) => b.score - a.score);
    leaderboardData.forEach((item, index) => {
      item.rank = index + 1;
    });
    
    return leaderboardData;
  } catch (error) {
    console.error('Error getting real leaderboard data:', error);
    return []; // Return empty array if database query fails
  }
};

// Get leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const { type = 'problems_solved', timeframe = 'all_time', limit = 50 } = req.query;

    
    // Get real leaderboard data
    const leaderboard = await getRealLeaderboardData(type, parseInt(limit));
    
    // Get real statistics
    const stats = await getLeaderboardStats();
    
    // Create metadata with real stats
    const metadata = {
      totalUsers: stats.totalUsers,
      totalProblems: stats.totalProblemsSolved,
      totalSubmissions: stats.totalSubmissions,
      recentSubmissions: stats.recentSubmissions,
      activeUsers: stats.activeUsers,
      type,
      timeframe
    };


    res.json({ leaderboard, metadata });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user rank
export const getUserRank = async (req, res) => {
  try {
    const { username } = req.params;

    try {
      // Get user with submission count
      const user = await prisma.user.findUnique({
        where: { username },
        select: {
          id: true,
          username: true,
          _count: {
            select: {
              submissions: true
            }
          }
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Get users with higher submission counts to calculate rank
      const usersWithHigherScores = await prisma.user.count({
        where: {
          submissions: {
            _count: {
              gt: user._count.submissions
            }
          }
        }
      });

      const totalUsers = await prisma.user.count();
      const rank = usersWithHigherScores + 1;

      res.json({
        rank,
        score: user._count.submissions,
        totalUsers
      });
    } catch (dbError) {
      
      // Fallback to mock data
      const mockUser = mockLeaderboardData.find(u => u.user.username === username);
      if (mockUser) {
        res.json({
          rank: mockUser.rank,
          score: mockUser.score,
          totalUsers: mockLeaderboardData.length
        });
      } else {
        res.json({
          rank: 999,
          score: 0,
          totalUsers: 1234
        });
      }
    }
  } catch (error) {
    console.error('Get user rank error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
