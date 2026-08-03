"use client";

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Playfair_Display } from 'next/font/google';
import { Footer } from '@/components/sections/Footer';
import { Process } from '@/components/sections/Process';
import { Founders } from '@/components/sections/Founders';
import Link from 'next/link';
import { MousePointerClick } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['italic', 'normal'],
});

const team = [
  { name: 'Daksh Sharma', role: 'Founder & CEO', initial: 'DS' },
  { name: 'Priya Mehta', role: 'Creative Director', initial: 'PM' },
  { name: 'Arjun Kapoor', role: 'Head of Strategy', initial: 'AK' },
  { name: 'Maya Singh', role: 'Lead Developer', initial: 'MS' },
];



function MobileAboutFlipCard({ badge, children, desc }: { badge: string, children: React.ReactNode, desc: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="md:hidden relative w-full aspect-square cursor-pointer [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`w-full h-full relative transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* FRONT */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white/80 backdrop-blur-xl border border-white rounded-2xl p-2 flex flex-col items-center justify-center text-center shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
          <span className="inline-block px-3 py-1 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-[11px] font-bold uppercase tracking-wider mb-2 sm:mb-3">
            {badge}
          </span>
          {children}
          <div className="absolute bottom-2 right-2 opacity-30 animate-bounce">
            <MousePointerClick className="w-4 h-4 text-brand-dark" />
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-brand-primary text-white rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center text-center shadow-lg">
          <p className="text-[13px] sm:text-sm leading-snug text-brand-cream/90 font-medium">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pageRef.current) return;

    // Animate all reveal elements
    const reveals = pageRef.current.querySelectorAll('.about-reveal');
    reveals.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });



    // Value cards stagger
    const cards = pageRef.current.querySelectorAll('.value-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 60, rotateY: -5 },
      {
        opacity: 1, y: 0, rotateY: 0,
        duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: cards[0], start: 'top 85%', once: true },
      }
    );

  }, { scope: pageRef });

  return (
    <div ref={pageRef}>
      <main className="min-h-screen bg-brand-cream selection:bg-brand-primary selection:text-white overflow-hidden">

        {/* ============================================ */}
        {/* HERO: Brand Manifesto                        */}
        {/* ============================================ */}
        <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center bg-transparent pt-24 md:pt-32 pb-4 md:pb-10">
          {/* Ambient background */}
          <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-brand-primary/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-brand-cream/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 xl:gap-24">
              <div className="w-full lg:w-7/12 flex flex-col justify-center text-center lg:text-left mt-4 lg:mt-0">
                <h1 className={`about-reveal ${playfair.className} text-[38px] leading-[1.1] sm:text-5xl md:text-7xl lg:text-[75px] xl:text-[90px] font-black text-brand-dark lg:leading-[1.05] tracking-tight mb-8 md:mb-8`}>
                  We exist because{' '}
                  <span className="italic text-brand-primary">mediocre marketing</span>{' '}
                  shouldn&apos;t.
                </h1>
              </div>

              {/* Hero Image */}
              <div className="w-full lg:w-5/12 about-reveal flex justify-center lg:justify-end relative z-10">
                <img 
                  src="/aboutus-page.svg" 
                  alt="StndOut About Us" 
                  className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-transparent pb-12 md:pb-16 pt-2 md:pt-8">
          <div className="max-w-[1600px] mx-auto px-4 md:px-12">
            <div className="grid grid-cols-2 gap-2 sm:gap-6 md:gap-12">
              {/* Mission */}
              {/* Mission */}
              <div className="about-reveal">
                {/* Mobile Flip Card */}
                <MobileAboutFlipCard 
                  badge="Our Mission" 
                  desc="Too many businesses waste time and money chasing trends, tactics and quick fixes. We're here to simplify marketing, focus on what matters and build strategies that create long-term value."
                >
                  <h2 className={`${playfair.className} text-[19px] leading-[1.1] sm:text-2xl font-black text-brand-dark px-1`}>
                    To bring <span className="italic text-brand-primary">clarity</span> to marketing
                  </h2>
                </MobileAboutFlipCard>

                {/* Desktop Normal Card */}
                <div className="hidden md:block bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
                  <span className="inline-block px-4 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
                    Our Mission
                  </span>
                  <h2 className={`${playfair.className} text-3xl md:text-4xl font-black text-brand-dark leading-tight mb-6`}>
                    To bring <span className="italic text-brand-primary">clarity</span> to marketing
                  </h2>
                  <p className="text-brand-dark/60 text-lg leading-relaxed">
                    Too many businesses waste time and money chasing trends, tactics and quick fixes. We're here to simplify marketing, focus on what matters and build strategies that create long-term value.
                  </p>
                </div>
              </div>

              {/* Vision */}
              {/* Vision */}
              <div className="about-reveal">
                {/* Mobile Flip Card */}
                <MobileAboutFlipCard 
                  badge="Our Vision" 
                  desc="We believe marketing should be intentional, accountable and built around real business goals. Our vision is a future where strategy comes first and meaningful growth follows."
                >
                  <h2 className={`${playfair.className} text-[19px] leading-[1.1] sm:text-2xl font-black text-brand-dark px-1`}>
                    Better <span className="italic text-brand-primary">marketing.</span> Better <span className="italic text-brand-primary">businesses.</span>
                  </h2>
                </MobileAboutFlipCard>

                {/* Desktop Normal Card */}
                <div className="hidden md:block bg-white/40 backdrop-blur-xl border border-brand-primary/10 rounded-[2rem] p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
                  <span className="inline-block px-4 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
                    Our Vision
                  </span>
                  <h2 className={`${playfair.className} text-3xl md:text-4xl font-black text-brand-dark leading-tight mb-6`}>
                    Better <span className="italic text-brand-primary">marketing.</span> Better <span className="italic text-brand-primary">businesses.</span>
                  </h2>
                  <p className="text-brand-dark/60 text-lg leading-relaxed">
                    We believe marketing should be intentional, accountable and built around real business goals. Our vision is a future where strategy comes first and meaningful growth follows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* ============================================ */}
        {/* OUR PROCESS                                  */}
        {/* ============================================ */}
        <Process />

        {/* ============================================ */}
        {/* OUR FOUNDERS                                 */}
        {/* ============================================ */}
        <Founders />

      </main>

      <Footer />
    </div>
  );
}
