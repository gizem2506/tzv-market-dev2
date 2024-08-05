import { Open_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
export const openSans = Open_Sans({
  subsets: ["latin"],
});

import ThemeProvider from "../theme/theme-provider";
import CartProvider from "../contexts/CartContext";
import SettingsProvider from "../contexts/SettingContext";
import RTL from "../components/rtl";
import ProgressBar from "../components/progress";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={openSans.className}>
        <SessionProvider session={session}>
          <CartProvider>
            <SettingsProvider>
              <ThemeProvider>
                <ProgressBar />
                <RTL>{children}</RTL>
              </ThemeProvider>
            </SettingsProvider>
          </CartProvider>
        </SessionProvider>
        {/* <GoogleAnalytics gaId="G-XKPD36JXY0" /> */}
      </body>
    </html>
  );
}
