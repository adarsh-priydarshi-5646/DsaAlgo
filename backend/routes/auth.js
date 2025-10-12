import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  updateSettings
} from '../controllers/authController.js';

const router = express.Router();

// Validation middleware
const validateRegister = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('username').isLength({ min: 3 }).trim().withMessage('Username must be at least 3 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').notEmpty().trim().withMessage('First name is required'),
  body('lastName').notEmpty().trim().withMessage('Last name is required')
];

const validateLogin = [
  body('login').notEmpty().trim().withMessage('Email or username is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const validateProfileUpdate = [
  body('firstName').optional().trim(),
  body('lastName').optional().trim(),
  body('username').optional().isString().trim().isLength({ min: 3 }),
  body('email').optional().isEmail(),
  body('bio').optional().isString(),
  body('avatar').optional().isURL().withMessage('Avatar must be a valid URL')
];

const validatePasswordChange = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
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
router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);
router.get('/me', authenticateToken, getMe);
router.put('/profile', authenticateToken, validateProfileUpdate, handleValidationErrors, updateProfile);
router.put('/password', authenticateToken, validatePasswordChange, handleValidationErrors, changePassword);
router.patch('/settings', authenticateToken, (req, res, next) => next(), updateSettings);

export default router;
