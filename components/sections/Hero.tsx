"use client";

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { Playfair_Display } from 'next/font/google';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(SplitText, useGSAP);

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['italic', 'normal'],
});

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  
  const baseContentRef = useRef<HTMLDivElement>(null);
  const revealContentRef = useRef<HTMLDivElement>(null);
  
  const headlineBaseRef = useRef<HTMLHeadingElement>(null);
  const headlineRevealRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  
  const [isMouseDevice, setIsMouseDevice] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) {
      setIsMouseDevice(false);
    }
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !headlineBaseRef.current || !headlineRevealRef.current) return;

    // Center mask initially
    gsap.set(maskRef.current, { 
      '--x': window.innerWidth / 2, 
      '--y': window.innerHeight / 2,
      '--mask-size': '0px'
    });

    // High performance tracking
    const xTo = gsap.quickTo(maskRef.current, "--x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(maskRef.current, "--y", { duration: 0.4, ease: "power3.out" });

    const moveMask = (e: MouseEvent) => {
      // Spotlight coordinates
      xTo(e.clientX);
      yTo(e.clientY);

      // Subtle Parallax for the text
      const xOffset = (e.clientX / window.innerWidth - 0.5) * 30;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * 30;
      
      gsap.to([baseContentRef.current, revealContentRef.current], {
        x: -xOffset,
        y: -yOffset,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    if (isMouseDevice) {
      window.addEventListener("mousemove", moveMask);
    }

    // Intro Animation Sequence
    const splitBase = new SplitText(headlineBaseRef.current, { type: "words,chars" });
    const splitReveal = new SplitText(headlineRevealRef.current, { type: "words,chars" });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.2 });

    gsap.set([splitBase.chars, splitReveal.chars], { opacity: 0, yPercent: 100, rotateX: -90 });
    gsap.set(buttonsRef.current, { opacity: 0, y: 30 });

    tl.to([splitBase.chars, splitReveal.chars], {
      opacity: 1,
      yPercent: 0,
      rotateX: 0,
      duration: 1.5,
      stagger: 0.02,
    })
    .to(maskRef.current, {
      '--mask-size': isMouseDevice ? '450px' : '150vw',
      duration: 1.5,
      ease: "power2.inOut"
    }, "-=1.0")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
    }, "-=0.8");

    return () => {
      if (isMouseDevice) window.removeEventListener("mousemove", moveMask);
      splitBase.revert();
      splitReveal.revert();
    };

  }, { scope: containerRef, dependencies: [isMouseDevice] });

  const ContentBlock = ({ isRevealed, headlineRef, wrapperRef }: { isRevealed: boolean, headlineRef: React.RefObject<HTMLHeadingElement | null>, wrapperRef: React.RefObject<HTMLDivElement | null> }) => (
    <div ref={wrapperRef} className="flex flex-col items-center text-center max-w-5xl mx-auto px-6 mt-16">
      <h1 
        ref={headlineRef}
        className={`${playfair.className} text-5xl sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[120px] font-black leading-[0.95] tracking-tight mb-8 ${isRevealed ? 'text-brand-cream' : 'text-white/10'}`}
      >
        Most brands <span className={`italic ${isRevealed ? 'text-white' : 'text-white/5'}`}>blend in.</span><br />
        We <span className={`italic ${isRevealed ? 'text-brand-dark' : 'text-white/20'}`}>refuse.</span>
      </h1>
      <p className={`text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-12 ${isRevealed ? 'text-brand-cream/80' : 'text-white/20'}`}>
        StndOUT crafts marketing strategies that shatter the noise. We don't do "holistic 360° marketing." We do what works — and make your brand impossible to ignore.
      </p>
    </div>
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#070707]"
    >
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* LAYER 1: BASE (Boring / Dark) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <ContentBlock isRevealed={false} headlineRef={headlineBaseRef} wrapperRef={baseContentRef} />
      </div>

      {/* LAYER 2: THE REVEAL (Masked Spotlight) */}
      <div 
        ref={maskRef}
        className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center bg-gradient-to-br from-brand-primary via-[#18655b] to-[#0d332e]"
        style={{
          maskImage: `radial-gradient(circle var(--mask-size) at calc(var(--x) * 1px) calc(var(--y) * 1px), black 20%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(circle var(--mask-size) at calc(var(--x) * 1px) calc(var(--y) * 1px), black 20%, transparent 80%)`
        } as React.CSSProperties}
      >
        <ContentBlock isRevealed={true} headlineRef={headlineRevealRef} wrapperRef={revealContentRef} />
      </div>

      {/* LAYER 3: INTERACTIVE UI (Buttons) */}
      <div className="absolute bottom-16 md:bottom-24 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <div ref={buttonsRef} className="flex flex-wrap gap-4 justify-center pointer-events-auto px-6">
          <Link
            href="/#services"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-brand-cream text-brand-dark font-bold text-base rounded-full shadow-[0_4px_20px_rgba(255,248,244,0.15)] hover:shadow-[0_8px_30px_rgba(255,248,244,0.3)] hover:scale-105 transition-all duration-300"
          >
            Our Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          <Link
            href="/#brand-score"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#070707]/50 backdrop-blur-md border border-brand-cream/20 text-brand-cream font-bold text-base rounded-full hover:bg-brand-cream hover:text-brand-dark hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            AI Brand Score
          </Link>
        </div>
      </div>
    </section>
  );
}