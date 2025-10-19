import prisma from '../config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Owner login
export const ownerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;


    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    // Check for hardcoded owner credentials first
    const OWNER_EMAIL = process.env.OWNER_EMAIL || 'owner@dsaalgo.com';
    const OWNER_PASSWORD = process.env.OWNER_PASSWORD || 'owner123';

    if (email === OWNER_EMAIL && password === OWNER_PASSWORD) {
      const ownerUser = {
        id: 'owner_admin',
        email: OWNER_EMAIL,
        username: 'admin',
        firstName: 'Admin',
        lastName: 'Owner',
        role: 'OWNER',
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const token = jwt.sign(
        { userId: ownerUser.id, role: 'OWNER' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );


      return res.json({
        message: 'Owner login successful',
        user: ownerUser,
        token
      });
    }

    // Check database for owner users
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        password: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user || user.role !== 'OWNER') {
      return res.status(401).json({ error: 'Invalid owner credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid owner credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Owner login successful',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('Owner login error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Get comprehensive platform statistics
    const [
      totalUsers,
      totalProblems,
      totalSubmissions,
      acceptedSubmissions,
      totalTestCases,
      recentUsers,
      recentSubmissions,
      problemsByDifficulty,
      submissionsByStatus
    ] = await Promise.all([
      prisma.user.count(),
      prisma.problem.count(),
      prisma.submission.count(),
      prisma.submission.count({ where: { status: 'ACCEPTED' } }),
      prisma.testCase.count(),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      }),
      prisma.submission.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
          }
        }
      }),
      prisma.problem.groupBy({
        by: ['difficulty'],
        _count: { difficulty: true }
      }),
      prisma.submission.groupBy({
        by: ['status'],
        _count: { status: true }
      })
    ]);

    const acceptanceRate = totalSubmissions > 0 
      ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(1)
      : 0;

    res.json({
      overview: {
        totalUsers,
        totalProblems,
        totalSubmissions,
        acceptedSubmissions,
        acceptanceRate: parseFloat(acceptanceRate),
        totalTestCases,
        recentUsers,
        recentSubmissions
      },
      problemsByDifficulty,
      submissionsByStatus,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create new problem
export const createProblem = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      difficulty,
      category,
      tags,
      constraints,
      examples,
      testCases
    } = req.body;


    // Validation
    if (!title || !description || !difficulty) {
      return res.status(400).json({ 
        error: 'Title, description, and difficulty are required' 
      });
    }

    // Generate slug if not provided
    const problemSlug = slug || title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    const existingProblem = await prisma.problem.findUnique({
      where: { slug: problemSlug }
    });

    if (existingProblem) {
      return res.status(400).json({ 
        error: 'Problem with this slug already exists' 
      });
    }

    // Create problem
    const problem = await prisma.problem.create({
      data: {
        title,
        slug: problemSlug,
        description,
        difficulty,
        category: category || 'General',
        tags: tags || [],
        constraints: constraints || '',
        examples: examples || []
      }
    });

    // Create test cases if provided
    if (testCases && testCases.length > 0) {
      await prisma.testCase.createMany({
        data: testCases.map(tc => ({
          problemId: problem.id,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          isHidden: tc.isHidden || false
        }))
      });
    }


    res.status(201).json({
      message: 'Problem created successfully',
      problem: {
        id: problem.id,
        title: problem.title,
        slug: problem.slug,
        difficulty: problem.difficulty,
        category: problem.category
      }
    });

  } catch (error) {
    console.error('Create problem error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update problem
export const updateProblem = async (req, res) => {
  try {
    const { problemId } = req.params;
    const updateData = req.body;


    const problem = await prisma.problem.update({
      where: { id: problemId },
      data: updateData,
      include: {
        testCases: true,
        _count: {
          select: {
            submissions: true
          }
        }
      }
    });

    res.json({
      message: 'Problem updated successfully',
      problem
    });

  } catch (error) {
    console.error('Update problem error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Problem not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete problem
export const deleteProblem = async (req, res) => {
  try {
    const { problemId } = req.params;


    // Delete related test cases first
    await prisma.testCase.deleteMany({
      where: { problemId }
    });

    // Delete related submissions
    await prisma.submission.deleteMany({
      where: { problemId }
    });

    // Delete the problem
    await prisma.problem.delete({
      where: { id: problemId }
    });

    res.json({
      message: 'Problem deleted successfully'
    });

  } catch (error) {
    console.error('Delete problem error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Problem not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all users for management
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, role } = req.query;

    const where = {};
    if (search) {
      where.OR = [
        { username: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } }
      ];
    }
    if (role) where.role = role;

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        createdAt: true,
        problemsSolved: true,
        totalSubmissions: true,
        points: true,
        _count: {
          select: {
            submissions: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit)
    });

    const total = await prisma.user.count({ where });

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user role/status
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, isVerified } = req.body;


    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(role && { role }),
        ...(typeof isVerified === 'boolean' && { isVerified })
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isVerified: true
      }
    });

    res.json({
      message: 'User updated successfully',
      user
    });

  } catch (error) {
    console.error('Update user error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
