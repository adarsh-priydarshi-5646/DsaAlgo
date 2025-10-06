import express from 'express';
import { getProfile, getStats } from '../controllers/userController.js';

const router = express.Router();

// Routes
router.get('/:username', getProfile);
router.get('/:username/stats', getStats);

export default router;
