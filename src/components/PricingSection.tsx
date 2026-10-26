import React from 'react';
import { Check, Phone, MessageSquare, ArrowRight, Sparkles, DollarSign, Clock, ShieldCheck, Building2 } from 'lucide-react';
import { PRICING_PLANS, BUSINESS_INFO } from '../data/content';

interface PricingSectionProps {
  onOpenEstimate: () => void;
  onOpenFlyer?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenEstimate, onOpenFlyer }) => {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>Upfront & Transparent Pricing · Austin, TX</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0c2340] tracking-tight">
            Transparent Refinishing Pricing —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#0077e6]">
              Save Up to 75%
            </span>
          </h2>

          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Professional refinishing brings your bathtubs, showers, sinks, and tile surrounds back to a showroom gloss without messy demolition or high replacement costs.
          </p>
        </div>

        {/* 6 Exact Service Pricing Cards Grid (From User Spec) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl flex flex-col justify-between transition-all duration-300 relative border ${
                plan.popular
                  ? 'border-2 border-[#0284c7] shadow-xl shadow-sky-500/10 lg:-translate-y-1.5 ring-4 ring-sky-50'
                  : 'border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300'
              }`}
            >
              {/* Optional Top Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-6 z-10">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase shadow-xs ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#0284c7] to-[#0077e6] text-white'
                        : 'bg-[#0c2340] text-cyan-200'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{plan.badge}</span>
                  </span>
                </div>
              )}

              {/* Card Header */}
              <div className="p-6 sm:p-8 border-b border-slate-100">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0c2340] tracking-tight">
                    {plan.name}
                  </h3>
                  {plan.warranty && (
                    <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                      {plan.warranty}
                    </span>
                  )}
                </div>

                {/* Price Display: Green bold font matching user screenshots */}
                <div className="mt-4 flex items-baseline">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#4d7c0f] tracking-tight">
                    {plan.price}
                  </span>
                </div>

                {plan.description && (
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    {plan.description}
                  </p>
                )}
              </div>

              {/* WHAT'S INCLUDED Checklist */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-slate-50/50 rounded-b-3xl">
                <div>
                  <div className="text-xs font-black tracking-wider uppercase text-slate-900 mb-4 flex items-center justify-between">
                    <span>WHAT&apos;S INCLUDED</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    {plan.features.map((item, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="font-medium text-slate-800 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action & Fast Quote */}
                <div className="mt-8 pt-5 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={onOpenEstimate}
                    className={`w-full py-3.5 px-5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#0284c7] to-[#0077e6] hover:from-[#0369a1] hover:to-[#0284c7] text-white shadow-sky-500/25 hover:shadow-md'
                        : 'bg-[#0c2340] hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Get Free Estimate</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="mt-3 text-center">
                    <a
                      href={`sms:${BUSINESS_INFO.primaryContact.phoneRaw}`}
                      className="text-[11px] text-slate-500 hover:text-[#0284c7] inline-flex items-center gap-1 font-medium transition-colors"
                    >
                      <MessageSquare className="w-3 h-3 text-[#0284c7]" />
                      <span>Text photo to {BUSINESS_INFO.primaryContact.phone} for 5-min quote</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial & Property Management Callout Banner */}
        <div className="mt-12 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 text-[#0284c7] flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-black tracking-wider text-[#0284c7] block">
                Apartment Complexes & Rental Portfolios
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0c2340] mt-0.5">
                Property Management & Turnover Volume Rates
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
                Managing multi-unit turns in Austin? We offer volume contract pricing (10%–25% off), rapid 24-hr tenant turnaround, priority scheduling, and Net-30 invoicing for property managers and real estate investors.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={onOpenEstimate}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0c2340] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer text-center"
            >
              Inquire for Portfolio Rates
            </button>
            {onOpenFlyer && (
              <button
                type="button"
                onClick={onOpenFlyer}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 transition-all cursor-pointer text-center"
              >
                View Commercial Flyer
              </button>
            )}
          </div>
        </div>

        {/* Smart Homeowner Cost Comparison Table */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#0284c7] block">
              Smart Homeowner Comparison
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0c2340] mt-1">
              Crystal Refinishing vs. Full Bathroom Replacement
            </h3>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm">
              See why hundreds of Austin homeowners and apartment managers choose professional surface renewal over demolition.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase font-bold tracking-wider">
                  <th className="py-3 px-4">Feature / Factor</th>
                  <th className="py-3 px-4 bg-sky-50/70 text-[#0284c7] rounded-t-xl font-black">
                    ✨ Crystal Refinishing
                  </th>
                  <th className="py-3 px-4 text-slate-500 font-bold">
                    🔨 Full Demolition & Replacement
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#0c2340]">Typical Bathtub Cost</td>
                  <td className="py-3.5 px-4 bg-sky-50/50 font-black text-[#4d7c0f] text-base">
                    Starting at $510
                  </td>
                  <td className="py-3.5 px-4 text-rose-600 font-semibold">
                    $2,500 – $4,500+ (Tub + tile + plumbing + labor)
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#0c2340]">Shower Base Cost</td>
                  <td className="py-3.5 px-4 bg-sky-50/50 font-black text-[#4d7c0f] text-base">
                    Starting at $395
                  </td>
                  <td className="py-3.5 px-4 text-rose-600 font-semibold">
                    $1,800 – $3,200+
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#0c2340]">Project Duration</td>
                  <td className="py-3.5 px-4 bg-sky-50/50 font-bold text-emerald-700">
                    3 to 5 Hours
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    1 to 2 Weeks of disruption
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#0c2340]">Plumbing & Tile Impact</td>
                  <td className="py-3.5 px-4 bg-sky-50/50 font-semibold text-slate-800">
                    100% Intact (Zero disruption to pipes or walls)
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    Requires licensed plumber & wall tile removal
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#0c2340]">Warranty Protection</td>
                  <td className="py-3.5 px-4 bg-sky-50/50 font-bold text-[#0284c7]">
                    Up to 5-Year Warranty Included
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    Varies by contractor / material
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#0c2340]">Ready for Daily Use</td>
                  <td className="py-3.5 px-4 bg-sky-50/50 font-bold text-[#0284c7]">
                    Ready in 24 Hours
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    Bathroom out of commission for days
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Fixed Quote Callout */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#0c2340] via-[#0f2d52] to-[#0c2340] text-white p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-bold border border-cyan-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fast Austin Photo Quotes</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Want an exact quote for your bathtub, shower, sink or tile?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Snap 1 or 2 photos of your surface and text them directly to our founders. We will respond with an exact price and timeline in under 10 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`sms:${BUSINESS_INFO.primaryContact.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-[#0c2340] font-black text-xs sm:text-sm tracking-wide shadow-lg transition-all active:scale-98 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#0c2340]" />
              <span>Text Akbar: {BUSINESS_INFO.primaryContact.phone}</span>
            </a>
            <a
              href={`tel:${BUSINESS_INFO.secondaryContact.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all active:scale-98 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-cyan-300" />
              <span>Call Alex: {BUSINESS_INFO.secondaryContact.phone}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
