import React from 'react';
import { usePesantren } from '../context/PesantrenContext';
import { Building2, Users } from 'lucide-react';

export const FasilitasSection: React.FC = () => {
  const { data } = usePesantren();
  const { fasilitas } = data;

  return (
    <section id="fasilitas" className="py-20 bg-emerald-900 text-white scroll-mt-20 relative overflow-hidden">
      {/* Subtle background radial styling */}
      <div className="absolute inset-0 bg-islamic-dark opacity-40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Sarana & Prasarana</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-islamic text-white">
            Fasilitas Penunjang Pembelajaran Santri
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-emerald-100/80 text-sm sm:text-base">
            Didukung sarana modern yang nyaman, bersih, dan representatif guna mendukung iklim belajar dan ibadah santri yang optimal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fasilitas.map((f) => (
            <div
              key={f.id}
              className="bg-emerald-950/70 border border-emerald-700/50 rounded-2xl overflow-hidden backdrop-blur-xs flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300 group"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={f.foto}
                    alt={f.nama}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  {f.kapasitas && (
                    <div className="absolute top-3 right-3 bg-slate-950/80 text-amber-300 text-xs font-medium px-3 py-1 rounded-md border border-amber-500/30 flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-amber-400" />
                      <span>{f.kapasitas}</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif-islamic text-amber-300 mb-2">
                    {f.nama}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                    {f.deskripsi}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-emerald-800/80 text-[11px] text-emerald-300 flex justify-between items-center">
                  <span>Standar Pesantren Modern</span>
                  <span className="text-amber-400 font-medium">Bustanul Ulum</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
