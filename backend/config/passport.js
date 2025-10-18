import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from '../config/database.js';

export default function configurePassport() {
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const callbackURL = process.env.OAUTH_REDIRECT_URI || 'http://localhost:5001/api/auth/oauth/google/callback';

  if (!clientID || !clientSecret) {
    console.warn('Google OAuth env vars missing: GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET');
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const provider = 'google';
          const oauthId = profile.id;
          const email = profile.emails?.[0]?.value?.toLowerCase() || null;
          const firstName = profile.name?.givenName || null;
          const lastName = profile.name?.familyName || null;
          // Clamp overly long avatar values defensively
          let avatar = profile.photos?.[0]?.value || null;
          if (avatar && typeof avatar === 'string' && avatar.length > 2048) {
            avatar = avatar.slice(0, 2048);
          }

          let user = await prisma.user.findFirst({
            where: {
              OR: [
                { oauthId },
                ...(email ? [{ email }] : []),
              ],
            },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                email: email || `${provider}-${oauthId}@noemail.local`,
                username: (email ? email.split('@')[0] : `${provider}_${oauthId}`).toLowerCase(),
                firstName: firstName || 'User',
                lastName: lastName || provider,
                avatar: avatar || null,
                password: 'oauth',
                isVerified: true,
                oauthProvider: provider,
                oauthId,
              },
            });
          } else if (!user.oauthId || !user.oauthProvider) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: { oauthProvider: provider, oauthId },
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}
