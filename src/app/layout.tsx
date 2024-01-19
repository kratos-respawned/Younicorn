import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={cn(sans.variable, calSans.variable, sans.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
