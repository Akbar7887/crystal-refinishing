import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  Upload,
  Image as ImageIcon,
  X,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Search,
  Link2,
  ArrowLeftRight,
  Camera
} from 'lucide-react';
import { useAdmin, AdminGalleryItem } from '../../context/AdminContext';

const GALLERY_CATEGORIES: {
  id: AdminGalleryItem['category'];
  label: string;
}[] = [
  { id: 'bathtub', label: 'Bathtubs' },
  { id: 'color-change', label: 'Color Modernization' },
  { id: 'shower', label: 'Shower Bases' },
  { id: 'sink', label: 'Sinks' },
  { id: 'countertop', label: 'Countertops' },
  { id: 'jacuzzi', label: 'Jacuzzi / Whirlpool' },
];

const DEFAULT_HIGHLIGHTS = [
  'Deep cleaning, etching, and surface repair',
  'Smooth, high-gloss brilliant white finish',
  'Backed by our 5-year adhesion warranty',
];

function compressImageFile(file: File, maxDimension = 1400, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file (JPG, PNG, or WEBP).'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the selected image file.'));
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        reject(new Error('Unexpected image read result.'));
        return;
      }

      const img = new window.Image();
      img.onerror = () => reject(new Error('Unable to decode this image format in your browser.'));
      img.onload = () => {
        const { width, height } = img;
        let targetWidth = width;
        let targetHeight = height;

        if (width > maxDimension || height > maxDimension) {
          if (width >= height) {
            targetWidth = maxDimension;
            targetHeight = Math.round((height / width) * maxDimension);
          } else {
            targetHeight = maxDimension;
            targetWidth = Math.round((width / height) * maxDimension);
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(result);
          return;
        }

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  });
}

interface PhotoUploadSlotProps {
  label: string;
  hint: string;
  value: string;
  onChange: (val: string) => void;
  onError: (msg: string) => void;
}

const PhotoUploadSlot: React.FC<PhotoUploadSlotProps> = ({
  label,
  hint,
  value,
  onChange,
  onError,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imgBroken, setImgBroken] = useState(false);

  useEffect(() => {
    setImgBroken(false);
  }, [value]);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setIsProcessing(true);
    onError('');
    try {
      const dataUrl = await compressImageFile(file);
      onChange(dataUrl);
      setShowUrlInput(false);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to process image.');
    } finally {
      setIsProcessing(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700">{label}</label>
        <button
          type="button"
          onClick={() => setShowUrlInput((prev) => !prev)}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0062ff] hover:text-[#0052cc] cursor-pointer"
        >
          <Link2 className="w-3 h-3" />
          <span>{showUrlInput ? 'Hide URL input' : 'Or paste image URL'}</span>
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {value ? (
        <div className="relative rounded-xl border border-slate-200 bg-slate-100 overflow-hidden aspect-[4/3] group">
          {!imgBroken ? (
            <img
              src={value}
              alt={label}
              referrerPolicy="no-referrer"
              onError={() => setImgBroken(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-100 text-slate-500">
              <ImageIcon className="w-7 h-7 mb-1.5 text-slate-400" />
              <span className="text-xs font-medium">Preview unavailable for this URL</span>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-900 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Replace Photo
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !isProcessing && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`rounded-xl border-2 border-dashed p-5 text-center transition-colors cursor-pointer ${
            isDragging
              ? 'border-[#0062ff] bg-blue-50/70'
              : 'border-slate-300 bg-slate-50 hover:border-[#0062ff]/60 hover:bg-slate-100/70'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0062ff] flex items-center justify-center mx-auto mb-2.5">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-800">
            {isProcessing ? 'Optimizing image...' : 'Click to upload photo or drag & drop'}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">{hint}</p>
        </div>
      )}

      {showUrlInput && (
        <input
          type="text"
          value={value.startsWith('data:') ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or /assets/..."
          className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
        />
      )}
    </div>
  );
};

interface GalleryManagerProps {
  openAddTrigger?: number;
}

interface GalleryFormState {
  title: string;
  category: AdminGalleryItem['category'];
  location: string;
  tag: string;
  description: string;
  photoMode: 'single' | 'slider';
  compositeImage: string;
  beforeImage: string;
  afterImage: string;
  highlight1: string;
  highlight2: string;
  highlight3: string;
}

const createEmptyForm = (): GalleryFormState => ({
  title: '',
  category: 'bathtub',
  location: 'Austin, TX',
  tag: 'Before & After',
  description: '',
  photoMode: 'single',
  compositeImage: '',
  beforeImage: '',
  afterImage: '',
  highlight1: DEFAULT_HIGHLIGHTS[0],
  highlight2: DEFAULT_HIGHLIGHTS[1],
  highlight3: DEFAULT_HIGHLIGHTS[2],
});

export const GalleryManager: React.FC<GalleryManagerProps> = ({ openAddTrigger = 0 }) => {
  const { galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useAdmin();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [brokenCardIds, setBrokenCardIds] = useState<Record<string, boolean>>({});

  // Modal state (Add or Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [form, setForm] = useState<GalleryFormState>(createEmptyForm);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (openAddTrigger > 0) {
      openAddModal();
    }
  }, [openAddTrigger]);

  const openAddModal = () => {
    setEditingItemId(null);
    setForm(createEmptyForm());
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: AdminGalleryItem) => {
    const isComposite = Boolean(item.compositeImage);
    setEditingItemId(item.id);
    setForm({
      title: item.title || '',
      category: item.category || 'bathtub',
      location: item.location || 'Austin, TX',
      tag: item.tag || 'Before & After',
      description: item.description || '',
      photoMode: isComposite ? 'single' : 'slider',
      compositeImage: item.compositeImage || item.afterImage || '',
      beforeImage: item.beforeImage || '',
      afterImage: item.afterImage || '',
      highlight1: item.transformationHighlights?.[0] || DEFAULT_HIGHLIGHTS[0],
      highlight2: item.transformationHighlights?.[1] || DEFAULT_HIGHLIGHTS[1],
      highlight3: item.transformationHighlights?.[2] || '',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!form.title.trim()) {
      setFormError('Please enter a project title.');
      return;
    }

    if (form.photoMode === 'single') {
      if (!form.compositeImage.trim()) {
        setFormError('Please upload a project photo or paste an image URL.');
        return;
      }
    } else {
      if (!form.beforeImage.trim() || !form.afterImage.trim()) {
        setFormError('Please upload both a Before photo and an After photo for the comparison slider.');
        return;
      }
    }

    const selectedCategory = GALLERY_CATEGORIES.find((c) => c.id === form.category);
    const highlights = [form.highlight1, form.highlight2, form.highlight3]
      .map((h) => h.trim())
      .filter(Boolean);

    const payload: Omit<AdminGalleryItem, 'id'> = {
      title: form.title.trim(),
      category: form.category,
      categoryLabel: selectedCategory?.label || 'Bathtubs',
      location: form.location.trim() || 'Austin, TX',
      tag: form.tag.trim() || (form.photoMode === 'slider' ? 'Interactive Slider' : 'Before & After'),
      description:
        form.description.trim() ||
        'Complete surface preparation, repair, and high-gloss refinishing completed in Austin, TX.',
      beforeImage: form.photoMode === 'single' ? form.compositeImage.trim() : form.beforeImage.trim(),
      afterImage: form.photoMode === 'single' ? form.compositeImage.trim() : form.afterImage.trim(),
      compositeImage: form.photoMode === 'single' ? form.compositeImage.trim() : undefined,
      transformationHighlights: highlights.length > 0 ? highlights : DEFAULT_HIGHLIGHTS.slice(0, 2),
    };

    try {
      if (editingItemId) {
        updateGalleryItem(editingItemId, payload);
      } else {
        addGalleryItem(payload);
      }
      setIsModalOpen(false);
      setEditingItemId(null);
      setForm(createEmptyForm());
    } catch {
      setFormError('Storage limit reached for browser localStorage. Try deleting old unused photos or using a smaller image.');
    }
  };

  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      (item.location || '').toLowerCase().includes(q) ||
      (item.categoryLabel || '').toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header & Primary Action */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            Before &amp; After Gallery ({galleryItems.length})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload completed Austin refinishing projects. Changes appear immediately in the public Before &amp; After Gallery.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#0062ff] hover:bg-[#0052cc] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Add Job Photo</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              categoryFilter === 'all'
                ? 'bg-[#0c2340] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({galleryItems.length})
          </button>
          {GALLERY_CATEGORIES.map((cat) => {
            const count = galleryItems.filter((g) => g.category === cat.id).length;
            if (count === 0 && categoryFilter !== cat.id) return null;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  categoryFilter === cat.id
                    ? 'bg-[#0c2340] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title or Austin neighborhood..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
          />
        </div>
      </div>

      {/* Empty State or Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Camera className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">No gallery projects match this filter</h4>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Try clearing your search or upload a new completed project photo.
          </p>
          <button
            type="button"
            onClick={openAddModal}
            className="px-4 py-2 rounded-xl bg-[#0062ff] hover:bg-[#0052cc] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Job Photo</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((job) => {
            const previewSrc = job.compositeImage || job.afterImage || job.beforeImage || job.imageUrl || '';
            const isBroken = brokenCardIds[job.id] || !previewSrc;
            const isSliderPair = !job.compositeImage && Boolean(job.beforeImage && job.afterImage);

            return (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col hover:border-slate-300 transition-colors"
              >
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  {!isBroken ? (
                    <img
                      src={previewSrc}
                      alt={job.title}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setBrokenCardIds((prev) => ({ ...prev, [job.id]: true }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-100 text-slate-400">
                      <ImageIcon className="w-8 h-8 mb-1.5" />
                      <span className="text-[11px] font-medium text-slate-500 line-clamp-2">
                        {job.title}
                      </span>
                    </div>
                  )}

                  {isSliderPair && (
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-md bg-slate-900/80 text-white text-[10px] font-semibold flex items-center gap-1">
                      <ArrowLeftRight className="w-3 h-3 text-cyan-300" />
                      <span>Before / After Pair</span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-1">
                      <span className="text-[#0062ff] font-semibold">
                        {job.categoryLabel || job.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{job.location || 'Austin, TX'}</span>
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                      {job.title}
                    </h4>

                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(job)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {confirmDeleteId === job.id ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            deleteGalleryItem(job.id);
                            setConfirmDeleteId(null);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(job.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ADD / EDIT GALLERY PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">
              {editingItemId ? 'Edit Gallery Project' : 'Add Job to Gallery'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-5">
              Upload photos of your finished refinishing work in Austin, TX to showcase on the website.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Photo Mode Segmented Control */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Photo Format</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, photoMode: 'single' }))}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      form.photoMode === 'single'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Single / Side-by-Side Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, photoMode: 'slider' }))}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      form.photoMode === 'slider'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Before &amp; After Slider Pair
                  </button>
                </div>
              </div>

              {/* Photo Upload Area */}
              {form.photoMode === 'single' ? (
                <PhotoUploadSlot
                  label="Project Photo (Combined Before/After or Finished Result)"
                  hint="JPG, PNG, or WEBP — automatically optimized for fast loading"
                  value={form.compositeImage}
                  onChange={(val) => setForm((prev) => ({ ...prev, compositeImage: val }))}
                  onError={setFormError}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <PhotoUploadSlot
                    label="Before Photo"
                    hint="Original worn surface"
                    value={form.beforeImage}
                    onChange={(val) => setForm((prev) => ({ ...prev, beforeImage: val }))}
                    onError={setFormError}
                  />
                  <PhotoUploadSlot
                    label="After Photo"
                    hint="Refinished glossy surface"
                    value={form.afterImage}
                    onChange={(val) => setForm((prev) => ({ ...prev, afterImage: val }))}
                    onError={setFormError}
                  />
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Cast Iron Bathtub Chip Repair & High-Gloss Refinish"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
                />
              </div>

              {/* Category + Location + Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        category: e.target.value as AdminGalleryItem['category'],
                      }))
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
                  >
                    {GALLERY_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Austin, TX (Hyde Park)"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Photo Tag</label>
                  <input
                    type="text"
                    value={form.tag}
                    onChange={(e) => setForm((prev) => ({ ...prev, tag: e.target.value }))}
                    placeholder="High-Gloss White"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Work Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe surface condition, repairs completed, and final glossy finish..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
                />
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Highlight 1</label>
                  <input
                    type="text"
                    value={form.highlight1}
                    onChange={(e) => setForm((prev) => ({ ...prev, highlight1: e.target.value }))}
                    placeholder="Smooth, high-gloss brilliant white finish"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Highlight 2</label>
                  <input
                    type="text"
                    value={form.highlight2}
                    onChange={(e) => setForm((prev) => ({ ...prev, highlight2: e.target.value }))}
                    placeholder="5-year adhesion warranty"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
                  />
                </div>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0062ff] hover:bg-[#0052cc] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingItemId ? 'Save Changes' : 'Publish to Gallery'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
