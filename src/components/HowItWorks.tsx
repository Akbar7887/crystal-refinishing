import React from 'react';
import { ArrowRight, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import { HOW_IT_WORKS_STEPS, BUSINESS_INFO } from '../data/content';

interface HowItWorksProps {
  onOpenEstimate: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenEstimate }) => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/80 border border-cyan-300 text-[#0284c7] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Simple 4-Step Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0c2340] tracking-tight">
            How It{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#0077e6]">
              Works
            </span>
          </h2>

          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            From your first message to a gleaming, like-new surface. Here is what to expect when working with Crystal Refinishing in Austin.
          </p>
        </div>

        {/* 4 Steps Horizontal / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-sky-300 hover:shadow-lg transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Step Number with Crystal Cyan Gradient Accent */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#0c2340] font-mono group-hover:text-[#0284c7] transition-colors">
                    {step.number}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-sky-50 text-[#0284c7] text-[10px] font-black uppercase tracking-wider">
                    Step {idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0c2340] mb-2.5 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-semibold text-[#0284c7] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Clear & straightforward</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Prompt */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onOpenEstimate}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#0284c7] to-[#0077e6] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-black text-sm tracking-wide shadow-md shadow-sky-500/20 hover:shadow-lg transition-all active:scale-98 uppercase"
          >
            <span>START WITH STEP 1: REQUEST A FREE ESTIMATE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
