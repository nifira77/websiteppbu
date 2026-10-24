import React, { useState } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import { GaleriItem } from '../types';
import { Image, Maximize2, X, Calendar } from 'lucide-react';

export const GaleriPesantren: React.FC = () => {
  const { data } = usePesantren();
  const { galeri } = data;

  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedPhoto, setSelectedPhoto] = useState<GaleriItem | null>(null);

  const categories = ['Semua', 'Pengajian', 'Asrama', 'Akademik', 'Ekstrakurikuler', 'Fasilitas'];

  const filteredGaleri = activeCategory === 'Semua'
    ? galeri
    : galeri.filter((g) => g.kategori === activeCategory);

  return (
    <section id="galeri" className="py-20 bg-slate-50 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <span>Dokumentasi Visual</span>
            <span className="text-slate-300">·</span>
            <span className="text-amber-700">Aktivitas & Fasilitas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-islamic text-slate-900">
            Galeri Foto Pondok Pesantren
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            Merekam jejak langkah para santri dalam menuntut ilmu, beribadah, dan menempa diri di lingkungan pesantren yang asri.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGaleri.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs hover:shadow-lg transition-all cursor-pointer h-72"
            >
              <img
                src={item.foto}
                alt={item.judul}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

              <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/40 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <div className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-800 text-emerald-100 mb-1.5">
                  {item.kategori}
                </div>
                <h3 className="text-base font-bold font-serif-islamic text-white leading-snug">
                  {item.judul}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1 mt-1">
                  {item.deskripsi}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
                  <Calendar className="w-3 h-3" />
                  <span>{item.tanggal}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGaleri.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto">
            <Image className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Belum ada foto dalam kategori ini.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.foto}
                  alt={selectedPhoto.judul}
                  className="max-h-[70vh] w-auto object-contain"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
                  aria-label="Tutup foto"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Kategori: {selectedPhoto.kategori}
                  </span>
                  <span>{selectedPhoto.tanggal}</span>
                </div>
                <h3 className="text-xl font-bold font-serif-islamic text-slate-900 mb-2">
                  {selectedPhoto.judul}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedPhoto.deskripsi}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
