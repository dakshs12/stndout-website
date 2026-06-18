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
  Palette, LineChart, Layers, Gauge,
  Briefcase, Handshake, Lightbulb, Box, Image as ImageIcon, Users, Monitor, FileText, PieChart, Layout
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
    title: 'Brand Consultancy',
    tagline: 'The blueprint to dominate your market.',
    desc: 'Expand your reach and unlock new markets with a plan tailored to your goals. From in-depth market research to cutting-edge digital strategies, we transform opportunities into real, measurable success.',
    color: 'brand-primary',
    bgClass: 'bg-transparent',
    textClass: 'text-brand-dark',
    icon: Globe,
    features: [
      { icon: Search, label: 'Brand Auditing', desc: 'A detailed review of your brand, marketing and competitive presence.' },
      { icon: LineChart, label: 'Growth Strategy', desc: 'A clear roadmap to help your business scale with purpose.' },
      { icon: Target, label: 'Brand Positioning', desc: 'Defining what makes your brand distinct and worth choosing.' },
      { icon: Briefcase, label: 'Management Consultancy', desc: 'Strategic guidance to align marketing with business objectives.' },
      { icon: Handshake, label: 'Brand Collaborations', desc: 'Identifying partnerships that expand reach and build credibility.' },
      { icon: Lightbulb, label: 'Strategic Solutions', desc: 'Tailored recommendations to solve specific business challenges.' },
    ],
    process: ['Discovery & Audit', 'Market Research', 'Strategy Design', 'Implementation Plan', 'Performance Review'],
  },
  {
    id: 'media',
    number: '02',
    title: 'Brand Development',
    tagline: 'Performance marketing that actually performs.',
    desc: 'Get real results with strategies built just for you. Whether it\'s SEO, social media ads, or programmatic marketing, we\'ll boost your visibility, skyrocket conversions, and deliver performance you can count on.',
    color: 'brand-dark',
    bgClass: 'bg-transparent',
    textClass: 'text-brand-dark',
    icon: Megaphone,
    features: [
      { icon: Globe, label: 'Brand Launch Strategy', desc: 'A structured plan to introduce your brand with impact.' },
      { icon: Megaphone, label: 'Product Launch', desc: 'Go-to-market campaigns designed to generate attention and demand.' },
      { icon: PenTool, label: 'Logo & Tagline Creation', desc: 'Distinctive visual and verbal elements that define your identity.' },
      { icon: Search, label: 'Market Research', desc: 'Insights into customer behavior, competitors and market opportunities.' },
      { icon: FileText, label: 'Marketing Collaterals', desc: 'Brochures, presentations and materials that support your sales efforts.' },
      { icon: Box, label: 'Packaging Design', desc: 'Packaging that communicates value and stands out on shelves.' },
      { icon: Palette, label: 'Brand Voice & Colour Strategy', desc: 'Guidelines that ensure a consistent and recognizable brand presence.' },
    ],
    process: ['Audience Mapping', 'Channel Selection', 'Creative Production', 'Launch & Optimize', 'Scale Winners'],
  },
  {
    id: 'content',
    number: '03',
    title: 'Digital & Technical Growth',
    tagline: 'Words that work. Content that converts.',
    desc: 'Grab your audience\'s attention with content that gets results. Whether it\'s persuasive copy, tailored emails, or scroll-stopping UGC videos, we craft authentic messages that keep your customers coming back.',
    color: 'brand-cream',
    bgClass: 'bg-transparent',
    textClass: 'text-brand-dark',
    icon: PenTool,
    features: [
      { icon: Monitor, label: 'Website Development', desc: 'High-converting websites designed for both credibility and performance.' },
      { icon: Smartphone, label: 'Social Media Marketing', desc: 'Content and campaigns that grow visibility and engagement.' },
      { icon: FileText, label: 'Content Strategy', desc: 'A structured approach to what you say and when you say it.' },
      { icon: Target, label: 'Campaign Marketing', desc: 'Integrated campaigns built around specific business goals.' },
      { icon: Users, label: 'Influencer Collaborations', desc: 'Partnerships with creators who connect you with the right audience.' },
      { icon: ImageIcon, label: 'Visual Design', desc: 'Creative assets that make your brand look polished and professional.' },
      { icon: BarChart3, label: 'Paid Promotions', desc: 'Targeted advertising to reach qualified prospects faster.' },
      { icon: PenTool, label: 'Copywriting', desc: 'Words that capture attention and drive action.' },
    ],
    process: ['Content Audit', 'Strategy & Calendar', 'Production', 'Distribution', 'Measure & Iterate'],
  },
  {
    id: 'technical',
    number: '04',
    title: 'Events & Experiences',
    tagline: 'Your digital presence, engineered to perfection.',
    desc: 'Boost your digital presence and stay ahead of the competition with powerful tools and responsive web design. Measure, optimize, and scale effortlessly to drive massive growth.',
    color: 'brand-primary',
    bgClass: 'bg-transparent',
    textClass: 'text-brand-dark',
    icon: Code,
    features: [
      { icon: Users, label: 'Trade Shows', desc: 'End-to-end planning and execution for industry events.' },
      { icon: Layout, label: 'Exhibitions Booth Layout', desc: 'Branded spaces designed to attract and engage visitors.' },
      { icon: FileText, label: 'Marketing Collaterals', desc: 'Printed materials that support conversations and conversions.' },
      { icon: PieChart, label: 'Event Data Analysis', desc: 'Insights to measure performance and improve future events.' },
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
        <section className="relative min-h-[70vh] flex items-center bg-transparent overflow-hidden pt-32 pb-16">
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
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-7/12">
                <p className="svc-reveal text-brand-primary font-bold uppercase tracking-[0.3em] text-sm mb-6">
                  What We Do
                </p>
                <h1 className={`svc-reveal ${playfair.className} text-5xl md:text-7xl lg:text-[100px] font-black text-brand-dark leading-[0.95] tracking-tight mb-8`}>
                  We don&apos;t do{' '}
                  <span className="italic text-brand-dark/30">&ldquo;everything.&rdquo;</span>
                  <br />
                  We do what
                  <br />
                  <span className="italic text-brand-primary">works.</span>
                </h1>
              </div>
              
              {/* Hero Image */}
              <div className="lg:w-5/12 svc-reveal flex justify-center lg:justify-end w-full">
                <img 
                  src="/service-page.svg" 
                  alt="StndOut Services" 
                  className="w-full max-w-[400px] md:max-w-[500px] xl:max-w-[700px] object-contain drop-shadow-2xl scale-[1.3] md:scale-[1.4] origin-right"
                />
              </div>
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


              </div>
            </section>
          );
        })}

        {/* ============================================ */}
        {/* BOTTOM CTA                                   */}
        {/* ============================================ */}
        <section className="bg-transparent py-24 md:py-32 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className={`svc-reveal ${playfair.className} text-4xl md:text-6xl font-black text-brand-dark leading-tight mb-6`}>
              Not sure where to start?
            </h2>
            <p className="svc-reveal text-brand-dark/70 text-lg mb-10 max-w-xl mx-auto">
              Take our free AI Brand Score assessment and we will tell you exactly where you are blending in and what to do about it.
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
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent border border-brand-dark/20 text-brand-dark font-bold text-lg rounded-full hover:bg-brand-dark/5 transition-all duration-300"
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
