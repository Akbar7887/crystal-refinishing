import React, { useState } from 'react';
import { Phone, Menu, X, Shield, Sparkles, Droplets, FileText, ChevronDown } from 'lucide-react';
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
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Bar (optional / toggled via Admin) */}
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
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22">
            
            {/* Zone 1: Crystal Refinishing Official Brand Logo (Horizontal) */}
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <div className="relative h-10 w-14 sm:h-11 sm:w-16 overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={BRAND_ASSETS.logo}
                  alt="Crystal Refinishing Logo Mark"
                  className="w-full h-auto object-cover object-top -mt-0.5 scale-125 group-hover:scale-130 transition-transform"
                />
              </div>
              <div className="flex flex-col tracking-tight text-left">
                <span className="text-xl sm:text-[23px] font-black tracking-tight text-[#0c2340] leading-none">
                  CRYSTAL
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.26em] text-[#0c2340] leading-tight mt-0.5 sm:mt-1">
                  REFINISHING
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-sm font-bold text-[#0c2340]">
              
              {/* 1. Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setServicesMenuOpen(true)}
                onMouseLeave={() => setServicesMenuOpen(false)}
              >
                <a
                  href="#services"
                  onClick={() => setServicesMenuOpen(false)}
                  className="inline-flex items-center gap-1.5 hover:text-[#0284c7] transition-colors py-2 cursor-pointer"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${servicesMenuOpen ? 'rotate-180 text-[#0284c7]' : ''}`} />
                </a>

                {servicesMenuOpen && (
                  <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 z-50 animate-in fade-in duration-150">
                    <a
                      href="#services"
                      onClick={() => setServicesMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-sky-50 transition-colors group"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#0284c7]" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#0c2340] group-hover:text-[#0284c7]">Bathtub Refinishing</span>
                        <span className="text-[11px] text-slate-500">Porcelain, fiberglass & acrylic</span>
                      </div>
                    </a>
                    <a
                      href="#services"
                      onClick={() => setServicesMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-sky-50 transition-colors group"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#0284c7]" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#0c2340] group-hover:text-[#0284c7]">Shower Base Refinishing</span>
                        <span className="text-[11px] text-slate-500">Tile, pans & shower stalls</span>
                      </div>
                    </a>
                    <a
                      href="#services"
                      onClick={() => setServicesMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-sky-50 transition-colors group"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#0284c7]" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#0c2340] group-hover:text-[#0284c7]">Bathroom Sink Refinishing</span>
                        <span className="text-[11px] text-slate-500">Vanities & drop-in basins</span>
                      </div>
                    </a>
                    <a
                      href="#services"
                      onClick={() => setServicesMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-sky-50 transition-colors group"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#0284c7]" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#0c2340] group-hover:text-[#0284c7]">Countertop Refinishing</span>
                        <span className="text-[11px] text-slate-500">Kitchen & bathroom surfaces</span>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              {/* 2. Pricing */}
              <a href="#pricing" className="hover:text-[#0284c7] transition-colors whitespace-nowrap py-2 font-bold text-[#0c2340] flex items-center gap-1">
                <span>Pricing</span>
                <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Save 75%
                </span>
              </a>

              {/* 3. Before & After */}
              <a href="#gallery" className="hover:text-[#0284c7] transition-colors whitespace-nowrap py-2">
                Before & After
              </a>

              {/* 3. Property Managers */}
              <a href="#property-management" className="hover:text-[#0284c7] transition-colors whitespace-nowrap py-2">
                Property Managers
              </a>

              {/* 4. Why Us */}
              <a href="#why-choose-us" className="hover:text-[#0284c7] transition-colors whitespace-nowrap py-2">
                Why Us
              </a>

              {/* 5. Contact */}
              <a href="#contact" className="hover:text-[#0284c7] transition-colors whitespace-nowrap py-2">
                Contact
              </a>

              {/* 6. More Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setMoreMenuOpen(true)}
                onMouseLeave={() => setMoreMenuOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                  className="inline-flex items-center gap-1.5 hover:text-[#0284c7] transition-colors py-2 cursor-pointer text-[#0c2340]"
                >
                  <span>More</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${moreMenuOpen ? 'rotate-180 text-[#0284c7]' : ''}`} />
                </button>

                {moreMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-60 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 z-50 animate-in fade-in duration-150">
                    <a
                      href="#method-comparison"
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#0c2340] hover:bg-sky-50 hover:text-[#0284c7] transition-colors"
                    >
                      Pour-On vs Spray Method
                    </a>
                    <a
                      href="#testimonials"
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#0c2340] hover:bg-sky-50 hover:text-[#0284c7] transition-colors"
                    >
                      Customer Reviews (5 ★)
                    </a>
                    <a
                      href="#how-it-works"
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#0c2340] hover:bg-sky-50 hover:text-[#0284c7] transition-colors"
                    >
                      How It Works (4 Steps)
                    </a>
                    <a
                      href="#about"
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#0c2340] hover:bg-sky-50 hover:text-[#0284c7] transition-colors"
                    >
                      About Us (Akbar & Alex)
                    </a>
                    {onOpenFlyer && (
                      <button
                        type="button"
                        onClick={() => {
                          setMoreMenuOpen(false);
                          onOpenFlyer();
                        }}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#0c2340] hover:bg-sky-50 hover:text-[#0284c7] transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>Official Service Flyer</span>
                        <FileText className="w-3.5 h-3.5 text-[#0284c7]" />
                      </button>
                    )}
                    <a
                      href="#service-area"
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#0c2340] hover:bg-sky-50 hover:text-[#0284c7] transition-colors"
                    >
                      Service Areas (Austin Metro)
                    </a>
                    <button
                      onClick={() => {
                        setMoreMenuOpen(false);
                        window.location.hash = 'admin';
                        setIsAdminView(true);
                      }}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 flex items-center gap-2 border-t border-slate-100 mt-1 cursor-pointer"
                    >
                      <Shield className="w-3.5 h-3.5 text-slate-400" />
                      <span>Admin Portal</span>
                    </button>
                  </div>
                )}
              </div>

            </nav>

            {/* Zone 3: Call or Text Action Pill (Matches User Design) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href={`tel:${BUSINESS_INFO.primaryContact.phoneRaw}`}
                className="flex items-center gap-2.5 sm:gap-3 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-[#edf5fd] hover:bg-[#e2eefb] border border-sky-100 shadow-2xs transition-all group cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0080ff] group-hover:bg-[#0070e0] flex items-center justify-center text-white shrink-0 shadow-xs transition-transform group-hover:scale-105">
                  <Phone className="w-4 h-4 fill-white text-white" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] sm:text-xs font-medium text-slate-600 leading-tight">
                    Call or Text
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-[#0080ff] font-sans tracking-tight leading-tight mt-0.5">
                    {BUSINESS_INFO.primaryContact.phone}
                  </span>
                </div>
              </a>

              {/* Mobile Hamburger Toggle for screens < lg */}
              <div className="flex lg:hidden items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
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
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 text-[#0c2340] font-bold flex items-center justify-between"
              >
                <span>Transparent Pricing</span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  From $185
                </span>
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
