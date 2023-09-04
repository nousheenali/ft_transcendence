import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

interface IUser {
  login?: string | null;
  email?: string | null;
  image?: string | null;
  loginId?: bool;
  userId?: string | null;
  accessToken: string | null;
  name: string | null;
}

declare module "next-auth" {
  interface Session {
    accessToken?: string | null;
    sessionToken?: string | null;
    user: IUser;
    userId?: string | null;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {
    accessToken?: string;
    userId?: string;
    sessionToken?: string;
    user?: IUser;
  }
}
