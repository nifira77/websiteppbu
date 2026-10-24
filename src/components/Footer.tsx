import React from 'react';
import { usePesantren } from '../context/PesantrenContext';
import {
  BookOpen,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setIsLoginModalOpen, setActiveView } = usePesantren();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    setActiveView('public');
    setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-emerald-950 text-white border-t border-emerald-900">
      {/* Upper Footer: Rekening & Quick Infaq Bar */}
      <div className="bg-emerald-900/60 border-b border-emerald-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                Rekening Resmi Operasional & Pendaftaran PSB
              </div>
              <div className="text-sm sm:text-base font-bold font-mono text-amber-300">
                Bank Syariah Indonesia (BSI): 712-8899-234 a.n. Yayasan Pondok Pesantren Bustanul Ulum
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Rekening Terverifikasi & Resmi Pesantren</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Identity & About */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md overflow-hidden p-1">
                {data.profil.logo ? (
                  <img src={data.profil.logo} alt={data.profil.nama} className="w-full h-full object-contain" />
                ) : (
                  <BookOpen className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="text-base font-bold font-serif-islamic text-white">
                  {data.profil.nama}
                </h3>
                <p className="text-xs text-emerald-300">Bogor, Jawa Barat · Est. {data.profil.tahunBerdiri}</p>
              </div>
            </div>

            <p className="text-xs text-emerald-100/80 leading-relaxed font-light">
              {data.profil.sejarahSingkat}
            </p>

            <div className="pt-2 text-xs text-emerald-300 font-serif-islamic">
              "العلم بلا عمل كالشجر بلا ثمر"
              <span className="block text-[11px] text-emerald-400/80 italic mt-0.5">
                (Ilmu tanpa amal bagaikan pohon tanpa buah)
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/90">
              <li>
                <button
                  onClick={() => scrollToSection('sambutan')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Sambutan Pengasuh Pesantren
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('visimisi')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Visi, Misi & Panca Jiwa
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('program')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Program Tahfidz & Formal MTs/MA
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('kegiatan')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Kegiatan Santri & Jadwal Harian
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('galeri')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Galeri Foto Dokumentasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pengurus')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Dewan Pengasuh & Yayasan
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimoni')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Testimoni Wali Santri
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pendaftaran-psb')}
                  className="text-amber-300 font-semibold hover:underline cursor-pointer text-left"
                >
                  Pendaftaran Santri Baru (PSB Online)
                </button>
              </li>
            </ul>
          </div>

          {/* Kontak & Sekretariat */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Sekretariat & Informasi
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-100/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{data.profil.alamat}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Telepon: {data.profil.telepon}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Email: {data.profil.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-800 text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0">WA</span>
                <span>WhatsApp: {data.profil.whatsapp}</span>
              </div>
            </div>
          </div>

          {/* Akses Khusus Admin Pengurus */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Akses Internal
            </h4>
            <p className="text-xs text-emerald-200">
              Khusus pengurus, ustadz, dan administrator pesantren untuk pengelolaan konten website.
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="py-1 text-xs font-semibold text-emerald-200 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer border-b border-transparent hover:border-amber-400/50"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Login</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright & Scroll to top */}
        <div className="mt-12 pt-6 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300">
          <div>
            © {new Date().getFullYear()} {data.profil.nama}. Hak Cipta Dilindungi Undang-Undang.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-emerald-300 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
