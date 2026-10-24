import React, { useState, useEffect } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import {
  BookOpen,
  Menu,
  X,
  Lock,
  LayoutDashboard,
  LogOut,
  PhoneCall,
  ChevronDown,
  Users,
  UserPlus
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    data,
    activeView,
    setActiveView,
    activeMenuSection,
    setActiveMenuSection,
    isAdminLoggedIn,
    isLoginModalOpen,
    setIsLoginModalOpen,
    logoutAdmin
  } = usePesantren();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSantriOpen, setMobileSantriOpen] = useState(false);

  // Scroll listener to update activeMenuSection
  useEffect(() => {
    if (activeView === 'admin') return;

    const sections = [
      { id: 'profil', name: 'profil' },
      { id: 'visimisi', name: 'visimisi' },
      { id: 'program', name: 'program' },
      { id: 'kegiatan', name: 'kegiatan' },
      { id: 'galeri', name: 'galeri' },
      { id: 'pengurus', name: 'pengurus' },
      { id: 'data-santri', name: 'santri' },
      { id: 'pendaftaran-psb', name: 'santri' },
      { id: 'testimoni', name: 'testimoni' },
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY + 180;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveMenuSection(sections[i].name);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView, setActiveMenuSection]);

  const scrollToSection = (id: string, menuKey?: string) => {
    setMobileMenuOpen(false);
    if (menuKey) {
      setActiveMenuSection(menuKey);
    }
    if (activeView === 'admin') {
      setActiveView('public');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getMenuClass = (menuKey: string) => {
    const isActive = activeMenuSection === menuKey;
    return `text-sm font-medium transition-all cursor-pointer py-1.5 border-b-2mm ${
      isActive
        ? 'border-emerald-900 text-emerald-950 font-bold'
        : 'border-transparent text-slate-700 hover:text-emerald-800 hover:border-emerald-800/40'
    }`;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      {/* Top Banner with Contact & Islamic Greeting */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-emerald-800">
        <div className="flex items-center gap-4">
          <span className="font-serif-islamic text-amber-300 font-semibold tracking-wider hidden sm:inline">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
          <span className="text-emerald-200">
            Pondok Pesantren Salaf & Modern Terpadu
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`https://wa.me/${data.profil.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>WA Center: {data.profil.whatsapp}</span>
          </a>
          <span className="text-emerald-500 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-emerald-300">{data.profil.kota}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <button
            onClick={() => {
              setActiveView('public');
              setActiveMenuSection('profil');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3.5 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-amber-400 shadow-md border border-amber-500/30 group-hover:border-amber-400 transition-all overflow-hidden p-1">
              {data.profil.logo ? (
                <img
                  src={data.profil.logo}
                  alt={data.profil.nama}
                  className="w-full h-full object-contain"
                />
              ) : (
                <BookOpen className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Pesantren Terpadu
                </span>
                <span className="text-slate-300 text-xs">·</span>
                <span className="text-xs text-amber-700 font-medium">Est. {data.profil.tahunBerdiri}</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-serif-islamic leading-tight">
                {data.profil.nama}
              </h1>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('sambutan', 'profil')}
              className={getMenuClass('profil')}
            >
              Profil & Sambutan
            </button>
            <button
              onClick={() => scrollToSection('visimisi', 'visimisi')}
              className={getMenuClass('visimisi')}
            >
              Visi & Misi
            </button>
            <button
              onClick={() => scrollToSection('program', 'program')}
              className={getMenuClass('program')}
            >
              Program
            </button>
            <button
              onClick={() => scrollToSection('kegiatan', 'kegiatan')}
              className={getMenuClass('kegiatan')}
            >
              Kegiatan & Jadwal
            </button>
            <button
              onClick={() => scrollToSection('galeri', 'galeri')}
              className={getMenuClass('galeri')}
            >
              Galeri
            </button>
            <button
              onClick={() => scrollToSection('pengurus', 'pengurus')}
              className={getMenuClass('pengurus')}
            >
              Pengurus & Yayasan
            </button>

            {/* Menu Santri (dengan sub-menu Data Santri & Daftar Santri PSB) */}
            <div className="relative group py-1">
              <button
                className={`flex items-center gap-1 ${getMenuClass('santri')}`}
              >
                <span>Santri</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-900 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {/* Sub-menu Dropdown */}
              <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-xl border border-slate-200/90 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <button
                  onClick={() => scrollToSection('data-santri', 'santri')}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Users className="w-4 h-4 text-emerald-800" />
                  <span>Data Santri</span>
                </button>
                <button
                  onClick={() => scrollToSection('pendaftaran-psb', 'santri')}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 flex items-center gap-2.5 transition-colors cursor-pointer border-t border-slate-100"
                >
                  <UserPlus className="w-4 h-4 text-emerald-800" />
                  <span>Daftar Santri PSB</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => scrollToSection('testimoni', 'testimoni')}
              className={getMenuClass('testimoni')}
            >
              Testimoni
            </button>

            {/* Menu Login - Sesuai Permintaan: teks "Login", tanpa background warna, bergaris bawah hijau tua 2mm saat aktif */}
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveView(activeView === 'admin' ? 'public' : 'admin')}
                  className={`text-sm font-medium transition-all cursor-pointer py-1.5 border-b-2mm flex items-center gap-1.5 ${
                    activeView === 'admin'
                      ? 'border-emerald-900 text-emerald-950 font-bold'
                      : 'border-transparent text-slate-700 hover:text-emerald-800 hover:border-emerald-800/40'
                  }`}
                  title="Dashboard Pengurus"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-800" />
                  <span>{activeView === 'admin' ? 'Lihat Web' : 'Dashboard'}</span>
                </button>
                <button
                  onClick={logoutAdmin}
                  className="text-xs text-red-600 hover:text-red-800 font-medium cursor-pointer"
                  title="Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className={`text-sm font-medium transition-all cursor-pointer py-1.5 border-b-2mm flex items-center gap-1.5 ${
                  isLoginModalOpen
                    ? 'border-emerald-900 text-emerald-950 font-bold'
                    : 'border-transparent text-slate-700 hover:text-emerald-800 hover:border-emerald-800/40'
                }`}
                title="Akses Login Pengurus / Admin"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Login</span>
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-xs font-semibold text-slate-700 hover:text-emerald-900 px-2 py-1 flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 shadow-xl space-y-2">
          <button
            onClick={() => scrollToSection('sambutan', 'profil')}
            className={`block w-full text-left py-2 text-sm border-b border-slate-100 ${
              activeMenuSection === 'profil'
                ? 'border-l-2mm border-l-emerald-900 pl-2.5 font-bold text-emerald-950'
                : 'text-slate-700'
            }`}
          >
            Profil & Sambutan Pengasuh
          </button>
          <button
            onClick={() => scrollToSection('visimisi', 'visimisi')}
            className={`block w-full text-left py-2 text-sm border-b border-slate-100 ${
              activeMenuSection === 'visimisi'
                ? 'border-l-2mm border-l-emerald-900 pl-2.5 font-bold text-emerald-950'
                : 'text-slate-700'
            }`}
          >
            Visi, Misi & Panca Jiwa
          </button>
          <button
            onClick={() => scrollToSection('program', 'program')}
            className={`block w-full text-left py-2 text-sm border-b border-slate-100 ${
              activeMenuSection === 'program'
                ? 'border-l-2mm border-l-emerald-900 pl-2.5 font-bold text-emerald-950'
                : 'text-slate-700'
            }`}
          >
            Program Pendidikan & Tahfidz
          </button>
          <button
            onClick={() => scrollToSection('kegiatan', 'kegiatan')}
            className={`block w-full text-left py-2 text-sm border-b border-slate-100 ${
              activeMenuSection === 'kegiatan'
                ? 'border-l-2mm border-l-emerald-900 pl-2.5 font-bold text-emerald-950'
                : 'text-slate-700'
            }`}
          >
            Kegiatan Santri & Jadwal Harian
          </button>
          <button
            onClick={() => scrollToSection('galeri', 'galeri')}
            className={`block w-full text-left py-2 text-sm border-b border-slate-100 ${
              activeMenuSection === 'galeri'
                ? 'border-l-2mm border-l-emerald-900 pl-2.5 font-bold text-emerald-950'
                : 'text-slate-700'
            }`}
          >
            Galeri Dokumentasi
          </button>
          <button
            onClick={() => scrollToSection('pengurus', 'pengurus')}
            className={`block w-full text-left py-2 text-sm border-b border-slate-100 ${
              activeMenuSection === 'pengurus'
                ? 'border-l-2mm border-l-emerald-900 pl-2.5 font-bold text-emerald-950'
                : 'text-slate-700'
            }`}
          >
            Dewan Pengasuh & Yayasan
          </button>

          {/* Mobile Santri Sub-menu */}
          <div className="border-b border-slate-100 pb-2">
            <button
              onClick={() => setMobileSantriOpen(!mobileSantriOpen)}
              className={`w-full flex items-center justify-between py-2 text-sm ${
                activeMenuSection === 'santri'
                  ? 'border-l-2mm border-l-emerald-900 pl-2.5 font-bold text-emerald-950'
                  : 'text-slate-700 font-medium'
              }`}
            >
              <span>Santri</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileSantriOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileSantriOpen && (
              <div className="pl-4 space-y-1.5 pt-1">
                <button
                  onClick={() => scrollToSection('data-santri', 'santri')}
                  className="block w-full text-left py-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-2"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Data Santri</span>
                </button>
                <button
                  onClick={() => scrollToSection('pendaftaran-psb', 'santri')}
                  className="block w-full text-left py-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-2"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Daftar Santri PSB</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => scrollToSection('testimoni', 'testimoni')}
            className={`block w-full text-left py-2 text-sm border-b border-slate-100 ${
              activeMenuSection === 'testimoni'
                ? 'border-l-2mm border-l-emerald-900 pl-2.5 font-bold text-emerald-950'
                : 'text-slate-700'
            }`}
          >
            Testimoni Wali Santri
          </button>

          {/* Login button in mobile */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsLoginModalOpen(true);
            }}
            className="block w-full text-left py-2 text-sm font-semibold text-emerald-950 flex items-center gap-2"
          >
            <Lock className="w-4 h-4 text-slate-500" />
            <span>Login</span>
          </button>
        </div>
      )}
    </header>
  );
};
