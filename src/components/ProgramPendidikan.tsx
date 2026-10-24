import React from 'react';
import { usePesantren } from '../context/PesantrenContext';
import {
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ProgramPendidikan: React.FC = () => {
  const { data } = usePesantren();
  const { programPendidikan } = data;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const ekstrakurikuler = data.ekstrakurikuler && data.ekstrakurikuler.length > 0
    ? data.ekstrakurikuler
    : [
        { nama: 'Seni Hadrah & Sholawat Al-Banjari', desc: 'Pengembangan seni vokal islami dan ritme rebana klasik' },
        { nama: 'Pencak Silat Pagar Nusa', desc: 'Bela diri tradisional, ketangkasan fisik, dan penjagaan diri' },
        { nama: 'Muhadharah 3 Bahasa', desc: 'Latihan pidato & debat intensif (Arab, Inggris, Indonesia)' },
        { nama: 'Klub IT & Robotika Santri', desc: 'Pemrograman web dasar, robotik Arduino, dan desain multimedia' },
        { nama: 'Seni Kaligrafi Islam (Khath)', desc: 'Penulisan naskhi, tsuluts, diwani bersama kaligrafer profesional' },
        { nama: 'Pramuka & Kepanduan Santri', desc: 'Kepemimpinan, survival asri pegunungan, dan kekompakan tim' }
      ];

  return (
    <section id="program" className="py-20 bg-slate-50 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <span>Kurikulum Terintegrasi</span>
            <span className="text-slate-300">·</span>
            <span className="text-amber-700">Salaf & Modern</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-islamic text-slate-900">
            Program Pendidikan Unggulan
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            Perpaduan harmonis antara kurikulum keagamaan pesantren salafiyah dengan standar akademik nasional berakreditasi A unggul.
          </p>
        </div>

        {/* 4 Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {programPendidikan.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      {prog.badge}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500">{prog.jenjang}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{prog.lamaStudi}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-islamic mb-3">
                  {prog.nama}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {prog.deskripsi}
                </p>

                {/* Target Output */}
                <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>Target Capaian Santri:</span>
                  </h4>
                  <ul className="space-y-2">
                    {prog.targetOutput.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => scrollToSection('pendaftaran-psb')}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 cursor-pointer group"
                >
                  <span>Daftar Pada Program Ini</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-xs text-slate-400">T.A. 2026/2027</span>
              </div>
            </div>
          ))}
        </div>

        {/* Ekstrakurikuler Mini Section */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Pengembangan Minat & Bakat Santri</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-islamic">
                Ekstrakurikuler & Keterampilan Hidup
              </h3>
            </div>
            <span className="text-xs text-slate-500 max-w-xs sm:text-right">
              Melatih kepemimpinan, kesehatan jasmani, dan kreativitas santri di luar jam madrasah.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ekstrakurikuler.map((ek, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 font-serif-islamic mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{ek.nama}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{ek.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
