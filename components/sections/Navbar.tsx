"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 h-[56px] md:h-[64px] bg-brand-white/90 backdrop-blur-md border-b border-brand-gray/20 transition-all duration-300">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 h-full flex items-center justify-between">
          
          {/* Left: Logo Image */}
          <Link href="#hero" className="flex items-center relative h-8 w-32 md:h-12 md:w-48 z-50">
            <Image 
              src="/stndout.png" 
              alt="StndOut Logo" 
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Center: Desktop Links */}
          <nav className="hidden md:flex gap-8 text-sm font-bold text-brand-dark uppercase tracking-widest absolute left-1/2 -translate-x-1/2">
            <a href="#hero" className="hover:text-brand-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-brand-primary transition-colors">About</a>
            <a href="#services" className="hover:text-brand-primary transition-colors">Services</a>
            <a href="#blogs" className="hover:text-brand-primary transition-colors">Blogs</a>
          </nav>

          {/* Right: Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#brand-score" 
              className="hidden lg:inline-flex items-center justify-center px-5 py-2 bg-brand-cream/50 text-brand-dark text-sm font-bold rounded-full hover:bg-brand-cream border border-brand-cream transition-all"
            >
              AI Brand Score 📊
            </a>
            <button className="inline-flex items-center justify-center px-6 py-2.5 bg-brand-dark text-brand-beige text-sm font-bold rounded-full hover:bg-brand-primary transition-colors shadow-lg shadow-brand-dark/10">
              Grab a coffee! ☕
            </button>
          </div>

          {/* Mobile: Hamburger Toggle */}
          <button 
            className="md:hidden p-2 text-brand-dark z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-brand-white z-40 transition-transform duration-300 ease-in-out flex flex-col justify-center px-6 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } md:hidden`}
      >
        <nav className="flex flex-col gap-6 text-2xl font-bold text-brand-dark uppercase tracking-widest text-center mt-12">
          <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors">Home</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors">About</a>
          <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors">Services</a>
          <a href="#blogs" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors">Blogs</a>
        </nav>

        <div className="flex flex-col items-center gap-4 mt-12">
          <a 
            href="#brand-score" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full max-w-xs inline-flex items-center justify-center px-5 py-3 bg-brand-cream text-brand-dark text-lg font-bold rounded-full transition-all"
          >
            AI Brand Score 📊
          </a>
          <button className="w-full max-w-xs inline-flex items-center justify-center px-6 py-3 bg-brand-dark text-brand-beige text-lg font-bold rounded-full shadow-lg">
            Grab a coffee! ☕
          </button>
        </div>
      </div>
    </>
  );
}