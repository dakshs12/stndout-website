"use client";

export function StaticBackground() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-[-1] pointer-events-none bg-[#FFF8F4] overflow-hidden">
      {/* Top right subtle teal ambient glow */}
      <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vh] bg-brand-primary/10 blur-[120px] rounded-full" />
      
      {/* Bottom left subtle beige/cream ambient glow */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-[#ECDCC9]/50 blur-[100px] rounded-full" />
      
      {/* Center soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vh] bg-brand-primary/5 blur-[150px] rounded-full" />
      
      {/* The premium noise overlay from globals.css */}
      <div className="noise-overlay absolute inset-0 mix-blend-overlay opacity-80" />
    </div>
  );
}
