export function BrandScore() {
  return (
    <section id="brand-score" className="bg-[#070707] py-24 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-start">
          
          {/* Left Column: Copy */}
          <div className="text-left sticky top-24">
            <span className="inline-block px-4 py-1 rounded-full bg-brand-primary/20 text-brand-primary font-bold text-sm tracking-widest uppercase mb-6">
              Free Tool
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-brand-white mb-6 leading-tight">
              How strong is your brand?
            </h2>
            <p className="text-xl text-brand-gray mb-8">
              Get your Brand Visibility Score in 60 seconds. Our AI analyzes your digital presence and tells you exactly where you're blending in.
            </p>
            <div className="w-24 h-2 bg-brand-primary rounded-full"></div>
          </div>

          {/* Right Column: The Form Card */}
          <div className="bg-brand-white p-8 md:p-10 rounded-[16px] border border-brand-primary/30 shadow-2xl relative overflow-hidden">
             
             {/* Subtle noise texture simulation */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

             <form className="space-y-8 relative z-10">
                
                {/* BS-F01: Website URL */}
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">Website URL</label>
                  <input type="url" placeholder="https://yourwebsite.com" className="w-full p-4 rounded bg-brand-white border border-brand-gray/30 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all font-mono text-sm" />
                </div>

                {/* BS-F02: Industry / Niche */}
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">Industry / Niche</label>
                  <select className="w-full p-4 rounded bg-brand-white border border-brand-gray/30 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all appearance-none font-mono text-sm cursor-pointer">
                    <option value="">Select your industry...</option>
                    <option value="marketing">Marketing / Advertising</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="saas">SaaS / Tech</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="real_estate">Real Estate</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="professional">Professional Services</option>
                    <option value="retail">Retail</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* BS-F03: Business Size */}
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">Business Size</label>
                  <select className="w-full p-4 rounded bg-brand-white border border-brand-gray/30 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all appearance-none font-mono text-sm cursor-pointer">
                    <option value="">Select team size...</option>
                    <option value="solo">Solo / Freelancer</option>
                    <option value="2_10">2–10 employees</option>
                    <option value="11_50">11–50 employees</option>
                    <option value="51_200">51–200 employees</option>
                    <option value="200_plus">200+ employees</option>
                  </select>
                </div>

                {/* BS-F04: Active Marketing Channels */}
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-3">Active Marketing Channels</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Social Media', 'SEO / Content', 'Paid Ads', 'Email Marketing', 'Referrals / WOM', 'Influencers / PR', 'None'].map((channel) => (
                      <label key={channel} className="flex items-center space-x-3 p-3 rounded border border-brand-gray/20 hover:border-brand-primary/50 cursor-pointer transition-colors bg-brand-white/50">
                        <input type="checkbox" className="w-4 h-4 text-brand-primary border-brand-gray/30 rounded focus:ring-brand-primary" />
                        <span className="text-sm font-medium">{channel}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* BS-F05: Brand Self-Assessment */}
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-3">Brand Self-Assessment</label>
                  <div className="space-y-3">
                    {[
                      "We look like everyone else.",
                      "We're somewhat differentiated.",
                      "We have a clear unique identity."
                    ].map((option, idx) => (
                      <label key={idx} className="flex items-center space-x-3 p-4 rounded border border-brand-gray/20 hover:border-brand-primary/50 cursor-pointer transition-colors bg-brand-white/50">
                        <input type="radio" name="assessment" className="w-4 h-4 text-brand-primary border-brand-gray/30 focus:ring-brand-primary" />
                        <span className="text-sm font-medium">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button type="button" className="w-full py-4 mt-8 bg-brand-dark text-brand-beige rounded-full font-bold hover:bg-brand-primary transition-colors text-lg flex justify-center items-center gap-2 group">
                  Calculate My Score
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
             </form>
          </div>

        </div>
      </div>
    </section>
  );
}