import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingSection } from './components/PricingSection';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
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

function WebsiteContent() {
  const { isAdminView } = useAdmin();
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
        {/* 1. Hero: Austin Refinishing Value Proposition & Interactive Slider */}
        <Hero 
          onOpenEstimate={scrollToContact} 
          onExploreGallery={scrollToGallery} 
          onOpenFlyer={() => setIsFlyerOpen(true)}
        />

        {/* 2. Unified Services & Transparent Pricing */}
        <PricingSection 
          onOpenEstimate={scrollToContact}
          onOpenFlyer={() => setIsFlyerOpen(true)}
        />

        {/* 3. The Pour-On Advantage: 4 Simple Punchy Cards & Commercial Callout */}
        <WhyChooseUs 
          onOpenFlyer={() => setIsFlyerOpen(true)} 
          onOpenEstimate={scrollToContact}
        />

        {/* 4. Before & After Gallery: Interactive Sliders & Real Austin Projects */}
        <BeforeAfterGallery 
          onRequestEstimateForProject={handleProjectEstimate} 
          onOpenFlyer={() => setIsFlyerOpen(true)}
        />

        {/* 5. Verified Austin Customer Reviews */}
        <TestimonialsSection />

        {/* 6. How It Works: 4-Step clear process */}
        <HowItWorks onOpenEstimate={scrollToContact} />

        {/* 7. About Us: Founders Akbar & Alex */}
        <AboutUs />

        {/* 8. Frequently Asked Questions */}
        <FaqSection />

        {/* 9. Contact Us & Free Estimate Request Form */}
        <LeadCaptureForm 
          initialServiceId={selectedServiceId} 
          initialDetails={estimateDetails}
        />

        {/* 10. Service Areas: Austin Metro */}
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
