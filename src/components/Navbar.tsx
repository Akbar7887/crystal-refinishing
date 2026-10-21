import React, { useState } from 'react';
import { Phone, Menu, X, Shield, Sparkles, Droplets, FileText } from 'lucide-react';
import { BUSINESS_INFO, BRAND_ASSETS } from '../data/content';
import { useAdmin } from '../context/AdminContext';

interface NavbarProps {
  onOpenEstimate: () => void;
  onOpenPropertyManagement: () => void;
  onOpenFlyer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimate, onOpenPropertyManagement, onOpenFlyer }) => {
  const { businessSettings, setIsAdminView } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Bar */}
      {businessSettings.announcementEnabled && (
        <aside
          aria-label="Service Notice"
          className="bg-[#0c2340] text-white text-xs font-semibold py-2 px-4 border-b border-blue-900/40"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 animate-pulse" />
              <span className="truncate text-slate-200">
                {businessSettings.announcementText}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-slate-300 text-[11px] shrink-0 font-medium">
              <span>Austin, TX & Surrounding Areas</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-cyan-300">Fast Estimates by Phone or Text</span>
            </div>
          </div>
        </aside>
      )}

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22 gap-6">
            
            {/* Zone 1: Crystal Refinishing Official Brand Logo */}
            <a href="#" className="flex items-center gap-3 group shrink-0">
              <div className="relative flex items-center justify-center p-1 rounded-2xl bg-white border border-slate-200 shadow-xs group-hover:border-cyan-400 group-hover:shadow-md transition-all">
                <img
                  src={BRAND_ASSETS.logo}
                  alt="Crystal Refinishing - Austin, Texas"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
                />
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-[#0c2340] leading-none">
                  Crystal Refinishing
                </span>
                <span className="text-[11px] font-semibold text-[#0284c7] leading-tight mt-1">
                  Restore the Shine. Renew Your Tub.
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden xl:flex items-center gap-5 text-sm font-bold text-[#0c2340]">
              <a href="#services" className="hover:text-[#0284c7] transition-colors whitespace-nowrap">
                Services
              </a>
              <a href="#gallery" className="hover:text-[#0284c7] transition-colors whitespace-nowrap">
                Before & After
              </a>
              <a href="#property-management" className="hover:text-[#0284c7] transition-colors whitespace-nowrap">
                Property Managers
              </a>
              <a href="#why-choose-us" className="hover:text-[#0284c7] transition-colors whitespace-nowrap">
                Why Us
              </a>
              <a href="#how-it-works" className="hover:text-[#0284c7] transition-colors whitespace-nowrap">
                How It Works
              </a>
              <a href="#about" className="hover:text-[#0284c7] transition-colors whitespace-nowrap">
                About
              </a>
              <a href="#contact" className="hover:text-[#0284c7] transition-colors whitespace-nowrap">
                Contact
              </a>

              {onOpenFlyer && (
                <button
                  type="button"
                  onClick={onOpenFlyer}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 hover:bg-cyan-100 text-[#0284c7] text-xs font-bold transition-all border border-cyan-200"
                  title="View official marketing flyer & before-after proof"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Service Flyer</span>
                </button>
              )}

              <button
                onClick={() => {
                  window.location.hash = 'admin';
                  setIsAdminView(true);
                }}
                className="text-[11px] font-semibold text-slate-400 hover:text-[#0c2340] flex items-center gap-1 transition-colors py-1 px-2.5 rounded-lg border border-slate-200 hover:border-slate-300"
                title="Owner Portal"
              >
                <Shield className="w-3 h-3 text-slate-400" />
                <span>Admin</span>
              </button>
            </nav>

            {/* Zone 3: Direct Phone & Primary CTA Button */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <div className="hidden lg:flex flex-col text-right">
                <a
                  href={`tel:${BUSINESS_INFO.primaryContact.phoneRaw}`}
                  className="text-xs font-bold text-[#0c2340] hover:text-[#0284c7] flex items-center justify-end gap-1 font-mono"
                >
                  <Phone className="w-3 h-3 text-[#0284c7]" />
                  <span>Akbar: {BUSINESS_INFO.primaryContact.phone}</span>
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.secondaryContact.phoneRaw}`}
                  className="text-[11px] font-medium text-slate-500 hover:text-[#0284c7] font-mono mt-0.5"
                >
                  Alex: {BUSINESS_INFO.secondaryContact.phone}
                </a>
              </div>

              <button
                type="button"
                onClick={onOpenEstimate}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0284c7] to-[#0077e6] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-black text-xs sm:text-sm tracking-wide shadow-md shadow-sky-500/20 hover:shadow-lg transition-all active:scale-98 whitespace-nowrap"
              >
                GET A FREE ESTIMATE
              </button>
            </div>

            {/* Mobile Toggle Button */}
            <div className="flex xl:hidden items-center gap-2">
              <a
                href={`tel:${BUSINESS_INFO.primaryContact.phoneRaw}`}
                className="p-2.5 rounded-full bg-sky-50 text-[#0284c7] font-bold"
                aria-label="Call Akbar at 512-905-5823"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col space-y-1.5 text-sm font-semibold text-slate-700">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 text-[#0c2340] font-bold"
              >
                Our Services
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Before & After Gallery
              </a>
              <a
                href="#property-management"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Property Management Services
              </a>
              <a
                href="#why-choose-us"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Why Choose Crystal Refinishing
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                How It Works (4 Steps)
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                About Us
              </a>
              {onOpenFlyer && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenFlyer();
                  }}
                  className="px-3 py-2 rounded-lg bg-sky-50 text-[#0284c7] text-left flex items-center gap-2 font-bold"
                >
                  <FileText className="w-4 h-4 text-[#0284c7]" />
                  <span>View Official Service Flyer</span>
                </button>
              )}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Contact & Free Estimate
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.hash = 'admin';
                  setIsAdminView(true);
                }}
                className="px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50 text-left flex items-center gap-2 font-medium"
              >
                <Shield className="w-4 h-4 text-slate-400" />
                <span>Admin Lead Portal</span>
              </button>
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEstimate();
                }}
                className="w-full py-3 bg-[#0284c7] hover:bg-[#0369a1] text-white font-black rounded-xl text-center shadow-sm text-sm"
              >
                GET A FREE ESTIMATE
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-bold text-center">
                <a
                  href={`tel:${BUSINESS_INFO.primaryContact.phoneRaw}`}
                  className="py-2.5 px-3 rounded-lg bg-slate-100 text-[#0c2340] flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>Akbar: 512-905-5823</span>
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.secondaryContact.phoneRaw}`}
                  className="py-2.5 px-3 rounded-lg bg-slate-100 text-[#0c2340] flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>Alex: 737-207-1024</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
