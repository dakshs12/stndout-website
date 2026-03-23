import { ArrowUpRight } from 'lucide-react';

export function Services() {
  const services = [
    { title: "Brand Positioning", desc: "We define your single, ownable idea. Stop competing on price and start competing on difference." },
    { title: "High-Impact Web Design", desc: "Websites that don't just look pretty, but actively convert visitors into qualified leads." },
    { title: "Content & Copywriting", desc: "Words that refuse to be ignored. We craft messaging that commands attention and drives action." },
    { title: "Growth & Visibility Strategy", desc: "A tailored roadmap to break through the noise and get your brand in front of the right eyeballs." }
  ];

  return (
    <section id="services" className="bg-brand-cream text-brand-dark py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What we do.</h2>
            <p className="text-lg text-brand-gray">We don't do "360-degree holistic marketing." We do what works. Here is how we make your brand impossible to ignore.</p>
          </div>
          <button className="hidden md:inline-flex items-center justify-center px-6 py-3 bg-brand-dark text-brand-beige font-semibold rounded-full hover:bg-brand-primary transition-colors">
            View All Services
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative bg-brand-white p-10 rounded-2xl border border-brand-gray/10 hover:border-brand-primary transition-colors cursor-pointer"
            >
              <div className="absolute top-10 right-10 w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center group-hover:bg-brand-primary group-hover:text-brand-white transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold mb-4 pr-12">{service.title}</h3>
              <p className="text-brand-gray text-lg leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center md:hidden">
           <button className="inline-flex items-center justify-center px-8 py-4 bg-brand-dark text-brand-beige font-semibold rounded-full hover:bg-brand-primary transition-colors w-full">
            View All Services
          </button>
        </div>

      </div>
    </section>
  );
}