import React, { useState, useEffect } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import {
  Users,
  GraduationCap,
  Award,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { data } = usePesantren();

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const prayerSchedule = data.jadwalIbadah || [
    { name: 'Subuh', time: '04:32 WIB' },
    { name: 'Terbit', time: '05:46 WIB' },
    { name: 'Dzuhur', time: '11:56 WIB' },
    { name: 'Ashar', time: '15:14 WIB' },
    { name: 'Maghrib', time: '18:02 WIB' },
    { name: 'Isya\'', time: '19:12 WIB' }
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background with Islamic pattern & overlay image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920"
          alt="Pesantren Atmosphere"
          className="w-full h-full object-cover opacity-20 filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/90 to-slate-950/95"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Bismillah Header Badge */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-500/30 text-amber-300 text-sm font-serif-islamic mb-3 backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-base tracking-widest">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
          </div>
          <span className="text-emerald-300 font-medium text-xs sm:text-sm tracking-wider uppercase">
            Pusat Kaderisasi Ulama & Cendekiawan Muslim Berkarakter
          </span>
        </div>

        {/* Main Title & Tagline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-serif-islamic text-white leading-tight mb-5">
            {data.profil.nama}
          </h1>
          <p className="text-base sm:text-xl text-emerald-100/90 leading-relaxed font-light mb-8 max-w-3xl mx-auto">
            {data.profil.tagline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('pendaftaran-psb')}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer border border-amber-300 transform hover:-translate-y-0.5"
            >
              <span>Pendaftaran Santri Baru Online (PSB)</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection('sambutan')}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm sm:text-base backdrop-blur-sm border border-emerald-400/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-emerald-300" />
              <span>Sambutan Pengasuh</span>
            </button>
          </div>
        </div>

        {/* Quick Prayer Schedule Strip for Pesantren */}
        <div className="bg-emerald-950/80 backdrop-blur-md rounded-2xl border border-emerald-700/40 p-4 sm:p-5 max-w-4xl mx-auto mb-12 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-3 mb-3 border-b border-emerald-800/60 gap-2">
            <div className="flex items-center gap-2 text-xs text-emerald-200">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Waktu Ibadah & Kegiatan Harian Santri ({data.profil.kota})</span>
            </div>
            <div className="text-xs font-mono font-semibold text-amber-300 bg-emerald-900/80 px-2.5 py-1 rounded-md border border-emerald-700">
              Jam Pesantren: {currentTime}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 text-center">
            {prayerSchedule.map((p) => (
              <div
                key={p.name}
                className="bg-emerald-900/40 hover:bg-emerald-800/40 transition-colors p-2.5 rounded-lg border border-emerald-800/40"
              >
                <div className="text-xs text-emerald-300 font-medium">{p.name}</div>
                <div className="text-sm sm:text-base font-bold text-amber-200 mt-0.5">{p.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xs rounded-xl p-4 border border-white/10 text-center">
            <div className="w-10 h-10 mx-auto rounded-lg bg-emerald-800/60 flex items-center justify-center text-amber-400 mb-2">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-islamic text-white">
              {data.profil.jumlahSantri}+
            </div>
            <div className="text-xs text-emerald-200 mt-1">Santri Mukim Putra & Putri</div>
          </div>

          <div className="bg-white/5 backdrop-blur-xs rounded-xl p-4 border border-white/10 text-center">
            <div className="w-10 h-10 mx-auto rounded-lg bg-emerald-800/60 flex items-center justify-center text-amber-400 mb-2">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-islamic text-white">
              {data.profil.jumlahAsatidz}+
            </div>
            <div className="text-xs text-emerald-200 mt-1">Masyayikh & Dewan Asatidz</div>
          </div>

          <div className="bg-white/5 backdrop-blur-xs rounded-xl p-4 border border-white/10 text-center">
            <div className="w-10 h-10 mx-auto rounded-lg bg-emerald-800/60 flex items-center justify-center text-amber-400 mb-2">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-islamic text-white">
              Akreditasi A
            </div>
            <div className="text-xs text-emerald-200 mt-1">Unggul Kemenag & Kemendikbud</div>
          </div>

          <div className="bg-white/5 backdrop-blur-xs rounded-xl p-4 border border-white/10 text-center">
            <div className="w-10 h-10 mx-auto rounded-lg bg-emerald-800/60 flex items-center justify-center text-amber-400 mb-2">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-islamic text-white">
              38 Tahun
            </div>
            <div className="text-xs text-emerald-200 mt-1">Mengabdi Melayani Ummat</div>
          </div>
        </div>
      </div>
    </section>
  );
};
