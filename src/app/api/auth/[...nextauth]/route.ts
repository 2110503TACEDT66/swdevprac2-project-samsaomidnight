import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import userLogIn from "@/libs/userLogIn";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) {
            throw new Error("Invalid credentials");
          }

          const user = await userLogIn(credentials.email, credentials.password);

          if (user) {
            return user;
          } else {
            throw new Error("Invalid email or password");
          }
        } catch (error) {
          console.error("Authentication failed:", error);
          return null;
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };