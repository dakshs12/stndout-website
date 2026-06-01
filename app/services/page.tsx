"use client";

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Playfair_Display } from 'next/font/google';
import { Footer } from '@/components/sections/Footer';
import {
  ArrowUpRight, ArrowRight, Globe, Megaphone, PenTool, Code,
  Search, Target, BarChart3, Mail, Video, Smartphone,
  Palette, LineChart, Layers, Gauge
} from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['italic', 'normal'],
});

const services = [
  {
    id: 'strategy',
    number: '01',
    title: 'Strategy',
    tagline: 'The blueprint to dominate your market.',
    desc: 'Expand your reach and unlock new markets with a plan tailored to your goals. From in-depth market research to cutting-edge digital strategies, we transform opportunities into real, measurable success.',
    color: 'brand-primary',
    bgClass: 'bg-brand-primary',
    textClass: 'text-white',
    icon: Globe,
    features: [
      { icon: Target, label: 'Market Entry Strategy', desc: 'Identify and penetrate high-value markets with precision targeting.' },
      { icon: BarChart3, label: 'Competitive Analysis', desc: 'Deep-dive into your competition to find whitespace opportunities.' },
      { icon: Globe, label: 'Global Expansion', desc: 'Scale your brand internationally with culturally-aware strategies.' },
      { icon: LineChart, label: 'Growth Roadmapping', desc: 'Quarterly and annual growth plans with clear KPIs and milestones.' },
    ],
    process: ['Discovery & Audit', 'Market Research', 'Strategy Design', 'Implementation Plan', 'Performance Review'],
  },
  {
    id: 'media',
    number: '02',
    title: 'Media & Delivery',
    tagline: 'Performance marketing that actually performs.',
    desc: 'Get real results with strategies built just for you. Whether it\'s SEO, social media ads, or programmatic marketing, we\'ll boost your visibility, skyrocket conversions, and deliver performance you can count on.',
    color: 'brand-dark',
    bgClass: 'bg-[#070707]',
    textClass: 'text-brand-cream',
    icon: Megaphone,
    features: [
      { icon: Smartphone, label: 'Social Media Ads', desc: 'Meta, TikTok, LinkedIn — campaigns that convert, not just impress.' },
      { icon: Search, label: 'Google Ads & PPC', desc: 'Search, display, and shopping campaigns with obsessive ROI focus.' },
      { icon: Layers, label: 'Programmatic', desc: 'AI-powered ad placement across premium inventory at scale.' },
      { icon: Gauge, label: 'Analytics & Attribution', desc: 'Know exactly what\'s working with multi-touch attribution models.' },
    ],
    process: ['Audience Mapping', 'Channel Selection', 'Creative Production', 'Launch & Optimize', 'Scale Winners'],
  },
  {
    id: 'content',
    number: '03',
    title: 'Content & SEO',
    tagline: 'Words that work. Content that converts.',
    desc: 'Grab your audience\'s attention with content that gets results. Whether it\'s persuasive copy, tailored emails, or scroll-stopping UGC videos, we craft authentic messages that keep your customers coming back.',
    color: 'brand-cream',
    bgClass: 'bg-brand-cream',
    textClass: 'text-brand-dark',
    icon: PenTool,
    features: [
      { icon: PenTool, label: 'Copywriting', desc: 'Brand voice development, web copy, and conversion-focused messaging.' },
      { icon: Mail, label: 'Email Marketing', desc: 'Automated sequences and campaigns that nurture leads into customers.' },
      { icon: Video, label: 'UGC & Video', desc: 'Authentic creator content and video production that stops the scroll.' },
      { icon: Search, label: 'SEO', desc: 'Technical SEO, content strategy, and link building for organic dominance.' },
    ],
    process: ['Content Audit', 'Strategy & Calendar', 'Production', 'Distribution', 'Measure & Iterate'],
  },
  {
    id: 'technical',
    number: '04',
    title: 'Technical',
    tagline: 'Your digital presence, engineered to perfection.',
    desc: 'Boost your digital presence and stay ahead of the competition with powerful tools and responsive web design. Measure, optimize, and scale effortlessly to drive massive growth.',
    color: 'brand-primary',
    bgClass: 'bg-brand-primary',
    textClass: 'text-white',
    icon: Code,
    features: [
      { icon: Palette, label: 'Web Design', desc: 'Award-worthy designs that convert visitors into customers.' },
      { icon: Code, label: 'Web Development', desc: 'Fast, scalable, SEO-optimized websites built with modern stacks.' },
      { icon: Gauge, label: 'Performance Optimization', desc: 'Core Web Vitals, speed optimization, and UX improvements.' },
      { icon: BarChart3, label: 'Marketing Tech Stack', desc: 'CRM, analytics, and automation tool setup and integration.' },
    ],
    process: ['Requirements', 'UX/UI Design', 'Development', 'Testing & QA', 'Launch & Support'],
  },
];

export default function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  useGSAP(() => {
    if (!pageRef.current) return;

    // Reveal animations
    const reveals = pageRef.current.querySelectorAll('.svc-reveal');
    reveals.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });

    // Stagger service cards
    const sections = pageRef.current.querySelectorAll('.service-section');
    sections.forEach((section) => {
      const features = section.querySelectorAll('.feature-card');
      gsap.fromTo(features,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%', once: true },
        }
      );

      // Process steps
      const steps = section.querySelectorAll('.process-step');
      gsap.fromTo(steps,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 0.5, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: steps[0], start: 'top 90%', once: true },
        }
      );
    });
  }, { scope: pageRef });

  return (
    <div ref={pageRef}>
      <main className="min-h-screen selection:bg-brand-primary selection:text-white">

        {/* ============================================ */}
        {/* HERO                                         */}
        {/* ============================================ */}
        <section className="relative min-h-[70vh] flex items-center bg-brand-cream overflow-hidden pt-32 pb-16">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-brand-primary/[0.05] blur-[120px] rounded-full pointer-events-none" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(7,7,7,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(7,7,7,0.3) 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />

          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-4xl">
              <p className="svc-reveal text-brand-primary font-bold uppercase tracking-[0.3em] text-sm mb-6">
                What We Do
              </p>
              <h1 className={`svc-reveal ${playfair.className} text-5xl md:text-7xl lg:text-[100px] font-black text-brand-dark leading-[0.95] tracking-tight mb-8`}>
                We don&apos;t do{' '}
                <span className="italic text-brand-dark/30">&ldquo;everything.&rdquo;</span>
                <br />
                We do what{' '}
                <span className="italic text-brand-primary">works.</span>
              </h1>
              <p className="svc-reveal text-brand-dark/60 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
                Four pillars of marketing excellence, each designed to solve a specific problem and deliver measurable results. No bloat, no fluff.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SERVICE SECTIONS                              */}
        {/* ============================================ */}
        {services.map((svc, idx) => {
          const Icon = svc.icon;
          const isExpanded = expandedService === svc.id;
          const isDark = svc.bgClass === 'bg-[#070707]' || svc.bgClass === 'bg-brand-primary';
          const cardBg = isDark ? 'bg-white/[0.06] border-white/[0.08] hover:bg-white/[0.1]' : 'bg-white/60 border-white hover:shadow-lg';
          const cardText = isDark ? 'text-white/90' : 'text-brand-dark';
          const cardSubtext = isDark ? 'text-white/50' : 'text-brand-dark/50';
          const processColor = isDark ? 'border-white/10' : 'border-brand-dark/10';
          const processDot = isDark ? 'bg-brand-cream' : 'bg-brand-primary';
          const processText = isDark ? 'text-brand-cream/70' : 'text-brand-dark/60';

          return (
            <section
              key={svc.id}
              id={svc.id}
              className={`service-section ${svc.bgClass} py-24 md:py-32 scroll-mt-20`}
            >
              <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                {/* Service header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-20">
                  <div className="lg:w-7/12">
                    <div className="svc-reveal flex items-center gap-4 mb-6">
                      <span className={`${playfair.className} text-6xl md:text-8xl font-black ${svc.textClass} opacity-20`}>
                        {svc.number}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${svc.textClass} opacity-70`} />
                      </div>
                    </div>
                    <h2 className={`svc-reveal ${playfair.className} text-4xl md:text-6xl lg:text-7xl font-black ${svc.textClass} leading-[0.95] tracking-tight mb-4`}>
                      {svc.title}
                    </h2>
                    <p className={`svc-reveal text-xl md:text-2xl font-light ${svc.textClass} opacity-60`}>
                      {svc.tagline}
                    </p>
                  </div>
                  <div className="lg:w-5/12">
                    <p className={`svc-reveal text-lg leading-relaxed ${svc.textClass} opacity-50 max-w-lg`}>
                      {svc.desc}
                    </p>
                  </div>
                </div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
                  {svc.features.map((feature) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <div
                        key={feature.label}
                        className={`feature-card group ${cardBg} backdrop-blur-xl border rounded-[1.5rem] p-8 transition-all duration-300 cursor-default`}
                      >
                        <div className="flex items-start gap-5">
                          <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <FeatureIcon className="w-5 h-5 text-brand-primary" />
                          </div>
                          <div>
                            <h3 className={`text-lg font-bold ${cardText} mb-2`}>
                              {feature.label}
                            </h3>
                            <p className={`text-sm leading-relaxed ${cardSubtext}`}>
                              {feature.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Process timeline */}
                <div className="svc-reveal">
                  <p className={`text-xs font-bold uppercase tracking-[0.2em] ${svc.textClass} opacity-30 mb-6`}>
                    Our Process
                  </p>
                  <div className={`flex flex-wrap items-center gap-4 border-t ${processColor} pt-6`}>
                    {svc.process.map((step, stepIdx) => (
                      <div key={step} className="process-step flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${processDot}`} />
                        <span className={`text-sm font-medium ${processText}`}>
                          {step}
                        </span>
                        {stepIdx < svc.process.length - 1 && (
                          <ArrowRight className={`w-3 h-3 ${processText} opacity-40`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* ============================================ */}
        {/* BOTTOM CTA                                   */}
        {/* ============================================ */}
        <section className="bg-[#070707] py-24 md:py-32 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className={`svc-reveal ${playfair.className} text-4xl md:text-6xl font-black text-brand-cream leading-tight mb-6`}>
              Not sure where to start?
            </h2>
            <p className="svc-reveal text-brand-cream/50 text-lg mb-10 max-w-xl mx-auto">
              Take our free AI Brand Score assessment and we&apos;ll tell you exactly where you&apos;re blending in — and what to do about it.
            </p>
            <div className="svc-reveal flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#brand-score"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-brand-primary text-white font-bold text-lg rounded-full hover:bg-brand-cream hover:text-brand-dark transition-all duration-300 shadow-[0_0_40px_rgba(30,124,112,0.3)]"
              >
                AI Brand Score
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent border border-white/20 text-brand-cream font-bold text-lg rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Grab a Coffee ☕
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
