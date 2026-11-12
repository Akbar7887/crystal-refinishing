import React from 'react';
import { Phone, Calendar, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { useAdmin } from '../context/AdminContext';

interface MobileQuickBarProps {
  onOpenEstimate: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenEstimate }) => {
  const { businessSettings } = useAdmin();
  const phone = (businessSettings.primaryPhoneEnabled !== false && businessSettings.primaryPhone)
    ? businessSettings.primaryPhone
    : (businessSettings.secondaryPhoneEnabled !== false && businessSettings.secondaryPhone)
      ? businessSettings.secondaryPhone
      : BUSINESS_INFO.primaryContact.phone;
  const phoneRaw = phone.replace(/\D/g, '');
  const hasPhone = (businessSettings.primaryPhoneEnabled !== false && businessSettings.primaryPhone?.trim()) ||
    (businessSettings.secondaryPhoneEnabled !== false && businessSettings.secondaryPhone?.trim());

  return (
    <aside
      aria-label="Mobile quick actions"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0c2340]/98 backdrop-blur-md border-t border-cyan-800/60 p-2.5 sm:hidden shadow-2xl safe-area-bottom"
    >
      <div className={`grid ${hasPhone ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
        
        {/* Direct Call Button (Bright Blue with Phone Icon) */}
        {hasPhone && (
          <a
            href={`tel:${phoneRaw}`}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0077e6] active:bg-[#0369a1] text-white font-extrabold text-xs shadow-md tracking-tight whitespace-nowrap"
            aria-label={`Call or Text Now: ${phone}`}
          >
            <Phone className="w-4 h-4 fill-white text-white" />
            <span>Call {phone}</span>
          </a>
        )}

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
