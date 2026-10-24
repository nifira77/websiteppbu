import React, { useState } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import { KegiatanSantri as KegiatanSantriType } from '../types';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  X,
  Compass
} from 'lucide-react';

export const KegiatanSantri: React.FC = () => {
  const { data } = usePesantren();
  const { beritaKegiatan, jadwalHarian } = data;

  const [activeTab, setActiveTab] = useState<'berita' | 'jadwal'>('berita');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedArticle, setSelectedArticle] = useState<KegiatanSantriType | null>(null);

  const categories = ['Semua', 'Berita', 'Pengajian', 'Prestasi', 'Ekstrakurikuler'];

  const filteredBerita = selectedCategory === 'Semua'
    ? beritaKegiatan
    : beritaKegiatan.filter((b) => b.kategori === selectedCategory);

  return (
    <section id="kegiatan" className="py-20 bg-white border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <span>Dinamika Kehidupan Pondok</span>
            <span className="text-slate-300">·</span>
            <span className="text-amber-700">Aktivitas & Informasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-islamic text-slate-900">
            Kegiatan Santri & Berita Terkini
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            Potret ritme kehidupan religius santri 24 jam serta kabar prestasi dan agenda pesantren yang senantiasa diperbarui.
          </p>

          {/* Toggle between Berita & Jadwal Harian */}
          <div className="inline-flex p-1.5 bg-slate-100 rounded-xl mt-8 border border-slate-200">
            <button
              onClick={() => setActiveTab('berita')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'berita'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Berita & Agenda Kegiatan
            </button>
            <button
              onClick={() => setActiveTab('jadwal')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'jadwal'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Jadwal Harian Santri (24 Jam)
            </button>
          </div>
        </div>

        {activeTab === 'berita' ? (
          <div>
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBerita.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={item.foto}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-xs text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-emerald-700/60">
                      {item.kategori}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta line */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {item.waktu}
                        </span>
                        {item.penulis && (
                          <>
                            <span>·</span>
                            <span>{item.penulis}</span>
                          </>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-900 font-serif-islamic line-clamp-2 mb-2 group-hover:text-emerald-800 transition-colors">
                        {item.judul}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {item.deskripsi}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedArticle(item)}
                      className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center justify-between cursor-pointer"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredBerita.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-sm">
                Belum ada kegiatan pada kategori ini.
              </div>
            )}
          </div>
        ) : (
          /* Jadwal Harian 24 Jam */
          <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-serif-islamic">
                  Rangkaian Rutinitas Santri Pondok Pesantren
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Disiplin waktu membina kemandirian, ketajaman akal, dan kebersihan rohani.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-800 font-medium bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <Compass className="w-4 h-4" />
                <span>Terjadwal Terpadu</span>
              </div>
            </div>

            <div className="space-y-3">
              {jadwalHarian.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-emerald-300 transition-colors gap-2"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-24 shrink-0 text-xs font-bold text-emerald-800 flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-md">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{item.waktu}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">
                        {item.kegiatan}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Lokasi: <span className="font-medium text-slate-700">{item.tempat}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 sm:text-right pl-7 sm:pl-0 italic">
                    {item.keterangan}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Baca Artikel Lengkap */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={selectedArticle.foto}
                  alt={selectedArticle.judul}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition-colors cursor-pointer"
                  aria-label="Tutup artikel"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-4 bg-emerald-900/90 text-amber-300 text-xs font-semibold px-3 py-1 rounded-md">
                  {selectedArticle.kategori}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedArticle.waktu}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {selectedArticle.penulis || 'Humas Pesantren'}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-serif-islamic text-slate-900 leading-snug mb-4">
                  {selectedArticle.judul}
                </h3>

                <p className="text-sm font-medium text-slate-700 leading-relaxed mb-4 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  {selectedArticle.deskripsi}
                </p>

                <div className="text-sm text-slate-600 leading-relaxed space-y-3">
                  <p>{selectedArticle.kontenLengkap || selectedArticle.deskripsi}</p>
                  <p>
                    Kegiatan ini merupakan bagian integral dari pembentukan karakter santri Pondok Pesantren Bustanul Ulum agar siap berkontribusi secara nyata di tengah masyarakat dengan bekal keilmuan yang mumpuni serta ketakwaan kepada Allah SWT.
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium cursor-pointer"
                  >
                    Tutup Bacaan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
