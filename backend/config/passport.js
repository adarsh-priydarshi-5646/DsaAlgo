import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const configurePassport = () => {
  // Environment-based configuration
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Get environment-specific credentials
  const clientID = isDevelopment 
    ? process.env.GOOGLE_CLIENT_ID_DEV 
    : process.env.GOOGLE_CLIENT_ID_PROD;
  const clientSecret = isDevelopment 
    ? process.env.GOOGLE_CLIENT_SECRET_DEV 
    : process.env.GOOGLE_CLIENT_SECRET_PROD;
  
  // Get environment-specific URLs
  const backendURL = isDevelopment 
    ? process.env.BACKEND_URL_DEV || 'http://localhost:5001'
    : process.env.BACKEND_URL_PROD || 'https://dsaalgo.onrender.com';
  
  const callbackURL = `${backendURL}/api/auth/oauth/google/callback`;
  
  // Only configure Google OAuth if credentials are provided
  if (clientID && clientSecret) {
    console.log(`🔧 Configuring Google OAuth for ${process.env.NODE_ENV} environment`);
    console.log(`📍 Callback URL: ${callbackURL}`);
    
    // Google OAuth Strategy
    passport.use(new GoogleStrategy({
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: callbackURL
    },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('🔄 OAuth Profile received:', {
        id: profile.id,
        email: profile.emails?.[0]?.value,
        displayName: profile.displayName
      });

      // Check if user already exists with this Google ID
      let user = await prisma.user.findUnique({
        where: { googleId: profile.id }
      });

      if (user) {
        console.log('✅ Existing user found:', user.id);
        return done(null, user);
      }

      // Check if user exists with the same email
      user = await prisma.user.findUnique({
        where: { email: profile.emails[0].value }
      });

      if (user) {
        console.log('🔗 Linking Google account to existing user:', user.id);
        // User exists with same email, link Google account
        user = await prisma.user.update({
          where: { id: user.id },
          data: { 
            googleId: profile.id,
            avatar: profile.photos[0]?.value || user.avatar
          }
        });
        return done(null, user);
      }

      console.log('👤 Creating new user from Google profile');
      // Create new user
      user = await prisma.user.create({
        data: {
          googleId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName || profile.emails[0].value.split('@')[0],
          firstName: profile.name?.givenName || profile.displayName?.split(' ')[0] || 'User',
          lastName: profile.name?.familyName || profile.displayName?.split(' ').slice(1).join(' ') || '',
          avatar: profile.photos[0]?.value,
          isVerified: true, // Google users are verified
        }
      });

      console.log('✅ New user created:', user.id);
      return done(null, user);
    } catch (error) {
      console.error('❌ Google OAuth database error:', error);
      
      // Fallback: Create a temporary user object for OAuth
      const fallbackUser = {
        id: `oauth_${profile.id}`,
        googleId: profile.id,
        email: profile.emails[0].value,
        username: profile.displayName || profile.emails[0].value.split('@')[0],
        firstName: profile.name?.givenName || profile.displayName?.split(' ')[0] || 'User',
        lastName: profile.name?.familyName || profile.displayName?.split(' ').slice(1).join(' ') || '',
        avatar: profile.photos[0]?.value,
        isVerified: true,
        role: 'USER',
        createdAt: new Date().toISOString()
      };
      
      console.log('⚠️ Using fallback user for OAuth:', fallbackUser.id);
      return done(null, fallbackUser);
    }
  }));
  } else {
    console.log('Google OAuth credentials not provided, skipping Google OAuth setup');
  }

  // Serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: id }
      });
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export default configurePassport;
