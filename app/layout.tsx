import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "EducaTech SC ",
  description:
    "Desbloqueie o mundo digital! Aplicativo gratuito de tecnologia para a Terceira Idade em Santa Catarina. Aprenda a usar celular, WhatsApp, e-mail e mais, de forma simples e segura. Educação fácil e intuitiva para idosos de SC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${poppins.className} ${poppins.variable} antialiased `}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
