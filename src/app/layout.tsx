import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { AmbientBackground } from "@/components/motion/AmbientBackground";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { IntroLoader } from "@/components/IntroLoader";
import { INTRO_GATE_SCRIPT } from "@/lib/intro";
import { SHARE_IMAGE, SITE_NAME, SITE_URL } from "@/lib/metadata";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const DEFAULT_TITLE = "Kanishk Tyagi | Developer & Tech Speaker";
const DEFAULT_DESCRIPTION =
  "Personal portfolio of Kanishk Tyagi - Developer, Tech Speaker, and Community Builder.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
};

// Animated content starts hidden and is revealed by JavaScript, so show it without JavaScript.
const NO_SCRIPT_STYLES =
  "main [style*=opacity\\:0],main [style*=transform]:not(.orbit-spin-slow *),footer [style*=opacity\\:0],footer [style*=transform]{opacity:1!important;transform:none!important}.intro-loader{display:none!important}";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${inter.variable} ${bricolage.variable} ${instrumentSerif.variable} dark scroll-smooth relative`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_GATE_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col selection:bg-brand-primary selection:text-on-brand">
        <noscript>
          <style>{NO_SCRIPT_STYLES}</style>
        </noscript>
        <AmbientBackground />
        <div aria-hidden="true" className="grain motion-reduce:animate-none" />
        <MotionProvider>
          <IntroLoader />
          <CustomCursor />
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
