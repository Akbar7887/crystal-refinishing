import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, Phone, Mail, Sparkles, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO, BRAND_ASSETS } from '../data/content';

interface FlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEstimate: () => void;
}

export const FlyerModal: React.FC<FlyerModalProps> = ({ isOpen, onClose, onOpenEstimate }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:px-6 bg-[#0c2340] text-white flex items-center justify-between gap-4 border-b border-blue-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 border border-cyan-400/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-extrabold text-white">Crystal Refinishing</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                  Official Flyer
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Restore the Shine. Renew Your Tub. • Austin, TX
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-200 transition-colors"
              title={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
            <a
              href={BRAND_ASSETS.flyer}
              download="Crystal_Refinishing_Austin_Flyer.png"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-200 transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="Download high-resolution flyer"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Save Flyer</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100 flex flex-col md:flex-row gap-6 items-center md:items-start justify-center">
          
          {/* High-Res Flyer Image Viewer */}
          <div className={`relative transition-all duration-300 ${isZoomed ? 'w-full' : 'w-full md:w-[58%]'} flex justify-center`}>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-300 bg-white group cursor-zoom-in relative">
              <img
                src={BRAND_ASSETS.flyer}
                alt="Crystal Refinishing Official Marketing Flyer - Bathtubs, Shower Bases, Sinks, Countertops"
                className={`w-full h-auto object-contain transition-transform duration-300 ${isZoomed ? 'scale-105' : 'hover:scale-102'}`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5 pointer-events-none">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Click image to {isZoomed ? 'shrink' : 'enlarge'}</span>
              </div>
            </div>
          </div>

          {/* Quick Info & Flyer Highlights */}
          <div className={`w-full ${isZoomed ? 'hidden md:block md:w-[38%]' : 'md:w-[42%]'} space-y-4`}>
            
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-[#0c2340] uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0284c7]" />
                <span>Featured On Our Official Flyer</span>
              </h4>
              
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <strong>Restoration of Worn Surfaces:</strong> Bathtubs, shower bases, sinks, and countertops.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <strong>No-Spray Application:</strong> Designed to work smoothly in no-spray environments.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <strong>Minimizes Odor:</strong> Lower odor compared to traditional refinishing methods.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <strong>Controlled Coating Thickness:</strong> Durable, uniform, and long-lasting finish.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <strong>Affordable Alternative:</strong> Like-new beauty at a fraction of replacement costs.
                  </div>
                </li>
              </ul>
            </div>

            {/* Direct Contact from Flyer */}
            <div className="bg-gradient-to-br from-[#0c2340] to-[#0a192f] text-white rounded-2xl p-5 border border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 block">
                Free Estimate — Call or Text
              </span>

              <div className="space-y-2 text-xs">
                <a
                  href={`tel:${BUSINESS_INFO.primaryContact.phoneRaw}`}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-between text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block font-bold">Akbar</span>
                      <span className="font-mono text-cyan-200">{BUSINESS_INFO.primaryContact.phone}</span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-cyan-300 group-hover:underline">Call / Text →</span>
                </a>

                <a
                  href={`tel:${BUSINESS_INFO.secondaryContact.phoneRaw}`}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-between text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block font-bold">Alex</span>
                      <span className="font-mono text-cyan-200">{BUSINESS_INFO.secondaryContact.phone}</span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-cyan-300 group-hover:underline">Call / Text →</span>
                </a>

                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-2 text-slate-300 hover:text-white transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono text-[11px] truncate">{BUSINESS_INFO.email}</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenEstimate();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  Request Online Free Estimate
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:px-6 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <span>Crystal Refinishing • 888Stars LLC • Austin, Texas</span>
          <div className="flex items-center gap-3">
            <a
              href={BRAND_ASSETS.flyer}
              target="_blank"
              rel="noreferrer"
              className="text-[#0284c7] hover:underline font-semibold flex items-center gap-1"
            >
              <span>Open Full Image</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
