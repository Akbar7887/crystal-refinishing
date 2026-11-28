import React from 'react';
import { Check, Phone, MessageSquare, ArrowRight, Sparkles, DollarSign, Clock, ShieldCheck, Building2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { useAdmin } from '../context/AdminContext';

interface PricingSectionProps {
  onOpenEstimate: () => void;
  onOpenFlyer?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenEstimate, onOpenFlyer }) => {
  const { pricingPlans, businessSettings } = useAdmin();
  const primaryPhone = businessSettings.primaryPhone || BUSINESS_INFO.primaryContact.phone;
  const primaryPhoneRaw = primaryPhone.replace(/\D/g, '');
  const secondaryPhone = businessSettings.secondaryPhone || BUSINESS_INFO.secondaryContact.phone;
  const secondaryPhoneRaw = secondaryPhone.replace(/\D/g, '');
  const hasPrimary = businessSettings.primaryPhoneEnabled !== false && primaryPhone.trim().length > 0;
  const hasSecondary = businessSettings.secondaryPhoneEnabled !== false && secondaryPhone.trim().length > 0;

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E6DDD0] scroll-mt-20 relative">
      <span id="services" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5EC] border border-[#E2CFAF] text-[#8A652E] text-xs font-bold uppercase tracking-wider mb-3">
            <DollarSign className="w-3.5 h-3.5 text-[#9A723A]" />
            <span>Our Services & Transparent Pricing · Austin, TX</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#2B1D16] tracking-tight">
            Our Refinishing Services & Pricing —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8E6932] via-[#B48A4E] to-[#5C3D2E]">
              Save Up to 75%
            </span>
          </h2>

          <p className="mt-3 text-[#5A4639] text-sm sm:text-base leading-relaxed">
            Professional refinishing brings your bathtubs, showers, sinks, and tile surrounds back to a showroom gloss without messy demolition or high replacement costs.
          </p>
        </div>

        {/* 6 Exact Service Pricing Cards Grid Arranged in Pairs (2 per row, Compact & Unified with Photos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {pricingPlans.map((plan) => {
            const rawPrice = (plan.price || '').trim();
            const displayPrice = rawPrice.toLowerCase().startsWith('starting at')
              ? rawPrice
              : rawPrice.startsWith('$')
              ? `Starting at ${rawPrice}`
              : `Starting at $${rawPrice}`;

            const planFeatures = plan.features && plan.features.length > 0
              ? plan.features
              : [
                  'Complete surface preparation',
                  'Professional grade coating',
                  '5 years warranty',
                  '7 days service available'
                ];

            return (
              <div
                key={plan.id}
                className={`bg-[#FFFDF9] rounded-3xl flex flex-col justify-between transition-all duration-300 relative border group overflow-hidden ${
                  plan.popular
                    ? 'border-2 border-[#C49E62] shadow-xl shadow-[#2B1D16]/10 lg:-translate-y-1 ring-4 ring-[#EFE3CE]/70'
                    : 'border-[#E6DDD0] shadow-sm hover:shadow-lg hover:border-[#D5C5B0]'
                }`}
              >
                {/* Photo Header: Pairs the visual transformation photography with the pricing card */}
                {plan.image && (
                  <div className="relative aspect-[16/7] overflow-hidden bg-[#EFE8DC] border-b border-[#EAE1D3]">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />
                    {plan.badge && (
                      <div className="absolute top-3 left-4 z-10">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase shadow-xs ${
                            plan.popular
                              ? 'bg-[#5C3D2E] text-[#FAF7F2] border border-[#C49E62]/60'
                              : 'bg-[#2B1D16]/90 backdrop-blur-xs text-[#E6C994]'
                          }`}
                        >
                          <Sparkles className="w-3 h-3 text-[#E6C994]" />
                          <span>{plan.badge}</span>
                        </span>
                      </div>
                    )}
                    {plan.warranty && (
                      <span className="absolute top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#FFFDF9]/95 backdrop-blur-xs border border-[#E2CFAF] text-[#5C3D2E] text-[11px] font-bold shadow-xs">
                        {plan.warranty}
                      </span>
                    )}
                  </div>
                )}

                {/* Card Content: Title, Price, Finish Banner, and Raised 2x2 What's Included */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title and Price in a compact header row */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#2B1D16] tracking-tight">
                        {plan.name}
                      </h3>
                      <span className="text-2xl sm:text-[28px] font-black text-[#8A652E] tracking-tight whitespace-nowrap">
                        {displayPrice}
                      </span>
                    </div>

                    {/* Surface Finish Chapter/Header */}
                    <div className="mt-2.5 py-2 px-3 rounded-xl bg-[#F6EFE2] border border-[#E6D7BE] flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#9A723A] shrink-0" />
                      <span className="text-xs sm:text-[13px] font-bold text-[#2B1D16] leading-snug">
                        {plan.description || 'Smooth, High Gloss, White or Almond Finish'}
                      </span>
                    </div>

                    {/* WHAT'S INCLUDED Checklist - Paired into 2 columns */}
                    <div className="mt-4 pt-3.5 border-t border-[#EEE6DA]">
                      <div className="text-[11px] font-black tracking-wider uppercase text-[#2B1D16] mb-2.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-black text-[#2B1D16]">
                          <span>WHAT&apos;S INCLUDED</span>
                        </span>
                        <ShieldCheck className="w-4 h-4 text-[#9A723A]" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                        {planFeatures.map((item, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-[13px] text-[#4E3B30]">
                            <div className="w-4 h-4 rounded-full bg-[#F3ECE1] text-[#8A652E] border border-[#E2CFAF] flex items-center justify-center shrink-0 shadow-2xs">
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </div>
                            <span className="font-semibold text-[#2B1D16] leading-tight">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action & Fast Direct Quote in Bottom Bar */}
                  <div className="mt-5 pt-3.5 border-t border-[#EEE6DA]">
                    <button
                      type="button"
                      onClick={onOpenEstimate}
                      className={`w-full py-3 px-5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                        plan.popular
                          ? 'bg-[#5C3D2E] hover:bg-[#462D21] text-[#FAF7F2] shadow-[#5C3D2E]/20 hover:shadow-md'
                          : 'bg-[#3B261C] hover:bg-[#5C3D2E] text-[#FAF7F2]'
                      }`}
                    >
                      <span>Get Free Estimate</span>
                      <ArrowRight className="w-4 h-4 text-[#E6C994]" />
                    </button>

                    {hasPrimary && (
                      <div className="mt-2 text-center">
                        <a
                          href={`sms:${primaryPhoneRaw}`}
                          className="text-[11px] text-[#6B574A] hover:text-[#8A652E] inline-flex items-center gap-1 font-medium transition-colors"
                        >
                          <MessageSquare className="w-3 h-3 text-[#9A723A]" />
                          <span>Text photo to {primaryPhone} for 5-min quote</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commercial & Property Management Callout Banner (Warm White Card) */}
        <div className="mt-12 rounded-3xl bg-[#FFFDF9] border border-[#E6DDD0] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F6EFE2] border border-[#E2CFAF] text-[#8A652E] flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-black tracking-wider text-[#8A652E] block">
                Apartment Complexes & Rental Portfolios
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#2B1D16] mt-0.5">
                Property Management & Turnover Volume Rates
              </h3>
              <p className="text-xs sm:text-sm text-[#5A4639] mt-1.5 max-w-2xl leading-relaxed">
                Managing multi-unit turns in Austin? We offer volume contract pricing (10%–25% off), rapid 24-hr tenant turnaround, priority scheduling, and Net-30 invoicing for property managers and real estate investors.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={onOpenEstimate}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#5C3D2E] hover:bg-[#462D21] text-[#FAF7F2] font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer text-center"
            >
              Inquire for Portfolio Rates
            </button>
            {onOpenFlyer && (
              <button
                type="button"
                onClick={onOpenFlyer}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#F3ECE1] hover:bg-[#E7DAC6] text-[#2B1D16] font-bold text-xs sm:text-sm border border-[#DFD2BE] transition-all cursor-pointer text-center"
              >
                View Commercial Flyer
              </button>
            )}
          </div>
        </div>

        {/* Smart Homeowner Cost Comparison Table (Warm White Card) */}
        <div className="mt-14 bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-[#E6DDD0] shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#8A652E] block">
              Smart Homeowner Comparison
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2B1D16] mt-1">
              Crystal Refinishing vs. Full Bathroom Replacement
            </h3>
            <p className="mt-2 text-[#5A4639] text-xs sm:text-sm">
              See why hundreds of Austin homeowners and apartment managers choose professional surface renewal over demolition.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#E6DDD0] text-[#7A6658] text-xs uppercase font-bold tracking-wider">
                  <th className="py-3 px-4">Feature / Factor</th>
                  <th className="py-3 px-4 bg-[#F6EFE2] text-[#5C3D2E] rounded-t-xl font-black">
                    ✨ Crystal Refinishing
                  </th>
                  <th className="py-3 px-4 text-[#7A6658] font-bold">
                    🔨 Full Demolition & Replacement
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8DC] text-[#4E3B30]">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#2B1D16]">Typical Bathtub Cost</td>
                  <td className="py-3.5 px-4 bg-[#F9F4EA] font-black text-[#8A652E] text-base">
                    {pricingPlans.find(p => p.id === 'pricing-bathtub-reglazing')?.price || 'Starting at $480'}
                  </td>
                  <td className="py-3.5 px-4 text-[#9F3A38] font-semibold">
                    $2,500 – $4,500+ (Tub + tile + plumbing + labor)
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#2B1D16]">Shower Base Cost</td>
                  <td className="py-3.5 px-4 bg-[#F9F4EA] font-black text-[#8A652E] text-base">
                    {pricingPlans.find(p => p.id === 'pricing-shower-base')?.price || 'Starting at $350'}
                  </td>
                  <td className="py-3.5 px-4 text-[#9F3A38] font-semibold">
                    $1,800 – $3,200+
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#2B1D16]">Project Duration</td>
                  <td className="py-3.5 px-4 bg-[#F9F4EA] font-bold text-[#5C3D2E]">
                    3 to 5 Hours
                  </td>
                  <td className="py-3.5 px-4 text-[#7A6658]">
                    1 to 2 Weeks of disruption
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#2B1D16]">Plumbing & Tile Impact</td>
                  <td className="py-3.5 px-4 bg-[#F9F4EA] font-semibold text-[#2B1D16]">
                    100% Intact (Zero disruption to pipes or walls)
                  </td>
                  <td className="py-3.5 px-4 text-[#7A6658]">
                    Requires licensed plumber & wall tile removal
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#2B1D16]">Warranty Protection</td>
                  <td className="py-3.5 px-4 bg-[#F9F4EA] font-bold text-[#8A652E]">
                    Up to 5-Year Warranty Included
                  </td>
                  <td className="py-3.5 px-4 text-[#7A6658]">
                    Varies by contractor / material
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#2B1D16]">Ready for Daily Use</td>
                  <td className="py-3.5 px-4 bg-[#F9F4EA] font-bold text-[#8A652E]">
                    Ready in 24 Hours
                  </td>
                  <td className="py-3.5 px-4 text-[#7A6658]">
                    Bathroom out of commission for days
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Fixed Quote Callout (Dark Walnut + Champagne Accent) */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#2B1D16] via-[#3A271D] to-[#2B1D16] text-[#FAF7F2] p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#4E3629]">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C49E62]/20 text-[#E6C994] text-xs font-bold border border-[#C49E62]/35">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fast Austin Photo Quotes</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#FAF7F2]">
              Want an exact quote for your bathtub, shower, sink or tile?
            </h3>
            <p className="text-[#D8CBBF] text-xs sm:text-sm max-w-xl">
              Snap 1 or 2 photos of your surface and text them directly to our team. We will respond with an exact price and timeline in under 10 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            {hasPrimary && (
              <a
                href={`sms:${primaryPhoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#D9B87E] hover:bg-[#E6C994] text-[#2B1D16] font-black text-xs sm:text-sm tracking-wide shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#2B1D16]" />
                <span>Text {businessSettings.primaryContactName || 'Akbar'}: {primaryPhone}</span>
              </a>
            )}
            {hasSecondary && (
              <a
                href={`tel:${secondaryPhoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F3ECE1]/12 hover:bg-[#F3ECE1]/22 text-[#FAF7F2] font-bold text-xs sm:text-sm border border-[#E6C994]/25 transition-all active:scale-98 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#E6C994]" />
                <span>Call {businessSettings.secondaryContactName || 'Alex'}: {secondaryPhone}</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
