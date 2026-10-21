import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, AlertTriangle, ShieldCheck, Droplets, Sparkles } from 'lucide-react';
import { SERVICE_AREAS, BUSINESS_INFO } from '../data/content';

export const ServiceArea: React.FC = () => {
  const [zipInput, setZipInput] = useState('');
  const [searchResult, setSearchResult] = useState<{ matched: boolean; areaName?: string } | null>(null);

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip) return;

    const matchedArea = SERVICE_AREAS.find(area => area.zips.includes(cleanZip));

    if (matchedArea) {
      setSearchResult({ matched: true, areaName: matchedArea.name });
    } else if (cleanZip.startsWith('787') || cleanZip.startsWith('786')) {
      setSearchResult({ matched: true, areaName: 'Greater Austin Metro Area' });
    } else {
      setSearchResult({ matched: false });
    }
  };

  return (
    <section id="service-area" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-300 text-[#0284c7] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Central Texas Coverage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0c2340] tracking-tight">
            Service Areas in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#0077e6]">
              Austin & Nearby Communities
            </span>
          </h2>

          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Crystal Refinishing provides professional bathtub, shower base, sink, and countertop refinishing across Austin and surrounding Central Texas cities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: ZIP Code Availability Checker */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Area Lookup</span>
              </div>
              <h3 className="text-xl font-bold text-[#0c2340]">
                Check Your Austin ZIP Code
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your 5-digit ZIP code below to verify refinishing service in your neighborhood:
              </p>
            </div>

            <form onSubmit={handleZipCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={5}
                value={zipInput}
                onChange={(e) => {
                  setZipInput(e.target.value.replace(/\D/g, ''));
                  setSearchResult(null);
                }}
                placeholder="e.g. 78704"
                className="flex-1 px-4 py-3 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-[#0c2340] hover:bg-[#0284c7] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Search className="w-4 h-4 text-cyan-300" />
                <span>Check</span>
              </button>
            </form>

            {searchResult && (
              <div className={`p-4 rounded-2xl text-xs border ${
                searchResult.matched
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}>
                {searchResult.matched ? (
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-900 block font-bold">Yes, We Service Your Area!</strong>
                      <span>We provide convenient refinishing visits in {searchResult.areaName}. Request your free estimate today.</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-900 block font-bold">Custom Dispatch Assessment</strong>
                      <span>
                        Please call Akbar at <a href={`tel:${BUSINESS_INFO.primaryContact.phoneRaw}`} className="underline font-bold text-[#0284c7]">{BUSINESS_INFO.primaryContact.phone}</a> or Alex at <a href={`tel:${BUSINESS_INFO.secondaryContact.phoneRaw}`} className="underline font-bold text-[#0284c7]">{BUSINESS_INFO.secondaryContact.phone}</a> to check schedule availability for your location.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Prompt on-site assessments for homes and rental turnover properties</span>
            </div>
          </div>

          {/* Right: Communities Grid */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#0c2340] mb-2 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-[#0284c7]" />
              <span>Coverage by Municipality & Region</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICE_AREAS.map((area, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 transition-colors"
                >
                  <div className="flex items-center gap-2 text-[#0c2340] font-bold text-xs sm:text-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                    <span>{area.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 pl-5 leading-relaxed">
                    {area.communities}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 pt-2 italic">
              * Structure allows additional service zones to be added as dispatch expands. We serve only areas with reliable coverage.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
