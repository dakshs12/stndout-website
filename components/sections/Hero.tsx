"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Cormorant_Garamond } from 'next/font/google';

// Injecting a high-fashion, editorial Serif font
const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['italic', 'normal']
});

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const softTextRef = useRef<HTMLHeadingElement>(null);
  const boldTextRef = useRef<HTMLSpanElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // 1. Gently fade in the soft, delicate text
      tl.fromTo(softTextRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" }
      );

      // 2. The Teal Highlight sweeps across the screen
      tl.fromTo(highlightRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "expo.inOut" },
        "-=0.5"
      );

      // 3. The text "We refuse" fades in exactly as the highlight hits
      tl.fromTo(boldTextRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      );

      // 4. The "Spark" element pops in and starts a continuous slow rotation
      tl.fromTo(sparkRef.current,
        { scale: 0, rotation: -90 },
        { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.5)" },
        "-=0.4"
      );

      gsap.to(sparkRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-[100svh] flex items-center bg-brand-cream overflow-hidden pt-16">
      
      {/* 1. "The Swarm" - Blurry, out-of-focus background text representing the boring majority */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <span className="absolute top-[20%] left-[10%] text-6xl text-brand-dark/5 blur-[6px] font-bold">SYNERGY</span>
        <span className="absolute top-[60%] left-[5%] text-8xl text-brand-dark/5 blur-[8px] font-bold">PIVOT</span>
        <span className="absolute top-[30%] right-[15%] text-7xl text-brand-dark/5 blur-[5px] font-bold">LEVERAGE</span>
        <span className="absolute top-[75%] right-[20%] text-9xl text-brand-dark/5 blur-[10px] font-bold">ROI</span>
        <span className="absolute top-[50%] left-[40%] text-5xl text-brand-dark/5 blur-[4px] font-bold">HOLISTIC</span>
      </div>

      {/* Fluid Container */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 relative z-10 flex flex-col justify-center min-h-[60vh]">
        
        <div className="max-w-5xl">
          {/* Delicate, blending-in text using the premium Serif font */}
          <h1 
            ref={softTextRef}
            className={`${cormorant.className} text-5xl md:text-[80px] lg:text-[110px] text-brand-dark/40 font-light italic leading-[1.1] tracking-tight mb-4 md:mb-8 opacity-0`}
          >
            Most brands blend in.
          </h1>
          
          <div className="relative inline-flex items-center">
            
            {/* The Animated Highlight Box */}
            <div 
              ref={highlightRef}
              className="absolute inset-0 bg-brand-primary -left-4 -right-4 md:-left-8 md:-right-8 skew-x-[-6deg] rounded-sm"
            />
            
            {/* The Bold Challenger Text */}
            <span 
              ref={boldTextRef}
              className="relative z-10 text-5xl md:text-[85px] lg:text-[120px] font-extrabold text-brand-beige tracking-tighter uppercase leading-none opacity-0 py-2 md:py-4"
            >
              We refuse.
            </span>

            {/* The Sharp "Stand Out" Spark Element */}
            <svg 
              ref={sparkRef}
              viewBox="0 0 24 24" 
              className="absolute -right-16 md:-right-32 -top-8 md:-top-16 w-12 h-12 md:w-24 md:h-24 text-brand-dark opacity-0"
              fill="currentColor"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>

          </div>
        </div>
        
      </div>
    </section>
  );
}