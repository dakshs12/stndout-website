"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export function Preloader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Wait a brief moment for Next.js hydration to complete and GSAP to initialize
    const timer = setTimeout(() => {
      gsap.to(loaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = 'none';
        }
      });
    }, 600); 
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-brand-cream flex items-center justify-center pointer-events-none"
    >
      <div className="relative w-16 h-16 animate-pulse opacity-60">
        <Image 
          src="/so-logo.png" 
          alt="StndOut" 
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
