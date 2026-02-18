import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import ParticleBackground from "@/components/ui/ParticleBackground";

export const metadata: Metadata = {
  title: "KlassFin | Best Education Loan for Abroad Studies",
  description:
    "KlassFin is India's leading education loan marketplace. Get the best loan for studying abroad from top banks and NBFCs — completely free service.",
  keywords:
    "education loan, study abroad loan, student loan, abroad studies, KlassFin",
  openGraph: {
    title: "KlassFin | Best Education Loan for Abroad Studies",
    description: "Get the best education loan for studying abroad.",
    url: "https://klassfin.com",
    siteName: "KlassFin",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise">
        <ThemeProvider>
          {/* Global Particles - har page pe automatically dikhenge */}
          <ParticleBackground />
          <CustomCursor />
          <Navbar />
          <main style={{ position: "relative", zIndex: 1 }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}