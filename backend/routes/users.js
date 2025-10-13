import express from 'express';
import { getProfile, getStats, exportUser } from '../controllers/userController.js';

const router = express.Router();

// Routes
router.get('/:username', getProfile);
router.get('/:username/stats', getStats);
router.get('/:id/export', exportUser);

export default router;
