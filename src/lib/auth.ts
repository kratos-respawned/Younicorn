import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/app/user";
import {env} from "@/env.mjs";
const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const admin={
          email: env.ADMIN_MAIL,
          password: env.ADMIN_PASS
        }
        if( !credentials || !credentials.email || !credentials.password) {
          return null;
        }

        if (admin.email === credentials.email && admin.password === credentials.password) {
          return {
            email: admin.email,
            id: admin.email
          };
        } else {
          return null;
        }
      },
    })
  ],
  // callbacks: {
  //   async session({ token, session }) {
  //     if (token) {
  //       session.user.id = token.id;
  //       session.user.name = token.name;
  //       session.user.email = token.email;
  //       session.user.image = token.picture;
  //     }
  //     return session;
  //   },
  //   async jwt({ token, user }) {
  //     const dbUser = await db.user.findFirst({
  //       where: {
  //         email: token.email,
  //       },
  //     });

  //     if (!dbUser) {
  //       if (user) {
  //         token.id = user?.id;
  //       }
  //       return token;
  //     }

  //     return {
  //       id: dbUser.id,
  //       name: dbUser.name || dbUser.email?.split("@")[0],
  //       email: dbUser.email,
  //       picture: dbUser.image,
  //     };
  //   },
  // },
};
const getServerAuth = () => getServerSession(authOptions);
export { authOptions, getServerAuth };
