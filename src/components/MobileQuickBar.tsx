import React from 'react';
import { Phone, Calendar, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface MobileQuickBarProps {
  onOpenEstimate: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenEstimate }) => {
  return (
    <aside
      aria-label="Mobile quick actions"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0c2340]/98 backdrop-blur-md border-t border-cyan-800/60 p-2.5 sm:hidden shadow-2xl safe-area-bottom"
    >
      <div className="grid grid-cols-2 gap-2">
        
        {/* Direct Call Button (Bright Blue with Phone Icon) */}
        <a
          href={`tel:${BUSINESS_INFO.primaryContact.phoneRaw}`}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0077e6] active:bg-[#0369a1] text-white font-extrabold text-xs shadow-md tracking-tight whitespace-nowrap"
          aria-label={`Call or Text Now: ${BUSINESS_INFO.primaryContact.phone}`}
        >
          <Phone className="w-4 h-4 fill-white text-white" />
          <span>Call 512-905-5823</span>
        </a>

        {/* Free Estimate Button (White with Cyan icon) */}
        <button
          type="button"
          onClick={onOpenEstimate}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white active:bg-slate-100 text-[#0c2340] font-extrabold text-xs shadow-md tracking-tight whitespace-nowrap border border-slate-200"
        >
          <Sparkles className="w-4 h-4 text-[#0284c7]" />
          <span>Get Free Estimate</span>
        </button>

      </div>
    </aside>
  );
};
