"use client";

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Playfair_Display, Quicksand } from 'next/font/google';
import { ArrowRight, Check, Sparkles, RefreshCcw, ChevronDown, AlertTriangle, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(useGSAP);

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'], style: ['italic', 'normal'] });
const quicksand = Quicksand({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

const marketingChannels = ["Social Media", "SEO / Content", "Paid Ads", "Email Marketing", "Referrals / WOM", "Influencers / PR"];
const sizeOptions = ["1 - 10 Employees", "11 - 50 Employees", "50 - 200 Employees", "200+ Employees"];
const industryOptions = ["Technology / SaaS", "E-commerce", "Real Estate", "Healthcare", "Finance", "Agency / Services", "Agriculture", "Other"];

// --- Custom UI Dropdown Component ---
function CustomSelect({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col gap-2 group">
      <label className={`text-xs font-bold uppercase tracking-wider transition-colors ${isOpen ? 'text-[#D0FF27]' : 'text-brand-cream/60 group-focus-within:text-[#D0FF27]'}`}>{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-transparent border-b pb-2 flex justify-between items-center cursor-pointer transition-colors ${isOpen ? 'border-[#D0FF27]' : 'border-white/20 hover:border-[#D0FF27]'}`}
      >
        <span className={value ? "text-brand-white" : "text-white/20"}>{value || `Select ${label.toLowerCase()}...`}</span>
        <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 w-full mt-2 bg-[#111] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col backdrop-blur-xl">
            {options.map(opt => (
              <div 
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className="px-4 py-3 text-sm text-brand-cream/80 hover:bg-brand-primary hover:text-[#070707] cursor-pointer transition-colors"
              >
                {opt}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function BrandScore() {
  // Phase 0: Form, Phase 1: Scanning, Phase 2: Result
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  
  // Form State
  const [formData, setFormData] = useState({ url: '', industry: '', size: '' });
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  
  // API Result State
  const [result, setResult] = useState({ score: 0, verdict: '' });
  const [error, setError] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const progressTimeline = useRef<gsap.core.Timeline | null>(null);

  const toggleChannel = (channel: string) => {
    setSelectedChannels(prev => prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]);
  };

  const handleAnalyze = async () => {
    if (!formData.url) {
      setError("Please enter your Website URL.");
      return;
    }
    setError('');
    setPhase(1);

    try {
      // Fetch from our new Gemini Backend
      const res = await fetch('/api/brand-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, channels: selectedChannels }),
      });
      
      const data = await res.json();
      setResult({ score: data.score, verdict: data.verdict });
      
      // Force progress bar to finish quickly
      if (progressTimeline.current) progressTimeline.current.timeScale(4);
      
      setTimeout(() => setPhase(2), 500); // Slight delay for smoothness

    } catch (err) {
      // Fallback if API completely fails network-side
      setResult({ score: 45, verdict: "System fallback triggered. Your digital footprint lacks cohesive structure." });
      setPhase(2);
    }
  };

  const handleReset = () => {
    setPhase(0);
    setResult({ score: 0, verdict: '' });
  };

  useGSAP(() => {
    if (phase === 1) {
      // PHASE 1: TRANSITION & SCANNING
      const transitionTl = gsap.timeline();
      transitionTl.to(formRef.current, { y: -30, opacity: 0, filter: "blur(10px)", duration: 0.3 })
                  .set(formRef.current, { display: "none" })
                  .fromTo(scanRef.current, { scale: 0.8, opacity: 0, display: "none" }, { scale: 1, opacity: 1, display: "flex", duration: 0.4, ease: "back.out(1.5)" }, "+=0.1");

      const scanTexts = gsap.utils.toArray('.scan-text');
      const textTl = gsap.timeline({ delay: 0.8 });
      scanTexts.forEach((text: any) => {
        textTl.fromTo(text, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 })
              .to(text, { opacity: 0, y: -10, duration: 0.3 }, "+=0.5");
      });

      // Simulate a long load that speeds up when the API returns
      progressTimeline.current = gsap.timeline();
      progressTimeline.current.to('.progress-bar', { width: "85%", duration: 4, ease: "power1.out", delay: 0.5 })
                              .to('.progress-bar', { width: "100%", duration: 0.5, ease: "power1.in" });

    } else if (phase === 2) {
      // PHASE 2: SCORE REVEAL
      gsap.set(formRef.current, { display: "none" });
      gsap.set(scanRef.current, { display: "none", opacity: 0, visibility: "hidden" });
      gsap.fromTo(resultRef.current, { opacity: 0, y: 30, display: "none" }, { opacity: 1, y: 0, display: "flex", duration: 0.6, ease: "power3.out" });

      // Animate the score ring
      const ringEl = document.querySelector('.score-ring');
      if (ringEl) {
        const c = 2 * Math.PI * 54;
        const target = c - (Math.min(result.score, 100) / 100) * c;
        gsap.to(ringEl, { strokeDashoffset: target, duration: 2.5, ease: "power3.out", delay: 0.3 });
      }

      // Animate the counter number
      const counter = { val: 0 };
      gsap.to(counter, {
        val: result.score,
        duration: 2.5,
        delay: 0.3,
        ease: "power3.out",
        onUpdate: () => {
          const el = document.querySelector('.score-number');
          if (el) el.innerHTML = Math.round(counter.val).toString();
        }
      });
    } else if (phase === 0) {
      // RESTORE FORM
      gsap.to(resultRef.current, { opacity: 0, scale: 0.9, duration: 0.3, display: "none" });
      gsap.set(scanRef.current, { display: "none" });
      gsap.set(formRef.current, { filter: "blur(0px)" });
      gsap.fromTo(formRef.current, { opacity: 0, y: 20, display: "none" }, { opacity: 1, y: 0, display: "block", duration: 0.6, delay: 0.2 });
    }
  }, { dependencies: [phase], scope: containerRef });

  // Dynamic UI based on Score — professional & positive
  const getScoreUI = () => {
    if (result.score <= 40) return {
      color: "text-amber-400",
      ringColor: "stroke-amber-400",
      glowBg: "bg-amber-400/10",
      label: "Growth Opportunity",
      subtitle: "Your brand has untapped potential.",
      cta: "Let\u2019s Build Your Strategy",
    };
    if (result.score <= 60) return {
      color: "text-sky-400",
      ringColor: "stroke-sky-400",
      glowBg: "bg-sky-400/10",
      label: "Good Foundation",
      subtitle: "You\u2019ve started strong — now let\u2019s accelerate your growth.",
      cta: "Accelerate My Growth",
    };
    if (result.score <= 80) return {
      color: "text-fuchsia-400",
      ringColor: "stroke-fuchsia-400",
      glowBg: "bg-fuchsia-400/10",
      label: "Strong Presence",
      subtitle: "Your brand is performing well. Let\u2019s take it to the next level.",
      cta: "Scale My Brand",
    };
    return {
      color: "text-emerald-400",
      ringColor: "stroke-emerald-400",
      glowBg: "bg-emerald-400/10",
      label: "Built to StndOut",
      subtitle: "Let\u2019s keep the momentum going.",
      cta: "Let\u2019s Dominate Together",
    };
  };

  const scoreUI = getScoreUI();
  const scorePercent = Math.min(result.score, 100);
  const circumference = 2 * Math.PI * 54; // radius = 54
  const strokeOffset = circumference - (scorePercent / 100) * circumference;

  return (
    <section id="brand-score" className="relative min-h-[100svh] bg-brand-primary flex items-center py-32 px-6 lg:px-12 overflow-hidden">

      <div ref={containerRef} className="w-full max-w-[1400px] mx-auto flex flex-col relative z-10">
        
        <h2 className={`${playfair.className} text-5xl md:text-7xl lg:text-[80px] xl:text-[90px] font-black text-brand-cream leading-[0.85] tracking-tight mb-12 md:mb-16 md:whitespace-nowrap`}>
          Your StndOUT Score
        </h2>

        <div className="flex flex-col xl:flex-row gap-16 lg:gap-24 w-full">
          {/* PITCH COLUMN */}
          <div className="xl:w-5/12 flex flex-col justify-start xl:pt-4">
            <h3 className={`${quicksand.className} text-4xl md:text-5xl lg:text-[60px] font-black text-brand-cream leading-[0.9] tracking-tight mb-6`}>
              How strong is your brand?
            </h3>
            <p className="text-brand-beige/70 text-lg md:text-xl font-light leading-relaxed max-w-md">
              Get a quick score on your brand's visibility, positioning and growth potential.
            </p>
          </div>

          {/* TERMINAL COLUMN */}
          <div className="xl:w-7/12 w-full max-w-[700px] xl:max-w-none relative perspective-[1000px]">
            <div className="w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_0_80px_rgba(30,124,112,0.1)] relative min-h-[550px] flex flex-col justify-center">

            {/* --- STATE 0: FORM --- */}
            <div ref={formRef} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                
                <div className="flex flex-col gap-2 group md:col-span-2">
                  <label className="text-brand-cream/60 text-xs font-bold uppercase tracking-wider group-focus-within:text-[#D0FF27] transition-colors">Website URL <span className="text-red-500">*</span></label>
                  <input 
                    type="url" 
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    placeholder="https://yourwebsite.com" 
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-brand-white placeholder:text-white/20 focus:outline-none focus:border-[#D0FF27] transition-colors" 
                  />
                  {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
                </div>

                <CustomSelect 
                  label="Industry / Niche" 
                  options={industryOptions} 
                  value={formData.industry} 
                  onChange={(val) => setFormData({...formData, industry: val})} 
                />
                
                <CustomSelect 
                  label="Business Size" 
                  options={sizeOptions} 
                  value={formData.size} 
                  onChange={(val) => setFormData({...formData, size: val})} 
                />
              </div>

              <div className="mb-12">
                <label className="text-brand-cream/60 text-xs font-bold uppercase tracking-wider block mb-4">Active Marketing Channels</label>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {marketingChannels.map(channel => {
                    const isSelected = selectedChannels.includes(channel);
                    return (
                      <button 
                        key={channel}
                        onClick={() => toggleChannel(channel)}
                        className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[13px] md:text-sm font-bold border transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                          isSelected ? 'bg-[#D0FF27] border-[#D0FF27] text-[#070707] shadow-[0_0_20px_rgba(208,255,39,0.3)]' : 'bg-transparent border-white/20 text-brand-cream/70 hover:border-brand-cream hover:text-brand-cream'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                        {channel}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button 
                onClick={handleAnalyze}
                className="w-full group relative overflow-hidden bg-brand-cream text-[#070707] font-black text-lg py-5 rounded-2xl flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] duration-300"
              >
                <span className="relative z-10">Get My Brand Score</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>

            {/* --- STATE 1: SCANNING MATRIX --- */}
            <div ref={scanRef} className="absolute inset-0 w-full h-full hidden flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 mb-8 relative">
                <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                <div className="absolute inset-0 border-4 border-[#D0FF27] border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="h-12 overflow-hidden flex flex-col justify-center items-center mb-8 relative w-full">
                <p className="scan-text opacity-0 text-brand-cream/60 font-mono text-sm tracking-widest uppercase absolute">Connecting to Gemini Engine...</p>
                <p className="scan-text opacity-0 text-[#D0FF27] font-mono text-sm tracking-widest uppercase absolute">Analyzing Market Delta...</p>
                <p className="scan-text opacity-0 text-brand-cream/60 font-mono text-sm tracking-widest uppercase absolute">Evaluating Channel Strategy...</p>
                <p className="scan-text opacity-0 text-white font-mono text-sm tracking-widest uppercase absolute">Compiling StndOut Verdict...</p>
              </div>
              <div className="w-full max-w-sm h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="progress-bar h-full bg-[#D0FF27] w-0 shadow-[0_0_10px_rgba(208,255,39,1)]" />
              </div>
            </div>

            {/* --- STATE 2: REDESIGNED RESULT --- */}
            <div ref={resultRef} className="absolute inset-0 w-full h-full hidden flex-col items-center justify-center text-center p-4 sm:p-6 md:p-10">
              
              {/* Score Ring */}
              <div className="relative w-28 h-28 md:w-44 md:h-44 mb-4 md:mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                  <circle 
                    cx="60" cy="60" r="54" fill="none" 
                    className={`${scoreUI.ringColor} score-ring`}
                    strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    style={{ transition: 'stroke-dashoffset 2.5s cubic-bezier(0.33,1,0.68,1)' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`${playfair.className} score-number text-4xl md:text-6xl font-black ${scoreUI.color} leading-none`}>
                    0
                  </span>
                  <span className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-widest mt-1">out of 100</span>
                </div>
              </div>

              {/* Tier Label */}
              <div className={`inline-flex items-center gap-1.5 md:gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full ${scoreUI.glowBg} border border-white/10 mb-3 md:mb-4`}>
                <Sparkles className={`w-3.5 h-3.5 md:w-4 md:h-4 ${scoreUI.color}`} />
                <span className={`text-[11px] md:text-sm font-bold ${scoreUI.color} uppercase tracking-wider`}>{scoreUI.label}</span>
              </div>

              {/* Subtitle */}
              <p className={`${quicksand.className} text-lg md:text-2xl font-bold text-white mb-2 md:mb-3`}>
                {scoreUI.subtitle}
              </p>

              {/* AI Verdict */}
              <p className="text-brand-beige/60 text-[12px] md:text-base leading-relaxed max-w-[95%] md:max-w-lg mb-5 md:mb-8">
                {result.verdict}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-2.5 md:gap-3 w-full max-w-md">
                <Link 
                  href="/contact" 
                  className="flex-1 group bg-brand-primary text-white text-sm md:text-base font-bold py-3 md:py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-primary/90 transition-colors shadow-[0_0_30px_rgba(30,124,112,0.3)]"
                >
                  {scoreUI.cta}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button 
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-4 md:px-5 py-3 md:py-3.5 bg-white/5 border border-white/10 text-brand-cream/80 text-sm md:text-base font-semibold rounded-xl hover:bg-white/10 transition-colors"
                >
                  <RefreshCcw className="w-3.5 h-3.5 md:w-4 md:h-4" /> Retest
                </button>
              </div>
            </div>

          </div>
        </div>

        </div>

      </div>
    </section>
  );
}