import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, Phone, Mail, Sparkles, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO, BRAND_ASSETS } from '../data/content';
import { useAdmin } from '../context/AdminContext';

interface FlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEstimate: () => void;
}

export const FlyerModal: React.FC<FlyerModalProps> = ({ isOpen, onClose, onOpenEstimate }) => {
  const { businessSettings } = useAdmin();
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1D130E]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#FFFDF9] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-[#EAE1D3]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:px-6 bg-[#FFFDF9] text-[#2B1D16] flex items-center justify-between gap-4 border-b border-[#EAE1D3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F6EFE2] text-[#9A723A] flex items-center justify-center shrink-0 border border-[#E2CFAF]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-extrabold text-[#2B1D16]">Crystal Refinishing</span>
                <span className="px-2 py-0.5 rounded-full bg-[#FAF5EC] text-[#8A652E] text-[10px] font-bold uppercase tracking-wider border border-[#E2CFAF]">
                  Official Flyer
                </span>
              </div>
              <p className="text-xs text-[#6B574A]">
                Restore the Shine. Renew Your Tub. • Austin, TX
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 rounded-xl bg-[#F3ECE1] hover:bg-[#E7DAC6] text-[#2B1D16] transition-colors cursor-pointer"
              title={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
            <a
              href={BRAND_ASSETS.flyer}
              download="Crystal_Refinishing_Austin_Flyer.png"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-[#F3ECE1] hover:bg-[#E7DAC6] text-[#8A652E] transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="Download high-resolution flyer"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Save Flyer</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-[#F3ECE1] hover:bg-rose-50 hover:text-rose-600 text-[#5A4639] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F5EFE6] flex flex-col md:flex-row gap-6 items-center md:items-start justify-center">
          
          {/* High-Res Flyer Image Viewer */}
          <div className={`relative transition-all duration-300 ${isZoomed ? 'w-full' : 'w-full md:w-[58%]'} flex justify-center`}>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-[#DFD2BE] bg-[#FFFDF9] group cursor-zoom-in relative">
              <img
                src={BRAND_ASSETS.flyer}
                alt="Crystal Refinishing Official Marketing Flyer - Bathtubs, Shower Bases, Sinks, Countertops"
                className={`w-full h-auto object-contain transition-transform duration-300 ${isZoomed ? 'scale-105' : 'hover:scale-102'}`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#2B1D16]/85 backdrop-blur-md text-[#FAF7F2] text-[11px] font-semibold flex items-center gap-1.5 pointer-events-none">
                <Sparkles className="w-3 h-3 text-[#E6C994]" />
                <span>Click image to {isZoomed ? 'shrink' : 'enlarge'}</span>
              </div>
            </div>
          </div>

          {/* Quick Info & Flyer Highlights */}
          <div className={`w-full ${isZoomed ? 'hidden md:block md:w-[38%]' : 'md:w-[42%]'} space-y-4`}>
            
            <div className="bg-[#FFFDF9] rounded-2xl p-5 border border-[#EAE1D3] shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-[#2B1D16] uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#9A723A]" />
                <span>Featured On Our Official Flyer</span>
              </h4>
              
              <ul className="space-y-2 text-xs text-[#4E3B30]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#9A723A] shrink-0 mt-0.5" />
                  <div>
                    <strong>Restoration of Worn Surfaces:</strong> Bathtubs, shower bases, sinks, and countertops.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#9A723A] shrink-0 mt-0.5" />
                  <div>
                    <strong>No-Spray Application:</strong> Designed to work smoothly in no-spray environments.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#9A723A] shrink-0 mt-0.5" />
                  <div>
                    <strong>Minimizes Odor:</strong> Lower odor compared to traditional refinishing methods.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#9A723A] shrink-0 mt-0.5" />
                  <div>
                    <strong>Controlled Coating Thickness:</strong> Durable, uniform, and long-lasting finish.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#9A723A] shrink-0 mt-0.5" />
                  <div>
                    <strong>Affordable Alternative:</strong> Like-new beauty at a fraction of replacement costs.
                  </div>
                </li>
              </ul>
            </div>

            {/* Direct Contact from Flyer */}
            <div className="bg-[#FAF7F2] text-[#2B1D16] rounded-2xl p-5 border border-[#EAE1D3] shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A652E] block">
                Free Estimate — Call or Text
              </span>

              <div className="space-y-2 text-xs">
                {businessSettings.primaryPhoneEnabled !== false && (businessSettings.primaryPhone || BUSINESS_INFO.primaryContact.phone) && (
                  <a
                    href={`tel:${(businessSettings.primaryPhone || BUSINESS_INFO.primaryContact.phone).replace(/\D/g, '')}`}
                    className="p-3 rounded-xl bg-[#FFFDF9] border border-[#EAE1D3] hover:border-[#C49E62] flex items-center justify-between text-[#2B1D16] transition-all group shadow-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FAF5EC] text-[#9A723A] flex items-center justify-center border border-[#E2CFAF]">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="block font-bold text-[#2B1D16]">{businessSettings.primaryContactName || 'Akbar'}</span>
                        <span className="font-mono text-[#8A652E] font-semibold">{businessSettings.primaryPhone || BUSINESS_INFO.primaryContact.phone}</span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#8A652E] group-hover:underline">Call / Text →</span>
                  </a>
                )}

                {businessSettings.secondaryPhoneEnabled !== false && (businessSettings.secondaryPhone || BUSINESS_INFO.secondaryContact.phone) && (
                  <a
                    href={`tel:${(businessSettings.secondaryPhone || BUSINESS_INFO.secondaryContact.phone).replace(/\D/g, '')}`}
                    className="p-3 rounded-xl bg-[#FFFDF9] border border-[#EAE1D3] hover:border-[#C49E62] flex items-center justify-between text-[#2B1D16] transition-all group shadow-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FAF5EC] text-[#9A723A] flex items-center justify-center border border-[#E2CFAF]">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="block font-bold text-[#2B1D16]">{businessSettings.secondaryContactName || 'Alex'}</span>
                        <span className="font-mono text-[#8A652E] font-semibold">{businessSettings.secondaryPhone || BUSINESS_INFO.secondaryContact.phone}</span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#8A652E] group-hover:underline">Call / Text →</span>
                  </a>
                )}

                <a
                  href={`mailto:${businessSettings.email || BUSINESS_INFO.email}`}
                  className="p-2.5 rounded-xl bg-[#FFFDF9] border border-[#EAE1D3] hover:border-[#C49E62] flex items-center gap-2 text-[#5A4639] hover:text-[#2B1D16] transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[#9A723A]" />
                  <span className="font-mono text-[11px] truncate">{businessSettings.email || BUSINESS_INFO.email}</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenEstimate();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#5C3D2E] hover:bg-[#462D21] text-[#FAF7F2] font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  Request Online Free Estimate
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:px-6 bg-[#FFFDF9] border-t border-[#EAE1D3] flex flex-wrap items-center justify-between gap-3 text-xs text-[#6B574A]">
          <span>Crystal Refinishing • 888Stars LLC • Austin, Texas</span>
          <div className="flex items-center gap-3">
            <a
              href={BRAND_ASSETS.flyer}
              target="_blank"
              rel="noreferrer"
              className="text-[#8A652E] hover:underline font-semibold flex items-center gap-1"
            >
              <span>Open Full Image</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-[#F3ECE1] hover:bg-[#E7DAC6] text-[#2B1D16] font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
