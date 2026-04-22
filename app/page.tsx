import { Hero } from "@/components/sections/Hero";
import { ProblemPoll } from "@/components/sections/ProblemPoll";
import { Services } from "@/components/sections/Services";
import { BrandScore } from "@/components/sections/BrandScore";

export default function Home() {
  return (
    <main className="min-h-screen w-full selection:bg-brand-primary selection:text-brand-white">
      <Hero />
      <Services />
      <ProblemPoll />
      <BrandScore />
    </main>
  );
}