import { Hero } from "@/components/sections/Hero";
import { WhyUs } from "@/components/sections/WhyUs";
import { Services } from "@/components/sections/Services";
import { BrandScore } from "@/components/sections/BrandScore";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full selection:bg-brand-primary selection:text-brand-white">
      <Hero />
      <Services />
      <WhyUs />
      <BrandScore />
      <Footer />
    </main>
  );
}