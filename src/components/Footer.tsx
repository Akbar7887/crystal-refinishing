import React, { useState } from 'react';
import { Phone, Mail, MapPin, Sparkles, Clock, X } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { BUSINESS_INFO, REFINISHING_SERVICES, BRAND_ASSETS } from '../data/content';

export const Footer: React.FC = () => {
  const { businessSettings } = useAdmin();
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#2B1D16] text-[#DFD2BE] border-t border-[#422D22] text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          
          {/* Main Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Brand & Identity Column */}
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-[#FFFDF9] max-w-[210px] shadow-lg border border-[#4E3B30] flex items-center justify-center">
                <img
                  src={BRAND_ASSETS.logo}
                  alt="Crystal Refinishing Logo"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#E6C994] leading-tight">
                  Restore the Shine. Renew Your Tub.
                </span>
                <span className="text-[11px] text-[#BBA798] mt-0.5">
                  Austin, Texas • 888Stars LLC
                </span>
              </div>
              
              <p className="text-xs text-[#CBBBA8] leading-relaxed">
                Professional surface refinishing for bathtubs, walk-in showers, sinks, and countertops across Austin, Texas. An affordable, durable alternative to replacement for homeowners and property managers.
              </p>

              <div className="flex items-center gap-1.5 text-xs text-[#E6C994] font-semibold">
                <Sparkles className="w-4 h-4 text-[#D9B87E]" />
                <span>Austin, Texas & Surrounding Areas</span>
              </div>
            </div>

            {/* Services Offered */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">
                Refinishing Services
              </h4>
              
              <ul className="space-y-2 text-xs">
                {REFINISHING_SERVICES.map((service) => (
                  <li key={service.id}>
                    <a
                      href="#services"
                      className="text-[#CBBBA8] hover:text-[#E6C994] transition-colors flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C49E62]/70" />
                      <span>{service.title}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#property-management"
                    className="text-[#CBBBA8] hover:text-[#E6C994] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C49E62]/70" />
                    <span>Property Management Refinishing</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Direct Contacts */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">
                Direct Contacts
              </h4>
              
              <ul className="space-y-2.5 text-xs">
                {businessSettings.primaryPhoneEnabled !== false && (businessSettings.primaryPhone || BUSINESS_INFO.primaryContact.phone) && (
                  <li>
                    <a
                      href={`tel:${(businessSettings.primaryPhone || BUSINESS_INFO.primaryContact.phone).replace(/\D/g, '')}`}
                      className="flex items-center gap-2.5 text-[#DFD2BE] hover:text-[#FAF7F2] transition-colors"
                    >
                      <div className="w-6 h-6 rounded-md bg-white/8 flex items-center justify-center shrink-0">
                        <Phone className="w-3.5 h-3.5 text-[#E6C994]" />
                      </div>
                      <div>
                        <span className="text-[#BBA798] block text-[10px]">Primary Contact ({businessSettings.primaryContactName || 'Akbar'})</span>
                        <span className="font-mono font-bold text-[#FAF7F2]">{businessSettings.primaryPhone || BUSINESS_INFO.primaryContact.phone}</span>
                      </div>
                    </a>
                  </li>
                )}

                {businessSettings.secondaryPhoneEnabled !== false && (businessSettings.secondaryPhone || BUSINESS_INFO.secondaryContact.phone) && (
                  <li>
                    <a
                      href={`tel:${(businessSettings.secondaryPhone || BUSINESS_INFO.secondaryContact.phone).replace(/\D/g, '')}`}
                      className="flex items-center gap-2.5 text-[#DFD2BE] hover:text-[#FAF7F2] transition-colors"
                    >
                      <div className="w-6 h-6 rounded-md bg-white/8 flex items-center justify-center shrink-0">
                        <Phone className="w-3.5 h-3.5 text-[#E6C994]" />
                      </div>
                      <div>
                        <span className="text-[#BBA798] block text-[10px]">Secondary Contact ({businessSettings.secondaryContactName || 'Alex'})</span>
                        <span className="font-mono font-bold text-[#FAF7F2]">{businessSettings.secondaryPhone || BUSINESS_INFO.secondaryContact.phone}</span>
                      </div>
                    </a>
                  </li>
                )}

                <li>
                  <a
                    href={`mailto:${businessSettings.email || BUSINESS_INFO.email}`}
                    className="flex items-center gap-2.5 text-[#DFD2BE] hover:text-[#FAF7F2] transition-colors"
                  >
                    <div className="w-6 h-6 rounded-md bg-white/8 flex items-center justify-center shrink-0">
                      <Mail className="w-3.5 h-3.5 text-[#E6C994]" />
                    </div>
                    <div>
                      <span className="text-[#BBA798] block text-[10px]">Email Inquiries</span>
                      <span className="font-medium text-[#FAF7F2]">{businessSettings.email || BUSINESS_INFO.email}</span>
                    </div>
                  </a>
                </li>

                <li className="flex items-center gap-2.5 text-[#DFD2BE] pt-1">
                  <div className="w-6 h-6 rounded-md bg-white/8 flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#E6C994]" />
                  </div>
                  <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
                </li>
              </ul>
            </div>

            {/* Service Areas & Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">
                Austin Service Areas
              </h4>
              <p className="text-xs text-[#CBBBA8] leading-relaxed">
                Central Austin, The Domain, South Congress, Mueller, Round Rock, Cedar Park, Pflugerville, Georgetown, Westlake Hills, Leander, Buda, and Kyle.
              </p>
              
              <div className="pt-2">
                <a
                  href="#service-area"
                  className="inline-flex items-center gap-1.5 text-xs text-[#E6C994] hover:text-[#FAF7F2] font-semibold transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Check Instant ZIP Availability →</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div className="pt-8 border-t border-[#422D22] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#BBA798]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-center sm:text-left">
              <span>© {new Date().getFullYear()} Crystal Refinishing • 888Stars LLC. All rights reserved.</span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="hover:text-[#E6C994] transition-colors underline cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D130E]/80 backdrop-blur-xs"
        >
          <div className="bg-[#FFFDF9] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 text-[#4E3B30] shadow-2xl relative border border-[#EAE1D3]">
            <button
              onClick={() => setPrivacyModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#F3ECE1] hover:bg-[#E7DAC6] text-[#5A4639] transition-colors"
              title="Close Privacy Policy"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-[#2B1D16] mb-3">
              Privacy Policy — Crystal Refinishing
            </h3>
            
            <div className="text-xs sm:text-sm text-[#5A4639] space-y-3 leading-relaxed">
              <p>
                <strong>Effective Date:</strong> January 1, 2026<br />
                Crystal Refinishing (operated by 888Stars LLC in Austin, Texas) respects your privacy and is committed to protecting the personal information you share with us.
              </p>

              <h4 className="font-bold text-[#2B1D16] pt-2">1. Information We Collect</h4>
              <p>
                When you request a free estimate or contact us through our website or direct phone/SMS, we collect information such as your full name, telephone number, email address, service address, photographs of surfaces you submit for evaluation, and any project notes.
              </p>

              <h4 className="font-bold text-[#2B1D16] pt-2">2. How We Use Your Information</h4>
              <p>
                We use this information exclusively to evaluate surface condition, prepare accurate estimate proposals, communicate with you regarding scheduling, and perform professional bathtub, shower, sink, or countertop refinishing services.
              </p>

              <h4 className="font-bold text-[#2B1D16] pt-2">3. Zero Data Sale Guarantee</h4>
              <p>
                We do not sell, rent, or lease your contact information or personal data to third parties, marketers, or lead brokers.
              </p>

              <h4 className="font-bold text-[#2B1D16] pt-2">4. Contact Information</h4>
              <p>
                If you have questions about our privacy practices, you may reach us directly at:<br />
                <strong>Email:</strong> 888starsllc@gmail.com<br />
                <strong>Phone:</strong> 512-905-5823 (Akbar) | 737-207-1024 (Alex)<br />
                Austin, Texas, USA
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EAE1D3] text-right">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#5C3D2E] hover:bg-[#462D21] text-[#FAF7F2] font-bold text-xs transition-colors"
              >
                Close Privacy Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
