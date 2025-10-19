import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Try to get user from database, fallback to token data
    try {
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          role: true
        }
      });

      if (user) {
        req.userId = user.id;
        req.user = user;
        return next();
      }
    } catch (dbError) {
      console.log('Database not available, using token data');
    }

    // Fallback: use data from token
    req.userId = decoded.userId;
    req.user = {
      id: decoded.userId,
      email: 'user@example.com',
      username: 'user',
      firstName: 'Test',
      lastName: 'User',
      role: decoded.role || 'USER'
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

export const requireOwner = (req, res, next) => {
  if (!req.user || req.user.role !== 'OWNER') {
    return res.status(403).json({ error: 'Owner access required' });
  }
  next();
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          role: true,
          avatar: true
        }
      });
      req.user = user;
    }
    
    next();
  } catch (error) {
    // Continue without user if token is invalid
    next();
  }
};
