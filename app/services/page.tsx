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
  Briefcase, Handshake, Lightbulb, Box, Image as ImageIcon, Users, Monitor, FileText, PieChart, Layout, ChevronDown
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
    desc: 'We help businesses make smarter marketing decisions through audits, positioning, growth planning, strategic partnerships and tailored business advice. Every recommendation is aligned with your business goals, market realities and long-term growth ambitions.',
    color: 'brand-primary',
    bgClass: 'bg-transparent',
    textClass: 'text-brand-dark',
    icon: Globe,
    image: '/service-consultancy.svg',
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
    desc: 'From launch strategies and market research to identity systems, packaging and brand assets, we build brands with clarity, consistency and purpose. Creating strong foundations that support recognition, trust and future growth.',
    color: 'brand-dark',
    bgClass: 'bg-transparent',
    textClass: 'text-brand-dark',
    icon: Megaphone,
    image: '/service-development.svg',
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
    desc: 'We create websites, content, campaigns and digital experiences that help brands connect with the right audience and support long-term growth. Combining creativity, technology and performance to deliver measurable business outcomes.',
    color: 'brand-cream',
    bgClass: 'bg-transparent',
    textClass: 'text-brand-dark',
    icon: PenTool,
    image: '/service-digital.svg',
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
    desc: 'We plan and execute trade shows, exhibitions and branded experiences that create meaningful interactions before, during and after the event. Ensuring every touchpoint strengthens your brand and leaves a lasting impression.',
    color: 'brand-primary',
    bgClass: 'bg-transparent',
    textClass: 'text-brand-dark',
    icon: Code,
    image: '/service-events.svg',
    features: [
      { icon: Users, label: 'Trade Shows', desc: 'End-to-end planning and execution for industry events.' },
      { icon: Layout, label: 'Exhibitions Booth Layout', desc: 'Branded spaces designed to attract and engage visitors.' },
      { icon: FileText, label: 'Marketing Collaterals', desc: 'Printed materials that support conversations and conversions.' },
      { icon: PieChart, label: 'Event Data Analysis', desc: 'Insights to measure performance and improve future events.' },
    ],
    process: ['Requirements', 'UX/UI Design', 'Development', 'Testing & QA', 'Launch & Support'],
  },
];

function MobileServiceAccordion({ svc, idx }: { svc: any, idx: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-white border border-brand-dark/10 rounded-2xl overflow-hidden shadow-sm transition-all duration-500">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 outline-none focus:outline-none"
      >
        <div className="flex items-center gap-4 text-left">
          <span className="text-brand-primary/40 font-black text-lg sm:text-xl">{svc.number}</span>
          <h3 className={`${playfair.className} text-xl sm:text-2xl font-black text-brand-dark leading-none`}>{svc.title}</h3>
        </div>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-brand-primary" />
        </div>
      </button>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-5 pt-0 flex flex-col items-center border-t border-brand-dark/5">
          <div className="w-full aspect-square relative my-4">
            <img src={svc.image} alt={svc.title} className="w-full h-full object-contain" />
          </div>
          <p className="text-brand-dark/80 leading-relaxed text-sm sm:text-base text-center pb-2">
            {svc.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

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
        <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center bg-transparent pt-24 md:pt-32 pb-4 md:pb-10 overflow-hidden -mb-16 md:-mb-24 lg:-mb-32">
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
            <div className="flex flex-col-reverse lg:flex-row-reverse items-center justify-between gap-2 md:gap-12 lg:gap-24">
              <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left lg:pl-12 xl:pl-20">
                <h1 className={`svc-reveal ${playfair.className} text-[38px] leading-[1.1] sm:text-5xl md:text-7xl lg:text-[90px] xl:text-[100px] font-black text-brand-dark lg:leading-[0.95] tracking-tight mb-8 md:mb-8`}>
                  {/* Desktop formatting */}
                  <span className="hidden md:inline">
                    We don&apos;t do{' '}
                    <span className="italic text-brand-dark/30">&ldquo;everything.&rdquo;</span>
                    <br />
                    We do what
                    <br />
                    <span className="italic text-brand-primary">works.</span>
                  </span>
                  
                  {/* Mobile formatting */}
                  <span className="md:hidden">
                    We don&apos;t do
                    <br />
                    <span className="italic text-brand-dark/30">&ldquo;everything.&rdquo;</span>
                    <br />
                    We do what{' '}
                    <span className="italic text-brand-primary">works.</span>
                  </span>
                </h1>
              </div>

              {/* Hero Image */}
              <div className="w-full lg:w-1/2 svc-reveal flex justify-center lg:justify-start relative z-10">
                <img
                  src="/service-page.svg"
                  alt="StndOut Services"
                  className="w-full max-w-[500px] lg:max-w-[95%] xl:max-w-[90%] object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SERVICE SECTIONS                              */}
        {/* ============================================ */}
        
        {/* Mobile Accordion View */}
        <div className="md:hidden w-full max-w-2xl mx-auto px-6 pt-20 pb-6 flex flex-col gap-4 relative z-10">
          {services.map((svc, idx) => (
            <MobileServiceAccordion key={svc.id} svc={svc} idx={idx} />
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
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
              className={`service-section ${svc.bgClass} py-4 md:py-6 lg:py-8 scroll-mt-20 overflow-hidden ${svc.number === '04' ? '-mt-8 lg:-mt-16' : ''}`}
            >
              <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                  {/* Content Column */}
                  <div className={`flex flex-col justify-center ${idx % 2 === 0 ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
                    <h2 className={`svc-reveal ${playfair.className} text-4xl md:text-6xl lg:text-7xl font-black ${svc.textClass} leading-[0.95] tracking-tight mb-8`}>
                      {svc.title}
                    </h2>
                    <p className={`svc-reveal text-lg md:text-xl leading-relaxed ${svc.textClass} opacity-70`}>
                      {svc.desc}
                    </p>
                  </div>

                  {/* Illustration Column */}
                  <div className={`relative aspect-square md:aspect-[4/3] w-full max-w-[600px] mx-auto ${idx % 2 === 0 ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
                    <div className="svc-reveal absolute inset-0 flex items-center justify-center">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className={`w-full h-full object-contain ${svc.number === '01' ? 'scale-[1.05] origin-center' :
                          svc.number === '02' ? 'scale-[0.75] origin-center' :
                            svc.number === '03' ? 'scale-[1.25] origin-center' :
                              svc.number === '04' ? 'scale-[0.85] origin-center -translate-y-8 lg:-translate-y-20' : ''
                          }`}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
        </div>

        {/* ============================================ */}
        {/* BOTTOM CTA                                   */}
        {/* ============================================ */}
        <section className="relative z-20 bg-transparent pt-4 md:pt-8 pb-12 md:pb-16 text-center mt-6 md:-mt-12 lg:-mt-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className={`svc-reveal ${playfair.className} text-3xl md:text-6xl font-black text-brand-dark leading-tight mb-8 md:mb-10`}>
              Not sure where to start?
            </h2>
            <div className="svc-reveal flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#brand-score"
                className="group inline-flex items-center justify-center gap-3 px-6 py-4 md:px-10 md:py-5 bg-brand-primary text-white font-bold text-base md:text-lg rounded-full hover:bg-brand-cream hover:text-brand-dark transition-all duration-300 shadow-[0_0_40px_rgba(30,124,112,0.3)]"
              >
                AI Brand Score
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 px-6 py-4 md:px-10 md:py-5 bg-transparent border border-brand-dark/20 text-brand-dark font-bold text-base md:text-lg rounded-full hover:bg-brand-dark/5 transition-all duration-300"
              >
                Grab a Coffee!
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
