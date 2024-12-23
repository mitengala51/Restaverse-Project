import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

const nextAuthHandler = NextAuth(authOptions);

export { nextAuthHandler as GET, nextAuthHandler as POST };
