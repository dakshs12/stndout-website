import { Users, Fingerprint, MessageSquareOff, TrendingUp } from 'lucide-react';

export function ProblemPoll() {
  // Pulling the exact copy from the SRS
  const challenges = [
    { id: 'POLL-01', title: 'No Leads', desc: "Traffic exists, but visitors aren't converting into enquiries or clients.", icon: Users },
    { id: 'POLL-02', title: 'No Brand Identity', desc: "People don't know who you are, what you stand for, or why to choose you.", icon: Fingerprint },
    { id: 'POLL-03', title: 'Low Engagement', desc: "Content is going out but generating zero meaningful interaction or reach.", icon: MessageSquareOff },
    { id: 'POLL-04', title: 'Scaling Growth', desc: "You've hit a ceiling and need a strategy to sustainably break through it.", icon: TrendingUp },
  ];

  return (
    <section id="poll" className="bg-brand-primary py-24 md:min-h-[60vh] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header Content */}
        <div className="text-center mb-16">
          <p className="text-brand-cream font-semibold tracking-[0.08em] uppercase text-sm mb-4">Quick Question</p>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-beige mb-4">What's your biggest marketing challenge?</h2>
          <p className="text-brand-cream/80 text-lg">Select all that apply. We'll show you what we do about it.</p>
        </div>

        {/* 2x2 Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {challenges.map((card) => {
            const Icon = card.icon;
            return (
              <button 
                key={card.id}
                className="text-left p-8 rounded-xl border border-white/20 bg-[#0D0D0D]/40 hover:border-brand-cream transition-all duration-300 group"
              >
                <div className="bg-brand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-brand-beige mb-2">{card.title}</h3>
                <p className="text-brand-cream/70 leading-relaxed">{card.desc}</p>
              </button>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}