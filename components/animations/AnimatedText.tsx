"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

interface AnimatedTextProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  splitType?: 'words' | 'chars' | 'lines' | 'words,chars';
  animation?: 'reveal-up' | 'fade-in' | 'stagger-chars' | 'slide-mask';
  stagger?: number;
  duration?: number;
  delay?: number;
  scrollTrigger?: boolean;
  triggerStart?: string;
  once?: boolean;
}

export function AnimatedText({
  children,
  as: Tag = 'p',
  className = '',
  splitType = 'words',
  animation = 'reveal-up',
  stagger = 0.04,
  duration = 1.2,
  delay = 0,
  scrollTrigger = true,
  triggerStart = 'top 85%',
  once = true,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, { type: splitType });
    const targets = splitType.includes('chars') ? split.chars : splitType === 'lines' ? split.lines : split.words;

    const animationConfig: Record<string, gsap.TweenVars> = {
      'reveal-up': {
        opacity: 0,
        yPercent: 100,
        rotateX: -90,
      },
      'fade-in': {
        opacity: 0,
        y: 20,
      },
      'stagger-chars': {
        opacity: 0,
        yPercent: 120,
        rotateX: -80,
        scale: 0.8,
      },
      'slide-mask': {
        opacity: 0,
        xPercent: -100,
      },
    };

    gsap.set(targets, animationConfig[animation] || animationConfig['reveal-up']);

    const tweenVars: gsap.TweenVars = {
      opacity: 1,
      yPercent: 0,
      xPercent: 0,
      y: 0,
      rotateX: 0,
      scale: 1,
      duration,
      stagger,
      delay,
      ease: 'expo.out',
    };

    if (scrollTrigger) {
      tweenVars.scrollTrigger = {
        trigger: textRef.current,
        start: triggerStart,
        once,
      };
    }

    gsap.to(targets, tweenVars);

    return () => {
      split.revert();
    };
  }, { scope: textRef });

  return (
    <Tag ref={textRef as any} className={`${className} line-mask`}>
      {children}
    </Tag>
  );
}
