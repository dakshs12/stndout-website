"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Playfair_Display } from 'next/font/google';
import { ArrowUpRight } from 'lucide-react'; // Make sure lucide-react is installed, Next.js usually includes it!

gsap.registerPlugin(ScrollTrigger, useGSAP);

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['italic', 'normal']
});

const services = [
  {
    id: "01",
    title: "Strategy",
    desc: "Expand your reach and unlock new markets with a plan tailored to your goals. From in-depth market research to cutting-edge digital strategies, we transform opportunities into real, measurable success.",
    tags: ["Global Expansion", "Market Entry", "International"],
    bg: "bg-brand-primary",
    text: "text-brand-white",
    descText: "text-brand-beige/90",
    pillBg: "bg-brand-cream hover:bg-white text-[#070707]"
  },
  {
    id: "02",
    title: "Media & Delivery",
    desc: "Get real results with strategies built just for you. Whether it’s SEO, social media ads, or programmatic marketing, we’ll boost your visibility, skyrocket conversions, and deliver performance you can count on.",
    tags: ["Social Ads", "Google Ads", "Programmatic"],
    bg: "bg-[#070707]",
    text: "text-brand-cream",
    descText: "text-brand-cream/70",
    pillBg: "bg-white/10 hover:bg-brand-primary text-brand-cream hover:text-white"
  },
  {
    id: "03",
    title: "Content & SEO",
    desc: "Grab your audience’s attention with content that gets results. Whether it’s persuasive copy, tailored emails, or scroll-stopping UGC videos, we craft authentic messages that keep your customers coming back.",
    tags: ["Content Marketing", "Email", "Copywriting"],
    bg: "bg-brand-cream",
    text: "text-[#070707]",
    descText: "text-[#070707]/80",
    pillBg: "bg-[#070707]/5 hover:bg-brand-primary hover:text-white text-[#070707]"
  },
  {
    id: "04",
    title: "Technical",
    desc: "Boost your digital presence and stay ahead of the competition with powerful tools and responsive web design. Measure, optimize, and scale effortlessly to drive massive growth.",
    tags: ["Web Design", "Web Development"],
    bg: "bg-brand-primary",
    text: "text-brand-white",
    descText: "text-brand-beige/90",
    pillBg: "bg-brand-cream hover:bg-white text-[#070707]"
  }
];

export function Services() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.service-panel') as HTMLElement[];

    gsap.set(panels.slice(1), { clipPath: "circle(0% at 50% 50%)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        // FIX: Increased to 500% to give room for the 5th transition (The Summary Panel)
        end: "+=500%", 
        pin: true,
        scrub: 1, 
        anticipatePin: 1,
      }
    });

    panels.forEach((panel, i) => {
      if (i === 0) return; 

      const prevPanel = panels[i - 1];

      tl.to(prevPanel, {
        scale: 0.85,
        opacity: 0.5,
        filter: "blur(10px)",
        ease: "none"
      }, `scene-${i}`);

      tl.to(panel, {
        clipPath: "circle(150% at 50% 50%)",
        ease: "none"
      }, `scene-${i}`);

      const content = panel.querySelector('.panel-content');
      tl.from(content, {
        scale: 1.2,
        opacity: 0,
        y: 50,
        ease: "none"
      }, `scene-${i}`);
    });

  }, { scope: containerRef }); 

  return (
    <section 
      ref={containerRef} 
      id="services" 
      className="relative h-[100svh] w-full overflow-hidden perspective-[2000px] bg-[#070707]"
    >
      
      {/* ========================================= */}
      {/* PANEL 0: THE INTRO                        */}
      {/* ========================================= */}
      <div className="service-panel absolute inset-0 w-full h-full bg-brand-cream z-0 flex flex-col justify-center items-center px-6 pt-20">
        <div className="w-full max-w-[1400px] flex flex-col lg:flex-row lg:items-baseline justify-between gap-8 lg:gap-16 panel-content">
          <h2 className={`${playfair.className} text-6xl md:text-[100px] lg:text-[130px] font-black text-[#070707] leading-[0.8] tracking-tight m-0`}>
            What we do.
          </h2>
          <p className="text-[#070707]/80 text-lg md:text-2xl font-medium max-w-xl leading-relaxed m-0">
            We don't do "360-degree holistic marketing." We do what works. Here is how we ensure your brand doesn't just blend in, but truly <strong className="font-bold text-brand-primary">stands out</strong> and becomes impossible to ignore.
          </p>
        </div>
      </div>

      {/* ========================================= */}
      {/* PANELS 1-4: THE SERVICES                  */}
      {/* ========================================= */}
      {services.map((svc, index) => (
        <div 
          key={svc.id} 
          className={`service-panel absolute inset-0 w-full h-full flex flex-col justify-center items-center px-6 pt-20 will-change-transform ${svc.bg}`}
          style={{ zIndex: (index + 1) * 10 }}
        >
          <div className={`${playfair.className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[50vw] font-black text-white/5 pointer-events-none select-none mix-blend-overlay`}>
            {svc.id}
          </div>

          <div className="w-full max-w-[1400px] flex flex-col lg:flex-row lg:items-center justify-between gap-12 lg:gap-24 relative z-10 panel-content">
            <div className="lg:w-1/2 flex flex-col gap-4">
              <span className={`${playfair.className} text-6xl md:text-8xl font-black ${svc.text} opacity-40 leading-none`}>
                {svc.id}
              </span>
              <h3 className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl font-bold ${svc.text} leading-[1.1]`}>
                {svc.title}
              </h3>
            </div>

            <div className="lg:w-1/2 flex flex-col gap-8">
              <p className={`${svc.descText} text-xl md:text-2xl leading-relaxed font-light max-w-xl`}>
                {svc.desc}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {svc.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-colors duration-300 shadow-sm cursor-default ${svc.pillBg}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ========================================= */}
      {/* PANEL 5: THE GRAND FINALE SUMMARY         */}
      {/* ========================================= */}
      <div 
        className={`service-panel absolute inset-0 w-full h-full flex flex-col justify-center items-center px-6 pt-20 will-change-transform bg-[#070707]`}
        // Z-index 60 ensures it sits on top of all other panels
        style={{ zIndex: 60 }}
      >
        <div className="w-full max-w-[1400px] flex flex-col gap-12 lg:gap-16 relative z-10 panel-content">
          
          {/* Summary Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl font-black text-brand-cream leading-[0.9]`}>
                The Complete<br/>Arsenal.
              </h2>
            </div>
            <button className="group flex items-center gap-3 px-8 py-4 bg-brand-primary text-brand-white font-bold rounded-full hover:bg-brand-cream hover:text-[#070707] transition-all duration-300 w-fit">
              View All Services
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>

          {/* Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(svc => (
              <div 
                key={`summary-${svc.id}`} 
                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col hover:bg-white/10 transition-colors duration-300 group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-12">
                  <span className={`${playfair.className} text-4xl font-black text-brand-primary opacity-60 group-hover:opacity-100 transition-opacity`}>
                    {svc.id}
                  </span>
                  <ArrowUpRight className="w-6 h-6 text-brand-cream/30 group-hover:text-brand-cream transition-colors" />
                </div>
                
                <h4 className={`${playfair.className} text-3xl font-bold text-brand-white mb-6 leading-tight`}>
                  {svc.title}
                </h4>
                
                <div className="mt-auto flex flex-wrap gap-2">
                  {/* Slicing to show only top 2 tags so the bento boxes stay clean */}
                  {svc.tags.slice(0, 2).map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1.5 rounded-full text-brand-cream/70 text-[10px] font-bold uppercase tracking-wider border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}