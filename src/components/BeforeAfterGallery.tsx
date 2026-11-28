import React, { useState } from 'react';
import { Sparkles, Maximize2, X, ArrowLeftRight, CheckCircle2, ChevronRight, MapPin, FileText } from 'lucide-react';
import { BeforeAfterProject, BRAND_ASSETS } from '../data/content';
import { useAdmin } from '../context/AdminContext';

interface BeforeAfterGalleryProps {
  onRequestEstimateForProject: (projectTitle: string) => void;
  onOpenFlyer?: () => void;
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({ 
  onRequestEstimateForProject,
  onOpenFlyer 
}) => {
  const { galleryItems } = useAdmin();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<BeforeAfterProject | null>(null);
  const [sliderPositions, setSliderPositions] = useState<Record<string, number>>({
    'ba-bathtub-1': 50,
    'ba-shower-1': 50,
    'ba-sink-1': 50,
    'ba-counter-1': 50
  });

  const hasJacuzzi = galleryItems.some(p => p.category === 'jacuzzi');
  const categories = [
    { id: 'all', label: `All Transformations (${galleryItems.length})` },
    { id: 'bathtub', label: 'Bathtubs' },
    { id: 'color-change', label: 'Color Modernization' },
    { id: 'shower', label: 'Shower Bases' },
    { id: 'sink', label: 'Sinks' },
    { id: 'countertop', label: 'Countertops' },
    ...(hasJacuzzi ? [{ id: 'jacuzzi', label: 'Jacuzzi / Whirlpool' }] : [])
  ];

  const filteredProjects = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(p => p.category === activeCategory);

  const handleSliderMove = (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderPositions(prev => ({ ...prev, [projectId]: val }));
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E6DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#E2CFAF] text-[#8A652E] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#9A723A]" />
            <span>Austin Surface Transformations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#2B1D16] tracking-tight">
            Before & After{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8E6932] via-[#B48A4E] to-[#5C3D2E]">
              Gallery
            </span>
          </h2>

          <p className="mt-3 text-[#5A4639] text-sm sm:text-base leading-relaxed">
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
                  ? 'bg-[#5C3D2E] text-[#FAF7F2] shadow-md shadow-[#5C3D2E]/20'
                  : 'bg-[#FFFDF9] text-[#5A4639] hover:text-[#2B1D16] hover:bg-[#F3ECE1] border border-[#E2D6C5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Official Flyer Proof Banner */}
        {onOpenFlyer && (
          <div className="mb-12 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border border-[#EAE1D3] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-14 rounded-lg overflow-hidden border border-[#DFD2BE] shadow-xs shrink-0 bg-[#FFFDF9]">
                <img
                  src={BRAND_ASSETS.flyer}
                  alt="Flyer Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-[#2B1D16] block">
                  Official Austin Project Portfolio & Marketing Flyer
                </span>
                <span className="text-[11px] text-[#5A4639]">
                  Inspect high-resolution side-by-side photos for Bathtubs, Shower Pans, Sinks, and Countertops.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenFlyer}
              className="shrink-0 px-4 py-2 rounded-full bg-[#5C3D2E] hover:bg-[#462D21] text-[#FAF7F2] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#E6C994]" />
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
                className="bg-[#FFFDF9] rounded-3xl overflow-hidden border border-[#EAE1D3] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Visual Area: Composite Real Photo OR Interactive Slider */}
                {project.compositeImage ? (
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative aspect-[4/3] w-full overflow-hidden select-none bg-[#231712] group cursor-pointer"
                  >
                    <img
                      src={project.compositeImage}
                      alt={`${project.title} - Real Before & After Refinishing Transformation in Austin`}
                      className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Tag badge */}
                    <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#2B1D16]/85 backdrop-blur-md text-[#FAF7F2] text-[11px] font-bold tracking-wide uppercase border border-[#E6C994]/30">
                      {project.tag || "Before & After"}
                    </div>

                    {/* Verified Job */}
                    <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-full bg-[#5C3D2E]/90 backdrop-blur-md text-[#FAF7F2] text-[10px] font-bold tracking-wide flex items-center gap-1 shadow-sm border border-[#C49E62]/40">
                      <CheckCircle2 className="w-3 h-3 text-[#E6C994]" />
                      <span>Verified Austin Job</span>
                    </div>

                    {/* Zoom Lightbox Trigger */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="absolute bottom-3 right-3 z-10 w-9 h-9 rounded-full bg-[#FFFDF9]/95 hover:bg-[#FFFDF9] text-[#2B1D16] flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
                      title="View Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4 text-[#8A652E]" />
                    </button>
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] w-full overflow-hidden select-none bg-[#231712]">
                    {/* AFTER Image (Full background layer) */}
                    <img
                      src={project.afterImage}
                      alt={`${project.title} - After Refinishing`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* BEFORE Image (Clipped layer based on slider position) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                    >
                      <img
                        src={project.beforeImage}
                        alt={`${project.title} - Before Refinishing`}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Vertical Dividing Line & Handle */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-[#FAF7F2] shadow-2xl pointer-events-none"
                      style={{ left: `${sliderPos}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#FFFDF9] text-[#2B1D16] shadow-xl flex items-center justify-center border-2 border-[#C49E62]">
                        <ArrowLeftRight className="w-4 h-4 text-[#8A652E]" />
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
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#2B1D16]/80 backdrop-blur-md text-[#FAF7F2] text-[11px] font-black uppercase tracking-wider border border-white/20 pointer-events-none">
                      Before
                    </div>
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#5C3D2E]/90 backdrop-blur-md text-[#FAF7F2] text-[11px] font-black uppercase tracking-wider border border-[#E6C994]/40 pointer-events-none">
                      After Refinished
                    </div>

                    {/* Zoom Lightbox Trigger */}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FFFDF9]/95 hover:bg-[#FFFDF9] text-[#2B1D16] flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
                      title="View Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4 text-[#2B1D16]" />
                    </button>
                  </div>
                )}

                {/* Card Content & Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-[#8A652E] uppercase tracking-wider">
                        {project.categoryLabel}
                      </span>
                      <span className="text-[11px] font-medium text-[#6B574A] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#9A723A]" />
                        <span>{project.location}</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#2B1D16] mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#5A4639] leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-3 border-t border-[#EFE8DC]">
                      {project.transformationHighlights.map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#4E3B30]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#9A723A] shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#EFE8DC] flex items-center justify-between">
                    <span className="text-xs text-[#7A6658] italic">
                      {project.compositeImage ? 'Click photo to enlarge' : 'Drag slider to view difference'}
                    </span>

                    <button
                      type="button"
                      onClick={() => onRequestEstimateForProject(project.title)}
                      className="px-4 py-2 rounded-full bg-[#F3ECE1] hover:bg-[#E7DAC6] text-[#2B1D16] border border-[#DFD2BE] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Request Similar Project</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#9A723A]" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D130E]/85 backdrop-blur-md animate-in fade-in">
            <div className="bg-[#FFFDF9] rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-[#EAE1D3] relative max-h-[95vh] overflow-y-auto">
              
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#F3ECE1] text-[#5A4639] hover:text-[#2B1D16] transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-xs font-bold text-[#8A652E] uppercase tracking-wider">
                  {selectedProject.categoryLabel}
                </span>
                <h3 className="text-2xl font-black text-[#2B1D16] mt-1">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B574A] mt-0.5">
                  Location: {selectedProject.location}
                </p>
              </div>

              {/* Image Preview: Composite Photo OR Side-by-Side Comparison */}
              {selectedProject.compositeImage ? (
                <div className="my-4">
                  <div className="rounded-2xl overflow-hidden bg-[#231712] border border-[#EAE1D3] shadow-inner flex items-center justify-center p-2">
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
                    <div className="px-3 py-1 rounded-md bg-[#F6EFE2] text-[#5C3D2E] border border-[#E2CFAF] text-xs font-bold w-fit">
                      Before: Worn &amp; Discolored
                    </div>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EFE8DC] border border-[#EAE1D3]">
                      <img
                        src={selectedProject.beforeImage}
                        alt="Before Refinishing"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="px-3 py-1 rounded-md bg-[#5C3D2E] text-[#FAF7F2] text-xs font-bold w-fit">
                      After: Refinished Glossy Finish
                    </div>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EFE8DC] border border-[#EAE1D3]">
                      <img
                        src={selectedProject.afterImage}
                        alt="After Refinishing"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}

              <p className="text-sm text-[#5A4639] leading-relaxed mt-4">
                {selectedProject.description}
              </p>

              <div className="mt-6 pt-4 border-t border-[#EAE1D3] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[#6B574A]">
                  Like this transformation? Contact us for a fast free estimate on your surface.
                </span>

                <button
                  type="button"
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    onRequestEstimateForProject(title);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#5C3D2E] hover:bg-[#462D21] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
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
