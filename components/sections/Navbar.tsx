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

  const isDarkPage = pathname === '/';

  useGSAP(() => {
    // FIX: We animate strictly colors and single integers now. No complex strings!
    const animateToLight = () => {
      gsap.to(navRef.current, {
        '--nav-bg': 'rgba(7, 7, 7, 0.05)',
        '--nav-border': 'rgba(7, 7, 7, 0.2)',
        '--logo-invert': 0, // Animating purely the integer
        '--nav-text': 'rgba(7, 7, 7, 0.9)',
        '--btn-bg': '#070707',
        '--btn-text': '#fff8f4',
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
        '--nav-text': 'rgba(255, 248, 244, 0.9)',
        '--btn-bg': '#fff8f4',
        '--btn-text': '#070707',
        '--btn-shadow-color': 'rgba(255, 248, 244, 0.3)', // Isolated color
        duration: 0.3,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    };

    // Kill any existing navTheme triggers to prevent duplicates when changing routes
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.id && String(trigger.vars.id).startsWith('navTheme')) {
        trigger.kill();
      }
    });

    // Default theme depends on the page
    if (isDarkPage) {
      animateToDark();
    } else {
      animateToLight();
    }

    // Give the DOM a moment to mount the new page's sections
    const timer = setTimeout(() => {
      const lightSections = gsap.utils.toArray('section.bg-brand-cream, section.bg-brand-white, section.bg-white, main.bg-brand-cream, section.bg-transparent');

      lightSections.forEach((section: any, i: number) => {
        ScrollTrigger.create({
          id: 'navThemeLight-' + i,
          trigger: section,
          start: "top 80px", 
          end: "bottom 80px", 
          onEnter: animateToLight,
          onLeave: isDarkPage ? animateToDark : animateToLight,
          onEnterBack: animateToLight,
          onLeaveBack: isDarkPage ? animateToDark : animateToLight,
        });
      });

      const darkSections = gsap.utils.toArray('section.bg-brand-dark, section.bg-black');
      darkSections.forEach((section: any, i: number) => {
        ScrollTrigger.create({
          id: 'navThemeDark-' + i,
          trigger: section,
          start: "top 80px", 
          end: "bottom 80px", 
          onEnter: animateToDark,
          onLeave: isDarkPage ? animateToDark : animateToLight,
          onEnterBack: animateToDark,
          onLeaveBack: isDarkPage ? animateToDark : animateToLight,
        });
      });

      ScrollTrigger.refresh();

      if (window.location.hash) {
        const smoother = ScrollSmoother.get();
        if (smoother) {
          setTimeout(() => smoother.scrollTo(window.location.hash, true, "top top"), 100);
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, { dependencies: [pathname] }); 

  return (
    <>
      <div 
        ref={navRef} 
        className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] z-[100]"
        style={{
          '--nav-bg': isDarkPage ? 'rgba(255, 255, 255, 0.05)' : 'rgba(7, 7, 7, 0.05)',
          '--nav-border': isDarkPage ? 'rgba(255, 255, 255, 0.1)' : 'rgba(7, 7, 7, 0.2)',
          '--logo-invert': isDarkPage ? 1 : 0,
          '--nav-text': isDarkPage ? 'rgba(255, 248, 244, 0.9)' : 'rgba(7, 7, 7, 0.9)',
          '--btn-bg': isDarkPage ? '#fff8f4' : '#070707',
          '--btn-text': isDarkPage ? '#070707' : '#fff8f4',
          '--btn-shadow-color': isDarkPage ? 'rgba(255, 248, 244, 0.3)' : 'rgba(7, 7, 7, 0.2)',
        } as React.CSSProperties}
      >
        <header className="w-full backdrop-blur-xl border shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl md:rounded-full px-4 md:px-8 py-2 md:py-3 flex items-center justify-between bg-[var(--nav-bg)] border-[color:var(--nav-border)]">
          
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
            <Link href="/" onClick={(e) => handleSmoothScroll(e, '/')} className={`transition-opacity duration-300 ${pathname === '/' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>Home</Link>
            <Link href="/about" onClick={(e) => handleSmoothScroll(e, '/about')} className={`transition-opacity duration-300 ${pathname === '/about' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>About Us</Link>
            <Link href="/services" onClick={(e) => handleSmoothScroll(e, '/services')} className={`transition-opacity duration-300 ${pathname === '/services' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>Services</Link>
            <Link href="/blogs" onClick={(e) => handleSmoothScroll(e, '/blogs')} className={`transition-opacity duration-300 ${pathname === '/blogs' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>Blogs</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/contact"
              onClick={(e) => handleSmoothScroll(e, '/contact')}
              className="group px-6 py-2.5 text-sm font-bold rounded-full flex items-center gap-2 bg-[var(--btn-bg)] text-[color:var(--btn-text)] [box-shadow:0px_4px_20px_0px_var(--btn-shadow-color)] hover:scale-105 transition-transform duration-300"
            >
              Grab a Coffee!
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
          <Link href="/services" onClick={(e) => handleSmoothScroll(e, '/services')}>Services</Link>
          <Link href="/blogs" onClick={(e) => handleSmoothScroll(e, '/blogs')}>Blogs</Link>
        </nav>

        <div className="flex flex-col items-center gap-4 mt-12">
          <Link 
            href="/contact" 
            onClick={(e) => handleSmoothScroll(e, '/contact')}
            className="group w-full max-w-xs justify-center px-6 py-4 bg-brand-cream text-[#070707] font-bold rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(255,248,244,0.3)] transition-transform hover:scale-105"
          >
            Grab a Coffee!
          </Link>
        </div>
      </div>
    </>
  );
}