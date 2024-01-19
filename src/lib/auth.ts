import { NextAuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { env } from "@/env.mjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import Credentials from "next-auth/providers/credentials";
const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    // Credentials({
    // })
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name || dbUser.email?.split("@")[0],
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};
const getServerAuth = () => getServerSession(authOptions);
export { authOptions, getServerAuth };
