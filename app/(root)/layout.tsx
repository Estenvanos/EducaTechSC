import { AuthProvider } from "@/providers/AuthProvider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) redirect("/sign-in");

  return (
    <AuthProvider>
      <main className="h-dvh w-dvw overflow-hidden">{children}</main>
    </AuthProvider>
  );
};

export default RootLayout;
