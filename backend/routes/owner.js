import express from 'express';
import { authenticateToken, requireOwner } from '../middleware/auth.js';
import {
  ownerLogin,
  getDashboardStats,
  createProblem,
  updateProblem,
  deleteProblem,
  getAllUsers,
  updateUser
} from '../controllers/ownerController.js';

const router = express.Router();

// Owner login (no auth required)
router.post('/login', ownerLogin);

// All other routes require owner authentication
router.use(authenticateToken);
router.use(requireOwner);

// Dashboard statistics
router.get('/dashboard/stats', getDashboardStats);

// Problem management
router.post('/problems', createProblem);
router.put('/problems/:problemId', updateProblem);
router.delete('/problems/:problemId', deleteProblem);

// User management
router.get('/users', getAllUsers);
router.put('/users/:userId', updateUser);

export default router;
