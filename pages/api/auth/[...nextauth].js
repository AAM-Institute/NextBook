import NextAuth from 'next-auth';
import EmailProvider from "next-auth/providers/email"
import GithubProvider from 'next-auth/providers/github';
// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

// import clientPromise from '../../../utils/mongodb'
// import AppleProvider from 'next-auth/providers/apple';
// import FacebookProvider from 'next-auth/providers/facebook';
// import GoogleProvider from 'next-auth/providers/google';
// import TwitterProvider from 'next-auth/providers/twitter';

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET || undefined,
    // adapter: MongoDBAdapter(clientPromise),
    // theme: {
    //     colorScheme: 'auto',
    //     brandColor: '#f00',
    //     logo: '',
    // },
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // EmailProvider({
        //   server: process.env.EMAIL_SERVER,
        //   from: process.env.EMAIL_FROM,
        //   // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
        // }),
    // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true;
            console.log(user, account, profile, email, credentials);

            if (isAllowedToSignIn) {
                return true;
            }
            // Return false to display a default error message
            return false;
            // Or you can return a URL to redirect to:
            // return '/unauthorized'
        },
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            // if (account) {
            //     return { ...token, accessToken: account.access_token };
            // }
            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            console.log('user', user)
            return {
            token,
            // userId: user.id,
            // userData: { emailVerified: user.emailVerified },
            ...session,
            };
        },
    }
}
export default NextAuth(authOptions)
