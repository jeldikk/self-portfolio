import type { Metadata } from "next";
import "@aws-amplify/ui-react/styles.css";
import "./globals.css";
import AuthDetailsContextProvider from "@/context/auth-details.context";
import AmplifyProvider from "@/context/amplify.context";
import Header from "@/components/header/header.component";
import { getAuthUserDetails } from "@/utils/amplify.server";
import StoreProvider from "@/context/store-provider.context";

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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION_ID,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authDetails = await getAuthUserDetails();
  return (
    <html lang="en">
      <body>
        <AmplifyProvider>
          <StoreProvider authDetails={authDetails}>
            <AuthDetailsContextProvider authDetails={authDetails}>
              <Header />
              {children}
            </AuthDetailsContextProvider>
          </StoreProvider>
        </AmplifyProvider>
      </body>
    </html>
  );
}
