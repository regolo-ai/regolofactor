import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "REgoloFACTOR",
  description: "Refactor your Code with the power of AI",
  icons: {
    icon: "favicon.png",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
