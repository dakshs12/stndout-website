"use client";

import { useState } from 'react';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['italic', 'normal']
});

export default function ContactPage() {
  const [stage, setStage] = useState('');
  const [offering, setOffering] = useState('');
  const [help, setHelp] = useState('');
  const [challenge, setChallenge] = useState('');

  return (
    <main className="min-h-screen bg-brand-cream selection:bg-brand-primary selection:text-white">
      
      {/* Important: Added bg-brand-cream to the section so your Chameleon Navbar knows to turn dark! */}
      <section className="relative pt-40 pb-24 min-h-screen flex items-center overflow-hidden bg-brand-cream">
        
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white/40 blur-[150px] rounded-full mix-blend-overlay pointer-events-none" />

        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
            
            {/* Left Column: Editorial Copy */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h1 className={`${playfair.className} text-6xl md:text-7xl lg:text-[100px] font-black text-brand-dark leading-[1] mb-8 tracking-tight`}>
                Let's brew <br/>
                <span className="italic text-brand-primary">something</span><br/>
                massive. ☕
              </h1>
              <p className="text-xl text-brand-dark/70 max-w-md font-medium leading-relaxed">
                No boring sales pitches. Just a conversation about what it takes to make your brand completely impossible to ignore.
              </p>
            </div>

            {/* Right Column: The Clean, White Frosted Form */}
            <div className="lg:col-span-7">
              <div className="bg-white/60 backdrop-blur-2xl border border-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative">
                
                <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                  
                  {/* Compulsory Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                      <label className="text-brand-dark/60 text-xs font-bold mb-2 uppercase tracking-widest">What should we call you? *</label>
                      <input type="text" placeholder="Your Name" required className="bg-transparent border-b-2 border-brand-dark/10 py-3 text-brand-dark focus:outline-none focus:border-brand-primary transition-colors text-lg placeholder:text-brand-dark/30 font-medium" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-brand-dark/60 text-xs font-bold mb-2 uppercase tracking-widest">Contact Details *</label>
                      <input type="text" placeholder="Email or Mobile" required className="bg-transparent border-b-2 border-brand-dark/10 py-3 text-brand-dark focus:outline-none focus:border-brand-primary transition-colors text-lg placeholder:text-brand-dark/30 font-medium" />
                    </div>
                    <div className="flex flex-col md:col-span-2">
                      <label className="text-brand-dark/60 text-xs font-bold mb-2 uppercase tracking-widest">Company Name *</label>
                      <input type="text" placeholder="Your Brand / Company" required className="bg-transparent border-b-2 border-brand-dark/10 py-3 text-brand-dark focus:outline-none focus:border-brand-primary transition-colors text-lg placeholder:text-brand-dark/30 font-medium" />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-brand-dark/10">
                    <p className="text-brand-primary font-bold text-sm tracking-widest uppercase mb-8">Just a few quick questions</p>
                  </div>

                  {/* Q1: Business Stage */}
                  <div>
                    <label className="block text-brand-dark text-lg font-bold mb-4">1. What best describes your business?</label>
                    <div className="flex flex-wrap gap-3">
                      {['Just starting out', '0–1 years old', 'Growing (1–3 years)', 'Established (3+ years)'].map((opt) => (
                        <button key={opt} type="button" onClick={() => setStage(opt)} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${stage === opt ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'bg-white border-brand-dark/10 text-brand-dark/70 hover:border-brand-primary/50'}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q2: Offering */}
                  <div>
                    <label className="block text-brand-dark text-lg font-bold mb-4">2. What do you offer?</label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {['Products', 'Services'].map((opt) => (
                        <button key={opt} type="button" onClick={() => setOffering(opt)} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${offering === opt ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'bg-white border-brand-dark/10 text-brand-dark/70 hover:border-brand-primary/50'}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                    <input type="text" placeholder="Briefly describe your offering..." className="w-full bg-white border border-brand-dark/10 rounded-xl px-5 py-4 text-brand-dark focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-medium placeholder:text-brand-dark/30 shadow-inner" />
                  </div>

                  {/* Q3: Help needed */}
                  <div>
                    <label className="block text-brand-dark text-lg font-bold mb-4">3. What are you looking for help with?</label>
                    <div className="flex flex-wrap gap-3">
                      {['Brand strategy', 'Marketing strategy', 'Social media growth', 'End-to-end marketing support', 'Not sure yet'].map((opt) => (
                        <button key={opt} type="button" onClick={() => setHelp(opt)} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${help === opt ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'bg-white border-brand-dark/10 text-brand-dark/70 hover:border-brand-primary/50'}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q4: Biggest Challenge */}
                  <div>
                    <label className="block text-brand-dark text-lg font-bold mb-4">4. What’s your biggest challenge right now?</label>
                    <div className="flex flex-wrap gap-3">
                      {['Not getting enough leads', 'Low engagement / visibility', 'No clear brand identity', 'Marketing feels random', 'Not converting customers', 'Scaling is difficult'].map((opt) => (
                        <button key={opt} type="button" onClick={() => setChallenge(opt)} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${challenge === opt ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'bg-white border-brand-dark/10 text-brand-dark/70 hover:border-brand-primary/50'}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button type="submit" className="w-full py-5 bg-brand-dark text-brand-beige rounded-xl font-bold text-lg hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-brand-primary/20">
                      Send Request & Grab Coffee ☕
                    </button>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}