import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import PrivyAuthProvider from "@/providers/privy";
import {cn} from "@/lib/utils";
import Navbar from "@/components/app-components/Navbar";
import {Separator} from "@/components/ui/separator";
import {Toaster} from "@/components/ui/toaster";
const inter = Inter({subsets: ["latin"], variable: "--font-sans"});

export const metadata: Metadata = {
  title: "Web3 Raffls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <PrivyAuthProvider>
          <Navbar />
          <Separator />
          {children}
        </PrivyAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
