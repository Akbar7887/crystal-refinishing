import React from 'react';
import { Phone, MessageSquare, ArrowRight, Sparkles, Check, Building, FileText, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO, BRAND_ASSETS } from '../data/content';
import { useAdmin } from '../context/AdminContext';

interface HeroProps {
  onOpenEstimate: () => void;
  onExploreGallery: () => void;
  onOpenFlyer?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimate, onExploreGallery, onOpenFlyer }) => {
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
    <section id="home" className="relative w-full bg-gradient-to-b from-[#FAF7F2] via-[#F7F2E9] to-[#FAF7F2] text-[#2B1D16] overflow-hidden border-b border-[#E6DDD0] min-h-[560px] lg:min-h-[640px] flex items-center">
      
      {/* Soft atmospheric Champagne radial accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#E8D5B5]/35 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#EFE3CE]/45 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
        
        {/* 2-Column Split: Value Proposition on Left, Showcase Photo Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6EFE2] border border-[#E2CFAF] text-[#8A652E] text-xs font-bold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#9A723A]" />
              <span>Restore the Shine. Renew Your Tub.</span>
              <span aria-hidden="true" className="text-[#C4B09A]">·</span>
              <span className="text-[#4E3B30] font-semibold">Austin, Texas</span>
            </div>

            {/* Exact Required Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold tracking-tight text-[#2B1D16] leading-[1.14]">
              Professional Bathtub & Bathroom Refinishing in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8E6932] via-[#B48A4E] to-[#5C3D2E]">
                Austin, TX
              </span>
            </h1>

            {/* Exact Required Supporting Text */}
            <p className="text-base sm:text-lg text-[#5A4639] leading-relaxed max-w-2xl font-normal">
              Restore the beauty of your bathtub, shower, sink, or countertop without the high cost of replacement.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              
              {/* Primary CTA Button: Walnut */}
              <button
                type="button"
                onClick={onOpenEstimate}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#5C3D2E] hover:bg-[#462D21] text-[#FAF7F2] font-black text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-[#5C3D2E]/20 hover:shadow-[#5C3D2E]/30 transition-all active:scale-98 cursor-pointer"
              >
                <span>GET A FREE ESTIMATE</span>
                <ArrowRight className="w-4 h-4 text-[#E6C994]" />
              </button>

              {/* Secondary CTA Button: Cream */}
              {(hasPrimary || hasSecondary) && (
                <a
                  href={`tel:${hasPrimary ? primaryPhoneRaw : secondaryPhoneRaw}`}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#F3ECE1] hover:bg-[#E9DEC9] text-[#2B1D16] font-bold text-sm sm:text-base border border-[#DFD2BE] transition-all active:scale-98 cursor-pointer shadow-2xs"
                >
                  <Phone className="w-4 h-4 text-[#9A723A]" />
                  <span>CALL OR TEXT US: {hasPrimary ? primaryPhone : secondaryPhone}</span>
                </a>
              )}

            </div>

            {/* Direct Lines Note for Akbar and Alex */}
            {(hasPrimary || hasSecondary) && (
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B574A] pt-1">
                <span className="font-medium text-[#8C7768]">Direct lines:</span>
                {hasPrimary && (
                  <a href={`tel:${primaryPhoneRaw}`} className="text-[#8A652E] hover:underline font-mono font-bold">
                    {primaryName}: {primaryPhone}
                  </a>
                )}
                {hasPrimary && hasSecondary && (
                  <span aria-hidden="true" className="text-[#C8B9A6]">·</span>
                )}
                {hasSecondary && (
                  <a href={`tel:${secondaryPhoneRaw}`} className="text-[#8A652E] hover:underline font-mono font-bold">
                    {secondaryName}: {secondaryPhone}
                  </a>
                )}
                <span aria-hidden="true" className="text-[#C8B9A6]">·</span>
                <a href={`sms:${hasPrimary ? primaryPhoneRaw : secondaryPhoneRaw}`} className="text-[#5A4639] hover:text-[#8A652E] flex items-center gap-1.5 font-medium">
                  <MessageSquare className="w-3.5 h-3.5 text-[#9A723A]" />
                  <span>Text photos for rapid estimate</span>
                </a>
              </div>
            )}

            {/* Core Benefits Strip (Warm White Cards) */}
            <div className="pt-4 border-t border-[#E6DDD0] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#4E3B30]">
              <div className="flex items-center gap-2.5 bg-[#FFFDF9] p-2.5 rounded-xl border border-[#EAE1D3] shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-[#F6EFE2] text-[#8A652E] border border-[#E2CFAF] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="font-semibold text-[#2B1D16]">Affordable Alternative to Replacement</span>
              </div>
              <div className="flex items-center gap-2.5 bg-[#FFFDF9] p-2.5 rounded-xl border border-[#EAE1D3] shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-[#F6EFE2] text-[#8A652E] border border-[#E2CFAF] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="font-semibold text-[#2B1D16]">Beautiful, Like-New Appearance</span>
              </div>
              <div className="flex items-center gap-2.5 bg-[#FFFDF9] p-2.5 rounded-xl border border-[#EAE1D3] shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-[#F6EFE2] text-[#8A652E] border border-[#E2CFAF] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="font-semibold text-[#2B1D16]">Professional Surface Refinishing</span>
              </div>
              <div className="flex items-center gap-2.5 bg-[#FFFDF9] p-2.5 rounded-xl border border-[#EAE1D3] shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-[#F6EFE2] text-[#8A652E] border border-[#E2CFAF] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="font-semibold text-[#2B1D16]">Convenient for Homes & Rental Units</span>
              </div>
            </div>

          </div>

          {/* Right Column: Showcase Photo Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Showcase Card with the Refinished Bathtub Photo (Warm White Card) */}
            <div className="relative rounded-3xl overflow-hidden border border-[#E5DACB] shadow-xl shadow-[#2B1D16]/8 bg-[#FFFDF9] group transition-all duration-300 hover:shadow-2xl">
              
              {/* Header inside card */}
              <div className="p-3.5 px-4 bg-[#F7F2E9] border-b border-[#EAE1D3] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-6 w-9 overflow-hidden relative shrink-0">
                    <img
                      src={BRAND_ASSETS.logo}
                      alt="Crystal Refinishing Logo"
                      className="w-full h-auto object-cover object-top -mt-0.5 scale-125"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#2B1D16] block leading-tight">Crystal Refinishing</span>
                    <span className="text-[10px] font-semibold text-[#8A652E] block leading-tight">Austin Bathtub Refinishing</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#F3ECE1] text-[#5C3D2E] border border-[#DFD2BE]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C49E62] animate-pulse" />
                  REFINISHED
                </span>
              </div>

              {/* Main Photo: Cover photo */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#EFE8DC]">
                <img
                  src={BRAND_ASSETS.coverPhoto}
                  alt="Crystal Refinishing Austin luxury refinished white bathtub with chrome fixtures"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Sparkling Enamel Shine Badge */}
                <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-lg bg-[#5C3D2E]/95 text-[#FAF7F2] text-[11px] font-black tracking-wider uppercase shadow-md flex items-center gap-1.5 border border-[#C49E62]/50">
                  <Sparkles className="w-3.5 h-3.5 text-[#E6C994]" />
                  <span>FLAWLESS GLOSS FINISH</span>
                </div>

                {/* Floating Austin Local Badge */}
                <div className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-full bg-[#2B1D16]/88 backdrop-blur-md text-[#FAF7F2] text-[10px] font-semibold flex items-center gap-1.5 border border-[#E6C994]/30 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E6C994]" />
                  <span>Refinished in Austin, TX</span>
                </div>
              </div>

              {/* Action bar below photo */}
              <div className="p-3.5 bg-[#F7F2E9] border-t border-[#EAE1D3] flex items-center justify-between gap-3">
                <div className="text-left">
                  <div className="text-xs font-bold text-[#2B1D16] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#9A723A]" />
                    <span>Flawless Enamel Shine</span>
                  </div>
                  <div className="text-[11px] text-[#6B574A]">Ready in 24 hrs · 75% cheaper than replacement</div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {onOpenFlyer && (
                    <button
                      type="button"
                      onClick={onOpenFlyer}
                      className="px-3 py-1.5 rounded-full bg-[#FFFDF9] hover:bg-[#F3ECE1] text-[#5C3D2E] border border-[#DFD2BE] text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                      title="View official service flyer"
                    >
                      <FileText className="w-3 h-3 text-[#9A723A]" />
                      <span>Flyer</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onExploreGallery}
                    className="px-3 py-1.5 rounded-full bg-[#F3ECE1] hover:bg-[#E7DAC6] text-[#2B1D16] border border-[#DFD2BE] text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <span>Gallery</span>
                    <ArrowRight className="w-3 h-3 text-[#9A723A]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Property Management Shortcut Callout */}
            <div className="bg-[#FFFDF9] rounded-2xl p-3.5 border border-[#EAE1D3] flex items-center justify-between text-xs shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#F6EFE2] text-[#8A652E] border border-[#E2CFAF] flex items-center justify-center shrink-0">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#2B1D16] block">Property Managers & Landlords</span>
                  <span className="text-[#6B574A] text-[11px]">Turnover refinishing & multi-unit pricing</span>
                </div>
              </div>
              <a href="#property-management" className="text-[#8A652E] font-bold hover:underline shrink-0 pl-2">
                Explore →
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
