"use client";

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Playfair_Display } from 'next/font/google';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['italic', 'normal'],
});

const footerLinks = {
  company: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Strategy', href: '/services#strategy' },
    { label: 'Media & Delivery', href: '/services#media' },
    { label: 'Content & SEO', href: '/services#content' },
    { label: 'Technical', href: '/services#technical' },
  ],
  resources: [
    { label: 'AI Brand Score', href: '/#brand-score' },
    { label: 'Blog', href: '/blogs' },
  ],
};

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/stndout-marketing/posts/?feedView=all',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/stndout_strategy/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/people/StndOut-Strategy/pfbid0xdx6H4zyMuzXXYsvmS5k28Sy6RMsBzRBnspDMpGxB2jU5QQ2cDY9ngW5DM1fbLaXl/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    const elements = footerRef.current.querySelectorAll('.footer-reveal');

    gsap.set(elements, { opacity: 0, y: 40 });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
        once: true,
      },
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative bg-[#070707] text-brand-cream overflow-hidden">
      {/* Gradient accent at the top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />

      {/* CTA Banner */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="footer-reveal">
            <h2 className={`${playfair.className} text-4xl md:text-6xl lg:text-7xl font-black leading-[1] tracking-tight`}>
              Ready to{' '}
              <span className="italic text-brand-primary">stand out</span>?
            </h2>
          </div>
          <div className="footer-reveal">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-brand-cream text-[#070707] font-bold text-lg rounded-full hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-[0_0_40px_rgba(236,220,201,0.15)]"
            >
              Let&apos;s Talk
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer columns */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 footer-reveal">
            <div className="relative w-12 h-12 mb-6">
              <Image
                src="/so-logo.png"
                alt="StndOUT Logo"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-brand-cream/50 text-sm leading-relaxed max-w-xs mb-8">
              StndOut is a strategy-led marketing agency helping ambitious brands grow through branding, digital marketing and unforgettable experiences.
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-cream/50 hover:text-brand-primary hover:border-brand-primary/50 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div className="col-span-1 md:col-span-2 footer-reveal">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cream/40 mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-cream/60 hover:text-brand-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div className="col-span-1 md:col-span-2 footer-reveal">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cream/40 mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-cream/60 hover:text-brand-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div className="col-span-1 md:col-span-2 footer-reveal">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cream/40 mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-cream/60 hover:text-brand-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="col-span-1 md:col-span-2 footer-reveal">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cream/40 mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-brand-cream/60 hover:text-brand-primary transition-colors duration-300"
                >
                  Book a Call ☕
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@stndout.com"
                  className="text-sm text-brand-cream/60 hover:text-brand-primary transition-colors duration-300"
                >
                  hello@stndout.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-cream/30 text-xs tracking-wider">
            © {new Date().getFullYear()} StndOUT. All rights reserved.
          </p>
          <p className="text-brand-cream/20 text-xs tracking-wider">
            Built to stand out.
          </p>
        </div>
      </div>
    </footer>
  );
}
