import RootHeader from "@/components/RootHeader";
import { AuthProvider } from "@/providers/AuthProvider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) redirect("/sign-in");

  return (
   <AuthProvider>
  <main className="h-screen w-full flex flex-col px-7">
    <RootHeader />
    <div className="flex-1 overflow-hidden">
      {children}
    </div>
  </main>
</AuthProvider>

  );
};

export default RootLayout;
