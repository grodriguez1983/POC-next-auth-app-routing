
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function checkUserRole() {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user?.email) {
    return "user";
  }
  return session.user.role === "admin" ? "admin" : "user";
}

export async function getCompleteServerSession() {
  return await getServerSession(authOptions);
}