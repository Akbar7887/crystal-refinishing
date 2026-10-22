import React from 'react';
import { Phone, MessageSquare, ArrowRight, Sparkles, Check, Droplets, Layers, Building, FileText } from 'lucide-react';
import { BUSINESS_INFO, BRAND_ASSETS, heroBathtubImg, beforeBathtubImg, serviceBathtubImg } from '../data/content';

interface HeroProps {
  onOpenEstimate: () => void;
  onExploreGallery: () => void;
  onOpenFlyer?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimate, onExploreGallery, onOpenFlyer }) => {
  const [sliderPos, setSliderPos] = React.useState<number>(50);

  return (
    <section id="home" className="relative w-full bg-slate-50/50 text-slate-900 overflow-hidden border-b border-slate-200 min-h-[580px] lg:min-h-[660px] flex items-center">
      {/* High-Resolution Bathtub Cover Photo Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src={BRAND_ASSETS.coverPhoto}
          alt="Crystal Refinishing Austin refinished luxury bathtub"
          className="w-full h-full object-cover object-right md:object-[80%_center] opacity-90"
        />
        {/* Soft, clean gradient overlays for crystal-clear text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 sm:via-white/90 md:via-white/80 lg:via-white/65 to-white/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
        
        {/* 2-Column Split: Value Proposition on Left, Live Transformation Showcase on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-[#0284c7] text-xs font-bold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Restore the Shine. Renew Your Tub.</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="text-slate-700 font-semibold">Austin, Texas</span>
            </div>

            {/* Exact Required Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold tracking-tight text-[#0c2340] leading-[1.14]">
              Professional Bathtub & Bathroom Refinishing in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#0077e6]">
                Austin, TX
              </span>
            </h1>

            {/* Exact Required Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Restore the beauty of your bathtub, shower, sink, or countertop without the high cost of replacement.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              
              {/* Primary CTA Button: GET A FREE ESTIMATE */}
              <button
                type="button"
                onClick={onOpenEstimate}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#0077e6] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-black text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all active:scale-98 cursor-pointer"
              >
                <span>GET A FREE ESTIMATE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA Button: CALL OR TEXT US (512-905-5823) */}
              <a
                href={`tel:${BUSINESS_INFO.primaryContact.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-slate-100 hover:bg-slate-200/80 text-[#0c2340] font-bold text-sm sm:text-base border border-slate-200 transition-all active:scale-98 cursor-pointer shadow-2xs"
              >
                <Phone className="w-4 h-4 text-[#0284c7]" />
                <span>CALL OR TEXT US: {BUSINESS_INFO.primaryContact.phone}</span>
              </a>

            </div>

            {/* Secondary Contact Note for Alex */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
              <span className="font-medium text-slate-400">Direct lines:</span>
              <a href={`tel:${BUSINESS_INFO.primaryContact.phoneRaw}`} className="text-[#0284c7] hover:underline font-mono font-bold">
                Akbar: {BUSINESS_INFO.primaryContact.phone}
              </a>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a href={`tel:${BUSINESS_INFO.secondaryContact.phoneRaw}`} className="text-[#0284c7] hover:underline font-mono font-bold">
                Alex: {BUSINESS_INFO.secondaryContact.phone}
              </a>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a href={`sms:${BUSINESS_INFO.primaryContact.phoneRaw}`} className="text-slate-600 hover:text-[#0284c7] flex items-center gap-1.5 font-medium">
                <MessageSquare className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Text photos for rapid estimate</span>
              </a>
            </div>

            {/* Required Core Benefits Strip */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="font-semibold text-slate-800">Affordable Alternative to Replacement</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="font-semibold text-slate-800">Beautiful, Like-New Appearance</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="font-semibold text-slate-800">Professional Surface Refinishing</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="font-semibold text-slate-800">Convenient for Homes & Rental Units</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Before & After Transformation Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Interactive Before & After Slider Card */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white group">
              
              {/* Header inside card */}
              <div className="p-3.5 px-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-6 w-9 overflow-hidden relative shrink-0">
                    <img
                      src={BRAND_ASSETS.logo}
                      alt="Crystal Refinishing Logo"
                      className="w-full h-auto object-cover object-top -mt-0.5 scale-125"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#0c2340] block leading-tight">Crystal Refinishing</span>
                    <span className="text-[10px] font-semibold text-[#0284c7] block leading-tight">Austin Bathtub Transformation</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg bg-white text-slate-700 border border-slate-300 shadow-2xs">
                  DRAG TO COMPARE
                </span>
              </div>

              {/* Interactive Before / After Comparison Area */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden select-none touch-none">
                {/* AFTER Image (Full width background) */}
                <img
                  src={serviceBathtubImg}
                  alt="Refinished glossy white porcelain bathtub after Crystal Refinishing"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 z-10 px-3 py-1 rounded-md bg-[#00a884] text-white text-[11px] font-black tracking-wider uppercase shadow-md">
                  AFTER
                </span>

                {/* BEFORE Image (Clipped overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={beforeBathtubImg}
                    alt="Stained worn bathtub before refinishing"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%', minWidth: '100%' }}
                  />
                  <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-md bg-[#e11d48] text-white text-[11px] font-black tracking-wider uppercase shadow-md">
                    BEFORE
                  </span>
                </div>

                {/* Slider Divider Bar */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] z-20 pointer-events-none"
                  style={{ left: `calc(${sliderPos}% - 2px)` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#0096c7] shadow-xl flex items-center justify-center font-bold text-xs border-2 border-[#00b4d8]">
                    ↔
                  </div>
                </div>

                {/* Slider Input Handle */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0"
                  aria-label="Drag to compare before and after bathtub refinishing"
                />

                {/* Floating Austin badge */}
                <div className="absolute bottom-3 right-3 z-20 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-semibold flex items-center gap-1.5 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Refinished in Austin, TX</span>
                </div>
              </div>

              {/* Action bar below preview */}
              <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                <div className="text-left">
                  <div className="text-xs font-bold text-[#0c2340] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
                    <span>Flawless Enamel Shine</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Ready in 24 hrs · 75% cheaper than replacement</div>
                </div>

                <div className="flex items-center gap-2">
                  {onOpenFlyer && (
                    <button
                      type="button"
                      onClick={onOpenFlyer}
                      className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 text-[#0284c7] border border-slate-200 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                      title="View official service flyer"
                    >
                      <FileText className="w-3 h-3 text-[#0284c7]" />
                      <span>Flyer</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onExploreGallery}
                    className="px-3 py-1.5 rounded-full bg-sky-50 hover:bg-sky-100 text-[#0284c7] border border-sky-200 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <span>More Photos</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Property Management Shortcut Callout */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3.5 border border-slate-200/90 flex items-center justify-between text-xs shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center shrink-0">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#0c2340] block">Property Managers & Landlords</span>
                  <span className="text-slate-500 text-[11px]">Turnover refinishing & multi-unit pricing</span>
                </div>
              </div>
              <a href="#property-management" className="text-[#0284c7] font-bold hover:underline shrink-0 pl-2">
                Explore →
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
