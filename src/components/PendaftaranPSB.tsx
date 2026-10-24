import React, { useState } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import { PendaftarSantri } from '../types';
import {
  FileText,
  Search,
  CheckCircle,
  Clock,
  Printer,
  X,
  Send,
  BookOpen,
  GraduationCap
} from 'lucide-react';

export const PendaftaranPSB: React.FC = () => {
  const { data, registerSantri } = usePesantren();

  const [activeTab, setActiveTab] = useState<'form' | 'status' | 'syarat'>('form');

  // Form State
  const [formData, setFormData] = useState({
    namaLengkap: '',
    nisn: '',
    jenisKelamin: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    tempatLahir: '',
    tanggalLahir: '',
    alamat: '',
    asalSekolah: '',
    jenjangTujuan: 'MTs Bustanul Ulum' as PendaftarSantri['jenjangTujuan'],
    namaAyah: '',
    pekerjaanAyah: '',
    namaIbu: '',
    noHpWhatsapp: ''
  });

  const [formSubmittedRegistration, setFormSubmittedRegistration] = useState<PendaftarSantri | null>(null);

  // Status Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<PendaftarSantri | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaLengkap || !formData.nisn || !formData.noHpWhatsapp) {
      alert('Mohon lengkapi nama calon santri, NISN, dan nomor WhatsApp.');
      return;
    }

    const newApplicant = registerSantri({
      namaLengkap: formData.namaLengkap,
      nisn: formData.nisn,
      jenisKelamin: formData.jenisKelamin,
      tempatLahir: formData.tempatLahir,
      tanggalLahir: formData.tanggalLahir,
      alamat: formData.alamat,
      asalSekolah: formData.asalSekolah,
      jenjangTujuan: formData.jenjangTujuan,
      namaAyah: formData.namaAyah,
      pekerjaanAyah: formData.pekerjaanAyah,
      namaIbu: formData.namaIbu,
      noHpWhatsapp: formData.noHpWhatsapp
    });

    setFormSubmittedRegistration(newApplicant);
    // Reset form
    setFormData({
      namaLengkap: '',
      nisn: '',
      jenisKelamin: 'Laki-laki',
      tempatLahir: '',
      tanggalLahir: '',
      alamat: '',
      asalSekolah: '',
      jenjangTujuan: 'MTs Bustanul Ulum',
      namaAyah: '',
      pekerjaanAyah: '',
      namaIbu: '',
      noHpWhatsapp: ''
    });
  };

  const handleSearchStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.trim().toLowerCase();
    const found = data.pendaftarList.find(
      (p) =>
        p.nomorRegistrasi.toLowerCase() === q ||
        p.nisn.toLowerCase() === q ||
        p.namaLengkap.toLowerCase().includes(q)
    );

    setSearchResult(found || null);
    setHasSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="pendaftaran-psb" className="py-20 bg-white border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <span>Sistem Informasi PSB 2026/2027</span>
            <span className="text-slate-300">·</span>
            <span className="text-amber-700">Pendaftaran Online</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-islamic text-slate-900">
            Penerimaan Santri Baru (PSB Online)
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            Bergabunglah bersama keluarga besar Pondok Pesantren Bustanul Ulum. Pendaftaran praktis, cepat, dan terintegrasi secara digital.
          </p>

          {/* Navigation Tabs */}
          <div className="inline-flex p-1.5 bg-slate-100 rounded-xl mt-8 border border-slate-200 max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'form'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Formulir Pendaftaran
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'status'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cek Status Pendaftaran
            </button>
            <button
              onClick={() => setActiveTab('syarat')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'syarat'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Alur & Syarat Pendaftaran
            </button>
          </div>
        </div>

        {/* TAB 1: FORM PENDAFTARAN */}
        {activeTab === 'form' && (
          <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif-islamic text-slate-900">
                  Formulir Pendaftaran Calon Santri Baru
                </h3>
                <p className="text-xs text-slate-500">
                  Mohon isi data calon santri dan orang tua dengan benar dan valid.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Bagian 1: Data Santri */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-800 mb-4 pb-1 border-b border-slate-200 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[11px] flex items-center justify-center">1</span>
                  <span>Data Pribadi Calon Santri</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap Santri *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.namaLengkap}
                      onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                      placeholder="Contoh: Muhammad Azzam Al-Fatih"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor Induk Siswa Nasional (NISN) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nisn}
                      onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                      placeholder="10 digit nomor NISN"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Jenis Kelamin *
                    </label>
                    <select
                      value={formData.jenisKelamin}
                      onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as 'Laki-laki' | 'Perempuan' })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="Laki-laki">Laki-laki (Santri Putra)</option>
                      <option value="Perempuan">Perempuan (Santriwati Putri)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tempat Lahir
                    </label>
                    <input
                      type="text"
                      value={formData.tempatLahir}
                      onChange={(e) => setFormData({ ...formData, tempatLahir: e.target.value })}
                      placeholder="Kota Kelahiran"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      value={formData.tanggalLahir}
                      onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Asal Sekolah / Madrasah Sebelumnya
                    </label>
                    <input
                      type="text"
                      value={formData.asalSekolah}
                      onChange={(e) => setFormData({ ...formData, asalSekolah: e.target.value })}
                      placeholder="Contoh: SD Islam Terpadu / MI Miftahul Huda"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Alamat Domisili Lengkap
                    </label>
                    <textarea
                      rows={2}
                      value={formData.alamat}
                      onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                      placeholder="Nama jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten, Kode Pos"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Bagian 2: Pilihan Jenjang */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-800 mb-4 pb-1 border-b border-slate-200 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[11px] flex items-center justify-center">2</span>
                  <span>Jenjang Pendidikan Pesantren yang Dituju</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'MTs Bustanul Ulum',
                    'MA Bustanul Ulum',
                    'Tahfidz Khusus (Takhassus)',
                    'Madrasah Diniyah Salafiyah'
                  ].map((j) => (
                    <label
                      key={j}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formData.jenjangTujuan === j
                          ? 'bg-emerald-50 border-emerald-700 ring-2 ring-emerald-700/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="jenjangTujuan"
                        value={j}
                        checked={formData.jenjangTujuan === j}
                        onChange={(e) =>
                          setFormData({ ...formData, jenjangTujuan: e.target.value as PendaftarSantri['jenjangTujuan'] })
                        }
                        className="text-emerald-700 focus:ring-emerald-700"
                      />
                      <div>
                        <div className="text-sm font-bold text-slate-900">{j}</div>
                        <div className="text-xs text-slate-500">Program Berasrama Penuh (Boarding)</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bagian 3: Data Orang Tua / Wali */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-800 mb-4 pb-1 border-b border-slate-200 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[11px] flex items-center justify-center">3</span>
                  <span>Data Orang Tua / Wali & Kontak</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Ayah Kandung
                    </label>
                    <input
                      type="text"
                      value={formData.namaAyah}
                      onChange={(e) => setFormData({ ...formData, namaAyah: e.target.value })}
                      placeholder="Nama lengkap ayah"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pekerjaan Ayah
                    </label>
                    <input
                      type="text"
                      value={formData.pekerjaanAyah}
                      onChange={(e) => setFormData({ ...formData, pekerjaanAyah: e.target.value })}
                      placeholder="PNS / Swasta / Wiraswasta / dll"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Ibu Kandung
                    </label>
                    <input
                      type="text"
                      value={formData.namaIbu}
                      onChange={(e) => setFormData({ ...formData, namaIbu: e.target.value })}
                      placeholder="Nama lengkap ibu"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp Aktif Orang Tua *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.noHpWhatsapp}
                      onChange={(e) => setFormData({ ...formData, noHpWhatsapp: e.target.value })}
                      placeholder="Contoh: 081234567890"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500 text-center sm:text-left">
                  Dengan mengklik tombol daftar, data Anda akan langsung terverifikasi oleh panitia PSB Bustanul Ulum.
                </p>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-700"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Kirim Pendaftaran Santri Baru</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: CEK STATUS PENDAFTARAN */}
        {activeTab === 'status' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-8">
              <h3 className="text-xl font-bold font-serif-islamic text-slate-900 mb-2">
                Pencarian Status Pendaftaran
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Masukkan Nomor Registrasi (Contoh: <span className="font-mono text-emerald-800 font-semibold">PSB-BU-2026-001</span>), NISN, atau Nama Santri.
              </p>

              <form onSubmit={handleSearchStatus} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ketik Nomor Registrasi / NISN / Nama..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm cursor-pointer transition-colors shadow-xs"
                >
                  Cek Status
                </button>
              </form>
            </div>

            {/* Result Display */}
            {hasSearched && (
              searchResult ? (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
                    <div>
                      <span className="text-xs text-slate-500">Nomor Registrasi Resmi</span>
                      <h4 className="text-xl font-bold font-mono text-emerald-800">
                        {searchResult.nomorRegistrasi}
                      </h4>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Status: {searchResult.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700 mb-6">
                    <div>
                      <span className="text-xs text-slate-400 block">Nama Calon Santri:</span>
                      <span className="font-semibold text-slate-900">{searchResult.namaLengkap}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">NISN:</span>
                      <span className="font-mono text-slate-900">{searchResult.nisn}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">Jenjang Tujuan:</span>
                      <span className="font-medium text-emerald-800">{searchResult.jenjangTujuan}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">Tanggal Pendaftaran:</span>
                      <span>{searchResult.tanggalDaftar}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">Nama Wali:</span>
                      <span>{searchResult.namaAyah || searchResult.namaIbu}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">No. WhatsApp:</span>
                      <span>{searchResult.noHpWhatsapp}</span>
                    </div>
                  </div>

                  {searchResult.catatanPengurus && (
                    <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 mb-6">
                      <span className="font-bold block mb-1">Catatan Panitia PSB:</span>
                      <p>{searchResult.catatanPengurus}</p>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={() => setFormSubmittedRegistration(searchResult)}
                      className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-300"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Cetak Bukti Pendaftaran</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 p-6">
                  <p className="text-sm font-semibold text-slate-800 mb-1">
                    Data pendaftaran tidak ditemukan.
                  </p>
                  <p className="text-xs text-slate-500">
                    Pastikan nomor registrasi atau NISN yang Anda masukkan sudah benar, atau hubungi Layanan Live Chat / Panitia PSB.
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* TAB 3: ALUR & SYARAT PENDAFTARAN */}
        {activeTab === 'syarat' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* 4 Tahapan Alur */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
              <h3 className="text-xl font-bold font-serif-islamic text-slate-900 mb-6">
                Alur Tahapan Seleksi PSB Santri Baru
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs mb-3">
                    01
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Daftar Online</h4>
                  <p className="text-xs text-slate-600">Mengisi formulir PSB di website dan mencetak kartu bukti registrasi.</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs mb-3">
                    02
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Verifikasi Berkas</h4>
                  <p className="text-xs text-slate-600">Penyerahan dokumen administrasi santri ke sekretariat / upload via WhatsApp.</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs mb-3">
                    03
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Tes Ujian Masuk</h4>
                  <p className="text-xs text-slate-600">Tes baca Qur'an, praktik ibadah sholat, akademik dasar & wawancara wali.</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs mb-3">
                    04
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Daftar Ulang</h4>
                  <p className="text-xs text-slate-600">Pengumuman kelulusan, pelunasan administrasi, dan penempatan kamar santri.</p>
                </div>
              </div>
            </div>

            {/* Syarat Berkas Administrasi */}
            <div className="bg-emerald-50/50 rounded-2xl p-6 sm:p-8 border border-emerald-100">
              <h3 className="text-xl font-bold font-serif-islamic text-slate-900 mb-4">
                Dokumen Persyaratan Administrasi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-emerald-100">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Fotokopi Kartu Keluarga (KK) 2 lembar</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-emerald-100">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Fotokopi Akta Kelahiran 2 lembar</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-emerald-100">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Fotokopi Ijazah / SKL yang telah dilegalisir</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-emerald-100">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Surat Keterangan Sehat dari Dokter / Puskesmas</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-emerald-100">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Pas Foto 3x4 berwarna (4 lembar, latar biru)</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-emerald-100">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Surat Keterangan Berkelakuan Baik dari sekolah asal</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL KARTU BUKTI PENDAFTARAN RESMI (PRINTABLE) */}
        {formSubmittedRegistration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[95vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-800">Pendaftaran Berhasil Terkirim</span>
                </div>
                <button
                  onClick={() => setFormSubmittedRegistration(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  aria-label="Tutup bukti"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Printable Card Area */}
              <div id="printable-registration-card" className="my-6 p-6 rounded-2xl bg-slate-50 border-2 border-emerald-800/40 relative">
                {/* Header Kop Surat Pesantren */}
                <div className="flex items-center gap-4 pb-4 border-b-2 border-emerald-900/30 mb-4 text-center sm:text-left">
                  {data.profil.logo && (
                    <img
                      src={data.profil.logo}
                      alt={data.profil.nama}
                      className="w-16 h-16 object-contain shrink-0 mx-auto sm:mx-0"
                    />
                  )}
                  <div className="flex-1">
                    <span className="text-xs font-serif-islamic text-amber-700 tracking-wider block">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-serif-islamic text-slate-900 uppercase">
                      {data.profil.nama}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Panitia Penerimaan Santri Baru (PSB) Tahun Ajaran 2026/2027
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {data.profil.alamat} | Telp: {data.profil.telepon}
                    </p>
                  </div>
                </div>

                {/* Card Title & Code */}
                <div className="text-center mb-5">
                  <span className="text-xs uppercase tracking-widest font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
                    Kartu Bukti Pendaftaran Santri Baru
                  </span>
                  <div className="text-lg font-mono font-bold text-slate-900 mt-2">
                    {formSubmittedRegistration.nomorRegistrasi}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Tanggal Registrasi: {formSubmittedRegistration.tanggalDaftar}
                  </div>
                </div>

                {/* Data Fields */}
                <div className="space-y-2 text-xs text-slate-800">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Nama Calon Santri:</span>
                    <span className="font-bold text-slate-900">{formSubmittedRegistration.namaLengkap}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">NISN:</span>
                    <span className="font-mono">{formSubmittedRegistration.nisn}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Jenis Kelamin:</span>
                    <span>{formSubmittedRegistration.jenisKelamin}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Jenjang Pilihan:</span>
                    <span className="font-semibold text-emerald-800">{formSubmittedRegistration.jenjangTujuan}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Orang Tua / Wali:</span>
                    <span>{formSubmittedRegistration.namaAyah || formSubmittedRegistration.namaIbu}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Kontak WhatsApp:</span>
                    <span>{formSubmittedRegistration.noHpWhatsapp}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Status Saat Ini:</span>
                    <span className="font-bold text-amber-700">{formSubmittedRegistration.status}</span>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <p className="font-semibold text-slate-800">Petunjuk Selanjutnya:</p>
                  <p>1. Simpan atau cetak kartu bukti pendaftaran ini.</p>
                  <p>2. Konfirmasi ke panitia via WhatsApp resmi pesantren dengan melampirkan kartu ini.</p>
                  <p>3. Jadwal ujian seleksi akan diinformasikan melalui nomor WhatsApp terdaftar.</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4 text-amber-300" />
                  <span>Cetak / Unduh Kartu (PDF)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormSubmittedRegistration(null)}
                  className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
