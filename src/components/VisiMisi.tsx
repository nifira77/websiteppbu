import React from 'react';
import { usePesantren } from '../context/PesantrenContext';
import { Compass, Target, HeartHandshake, Check } from 'lucide-react';

export const VisiMisi: React.FC = () => {
  const { data } = usePesantren();
  const { visiMisi } = data;

  return (
    <section id="visimisi" className="py-20 bg-white border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <span>Landasan Filosofis</span>
            <span className="text-slate-300">·</span>
            <span className="text-amber-700">Arah & Tujuan Lembaga</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-islamic text-slate-900">
            Visi, Misi & Panca Jiwa Pesantren
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            Fondasi kokoh yang memandu seluruh ikhtiar tarbiyah, ta'lim, dan khidmah santri Pondok Pesantren Bustanul Ulum.
          </p>
        </div>

        {/* Visi & Misi Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Visi Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-8 rounded-2xl shadow-xl border border-emerald-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold">
                Visi Utama Pesantren
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-islamic mt-2 mb-6 text-white leading-snug">
                Pandangan Jauh ke Depan
              </h3>
              <p className="text-emerald-100/90 text-base sm:text-lg font-serif-islamic leading-relaxed italic bg-emerald-800/40 p-5 rounded-xl border border-emerald-700/50">
                "{visiMisi.visi}"
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-800/80 flex items-center justify-between text-xs text-emerald-300">
              <span>Bustanul Ulum Islamic Boarding School</span>
              <span className="text-amber-400 font-medium">Bustanul Ulum 2026/2027</span>
            </div>
          </div>

          {/* Misi Card */}
          <div className="lg:col-span-7 bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
                    Langkah Strategis
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-islamic">
                    Misi Pesantren
                  </h3>
                </div>
              </div>

              <div className="space-y-3.5">
                {visiMisi.misi.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{m}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tujuan summary */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Tujuan Capaian Santri:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                {visiMisi.tujuan.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Panca Jiwa Pesantren */}
        <div className="bg-emerald-900/5 rounded-3xl p-8 sm:p-10 border border-emerald-900/10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
              <HeartHandshake className="w-4 h-4 text-emerald-700" />
              <span>Nilai Luhur Karakter</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-islamic text-slate-900">
              Panca Jiwa Pondok Pesantren
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Lima pilar mentalitas yang ditanamkan ke dalam sanubari setiap santri sejak hari pertama menginjakkan kaki di pesantren.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {(visiMisi.pancaJiwa || []).map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-emerald-100 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-bold font-serif-islamic text-emerald-800/20 mb-2">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 font-serif-islamic mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-800 font-medium">
                  Jiwa Santri Bustanul Ulum
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
