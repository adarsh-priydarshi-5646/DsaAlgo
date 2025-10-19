import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
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

// Environment-based OAuth configuration
const isDevelopment = process.env.NODE_ENV === 'development';
const clientID = isDevelopment 
  ? process.env.GOOGLE_CLIENT_ID_DEV 
  : process.env.GOOGLE_CLIENT_ID_PROD;
const clientSecret = isDevelopment 
  ? process.env.GOOGLE_CLIENT_SECRET_DEV 
  : process.env.GOOGLE_CLIENT_SECRET_PROD;

console.log('🔍 OAuth Configuration Check:');
console.log(`   Environment: ${process.env.NODE_ENV}`);
console.log(`   isDevelopment: ${isDevelopment}`);
console.log(`   Client ID exists: ${!!clientID}`);
console.log(`   Client Secret exists: ${!!clientSecret}`);
console.log(`   GOOGLE_CLIENT_ID_DEV exists: ${!!process.env.GOOGLE_CLIENT_ID_DEV}`);
console.log(`   GOOGLE_CLIENT_ID_PROD exists: ${!!process.env.GOOGLE_CLIENT_ID_PROD}`);
console.log(`   GOOGLE_CLIENT_SECRET_DEV exists: ${!!process.env.GOOGLE_CLIENT_SECRET_DEV}`);
console.log(`   GOOGLE_CLIENT_SECRET_PROD exists: ${!!process.env.GOOGLE_CLIENT_SECRET_PROD}`);

// OAuth 2.0 - Google (only if configured)
if (clientID && clientSecret) {
  router.get('/oauth/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
  );

  router.get('/oauth/google/callback',
    passport.authenticate('google', { 
      failureRedirect: `${isDevelopment ? process.env.FRONTEND_URL_DEV || 'http://localhost:3000' : process.env.FRONTEND_URL_PROD}/login?error=oauth_failed`, 
      session: false 
    }),
    async (req, res) => {
      try {
        const user = req.user;
        
        if (!user) {
          console.error('No user found in OAuth callback');
          const frontendURL = isDevelopment 
            ? process.env.FRONTEND_URL_DEV || 'http://localhost:3000'
            : process.env.FRONTEND_URL_PROD;
          return res.redirect(`${frontendURL}/login?error=oauth_no_user`);
        }

        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        // Environment-specific frontend URL
        const frontendURL = isDevelopment 
          ? process.env.FRONTEND_URL_DEV || 'http://localhost:3001'
          : process.env.FRONTEND_URL_PROD;
        
        const redirectUrl = `${frontendURL}/oauth/callback?token=${encodeURIComponent(token)}`;

        console.log(`🔄 OAuth redirect to: ${redirectUrl}`);
        console.log(`👤 User: ${user.email} (ID: ${user.id})`);
        console.log(`🔍 NODE_ENV: ${process.env.NODE_ENV}`);
        console.log(`🔍 isDevelopment: ${isDevelopment}`);
        console.log(`🔍 FRONTEND_URL_DEV: ${process.env.FRONTEND_URL_DEV}`);
        console.log(`🔍 FRONTEND_URL_PROD: ${process.env.FRONTEND_URL_PROD}`);
        console.log(`🔍 Final frontendURL: ${frontendURL}`);
        
        // Redirect back to frontend with token
        return res.redirect(302, redirectUrl);
      } catch (err) {
        console.error('OAuth callback error:', err);
        const frontendURL = isDevelopment 
          ? process.env.FRONTEND_URL_DEV || 'http://localhost:3001'
          : process.env.FRONTEND_URL_PROD;
        return res.redirect(`${frontendURL}/login?error=oauth_processing_failed`);
      }
    }
  );
} else {
  console.log('❌ Google OAuth not configured - missing credentials');
  
  // Fallback routes when Google OAuth is not configured
  router.get('/oauth/google', (req, res) => {
    const frontendURL = isDevelopment 
      ? process.env.FRONTEND_URL_DEV || 'http://localhost:3000'
      : process.env.FRONTEND_URL_PROD || 'https://dsa-algo-chi.vercel.app';
    
    console.log('OAuth attempt with missing credentials, redirecting to login with error');
    res.redirect(`${frontendURL}/login?error=oauth_not_configured`);
  });

  router.get('/oauth/google/callback', (req, res) => {
    const frontendURL = isDevelopment 
      ? process.env.FRONTEND_URL_DEV || 'http://localhost:3000'
      : process.env.FRONTEND_URL_PROD || 'https://dsa-algo-chi.vercel.app';
    
    res.redirect(`${frontendURL}/login?error=oauth_not_configured`);
  });
}

export default router;
