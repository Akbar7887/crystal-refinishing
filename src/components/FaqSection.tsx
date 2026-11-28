import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { useAdmin } from '../context/AdminContext';

export const FaqSection: React.FC = () => {
  const { businessSettings } = useAdmin();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How long does bathtub or shower refinishing take?",
      a: "Most single bathtub, shower base, or vanity refinishing projects take approximately 3 to 5 hours from arrival to completion. We thoroughly mask off the bathroom, set up dedicated ventilation, mechanically prep and etch the surface, and apply durable bonding agents and glossy topcoats."
    },
    {
      q: "How soon can I use my refinished bathtub or shower?",
      a: "The newly refinished surface requires a curing period. In most cases, the bathtub or shower is fully cured and ready for normal use within 24 to 48 hours. We provide easy-to-follow care instructions to ensure long-lasting beauty."
    },
    {
      q: "Why choose refinishing over replacing a bathtub?",
      a: "Replacing a bathtub often triggers costly demolition, tile damage, plumbing reconfiguration, disposal fees, and days of construction mess. Refinishing restores your existing tub in place for a fraction of the cost—often saving 70% or more—without tearing out your walls or plumbing."
    },
    {
      q: "What bathroom surfaces can be refinished?",
      a: "We refinish porcelain-enameled cast iron, pressed steel bathtubs, fiberglass and acrylic shower bases, porcelain bathroom vanity sinks, and cultured marble or laminate countertops."
    },
    {
      q: "Do you service apartment complexes, landlords, and property managers?",
      a: "Yes! We specialize in rental turnovers and multi-family communities across Austin. We understand the need for quick turnaround times between tenant leases, direct communication, and reliable scheduling."
    },
    {
      q: "How do I get an estimate from Crystal Refinishing?",
      a: "Getting an estimate is completely free and convenient. Call or text Akbar directly at 512-905-5823 or Alex at 737-207-1024, or upload a photo of your surface through our website form. We will assess your surface and provide a transparent, upfront price."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E6DDD0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6EFE2] border border-[#E2CFAF] text-[#8A652E] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#9A723A]" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B1D16] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-[#5A4639] text-sm sm:text-base">
            Answers to common questions about our Austin bathroom refinishing process, curing times, and care.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#FFFDF9] rounded-2xl border border-[#EAE1D3] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-bold text-[#2B1D16] text-sm sm:text-base hover:text-[#8A652E] transition-colors"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#9A723A] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#5A4639] leading-relaxed border-t border-[#EAE1D3]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Questions Card */}
        {(businessSettings.primaryPhoneEnabled !== false || businessSettings.secondaryPhoneEnabled !== false) && (
          <div className="mt-10 p-6 rounded-3xl bg-[#FFFDF9] border border-[#EAE1D3] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-bold text-[#2B1D16] text-sm sm:text-base">Have a question about your specific bathtub or shower?</h4>
              <p className="text-xs text-[#6B574A] mt-0.5">Call or text our team directly for fast advice and recommendations.</p>
            </div>
            <div className="flex items-center gap-2">
              {businessSettings.primaryPhoneEnabled !== false && (businessSettings.primaryPhone || BUSINESS_INFO.primaryContact.phone) && (
                <a
                  href={`tel:${(businessSettings.primaryPhone || BUSINESS_INFO.primaryContact.phone).replace(/\D/g, '')}`}
                  className="px-4 py-2 rounded-xl bg-[#5C3D2E] hover:bg-[#462D21] text-[#FAF7F2] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E6C994]" />
                  <span>Call {businessSettings.primaryContactName || 'Akbar'}: {businessSettings.primaryPhone || BUSINESS_INFO.primaryContact.phone}</span>
                </a>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
