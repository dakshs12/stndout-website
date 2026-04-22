"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

// Register the plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initializes the luxury momentum scrolling
    let smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.5, // The momentum duration (how long it glides)
      effects: true, // Enables data-speed parallax on child elements
      smoothTouch: 0.1, 
      normalizeScroll: true,
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} id="smooth-wrapper" className="overflow-hidden bg-[#070707]">
      <div ref={contentRef} id="smooth-content" className="will-change-transform">
        {children}
      </div>
    </div>
  );
}