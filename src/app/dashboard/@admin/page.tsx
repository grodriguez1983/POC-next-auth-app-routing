import LogoutButton from "@/components/LogoutButton";
import { getCompleteServerSession } from "@/lib/auth";

export default async function Dashboard() {
  const session = (await getCompleteServerSession()) || {};
  return (
    <main className="max-w-2xl min-h-screen flex flex-col items-center mx-auto">
      <div className="w-full flex justify-between my-10">
        <h1 className="text-2xl font-bold">Admin Page</h1>
        <LogoutButton />
      </div>
      <pre className="w-full bg-gray-200 p-4 rounded break-words whitespace-pre-wrap">
        {JSON.stringify(session)}
      </pre>
    </main>
  );
}
