'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Playfair_Display } from 'next/font/google';
import { Search, Map, Rocket, TrendingUp } from 'lucide-react';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['italic', 'normal'],
});

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Discover',
    subtitle: 'Understand Before We Build.',
    desc: 'We start by understanding your business, audience, competitors and growth ambitions. Every strong strategy begins with asking the right questions.',
  },
  {
    num: '02',
    icon: Map,
    title: 'Strategize',
    subtitle: 'Build the Roadmap.',
    desc: 'We turn insights into a focused marketing plan with clear priorities, timelines and measurable outcomes.',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Execute',
    subtitle: 'Bring the Plan to Life.',
    desc: 'From branding and websites to campaigns and content, we turn strategy into real-world results.',
  },
  {
    num: '04',
    icon: TrendingUp,
    title: 'Evolve',
    subtitle: 'Improve What Matters.',
    desc: 'We believe in long-term partnerships therefore, we monitor performance, uncover insights and continuously refine what’s working to maximize results.',
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !scrollRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Get the amount to scroll
      const getScrollAmount = () => {
        let scrollWidth = scrollRef.current!.scrollWidth;
        return -(scrollWidth - window.innerWidth + (window.innerWidth / 3)); 
        // We subtract the left panel width (approx 1/3 of window) so it stops at the end
      };

      const tween = gsap.to(scrollRef.current, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollRef.current!.scrollWidth}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-brand-cream text-brand-dark overflow-hidden relative">
      <div className="flex flex-col lg:flex-row lg:h-screen">
        {/* Left Panel (Sticky Context) */}
        <div className="w-full lg:w-1/3 p-8 md:p-16 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-brand-dark/10 z-10 bg-brand-cream shrink-0">
          <h2 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8`}>
            Our <span className="italic text-brand-primary">Process</span>
          </h2>
          <p className="text-brand-dark/70 text-lg leading-relaxed max-w-md">
            Good marketing is rarely accidental. Our process ensures every move is deliberate, measurable and aligned with your business objectives.
          </p>
        </div>

        {/* Right Panel (Horizontal Scroll Area) */}
        <div className="w-full lg:w-2/3 relative flex items-center overflow-hidden bg-transparent">
          <div 
            ref={scrollRef} 
            className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 p-8 md:p-16 lg:px-[5vw] w-full lg:w-max flex-nowrap"
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={idx} 
                  className="process-card flex-shrink-0 w-full lg:w-[450px] bg-white border border-brand-primary/10 shadow-[0_20px_60px_rgba(0,0,0,0.04)] rounded-[2rem] p-10 lg:p-14 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-brand-primary" />
                    </div>
                    <span className={`${playfair.className} text-5xl font-black text-brand-dark/10`}>
                      {step.num}
                    </span>
                  </div>
                  
                  <h3 className={`${playfair.className} text-3xl font-bold mb-3`}>
                    {step.title}
                  </h3>
                  <p className="text-brand-primary font-medium tracking-wide mb-6">
                    {step.subtitle}
                  </p>
                  <p className="text-brand-dark/70 leading-relaxed text-lg">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
