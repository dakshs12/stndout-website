"use client";

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Playfair_Display } from 'next/font/google';
import { Footer } from '@/components/sections/Footer';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

gsap.registerPlugin(useGSAP);

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['italic', 'normal'],
});

export default function ContactPage() {
  const [stage, setStage] = useState('');
  const [offering, setOffering] = useState('');
  const [help, setHelp] = useState('');
  const [challenge, setChallenge] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useGSAP(() => {
    if (!pageRef.current) return;

    const reveals = pageRef.current.querySelectorAll('.contact-reveal');
    const tl = gsap.timeline({ delay: 0.3 });

    gsap.set(reveals, { opacity: 0, y: 40 });

    tl.to(reveals, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // Animate form fields individually
    const fields = pageRef.current.querySelectorAll('.form-field');
    gsap.set(fields, { opacity: 0, y: 30 });
    gsap.to(fields, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: 'power2.out',
      delay: 0.6,
    });
  }, { scope: pageRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will be wired to Web3Forms later
    setSubmitted(true);
    gsap.fromTo('.success-message',
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }
    );
  };

  const PillButton = ({
    label, selected, onClick
  }: { label: string; selected: boolean; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
        selected
          ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/30 scale-[1.02]'
          : 'bg-white border-brand-dark/10 text-brand-dark/70 hover:border-brand-primary/50 hover:text-brand-dark'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div ref={pageRef}>
      <main className="min-h-screen bg-brand-cream selection:bg-brand-primary selection:text-white">

        {/* Important: bg-brand-cream on section for chameleon navbar */}
        <section className="relative pt-40 pb-24 min-h-screen flex items-center overflow-hidden bg-brand-cream">

          {/* Subtle Background Accents */}
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-primary/[0.04] blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-white/40 blur-[120px] rounded-full pointer-events-none" />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(7,7,7,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(7,7,7,0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">

              {/* Left Column: Editorial Copy + Contact Info */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="contact-reveal">
                  <h1 className={`${playfair.className} text-5xl md:text-7xl lg:text-[90px] font-black text-brand-dark leading-[1] mb-8 tracking-tight`}>
                    Let&apos;s brew <br />
                    <span className="italic text-brand-primary">something</span><br />
                    massive. ☕
                  </h1>
                </div>
                <p className="contact-reveal text-xl text-brand-dark/70 max-w-md font-medium leading-relaxed mb-12">
                  No boring sales pitches. Just a conversation about what it takes to make your brand completely impossible to ignore.
                </p>

                {/* Contact details */}
                <div className="space-y-5">
                  <a
                    href="mailto:hello@stndout.com"
                    className="contact-reveal flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                      <Mail className="w-5 h-5 text-brand-primary" />
                    </div>
                    <span className="text-brand-dark/70 font-medium group-hover:text-brand-primary transition-colors">
                      hello@stndout.com
                    </span>
                  </a>
                  <div className="contact-reveal flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-brand-primary" />
                    </div>
                    <span className="text-brand-dark/70 font-medium">
                      Remote-first, globally available
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: The Form */}
              <div className="lg:col-span-7">
                {submitted ? (
                  <div className="success-message bg-white/60 backdrop-blur-2xl border border-white rounded-[2rem] p-12 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.05)] text-center">
                    <div className="text-6xl mb-6">🎉</div>
                    <h2 className={`${playfair.className} text-3xl md:text-4xl font-black text-brand-dark mb-4`}>
                      Coffee&apos;s brewing!
                    </h2>
                    <p className="text-brand-dark/60 text-lg max-w-md mx-auto">
                      We&apos;ve received your request and will get back to you within 24 hours. Time to start standing out.
                    </p>
                  </div>
                ) : (
                  <div className="bg-white/60 backdrop-blur-2xl border border-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative">

                    <form ref={formRef} className="space-y-10" onSubmit={handleSubmit}>

                      {/* Compulsory Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="form-field flex flex-col">
                          <label className="text-brand-dark/60 text-xs font-bold mb-2 uppercase tracking-widest">
                            What should we call you? *
                          </label>
                          <input
                            type="text"
                            placeholder="Your Name"
                            required
                            className="bg-transparent border-b-2 border-brand-dark/10 py-3 text-brand-dark focus:outline-none focus:border-brand-primary transition-colors text-lg placeholder:text-brand-dark/30 font-medium"
                          />
                        </div>
                        <div className="form-field flex flex-col">
                          <label className="text-brand-dark/60 text-xs font-bold mb-2 uppercase tracking-widest">
                            Contact Details *
                          </label>
                          <input
                            type="text"
                            placeholder="Email or Mobile"
                            required
                            className="bg-transparent border-b-2 border-brand-dark/10 py-3 text-brand-dark focus:outline-none focus:border-brand-primary transition-colors text-lg placeholder:text-brand-dark/30 font-medium"
                          />
                        </div>
                        <div className="form-field flex flex-col md:col-span-2">
                          <label className="text-brand-dark/60 text-xs font-bold mb-2 uppercase tracking-widest">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            placeholder="Your Brand / Company"
                            required
                            className="bg-transparent border-b-2 border-brand-dark/10 py-3 text-brand-dark focus:outline-none focus:border-brand-primary transition-colors text-lg placeholder:text-brand-dark/30 font-medium"
                          />
                        </div>
                      </div>

                      <div className="form-field pt-6 border-t border-brand-dark/10">
                        <p className="text-brand-primary font-bold text-sm tracking-widest uppercase mb-8">
                          Just a few quick questions
                        </p>
                      </div>

                      {/* Q1: Business Stage */}
                      <div className="form-field">
                        <label className="block text-brand-dark text-lg font-bold mb-4">
                          1. What best describes your business?
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {['Just starting out', '0–1 years old', 'Growing (1–3 years)', 'Established (3+ years)'].map((opt) => (
                            <PillButton key={opt} label={opt} selected={stage === opt} onClick={() => setStage(opt)} />
                          ))}
                        </div>
                      </div>

                      {/* Q2: Offering */}
                      <div className="form-field">
                        <label className="block text-brand-dark text-lg font-bold mb-4">
                          2. What do you offer?
                        </label>
                        <div className="flex flex-wrap gap-3 mb-4">
                          {['Products', 'Services'].map((opt) => (
                            <PillButton key={opt} label={opt} selected={offering === opt} onClick={() => setOffering(opt)} />
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Briefly describe your offering..."
                          className="w-full bg-white border border-brand-dark/10 rounded-xl px-5 py-4 text-brand-dark focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-medium placeholder:text-brand-dark/30 shadow-inner"
                        />
                      </div>

                      {/* Q3: Help needed */}
                      <div className="form-field">
                        <label className="block text-brand-dark text-lg font-bold mb-4">
                          3. What are you looking for help with?
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {['Brand strategy', 'Marketing strategy', 'Social media growth', 'End-to-end marketing support', 'Not sure yet'].map((opt) => (
                            <PillButton key={opt} label={opt} selected={help === opt} onClick={() => setHelp(opt)} />
                          ))}
                        </div>
                      </div>

                      {/* Q4: Biggest Challenge */}
                      <div className="form-field">
                        <label className="block text-brand-dark text-lg font-bold mb-4">
                          4. What&apos;s your biggest challenge right now?
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {['Not getting enough leads', 'Low engagement / visibility', 'No clear brand identity', 'Marketing feels random', 'Not converting customers', 'Scaling is difficult'].map((opt) => (
                            <PillButton key={opt} label={opt} selected={challenge === opt} onClick={() => setChallenge(opt)} />
                          ))}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="form-field pt-4">
                        <button
                          type="submit"
                          className="group w-full py-5 bg-brand-dark text-brand-beige rounded-xl font-bold text-lg hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-brand-primary/20 flex items-center justify-center gap-3"
                        >
                          Send Request & Grab Coffee ☕
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}