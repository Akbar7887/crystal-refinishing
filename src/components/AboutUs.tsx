import React from 'react';
import { Droplets, Sparkles, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, BRAND_ASSETS } from '../data/content';
import { useAdmin } from '../context/AdminContext';

export const AboutUs: React.FC = () => {
  const { businessSettings } = useAdmin();
  const primaryPhone = businessSettings.primaryPhone || BUSINESS_INFO.primaryContact.phone;
  const primaryPhoneRaw = primaryPhone.replace(/\D/g, '');
  const secondaryPhone = businessSettings.secondaryPhone || BUSINESS_INFO.secondaryContact.phone;
  const secondaryPhoneRaw = secondaryPhone.replace(/\D/g, '');
  const hasPrimary = businessSettings.primaryPhoneEnabled !== false && primaryPhone.trim().length > 0;
  const hasSecondary = businessSettings.secondaryPhoneEnabled !== false && secondaryPhone.trim().length > 0;
  const primaryName = businessSettings.primaryContactName || BUSINESS_INFO.primaryContact.name;
  const secondaryName = businessSettings.secondaryContactName || BUSINESS_INFO.secondaryContact.name;

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E6DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#F5EFE6] rounded-3xl p-8 sm:p-12 lg:p-16 text-[#2B1D16] shadow-sm border border-[#EAE1D3] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Brand Mark & Founders Lockup */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              
              {/* Official Crystal Refinishing Brand Logo */}
              <div className="p-4 rounded-3xl bg-[#FFFDF9] shadow-sm border border-[#EAE1D3] group hover:scale-102 transition-transform max-w-[260px]">
                <img
                  src={BRAND_ASSETS.logo}
                  alt="Official Crystal Refinishing Logo"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2B1D16] tracking-tight">
                  Crystal Refinishing
                </h3>
                <p className="text-[#8A652E] font-semibold text-sm mt-1">
                  Restore the Shine. Renew Your Tub.
                </p>
                <p className="text-xs text-[#6B574A] mt-0.5">
                  Based in Austin, Texas • 888Stars LLC
                </p>
              </div>

              {/* Founders Contact Cards */}
              {(hasPrimary || hasSecondary) && (
                <div className="w-full max-w-sm space-y-2.5 pt-2 text-left">
                  {hasPrimary && (
                    <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#EAE1D3] shadow-xs flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#6B574A] block font-medium">Primary Contact:</span>
                        <strong className="text-sm font-bold text-[#2B1D16]">{primaryName}</strong>
                      </div>
                      <a
                        href={`tel:${primaryPhoneRaw}`}
                        className="px-3.5 py-1.5 rounded-full bg-[#F3ECE1] hover:bg-[#E7DAC6] text-[#2B1D16] border border-[#DFD2BE] text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
                      >
                        <Phone className="w-3 h-3 text-[#8A652E]" />
                        <span>{primaryPhone}</span>
                      </a>
                    </div>
                  )}

                  {hasSecondary && (
                    <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#EAE1D3] shadow-xs flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#6B574A] block font-medium">Secondary Contact:</span>
                        <strong className="text-sm font-bold text-[#2B1D16]">{secondaryName}</strong>
                      </div>
                      <a
                        href={`tel:${secondaryPhoneRaw}`}
                        className="px-3.5 py-1.5 rounded-full bg-[#F3ECE1] hover:bg-[#E7DAC6] text-[#2B1D16] border border-[#DFD2BE] text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
                      >
                        <Phone className="w-3 h-3 text-[#8A652E]" />
                        <span>{secondaryPhone}</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Right: Required About Us Headline & Description */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#E2CFAF] text-[#8A652E] text-xs font-bold uppercase tracking-wider">
                <span>About Our Austin Company</span>
              </div>

              {/* Exact Required Headline */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B1D16] tracking-tight">
                Helping Austin Homeowners Renew Their Bathrooms
              </h2>

              {/* Exact Required Description */}
              <div className="space-y-4 text-[#5A4639] text-sm sm:text-base leading-relaxed">
                <p>
                  At Crystal Refinishing, our goal is to help homeowners and property managers improve the appearance of their bathroom surfaces through professional refinishing services.
                </p>
                <p>
                  We focus on clear communication, careful workmanship, and cost-conscious solutions.
                </p>
                <p className="text-[#2B1D16] font-semibold">
                  Whether you are updating your home or maintaining a rental property, we are here to help you explore an affordable alternative to replacement.
                </p>
              </div>

              {/* Our Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#E6DDD0] text-xs">
                <div className="flex items-center gap-2 text-[#4E3B30] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#9A723A] shrink-0" />
                  <span>Clear Communication</span>
                </div>
                <div className="flex items-center gap-2 text-[#4E3B30] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#9A723A] shrink-0" />
                  <span>Careful Workmanship</span>
                </div>
                <div className="flex items-center gap-2 text-[#4E3B30] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#9A723A] shrink-0" />
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
