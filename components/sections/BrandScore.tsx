"use client";

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Playfair_Display } from 'next/font/google';
import { ArrowRight, Check, Sparkles, RefreshCcw, ChevronDown, AlertTriangle, TrendingUp, Zap } from 'lucide-react';

gsap.registerPlugin(useGSAP);

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'], style: ['italic', 'normal'] });

const marketingChannels = ["Social Media", "SEO / Content", "Paid Ads", "Email Marketing", "Referrals / WOM", "Influencers / PR"];
const sizeOptions = ["1 - 10 Employees", "11 - 50 Employees", "50 - 200 Employees", "200+ Employees"];
const industryOptions = ["Technology / SaaS", "E-commerce", "Real Estate", "Healthcare", "Finance", "Agency / Services", "Other"];

// --- Custom UI Dropdown Component ---
function CustomSelect({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col gap-2 group">
      <label className="text-brand-cream/60 text-xs font-bold uppercase tracking-wider group-focus-within:text-brand-primary transition-colors">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-transparent border-b border-white/20 pb-2 flex justify-between items-center cursor-pointer hover:border-brand-primary transition-colors"
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
      gsap.to(formRef.current, { y: -30, opacity: 0, filter: "blur(10px)", duration: 0.4, display: "none" });
      gsap.fromTo(scanRef.current, { scale: 0.8, opacity: 0, display: "none" }, { scale: 1, opacity: 1, display: "flex", duration: 0.5, ease: "back.out(1.5)" });

      gsap.to('.scan-text', { opacity: 1, y: 0, stagger: 0.4, duration: 0.1 });

      // Simulate a long load that speeds up when the API returns
      progressTimeline.current = gsap.timeline();
      progressTimeline.current.to('.progress-bar', { width: "85%", duration: 4, ease: "power1.out" })
                              .to('.progress-bar', { width: "100%", duration: 0.5, ease: "power1.in" });

    } else if (phase === 2) {
      // PHASE 2: SCORE SLAM
      gsap.to(scanRef.current, { scale: 0.5, opacity: 0, duration: 0.3, display: "none" });
      gsap.fromTo(resultRef.current, { scale: 1.5, opacity: 0, display: "none" }, { scale: 1, opacity: 1, display: "flex", duration: 0.8, ease: "back.out(1.2)" });

      gsap.fromTo('.score-number', 
        { innerText: 0 },
        { innerText: result.score, duration: 2, snap: { innerText: 1 }, ease: "expo.out" }, "-=0.2"
      );
    } else if (phase === 0) {
      // RESTORE FORM
      gsap.fromTo(formRef.current, { opacity: 0, y: 20, display: "none" }, { opacity: 1, y: 0, display: "block", duration: 0.6, delay: 0.2 });
    }
  }, { dependencies: [phase, result], scope: containerRef });

  // Dynamic UI based on Score
  const getScoreUI = () => {
    if (result.score < 50) return {
      color: "text-red-500", glow: "shadow-[0_0_50px_rgba(239,68,68,0.3)]", icon: <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />,
      title: "Critical Alert: You are invisible.", cta: "Emergency Strategy Call",
    };
    if (result.score < 75) return {
      color: "text-yellow-400", glow: "shadow-[0_0_50px_rgba(250,204,21,0.3)]", icon: <TrendingUp className="w-8 h-8 text-yellow-400 mb-4" />,
      title: "You are blending into the noise.", cta: "Break the Mold (Book Call)",
    };
    return {
      color: "text-brand-primary", glow: "shadow-[0_0_50px_rgba(30,124,112,0.4)]", icon: <Zap className="w-8 h-8 text-brand-primary mb-4" />,
      title: "Strong, but leaving money on the table.", cta: "Scale to Dominance",
    };
  };

  const scoreUI = getScoreUI();

  return (
    <section id="brand-score" className="relative min-h-[100svh] bg-[#070707] flex items-center py-32 px-6 lg:px-12 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] bg-brand-primary/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

      <div ref={containerRef} className="w-full max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-16 lg:gap-24 relative z-10">
        
        {/* PITCH COLUMN */}
        <div className="xl:w-5/12 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest w-fit mb-6">
            <Sparkles className="w-4 h-4" /> Free AI Tool
          </div>
          <h2 className={`${playfair.className} text-6xl md:text-[80px] lg:text-[100px] font-black text-brand-cream leading-[0.9] tracking-tight mb-8`}>
            How strong is your brand?
          </h2>
          <p className="text-brand-beige/70 text-lg md:text-xl font-light leading-relaxed max-w-md">
            Our AI analyzes your digital footprint and industry delta to reveal exactly where you're blending in—and how StndOut can fix it.
          </p>
        </div>

        {/* TERMINAL COLUMN */}
        <div className="xl:w-7/12 w-full max-w-[700px] xl:max-w-none relative perspective-[1000px]">
          <div className="w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_0_80px_rgba(30,124,112,0.1)] relative min-h-[550px] flex flex-col justify-center">

            {/* --- STATE 0: FORM --- */}
            <div ref={formRef} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                
                <div className="flex flex-col gap-2 group md:col-span-2">
                  <label className="text-brand-cream/60 text-xs font-bold uppercase tracking-wider group-focus-within:text-brand-primary transition-colors">Website URL <span className="text-red-500">*</span></label>
                  <input 
                    type="url" 
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    placeholder="[https://yourwebsite.com](https://yourwebsite.com)" 
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-brand-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary transition-colors" 
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
                <div className="flex flex-wrap gap-3">
                  {marketingChannels.map(channel => {
                    const isSelected = selectedChannels.includes(channel);
                    return (
                      <button 
                        key={channel}
                        onClick={() => toggleChannel(channel)}
                        className={`px-4 py-2 rounded-full text-sm font-bold border transition-all duration-300 flex items-center gap-2 ${
                          isSelected ? 'bg-brand-primary border-brand-primary text-[#070707] shadow-[0_0_20px_rgba(30,124,112,0.4)]' : 'bg-transparent border-white/20 text-brand-cream/70 hover:border-brand-cream hover:text-brand-cream'
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4" />}
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
                <span className="relative z-10">Run AI Analysis</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>

            {/* --- STATE 1: SCANNING MATRIX --- */}
            <div ref={scanRef} className="absolute inset-0 w-full h-full hidden flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 mb-8 relative">
                <div className="absolute inset-0 border-4 border-brand-primary/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="h-12 overflow-hidden flex flex-col items-center mb-8 relative w-full">
                <p className="scan-text opacity-0 translate-y-4 text-brand-cream/60 font-mono text-sm tracking-widest uppercase absolute">Connecting to Gemini Engine...</p>
                <p className="scan-text opacity-0 translate-y-4 text-brand-primary font-mono text-sm tracking-widest uppercase absolute">Analyzing Market Delta...</p>
                <p className="scan-text opacity-0 translate-y-4 text-brand-cream/60 font-mono text-sm tracking-widest uppercase absolute">Evaluating Channel Strategy...</p>
                <p className="scan-text opacity-0 translate-y-4 text-white font-mono text-sm tracking-widest uppercase absolute">Compiling StndOut Verdict...</p>
              </div>
              <div className="w-full max-w-sm h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="progress-bar h-full bg-brand-primary w-0 shadow-[0_0_10px_rgba(30,124,112,1)]" />
              </div>
            </div>

            {/* --- STATE 2: DYNAMIC RESULT FUNNEL --- */}
            <div ref={resultRef} className="absolute inset-0 w-full h-full hidden flex-col items-center justify-center text-center p-8 md:p-12">
              {scoreUI.icon}
              
              <div className="flex items-start justify-center gap-2 mb-2">
                <span className={`${playfair.className} score-number text-[100px] md:text-[140px] leading-none font-black ${scoreUI.color} ${scoreUI.glow}`}>
                  0
                </span>
                <span className="text-2xl font-bold text-white/20 mt-6">/100</span>
              </div>

              <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">{scoreUI.title}</h4>
              <p className="text-brand-beige/80 max-w-md mb-10 text-lg leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/5 italic">
                "{result.verdict}"
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button className="flex-1 bg-brand-cream text-[#070707] font-black py-4 rounded-xl hover:bg-white transition-colors shadow-[0_0_20px_rgba(236,220,201,0.3)]">
                  {scoreUI.cta}
                </button>
                <button 
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-transparent border border-white/20 text-brand-cream font-bold rounded-xl hover:bg-white/10 transition-colors"
                >
                  <RefreshCcw className="w-5 h-5" /> Retest
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}