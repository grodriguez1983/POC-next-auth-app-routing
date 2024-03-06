import NextAuth from "next-auth"
 
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name: string;
      firstName: string;
      lastName: string;
      email: string;
    }
  }
}