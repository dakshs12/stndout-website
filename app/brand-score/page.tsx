import type { Metadata } from 'next';
import { Navbar } from '@/components/sections/Navbar';
import { BrandScore } from '@/components/sections/BrandScore';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: "Free AI Brand Score Calculator | StndOut",
  description: "Calculate your Brand Visibility Score in 60 seconds. Our AI analyzes your digital footprint, industry niche, and marketing channels.",
  alternates: {
    canonical: "https://stndoutmarketing.com/brand-score",
  },
  openGraph: {
    title: "Free AI Brand Score Calculator | StndOut",
    description: "Audit your brand's digital visibility and marketing effectiveness with StndOut.",
    url: "https://stndoutmarketing.com/brand-score",
    siteName: "StndOut",
    type: "website",
  },
};

export default function BrandScorePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full selection:bg-brand-primary selection:text-brand-white">
        <div className="pt-10 md:pt-16">
          <BrandScore />
        </div>
      </main>
      <Footer />
    </>
  );
}
