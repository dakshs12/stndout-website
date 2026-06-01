"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

gsap.registerPlugin(useGSAP);

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  innerStrength?: number;
}

export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 0.35,
  innerStrength = 0.15,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const inner = innerRef.current;

    const xTo = gsap.quickTo(button, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    const yTo = gsap.quickTo(button, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });

    let innerXTo: ReturnType<typeof gsap.quickTo>;
    let innerYTo: ReturnType<typeof gsap.quickTo>;
    if (inner) {
      innerXTo = gsap.quickTo(inner, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      innerYTo = gsap.quickTo(inner, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      xTo(distX * strength);
      yTo(distY * strength);

      if (inner && innerXTo && innerYTo) {
        innerXTo(distX * innerStrength);
        innerYTo(distY * innerStrength);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      if (inner && innerXTo && innerYTo) {
        innerXTo(0);
        innerYTo(0);
      }
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: buttonRef });

  const sharedProps = {
    ref: buttonRef as any,
    className: `inline-flex items-center justify-center will-change-transform ${className}`,
    onClick,
  };

  const innerContent = (
    <span ref={innerRef} className="inline-flex items-center gap-2 will-change-transform">
      {children}
    </span>
  );

  if (href) {
    return (
      <Link href={href} {...sharedProps}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button {...sharedProps}>
      {innerContent}
    </button>
  );
}
