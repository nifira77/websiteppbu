import React from 'react';
import { usePesantren } from '../context/PesantrenContext';
import { Quote, CheckCircle, ShieldCheck } from 'lucide-react';

export const SambutanPengasuh: React.FC = () => {
  const { data } = usePesantren();
  const { sambutan } = data;

  return (
    <section id="sambutan" className="py-20 bg-emerald-50/50 border-b border-emerald-900/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <span>Kalimatul Iftitah</span>
            <span className="text-slate-300">·</span>
            <span className="text-amber-700">Pimpinan Pesantren</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-islamic text-slate-900">
            Sambutan Pengasuh Pondok Pesantren
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Photo & Identity Column */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 ring-4 ring-emerald-800/20">
                <img
                  src={sambutan.foto}
                  alt={sambutan.namaPengasuh}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Quote icon sticker */}
              <div className="absolute -bottom-4 -right-3 w-12 h-12 bg-amber-500 text-slate-950 rounded-xl shadow-lg flex items-center justify-center border-2 border-white">
                <Quote className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl sm:text-2xl font-bold font-serif-islamic text-slate-900">
                {sambutan.namaPengasuh}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 font-medium mt-1">
                {sambutan.gelar}
              </p>
            </div>

            {/* Quick credentials bullet tags */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-xs text-xs text-slate-600">
              <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-md bg-white border border-emerald-200 shadow-2xs">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>Sanad Al-Qur'an Muttashil</span>
              </div>
              <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-md bg-white border border-emerald-200 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Ahlussunnah wal Jama'ah</span>
              </div>
            </div>
          </div>

          {/* Sambutan Content Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Highlight Quote Box */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-emerald-100 border-l-4 border-l-emerald-700">
              <p className="text-base sm:text-lg font-serif-islamic italic text-slate-800 leading-relaxed">
                "{sambutan.kutipan}"
              </p>
            </div>

            {/* Salam Pembuka */}
            <div className="text-sm font-semibold text-emerald-900 font-serif-islamic">
              {sambutan.salamPembuka}
            </div>

            {/* Full paragraphs */}
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              {sambutan.pesanLengkap.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-emerald-200/60 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Hormat Kami,</p>
                <p className="text-sm font-bold text-slate-900 font-serif-islamic">
                  {sambutan.namaPengasuh}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-emerald-800 font-medium">Bustanul Ulum Islamic Boarding School</span>
                <p className="text-xs text-slate-400">Bogor, Jawa Barat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
