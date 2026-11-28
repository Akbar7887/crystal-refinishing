import React from 'react';
import { 
  Wind, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';

interface WhyChooseUsProps {
  onOpenFlyer?: () => void;
  onOpenEstimate?: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenFlyer, onOpenEstimate }) => {
  const advantages = [
    {
      icon: <Wind className="w-6 h-6 text-[#9A723A]" />,
      badge: "Eco-Safe & Non-Toxic",
      title: "Virtually Odorless",
      description: "Our pour-on application eliminates dangerous solvent fumes and airborne overspray. Safe for kids, pets, and occupied apartment buildings.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#9A723A]" />,
      badge: "5-Year Guarantee",
      title: "4x Thicker Coating",
      description: "Unlike paper-thin spray paints that chip in a year, our self-leveling liquid enamel forms a rock-hard porcelain shell that resists standing water.",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#9A723A]" />,
      badge: "Same-Day Service",
      title: "Ready in 24 Hours",
      description: "Our certified refinishers complete the job in 3 to 4 hours. The surface cures overnight so you can take a shower the very next day.",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-[#9A723A]" />,
      badge: "Save $3,000+",
      title: "Save 75% vs. Replacement",
      description: "Full tub replacement costs $3,500–$6,000+ with messy demolition. Crystal Refinishing gives you a brand-new glossy finish for only $400–$650.",
    },
  ];

  return (
    <section id="why-choose-us" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E6DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6EFE2] border border-[#E2CFAF] text-[#8A652E] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#9A723A]" />
            <span>The Pour-On Advantage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#2B1D16] tracking-tight">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8E6932] via-[#B48A4E] to-[#5C3D2E]">
              Crystal Refinishing?
            </span>
          </h2>

          <p className="mt-3 text-[#5A4639] text-sm sm:text-base leading-relaxed">
            We deliver showroom-quality bathroom resurfacing across Austin with our signature odorless, thick-glaze technology.
          </p>
        </div>

        {/* 4 Clean Advantages Grid (Warm White Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 border border-[#EAE1D3] hover:border-[#C49E62] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F6EFE2] border border-[#E2CFAF] flex items-center justify-center text-[#9A723A] group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#8A652E] bg-[#F7F1E5] px-2.5 py-1 rounded-full border border-[#E6D7BE]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-[#2B1D16] mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5A4639] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EFE8DC] flex items-center gap-1.5 text-xs font-semibold text-[#8A652E]">
                <CheckCircle2 className="w-4 h-4 text-[#9A723A]" />
                <span>Crystal Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Property Managers Callout Banner (Warm White Card) */}
        <div id="property-management" className="mt-10 rounded-2xl bg-[#FFFDF9] border border-[#EAE1D3] text-[#2B1D16] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm scroll-mt-24">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#F6EFE2] text-[#8A652E] flex items-center justify-center shrink-0 border border-[#E2CFAF]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#2B1D16]">Property Managers & Apartment Communities</div>
              <div className="text-xs text-[#5A4639]">Fast tenant turnover refinishing with bulk volume pricing across Austin.</div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onOpenFlyer && (
              <button
                type="button"
                onClick={onOpenFlyer}
                className="px-3.5 py-2 rounded-xl bg-[#F3ECE1] hover:bg-[#E7DAC6] text-[#2B1D16] text-xs font-bold border border-[#DFD2BE] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#9A723A]" />
                <span>Service Flyer</span>
              </button>
            )}
            {onOpenEstimate && (
              <button
                type="button"
                onClick={onOpenEstimate}
                className="px-4 py-2 rounded-xl bg-[#5C3D2E] hover:bg-[#462D21] text-[#FAF7F2] text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Commercial Quote</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E6C994]" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
