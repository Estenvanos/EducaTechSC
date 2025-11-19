import AuthHeader from "@/components/AuthHeader";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = await auth()

   if (isAuthenticated) redirect('/')

  return (
    <main className="h-screen w-screen flex flex-col p-2">
      <AuthHeader />
      {children}
    </main>
  );
}
