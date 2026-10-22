import React, { useState } from 'react';
import { Sparkles, Maximize2, X, ArrowLeftRight, CheckCircle2, ChevronRight, MapPin, FileText } from 'lucide-react';
import { BEFORE_AFTER_GALLERY, BeforeAfterProject, BRAND_ASSETS } from '../data/content';

interface BeforeAfterGalleryProps {
  onRequestEstimateForProject: (projectTitle: string) => void;
  onOpenFlyer?: () => void;
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({ 
  onRequestEstimateForProject,
  onOpenFlyer 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<BeforeAfterProject | null>(null);
  const [sliderPositions, setSliderPositions] = useState<Record<string, number>>({
    'ba-bathtub-1': 50,
    'ba-shower-1': 50,
    'ba-sink-1': 50,
    'ba-counter-1': 50
  });

  const categories = [
    { id: 'all', label: 'All Transformations (12)' },
    { id: 'bathtub', label: 'Bathtubs' },
    { id: 'color-change', label: 'Color Modernization' },
    { id: 'shower', label: 'Shower Bases' },
    { id: 'sink', label: 'Sinks' },
    { id: 'countertop', label: 'Countertops' }
  ];

  const filteredProjects = activeCategory === 'all'
    ? BEFORE_AFTER_GALLERY
    : BEFORE_AFTER_GALLERY.filter(p => p.category === activeCategory);

  const handleSliderMove = (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderPositions(prev => ({ ...prev, [projectId]: val }));
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 border border-sky-300 text-[#0284c7] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Austin Surface Transformations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0c2340] tracking-tight">
            Before & After{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#0077e6]">
              Gallery
            </span>
          </h2>

          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            See the dramatic transformations achieved through our professional bathtub and surface refinishing across Austin homes and apartments.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0284c7] text-white shadow-md shadow-sky-500/20'
                  : 'bg-white text-slate-600 hover:text-[#0c2340] hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Official Flyer Proof Banner */}
        {onOpenFlyer && (
          <div className="mb-12 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-14 rounded-lg overflow-hidden border border-slate-300 shadow-xs shrink-0 bg-white">
                <img
                  src={BRAND_ASSETS.flyer}
                  alt="Flyer Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-[#0c2340] block">
                  Official Austin Project Portfolio & Marketing Flyer
                </span>
                <span className="text-[11px] text-slate-600">
                  Inspect high-resolution side-by-side photos for Bathtubs, Shower Pans, Sinks, and Countertops.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenFlyer}
              className="shrink-0 px-4 py-2 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Official Flyer</span>
            </button>
          </div>
        )}

        {/* Before and After Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => {
            const sliderPos = sliderPositions[project.id] ?? 50;

            return (
              <div
                key={project.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Visual Area: Composite Real Photo OR Interactive Slider */}
                {project.compositeImage ? (
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative aspect-[4/3] w-full overflow-hidden select-none bg-slate-950 group cursor-pointer"
                  >
                    <img
                      src={project.compositeImage}
                      alt={`${project.title} - Real Before & After Refinishing Transformation in Austin`}
                      className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Tag badge */}
                    <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold tracking-wide uppercase border border-white/20">
                      {project.tag || "Before & After"}
                    </div>

                    {/* Verified Job */}
                    <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold tracking-wide flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Austin Job</span>
                    </div>

                    {/* Zoom Lightbox Trigger */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="absolute bottom-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
                      title="View Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4 text-[#0284c7]" />
                    </button>
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] w-full overflow-hidden select-none bg-slate-900">
                    {/* AFTER Image (Full background layer) */}
                    <img
                      src={project.afterImage}
                      alt={`${project.title} - After Refinishing`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* BEFORE Image (Clipped layer based on slider position) */}
                    <div
                      className="absolute inset-y-0 left-0 overflow-hidden"
                      style={{ width: `${sliderPos}%` }}
                    >
                      <img
                        src={project.beforeImage}
                        alt={`${project.title} - Before Refinishing`}
                        className="absolute inset-0 w-full h-full object-cover max-w-none"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>

                    {/* Vertical Dividing Line & Handle */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
                      style={{ left: `${sliderPos}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-[#0c2340] shadow-xl flex items-center justify-center border-2 border-[#0284c7]">
                        <ArrowLeftRight className="w-4 h-4 text-[#0284c7]" />
                      </div>
                    </div>

                    {/* Invisible Range Input for Smooth Dragging */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPos}
                      onChange={(e) => handleSliderMove(project.id, e)}
                      aria-label={`Compare Before and After for ${project.title}`}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    />

                    {/* Static Labels */}
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider border border-white/20 pointer-events-none">
                      Before
                    </div>
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#0284c7]/90 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider border border-white/20 pointer-events-none">
                      After Refinished
                    </div>

                    {/* Zoom Lightbox Trigger */}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
                      title="View Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4 text-[#0c2340]" />
                    </button>
                  </div>
                )}

                {/* Card Content & Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">
                        {project.categoryLabel}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{project.location}</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0c2340] mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      {project.transformationHighlights.map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 italic">
                      Drag slider to view difference
                    </span>

                    <button
                      type="button"
                      onClick={() => onRequestEstimateForProject(project.title)}
                      className="px-4 py-2 rounded-full bg-sky-50 hover:bg-sky-100 text-[#0284c7] font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <span>Request Similar Project</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[95vh] overflow-y-auto">
              
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">
                  {selectedProject.categoryLabel}
                </span>
                <h3 className="text-2xl font-black text-[#0c2340] mt-1">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Location: {selectedProject.location}
                </p>
              </div>

              {/* Image Preview: Composite Photo OR Side-by-Side Comparison */}
              {selectedProject.compositeImage ? (
                <div className="my-4">
                  <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-inner flex items-center justify-center p-2">
                    <img
                      src={selectedProject.compositeImage}
                      alt={selectedProject.title}
                      className="w-full max-h-[65vh] object-contain rounded-xl"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="space-y-2">
                    <div className="px-3 py-1 rounded-md bg-red-100 text-red-900 text-xs font-bold w-fit">
                      Before: Worn & Discolored
                    </div>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img
                        src={selectedProject.beforeImage}
                        alt="Before Refinishing"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold w-fit">
                      After: Refinished Glossy Finish
                    </div>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img
                        src={selectedProject.afterImage}
                        alt="After Refinishing"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}

              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                {selectedProject.description}
              </p>

              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Like this transformation? Contact us for a fast free estimate on your surface.
                </span>

                <button
                  type="button"
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    onRequestEstimateForProject(title);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  Get Estimate For This Type Of Job
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
