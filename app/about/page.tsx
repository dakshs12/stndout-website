"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Playfair_Display } from 'next/font/google';
import { Footer } from '@/components/sections/Footer';
import { Target, Lightbulb, TrendingUp, Zap, Users, BarChart3, Globe, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['italic', 'normal'],
});

const values = [
  {
    icon: Target,
    title: 'Challenger Mindset',
    desc: 'We don\'t play it safe. Every campaign is built to disrupt, to provoke attention, and to win.',
    accent: 'group-hover:text-red-400',
    border: 'group-hover:border-red-400/30',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Decisions',
    desc: 'No gut feelings. Every strategy is backed by analytics, market research, and real performance data.',
    accent: 'group-hover:text-blue-400',
    border: 'group-hover:border-blue-400/30',
  },
  {
    icon: Lightbulb,
    title: 'Creative Without Ego',
    desc: 'Creativity serves the brand, not the agency. We build what works, not what wins awards for us.',
    accent: 'group-hover:text-yellow-400',
    border: 'group-hover:border-yellow-400/30',
  },
  {
    icon: Zap,
    title: 'Speed to Market',
    desc: 'In a world that moves fast, slow is invisible. We execute with urgency and precision.',
    accent: 'group-hover:text-brand-primary',
    border: 'group-hover:border-brand-primary/30',
  },
  {
    icon: Users,
    title: 'Partnership, Not Service',
    desc: 'We embed ourselves in your vision. Your growth is our growth. No billing by the hour.',
    accent: 'group-hover:text-purple-400',
    border: 'group-hover:border-purple-400/30',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    desc: 'Markets don\'t have borders anymore. We think globally and execute locally with cultural precision.',
    accent: 'group-hover:text-teal-400',
    border: 'group-hover:border-teal-400/30',
  },
];

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
        <section className="relative min-h-[80vh] flex items-center bg-[#070707] overflow-hidden pt-32 pb-20">
          {/* Ambient background */}
          <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-brand-primary/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-brand-cream/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-4xl">
              <p className="about-reveal text-brand-primary font-bold uppercase tracking-[0.3em] text-sm mb-6">
                About StndOUT
              </p>
              <h1 className={`about-reveal ${playfair.className} text-5xl md:text-7xl lg:text-[100px] font-black text-brand-cream leading-[0.95] tracking-tight mb-8`}>
                We exist because{' '}
                <span className="italic text-brand-primary">mediocre marketing</span>{' '}
                shouldn&apos;t.
              </h1>
              <p className="about-reveal text-brand-cream/50 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
                StndOUT was born from a simple frustration: too many brilliant brands are invisible because their marketing plays it safe. We built an agency that doesn&apos;t know how to play it safe.
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
                  Make every brand{' '}
                  <span className="italic text-brand-primary">impossible to ignore.</span>
                </h2>
                <p className="text-brand-dark/60 text-lg leading-relaxed">
                  We combine challenger strategy, data-driven execution, and relentless creativity to transform brands from forgettable to unforgettable. No fluff, no filler — just marketing that actually gets noticed.
                </p>
              </div>

              {/* Vision */}
              <div className="about-reveal bg-[#070707] rounded-[2rem] p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
                <span className="inline-block px-4 py-2 rounded-full border border-brand-cream/20 bg-brand-cream/5 text-brand-cream text-xs font-bold uppercase tracking-[0.2em] mb-6">
                  Our Vision
                </span>
                <h2 className={`${playfair.className} text-3xl md:text-4xl font-black text-brand-cream leading-tight mb-6`}>
                  A world where the{' '}
                  <span className="italic text-brand-primary">best brands win,</span>{' '}
                  not the loudest.
                </h2>
                <p className="text-brand-cream/50 text-lg leading-relaxed">
                  We envision a marketing landscape where quality wins over quantity, where authenticity beats artifice, and where every brand — no matter its size — has the strategy to stand out.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* ============================================ */}
        {/* OUR PHILOSOPHY / VALUES                      */}
        {/* ============================================ */}
        <section className="bg-[#070707] py-24 md:py-32">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="mb-16 md:mb-20">
              <p className="about-reveal text-brand-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">
                What We Believe
              </p>
              <h2 className={`about-reveal ${playfair.className} text-4xl md:text-6xl lg:text-7xl font-black text-brand-cream leading-[0.95] tracking-tight`}>
                Our core{' '}
                <span className="italic text-brand-primary">principles.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className={`value-card group bg-white/[0.03] border border-white/[0.06] rounded-[1.5rem] p-8 md:p-10 hover:bg-white/[0.06] transition-all duration-500 cursor-default ${value.border}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 text-brand-cream/50 transition-colors duration-300 ${value.accent}`} />
                    </div>
                    <h3 className="text-xl font-bold text-brand-cream mb-3">
                      {value.title}
                    </h3>
                    <p className="text-brand-cream/40 text-sm leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* TEAM SECTION                                 */}
        {/* ============================================ */}
        <section className="bg-brand-cream py-24 md:py-32">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="mb-16 md:mb-20">
              <p className="about-reveal text-brand-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">
                The Humans
              </p>
              <h2 className={`about-reveal ${playfair.className} text-4xl md:text-6xl lg:text-7xl font-black text-brand-dark leading-[0.95] tracking-tight`}>
                Meet the{' '}
                <span className="italic text-brand-primary">misfits.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="about-reveal group bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] p-8 text-center hover:shadow-[0_20px_60px_rgba(30,124,112,0.1)] transition-all duration-500"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-primary to-brand-primary/60 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className={`${playfair.className} text-2xl font-black text-white`}>
                      {member.initial}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-1">
                    {member.name}
                  </h3>
                  <p className="text-brand-dark/50 text-sm font-medium">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
