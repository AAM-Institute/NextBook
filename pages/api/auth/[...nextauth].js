import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
// import EmailProvider from "next-auth/providers/email"

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log(user, account, profile, email, credentials);
            
            const isAllowedToSignIn = true;

            if (isAllowedToSignIn) {
                return true;
            }
            // Return false to display a default error message
            return false;
            // Or you can return a URL to redirect to:
            // return '/unauthorized'
        },
        async redirect({ url, baseUrl, ...props }) {
            console.log(url, baseUrl, props);
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async jwt({ token, _account }) {
            // Persist the OAuth access_token to the token right after signin
            // if (account) {
            //     return { ...token, accessToken: account.access_token };
            // }
            return token;
        },
        async session({ session, token, _user }) {
            // Send properties to the client, like an access_token from a provider.
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
