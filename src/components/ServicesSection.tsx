import React from 'react';
import { Check, ArrowRight, Droplets, Sparkles, FileText, ExternalLink } from 'lucide-react';
import { REFINISHING_SERVICES, RefinishingService, BRAND_ASSETS } from '../data/content';

interface ServicesSectionProps {
  onSelectServiceEstimate: (service: RefinishingService) => void;
  onOpenFlyer?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onSelectServiceEstimate,
  onOpenFlyer 
}) => {
  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-[#0284c7] text-xs font-bold uppercase tracking-wider mb-3">
            <Droplets className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Professional Surface Restoration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0c2340] tracking-tight">
            Our Bathroom Refinishing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#0077e6]">
              Services
            </span>
          </h2>

          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Professional surface refinishing provides an affordable alternative to replacement. We renew worn bathtubs, shower pans, sinks, and countertops with durable, high-gloss finishes.
          </p>

          {onOpenFlyer && (
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={onOpenFlyer}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 hover:bg-cyan-100 text-[#0284c7] text-xs font-bold border border-cyan-200 transition-all shadow-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Official Service Flyer & Transformation Proof</span>
              </button>
            </div>
          )}
        </div>

        {/* Official Multi-Surface Brand Overview Banner (card2_12695ae3.png) */}
        <div className="mb-14 rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white group relative">
          <img
            src={BRAND_ASSETS.cardBanner}
            alt="Crystal Refinishing - Bathtubs, Shower Bases, Sinks, Countertops in Austin, TX"
            className="w-full h-auto object-cover group-hover:scale-101 transition-transform duration-500"
            loading="lazy"
          />
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-900">
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0 border border-sky-200">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold block text-[#0c2340]">4 Core Refinishing Disciplines Under One Roof</span>
                <span className="text-[11px] text-slate-500">Bathtubs • Shower Bases • Porcelain Sinks • Vanity Countertops</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onOpenFlyer && (
                <button
                  type="button"
                  onClick={onOpenFlyer}
                  className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-[#0284c7] border border-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Open Flyer</span>
                </button>
              )}
              <a
                href="#contact"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#0284c7] to-[#0077e6] hover:from-[#0369a1] hover:to-[#0284c7] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Get Package Estimate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 4 Dedicated Service Cards Grid (2x2 on Desktop, 1-col on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {REFINISHING_SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:border-sky-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Service Photography Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                <img
                  src={service.image}
                  alt={`${service.title} in Austin bathroom`}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Category Number Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0c2340]/85 backdrop-blur-md text-white text-xs font-bold tracking-wide border border-white/10">
                  Service 0{idx + 1}
                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0c2340] text-xs font-bold shadow-xs">
                  {service.tagline}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h3 className="text-2xl font-extrabold text-[#0c2340] group-hover:text-[#0284c7] transition-colors">
                      {service.title}
                    </h3>
                    {service.startingPrice && (
                      <div className="text-right shrink-0 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block leading-tight">Starting at</span>
                        <span className="text-xl font-black text-[#0284c7] leading-tight">{service.startingPrice}</span>
                      </div>
                    )}
                  </div>

                  {/* Savings & Turnaround Badges */}
                  <div className="mt-2.5 mb-3 flex items-center gap-2 flex-wrap text-xs">
                    {service.typicalSavings && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        {service.typicalSavings}
                      </span>
                    )}
                    {service.typicalTime && (
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                        ⏱ {service.typicalTime}
                      </span>
                    )}
                    <a href="#pricing" className="text-[#0284c7] hover:underline font-semibold ml-auto">
                      View details →
                    </a>
                  </div>

                  {/* Exact Required Service Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="mt-5 pt-4 border-t border-slate-200/80 space-y-2">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specific CTA Button For Each Service */}
                <div className="mt-7 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => onSelectServiceEstimate(service)}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#0284c7] to-[#0077e6] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-bold text-sm tracking-wide shadow-md shadow-sky-500/20 hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-12 bg-sky-50/70 rounded-2xl p-6 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-[#0284c7] flex items-center justify-center shrink-0 shadow-xs border border-sky-200">
              <Sparkles className="w-5 h-5 text-[#0284c7]" />
            </div>
            <div>
              <strong className="text-[#0c2340] block font-bold text-sm">Need multiple bathroom surfaces refinished together?</strong>
              <span>We offer combined package estimates for bathtubs, tile surrounds, shower bases, and vanity tops.</span>
            </div>
          </div>

          <a
            href="#contact"
            className="shrink-0 font-bold text-[#0284c7] hover:underline flex items-center gap-1"
          >
            <span>Request Combined Estimate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
