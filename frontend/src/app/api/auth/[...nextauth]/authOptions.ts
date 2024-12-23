import Google from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

const googleProvider = Google({
  clientId: process.env.GOOGLE_ID as string,
  clientSecret: process.env.GOOGLE_SECRET as string,
});

export const authOptions: NextAuthOptions = {
  providers: [googleProvider],
  pages: { signIn: "/log-in" },
  debug: process.env.NODE_ENV !== "development",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
