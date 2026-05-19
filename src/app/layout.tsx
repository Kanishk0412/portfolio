import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanishk Tyagi | Developer & Tech Speaker",
  description: "Personal portfolio of Kanishk Tyagi - Developer, Tech Speaker, and Community Builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col selection:bg-brand-primary selection:text-white">
        <Navbar />
        <main className="flex-1 pt-24 pb-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
