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
  MessageSquare,
  Droplets
} from 'lucide-react';
import { BUSINESS_INFO, REFINISHING_SERVICES, BRAND_ASSETS } from '../data/content';
import { useAdmin } from '../context/AdminContext';

interface LeadCaptureFormProps {
  initialServiceId?: string;
  initialDetails?: string;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  initialServiceId,
  initialDetails
}) => {
  const { addLead } = useAdmin();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Fields as explicitly requested in Section 8
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
      errs.message = 'Please provide brief details about your bathtub, shower, sink, or countertop';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

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

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    removePhoto();
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-300 text-[#0284c7] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Fast, Free & Transparent Estimates</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0c2340] tracking-tight">
            Contact Us &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#0077e6]">
              Get Your Free Estimate
            </span>
          </h2>

          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Have questions or ready to renew your bathroom surfaces? Reach out by phone, email, or send us photos through the form below for a swift, no-obligation estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Business Information & Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 text-slate-900 shadow-sm border border-slate-200 space-y-6">
              
              <div>
                <div className="p-3 rounded-2xl bg-white flex items-center justify-center border border-slate-200 shadow-xs mb-4 max-w-[210px]">
                  <img
                    src={BRAND_ASSETS.logo}
                    alt="Crystal Refinishing Logo"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="inline-flex items-center gap-2 text-[#0284c7] text-xs font-bold uppercase tracking-wider mb-1">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Crystal Refinishing</span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#0c2340] tracking-tight">
                  Austin, Texas
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Serving Austin, Round Rock, Cedar Park, Pflugerville, and nearby Central Texas communities.
                </p>
              </div>

              {/* Direct Contacts: Akbar & Alex */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-[#0c2340] uppercase tracking-wider block">
                  Direct Phone Contacts
                </span>

                {/* Akbar */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Primary Contact</span>
                    <strong className="text-sm font-bold text-[#0c2340]">Akbar</strong>
                  </div>
                  <a
                    href="tel:5129055823"
                    className="px-3.5 py-2 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>512-905-5823</span>
                  </a>
                </div>

                {/* Alex */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Secondary Contact</span>
                    <strong className="text-sm font-bold text-[#0c2340]">Alex</strong>
                  </div>
                  <a
                    href="tel:7372071024"
                    className="px-3.5 py-2 rounded-full bg-sky-50 hover:bg-sky-100 text-[#0284c7] border border-sky-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>737-207-1024</span>
                  </a>
                </div>

                {/* Email */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Official Inquiries</span>
                    <strong className="text-xs sm:text-sm font-bold text-[#0c2340] truncate max-w-[170px] sm:max-w-none block">
                      888starsllc@gmail.com
                    </strong>
                  </div>
                  <a
                    href="mailto:888starsllc@gmail.com"
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0284c7] text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Operating hours & dispatch */}
              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0284c7] shrink-0" />
                  <span>Austin Metro & Surrounding Counties</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free, zero-pressure estimates</span>
                </div>
              </div>

            </div>

            {/* Why Send Photos Card */}
            <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100 flex items-start gap-3.5 text-xs text-slate-700">
              <Sparkles className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0c2340] font-bold block mb-0.5">Tip for Fastest Estimates:</strong>
                Attach a clear photo or two showing your bathtub or bathroom surface condition. Akbar or Alex can often provide an accurate price range within hours!
              </div>
            </div>

          </div>

          {/* Right Column: Free Estimate Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative">
              
              {submitted ? (
                /* Confirmation State */
                <div className="py-10 text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-[#0c2340]">
                      Estimate Request Received!
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto">
                      Thank you, <strong className="text-slate-900">{fullName}</strong>. Akbar and Alex have received your request for <span className="text-[#0284c7] font-bold">{serviceNeeded}</span> and will review your project details and get back to you shortly at <span className="font-mono font-bold text-slate-900">{phone}</span> or <span className="font-semibold text-slate-900">{email}</span>.
                    </p>
                  </div>

                  {/* Immediate Action Buttons */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 max-w-md mx-auto space-y-3">
                    <p className="text-xs text-slate-600">
                      Need immediate assistance or scheduling? Call or text us directly:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <a
                        href="tel:5129055823"
                        className="flex-1 py-2.5 px-4 bg-[#0c2340] hover:bg-[#0284c7] text-white font-bold text-xs rounded-xl text-center shadow-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Akbar: 512-905-5823</span>
                      </a>
                      <a
                        href="tel:7372071024"
                        className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Alex: 737-207-1024</span>
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs font-bold text-[#0284c7] hover:underline"
                    >
                      ← Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Main Estimate Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <div className="border-b border-slate-200 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-[#0c2340]">
                      Request Your Free Refinishing Estimate
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      No obligation, upfront pricing, and fast response from our Austin team.
                    </p>
                  </div>

                  {/* Row 1: Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                        }}
                        placeholder="John Smith"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                          errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                        } text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="512-905-5823"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                          errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                        } text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#0284c7]`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email Address & Service Needed */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                          errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                        } text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Service Needed <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={serviceNeeded}
                        onChange={(e) => setServiceNeeded(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                      >
                        <option value="Bathtub Refinishing">Bathtub Refinishing</option>
                        <option value="Shower Base Refinishing">Shower Base Refinishing</option>
                        <option value="Sink Refinishing">Sink Refinishing</option>
                        <option value="Countertop Refinishing">Countertop Refinishing</option>
                        <option value="Multiple Surfaces / Whole Bathroom">Multiple Surfaces / Whole Bathroom</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Message / Surface Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                      }}
                      placeholder="Please describe your surface (e.g. porcelain tub with chips near drain, yellowed fiberglass shower pan, chipped sink, laminate vanity countertop, etc.)"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                        errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                      } text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Optional Photo Upload */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Optional Photo Upload
                      <span className="text-slate-400 font-normal lowercase ml-1.5">(helps us give an exact quote)</span>
                    </label>

                    {photoPreview ? (
                      <div className="relative inline-flex items-center gap-3 p-3 bg-white rounded-2xl border border-sky-300 shadow-xs">
                        <img
                          src={photoPreview}
                          alt="Surface Preview"
                          className="w-14 h-14 object-cover rounded-xl border border-slate-200"
                        />
                        <div className="text-left pr-4">
                          <span className="text-xs font-bold text-slate-900 block truncate max-w-[200px]">
                            {selectedPhoto?.name}
                          </span>
                          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Ready for assessment
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="p-1 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                          title="Remove photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-300 hover:border-sky-400 rounded-2xl p-4 text-center cursor-pointer bg-white transition-colors group"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoSelect}
                          className="hidden"
                        />
                        <div className="flex flex-col items-center gap-1 text-slate-500 group-hover:text-[#0284c7]">
                          <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-[#0284c7] transition-colors" />
                          <span className="text-xs font-semibold">Click to upload photo of your tub, shower, or sink</span>
                          <span className="text-[10px] text-slate-400">JPG, PNG, WebP up to 10MB</span>
                        </div>
                      </div>
                    )}
                    {errors.photo && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.photo}
                      </p>
                    )}
                  </div>

                  {/* Prominent CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#0077e6] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-sky-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
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

                  <p className="text-[11px] text-center text-slate-500">
                    🔒 Your information is private. We never sell your data or spam.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
