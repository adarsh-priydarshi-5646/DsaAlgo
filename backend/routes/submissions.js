import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  submitSolution,
  getUserSubmissions,
  getSubmissionDetails,
  getProblemStats
} from '../controllers/submissionController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Submit solution
router.post('/submit', submitSolution);

// Get user submissions
router.get('/user', getUserSubmissions);

// Get submission details
router.get('/:submissionId', getSubmissionDetails);

// Get problem statistics
router.get('/stats/:problemId', getProblemStats);

export default router;
