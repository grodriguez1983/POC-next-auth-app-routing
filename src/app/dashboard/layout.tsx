import { checkUserRole } from "@/lib/auth";
import { ReactNode } from "react";

export default async function Layout({
  user,
  admin,
}: {
  user: ReactNode;
  admin: ReactNode;
}) {
  const role = await checkUserRole();
  return (
    <main className="relative w-full flex flex-col sm:flex-row h-screen overflow-y-hidden">
      <div className="w-full flex flex-col h-full bg-white">
        {role === "admin" ? admin : user}
      </div>
    </main>
  );
}
