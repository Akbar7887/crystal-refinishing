import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Wrench, 
  Camera, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Plus, 
  Search, 
  Phone, 
  MessageSquare, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Eye, 
  Save, 
  Edit3, 
  AlertCircle,
  FileSpreadsheet,
  Lock,
  KeyRound,
  Shield,
  Megaphone,
  X,
  ArrowLeft,
  Globe
} from 'lucide-react';
import { useAdmin, AdminLead, AdminGalleryItem } from '../../context/AdminContext';
import { ServiceItem, BRAND_ASSETS } from '../../data/content';
import { HostingDeploymentGuide } from './HostingDeploymentGuide';

export const AdminPortal: React.FC = () => {
  const {
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
  } = useAdmin();

  // Login PIN state
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active tab in admin
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'services' | 'gallery' | 'settings' | 'hosting'>('overview');

  // Lead search & filter
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('All');
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState<AdminLead | null>(null);
  const [leadNotesText, setLeadNotesText] = useState('');
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);

  // New lead form
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadZip, setNewLeadZip] = useState('78701');
  const [newLeadService, setNewLeadService] = useState('TV Mount');
  const [newLeadDetails, setNewLeadDetails] = useState('');
  const [newLeadPrice, setNewLeadPrice] = useState('$95');

  // Service editing state
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newServiceForm, setNewServiceForm] = useState<Partial<ServiceItem>>({
    title: '',
    tagline: '',
    shortDesc: '',
    fullDesc: '',
    startingPrice: '$85',
    typicalTime: '1 hour',
    features: ['Professional tools & hardware', 'Precision laser leveling', 'Guaranteed workmanship']
  });

  // Gallery editing state
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobCategory, setNewJobCategory] = useState<'tv' | 'furniture' | 'garage' | 'outdoor' | 'commercial'>('tv');
  const [newJobNeighborhood, setNewJobNeighborhood] = useState('Austin, TX');
  const [newJobDescription, setNewJobDescription] = useState('');
  const [newJobImage, setNewJobImage] = useState('/images/project_tv_mounting_1790469477728.jpg');
  const [newJobFeature1, setNewJobFeature1] = useState('Precision laser leveling');
  const [newJobFeature2, setNewJobFeature2] = useState('Zero exposed cables');

  // Settings PIN change state
  const [newPinValue, setNewPinValue] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // Announcement bar state inside settings
  const [announcementMsg, setAnnouncementMsg] = useState(businessSettings.announcementText);
  const [announcementActive, setAnnouncementActive] = useState(businessSettings.announcementEnabled);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pinInput)) {
      setPinInput('');
      setLoginError('');
    } else {
      setLoginError('Invalid Passcode. Default is 5823 or admin123.');
    }
  };

  // Export leads to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Customer Name', 'Phone', 'Austin ZIP', 'Service', 'Details', 'Est Price', 'Status', 'Notes'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      l.zipCode,
      `"${l.serviceName}"`,
      `"${l.details.replace(/"/g, '""')}"`,
      `"${l.estimatedPrice || ''}"`,
      l.status,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Crystal_Refinishing_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If not logged in, show secure Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0c2340] text-white flex flex-col justify-center items-center p-4">
        {/* Back to website button */}
        <button
          onClick={() => {
            window.location.hash = '';
            setIsAdminView(false);
          }}
          className="absolute top-6 left-6 flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Website</span>
        </button>

        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-md p-8 rounded-3xl border border-slate-700 shadow-2xl">
          <div className="p-4 bg-white rounded-2xl max-w-[220px] mx-auto mb-5 shadow-lg border border-slate-200 flex items-center justify-center">
            <img
              src={BRAND_ASSETS.logo}
              alt="Crystal Refinishing"
              className="w-full h-auto object-contain"
            />
          </div>

          <h1 className="text-2xl font-black text-center text-white">
            Admin Management
          </h1>
          <p className="text-xs text-center text-cyan-300 mt-1 mb-6">
            Crystal Refinishing (Austin, Texas) Portal
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Enter Admin Passcode / PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (e.g. 5823)"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0062ff] text-center text-xl tracking-widest font-mono"
                  autoFocus
                />
                <KeyRound className="w-5 h-5 text-slate-500 absolute left-4 top-4" />
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0062ff] hover:bg-[#0052cc] text-white font-bold text-sm shadow-md transition-all active:scale-98"
            >
              Sign In to Admin
            </button>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/50 text-[11px] text-slate-400 text-center space-y-1">
              <span className="font-semibold text-slate-300">Default Access:</span>
              <p>PIN is <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-400 font-bold">5823</code> (last 4 digits of phone) or <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-400 font-bold">admin123</code></p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.phone.includes(leadSearch) ||
      (lead.zipCode || '').includes(leadSearch) ||
      lead.serviceName.toLowerCase().includes(leadSearch.toLowerCase());
    const matchesStatus = leadStatusFilter === 'All' || lead.status === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      
      {/* Top Admin Navigation Bar */}
      <header className="bg-[#0c2340] text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Status */}
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-xl bg-white shadow-xs border border-slate-700/60 flex items-center justify-center">
              <img
                src={BRAND_ASSETS.logo}
                alt="Crystal Refinishing"
                className="h-7 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base leading-tight">Crystal Refinishing Admin</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Managing {businessSettings.name || 'Crystal Refinishing'}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {/* View Live Website Button */}
            <button
              onClick={() => {
                window.location.hash = '';
                setIsAdminView(false);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors shadow-xs"
            >
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>View Public Website</span>
              <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 border-t border-slate-800/80 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'overview'
                ? 'border-[#0062ff] text-white bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors relative ${
              activeTab === 'leads'
                ? 'border-[#0062ff] text-white bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Inquiries & Quotes</span>
            {leads.filter(l => l.status === 'New').length > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#0062ff] text-white text-[10px] flex items-center justify-center font-bold">
                {leads.filter(l => l.status === 'New').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'services'
                ? 'border-[#0062ff] text-white bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Services & Pricing</span>
            <span className="text-slate-500 font-normal">({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'gallery'
                ? 'border-[#0062ff] text-white bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Job Gallery</span>
            <span className="text-slate-500 font-normal">({galleryItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'settings'
                ? 'border-[#0062ff] text-white bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings & Banner</span>
          </button>

          <button
            onClick={() => setActiveTab('hosting')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'hosting'
                ? 'border-[#0062ff] text-white bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Domain & Hosting</span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">Guide</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <span>Total Inquiries</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0062ff] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 mt-2">
                  {leads.length}
                </div>
                <div className="mt-2 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <span>{leads.filter(l => l.status === 'New').length} pending review</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <span>Active Services</span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Wrench className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 mt-2">
                  {services.length}
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  Austin flat rate options
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <span>Portfolio Photos</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 mt-2">
                  {galleryItems.length}
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  Featured Austin jobs
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <span>Announcement Banner</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Megaphone className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-lg font-bold text-slate-900 mt-2 flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${businessSettings.announcementEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                  <span>{businessSettings.announcementEnabled ? 'Active' : 'Disabled'}</span>
                </div>
                <div className="mt-1 text-xs text-slate-500 truncate">
                  {businessSettings.announcementText}
                </div>
              </div>

            </div>

            {/* Quick Action Bar */}
            <div className="bg-gradient-to-r from-[#0c1e3d] to-[#1e3a6a] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Quick Management Actions</h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Update your rates, add customer inquiries or publish new photos directly to the site.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setShowAddLeadModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#0062ff] hover:bg-[#0052cc] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Record Phone Lead</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('gallery');
                    setShowAddGalleryModal(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Job to Gallery</span>
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors flex items-center gap-1.5"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Adjust Service Rates</span>
                </button>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Recent Customer Inquiries</h3>
                  <p className="text-xs text-slate-500">Live requests from website contact form and estimate tool</p>
                </div>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs font-bold text-[#0062ff] hover:underline"
                >
                  View All ({leads.length}) →
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {leads.slice(0, 4).map(lead => (
                  <div key={lead.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{lead.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          lead.status === 'New' ? 'bg-blue-100 text-blue-700' :
                          lead.status === 'Scheduled' ? 'bg-amber-100 text-amber-700' :
                          lead.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {lead.status}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1">{lead.details}</p>
                      <div className="text-[11px] text-slate-500 flex items-center gap-3">
                        <span><strong>Service:</strong> {lead.serviceName}</span>
                        <span><strong>ZIP:</strong> {lead.zipCode}</span>
                        {lead.estimatedPrice && <span><strong>Est:</strong> {lead.estimatedPrice}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`tel:${lead.phone}`}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#0062ff] hover:bg-blue-100 text-xs font-bold flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                      <a
                        href={`sms:${lead.phone}`}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>SMS</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 2. LEADS TAB */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Top Toolbar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    placeholder="Search leads by name, phone, ZIP, or service..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Quote Sent">Quote Sent</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => setShowAddLeadModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#0062ff] hover:bg-[#0052cc] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Lead</span>
                </button>
              </div>

            </div>

            {/* Leads Table / Cards */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Service & Details</th>
                      <th className="py-3 px-4">Austin ZIP</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Notes</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          No inquiries found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                          
                          {/* Date */}
                          <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                            {new Date(lead.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                            <div className="text-[10px] text-slate-400">
                              {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>

                          {/* Customer */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{lead.name}</div>
                            <div className="text-slate-500 flex items-center gap-2 mt-0.5">
                              <a href={`tel:${lead.phone}`} className="hover:text-[#0062ff] flex items-center gap-1 font-mono">
                                <Phone className="w-3 h-3 text-blue-500" />
                                <span>{lead.phone}</span>
                              </a>
                            </div>
                          </td>

                          {/* Service & Details */}
                          <td className="py-3.5 px-4 max-w-xs">
                            <div className="font-bold text-[#0c1e3d] flex items-center gap-1.5">
                              <span>{lead.serviceName}</span>
                              {lead.estimatedPrice && (
                                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                                  {lead.estimatedPrice}
                                </span>
                              )}
                            </div>
                            <p className="text-slate-600 line-clamp-2 mt-0.5 text-[11px] leading-relaxed">
                              {lead.details}
                            </p>
                          </td>

                          {/* Austin ZIP */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="px-2 py-1 rounded bg-slate-100 font-mono font-semibold text-slate-700">
                              {lead.zipCode}
                            </span>
                          </td>

                          {/* Status Dropdown */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as AdminLead['status'])}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                                lead.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                lead.status === 'Contacted' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                lead.status === 'Quote Sent' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                lead.status === 'Scheduled' ? 'bg-teal-50 text-teal-700 border-teal-200' :
                                lead.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                'bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Quote Sent">Quote Sent</option>
                              <option value="Scheduled">Scheduled</option>
                              <option value="Completed">Completed</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>

                          {/* Notes */}
                          <td className="py-3.5 px-4 max-w-[180px]">
                            <button
                              onClick={() => {
                                setSelectedLeadForNotes(lead);
                                setLeadNotesText(lead.notes || '');
                              }}
                              className="text-left w-full hover:text-[#0062ff] transition-colors"
                            >
                              {lead.notes ? (
                                <span className="line-clamp-2 text-slate-700 text-[11px] italic">"{lead.notes}"</span>
                              ) : (
                                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                                  <Edit3 className="w-3 h-3" /> + Add note
                                </span>
                              )}
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`tel:${lead.phone}`}
                                className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                                title="Call Customer"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`sms:${lead.phone}`}
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                title="SMS Customer"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete lead from ${lead.name}?`)) {
                                    deleteLead(lead.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* 3. SERVICES & PRICING TAB */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header info */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Service Rates & Offerings</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Change starting prices, update durations, or add new services. Changes immediately update the live website!
                </p>
              </div>
              <button
                onClick={() => setShowAddServiceModal(true)}
                className="px-4 py-2 rounded-xl bg-[#0062ff] hover:bg-[#0052cc] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv) => (
                <div key={srv.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
                  {/* Image header */}
                  <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (srv.fallbackImage) e.currentTarget.src = srv.fallbackImage;
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-black text-[#0062ff] shadow-xs">
                      Starts at {srv.startingPrice}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-base">{srv.title}</h4>
                        <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {srv.typicalTime}
                        </span>
                      </div>
                      <p className="text-xs text-[#0062ff] font-semibold mt-0.5">{srv.tagline}</p>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">{srv.shortDesc}</p>

                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                        {(srv.features || []).slice(0, 3).map((f: string, i: number) => (
                          <div key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Edit price quickly inline */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-slate-500 font-medium">Rate:</span>
                        <input
                          type="text"
                          defaultValue={srv.startingPrice}
                          onBlur={(e) => updateService(srv.id, { startingPrice: e.target.value })}
                          className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-center font-bold text-slate-900 text-xs focus:ring-1 focus:ring-[#0062ff]"
                        />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingService(srv)}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0062ff] text-xs font-bold transition-colors"
                        >
                          Edit Details
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove service "${srv.title}" from website?`)) {
                              deleteService(srv.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* 4. GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header info */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Completed Job Photos (Gallery)</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage the photos displayed in the "Our Gallery" section. Add new jobs or delete outdated ones.
                </p>
              </div>
              <button
                onClick={() => setShowAddGalleryModal(true)}
                className="px-4 py-2 rounded-xl bg-[#0062ff] hover:bg-[#0052cc] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Upload / Add Job Photo</span>
              </button>
            </div>

            {/* Gallery items grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryItems.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={job.image}
                      alt={job.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (job.fallbackImage) e.currentTarget.src = job.fallbackImage;
                      }}
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white uppercase tracking-wider">
                      {job.category}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2">{job.title}</h4>
                      <p className="text-[11px] text-[#0062ff] font-semibold mt-1">📍 {job.neighborhood}</p>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{job.description}</p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-end">
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${job.title}" from gallery?`)) {
                            deleteGalleryItem(job.id);
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* 5. SETTINGS & ANNOUNCEMENT TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
            
            {/* Live Website Announcement Bar Settings */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Megaphone className="w-5 h-5 text-[#0062ff]" />
                <span>Top Website Announcement Bar</span>
              </div>
              <p className="text-xs text-slate-500">
                Display a prominent banner across the very top of the website for promotions, emergency slot alerts, or seasonal notices.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={announcementActive}
                    onChange={(e) => setAnnouncementActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0062ff]"></div>
                </label>
                <span className="text-xs font-bold text-slate-700">
                  {announcementActive ? 'Banner is Currently Visible' : 'Banner is Hidden'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Announcement Message
                </label>
                <input
                  type="text"
                  value={announcementMsg}
                  onChange={(e) => setAnnouncementMsg(e.target.value)}
                  placeholder="e.g. ⚡ Same-day slots available this week in Austin!"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
                />
              </div>

              <button
                onClick={() => {
                  updateBusinessSettings({
                    announcementEnabled: announcementActive,
                    announcementText: announcementMsg
                  });
                  setSettingsSaved(true);
                  setTimeout(() => setSettingsSaved(false), 2000);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#0062ff] hover:bg-[#0052cc] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Save Announcement</span>
              </button>

              {settingsSaved && (
                <span className="text-xs text-emerald-600 font-semibold ml-2">Saved successfully!</span>
              )}
            </div>

            {/* Business Contact Info */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Wrench className="w-5 h-5 text-[#0062ff]" />
                <span>Business Contact Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Company Name</label>
                  <input
                    type="text"
                    defaultValue={businessSettings.name}
                    onBlur={(e) => updateBusinessSettings({ name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Owner Name</label>
                  <input
                    type="text"
                    defaultValue={businessSettings.owner}
                    onBlur={(e) => updateBusinessSettings({ owner: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Display Phone</label>
                  <input
                    type="text"
                    defaultValue={businessSettings.phone}
                    onBlur={(e) => updateBusinessSettings({ 
                      phone: e.target.value,
                      phoneRaw: e.target.value.replace(/\D/g, '')
                    })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Contact Email</label>
                  <input
                    type="email"
                    defaultValue={businessSettings.email}
                    onBlur={(e) => updateBusinessSettings({ email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Operating Hours</label>
                  <input
                    type="text"
                    defaultValue={businessSettings.hours}
                    onBlur={(e) => updateBusinessSettings({ hours: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Change Admin PIN */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <KeyRound className="w-5 h-5 text-[#0062ff]" />
                <span>Admin Passcode / Security PIN</span>
              </div>
              <p className="text-xs text-slate-500">
                Current PIN is <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono font-bold text-slate-800">{adminPin}</code>. You can change it below anytime:
              </p>

              <div className="flex items-center gap-3">
                <input
                  type="password"
                  value={newPinValue}
                  onChange={(e) => setNewPinValue(e.target.value)}
                  placeholder="New PIN (4+ digits)"
                  className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 font-mono"
                />
                <button
                  onClick={() => {
                    if (newPinValue.trim().length >= 4) {
                      setAdminPin(newPinValue.trim());
                      setNewPinValue('');
                      setPinChangeSuccess(true);
                      setTimeout(() => setPinChangeSuccess(false), 2500);
                    } else {
                      alert('Please enter at least 4 digits/characters for your PIN.');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0062ff] text-white text-xs font-bold hover:bg-[#0052cc] transition-colors"
                >
                  Update PIN
                </button>
              </div>

              {pinChangeSuccess && (
                <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> PIN successfully updated!
                </div>
              )}
            </div>

            {/* Reset to Factory Defaults */}
            <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>Reset Website Data</span>
              </div>
              <p className="text-xs text-red-700 leading-relaxed">
                Clears custom changes and restores standard pricing, original Austin services, and factory defaults.
              </p>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all website pricing and settings to default?')) {
                    resetToDefaults();
                    alert('Data restored to original default configuration.');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
              >
                Reset to Default Data
              </button>
            </div>

          </div>
        )}

        {/* 6. DOMAIN & HOSTING GUIDE TAB */}
        {activeTab === 'hosting' && (
          <HostingDeploymentGuide />
        )}

      </main>

      {/* MODAL: Customer Lead Notes Drawer */}
      {selectedLeadForNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedLeadForNotes(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-1">
              Internal Notes for {selectedLeadForNotes.name}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Add job scheduling details, customer preferences, or quote notes:
            </p>

            <textarea
              rows={4}
              value={leadNotesText}
              onChange={(e) => setLeadNotesText(e.target.value)}
              placeholder="e.g. Quoted $110. Client confirmed arrival time for Friday at 11 AM..."
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0062ff] mb-4"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedLeadForNotes(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateLeadNotes(selectedLeadForNotes.id, leadNotesText);
                  setSelectedLeadForNotes(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#0062ff] hover:bg-[#0052cc] text-white text-xs font-bold"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add Manual Lead */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowAddLeadModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-1">Record Inbound Lead</h3>
            <p className="text-xs text-slate-500 mb-4">Manually record a phone call, text, or referral:</p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. John Miller"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Phone</label>
                  <input
                    type="text"
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    placeholder="(512) 000-0000"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Austin ZIP</label>
                  <input
                    type="text"
                    value={newLeadZip}
                    onChange={(e) => setNewLeadZip(e.target.value)}
                    placeholder="78701"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Service</label>
                  <select
                    value={newLeadService}
                    onChange={(e) => setNewLeadService(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  >
                    {services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Est. Quote ($)</label>
                  <input
                    type="text"
                    value={newLeadPrice}
                    onChange={(e) => setNewLeadPrice(e.target.value)}
                    placeholder="$120"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Job Details</label>
                <textarea
                  rows={2}
                  value={newLeadDetails}
                  onChange={(e) => setNewLeadDetails(e.target.value)}
                  placeholder="Details discussed with customer..."
                  className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!newLeadName.trim() || !newLeadPhone.trim()) {
                      alert('Please provide customer name and phone number.');
                      return;
                    }
                    addLead({
                      type: 'residential',
                      name: newLeadName,
                      phone: newLeadPhone,
                      email: 'direct@phone.lead',
                      zipCode: newLeadZip,
                      serviceId: 'manual',
                      serviceName: newLeadService,
                      details: newLeadDetails || 'Inbound phone inquiry',
                      estimatedPrice: newLeadPrice,
                      status: 'New',
                      notes: 'Manual entry from phone/SMS'
                    });
                    setNewLeadName('');
                    setNewLeadPhone('');
                    setNewLeadDetails('');
                    setShowAddLeadModal(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0062ff] text-white text-xs font-bold"
                >
                  Save Lead
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add Job to Gallery */}
      {showAddGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddGalleryModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-1">Add Job to Gallery</h3>
            <p className="text-xs text-slate-500 mb-4">Post a completed Austin project to your public portfolio:</p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Project Title</label>
                <input
                  type="text"
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  placeholder="e.g. 65-inch Frame TV Mount with Concealed One-Connect Box"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
                  <select
                    value={newJobCategory}
                    onChange={(e) => setNewJobCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  >
                    <option value="tv">TV Mounting</option>
                    <option value="furniture">Furniture Assembly</option>
                    <option value="garage">Garage & Overhead</option>
                    <option value="outdoor">Outdoor & Pergola</option>
                    <option value="commercial">Commercial & Gaming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Austin Neighborhood</label>
                  <input
                    type="text"
                    value={newJobNeighborhood}
                    onChange={(e) => setNewJobNeighborhood(e.target.value)}
                    placeholder="e.g. Mueller, Austin"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Image URL / Path</label>
                <input
                  type="text"
                  value={newJobImage}
                  onChange={(e) => setNewJobImage(e.target.value)}
                  placeholder="/images/project_tv_mounting_1790469477728.jpg or web URL"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newJobDescription}
                  onChange={(e) => setNewJobDescription(e.target.value)}
                  placeholder="Description of the work completed..."
                  className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Highlight 1</label>
                  <input
                    type="text"
                    value={newJobFeature1}
                    onChange={(e) => setNewJobFeature1(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Highlight 2</label>
                  <input
                    type="text"
                    value={newJobFeature2}
                    onChange={(e) => setNewJobFeature2(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowAddGalleryModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!newJobTitle.trim()) {
                      alert('Please provide a title for the job.');
                      return;
                    }
                    const newItem: AdminGalleryItem = {
                      id: `job-${Date.now()}`,
                      title: newJobTitle,
                      category: 'bathtub',
                      categoryLabel: 'Bathtubs',
                      location: newJobNeighborhood || 'Austin, TX',
                      beforeImage: newJobImage,
                      afterImage: newJobImage,
                      description: newJobDescription || 'Quality bathroom refinishing job completed in Austin, TX.',
                      transformationHighlights: [newJobFeature1 || 'Quality guaranteed', newJobFeature2 || 'Expert refinishing']
                    };
                    addGalleryItem(newItem);
                    setShowAddGalleryModal(false);
                    setNewJobTitle('');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0062ff] text-white text-xs font-bold"
                >
                  Publish to Gallery
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MODAL: Edit Service Details */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-1">
              Edit Service: {editingService.title}
            </h3>
            <p className="text-xs text-slate-500 mb-4">Update pricing and descriptions for the public website:</p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Service Title</label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Starting Price</label>
                  <input
                    type="text"
                    value={editingService.startingPrice}
                    onChange={(e) => setEditingService({ ...editingService, startingPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-[#0062ff]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Typical Duration</label>
                  <input
                    type="text"
                    value={editingService.typicalTime}
                    onChange={(e) => setEditingService({ ...editingService, typicalTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingService.tagline}
                  onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Short Description (Card)</label>
                <textarea
                  rows={2}
                  value={editingService.shortDesc}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    updateService(editingService.id, editingService);
                    setEditingService(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0062ff] text-white text-xs font-bold shadow-xs"
                >
                  Save Service Changes
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add New Service */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddServiceModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-1">Add New Service</h3>
            <p className="text-xs text-slate-500 mb-4">Introduce a new flat-rate service offering to the website:</p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Service Title</label>
                <input
                  type="text"
                  value={newServiceForm.title}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, title: e.target.value })}
                  placeholder="e.g. Ceiling Fan Installation"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Starting Price</label>
                  <input
                    type="text"
                    value={newServiceForm.startingPrice}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, startingPrice: e.target.value })}
                    placeholder="$85"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-[#0062ff]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Typical Duration</label>
                  <input
                    type="text"
                    value={newServiceForm.typicalTime}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, typicalTime: e.target.value })}
                    placeholder="1 hour"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Tagline</label>
                <input
                  type="text"
                  value={newServiceForm.tagline}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, tagline: e.target.value })}
                  placeholder="e.g. Electrical & Balance Calibration"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={newServiceForm.shortDesc}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, shortDesc: e.target.value })}
                  placeholder="Brief description for customer preview card..."
                  className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!newServiceForm.title?.trim()) {
                      alert('Please provide a title for the service.');
                      return;
                    }
                    const newId = newServiceForm.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
                    const completeService: ServiceItem = {
                      id: newId,
                      title: newServiceForm.title,
                      category: 'bathtub',
                      tagline: newServiceForm.tagline || 'Professional Refinishing',
                      description: newServiceForm.shortDesc || 'Expert bathroom surface refinishing.',
                      shortDesc: newServiceForm.shortDesc || 'Expert bathroom surface refinishing.',
                      fullDesc: newServiceForm.fullDesc || newServiceForm.shortDesc || 'Complete professional refinishing service.',
                      ctaText: 'Get an Estimate',
                      features: newServiceForm.features || ['Thorough surface preparation', 'High-gloss durable finish'],
                      startingPrice: newServiceForm.startingPrice || '$250',
                      typicalTime: newServiceForm.typicalTime || '3–4 hours',
                      image: '/images/hero_refinished_bathtub_1792552968180.jpg',
                      fallbackImage: '/images/hero_refinished_bathtub_1792552968180.jpg',
                      iconName: 'Sparkles'
                    };
                    addService(completeService);
                    setShowAddServiceModal(false);
                    setNewServiceForm({
                      title: '',
                      tagline: '',
                      shortDesc: '',
                      fullDesc: '',
                      startingPrice: '$85',
                      typicalTime: '1 hour',
                      features: ['Professional tools & hardware', 'Precision laser leveling', 'Guaranteed workmanship']
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0062ff] text-white text-xs font-bold shadow-xs"
                >
                  Add Service
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
