import React from 'react';
import { 
  PiggyBank, 
  CheckCircle2, 
  Shield, 
  MessageSquare, 
  Building2, 
  Clock, 
  Wind,
  Phone,
  FileText,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { BUSINESS_INFO, WHY_CHOOSE_US_BENEFITS, BRAND_ASSETS } from '../data/content';

interface WhyChooseUsProps {
  onOpenFlyer?: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenFlyer }) => {
  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'PiggyBank':
        return <PiggyBank className="w-6 h-6 text-[#0284c7]" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-[#0284c7]" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-[#0284c7]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-[#0284c7]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#0284c7]" />;
      case 'Clock':
      default:
        return <Clock className="w-6 h-6 text-[#0284c7]" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0284c7] text-xs font-bold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>The Crystal Refinishing Difference</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0c2340] tracking-tight">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#0077e6]">
              Crystal Refinishing?
            </span>
          </h2>

          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            We take pride in helping Austin homeowners, landlords, and property managers renew their bathroom surfaces with professional care, honest communication, and cost-conscious solutions.
          </p>
        </div>

        {/* 6 Key Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US_BENEFITS.map((benefit, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-3xl p-7 sm:p-8 border border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-100/70 border border-sky-200/80 flex items-center justify-center mb-5 shadow-xs">
                  {getBenefitIcon(benefit.icon)}
                </div>

                <h3 className="text-xl font-bold text-[#0c2340] mb-2.5">
                  {benefit.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 text-[11px] font-semibold text-[#0284c7] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Crystal Refinishing Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Official Flyer Features Card */}
        <div className="mt-14 bg-gradient-to-br from-[#0c2340] via-[#0a192f] to-[#0c2340] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Verified Refinishing Standards</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured on Our Austin Marketing Flyer
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Our refinishing process is engineered to restore bathtubs, shower pans, sinks, and countertops while respecting your living space and minimizing disruptions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block">No-Spray Application</strong>
                  <span className="text-slate-400 text-[11px]">Works in no-spray environments</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block">Minimizes Odor</strong>
                  <span className="text-slate-400 text-[11px]">Lower odor than traditional methods</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block">Controlled Coating Thickness</strong>
                  <span className="text-slate-400 text-[11px]">Durable and even finish</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                  <PiggyBank className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block">Affordable Alternative</strong>
                  <span className="text-slate-400 text-[11px]">Like new look at a fraction of cost</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flyer Thumbnail Preview */}
          <div className="w-full sm:w-auto flex flex-col items-center shrink-0">
            <div 
              onClick={onOpenFlyer}
              className="group relative rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl bg-white cursor-pointer hover:border-cyan-400 transition-all max-w-[220px]"
            >
              <img
                src={BRAND_ASSETS.flyer}
                alt="Crystal Refinishing Service Flyer"
                className="w-full h-auto object-cover group-hover:scale-104 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 rounded-full bg-white text-[#0c2340] text-xs font-black shadow-lg flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>Enlarge Flyer</span>
                </span>
              </div>
            </div>

            {onOpenFlyer && (
              <button
                type="button"
                onClick={onOpenFlyer}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-white font-bold transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full Screen Flyer</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>

        {/* Responsible Ventilation & Safety Notice */}
        <div className="mt-8 bg-sky-50 rounded-2xl p-6 sm:p-8 border border-sky-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-white text-[#0284c7] flex items-center justify-center shrink-0 shadow-xs border border-sky-200">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#0c2340]">
                Professional Ventilation & Careful Masking on Every Job
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Refinishing involves specialized bonding agents and coatings. We use heavy-duty exhaust fans and dedicated window ducting to actively ventilate air outdoors, thoroughly mask adjacent walls and fixtures, and minimize odors in your home or rental property.
              </p>
            </div>
          </div>

          <a
            href={`tel:${BUSINESS_INFO.primaryContact.phoneRaw}`}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Speak With Akbar</span>
          </a>
        </div>

      </div>
    </section>
  );
};
