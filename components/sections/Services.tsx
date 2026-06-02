"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Playfair_Display, Quicksand } from 'next/font/google';
import { ArrowRight } from 'lucide-react';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['italic', 'normal']
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const services = [
  {
    id: "01",
    title: "Brand Consultancy",
    subpoints: ["Brand Auditing", "Growth Strategy", "Brand Positioning"],
    image: "/service-consultancy.png"
  },
  {
    id: "02",
    title: "Brand Development",
    subpoints: ["Brand Launch Strategy", "Marketing Collaterals", "Market Research"],
    image: "/service-development.png"
  },
  {
    id: "03",
    title: "Digital & Technical Growth",
    subpoints: ["Website Development", "Social Media Marketing", "Influencer Collaborations"],
    image: "/service-digital.png"
  },
  {
    id: "04",
    title: "Events & Experiences",
    subpoints: ["Trade Shows", "Exhibitions Booth Layout", "Event Data Analysis"],
    image: "/service-events.png"
  }
];

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  
  // GSAP logic handles the crossfades smoothly when activeIndex changes
  useGSAP(() => {
    const leftImages = gsap.utils.toArray('.service-image');
    const leftContents = gsap.utils.toArray('.service-content');
    
    // Crossfade Images
    leftImages.forEach((img: any, i: number) => {
      gsap.to(img, { 
        autoAlpha: i === activeIndex ? 1 : 0, 
        duration: 0.4, 
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    // Slide and fade Text Content
    leftContents.forEach((content: any, i: number) => {
      if (i === activeIndex) {
        gsap.fromTo(content, 
          { autoAlpha: 0, y: 15 }, 
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" }
        );
      } else {
        gsap.to(content, { autoAlpha: 0, y: -15, duration: 0.3, overwrite: "auto" });
      }
    });
  }, { scope: containerRef, dependencies: [activeIndex] });

  return (
    <section 
      ref={containerRef} 
      id="services" 
      // Changed to min-h-[100svh] and added padding so content doesn't get clipped on smaller laptop screens
      className="relative min-h-[100svh] w-full bg-brand-primary text-white flex flex-col justify-center py-24 md:py-32 selection:bg-brand-cream selection:text-brand-primary"
    >
       <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 flex flex-col gap-6 lg:gap-10">
          
          {/* Section Heading - Playfair Display (Removed negative margins) */}
          <h3 className={`${playfair.className} text-6xl md:text-7xl lg:text-[90px] xl:text-[110px] font-black text-brand-cream tracking-tight`}>
            What we do.
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mt-6 lg:mt-12">
            
            {/* ======================================= */}
            {/* LEFT COLUMN - Image and Subpoints       */}
            {/* ======================================= */}
            <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
               <div className="flex flex-col justify-center w-full max-w-[500px] mx-auto lg:mx-0">
                 
                 {/* Images Stack - Removed background box and aligned left */}
                 <div className="relative w-full max-w-[380px] aspect-[4/3] lg:aspect-[16/10] mb-6">
                    {services.map((svc, i) => (
                      <div 
                        key={`img-${svc.id}`} 
                        className="service-image absolute inset-0 w-full h-full" 
                        style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? 'visible' : 'hidden' }}
                      >
                        <img 
                          src={svc.image} 
                          alt={svc.title} 
                          className="absolute inset-0 w-full h-full object-contain object-left z-10" 
                          onError={(e) => e.currentTarget.style.opacity = '0'} 
                        />
                      </div>
                    ))}
                 </div>

               {/* Titles and Subpoints Stack */}
               <div className="relative h-[160px] md:h-[180px] w-full">
                  {services.map((svc, i) => (
                    <div 
                      key={`content-${svc.id}`} 
                      className="service-content absolute inset-0 flex flex-col items-start gap-2"
                      style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? 'visible' : 'hidden' }}
                    >
                       <h4 className="font-sans text-xs tracking-widest text-brand-cream/80 uppercase font-semibold">
                         {svc.title}
                       </h4>
                       <ul className="flex flex-col gap-1.5 md:gap-2">
                         {svc.subpoints.map(sp => (
                           <li key={sp} className="text-white text-base md:text-lg font-medium tracking-wide flex items-center gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D0FF27] shadow-[0_0_10px_rgba(208,255,39,0.5)]"></span>
                              {sp}
                           </li>
                         ))}
                       </ul>
                       
                       {/* Redirect CTA */}
                       <Link 
                         href={`/services#${svc.id === '01' ? 'strategy' : svc.id === '02' ? 'media' : svc.id === '03' ? 'content' : 'technical'}`}
                         className="group mt-2 inline-flex items-center gap-2 text-[#D0FF27] font-bold tracking-wide hover:text-white transition-colors text-sm md:text-base uppercase"
                       >
                         View Details 
                         <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                       </Link>
                    </div>
                  ))}
               </div>
             </div>
          </div>

          {/* ======================================= */}
          {/* RIGHT COLUMN - Hover List (All Visible) */}
          {/* ======================================= */}
          <div className="col-span-1 lg:col-span-7 flex flex-col w-full order-1 lg:order-2">
             <div className="border-t border-white/10 w-full"></div>
             {services.map((svc, index) => (
               <div 
                 key={`heading-${svc.id}`} 
                 // Reduced vertical padding to keep the list compact
                 className={`group flex flex-col w-full cursor-pointer transition-all duration-500 border-b border-white/10 py-5 lg:py-8 ${activeIndex === index ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}
                 onMouseEnter={() => setActiveIndex(index)}
                 onClick={() => setActiveIndex(index)}
               >
                  {/* Smaller font sizes so they all fit in one frame without scrolling */}
                  <h2 
                    className={`${quicksand.className} text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[60px] font-bold leading-[0.9] tracking-tight flex items-center gap-2 md:gap-4 transition-transform duration-500 origin-left ${activeIndex === index ? 'scale-100 lg:translate-x-4' : 'scale-100'}`}
                  >
                    <span className="flex-1">{svc.title}</span>
                    <span className={`font-sans text-xs md:text-sm lg:text-lg font-bold whitespace-nowrap transition-colors duration-500 ${activeIndex === index ? 'text-[#D0FF27]' : 'text-white/50'}`}>
                      {`{ ${svc.id} }`}
                    </span>
                  </h2>
               </div>
             ))}
          </div>

       </div>
       </div>
    </section>
  );
}