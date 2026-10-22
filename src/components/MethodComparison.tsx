import React from 'react';
import { ShieldCheck, XCircle, CheckCircle2, Sparkles, DollarSign, Clock, Wind, ArrowRight } from 'lucide-react';

interface MethodComparisonProps {
  onOpenEstimate?: () => void;
}

export const MethodComparison: React.FC<MethodComparisonProps> = ({ onOpenEstimate }) => {
  return (
    <section id="method-comparison" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-100 border border-cyan-300 text-[#0284c7] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Modern Refinishing Technology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0c2340] tracking-tight">
            Why Our Method Beats{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#0077e6]">
              Traditional Spraying
            </span>
          </h2>

          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Unlike cheap spray-paint companies that fill your home with harsh chemical fumes and thin coatings that chip, our controlled application creates a thick, seamless, glossy porcelain-like surface designed to last up to 20 years.
          </p>
        </div>

        {/* 2-Column Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Winner: Crystal Refinishing Pour-On Method */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-white border-2 border-[#0284c7] shadow-xl overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-gradient-to-r from-[#0284c7] to-[#0077e6] text-white text-xs font-black tracking-wider uppercase shadow-sm">
              ★ Recommended in Austin
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-[#0284c7]">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0c2340]">
                    Crystal Refinishing Method
                  </h3>
                  <p className="text-xs font-semibold text-[#0284c7]">
                    Odorless · Non-Toxic · 4x Thicker · 5-Year Guarantee
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">Virtually Odorless & Safe</strong>
                    <span className="text-slate-600 text-xs">No toxic fumes or airborne volatile chemicals. Safe for children, pets, and occupied apartment buildings.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">4x Thicker, Rock-Hard Enamel</strong>
                    <span className="text-slate-600 text-xs">Self-leveling liquid glaze creates a dense, non-porous finish that will not flake or peel from standing water.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">No Overspray Mess in Your Home</strong>
                    <span className="text-slate-600 text-xs">Zero airborne paint dust. No plastic taped to every ceiling or bulky exhaust pipes hanging out windows.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">15–20 Year Expected Lifespan</strong>
                    <span className="text-slate-600 text-xs">Engineered to withstand daily hot baths, abrasive cleaners, and heavy tenant usage with ease.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">Ready for Use in 24 Hours</strong>
                    <span className="text-slate-600 text-xs">Job takes 3-4 hours to complete. Cures overnight so you can take a shower the very next day.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">5-Year Written Guarantee Included</span>
              {onOpenEstimate && (
                <button
                  type="button"
                  onClick={onOpenEstimate}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold transition-all shadow-sm"
                >
                  <span>Get Free Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Traditional Spraying Comparison */}
          <div className="rounded-3xl p-6 sm:p-8 bg-slate-100/80 border border-slate-300/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
                  <XCircle className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-700">
                    Traditional Spray Painting
                  </h3>
                  <p className="text-xs font-semibold text-rose-600">
                    Harsh Fumes · Paper-Thin Layer · Chips Quickly
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-800 font-bold block">Strong Chemical Smell & VOCs</strong>
                    <span className="text-slate-500 text-xs">Pungent solvent odor forces families to vacate the house. Fumes travel through air ducts to neighbors.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-800 font-bold block">Micro-Thin Spray Layer (2–3 Mils)</strong>
                    <span className="text-slate-500 text-xs">Easily scratched by shampoo bottles, soap dishes, and cleansers. Prone to blistering.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-800 font-bold block">Airborne Overspray Dust</strong>
                    <span className="text-slate-500 text-xs">Requires covering every mirror and vent. Paint mist frequently settles on fixtures and flooring.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-800 font-bold block">Short 1–3 Year Lifespan</strong>
                    <span className="text-slate-500 text-xs">Water seeps underneath thin spray layers, causing massive peeling around the drain and corners.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-800 font-bold block">Extended Fume Evaporation</strong>
                    <span className="text-slate-500 text-xs">Unpleasant odor lingers for several days, requiring constant open windows and industrial fans.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200">
              <span className="text-xs text-rose-700 font-semibold">Often requires complete stripping and redoing within 2 years</span>
            </div>
          </div>

        </div>

        {/* Cost Comparison: Refinishing vs Replacement */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0c2340] to-[#081829] text-white p-6 sm:p-10 shadow-2xl border border-blue-900/60">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Massive Cost Savings</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Refinishing vs. Full Bathtub Replacement
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Replacing a bathtub is rarely just buying a new tub—it involves plumbing permits, tile demolition, drywall repair, and days of construction chaos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Crystal Refinishing */}
            <div className="bg-white/10 rounded-2xl p-6 border border-cyan-400/30 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-bold text-white">Crystal Refinishing</span>
                <span className="text-2xl font-black text-cyan-300">$400 – $650</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>3 to 4 hours total completion time</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Ready for a hot shower in 24 hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Zero tile demolition or plumbing alteration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Saves 75% to 80% of replacement costs</span>
                </li>
              </ul>
            </div>

            {/* Full Tub Replacement */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-bold text-slate-300">Full Replacement</span>
                <span className="text-2xl font-black text-rose-400">$3,500 – $6,000+</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>4 to 7 days of contractor demolition & noise</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Plumbing rough-in permits & high labor bills</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Broken surrounding tiles, drywall & floor repairs</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Massive landfill waste and disruption</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
