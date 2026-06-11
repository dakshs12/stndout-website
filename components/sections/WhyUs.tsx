"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Playfair_Display } from 'next/font/google';
import { Target, Layers, Database, LineChart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['italic', 'normal'],
});

const reasons = [
  {
    icon: LineChart,
    title: 'Strategy before execution',
    desc: 'We don\'t just execute blindly. Every action is rooted in a deep understanding of your market, competitors, and audience.',
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
  },
  {
    icon: Layers,
    title: 'One partner for everything',
    desc: 'From branding and strategy to digital marketing and web experiences, we handle the entire spectrum so you don\'t have to juggle agencies.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    icon: Database,
    title: 'Creative backed by data',
    desc: 'Beautiful design means nothing if it doesn\'t convert. Our creative decisions are driven by analytics and performance metrics.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    icon: Target,
    title: 'Built around business goals',
    desc: 'We focus on what actually matters: revenue, growth, and market share. Your success is the only KPI we care about.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
];

export function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const reveals = containerRef.current.querySelectorAll('.why-reveal');
    const cards = containerRef.current.querySelectorAll('.why-card-wrapper');

    gsap.fromTo(reveals,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%', once: true },
      }
    );

    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.why-grid', start: 'top 85%', once: true },
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-brand-cream relative overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">

          <h2 className={`why-reveal ${playfair.className} text-4xl md:text-6xl font-black text-brand-dark leading-[1.1]`}>
            Why Brands <span className="italic text-brand-primary">Work With Us</span>
          </h2>
        </div>

        <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div key={idx} className="why-card-wrapper h-full">
                <div
                  className="why-card h-full group bg-white border border-brand-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center"
                >
                  <div className={`w-14 h-14 rounded-2xl ${reason.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${reason.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-4 leading-tight">
                    {reason.title}
                  </h3>
                  <p className="text-brand-dark/70 text-sm leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
