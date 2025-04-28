import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log("NextAuth is loading...");
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("GOOGLE_CLIENT_ID exists:", !!process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET exists:", !!process.env.GOOGLE_CLIENT_SECRET);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
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
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("Sign in callback called");
      console.log("User:", user?.email);
      console.log("Account provider:", account?.provider);
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect callback called");
      console.log("URL:", url);
      console.log("BaseURL:", baseUrl);

      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
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

      return token;
    },
    async session({ session, token }) {
      console.log("Session callback called");
      console.log("Session user:", session?.user?.email);

      if (token && session.user) {
        // ตรวจสอบว่า token.sub เป็น string ก่อนที่เราจะกำหนดค่า
        if (typeof token.sub === "string") {
          session.user.id = token.sub;
        }
        
        // ตรวจสอบว่า token.accessToken เป็น string ก่อนที่จะกำหนดค่า
        if (typeof token.accessToken === "string") {
          session.accessToken = token.accessToken;
        }
      }

      return session;
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
