import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AmplifyProvider from "@/context/amplify.context";
import Header from "@/components/header.component";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kamal - Senior Software Engineer | Full Stack Developer",
  description:
    "Senior Software Engineer specializing in TypeScript and the MERN stack. Explore my projects in React, Node.js, and automated testing with Playwright.",
  keywords: [
    "Senior Software Engineer",
    "Full Stack Developer",
    "Portfolio",
    "TypeScript",
    "MERN Stack",
    "React",
    "Node.js",
    "Playwright",
    "AWS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AmplifyProvider>
          <Header />
          {children}
        </AmplifyProvider>
      </body>
    </html>
  );
}
