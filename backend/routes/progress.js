import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import {
  getProgress,
  getProblemProgress,
  updateProgress,
  getUserStats
} from '../controllers/progressController.js';

const router = express.Router();

// Validation middleware
const validateProgressUpdate = [
  body('status').isIn(['ATTEMPTED', 'SOLVED']),
  body('runtime').optional().isInt({ min: 0 })
];

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Routes
router.get('/', authenticateToken, getProgress);
router.get('/stats', authenticateToken, getUserStats);
router.get('/problem/:problemId', authenticateToken, getProblemProgress);
router.put('/problem/:problemId', authenticateToken, validateProgressUpdate, handleValidationErrors, updateProgress);

export default router;
