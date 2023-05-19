import { logger } from '@/utils/logger';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || '',
    }),
  ],
  events: {
    async signIn(message: any) {
      logger.info('signIn');

      /* on successful sign in */
    },
    async signOut(message: any) {
      /* on signout */
    },
    async createUser(message: any) {
      /* user created */
    },
    async updateUser(message: any) {
      /* user updated - e.g. their email was verified */
    },
    async linkAccount(message: any) {
      /* account (e.g. Twitter) linked to a user */
    },
    async session(message: any) {
      /* session is active */
    },
  },
  logger: {
    error(code: any, metadata: any) {
      logger.error(code, metadata);
    },
    warn(code: any) {
      logger.warn(code);
    },
    debug(code: any, metadata: any) {
      logger.debug(code, metadata);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
