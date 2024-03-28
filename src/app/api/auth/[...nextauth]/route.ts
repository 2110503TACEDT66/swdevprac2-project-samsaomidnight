import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import userLogIn from "@/libs/userLogIn";
import CredentialsProvider from "next-auth/providers/credentials";
import { authOptions } from "./auth";


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };