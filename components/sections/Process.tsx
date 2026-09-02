'use client';

import { useRef, useState, useEffect } from 'react';
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
    desc: 'We start by asking a lot of questions about your business, audience, competitors and growth ambitions.',
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
    desc: 'From branding and websites to campaigns and content, we turn strategy and creatives into real-world results.',
  },
  {
    num: '04',
    icon: TrendingUp,
    title: 'Evolve',
    subtitle: 'Improve What Matters.',
    desc: 'We then monitor performance, uncover insights and continuously refine what’s working to maximize results.',
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number>(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const idx = Number(entry.target.getAttribute('data-index'));
          setActiveCard(idx);
        }
      });
    }, {
      root: null,
      threshold: 0.5
    });

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

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
        start: "center center",
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
      <div className="flex flex-col lg:flex-row lg:py-16">
        {/* Left Panel (Sticky Context) */}
        <div className="w-full lg:w-1/3 p-8 md:p-16 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-brand-dark/10 z-10 bg-brand-cream shrink-0">
          <h2 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8`}>
            Our <span className="italic text-brand-primary">Process</span>
          </h2>
          <p className="text-brand-dark/70 text-lg leading-relaxed max-w-md">
            Holistic marketing drives sustainable growth. Our process ensures every move is deliberate, measurable and aligned with your business objectives.
          </p>
        </div>

        {/* Right Panel (Horizontal Scroll Area) */}
        <div className="w-full lg:w-2/3 relative flex items-center overflow-x-auto lg:overflow-hidden bg-transparent snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div
            ref={scrollRef}
            className="flex flex-row items-stretch gap-4 md:gap-8 lg:gap-12 px-6 py-8 md:p-16 lg:px-[5vw] w-max flex-nowrap"
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  ref={el => { cardsRef.current[idx] = el; }}
                  data-index={idx}
                  className={`process-card flex-shrink-0 w-[75vw] sm:w-[320px] lg:w-[450px] snap-center bg-white border border-brand-primary/10 rounded-[2rem] p-6 md:p-10 lg:p-14 transition-all duration-500 flex flex-col ${activeCard === idx ? '-translate-y-2 shadow-xl' : 'translate-y-0 shadow-[0_20px_60px_rgba(0,0,0,0.04)]'} lg:translate-y-0 lg:shadow-[0_20px_60px_rgba(0,0,0,0.04)] lg:hover:-translate-y-2 lg:hover:shadow-xl`}
                >
                  <div className="flex items-start justify-between mb-10 lg:mb-12">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-brand-primary" />
                    </div>
                    <span className={`${playfair.className} text-4xl font-black text-brand-dark/10`}>
                      {step.num}
                    </span>
                  </div>

                  <h3 className={`${playfair.className} text-2xl font-bold mb-2 lg:mb-3`}>
                    {step.title}
                  </h3>
                  <p className="text-brand-primary text-sm font-medium tracking-wide mb-4 lg:mb-5">
                    {step.subtitle}
                  </p>
                  <p className="text-brand-dark/70 leading-relaxed text-base">
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
