import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sheik Farid | Customer Support Executive",
  description: "Professional portfolio of Sheik Farid — customer support, digital payments and operations.",
  applicationName: "Sheik Farid Portfolio",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f7fb" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
