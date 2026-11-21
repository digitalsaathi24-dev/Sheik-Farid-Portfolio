import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sheik Farid | Operations & Customer Experience",
  description: "Portfolio of Sheik Farid — operations, customer support, digital payments, banking services and practical digital projects.",
  applicationName: "Sheik Farid Portfolio",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b0b10" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><body>{children}</body></html>;
}
