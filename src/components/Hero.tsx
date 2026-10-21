import React from 'react';
import { Phone, MessageSquare, ArrowRight, Sparkles, Check, Droplets, Layers, Building, FileText } from 'lucide-react';
import { BUSINESS_INFO, BRAND_ASSETS, heroBathtubImg, beforeBathtubImg, serviceBathtubImg } from '../data/content';

interface HeroProps {
  onOpenEstimate: () => void;
  onExploreGallery: () => void;
  onOpenFlyer?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimate, onExploreGallery, onOpenFlyer }) => {
  return (
    <section id="home" className="relative w-full bg-gradient-to-b from-slate-900 via-[#0c2340] to-[#0a192f] text-white overflow-hidden border-b border-slate-800">
      
      {/* Background Graphic Accents (Water Wave Subtle Curves) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
          <path d="M0,224L60,208C120,192,240,160,360,165.3C480,171,600,213,720,240C840,267,960,277,1080,266.7C1200,256,1320,224,1380,208L1440,192L1440,800L1380,800C1320,800,1200,800,1080,800C960,800,840,800,720,800C600,800,480,800,360,800C240,800,120,800,60,800L0,800Z" fill="url(#waveGradient)" />
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* 2-Column Split: Value Proposition on Left, High-Impact Refinished Tub & Transformation on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Restore the Shine. Renew Your Tub.</span>
              <span aria-hidden="true" className="text-cyan-600">·</span>
              <span className="text-white">Austin, Texas</span>
            </div>

            {/* Exact Required Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight text-white leading-[1.12]">
              Professional Bathtub & Bathroom Refinishing in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-white">
                Austin, TX
              </span>
            </h1>

            {/* Exact Required Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Restore the beauty of your bathtub, shower, sink, or countertop without the high cost of replacement.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              
              {/* Primary CTA Button: GET A FREE ESTIMATE */}
              <button
                type="button"
                onClick={onOpenEstimate}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#0077e6] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-black text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all active:scale-98"
              >
                <span>GET A FREE ESTIMATE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA Button: CALL OR TEXT US (512-905-5823) */}
              <a
                href={`tel:${BUSINESS_INFO.primaryContact.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base border border-white/20 transition-all active:scale-98"
              >
                <Phone className="w-4 h-4 text-cyan-300" />
                <span>CALL OR TEXT US: {BUSINESS_INFO.primaryContact.phone}</span>
              </a>

            </div>

            {/* Secondary Contact Note for Alex */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
              <span>Direct lines:</span>
              <a href={`tel:${BUSINESS_INFO.primaryContact.phoneRaw}`} className="text-cyan-300 hover:underline font-mono font-medium">
                Akbar: {BUSINESS_INFO.primaryContact.phone}
              </a>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <a href={`tel:${BUSINESS_INFO.secondaryContact.phoneRaw}`} className="text-cyan-300 hover:underline font-mono font-medium">
                Alex: {BUSINESS_INFO.secondaryContact.phone}
              </a>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <a href={`sms:${BUSINESS_INFO.primaryContact.phoneRaw}`} className="text-slate-300 hover:text-white flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-cyan-400" />
                <span>Text photos for rapid estimate</span>
              </a>
            </div>

            {/* Required Core Benefits Strip */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="font-semibold text-slate-200">Affordable Alternative to Replacement</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="font-semibold text-slate-200">Beautiful, Like-New Appearance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="font-semibold text-slate-200">Professional Surface Refinishing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="font-semibold text-slate-200">Convenient for Homes & Rental Units</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Quality Refinished Bathtub + Before & After Preview */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Main Hero Card: Gleaming White Bathtub */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
                <img
                  src={BRAND_ASSETS.coverPhoto}
                  alt="Professionally refinished glossy white porcelain bathtub in Austin luxury bathroom - Crystal Refinishing"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Surface Shine & Official Logo Badge */}
                <div className="absolute top-4 left-4 p-1.5 pr-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg flex items-center gap-2">
                  <img
                    src={BRAND_ASSETS.logo}
                    alt="Crystal Refinishing Logo"
                    className="h-7 w-auto object-contain"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-extrabold text-[#0c2340] leading-tight">Crystal Refinishing</span>
                    <span className="text-[9px] font-semibold text-[#0284c7] leading-tight">Glossy Enamel Finish</span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Refinished in Austin, TX</span>
                </div>
              </div>

              {/* Before-and-After Gallery Mini Preview Bar */}
              <div className="p-4 bg-gradient-to-r from-slate-900 to-[#0c2340] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img
                      src={beforeBathtubImg}
                      alt="Worn stained bathtub before refinishing"
                      className="w-10 h-10 rounded-full object-cover border-2 border-slate-800 ring-2 ring-red-400/50"
                    />
                    <img
                      src={serviceBathtubImg}
                      alt="Refinished bathtub after restoration"
                      className="w-10 h-10 rounded-full object-cover border-2 border-slate-800 ring-2 ring-emerald-400/50"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">Before & After Preview</div>
                    <div className="text-[11px] text-slate-400">See surface transformations</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {onOpenFlyer && (
                    <button
                      type="button"
                      onClick={onOpenFlyer}
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-cyan-200 border border-white/20 text-xs font-bold transition-colors flex items-center gap-1"
                      title="View official service flyer"
                    >
                      <FileText className="w-3 h-3 text-cyan-400" />
                      <span>Flyer</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onExploreGallery}
                    className="px-3.5 py-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-500/40 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>View Gallery</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Property Management Shortcut Callout */}
            <div className="bg-gradient-to-r from-sky-950/40 to-slate-900/60 rounded-2xl p-4 border border-sky-800/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">Property Managers & Landlords</span>
                  <span className="text-slate-400 text-[11px]">Turnover refinishing & multi-unit pricing</span>
                </div>
              </div>
              <a href="#property-management" className="text-cyan-300 font-bold hover:underline shrink-0">
                Explore →
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
