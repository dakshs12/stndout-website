"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText'; // We can officially use this natively now!
import { useGSAP } from '@gsap/react';
import { Playfair_Display } from 'next/font/google';

// Register the premium plugins natively
gsap.registerPlugin(SplitText, useGSAP);

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['italic']
});

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  
  const glass1Ref = useRef<HTMLDivElement>(null);
  const glass2Ref = useRef<HTMLDivElement>(null);
  const glass3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. PREMIUM TYPOGRAPHY ORCHESTRATION
    // SplitText intelligently breaks the DOM elements into accessible, animatable divs
    const splitTitle = new SplitText(titleRef.current, { type: "words,chars" });
    const splitEyebrow = new SplitText(eyebrowRef.current, { type: "words" });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // Initial states (hidden and pushed down)
    gsap.set([splitTitle.chars, splitEyebrow.words], { opacity: 0, yPercent: 100, rotateX: -90 });
    gsap.set([glass1Ref.current, glass2Ref.current, glass3Ref.current], { scale: 0, opacity: 0 });

    // The Reveal Sequence
    tl.to(splitEyebrow.words, {
      opacity: 1,
      yPercent: 0,
      rotateX: 0,
      duration: 1.2,
      stagger: 0.05,
    })
    .to(splitTitle.chars, {
      opacity: 1,
      yPercent: 0,
      rotateX: 0,
      duration: 1.5,
      stagger: 0.02, // Cinematic ripple effect across the letters
    }, "-=0.8")
    .to([glass1Ref.current, glass2Ref.current, glass3Ref.current], {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "back.out(1.5)",
      stagger: 0.1
    }, "-=1.2");

    // 2. HIGH-PERFORMANCE MOUSE PARALLAX (quickTo)
    const xTo1 = gsap.quickTo(glass1Ref.current, "x", { duration: 0.8, ease: "power3" });
    const yTo1 = gsap.quickTo(glass1Ref.current, "y", { duration: 0.8, ease: "power3" });
    
    const xTo2 = gsap.quickTo(glass2Ref.current, "x", { duration: 1.2, ease: "power3" });
    const yTo2 = gsap.quickTo(glass2Ref.current, "y", { duration: 1.2, ease: "power3" });
    
    const xTo3 = gsap.quickTo(glass3Ref.current, "x", { duration: 0.5, ease: "power3" });
    const yTo3 = gsap.quickTo(glass3Ref.current, "y", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const xPos = (clientX - centerX) / centerX;
      const yPos = (clientY - centerY) / centerY;

      xTo1(xPos * -60); yTo1(yPos * -60);
      xTo2(xPos * 90);  yTo2(yPos * 90);
      xTo3(xPos * -120); yTo3(yPos * 120);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
    
  }, { scope: containerRef }); 

  return (
    <section ref={containerRef} id="hero" className="relative min-h-[100svh] flex items-center justify-center bg-[#070707] overflow-hidden perspective-[1000px]">
      
      {/* Animated Aurora Orbs with ScrollSmoother Data-Speed Parallax */}
      <div data-speed="0.8" className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-primary/30 blur-[120px] rounded-full mix-blend-screen animate-[spin_20s_linear_infinite]" />
      <div data-speed="1.2" className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brand-cream/10 blur-[150px] rounded-full mix-blend-screen animate-[spin_25s_linear_infinite_reverse]" />

      {/* Floating Glassmorphism Elements */}
      <div ref={glass1Ref} className="absolute top-[20%] left-[15%] w-32 h-32 md:w-64 md:h-64 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl z-10 hidden md:block will-change-transform" />
      <div ref={glass2Ref} className="absolute bottom-[20%] right-[15%] w-48 h-64 md:w-80 md:h-[400px] rounded-[40px] rotate-12 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl z-10 hidden md:block will-change-transform" />
      <div ref={glass3Ref} className="absolute top-[40%] right-[30%] w-16 h-16 md:w-24 md:h-24 rounded-lg -rotate-12 bg-brand-primary/20 backdrop-blur-2xl border border-brand-primary/30 shadow-2xl z-10 will-change-transform" />

      {/* Foreground Content */}
      <div className="w-full max-w-[1600px] mx-auto px-6 relative z-20 text-center flex flex-col items-center">
        
        <div className="overflow-hidden mb-6">
          <p ref={eyebrowRef} className="text-brand-cream/60 font-semibold uppercase tracking-[0.4em] md:tracking-[0.6em] text-sm md:text-lg">
            Most brands blend in.
          </p>
        </div>
        
        <div className="perspective-[1000px]">
          <h1 ref={titleRef} className={`${playfair.className} text-6xl md:text-[130px] lg:text-[180px] font-black italic text-brand-cream leading-none drop-shadow-[0_0_40px_rgba(236,220,201,0.3)]`}>
            We refuse.
          </h1>
        </div>
        
      </div>
    </section>
  );
}