import type { NextAuthOptions } from "next-auth";
import FortyTwoProvider from "next-auth/providers/42-school";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import GitHubProfile from "next-auth/providers/github";
import { FortyTwoProfile } from "next-auth/providers/42-school";
import axios from "axios";

export const options: NextAuthOptions = {
  providers: [
    FortyTwoProvider({
      profile(profile: FortyTwoProfile) {
        // console.log(profile);
        return {
          ...profile,
          id: profile.id.toString(),
          image: profile.image.link,
          email: profile.email,
          name: profile.login,
        };
      },
      clientId: process.env.FT_UID as string,
      clientSecret: process.env.FT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (profile && account && user) {
        token.userId = user.id;
        token.accessToken = account.access_token;
        token.name = user.name;
        token.image = user.image;
      }
      // console.log("token", token);
      // console.log("profile ", profile);
      return token;
    },
    //if i want to use it in client component
    async session({ session, token }) {
      if (token && session.user) {
        session.user.login = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.loginId = token.userId;
        session.userId = token.userId;
        session.accessToken = token.accessToken;
      }
      // console.log("session: ", session);
      return session;
    },
    async signIn({user}) {
      const userData = {
        login_id: user.name,
        email: user.email,
        name: user.name,
        profile_pic: user.image,
      };

      const response = await axios.post("http://localhost:3001/user/create", userData);
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    }
  },
  secret: process.env.SECRET,
};
