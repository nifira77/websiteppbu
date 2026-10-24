import React, { useState } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import {
  Users,
  Search,
  Award,
  GraduationCap,
  BookOpen,
  MapPin,
  Calendar,
  CheckCircle2,
  Sparkles,
  Filter
} from 'lucide-react';

interface SantriAktif {
  id: string;
  nis: string;
  nama: string;
  jenjang: 'MTs Bustanul Ulum' | 'MA Bustanul Ulum' | 'Tahfidz Takhassus';
  kelas: string;
  jenisKelamin: 'Putra' | 'Putri';
  kamar: string;
  asalKota: string;
  hafalan: string;
  prestasi: string;
}

const mockDataSantriAktif: SantriAktif[] = [
  {
    id: 's-1',
    nis: '2024.08.0121',
    nama: 'Muhammad Azzam Al-Fatih',
    jenjang: 'MA Bustanul Ulum',
    kelas: 'Kelas XII MA (IPA Unggulan)',
    jenisKelamin: 'Putra',
    kamar: 'Asrama Al-Farabi Lt. 2',
    asalKota: 'Bogor, Jawa Barat',
    hafalan: '30 Juz Mutqin',
    prestasi: 'Juara 1 Musabaqah Qira\'atil Kutub (MQK) Nasional 2026'
  },
  {
    id: 's-2',
    nis: '2024.08.0145',
    nama: 'Siti Maryam Az-Zahra',
    jenjang: 'MA Bustanul Ulum',
    kelas: 'Kelas XI MA (Keagamaan)',
    jenisKelamin: 'Putri',
    kamar: 'Asrama Khadijah Lt. 1',
    asalKota: 'Bandung, Jawa Barat',
    hafalan: '22 Juz',
    prestasi: 'Juara 2 Pidato Bahasa Arab Tingkat Provinsi'
  },
  {
    id: 's-3',
    nis: '2025.07.0089',
    nama: 'Zaidan Robbani Kamil',
    jenjang: 'Tahfidz Takhassus',
    kelas: 'Takhassus 30 Juz',
    jenisKelamin: 'Putra',
    kamar: 'Asrama Ibnu Rusyd Lt. 3',
    asalKota: 'Jakarta Selatan',
    hafalan: '30 Juz Bersanad',
    prestasi: 'Finalis Musabaqah Hifdzil Qur\'an (MHQ) 30 Juz'
  },
  {
    id: 's-4',
    nis: '2025.07.0112',
    nama: 'Nabila Syakira Firdaus',
    jenjang: 'MTs Bustanul Ulum',
    kelas: 'Kelas IX MTs',
    jenisKelamin: 'Putri',
    kamar: 'Asrama Aisyah Lt. 2',
    asalKota: 'Tangerang, Banten',
    hafalan: '10 Juz',
    prestasi: 'Medali Emas Kompetisi Sains Madrasah (KSM) Matematika'
  },
  {
    id: 's-5',
    nis: '2026.07.0034',
    nama: 'Farhan Dwi Ramadhan',
    jenjang: 'MTs Bustanul Ulum',
    kelas: 'Kelas VIII MTs',
    jenisKelamin: 'Putri',
    kamar: 'Asrama Al-Ghazali Lt. 1',
    asalKota: 'Surabaya, Jawa Timur',
    hafalan: '8 Juz',
    prestasi: 'Khatam Kitab Al-Jurumiyyah & Matan Taqrib'
  },
  {
    id: 's-6',
    nis: '2026.07.0078',
    nama: 'Bilal Habibi Musthofa',
    jenjang: 'Tahfidz Takhassus',
    kelas: 'Takhassus Tahfidz',
    jenisKelamin: 'Putra',
    kamar: 'Asrama Ibnu Rusyd Lt. 1',
    asalKota: 'Medan, Sumatera Utara',
    hafalan: '18 Juz',
    prestasi: 'Juara 1 Tilawah Remaja Tingkat Kabupaten'
  }
];

export const DataSantriSection: React.FC = () => {
  const { data } = usePesantren();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterJenjang, setFilterJenjang] = useState<string>('Semua');
  const [filterGender, setFilterGender] = useState<string>('Semua');

  const santriList = data.santriAktifList && data.santriAktifList.length > 0
    ? data.santriAktifList
    : mockDataSantriAktif;

  const countPutra = santriList.filter((s) => s.jenisKelamin === 'Putra').length;
  const countPutri = santriList.filter((s) => s.jenisKelamin === 'Putri').length;

  const filteredSantri = santriList.filter((s) => {
    const matchSearch =
      s.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.asalKota.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.prestasi.toLowerCase().includes(searchTerm.toLowerCase());

    const matchJenjang = filterJenjang === 'Semua' || s.jenjang === filterJenjang;
    const matchGender = filterGender === 'Semua' || s.jenisKelamin === filterGender;

    return matchSearch && matchJenjang && matchGender;
  });

  return (
    <section id="data-santri" className="py-20 bg-slate-50 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <Users className="w-4 h-4 text-emerald-700" />
            <span>Keluarga Besar Pesantren</span>
            <span className="text-slate-300">·</span>
            <span className="text-amber-700">Database Santri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-islamic text-slate-900">
            Data Santri Pondok Pesantren
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            Informasi demografi, distribusi jenjang pendidikan, serta rekam prestasi santri mukim yang menuntut ilmu di Bustanul Ulum.
          </p>
        </div>

        {/* Demographics Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Total Santri Mukim</span>
              <Users className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-islamic mt-2">
              {data.profil.jumlahSantri}
            </div>
            <div className="text-[11px] text-emerald-800 mt-1 flex items-center gap-1">
              <span>Putra: 710</span>
              <span>·</span>
              <span>Putri: 570</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Santri MTs</span>
              <GraduationCap className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-islamic mt-2">
              460
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Pendidikan Formal Tingkat Pertama
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Santri MA</span>
              <BookOpen className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-islamic mt-2">
              410
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              IPA, IPS & Keagamaan
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Takhassus Tahfidz</span>
              <Award className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-islamic mt-2">
              290
            </div>
            <div className="text-[11px] text-amber-700 font-medium mt-1">
              Halaqah 30 Juz Bersanad
            </div>
          </div>
        </div>

        {/* Directory Search & Filter */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-5 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold font-serif-islamic text-slate-900">
                Direktori & Verifikasi Data Santri
              </h3>
              <p className="text-xs text-slate-500">
                Pencarian data santri aktif berdasarkan NIS, nama, atau prestasi.
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama, NIS, kota asal..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 bg-slate-50"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Jenjang:</span>
            </div>
            {['Semua', 'MTs Bustanul Ulum', 'MA Bustanul Ulum', 'Tahfidz Takhassus'].map((j) => (
              <button
                key={j}
                onClick={() => setFilterJenjang(j)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filterJenjang === j
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {j}
              </button>
            ))}

            <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>

            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span>Santri:</span>
            </div>
            {['Semua', 'Putra', 'Putri'].map((g) => (
              <button
                key={g}
                onClick={() => setFilterGender(g)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filterGender === g
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Santri Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSantri.map((santri) => (
            <div
              key={santri.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <span className="font-mono text-xs font-bold text-emerald-800">
                    NIS: {santri.nis}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {santri.jenisKelamin}
                  </span>
                </div>

                <h4 className="text-base font-bold font-serif-islamic text-slate-900 mb-1">
                  {santri.nama}
                </h4>
                <p className="text-xs font-medium text-emerald-700 mb-3">
                  {santri.kelas}
                </p>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Asal: {santri.asalKota}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Hafalan: <strong className="text-slate-900">{santri.hafalan}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="line-clamp-1">Prestasi: {santri.prestasi}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex justify-between items-center">
                <span>{santri.kamar}</span>
                <span className="text-emerald-800 font-semibold">Santri Aktif</span>
              </div>
            </div>
          ))}
        </div>

        {filteredSantri.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-700">Data santri tidak ditemukan.</p>
            <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau filter jenjang.</p>
          </div>
        )}
      </div>
    </section>
  );
};
