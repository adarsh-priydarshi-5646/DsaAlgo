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

// Get live stats for current user
export const getUserStats = async (req, res) => {
  try {
    const userId = req.userId;

    const [totalSubmissions, acceptedCount, recentSubmissionsRaw, attemptedListRaw] = await Promise.all([
      prisma.submission.count({ where: { userId } }),
      prisma.submission.count({ where: { userId, status: 'ACCEPTED' } }),
      prisma.submission.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 20,
        select: {
          id: true,
          status: true,
          language: true,
          runtime: true,
          createdAt: true,
          problem: { select: { title: true, difficulty: true } }
        }
      }),
      prisma.submission.findMany({ where: { userId }, select: { problemId: true } })
    ]);

    const problemsAttempted = new Set(attemptedListRaw.map(s => s.problemId)).size;

    const acceptedProblems = await prisma.submission.findMany({
      where: { userId, status: 'ACCEPTED' },
      select: { problemId: true, problem: { select: { difficulty: true } } }
    });
    const uniqueAccepted = new Map();
    for (const s of acceptedProblems) {
      if (!uniqueAccepted.has(s.problemId)) uniqueAccepted.set(s.problemId, s.problem.difficulty);
    }
    const difficultyBreakdown = { EASY: 0, MEDIUM: 0, HARD: 0 };
    for (const diff of uniqueAccepted.values()) {
      if (diff in difficultyBreakdown) difficultyBreakdown[diff] += 1;
    }

    const datesRaw = await prisma.submission.findMany({
      where: { userId },
      select: { createdAt: true },
      orderBy: { createdAt: 'desc' }
    });
    const daysSet = new Set(datesRaw.map(d => new Date(d.createdAt).toISOString().slice(0,10)));
    let streak = 0;
    let day = new Date();
    while (true) {
      const key = day.toISOString().slice(0,10);
      if (daysSet.has(key)) { streak += 1; day.setDate(day.getDate() - 1); } else { break; }
    }

    const points = Array.from(uniqueAccepted.values()).reduce((acc, diff) => {
      if (diff === 'EASY') return acc + 10;
      if (diff === 'MEDIUM') return acc + 20;
      if (diff === 'HARD') return acc + 30;
      return acc;
    }, 0);

    // Rank (basic, may be optimized)
    const users = await prisma.user.findMany({ select: { id: true } });
    const scores = [];
    for (const u of users) {
      const acc = await prisma.submission.findMany({ where: { userId: u.id, status: 'ACCEPTED' }, select: { problemId: true } });
      scores.push({ id: u.id, solved: new Set(acc.map(a => a.problemId)).size });
    }
    scores.sort((a,b) => b.solved - a.solved);
    const rankIndex = scores.findIndex(s => s.id === userId);
    const rank = rankIndex >= 0 ? rankIndex + 1 : null;

    const successRate = problemsAttempted > 0 ? (acceptedCount / problemsAttempted) * 100 : 0;

    const stats = {
      problemsSolved: Array.from(uniqueAccepted.keys()).length,
      problemsAttempted,
      totalSubmissions,
      successRate: Number(successRate.toFixed(2)),
      rank,
      points,
      streak,
      rate: points >= 600 ? 'Platinum' : points >= 400 ? 'Gold' : points >= 200 ? 'Silver' : 'Bronze',
      difficultyBreakdown,
      recentSubmissions: recentSubmissionsRaw
    };

    return res.json(stats);
  } catch (error) {
    console.error('Get user stats error:', error);
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
