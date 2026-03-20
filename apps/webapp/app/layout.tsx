import type { Metadata } from "next";
import "@aws-amplify/ui-react/styles.css";
import "./globals.css";
import AuthDetailsContextProvider from "@/context/auth-details.context";
import AmplifyProvider from "@/context/amplify.context";
import Header from "@/components/header/header.component";
import { getAuthUserDetails } from "@/utils/amplify.server";
import StoreProvider from "@/context/store-provider.context";
import { META_DATA } from "@/utils/metadata.constants";
import ThemeProvider from "@/context/theme-provider.context";

export const metadata: Metadata = META_DATA;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authDetails = await getAuthUserDetails();
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="coffee" enableSystem={false}>
          <AmplifyProvider>
            <StoreProvider authDetails={authDetails}>
              <AuthDetailsContextProvider authDetails={authDetails}>
                <Header />
                {children}
              </AuthDetailsContextProvider>
            </StoreProvider>
          </AmplifyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
