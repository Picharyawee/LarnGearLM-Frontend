import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ResourceProvider } from "@/lib/contexts/ResourceContext";
import { NoteProvider } from "@/lib/contexts/NoteContext";
import { ChatProvider } from "@/lib/contexts/ChatContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LarnGearLM",
  description: "AI project for LarnGear",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <ResourceProvider>
          <NoteProvider>
            <ChatProvider>
              <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
              >
                {children}
              </body>
            </ChatProvider>
          </NoteProvider>
        </ResourceProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
