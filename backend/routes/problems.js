import express from 'express';
import { query, body, validationResult } from 'express-validator';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import {
  getProblems,
  getProblem,
  getCategories,
  submitSolution,
  createProblem
} from '../controllers/problemController.js';

const router = express.Router();

// Validation middleware
const validateProblemQuery = [
  query('category').optional(),
  query('difficulty').optional().isIn(['EASY', 'MEDIUM', 'HARD']),
  query('status').optional().isIn(['NOT_STARTED', 'ATTEMPTED', 'SOLVED']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('search').optional().trim()
];

const validateSubmission = [
  body('code').notEmpty().withMessage('Code is required'),
  body('language').isIn(['javascript', 'python', 'java', 'cpp']).withMessage('Invalid language')
];

const validateProblemCreation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('difficulty').isIn(['EASY', 'MEDIUM', 'HARD']).withMessage('Invalid difficulty'),
  body('categoryId').optional().isUUID().withMessage('Valid category ID is required')
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
router.get('/', validateProblemQuery, handleValidationErrors, getProblems);
router.get('/categories/all', getCategories);
router.get('/:slug', getProblem);
router.post('/:slug/submit', authenticateToken, validateSubmission, handleValidationErrors, submitSolution);
router.post('/', authenticateToken, requireAdmin, validateProblemCreation, handleValidationErrors, createProblem);

export default router;
