import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = await auth()

   if (!isAuthenticated) redirect('/sign-in')

  return <div>{children}</div>;
};

export default RootLayout;
