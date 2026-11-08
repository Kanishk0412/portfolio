import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { AmbientBackground } from "@/components/motion/AmbientBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
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
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${spaceGrotesk.variable} dark scroll-smooth relative`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col selection:bg-brand-primary selection:text-white">
        <AmbientBackground />
        <MotionProvider>
          <Navbar />
          <main className="flex-1 pt-24 pb-12">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
