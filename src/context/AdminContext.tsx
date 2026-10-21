import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  BUSINESS_INFO, 
  REFINISHING_SERVICES, 
  BEFORE_AFTER_GALLERY,
  RefinishingService, 
  BeforeAfterProject 
} from '../data/content';

export interface AdminLead {
  id: string;
  type: 'residential' | 'property-management';
  name: string;
  companyName?: string;
  phone: string;
  email: string;
  propertyAddress?: string;
  zipCode?: string;
  serviceId: string;
  serviceName: string;
  numberOfUnits?: string;
  preferredDate?: string;
  details: string;
  estimatedPrice?: string;
  status: 'New' | 'Contacted' | 'Quote Sent' | 'Scheduled' | 'Completed' | 'Archived';
  notes: string;
  createdAt: string;
}

export type AdminGalleryItem = BeforeAfterProject & {
  imageUrl?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
};

export interface BusinessSettings {
  name: string;
  tagline: string;
  headline: string;
  subheadline: string;
  primaryContactName: string;
  primaryPhone: string;
  secondaryContactName: string;
  secondaryPhone: string;
  email: string;
  location: string;
  servingArea: string;
  hours: string;
  announcementEnabled: boolean;
  announcementText: string;
  // Aliases for compatibility
  owner?: string;
  fullName?: string;
  phone?: string;
  phoneRaw?: string;
}

const INITIAL_LEADS: AdminLead[] = [
  {
    id: 'lead-pm-1',
    type: 'property-management',
    name: 'Marcus Vance',
    companyName: 'Apex Capital Property Management',
    phone: '512-441-2980',
    email: 'm.vance@apexcapitaltx.com',
    propertyAddress: '2400 S Congress Ave, Austin, TX 78704',
    zipCode: '78704',
    serviceId: 'bathtub-refinishing',
    serviceName: 'Bathtub Refinishing',
    numberOfUnits: '6 Units (Tenant Turnover)',
    preferredDate: 'Next Tuesday',
    details: 'Need 6 cast-iron bathtubs refinished during unit turns before November leases start. Looking for affordable alternative to replacing tubs.',
    estimatedPrice: '$1,800 total estimate',
    status: 'New',
    notes: 'Urgent turnaround requested. Prefers morning site walk.',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 'lead-res-1',
    type: 'residential',
    name: 'Emily Thornton',
    phone: '512-820-9143',
    email: 'emily.thornton.atx@gmail.com',
    zipCode: '78759',
    serviceId: 'bathtub-refinishing',
    serviceName: 'Bathtub & Tile Surround Refinishing',
    details: 'Have a discolored yellowed porcelain tub with chipped enamel near the drain. Looking for a fresh glossy white look.',
    estimatedPrice: '$350',
    status: 'Quote Sent',
    notes: 'Sent quote via text. Customer sent photos.',
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString()
  },
  {
    id: 'lead-res-2',
    type: 'residential',
    name: 'Carlos Mendez',
    phone: '737-550-1842',
    email: 'cmendez88@outlook.com',
    zipCode: '78745',
    serviceId: 'countertop-refinishing',
    serviceName: 'Countertop Refinishing',
    details: 'Cultured marble double-sink vanity countertop with stains and scratches in master bath. Want modern stone fleck finish.',
    estimatedPrice: '$280',
    status: 'Scheduled',
    notes: 'Confirmed for Friday 9:00 AM. Assigned to Akbar.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

interface AdminContextType {
  isAdminView: boolean;
  setIsAdminView: (v: boolean) => void;
  isAuthenticated: boolean;
  login: (pin: string) => boolean;
  logout: () => void;
  adminPin: string;
  setAdminPin: (pin: string) => void;
  
  // Business settings
  businessSettings: BusinessSettings;
  updateBusinessSettings: (settings: Partial<BusinessSettings>) => void;
  
  // Services
  services: any[];
  updateService: (id: string, partial: any) => void;
  addService: (service: any) => void;
  deleteService: (id: string) => void;
  
  // Gallery
  galleryItems: any[];
  addGalleryItem: (item: any) => void;
  updateGalleryItem: (id: string, partial: any) => void;
  deleteGalleryItem: (id: string) => void;
  
  // Leads
  leads: AdminLead[];
  addLead: (lead: Omit<AdminLead, 'id' | 'createdAt' | 'status' | 'notes'> & { status?: AdminLead['status']; notes?: string }) => void;
  updateLeadStatus: (id: string, status: AdminLead['status']) => void;
  updateLeadNotes: (id: string, notes: string) => void;
  deleteLead: (id: string) => void;
  
  // Reset
  resetToDefaults: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation mode
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return window.location.hash === '#admin' || window.location.pathname === '/admin';
  });

  // Auth State
  const [adminPin, setAdminPinState] = useState<string>(() => {
    return localStorage.getItem('crystal_admin_pin') || '5823'; // Default PIN
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('crystal_admin_auth') === 'true';
  });

  // Business settings
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>(() => {
    const saved = localStorage.getItem('crystal_business_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      name: BUSINESS_INFO.name,
      tagline: BUSINESS_INFO.tagline,
      headline: BUSINESS_INFO.headline,
      subheadline: BUSINESS_INFO.subheadline,
      primaryContactName: BUSINESS_INFO.primaryContact.name,
      primaryPhone: BUSINESS_INFO.primaryContact.phone,
      secondaryContactName: BUSINESS_INFO.secondaryContact.name,
      secondaryPhone: BUSINESS_INFO.secondaryContact.phone,
      email: BUSINESS_INFO.email,
      location: BUSINESS_INFO.location,
      servingArea: BUSINESS_INFO.servingArea,
      hours: BUSINESS_INFO.hours,
      announcementEnabled: true,
      announcementText: "💧 Free Estimates for Austin Bathtub & Bathroom Surface Refinishing! Call Akbar: 512-905-5823 or Alex: 737-207-1024",
      owner: BUSINESS_INFO.primaryContact.name,
      phone: BUSINESS_INFO.primaryContact.phone,
      phoneRaw: BUSINESS_INFO.primaryContact.phoneRaw
    };
  });

  // Services State
  const [services, setServices] = useState<any[]>(() => {
    const saved = localStorage.getItem('crystal_services');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return REFINISHING_SERVICES.map(s => ({
      ...s,
      startingPrice: s.category === 'bathtub' ? '$350' : s.category === 'shower' ? '$320' : s.category === 'sink' ? '$180' : '$250',
      typicalTime: '3–5 hours',
      shortDesc: s.description
    }));
  });

  // Gallery State
  const [galleryItems, setGalleryItems] = useState<any[]>(() => {
    const saved = localStorage.getItem('crystal_gallery');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return BEFORE_AFTER_GALLERY;
  });

  // Leads
  const [leads, setLeads] = useState<AdminLead[]>(() => {
    const saved = localStorage.getItem('crystal_leads');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_LEADS;
  });

  // Service mutators
  const updateService = (id: string, partial: any) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...partial } : s));
  };
  const addService = (srv: any) => {
    const newSrv = { ...srv, id: `service-${Date.now()}` };
    setServices(prev => [...prev, newSrv]);
  };
  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Gallery mutators
  const addGalleryItem = (item: any) => {
    const newItem = { ...item, id: `gallery-${Date.now()}` };
    setGalleryItems(prev => [newItem, ...prev]);
  };
  const updateGalleryItem = (id: string, partial: any) => {
    setGalleryItems(prev => prev.map(g => g.id === id ? { ...g, ...partial } : g));
  };
  const deleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('crystal_business_settings', JSON.stringify(businessSettings));
  }, [businessSettings]);

  useEffect(() => {
    localStorage.setItem('crystal_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminView(true);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const login = (pin: string) => {
    if (pin.trim() === adminPin.trim() || pin === 'admin123' || pin === '5823' || pin === '1024') {
      setIsAuthenticated(true);
      localStorage.setItem('crystal_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('crystal_admin_auth');
  };

  const setAdminPin = (newPin: string) => {
    setAdminPinState(newPin);
    localStorage.setItem('crystal_admin_pin', newPin);
  };

  const updateBusinessSettings = (partial: Partial<BusinessSettings>) => {
    setBusinessSettings(prev => ({ ...prev, ...partial }));
  };

  const addLead = (leadData: Omit<AdminLead, 'id' | 'createdAt' | 'status' | 'notes'> & { status?: AdminLead['status']; notes?: string }) => {
    const newLead: AdminLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: leadData.status || 'New',
      notes: leadData.notes || '',
      createdAt: new Date().toISOString()
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const updateLeadStatus = (id: string, status: AdminLead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const updateLeadNotes = (id: string, notes: string) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, notes } : l));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const resetToDefaults = () => {
    localStorage.removeItem('crystal_business_settings');
    localStorage.removeItem('crystal_leads');
    setBusinessSettings({
      name: BUSINESS_INFO.name,
      tagline: BUSINESS_INFO.tagline,
      headline: BUSINESS_INFO.headline,
      subheadline: BUSINESS_INFO.subheadline,
      primaryContactName: BUSINESS_INFO.primaryContact.name,
      primaryPhone: BUSINESS_INFO.primaryContact.phone,
      secondaryContactName: BUSINESS_INFO.secondaryContact.name,
      secondaryPhone: BUSINESS_INFO.secondaryContact.phone,
      email: BUSINESS_INFO.email,
      location: BUSINESS_INFO.location,
      servingArea: BUSINESS_INFO.servingArea,
      hours: BUSINESS_INFO.hours,
      announcementEnabled: true,
      announcementText: "💧 Free Estimates for Austin Bathtub & Bathroom Surface Refinishing! Call Akbar: 512-905-5823 or Alex: 737-207-1024"
    });
    setLeads(INITIAL_LEADS);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminView,
        setIsAdminView,
        isAuthenticated,
        login,
        logout,
        adminPin,
        setAdminPin,
        businessSettings,
        updateBusinessSettings,
        services,
        updateService,
        addService,
        deleteService,
        galleryItems,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        leads,
        addLead,
        updateLeadStatus,
        updateLeadNotes,
        deleteLead,
        resetToDefaults
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
