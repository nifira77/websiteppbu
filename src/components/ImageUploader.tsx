import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  accept?: string;
  aspectRatioClass?: string;
  previewRounded?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  helperText = 'Mendukung format JPG, JPEG, PNG, WEBP, SVG (Maks. 5MB)',
  accept = 'image/png, image/jpeg, image/jpg, image/webp, image/svg+xml, image/*',
  aspectRatioClass = 'h-36',
  previewRounded = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlDraft, setUrlDraft] = useState('');
  const [fileError, setFileError] = useState('');

  const processFile = (file: File) => {
    setFileError('');
    if (!file.type.startsWith('image/')) {
      setFileError('Format file tidak didukung. Harap pilih gambar (JPG, JPEG, PNG, WEBP, atau SVG).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setFileError('Ukuran file terlalu besar (maksimal 8MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onChange(event.target.result);
      }
    };
    reader.onerror = () => {
      setFileError('Gagal membaca file gambar.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleApplyUrl = () => {
    if (urlDraft.trim()) {
      onChange(urlDraft.trim());
      setUrlDraft('');
      setShowUrlInput(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-emerald-800 hover:text-emerald-950 font-medium flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'Gunakan Unggah File' : 'Input via URL'}</span>
        </button>
      </div>

      {showUrlInput ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            placeholder="Tempel URL gambar (https://...)"
            className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3.5 py-2 rounded-lg bg-emerald-800 text-white text-xs font-medium cursor-pointer hover:bg-emerald-900"
          >
            Terapkan
          </button>
        </div>
      ) : (
        <div>
          {/* Upload Drop Zone / Preview Container */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-emerald-600 bg-emerald-50'
                : 'border-slate-300 bg-slate-50/70 hover:bg-slate-100 hover:border-emerald-500'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
            />

            {value ? (
              <div className="flex items-center gap-4 text-left">
                <div
                  className={`relative shrink-0 overflow-hidden bg-slate-200 border border-slate-300 shadow-2xs ${
                    previewRounded ? 'w-20 h-20 rounded-full' : `w-28 ${aspectRatioClass} rounded-lg`
                  }`}
                >
                  <img
                    src={value}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Foto Berhasil Diunggah</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    Klik untuk mengganti gambar dengan file lain dari perangkat Anda.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded">
                      JPG / PNG / WEBP / SVG
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange('');
                      }}
                      className="text-[10px] text-red-600 hover:text-red-800 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                      <span>Hapus Foto</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-4 flex flex-col items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Klik untuk Unggah Foto dari Perangkat
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    atau seret (drag & drop) file gambar ke sini
                  </p>
                </div>
                <span className="text-[10px] text-slate-400">
                  Format: JPG, JPEG, PNG, WEBP, SVG
                </span>
              </div>
            )}
          </div>

          {fileError && (
            <p className="text-xs text-red-600 mt-1">{fileError}</p>
          )}
          {helperText && !fileError && (
            <p className="text-[11px] text-slate-400 mt-1">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
};
