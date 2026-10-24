import React from 'react';
import { usePesantren } from '../context/PesantrenContext';
import { Quote, Star, MapPin } from 'lucide-react';

export const TestimoniSection: React.FC = () => {
  const { data } = usePesantren();
  const { testimoni } = data;

  return (
    <section id="testimoni" className="py-20 bg-emerald-50/40 border-b border-emerald-900/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <span>Amanah & Kepercayaan</span>
            <span className="text-slate-300">·</span>
            <span className="text-amber-700">Keluarga Besar Santri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-islamic text-slate-900">
            Kata Mereka Tentang Bustanul Ulum
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            Ungkapan tulus dan pengalaman langsung para wali santri serta alumni yang telah mempercayakan pendidikan putra-putrinya di pondok kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimoni.map((t) => (
            <div
              key={t.id}
              className="bg-white p-7 rounded-2xl shadow-sm border border-emerald-100 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-emerald-200" />
                </div>

                <p className="text-sm text-slate-700 italic font-serif-islamic leading-relaxed mb-6">
                  "{t.komentar}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <img
                  src={t.foto}
                  alt={t.nama}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-serif-islamic">
                    {t.nama}
                  </h3>
                  <p className="text-xs text-emerald-800 font-medium">{t.status}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{t.asal}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
