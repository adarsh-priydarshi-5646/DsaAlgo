import express from 'express';
import { query } from 'express-validator';
import { getLeaderboard, getUserRank } from '../controllers/leaderboardController.js';

const router = express.Router();

// Validation middleware
const validateLeaderboardQuery = [
  query('type').optional().isIn(['problems_solved', 'submissions', 'recent_activity']),
  query('timeframe').optional().isIn(['all_time', 'this_month', 'this_week']),
  query('limit').optional().isInt({ min: 1, max: 100 })
];

// Routes
router.get('/', validateLeaderboardQuery, getLeaderboard);
router.get('/user/:username', getUserRank);

export default router;
