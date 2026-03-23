import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ProofStats } from "@/components/sections/ProofStats";
import { ProblemPoll } from "@/components/sections/ProblemPoll";
import { Services } from "@/components/sections/Services";
import { BrandScore } from "@/components/sections/BrandScore";

export default function Home() {
  return (
    <main className="min-h-screen w-full selection:bg-brand-primary selection:text-brand-white">
      <Navbar />
      <Hero />
      <ProofStats />
      <ProblemPoll />
      <Services />
      <BrandScore />
    </main>
  );
}