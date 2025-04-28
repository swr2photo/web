import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log("NextAuth is loading...");
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("GOOGLE_CLIENT_ID exists:", !!process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET exists:", !!process.env.GOOGLE_CLIENT_SECRET);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "your-client-id", // default fallback
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "your-client-secret", // default fallback
      authorization: {
        params: {
          prompt: "select_account", // This will prompt the user to select an account
        },
      },
    }),
  ],
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin", // Define your custom sign-in page
    error: "/auth/error", // Define your custom error page
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("Sign in callback called");
      console.log("User email:", user?.email);
      console.log("Account provider:", account?.provider);
      return true; // Ensure sign-in is allowed
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect callback called");
      console.log("URL:", url);
      console.log("BaseURL:", baseUrl);

      if (url.startsWith("/")) {
        return `${baseUrl}${url}`; // Redirect to internal path
      } else if (new URL(url).origin === baseUrl) {
        return url; // Redirect to external URL within the same baseUrl
      }
      return baseUrl; // Default fallback
    },
    async jwt({ token, account, user }) {
      console.log("JWT callback called");

      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : 0,
          user,
        };
      }

      return token; // Return the token as-is if no new data
    },
    async session({ session, token }) {
      console.log("Session callback called");
      console.log("Session user:", session?.user?.email);

      if (token && session.user) {
        // Ensure token.sub is a string before assigning
        if (typeof token.sub === "string") {
          session.user.id = token.sub;
        }
        
        // Ensure token.accessToken is a string before assigning
        if (typeof token.accessToken === "string") {
          session.accessToken = token.accessToken;
        }
      }

      return session; // Return the updated session
    },
  },
  events: {
    async signIn({ user }) {
      console.log("User signed in:", user.email);
    },
    async signOut() {
      console.log("User signed out");
    },
  },
});

export { handler as GET, handler as POST };
