import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css"; // Note: Adjust this path if your globals.css is in the styles/ folder
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar"; // <-- Imported the Navbar
import { StaticBackground } from "@/components/animations/StaticBackground";
import { Agentation } from 'agentation';

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: "StndOut | Marketing That Actually Gets Noticed",
  description: "StndOut is a challenger marketing agency. We refuse to let your brand blend in. See how strong your brand is — free in 60 seconds.",
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M9PB8Y2LS6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M9PB8Y2LS6');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-transparent text-brand-dark antialiased`}>
        
        {/* The premium static background (sits at z-index -1) */}
        <StaticBackground />

        {/* Navbar sits OUTSIDE the physics wrapper so it can stay position: fixed */}
        <Navbar />

        {/* The rest of the site gets the premium momentum scroll */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
        
        {process.env.NODE_ENV === 'development' && <Agentation />}
      </body>
    </html>
  );
}