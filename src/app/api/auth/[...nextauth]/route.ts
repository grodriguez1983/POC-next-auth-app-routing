import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"

const mockUsers = [
  {
    data: {
      email: "user@email.com",
      firstName: "User",
      lastName: "Name",
      role: "user",
      password: "password",
      id: "1"   
    },
  },
  {
    data: {
      email: "user1@email.com",
      firstName: "User",
      lastName: "Name",
      role: "admin",
      password: "password",
      id: "2"   
    },
  }
]

const getUser = (email?: string | null) => {
  return mockUsers.find(user => user.data.email === email);
}

export const authOptions: AuthOptions = {
  callbacks: {
    session: ({ session }) => {
      const user = getUser(session.user.email);
      return {
        ...session,
        user: {
          ...session.user,
          ...user?.data
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = mockUsers.find(user => user.data.email === credentials?.email && user.data.password === credentials.password);
        if (user) {
          return { 
            email: user.data.email, 
            name: `${user.data.firstName} ${user.data.lastName}`, 
            id: user.data.id,
            role: user.data.role,
          };
        }
        return null;
      }
    })
  ],
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };