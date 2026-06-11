"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Playfair_Display } from 'next/font/google';
import { Footer } from '@/components/sections/Footer';
import { Process } from '@/components/sections/Process';
import Link from 'next/link';

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
      <main className="min-h-screen selection:bg-brand-primary selection:text-white">

        {/* ============================================ */}
        {/* HERO: Brand Manifesto                        */}
        {/* ============================================ */}
        <section className="relative min-h-[80vh] flex items-center bg-transparent overflow-hidden pt-32 pb-20">
          {/* Ambient background */}
          <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-brand-primary/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-brand-cream/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-4xl">
              <h1 className={`about-reveal ${playfair.className} text-5xl md:text-7xl lg:text-[100px] font-black text-brand-dark leading-[0.95] tracking-tight mb-8`}>
                We exist because{' '}
                <span className="italic text-brand-primary">mediocre marketing</span>{' '}
                shouldn&apos;t.
              </h1>
              <p className="about-reveal text-brand-dark/70 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
                StndOut was born from a simple observation: many great businesses struggle to get the attention they deserve. By combining strategy, creativity and execution, we help brands grow with purpose, not guesswork.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* MISSION & VISION                             */}
        {/* ============================================ */}
        <section className="bg-brand-cream py-24 md:py-32">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Mission */}
              <div className="about-reveal bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
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

              {/* Vision */}
              <div className="about-reveal bg-white/40 backdrop-blur-xl border border-brand-primary/10 rounded-[2rem] p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
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
        </section>



        {/* ============================================ */}
        {/* OUR PROCESS                                  */}
        {/* ============================================ */}
        <Process />



      </main>

      <Footer />
    </div>
  );
}
