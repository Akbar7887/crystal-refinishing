import React from 'react';
import { Star, Quote, CheckCircle2, ThumbsUp, MapPin } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: "Marcus T.",
      neighborhood: "Round Rock, TX",
      type: "Homeowner",
      rating: 5,
      date: "2 weeks ago",
      headline: "Saved me over $4,200 on bathroom remodel",
      comment: "Our cast iron tub had yellowed stains and chipped enamel. Two contractors quoted us $4,500+ to tear it out and replace it. Akbar and Alex arrived on time, completed the whole job in under 4 hours, and there was zero chemical smell! Next day my wife took a bath—looks like a luxury showroom.",
      service: "Cast Iron Bathtub Refinishing"
    },
    {
      name: "Elena R.",
      neighborhood: "Central Austin / Hyde Park",
      type: "Property Manager (18 Units)",
      rating: 5,
      date: "1 month ago",
      headline: "Best refinishing vendor in Austin",
      comment: "We manage multiple rental properties near UT and downtown. Traditional spray painters always resulted in tenant complaints about toxic paint odors. Crystal Refinishing's odorless pour-on method is a complete game changer. Clean, durable, and ready for move-in in 24 hours.",
      service: "Turnover Bathtub & Shower Refinishing"
    },
    {
      name: "David & Sarah K.",
      neighborhood: "Cedar Park, TX",
      type: "Homeowners",
      rating: 5,
      date: "3 weeks ago",
      headline: "Virtually no odor—safe with our toddler and dog",
      comment: "We were worried about fumes because we have an 18-month-old toddler and a golden retriever. Alex explained their low-odor process and they were 100% truthful. The gloss is mirror-like and feels rock solid underfoot. Highly recommend Crystal Refinishing to anyone in Austin!",
      service: "Bathtub & Tile Surround Refinishing"
    }
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>Austin Verified Customer Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0c2340] tracking-tight">
            Loved by Homeowners &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#0077e6]">
              Austin Landlords
            </span>
          </h2>

          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            See what real customers across Travis and Williamson counties say about our fast, odorless bathtub refinishing and honest local service.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div 
              key={idx}
              className="rounded-3xl p-6 sm:p-7 bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Client
                  </span>
                </div>

                <h4 className="text-base font-extrabold text-[#0c2340] mb-2 leading-snug">
                  "{rev.headline}"
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-[#0c2340]">{rev.name}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#0284c7]" />
                    <span>{rev.neighborhood}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#0284c7] bg-sky-50 px-2 py-1 rounded-md border border-sky-200/60">
                  {rev.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats Bar */}
        <div className="mt-12 rounded-2xl bg-slate-50 border border-slate-200 p-6 text-slate-900 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-xs">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0284c7]">5-Year</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Written Guarantee</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0284c7]">24 Hours</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Cure & Ready Time</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0284c7]">75%–80%</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Cost Savings vs Replace</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#0284c7]">100%</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Austin Local Founders</div>
          </div>
        </div>

      </div>
    </section>
  );
};
