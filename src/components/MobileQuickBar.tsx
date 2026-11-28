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
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#2B1D16]/98 backdrop-blur-md border-t border-[#4A3226] p-2.5 sm:hidden shadow-2xl safe-area-bottom"
    >
      <div className={`grid ${hasPhone ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
        
        {/* Direct Call Button (Walnut Primary) */}
        {hasPhone && (
          <a
            href={`tel:${phoneRaw}`}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#5C3D2E] active:bg-[#462D21] text-[#FAF7F2] font-extrabold text-xs shadow-md tracking-tight whitespace-nowrap border border-[#785442]"
            aria-label={`Call or Text Now: ${phone}`}
          >
            <Phone className="w-4 h-4 fill-[#FAF7F2] text-[#FAF7F2]" />
            <span>Call {phone}</span>
          </a>
        )}

        {/* Free Estimate Button (Cream Secondary with Champagne icon) */}
        <button
          type="button"
          onClick={onOpenEstimate}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#F3ECE1] active:bg-[#E6D9C6] text-[#2B1D16] font-extrabold text-xs shadow-md tracking-tight whitespace-nowrap border border-[#DFD2BE]"
        >
          <Sparkles className="w-4 h-4 text-[#9A723A]" />
          <span>Get Free Estimate</span>
        </button>

      </div>
    </aside>
  );
};
