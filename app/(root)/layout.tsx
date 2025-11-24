import { AuthProvider } from "@/providers/AuthProvider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) redirect("/sign-in");

  return (
    <AuthProvider>
      <main className="h-screen w-full p-2">
        {children}</main>
    </AuthProvider>
  );
};

export default RootLayout;
