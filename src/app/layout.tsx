import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { getServerAuth } from "@/lib/auth";

import { Navbar } from "@/components/navbar";
import { SessionContext } from "@/components/session-provider";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "yoUnicorn",
  description: "A self hosted cloud platform for all your personal web apps.",
  creator: "yoUnicorn",
  authors: [
    { name: "kratos-respawned", url: "https://github.com/kratos-respawned" },
  ],
};
const sans = Montserrat({
  display: "swap",
  weight: ["400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const calSans = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal",
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuth();
  return (
    <html lang="en">
      <body className={cn("font-sans", sans.variable, calSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SessionContext session={session}>
            <div className="relative min-h-[100dvh] ">
              <Navbar />
              {children}
              <Footer />
            </div>
          </SessionContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
