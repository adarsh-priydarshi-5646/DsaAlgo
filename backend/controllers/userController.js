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

    const user = await prisma.user.findUnique({ where: { username }, select: { id: true } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = user.id;

    const [totalSubmissions, solvedSubmissions, recentSubmissionsRaw, attemptedListRaw] = await Promise.all([
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

    // Difficulty breakdown for accepted unique problems
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

    // Streak: count consecutive days with at least one submission up to today
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
      if (daysSet.has(key)) {
        streak += 1;
        day.setDate(day.getDate() - 1);
      } else {
        break;
      }
    }

    // Points: weight per unique accepted problem by difficulty
    const points = Array.from(uniqueAccepted.values()).reduce((acc, diff) => {
      if (diff === 'EASY') return acc + 10;
      if (diff === 'MEDIUM') return acc + 20;
      if (diff === 'HARD') return acc + 30;
      return acc;
    }, 0);

    // Rank by total accepted unique problems compared to others
    const usersCounts = await prisma.user.findMany({
      select: { id: true }
    });
    let ranks = [];
    for (const u of usersCounts) {
      const accepted = await prisma.submission.findMany({
        where: { userId: u.id, status: 'ACCEPTED' },
        select: { problemId: true }
      });
      const unique = new Set(accepted.map(a => a.problemId)).size;
      ranks.push({ id: u.id, solved: unique });
    }
    ranks.sort((a,b) => b.solved - a.solved);
    const rankIndex = ranks.findIndex(r => r.id === userId);
    const rank = rankIndex >= 0 ? rankIndex + 1 : null;

    const successRate = problemsAttempted > 0 ? (solvedSubmissions / problemsAttempted) * 100 : 0;

    // Build 30-day activity series
    const start = new Date();
    start.setDate(start.getDate() - 29);
    const submissionsLast30 = await prisma.submission.findMany({
      where: { userId, createdAt: { gte: start } },
      select: { createdAt: true, status: true, language: true }
    });
    const byDay = new Map();
    const langMap = new Map();
    for (const s of submissionsLast30) {
      const d = new Date(s.createdAt).toISOString().slice(0,10);
      const rec = byDay.get(d) || { date: d, submissions: 0, accepted: 0 };
      rec.submissions += 1;
      if (s.status === 'ACCEPTED') rec.accepted += 1;
      byDay.set(d, rec);
      if (s.language) langMap.set(s.language, (langMap.get(s.language) || 0) + 1);
    }
    const activitySeries = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = d.toISOString().slice(0,10);
      activitySeries.push(byDay.get(key) || { date: key, submissions: 0, accepted: 0 });
    }

    // Language distribution
    const totalLang = Array.from(langMap.values()).reduce((a,b)=>a+b,0);
    const languageDistribution = Array.from(langMap.entries()).map(([name, count]) => ({ name, percentage: totalLang ? Math.round((count/totalLang)*100) : 0 }));

    // Achievements
    const achievements = await prisma.achievement.findMany({ where: { userId }, orderBy: { earnedAt: 'desc' } });

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
      recentSubmissions: recentSubmissionsRaw,
      activitySeries,
      languageDistribution,
      achievements
    };

    res.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export user data (JSON)
export const exportUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true, email: true, username: true, firstName: true, lastName: true,
        avatar: true, createdAt: true
      }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const [submissions, achievements] = await Promise.all([
      prisma.submission.findMany({
        where: { userId: id },
        select: {
          id: true, status: true, language: true, runtime: true, createdAt: true,
          problem: { select: { id: true, title: true, difficulty: true } }
        }
      }),
      prisma.achievement.findMany({ where: { userId: id } })
    ]);

    const solvedSet = new Set(submissions.filter(s => s.status === 'ACCEPTED').map(s => s.problem.id));
    const attemptedSet = new Set(submissions.map(s => s.problem.id));

    const exportData = {
      profile: user,
      statistics: {
        problemsSolved: solvedSet.size,
        problemsAttempted: attemptedSet.size,
        totalSubmissions: submissions.length
      },
      submissions,
      achievements
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="user_${user.username}_export.json"`);
    return res.status(200).send(JSON.stringify(exportData, null, 2));
  } catch (error) {
    console.error('Export user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
