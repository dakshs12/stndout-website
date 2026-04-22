"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      const hash = href.replace('/', ''); 
      const smoother = ScrollSmoother.get();
      if (smoother && document.querySelector(hash)) {
        smoother.scrollTo(hash, true, "top top");
      }
    } 
    else if (href === '/' && pathname === '/') {
      e.preventDefault();
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.scrollTo(0, true);
    }
    
    setIsMobileMenuOpen(false);
  };

  useGSAP(() => {
    // FIX: We animate strictly colors and single integers now. No complex strings!
    const animateToLight = () => {
      gsap.to(navRef.current, {
        '--nav-bg': 'rgba(7, 7, 7, 0.05)',
        '--nav-border': 'rgba(7, 7, 7, 0.2)',
        '--logo-invert': 0, // Animating purely the integer
        '--nav-text': 'rgba(7, 7, 7, 0.9)',
        '--btn-bg': '#070707',
        '--btn-text': '#ECDCC9',
        '--btn-shadow-color': 'rgba(7, 7, 7, 0.2)', // Isolated color
        duration: 0.3,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    };

    const animateToDark = () => {
      gsap.to(navRef.current, {
        '--nav-bg': 'rgba(255, 255, 255, 0.05)',
        '--nav-border': 'rgba(255, 255, 255, 0.1)',
        '--logo-invert': 1, // Animating purely the integer
        '--nav-text': 'rgba(236, 220, 201, 0.9)',
        '--btn-bg': '#ECDCC9',
        '--btn-text': '#070707',
        '--btn-shadow-color': 'rgba(236, 220, 201, 0.3)', // Isolated color
        duration: 0.3,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    };

    const ctx = gsap.context(() => {
      animateToDark();

      setTimeout(() => {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.id === 'navTheme') trigger.kill();
        });

        const lightSections = gsap.utils.toArray('section.bg-brand-cream, section.bg-brand-white, section.bg-white, main.bg-brand-cream');

        lightSections.forEach((section: any) => {
          ScrollTrigger.create({
            id: 'navTheme',
            trigger: section,
            start: "top 80px", 
            end: "bottom 80px", 
            onEnter: animateToLight,
            onLeave: animateToDark,
            onEnterBack: animateToLight,
            onLeaveBack: animateToDark,
          });
        });

        ScrollTrigger.refresh();

        if (window.location.hash) {
          const smoother = ScrollSmoother.get();
          if (smoother) {
            setTimeout(() => smoother.scrollTo(window.location.hash, true, "top top"), 100);
          }
        }

      }, 100);
    });

    return () => ctx.revert();
  }, { dependencies: [pathname] }); 

  return (
    <>
      <div 
        ref={navRef} 
        className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] z-[100]"
        style={{
          '--nav-bg': 'rgba(255, 255, 255, 0.05)',
          '--nav-border': 'rgba(255, 255, 255, 0.1)',
          '--logo-invert': 1, // Start inverted for dark mode
          '--nav-text': 'rgba(236, 220, 201, 0.9)',
          '--btn-bg': '#ECDCC9',
          '--btn-text': '#070707',
          '--btn-shadow-color': 'rgba(236, 220, 201, 0.3)',
        } as React.CSSProperties}
      >
        <header className="w-full backdrop-blur-xl border shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl md:rounded-full px-4 md:px-8 py-3 md:py-4 flex items-center justify-between bg-[var(--nav-bg)] border-[color:var(--nav-border)]">
          
          <Link href="/" onClick={(e) => handleSmoothScroll(e, '/')} className="relative h-10 w-10 md:h-12 md:w-12 z-50 flex-shrink-0">
            <Image 
              src="/so-logo.png" 
              alt="SO Logo" 
              fill
              // Injecting the --logo-invert variable dynamically
              className="object-contain hover:opacity-100 transition-opacity [filter:brightness(0)_invert(var(--logo-invert))]"
              priority
            />
          </Link>

          <nav className="hidden md:flex gap-8 lg:gap-12 text-sm font-semibold tracking-widest uppercase text-[color:var(--nav-text)]">
            <Link href="/" onClick={(e) => handleSmoothScroll(e, '/')} className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-[text-shadow,color]">Home</Link>
            <Link href="/about" onClick={(e) => handleSmoothScroll(e, '/about')} className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-[text-shadow,color]">About Us</Link>
            <Link href="/#services" onClick={(e) => handleSmoothScroll(e, '/#services')} className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-[text-shadow,color]">Services</Link>
            <Link href="/blogs" onClick={(e) => handleSmoothScroll(e, '/blogs')} className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-[text-shadow,color]">Blogs</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/#brand-score" 
              onClick={(e) => handleSmoothScroll(e, '/#brand-score')}
              // Injecting the --btn-shadow-color dynamically so the pixel blur stays static
              className="group px-6 py-2.5 text-sm font-bold rounded-full flex items-center gap-2 bg-[var(--btn-bg)] text-[color:var(--btn-text)] [box-shadow:0px_4px_20px_0px_var(--btn-shadow-color)] hover:scale-105 transition-transform duration-300"
            >
              AI Brand Score
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">📊</span>
            </Link>

            <Link 
              href="/contact"
              onClick={(e) => handleSmoothScroll(e, '/contact')}
              className="group px-6 py-2.5 text-sm font-bold rounded-full flex items-center gap-2 bg-[var(--btn-bg)] text-[color:var(--btn-text)] [box-shadow:0px_4px_20px_0px_var(--btn-shadow-color)] hover:scale-105 transition-transform duration-300"
            >
              Grab a coffee!
              <span className="inline-block transition-transform duration-300 group-hover:rotate-12 group-hover:-translate-y-1">☕</span>
            </Link>
          </div>

          <button 
            className="md:hidden p-2 z-50 text-[color:var(--nav-text)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>
      </div>

      <div className={`fixed inset-0 bg-[#070707]/95 backdrop-blur-2xl z-[90] transition-all duration-500 ease-in-out flex flex-col justify-center px-6 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } md:hidden`}
      >
        <nav className="flex flex-col gap-8 text-2xl font-bold text-brand-beige text-center mt-12 tracking-widest uppercase">
          <Link href="/" onClick={(e) => handleSmoothScroll(e, '/')}>Home</Link>
          <Link href="/about" onClick={(e) => handleSmoothScroll(e, '/about')}>About Us</Link>
          <Link href="/#services" onClick={(e) => handleSmoothScroll(e, '/#services')}>Services</Link>
          <Link href="/blogs" onClick={(e) => handleSmoothScroll(e, '/blogs')}>Blogs</Link>
        </nav>

        <div className="flex flex-col items-center gap-4 mt-12">
          <Link 
            href="/#brand-score" 
            onClick={(e) => handleSmoothScroll(e, '/#brand-score')}
            className="group w-full max-w-xs justify-center px-6 py-4 bg-brand-cream text-[#070707] font-bold rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(236,220,201,0.3)] transition-transform hover:scale-105"
          >
            AI Brand Score
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">📊</span>
          </Link>
          <Link 
            href="/contact" 
            onClick={(e) => handleSmoothScroll(e, '/contact')}
            className="group w-full max-w-xs justify-center px-6 py-4 bg-brand-cream text-[#070707] font-bold rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(236,220,201,0.3)] transition-transform hover:scale-105"
          >
            Grab a coffee!
            <span className="inline-block transition-transform duration-300 group-hover:rotate-12 group-hover:-translate-y-1">☕</span>
          </Link>
        </div>
      </div>
    </>
  );
}