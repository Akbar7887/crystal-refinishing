import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { PropertyManagementSection } from './components/PropertyManagementSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { AboutUs } from './components/AboutUs';
import { FaqSection } from './components/FaqSection';
import { LeadCaptureForm } from './components/LeadCaptureForm';
import { ServiceArea } from './components/ServiceArea';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { FlyerModal } from './components/FlyerModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { RefinishingService } from './data/content';
import { Lock } from 'lucide-react';

function WebsiteContent() {
  const { isAdminView, setIsAdminView } = useAdmin();
  const [selectedServiceId, setSelectedServiceId] = useState<string>('bathtub-refinishing');
  const [estimateDetails, setEstimateDetails] = useState<string>('');
  const [isFlyerOpen, setIsFlyerOpen] = useState<boolean>(false);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGallery = () => {
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPropertyManagement = () => {
    const el = document.getElementById('property-management');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceEstimate = (service: RefinishingService) => {
    setSelectedServiceId(service.id);
    setEstimateDetails(`Requesting estimate for ${service.title}: `);
    scrollToContact();
  };

  const handleProjectEstimate = (projectTitle: string) => {
    setEstimateDetails(`Saw transformation in Before & After Gallery: "${projectTitle}". Requesting similar refinishing estimate: `);
    scrollToContact();
  };

  // If in Admin Mode, render the dedicated Admin Portal
  if (isAdminView) {
    return <AdminPortal />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans pb-16 sm:pb-0 relative selection:bg-cyan-200 selection:text-slate-950">
      
      {/* 1. Sticky Header & Announcement Bar */}
      <Navbar 
        onOpenEstimate={scrollToContact} 
        onOpenPropertyManagement={scrollToPropertyManagement} 
        onOpenFlyer={() => setIsFlyerOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section: Austin Refinishing Value Proposition */}
        <Hero 
          onOpenEstimate={scrollToContact} 
          onExploreGallery={scrollToGallery} 
          onOpenFlyer={() => setIsFlyerOpen(true)}
        />

        {/* 3. Our Services: Dedicated cards with images, descriptions & CTAs */}
        <ServicesSection 
          onSelectServiceEstimate={handleSelectServiceEstimate} 
          onOpenFlyer={() => setIsFlyerOpen(true)}
        />

        {/* 4. Before & After Gallery: 4 Categories, Interactive Sliders & Lightbox */}
        <BeforeAfterGallery 
          onRequestEstimateForProject={handleProjectEstimate} 
          onOpenFlyer={() => setIsFlyerOpen(true)}
        />

        {/* 5. Property Management Services: Specialized solutions for apartments & rentals */}
        <PropertyManagementSection />

        {/* 6. Why Choose Crystal Refinishing?: Honest benefits, blue icons */}
        <WhyChooseUs onOpenFlyer={() => setIsFlyerOpen(true)} />

        {/* 7. How It Works: 4-Step clear process */}
        <HowItWorks onOpenEstimate={scrollToContact} />

        {/* 8. About Us: Founders Akbar & Alex, brand values */}
        <AboutUs />

        {/* 9. Frequently Asked Questions */}
        <FaqSection />

        {/* 10. Contact Us & Free Estimate Request Form (with optional photo upload) */}
        <LeadCaptureForm 
          initialServiceId={selectedServiceId} 
          initialDetails={estimateDetails}
        />

        {/* 10. Service Areas: Austin Metro & Surrounding Areas with ZIP verification */}
        <ServiceArea />
      </main>

      {/* Official Marketing Flyer High-Res Modal */}
      <FlyerModal
        isOpen={isFlyerOpen}
        onClose={() => setIsFlyerOpen(false)}
        onOpenEstimate={scrollToContact}
      />

      {/* 11. Footer: Privacy policy modal, full contacts, quick links */}
      <Footer />

      {/* 12. Mobile Sticky Quick Action Bar: Call Akbar (512) 905-5823 & Free Estimate */}
      <MobileQuickBar onOpenEstimate={scrollToContact} />

      {/* Floating Discreet Admin Portal Launcher */}
      <aside aria-label="Admin Access" className="fixed bottom-20 sm:bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAdminView(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#0c2340]/90 hover:bg-[#0c2340] text-cyan-200 hover:text-white text-xs font-bold shadow-xl border border-cyan-500/30 backdrop-blur-md transition-all hover:scale-105 active:scale-95 group cursor-pointer"
          title="Owner Portal (Akbar & Alex)"
        >
          <Lock className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Admin Portal</span>
        </button>
      </aside>

    </div>
  );
}

export function App() {
  return (
    <AdminProvider>
      <WebsiteContent />
    </AdminProvider>
  );
}

export default App;
