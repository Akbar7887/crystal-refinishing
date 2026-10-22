import React, { useState } from 'react';
import { Building2, CheckCircle2, Phone, Mail, Send, AlertCircle, Clock, ShieldCheck, Calendar, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { useAdmin } from '../context/AdminContext';

export const PropertyManagementSection: React.FC = () => {
  const { addLead } = useAdmin();

  // Form State
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [serviceType, setServiceType] = useState('Bathtub Refinishing');
  const [numberOfUnits, setNumberOfUnits] = useState('1–3 Units');
  const [preferredDate, setPreferredDate] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, '');
    let formatted = digits;
    if (digits.length > 3 && digits.length <= 6) {
      formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else if (digits.length > 6) {
      formatted = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
    setPhone(formatted);
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Contact name is required';
    if (!companyName.trim()) errs.companyName = 'Company / Property name is required';
    const cleanDigits = phone.replace(/\D/g, '');
    if (!phone.trim() || cleanDigits.length < 10) {
      errs.phone = 'Valid 10-digit phone number is required';
    }
    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Valid email address is required';
    }
    if (!propertyAddress.trim()) {
      errs.propertyAddress = 'Property or apartment complex address is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    addLead({
      type: 'property-management',
      name,
      companyName,
      phone,
      email,
      propertyAddress,
      serviceId: serviceType.toLowerCase().replace(/\s+/g, '-'),
      serviceName: serviceType,
      numberOfUnits,
      preferredDate: preferredDate || 'Flexible',
      details: additionalDetails || `Property inquiry for ${numberOfUnits} of ${serviceType} at ${propertyAddress}.`,
      status: 'New',
      notes: `Company: ${companyName}. Preferred Date: ${preferredDate || 'N/A'}. Units: ${numberOfUnits}.`
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setCompanyName('');
    setPhone('');
    setEmail('');
    setPropertyAddress('');
    setPreferredDate('');
    setAdditionalDetails('');
  };

  return (
    <section id="property-management" className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200 relative overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/70 border border-sky-200 text-[#0284c7] text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Commercial & Multi-Family Solutions</span>
          </div>

          {/* Exact Required Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0c2340] tracking-tight">
            Bathroom Refinishing for Property Managers & Rental Properties
          </h2>

          {/* Exact Required Description */}
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Keep your rental properties looking clean and attractive while exploring a cost-effective alternative to replacing worn bathtubs, shower bases, and sinks.
          </p>
        </div>

        {/* 2-Column Split: Benefits on Left, Dedicated Inquiry Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Property Management Benefits & Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <h3 className="text-xl font-bold text-[#0c2340] flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#0284c7]" />
                <span>Tailored for Austin Property Teams</span>
              </h3>

              {/* Exact Highlighted Benefits */}
              <div className="space-y-4 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0c2340]">Cost-conscious maintenance solutions</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Stretch maintenance and capital improvement budgets with competitive volume rates.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0c2340]">Convenient scheduling</h4>
                    <p className="text-xs text-slate-600 mt-0.5">We work with your leasing windows and maintenance staff to minimize vacancy downtime.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0c2340]">Services for rental properties & apartments</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Bathtubs, shower pans, bathroom sinks, and vanity countertops refreshed efficiently.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0c2340]">Support for property turnover & maintenance projects</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Prepare units for upcoming move-ins without weeks of loud demolition or dust.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0c2340]">Direct communication</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Speak directly with Akbar and Alex for bids, timelines, and job scheduling.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0c2340]">Free estimates</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Send a unit list, photos, or schedule an on-site property walkthrough in Austin.</p>
                  </div>
                </div>
              </div>

              {/* Direct PM Hotline */}
              <div className="pt-4 border-t border-slate-200 flex flex-col gap-2 text-xs">
                <span className="text-slate-500 font-medium">Direct Property Management Line:</span>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`tel:${BUSINESS_INFO.primaryContact.phoneRaw}`}
                    className="text-[#0284c7] font-bold hover:underline flex items-center gap-1 font-mono"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Akbar: {BUSINESS_INFO.primaryContact.phone}</span>
                  </a>
                  <a
                    href={`tel:${BUSINESS_INFO.secondaryContact.phoneRaw}`}
                    className="text-[#0284c7] font-bold hover:underline flex items-center gap-1 font-mono"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Alex: {BUSINESS_INFO.secondaryContact.phone}</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Required Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-9 text-slate-900 shadow-2xl border border-slate-200">
              
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-[#0c2340]">
                  Property Management Estimate Request
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Submit your property information below. Akbar or Alex will get back to you promptly with pricing and scheduling options.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#0c2340]">
                    Estimate Request Submitted!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong className="text-slate-900">{name}</strong> at <strong className="text-slate-900">{companyName}</strong>. Akbar and Alex have received your property management request for <span className="font-semibold text-[#0284c7]">{propertyAddress}</span> and will review the details right away.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs font-bold text-[#0284c7] hover:underline"
                    >
                      ← Submit another property estimate
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Row 1: Name & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Contact Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                        }}
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7] ${
                          errors.name ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Company Name / Property <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => {
                          setCompanyName(e.target.value);
                          if (errors.companyName) setErrors(prev => ({ ...prev, companyName: '' }));
                        }}
                        placeholder="e.g. Oak Creek Apartments LLC"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7] ${
                          errors.companyName ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.companyName && <p className="text-[11px] text-red-500 mt-1">{errors.companyName}</p>}
                    </div>
                  </div>

                  {/* Row 2: Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="512-000-0000"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7] ${
                          errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        placeholder="pm@yourcompany.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7] ${
                          errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Row 3: Property Address */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Property Address in Austin Area <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={propertyAddress}
                      onChange={(e) => {
                        setPropertyAddress(e.target.value);
                        if (errors.propertyAddress) setErrors(prev => ({ ...prev, propertyAddress: '' }));
                      }}
                      placeholder="e.g. 1400 S Lamar Blvd, Austin, TX 78704"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7] ${
                        errors.propertyAddress ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.propertyAddress && <p className="text-[11px] text-red-500 mt-1">{errors.propertyAddress}</p>}
                  </div>

                  {/* Row 4: Service Type & Number of Units */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Type of Service
                      </label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                      >
                        <option value="Bathtub Refinishing">Bathtub Refinishing</option>
                        <option value="Shower Base Refinishing">Shower Base Refinishing</option>
                        <option value="Sink Refinishing">Sink Refinishing</option>
                        <option value="Countertop Refinishing">Countertop Refinishing</option>
                        <option value="Multi-Surface Full Bathroom Turn">Multi-Surface (Tub + Counter + Sink)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Number of Units or Surfaces
                      </label>
                      <select
                        value={numberOfUnits}
                        onChange={(e) => setNumberOfUnits(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                      >
                        <option value="1 Unit (Single Turn)">1 Unit (Single Turn)</option>
                        <option value="2–5 Units">2–5 Units</option>
                        <option value="6–10 Units">6–10 Units</option>
                        <option value="11+ Units (Ongoing Portfolio)">11+ Units (Ongoing Portfolio)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Preferred Service Date */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Preferred Service Date / Turn Window
                    </label>
                    <input
                      type="text"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      placeholder="e.g. Within next 7 days / Oct 25–28 turnover window"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                    />
                  </div>

                  {/* Row 6: Additional Details */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Additional Details
                    </label>
                    <textarea
                      rows={2}
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      placeholder="Mention access codes, surface conditions (e.g., chips, heavy discoloration), or questions..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7] resize-none"
                    />
                  </div>

                  {/* Prominent Required CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#0284c7] to-[#0077e6] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-black text-sm tracking-wide uppercase shadow-lg shadow-sky-500/20 hover:shadow-xl transition-all active:scale-98 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Submitting Request...' : 'REQUEST A PROPERTY MANAGEMENT ESTIMATE'}</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
