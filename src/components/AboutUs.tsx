import React from 'react';
import { Droplets, Sparkles, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, BRAND_ASSETS } from '../data/content';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-[#0c2340] via-[#0a192f] to-[#0c2340] rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-xl border border-slate-800 relative overflow-hidden">
          
          {/* Subtle Background Water Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Brand Mark & Founders Lockup */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              
              {/* Official Crystal Refinishing Brand Logo */}
              <div className="p-4 rounded-3xl bg-white shadow-2xl border border-slate-200/80 group hover:scale-102 transition-transform max-w-[260px]">
                <img
                  src={BRAND_ASSETS.logo}
                  alt="Official Crystal Refinishing Logo"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Crystal Refinishing
                </h3>
                <p className="text-cyan-300 font-semibold text-sm mt-1">
                  Restore the Shine. Renew Your Tub.
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Based in Austin, Texas • 888Stars LLC
                </p>
              </div>

              {/* Founders Contact Cards */}
              <div className="w-full max-w-sm space-y-2.5 pt-2 text-left">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Primary Contact:</span>
                    <strong className="text-sm font-bold text-white">Akbar</strong>
                  </div>
                  <a
                    href={`tel:${BUSINESS_INFO.primaryContact.phoneRaw}`}
                    className="px-3 py-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{BUSINESS_INFO.primaryContact.phone}</span>
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Secondary Contact:</span>
                    <strong className="text-sm font-bold text-white">Alex</strong>
                  </div>
                  <a
                    href={`tel:${BUSINESS_INFO.secondaryContact.phoneRaw}`}
                    className="px-3 py-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{BUSINESS_INFO.secondaryContact.phone}</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Right: Required About Us Headline & Description */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <span>About Our Austin Company</span>
              </div>

              {/* Exact Required Headline */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Helping Austin Homeowners Renew Their Bathrooms
              </h2>

              {/* Exact Required Description */}
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  At Crystal Refinishing, our goal is to help homeowners and property managers improve the appearance of their bathroom surfaces through professional refinishing services.
                </p>
                <p>
                  We focus on clear communication, careful workmanship, and cost-conscious solutions.
                </p>
                <p className="text-white font-medium">
                  Whether you are updating your home or maintaining a rental property, we are here to help you explore an affordable alternative to replacement.
                </p>
              </div>

              {/* Our Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Clear Communication</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Careful Workmanship</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Cost-Conscious Solutions</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
