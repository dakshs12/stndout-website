'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { MousePointerClick } from 'lucide-react';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['italic', 'normal'],
});

gsap.registerPlugin(ScrollTrigger, useGSAP);

const foundersData = [
  {
    name: 'Khushi Sethi',
    role: 'Co-Founder | Strategy & Growth',
    bio: 'She brings international marketing experience from London, UK, having worked with global teams and brands across diverse markets. Her expertise lies in building scalable marketing strategies, understanding consumer behaviour and analysing business objectives into impactful campaigns. She\'s mostly documenting everything or asking "But what\'s the objective?" for the tenth time.',
    rotation: -4,
    align: 'left',
    image: '/websiteimage-khushi.jpg'
  },
  {
    name: 'Pranita Pareek',
    role: 'Co-Founder | Creative & Brand',
    bio: 'She brings expertise in brand marketing and creative direction, having worked closely with fashion and FMCG brands across India. From crafting compelling brand narratives to designing campaigns that connect with the right audience, she specialises in building brands that are both memorable and commercially effective. You will likely find her curating moodboards and exploring visual inspiration.',
    rotation: 5,
    align: 'right',
    image: '/websiteimage-pranita.jpeg'
  }
];

function MobileFounderFlipCard({ founder }: { founder: any }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const firstName = founder.name.split(' ')[0];

  return (
    <div className="md:hidden flex flex-col items-center w-full">
      <div
        className="relative w-full max-w-[340px] mx-auto aspect-[4/5] cursor-pointer [perspective:1000px]"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`w-full h-full relative transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>

          {/* FRONT (Polaroid Style) */}
          <div className="absolute inset-0 [backface-visibility:hidden] bg-[#fafafa] p-4 pb-24 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm border border-brand-dark/5 flex flex-col">

            {/* Quirky Tape/Pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-brand-dark/5 backdrop-blur-md rotate-2 border border-white/40 shadow-sm z-10"></div>

            <div className="relative w-full h-full border border-brand-primary/10 overflow-hidden bg-brand-dark/5">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                className="object-cover object-center"
              />
            </div>
            {/* Polaroid bottom white text area */}
            <div className="absolute bottom-0 left-0 right-0 h-24 flex flex-col items-center justify-center bg-[#fafafa] rounded-b-sm">
              <h3 className={`${playfair.className} text-2xl font-black text-brand-dark mb-2`}>{founder.name}</h3>
              <div className="bg-brand-primary text-white text-[10px] font-bold tracking-widest uppercase px-4 py-[6px] shadow-md shadow-brand-primary/20">
                {founder.role}
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-brand-primary text-white rounded-sm p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-brand-primary/20">
            <h3 className={`${playfair.className} text-3xl font-black text-brand-cream mb-4`}>{founder.name}</h3>
            <div className="w-12 h-[2px] bg-white/20 mb-6 rounded-full" />
            <p className="text-[13px] sm:text-sm leading-relaxed text-brand-cream/90 font-medium overflow-y-auto">
              {founder.bio}
            </p>
          </div>

        </div>
      </div>

      {/* Click to know more hint */}
      <p
        className="mt-6 text-brand-dark/60 text-sm font-medium italic flex items-center gap-2 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <MousePointerClick className="w-4 h-4 animate-bounce text-brand-primary" />
        Tap to know more about {firstName}...
      </p>
    </div>
  );
}

export function Founders() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Quirky parallax and rotation reveals for desktop only
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const rows = containerRef.current!.querySelectorAll('.founder-row');

      rows.forEach((row, i) => {
        const isLeft = i % 2 === 0;

        const imageWrapper = row.querySelector('.founder-image-wrapper');
        const textBlock = row.querySelector('.founder-text-block');

        // Parallax text
        gsap.fromTo(textBlock,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
            }
          }
        );

        // Spin in the image like slapping a polaroid down
        gsap.fromTo(imageWrapper,
          {
            rotation: isLeft ? -25 : 25,
            scale: 0.6,
            opacity: 0,
            x: isLeft ? -100 : 100
          },
          {
            rotation: isLeft ? -4 : 5,
            scale: 1,
            opacity: 1,
            x: 0,
            duration: 1.4,
            ease: 'elastic.out(1, 0.7)',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
            }
          }
        );
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-brand-cream pb-24 md:pb-32 pt-8 md:pt-12 overflow-hidden relative">

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 md:mb-32">
          <h2 className={`${playfair.className} text-5xl md:text-7xl font-black text-brand-dark leading-tight`}>
            The people behind <span className="italic text-brand-primary">StndOut</span>
          </h2>
        </div>

        {/* Founders Zig-Zag */}
        <div className="flex flex-col gap-16 md:gap-40">
          {foundersData.map((founder, idx) => (
            <div key={idx} className="w-full">

              {/* Mobile Flip Card */}
              <MobileFounderFlipCard founder={founder} />

              {/* Desktop Polaroid Row */}
              <div
                className={`hidden founder-row md:flex flex-row items-center gap-12 lg:gap-24 ${founder.align === 'right' ? 'md:flex-row-reverse' : ''}`}
              >

                {/* Image Block */}
                <div className="w-full md:w-1/2 flex justify-center relative">
                  {/* Decorative blob behind image */}
                  <div className={`absolute inset-0 bg-brand-primary/10 rounded-full blur-[80px] -z-10 transform scale-125`}></div>

                  <div
                    className="founder-image-wrapper relative w-full max-w-[360px] aspect-[4/5] bg-[#fafafa] p-4 pb-16 md:p-5 md:pb-20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm border border-brand-dark/5"
                  >
                    <div className="w-full h-full relative border border-brand-primary/10 flex flex-col items-center justify-center overflow-hidden group cursor-crosshair">
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Quirky Tape/Pin */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-brand-dark/5 backdrop-blur-md rotate-2 border border-white/40 shadow-sm"></div>
                  </div>
                </div>

                {/* Text Block */}
                <div className="founder-text-block w-full md:w-1/2 text-center md:text-left relative">
                  {/* Decorative Quote Mark */}
                  <span className={`${playfair.className} absolute -top-16 md:-top-20 -left-4 md:-left-8 text-[120px] md:text-[160px] text-brand-primary/10 leading-none select-none`}>
                    &ldquo;
                  </span>

                  <h3 className={`${playfair.className} text-4xl md:text-6xl font-black text-brand-dark mb-5 relative z-10`}>
                    {founder.name}
                  </h3>

                  <div className="inline-block px-4 py-2 bg-brand-primary text-white text-xs md:text-sm font-bold tracking-widest uppercase mb-8 shadow-xl shadow-brand-primary/20">
                    {founder.role}
                  </div>

                  <p className="text-brand-dark/80 text-lg md:text-xl font-medium leading-relaxed relative z-10">
                    {founder.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
