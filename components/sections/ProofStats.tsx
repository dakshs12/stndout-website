export function ProofStats() {
  return (
    <section className="bg-brand-dark text-brand-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-brand-gray/30">
          
          <div className="space-y-2 py-6 md:py-0">
            {/* We will still animate these numbers with GSAP later! */}
            <h3 className="text-5xl md:text-6xl font-extrabold text-brand-cream">89%</h3>
            <p className="text-brand-gray text-sm uppercase tracking-widest font-semibold">Of Brands Go Unnoticed</p>
          </div>
          
          <div className="space-y-2 py-6 md:py-0">
            <h3 className="text-5xl md:text-6xl font-extrabold text-brand-cream">&lt;1s</h3>
            <p className="text-brand-gray text-sm uppercase tracking-widest font-semibold">To Make An Impression</p>
          </div>
          
          <div className="space-y-2 py-6 md:py-0">
            <h3 className="text-5xl md:text-6xl font-extrabold text-brand-cream">0</h3>
            <p className="text-brand-gray text-sm uppercase tracking-widest font-semibold">Reasons To Blend In</p>
          </div>

        </div>
      </div>
    </section>
  );
}