import React, { useState } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import { GraduationCap } from 'lucide-react';

export const PengurusYayasan: React.FC = () => {
  const { data } = usePesantren();
  const { pengurus } = data;

  const [filterRole, setFilterRole] = useState<string>('Semua');

  const categories = ['Semua', 'Pengasuh', 'Yayasan', 'Madrasah', 'Asatidz'];

  const filteredPengurus = filterRole === 'Semua'
    ? pengurus
    : pengurus.filter((p) => p.kategori === filterRole);

  return (
    <section id="pengurus" className="py-20 bg-white border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <span>Struktur Kepemimpinan</span>
            <span className="text-slate-300">·</span>
            <span className="text-amber-700">Masyayikh & Asatidz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-islamic text-slate-900">
            Dewan Pengasuh, Yayasan & Tenaga Pendidik
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            Dipimpin oleh para ulama berkredibilitas tinggi dan akademisi berpengalaman yang mengayomi para santri dengan ketulusan hati.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterRole(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  filterRole === cat
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat === 'Semua' ? 'Semua Jajaran' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pengurus Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPengurus.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={item.foto}
                    alt={item.nama}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-emerald-950/85 backdrop-blur-xs text-amber-300 text-xs font-semibold px-3 py-1 rounded-md border border-emerald-700/60">
                    {item.kategori}
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-xs font-semibold text-emerald-800 block mb-1">
                    {item.jabatan}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 font-serif-islamic mb-2">
                    {item.nama}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.biografi}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs text-slate-600">
                  <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-700">{item.pendidikan}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
