import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  UploadCloud, 
  X, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Droplets,
  User,
  Wrench,
  ChevronDown
} from 'lucide-react';
import { BUSINESS_INFO, REFINISHING_SERVICES, BRAND_ASSETS } from '../data/content';
import { useAdmin } from '../context/AdminContext';
import { trackGoogleAdsConversion } from '../utils/analytics';

interface LeadCaptureFormProps {
  initialServiceId?: string;
  initialDetails?: string;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  initialServiceId,
  initialDetails
}) => {
  const { addLead, businessSettings } = useAdmin();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const primaryPhone = businessSettings.primaryPhone || BUSINESS_INFO.primaryContact.phone;
  const primaryPhoneRaw = primaryPhone.replace(/\D/g, '');
  const secondaryPhone = businessSettings.secondaryPhone || BUSINESS_INFO.secondaryContact.phone;
  const secondaryPhoneRaw = secondaryPhone.replace(/\D/g, '');
  const hasPrimary = businessSettings.primaryPhoneEnabled !== false && primaryPhone.trim().length > 0;
  const hasSecondary = businessSettings.secondaryPhoneEnabled !== false && secondaryPhone.trim().length > 0;

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState('Bathtub Refinishing');
  const [message, setMessage] = useState('');
  
  // Optional Photo Upload
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const isSubmittingRef = useRef(false);
  const hasTrackedSubmissionRef = useRef(false);
  const submitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current !== null) {
        window.clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  // Sync external pre-fills (from Services or Before/After CTA)
  useEffect(() => {
    if (initialServiceId) {
      const match = REFINISHING_SERVICES.find(s => s.id === initialServiceId);
      if (match) setServiceNeeded(match.title);
    }
    if (initialDetails) {
      setMessage(initialDetails);
    }
  }, [initialServiceId, initialDetails]);

  // Phone auto-formatter (512-xxx-xxxx)
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

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, photo: 'Photo size should be under 10MB' }));
        return;
      }
      setSelectedPhoto(file);
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      setErrors(prev => {
        const copy = { ...prev };
        delete copy.photo;
        return copy;
      });
    }
  };

  const removePhoto = () => {
    setSelectedPhoto(null);
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required';
    const cleanDigits = phone.replace(/\D/g, '');
    if (!phone.trim() || cleanDigits.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Please enter a valid email address';
    }
    if (!message.trim()) {
      errs.message = 'Please provide brief details about your surface';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current || hasTrackedSubmissionRef.current || isSubmitting || submitted) {
      return;
    }
    if (!validate()) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    submitTimerRef.current = window.setTimeout(() => {
      try {
        // Save lead into Admin storage
        addLead({
          type: 'residential',
          name: fullName,
          phone,
          email,
          serviceId: serviceNeeded.toLowerCase().replace(/\s+/g, '-'),
          serviceName: serviceNeeded,
          details: message + (selectedPhoto ? ` [Attached photo: ${selectedPhoto.name}]` : ''),
          status: 'New',
          notes: `Submitted via Contact / Free Estimate form. Phone: ${phone}. Email: ${email}.`
        });

        setIsSubmitting(false);
        setSubmitted(true);
        isSubmittingRef.current = false;

        // Fire conversion ONLY once after submission succeeds
        if (!hasTrackedSubmissionRef.current) {
          hasTrackedSubmissionRef.current = true;
          trackGoogleAdsConversion();
        }
      } catch {
        isSubmittingRef.current = false;
        setIsSubmitting(false);
      }
    }, 450);
  };

  const handleReset = () => {
    if (submitTimerRef.current !== null) {
      window.clearTimeout(submitTimerRef.current);
      submitTimerRef.current = null;
    }
    isSubmittingRef.current = false;
    hasTrackedSubmissionRef.current = false;
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    removePhoto();
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-[#0284c7] text-xs font-bold uppercase tracking-wider mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Fast, Free &amp; Transparent Estimates</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0c2340] tracking-tight leading-tight">
            Contact Us &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#0077e6]">
              Get Your Free Estimate
            </span>
          </h2>

          <p className="mt-3.5 text-slate-600 text-base sm:text-lg leading-relaxed">
            Have questions or ready to renew your bathroom surfaces? Reach out directly or send us photos below for a fast, no-obligation quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Direct Business Information & Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-sm border border-slate-200/90 space-y-6 flex-1">
              
              <div>
                <div className="p-3 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-200/80 shadow-2xs mb-5 max-w-[200px]">
                  <img
                    src={BRAND_ASSETS.logo}
                    alt="Crystal Refinishing Logo"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="inline-flex items-center gap-1.5 text-[#0284c7] text-xs font-extrabold uppercase tracking-wider mb-1">
                  <Droplets className="w-4 h-4" />
                  <span>Crystal Refinishing</span>
                </div>
                <h3 className="text-2xl sm:text-[26px] font-extrabold text-[#0c2340] tracking-tight">
                  Austin, Texas
                </h3>
                <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                  Serving Austin, Round Rock, Cedar Park, Pflugerville, and nearby Central Texas communities.
                </p>
              </div>

              {/* Direct Contacts */}
              <div className="space-y-3 pt-1">
                <span className="text-xs font-extrabold text-[#0c2340] uppercase tracking-wider block">
                  Direct Contacts
                </span>

                {/* Primary Contact */}
                {hasPrimary && (
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-sky-300 transition-colors flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-slate-500 block font-medium">Primary Contact</span>
                      <strong className="text-base font-bold text-[#0c2340]">{businessSettings.primaryContactName || 'Akbar'}</strong>
                    </div>
                    <a
                      href={`tel:${primaryPhoneRaw}`}
                      className="px-4 py-2.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-sm font-bold flex items-center gap-2 transition-colors shadow-xs shrink-0"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{primaryPhone}</span>
                    </a>
                  </div>
                )}

                {/* Secondary Contact */}
                {hasSecondary && (
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-sky-300 transition-colors flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-slate-500 block font-medium">Secondary Contact</span>
                      <strong className="text-base font-bold text-[#0c2340]">{businessSettings.secondaryContactName || 'Alex'}</strong>
                    </div>
                    <a
                      href={`tel:${secondaryPhoneRaw}`}
                      className="px-4 py-2.5 rounded-full bg-white hover:bg-sky-50 text-[#0284c7] border border-sky-200 text-sm font-bold flex items-center gap-2 transition-colors shadow-2xs shrink-0"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{secondaryPhone}</span>
                    </a>
                  </div>
                )}

                {/* Email */}
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-sky-300 transition-colors flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-xs text-slate-500 block font-medium">Official Inquiries</span>
                    <strong className="text-sm sm:text-[15px] font-bold text-[#0c2340] truncate block">
                      {businessSettings.email || BUSINESS_INFO.email}
                    </strong>
                  </div>
                  <a
                    href={`mailto:${businessSettings.email || BUSINESS_INFO.email}`}
                    className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-[#0284c7] border border-slate-200 text-sm font-bold flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Operating hours & dispatch */}
              <div className="pt-4 border-t border-slate-200/80 text-sm text-slate-700 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>{businessSettings.hours || 'Mon – Sat: 8:00 AM – 6:00 PM'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>Austin Metro &amp; Surrounding Counties</span>
                </div>
                <div className="flex items-center gap-2.5 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free, zero-pressure estimates</span>
                </div>
              </div>

            </div>

            {/* Why Send Photos Card */}
            <div className="bg-gradient-to-br from-sky-50 to-cyan-50/70 rounded-2xl p-5 sm:p-6 border border-sky-200/80 flex items-start gap-3.5 text-sm text-slate-700 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-white border border-sky-200 flex items-center justify-center shrink-0 text-[#0284c7] shadow-2xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-[#0c2340] font-extrabold text-sm sm:text-[15px] block mb-1">
                  Tip for Fastest Estimates
                </strong>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Attach a clear photo of your bathtub or bathroom surface condition. Our team will review it and send you an exact price range quickly.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Elevated Free Estimate Request Form */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 overflow-hidden flex-1 flex flex-col">
              {/* Top Accent Bar */}
              <div className="h-1.5 bg-gradient-to-r from-[#0c2340] via-[#0284c7] to-cyan-400" />

              <div className="p-6 sm:p-10 flex-1 flex flex-col justify-center">
                {submitted ? (
                  /* Confirmation State */
                  <div className="py-10 text-center space-y-6">
                    <div className="w-18 h-18 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0c2340] tracking-tight">
                        Estimate Request Received!
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-lg mx-auto leading-relaxed">
                        Thank you, <strong className="text-slate-900">{fullName}</strong>. We have received your request for <span className="text-[#0284c7] font-bold">{serviceNeeded}</span> and will reach out shortly at <span className="font-mono font-bold text-slate-900">{phone}</span> or <span className="font-semibold text-slate-900">{email}</span>.
                      </p>
                    </div>

                    {/* Immediate Action Buttons */}
                    {(hasPrimary || hasSecondary) && (
                      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 max-w-md mx-auto space-y-3">
                        <p className="text-sm text-slate-600 font-medium">
                          Need immediate assistance? Call or text us directly:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          {hasPrimary && (
                            <a
                              href={`tel:${primaryPhoneRaw}`}
                              className="flex-1 py-3 px-4 bg-[#0c2340] hover:bg-[#0284c7] text-white font-bold text-sm rounded-xl text-center shadow-xs transition-colors flex items-center justify-center gap-2"
                            >
                              <Phone className="w-4 h-4" />
                              <span>{businessSettings.primaryContactName || 'Akbar'}: {primaryPhone}</span>
                            </a>
                          )}
                          {hasSecondary && (
                            <a
                              href={`tel:${secondaryPhoneRaw}`}
                              className="flex-1 py-3 px-4 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-sm rounded-xl text-center transition-colors flex items-center justify-center gap-2"
                            >
                              <Phone className="w-4 h-4 text-[#0284c7]" />
                              <span>{businessSettings.secondaryContactName || 'Alex'}: {secondaryPhone}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    <div>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="text-sm font-bold text-[#0284c7] hover:underline cursor-pointer"
                      >
                        ← Submit another inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Main Estimate Form */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="border-b border-slate-100 pb-5">
                      <h3 className="text-2xl sm:text-[28px] font-extrabold text-[#0c2340] tracking-tight leading-snug">
                        Request Your Free Refinishing Estimate
                      </h3>
                      <p className="text-sm sm:text-[15px] text-slate-500 mt-1.5 leading-relaxed">
                        No obligation, transparent upfront pricing, and a fast response from our Austin team.
                      </p>
                    </div>

                    {/* Row 1: Full Name & Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                              if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                            }}
                            placeholder="John Smith"
                            className={`w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl bg-slate-50/70 focus:bg-white border ${
                              errors.fullName
                                ? 'border-rose-500 ring-2 ring-rose-500/20'
                                : 'border-slate-200 hover:border-slate-300 focus:border-[#0284c7] focus:ring-4 focus:ring-sky-500/10'
                            } text-[15px] sm:text-base text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none`}
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-xs font-medium text-rose-600 mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            placeholder="512-905-5823"
                            className={`w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl bg-slate-50/70 focus:bg-white border ${
                              errors.phone
                                ? 'border-rose-500 ring-2 ring-rose-500/20'
                                : 'border-slate-200 hover:border-slate-300 focus:border-[#0284c7] focus:ring-4 focus:ring-sky-500/10'
                            } text-[15px] sm:text-base text-slate-900 placeholder:text-slate-400 font-mono transition-all focus:outline-none`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs font-medium text-rose-600 mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Email Address & Service Needed */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                            }}
                            placeholder="john@example.com"
                            className={`w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl bg-slate-50/70 focus:bg-white border ${
                              errors.email
                                ? 'border-rose-500 ring-2 ring-rose-500/20'
                                : 'border-slate-200 hover:border-slate-300 focus:border-[#0284c7] focus:ring-4 focus:ring-sky-500/10'
                            } text-[15px] sm:text-base text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-xs font-medium text-rose-600 mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                          Service Needed <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Wrench className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            value={serviceNeeded}
                            onChange={(e) => setServiceNeeded(e.target.value)}
                            className="w-full appearance-none pl-10 pr-10 py-3 sm:py-3.5 rounded-xl bg-slate-50/70 focus:bg-white border border-slate-200 hover:border-slate-300 focus:border-[#0284c7] focus:ring-4 focus:ring-sky-500/10 text-[15px] sm:text-base font-semibold text-slate-900 transition-all focus:outline-none cursor-pointer"
                          >
                            <option value="Bathtub Refinishing">Bathtub Refinishing</option>
                            <option value="Shower Base Refinishing">Shower Base Refinishing</option>
                            <option value="Sink Refinishing">Sink Refinishing</option>
                            <option value="Countertop Refinishing">Countertop Refinishing</option>
                            <option value="Tile Refinishing">Tile Refinishing</option>
                            <option value="Chip Repair Service">Chip Repair Service</option>
                            <option value="Multiple Surfaces / Whole Bathroom">Multiple Surfaces / Whole Bathroom</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Message / Surface Details <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                        }}
                        placeholder="Describe your surface (e.g. porcelain tub with chips near drain, yellowed shower base, sink, or tile surround)"
                        className={`w-full px-4 py-3 sm:py-3.5 rounded-xl bg-slate-50/70 focus:bg-white border ${
                          errors.message
                            ? 'border-rose-500 ring-2 ring-rose-500/20'
                            : 'border-slate-200 hover:border-slate-300 focus:border-[#0284c7] focus:ring-4 focus:ring-sky-500/10'
                        } text-[15px] sm:text-base text-slate-900 placeholder:text-slate-400 leading-relaxed transition-all focus:outline-none resize-y`}
                      />
                      {errors.message && (
                        <p className="text-xs font-medium text-rose-600 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Optional Photo Upload */}
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Optional Photo Upload
                        <span className="text-slate-500 font-normal ml-1.5 text-xs sm:text-sm">(helps us provide an exact quote)</span>
                      </label>

                      {photoPreview ? (
                        <div className="relative inline-flex items-center gap-3.5 p-3.5 bg-sky-50/50 rounded-2xl border border-sky-200 shadow-2xs">
                          <img
                            src={photoPreview}
                            alt="Surface Preview"
                            className="w-16 h-16 object-cover rounded-xl border border-slate-200"
                          />
                          <div className="text-left pr-4">
                            <span className="text-sm font-bold text-slate-900 block truncate max-w-[220px]">
                              {selectedPhoto?.name}
                            </span>
                            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Ready for assessment
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={removePhoto}
                            className="p-1.5 rounded-full bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 transition-colors cursor-pointer"
                            title="Remove photo"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-slate-300 hover:border-[#0284c7] rounded-2xl p-5 sm:p-6 text-center cursor-pointer bg-slate-50/60 hover:bg-sky-50/40 transition-all group"
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoSelect}
                            className="hidden"
                          />
                          <div className="flex flex-col items-center gap-1.5 text-slate-600 group-hover:text-[#0284c7]">
                            <div className="w-11 h-11 rounded-full bg-white border border-slate-200 group-hover:border-sky-200 flex items-center justify-center shadow-2xs mb-1 transition-colors">
                              <UploadCloud className="w-5 h-5 text-slate-400 group-hover:text-[#0284c7] transition-colors" />
                            </div>
                            <span className="text-sm font-semibold">Click to upload photo of your tub, shower, or sink</span>
                            <span className="text-xs text-slate-500">JPG, PNG, WebP up to 10MB</span>
                          </div>
                        </div>
                      )}
                      {errors.photo && (
                        <p className="text-xs font-medium text-rose-600 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.photo}
                        </p>
                      )}
                    </div>

                    {/* Prominent CTA Button */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#0077e6] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-extrabold text-base sm:text-[17px] tracking-wide shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Submitting Free Estimate Request...</span>
                          </>
                        ) : (
                          <>
                            <span>GET YOUR FREE ESTIMATE</span>
                            <Send className="w-4 h-4 text-cyan-200" />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs sm:text-[13px] text-center text-slate-500">
                      🔒 Your information is kept strictly private. No spam, ever.
                    </p>

                  </form>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
