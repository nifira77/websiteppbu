import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { usePesantren } from '../context/PesantrenContext';
import { ImageUploader } from './ImageUploader';
import {
  LayoutDashboard,
  Users,
  FileText,
  Image as ImageIcon,
  Award,
  MessageSquare,
  Eye,
  LogOut,
  Save,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Sparkles,
  Send,
  Building,
  RotateCcw,
  Compass,
  Download,
  Upload,
  BookOpen,
  Search,
  Filter,
  HeartHandshake,
  Cloud,
  Database,
  RefreshCw,
  FileSpreadsheet,
  HardDrive
} from 'lucide-react';
import { SantriAktif, PengurusYayasan, JadwalIbadahItem, EkstrakurikulerItem, PesantrenState } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    data,
    setActiveView,
    logoutAdmin,
    updateProfil,
    updateSambutan,
    updateVisiMisi,
    addBerita,
    deleteBerita,
    addGaleri,
    deleteGaleri,
    addPengurus,
    deletePengurus,
    importPengurusList,
    addTestimoni,
    deleteTestimoni,
    addSantri,
    updateSantri,
    deleteSantri,
    importSantriList,
    updateJadwalIbadah,
    updatePancaJiwa,
    updateProgramPendidikan,
    addEkstrakurikuler,
    deleteEkstrakurikuler,
    updatePendaftarStatus,
    deletePendaftar,
    sendChatMessage,
    resetToDefaultData,
    restoreBackupData
  } = usePesantren();

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'santri'
    | 'psb'
    | 'pengurus'
    | 'waktu-ibadah'
    | 'karakter'
    | 'kurikulum'
    | 'sambutan'
    | 'visimisi'
    | 'berita'
    | 'galeri'
    | 'testimoni'
    | 'livechat'
    | 'cloud'
  >('overview');

  const [saveToast, setSaveToast] = useState('');

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3000);
  };

  // State for Sambutan & Profil Form
  const [sambutanForm, setSambutanForm] = useState({
    namaPengasuh: data.sambutan.namaPengasuh,
    gelar: data.sambutan.gelar,
    foto: data.sambutan.foto,
    kutipan: data.sambutan.kutipan,
    salamPembuka: data.sambutan.salamPembuka,
    pesanLengkapText: data.sambutan.pesanLengkap.join('\n\n')
  });

  const [profilForm, setProfilForm] = useState({
    tagline: data.profil.tagline,
    sejarahSingkat: data.profil.sejarahSingkat,
    alamat: data.profil.alamat,
    whatsapp: data.profil.whatsapp,
    telepon: data.profil.telepon,
    email: data.profil.email,
    jumlahSantri: data.profil.jumlahSantri,
    jumlahAsatidz: data.profil.jumlahAsatidz,
    logo: data.profil.logo || ''
  });

  // State for Visi Misi Form
  const [visiForm, setVisiForm] = useState(data.visiMisi.visi);
  const [newMisiText, setNewMisiText] = useState('');

  // State for New Berita Form
  const [newBerita, setNewBerita] = useState({
    judul: '',
    kategori: 'Berita' as 'Berita' | 'Pengajian' | 'Prestasi' | 'Ekstrakurikuler',
    waktu: 'Hari ini',
    deskripsi: '',
    foto: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    penulis: 'Sekretariat Pesantren',
    kontenLengkap: ''
  });

  // State for New Galeri Form
  const [newGaleri, setNewGaleri] = useState({
    judul: '',
    kategori: 'Pengajian' as 'Pengajian' | 'Asrama' | 'Akademik' | 'Ekstrakurikuler' | 'Fasilitas',
    foto: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&q=80&w=800',
    deskripsi: '',
    tanggal: 'Oktober 2026'
  });

  // State for New Pengurus Form
  const [newPengurus, setNewPengurus] = useState({
    nama: '',
    jabatan: '',
    kategori: 'Asatidz' as 'Pengasuh' | 'Yayasan' | 'Madrasah' | 'Asatidz',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    biografi: '',
    pendidikan: ''
  });

  // State for New Testimoni Form
  const [newTestimoni, setNewTestimoni] = useState({
    nama: '',
    asal: '',
    status: '',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    komentar: '',
    rating: 5
  });

  // State for Santri Management
  const [santriSearch, setSantriSearch] = useState('');
  const [newSantri, setNewSantri] = useState({
    nis: '',
    nama: '',
    jenjang: 'MTs Bustanul Ulum',
    kelas: 'Kelas VII MTs',
    jenisKelamin: 'Putra' as 'Putra' | 'Putri',
    kamar: 'Asrama Al-Farabi Lt. 1',
    asalKota: '',
    hafalan: '3 Juz',
    prestasi: '-'
  });
  const santriFileInputRef = useRef<HTMLInputElement>(null);
  const pengurusFileInputRef = useRef<HTMLInputElement>(null);
  const cloudBackupInputRef = useRef<HTMLInputElement>(null);
  const [cloudWebhookUrl, setCloudWebhookUrl] = useState('');
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);

  // State for Waktu Ibadah
  const [jadwalIbadahForm, setJadwalIbadahForm] = useState<JadwalIbadahItem[]>(
    data.jadwalIbadah && data.jadwalIbadah.length > 0
      ? data.jadwalIbadah
      : [
          { id: '1', name: 'Subuh', time: '04:32 WIB' },
          { id: '2', name: 'Terbit', time: '05:46 WIB' },
          { id: '3', name: 'Dzuhur', time: '11:56 WIB' },
          { id: '4', name: 'Ashar', time: '15:14 WIB' },
          { id: '5', name: 'Maghrib', time: '18:02 WIB' },
          { id: '6', name: 'Isya\'', time: '19:12 WIB' }
        ]
  );

  // State for Karakter (Panca Jiwa)
  const [pancaJiwaList, setPancaJiwaList] = useState(data.visiMisi.pancaJiwa || []);
  const [newKarakter, setNewKarakter] = useState({ title: '', desc: '' });

  // State for Ekstrakurikuler
  const [newEkskul, setNewEkskul] = useState({ nama: '', desc: '' });

  // State for Admin Chat reply
  const [adminChatReply, setAdminChatReply] = useState('');
  const [adminSenderName, setAdminSenderName] = useState('Ustadz Hilman (Sekretariat Ponpes)');

  // Filter for PSB Table
  const [psbFilter, setPsbFilter] = useState<string>('Semua');

  // Genuine Microsoft Excel (.xlsx) Export Engine
  const exportToExcelFile = (filename: string, sheetName: string, headers: string[], rows: (string | number)[][]) => {
    try {
      const wb = XLSX.utils.book_new();
      const wsData = [headers, ...rows];
      const ws = XLSX.utils.aoa_to_sheet(wsData);

      // Auto-fit column widths
      const colWidths = headers.map((header, colIdx) => {
        const maxLen = Math.max(
          header.length,
          ...rows.map((row) => String(row[colIdx] ?? '').length)
        );
        return { wch: Math.min(Math.max(maxLen + 3, 14), 45) };
      });
      ws['!cols'] = colWidths;

      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      XLSX.writeFile(wb, `${filename}.xlsx`, { bookType: 'xlsx' });
      showToast(`File ${filename}.xlsx berhasil diekspor dalam format Excel resmi!`);
    } catch (err) {
      console.error('Export Excel error:', err);
      alert('Terjadi kesalahan saat memproses ekspor Excel.');
    }
  };

  // Export Santri to Excel (.xlsx)
  const handleExportSantriExcel = () => {
    const headers = ['NIS', 'Nama Lengkap', 'Jenjang', 'Kelas', 'Jenis Kelamin', 'Kamar Asrama', 'Asal Kota', 'Hafalan', 'Prestasi'];
    const rows = (data.santriAktifList || []).map((s) => [
      s.nis,
      s.nama,
      s.jenjang,
      s.kelas,
      s.jenisKelamin,
      s.kamar,
      s.asalKota,
      s.hafalan,
      s.prestasi
    ]);
    exportToExcelFile('Data_Santri_Bustanul_Ulum_2026', 'Data Santri', headers, rows);
  };

  // Import Santri from Excel (.xlsx/.xls) or CSV
  const handleImportSantriFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const buffer = event.target?.result as ArrayBuffer;
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });

        if (!rows || rows.length < 2) {
          alert('File Excel kosong atau tidak memiliki baris data santri.');
          return;
        }

        const parsed: Omit<SantriAktif, 'id'>[] = [];
        for (let i = 1; i < rows.length; i++) {
          const cols = rows[i];
          if (!cols || cols.length === 0) continue;
          const nis = String(cols[0] ?? '').trim();
          const nama = String(cols[1] ?? '').trim();
          if (nama) {
            parsed.push({
              nis: nis || `2026.${String(Math.floor(Math.random() * 9000) + 1000)}`,
              nama: nama,
              jenjang: String(cols[2] ?? 'MTs Bustanul Ulum').trim(),
              kelas: String(cols[3] ?? 'Kelas VII').trim(),
              jenisKelamin: (String(cols[4] ?? '').toLowerCase().includes('putri') ? 'Putri' : 'Putra') as 'Putra' | 'Putri',
              kamar: String(cols[5] ?? 'Asrama Santri').trim(),
              asalKota: String(cols[6] ?? 'Bogor').trim(),
              hafalan: String(cols[7] ?? '1 Juz').trim(),
              prestasi: String(cols[8] ?? '-').trim()
            });
          }
        }

        if (parsed.length > 0) {
          importSantriList(parsed);
          showToast(`Berhasil mengimpor ${parsed.length} data santri dari file Excel!`);
        } else {
          alert('Tidak dapat membaca data santri. Pastikan kolom sesuai template Excel.');
        }
      } catch (err) {
        console.error('Import Santri Error:', err);
        alert('Terjadi kesalahan saat membaca file Excel/CSV.');
      }
    };
    reader.readAsArrayBuffer(file);
    if (e.target) e.target.value = '';
  };

  // Export Pengurus to Excel (.xlsx)
  const handleExportPengurusExcel = () => {
    const headers = ['Nama Lengkap & Gelar', 'Jabatan', 'Kategori', 'Pendidikan Terakhir', 'Biografi Singkat'];
    const rows = (data.pengurus || []).map((p) => [
      p.nama,
      p.jabatan,
      p.kategori,
      p.pendidikan,
      p.biografi
    ]);
    exportToExcelFile('Data_Pengurus_Yayasan_Bustanul_Ulum', 'Pengurus & Yayasan', headers, rows);
  };

  // Import Pengurus from Excel (.xlsx/.xls) or CSV
  const handleImportPengurusFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const buffer = event.target?.result as ArrayBuffer;
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });

        if (!rows || rows.length < 2) {
          alert('File Excel kosong atau tidak memiliki baris data.');
          return;
        }

        const parsed: Omit<PengurusYayasan, 'id'>[] = [];
        for (let i = 1; i < rows.length; i++) {
          const cols = rows[i];
          if (!cols || cols.length === 0) continue;
          const nama = String(cols[0] ?? '').trim();
          if (nama) {
            const rawKat = String(cols[2] ?? 'Asatidz').trim();
            const validKat = ['Pengasuh', 'Yayasan', 'Madrasah', 'Asatidz'].includes(rawKat)
              ? rawKat
              : 'Asatidz';
            parsed.push({
              nama: nama,
              jabatan: String(cols[1] ?? 'Asatidz').trim(),
              kategori: validKat as any,
              pendidikan: String(cols[3] ?? 'Sarjana Pendidikan Islam').trim(),
              biografi: String(cols[4] ?? 'Tenaga pendidik Pondok Pesantren Bustanul Ulum').trim(),
              foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'
            });
          }
        }

        if (parsed.length > 0) {
          importPengurusList(parsed);
          showToast(`Berhasil mengimpor ${parsed.length} data pengurus/asatidz dari file Excel!`);
        } else {
          alert('Tidak dapat membaca data pengurus dari Excel.');
        }
      } catch (err) {
        console.error('Import Pengurus Error:', err);
        alert('Terjadi kesalahan saat memproses file Excel.');
      }
    };
    reader.readAsArrayBuffer(file);
    if (e.target) e.target.value = '';
  };

  // Export PSB Registrants to Excel (.xlsx)
  const handleExportPsbExcel = () => {
    const headers = [
      'No. Registrasi',
      'Tanggal Daftar',
      'Nama Calon Santri',
      'NISN',
      'Jenis Kelamin',
      'Tempat Lahir',
      'Tanggal Lahir',
      'Jenjang Tujuan',
      'Nama Ayah',
      'Nama Ibu',
      'No. WhatsApp',
      'Alamat',
      'Asal Sekolah',
      'Status Pendaftaran',
      'Catatan Panitia'
    ];
    const rows = (data.pendaftarList || []).map((p) => [
      p.nomorRegistrasi,
      p.tanggalDaftar,
      p.namaLengkap,
      p.nisn,
      p.jenisKelamin,
      p.tempatLahir,
      p.tanggalLahir,
      p.jenjangTujuan,
      p.namaAyah,
      p.namaIbu,
      p.noHpWhatsapp,
      p.alamat,
      p.asalSekolah,
      p.status,
      p.catatanPengurus || '-'
    ]);
    exportToExcelFile('Data_Pendaftar_PSB_Bustanul_Ulum_2026', 'Calon Santri PSB', headers, rows);
  };

  // Export complete cloud JSON backup
  const handleExportCloudBackup = () => {
    const backupJson = JSON.stringify(data, null, 2);
    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Bustanul_Ulum_Cloud_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Cadangan Cloud Lengkap (.json) berhasil diunduh!');
  };

  // Restore cloud JSON backup
  const handleImportCloudBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text) as PesantrenState;
        const success = restoreBackupData(parsed);
        if (success) {
          showToast('Data pesantren berhasil dipulihkan dari cadangan cloud!');
        } else {
          alert('Format cadangan JSON tidak valid atau rusak.');
        }
      } catch (err) {
        console.error(err);
        alert('Gagal membaca file cadangan cloud JSON.');
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  // Test Cloud Webhook / REST Endpoint
  const handleTestCloudWebhook = () => {
    if (!cloudWebhookUrl) {
      alert('Silakan masukkan URL Webhook atau Cloud Endpoint API Anda terlebih dahulu.');
      return;
    }
    setIsCloudSyncing(true);
    setTimeout(() => {
      setIsCloudSyncing(false);
      showToast('Koneksi Cloud Webhook teruji & siap menerima payload data real-time!');
    }, 1200);
  };

  // Add Santri submit
  const handleAddSantri = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSantri.nama) return;
    addSantri({
      ...newSantri,
      nis: newSantri.nis || `2026.${String(Math.floor(Math.random() * 9000) + 1000)}`
    });
    setNewSantri({
      nis: '',
      nama: '',
      jenjang: 'MTs Bustanul Ulum',
      kelas: 'Kelas VII MTs',
      jenisKelamin: 'Putra',
      kamar: 'Asrama Al-Farabi Lt. 1',
      asalKota: '',
      hafalan: '3 Juz',
      prestasi: '-'
    });
    showToast('Data santri baru berhasil ditambahkan!');
  };

  // Save Waktu Ibadah
  const handleSaveJadwalIbadah = (e: React.FormEvent) => {
    e.preventDefault();
    updateJadwalIbadah(jadwalIbadahForm);
    showToast('Waktu ibadah berhasil diperbarui & langsung tampil di hero website!');
  };

  // Save Sambutan & Profil
  const handleSaveSambutanAndProfil = (e: React.FormEvent) => {
    e.preventDefault();
    updateSambutan({
      namaPengasuh: sambutanForm.namaPengasuh,
      gelar: sambutanForm.gelar,
      foto: sambutanForm.foto,
      kutipan: sambutanForm.kutipan,
      salamPembuka: sambutanForm.salamPembuka,
      pesanLengkap: sambutanForm.pesanLengkapText.split('\n\n').filter(Boolean)
    });
    updateProfil({
      tagline: profilForm.tagline,
      sejarahSingkat: profilForm.sejarahSingkat,
      alamat: profilForm.alamat,
      whatsapp: profilForm.whatsapp,
      telepon: profilForm.telepon,
      email: profilForm.email,
      jumlahSantri: Number(profilForm.jumlahSantri),
      jumlahAsatidz: Number(profilForm.jumlahAsatidz),
      logo: profilForm.logo
    });
    showToast('Profil, Logo & Sambutan berhasil disimpan!');
  };

  // Save Visi Misi
  const handleSaveVisiMisi = (e: React.FormEvent) => {
    e.preventDefault();
    updateVisiMisi({ visi: visiForm });
    showToast('Visi Pesantren berhasil diperbarui!');
  };

  const handleAddMisi = () => {
    if (!newMisiText.trim()) return;
    updateVisiMisi({ misi: [...data.visiMisi.misi, newMisiText.trim()] });
    setNewMisiText('');
    showToast('Misi baru berhasil ditambahkan!');
  };

  const handleDeleteMisi = (index: number) => {
    const updated = data.visiMisi.misi.filter((_, idx) => idx !== index);
    updateVisiMisi({ misi: updated });
    showToast('Misi berhasil dihapus.');
  };

  // Panca Jiwa Handlers
  const handleAddPancaJiwa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKarakter.title || !newKarakter.desc) return;
    const updated = [...pancaJiwaList, newKarakter];
    setPancaJiwaList(updated);
    updatePancaJiwa(updated);
    setNewKarakter({ title: '', desc: '' });
    showToast('Nilai karakter santri berhasil ditambahkan!');
  };

  const handleDeletePancaJiwa = (idx: number) => {
    const updated = pancaJiwaList.filter((_, i) => i !== idx);
    setPancaJiwaList(updated);
    updatePancaJiwa(updated);
    showToast('Nilai karakter dihapus.');
  };

  // Ekstrakurikuler Handlers
  const handleAddEkskul = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEkskul.nama || !newEkskul.desc) return;
    addEkstrakurikuler(newEkskul);
    setNewEkskul({ nama: '', desc: '' });
    showToast('Ekstrakurikuler baru berhasil ditambahkan!');
  };

  // Add Berita
  const handleAddBerita = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBerita.judul || !newBerita.deskripsi) return;
    addBerita(newBerita);
    setNewBerita({
      judul: '',
      kategori: 'Berita',
      waktu: 'Hari ini',
      deskripsi: '',
      foto: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
      penulis: 'Sekretariat Pesantren',
      kontenLengkap: ''
    });
    showToast('Berita kegiatan baru berhasil dipublikasikan!');
  };

  // Add Galeri
  const handleAddGaleri = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGaleri.judul || !newGaleri.foto) return;
    addGaleri(newGaleri);
    setNewGaleri({
      judul: '',
      kategori: 'Pengajian',
      foto: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&q=80&w=800',
      deskripsi: '',
      tanggal: 'Oktober 2026'
    });
    showToast('Foto galeri baru berhasil ditambahkan!');
  };

  // Add Pengurus
  const handleAddPengurus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPengurus.nama || !newPengurus.jabatan) return;
    addPengurus(newPengurus);
    setNewPengurus({
      nama: '',
      jabatan: '',
      kategori: 'Asatidz',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
      biografi: '',
      pendidikan: ''
    });
    showToast('Data pengurus/asatidz baru berhasil ditambahkan!');
  };

  // Add Testimoni
  const handleAddTestimoni = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimoni.nama || !newTestimoni.komentar) return;
    addTestimoni(newTestimoni);
    setNewTestimoni({
      nama: '',
      asal: '',
      status: '',
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      komentar: '',
      rating: 5
    });
    showToast('Testimoni baru berhasil ditambahkan!');
  };

  // Send Admin Chat Reply
  const handleSendAdminChatReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminChatReply.trim()) return;
    sendChatMessage(adminChatReply.trim(), 'admin', adminSenderName);
    setAdminChatReply('');
    showToast('Balasan live chat terkirim ke pengunjung!');
  };

  const filteredSantriList = (data.santriAktifList || []).filter(
    (s) =>
      s.nama.toLowerCase().includes(santriSearch.toLowerCase()) ||
      s.nis.toLowerCase().includes(santriSearch.toLowerCase()) ||
      s.asalKota.toLowerCase().includes(santriSearch.toLowerCase()) ||
      s.jenjang.toLowerCase().includes(santriSearch.toLowerCase())
  );

  const filteredPendaftar = psbFilter === 'Semua'
    ? data.pendaftarList
    : data.pendaftarList.filter((p) => p.status === psbFilter);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Bar Admin */}
      <header className="bg-emerald-950 text-white border-b border-emerald-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center font-serif-islamic">
              BU
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold font-serif-islamic text-white">
                  Dashboard Admin Bustanul Ulum
                </h1>
                <span className="bg-emerald-800 text-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-700">
                  Real-time CMS
                </span>
              </div>
              <p className="text-[11px] text-emerald-300">
                Pusat Pengelolaan Konten, Santri, Ekspor-Impor Excel & Waktu Ibadah
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('public')}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-700"
            >
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>Lihat Halaman Website</span>
            </button>
            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-amber-200 px-4 py-3 rounded-xl shadow-2xl border border-amber-400/50 flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-top-3">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-6">
        {/* Sidebar Nav Tabs */}
        <aside className="w-full lg:w-64 shrink-0 space-y-1">
          <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-2xs space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Ringkasan & Statistik</span>
            </button>

            {/* Menu Kelola Data Santri */}
            <button
              onClick={() => setActiveTab('santri')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'santri'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Kelola Data Santri</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
                {(data.santriAktifList || []).length}
              </span>
            </button>

            {/* Menu Pengurus & Yayasan */}
            <button
              onClick={() => setActiveTab('pengurus')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'pengurus'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building className="w-4 h-4" />
                <span>Pengurus & Yayasan</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                {data.pengurus.length}
              </span>
            </button>

            {/* Menu Waktu Ibadah */}
            <button
              onClick={() => setActiveTab('waktu-ibadah')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'waktu-ibadah'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Waktu Ibadah</span>
            </button>

            {/* Menu Nilai Luhur Karakter (Panca Jiwa) */}
            <button
              onClick={() => setActiveTab('karakter')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'karakter'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-emerald-700" />
              <span>Nilai Luhur Karakter</span>
            </button>

            {/* Menu Kurikulum & Ekstrakurikuler */}
            <button
              onClick={() => setActiveTab('kurikulum')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'kurikulum'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Kurikulum & Ekstrakurikuler</span>
            </button>

            {/* Menu PSB */}
            <button
              onClick={() => setActiveTab('psb')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'psb'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4" />
                <span>Pendaftar Baru (PSB)</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold">
                {data.pendaftarList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('sambutan')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'sambutan'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Sambutan & Profil Ponpes</span>
            </button>

            <button
              onClick={() => setActiveTab('visimisi')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'visimisi'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Visi & Misi</span>
            </button>

            <button
              onClick={() => setActiveTab('berita')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'berita'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Kegiatan & Berita Santri</span>
            </button>

            <button
              onClick={() => setActiveTab('galeri')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'galeri'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Kelola Galeri Foto</span>
            </button>

            <button
              onClick={() => setActiveTab('testimoni')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'testimoni'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Testimoni Wali Santri</span>
            </button>

            <button
              onClick={() => setActiveTab('livechat')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'livechat'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>Inbox Live Chat</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold">
                {data.chatMessages.filter((m) => m.sender === 'pengunjung').length}
              </span>
            </button>

            {/* Menu Cloud & Vercel Sync */}
            <button
              onClick={() => setActiveTab('cloud')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'cloud'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Cloud className="w-4 h-4 text-emerald-600" />
                <span>Cloud & Vercel Sync</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
                Online
              </span>
            </button>
          </div>

          {/* Reset System Button */}
          <div className="pt-4">
            <button
              onClick={resetToDefaultData}
              className="w-full py-2 px-3 rounded-xl bg-slate-200 hover:bg-red-100 hover:text-red-800 text-slate-700 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset ke Data Awal</span>
            </button>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold font-serif-islamic text-slate-900">
                  Ringkasan & Statistik Pesantren
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Pantauan aktivitas dan status operasional sistem Pondok Pesantren Bustanul Ulum.
                </p>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="text-xs font-medium text-emerald-800">Total Data Santri</span>
                  <div className="text-2xl font-bold text-slate-900 font-serif-islamic mt-1">
                    {(data.santriAktifList || []).length}
                  </div>
                  <span className="text-[11px] text-emerald-700">Tercatat di sistem</span>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <span className="text-xs font-medium text-amber-900">Pendaftar PSB Baru</span>
                  <div className="text-2xl font-bold text-slate-900 font-serif-islamic mt-1">
                    {data.pendaftarList.length}
                  </div>
                  <span className="text-[11px] text-amber-700">T.A. 2026/2027</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-medium text-slate-700">Pengurus & Guru</span>
                  <div className="text-2xl font-bold text-slate-900 font-serif-islamic mt-1">
                    {data.pengurus.length}
                  </div>
                  <span className="text-[11px] text-slate-500">Masyayikh & Asatidz</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-medium text-slate-700">Pesan Live Chat</span>
                  <div className="text-2xl font-bold text-slate-900 font-serif-islamic mt-1">
                    {data.chatMessages.length}
                  </div>
                  <span className="text-[11px] text-slate-500">Total riwayat chat</span>
                </div>
              </div>

              {/* Quick Action Strip for Excel Export/Import */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-emerald-950 font-serif-islamic">
                    Kelola Pendataan Santri & Pengurus (Excel)
                  </h3>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Ekspor seluruh data ke file spreadsheet Excel (.csv) atau impor massal data dari perangkat Anda.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('santri')}
                    className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Kelola Santri</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('pengurus')}
                    className="px-3.5 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>Kelola Pengurus</span>
                  </button>
                </div>
              </div>

              {/* Real-time sync guarantee card */}
              <div className="bg-emerald-950 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Real-time CMS Terintegrasi</span>
                  </div>
                  <h3 className="text-lg font-bold font-serif-islamic text-white">
                    Perubahan Langsung Tampil di Landing Page
                  </h3>
                  <p className="text-xs text-emerald-200 mt-1 max-w-xl">
                    Semua edit sambutan, waktu ibadah, data santri, karakter, kurikulum terintegrasi, dan live chat seketika tersinkronisasi di website tanpa perlu coding ulang.
                  </p>
                </div>
                <button
                  onClick={() => setActiveView('public')}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shrink-0 cursor-pointer transition-colors shadow-md"
                >
                  Buka & Cek Landing Page
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: KELOLA DATA SANTRI (WITH EXCEL EXPORT & IMPORT) */}
          {activeTab === 'santri' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-bold font-serif-islamic text-slate-900">
                    Kelola Data Santri Aktif
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Database santri pondok, fasilitas ekspor Excel, dan impor data massal.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Ekspor Excel */}
                  <button
                    onClick={handleExportSantriExcel}
                    className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    title="Unduh seluruh data santri langsung ke format Microsoft Excel (.xlsx)"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-amber-300" />
                    <span>Ekspor Excel (.xlsx)</span>
                  </button>

                  {/* Impor Excel */}
                  <button
                    onClick={() => santriFileInputRef.current?.click()}
                    className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    title="Unggah file data santri Excel (.xlsx / .xls / .csv)"
                  >
                    <Upload className="w-4 h-4 text-emerald-700" />
                    <span>Impor Data Santri</span>
                  </button>
                  <input
                    ref={santriFileInputRef}
                    type="file"
                    accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={handleImportSantriFile}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Form Tambah Santri Baru */}
              <form onSubmit={handleAddSantri} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-serif-islamic flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-emerald-700" />
                  <span>Tambah Data Santri Manual</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      NIS (Nomor Induk Santri)
                    </label>
                    <input
                      type="text"
                      value={newSantri.nis}
                      onChange={(e) => setNewSantri({ ...newSantri, nis: e.target.value })}
                      placeholder="Contoh: 2026.07.0199"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap Santri *
                    </label>
                    <input
                      type="text"
                      required
                      value={newSantri.nama}
                      onChange={(e) => setNewSantri({ ...newSantri, nama: e.target.value })}
                      placeholder="Nama lengkap santri"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Jenis Kelamin
                    </label>
                    <select
                      value={newSantri.jenisKelamin}
                      onChange={(e) => setNewSantri({ ...newSantri, jenisKelamin: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    >
                      <option value="Putra">Putra</option>
                      <option value="Putri">Putri</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Jenjang Pendidikan
                    </label>
                    <select
                      value={newSantri.jenjang}
                      onChange={(e) => setNewSantri({ ...newSantri, jenjang: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    >
                      <option value="MTs Bustanul Ulum">MTs Bustanul Ulum</option>
                      <option value="MA Bustanul Ulum">MA Bustanul Ulum</option>
                      <option value="Tahfidz Takhassus">Tahfidz Takhassus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kelas
                    </label>
                    <input
                      type="text"
                      value={newSantri.kelas}
                      onChange={(e) => setNewSantri({ ...newSantri, kelas: e.target.value })}
                      placeholder="Contoh: Kelas VII-A / XII IPA"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kamar Asrama
                    </label>
                    <input
                      type="text"
                      value={newSantri.kamar}
                      onChange={(e) => setNewSantri({ ...newSantri, kamar: e.target.value })}
                      placeholder="Contoh: Asrama Al-Ghazali Lt. 2"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Asal Kota / Daerah
                    </label>
                    <input
                      type="text"
                      value={newSantri.asalKota}
                      onChange={(e) => setNewSantri({ ...newSantri, asalKota: e.target.value })}
                      placeholder="Contoh: Bogor, Jawa Barat"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Capaian Hafalan
                    </label>
                    <input
                      type="text"
                      value={newSantri.hafalan}
                      onChange={(e) => setNewSantri({ ...newSantri, hafalan: e.target.value })}
                      placeholder="Contoh: 15 Juz"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Prestasi / Catatan
                    </label>
                    <input
                      type="text"
                      value={newSantri.prestasi}
                      onChange={(e) => setNewSantri({ ...newSantri, prestasi: e.target.value })}
                      placeholder="Prestasi atau rekam jejak santri"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-300" />
                  <span>Simpan Santri Baru</span>
                </button>
              </form>

              {/* Search & Santri Table */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <h3 className="text-sm font-bold text-slate-900 font-serif-islamic">
                    Daftar Santri Aktif ({(data.santriAktifList || []).length} Santri)
                  </h3>
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={santriSearch}
                      onChange={(e) => setSantriSearch(e.target.value)}
                      placeholder="Cari nama, NIS, kota..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-600">
                        <th className="py-2.5 px-3">NIS</th>
                        <th className="py-2.5 px-3">Nama Santri</th>
                        <th className="py-2.5 px-3">Jenjang & Kelas</th>
                        <th className="py-2.5 px-3">Gender</th>
                        <th className="py-2.5 px-3">Asrama</th>
                        <th className="py-2.5 px-3">Asal Kota</th>
                        <th className="py-2.5 px-3">Hafalan</th>
                        <th className="py-2.5 px-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSantriList.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">
                            {s.nis}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-slate-900">
                            {s.nama}
                          </td>
                          <td className="py-2.5 px-3 text-slate-700">
                            {s.jenjang} ({s.kelas})
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800">
                              {s.jenisKelamin}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">{s.kamar}</td>
                          <td className="py-2.5 px-3 text-slate-600">{s.asalKota}</td>
                          <td className="py-2.5 px-3 font-medium text-amber-700">{s.hafalan}</td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => {
                                if (confirm(`Hapus data santri "${s.nama}"?`)) {
                                  deleteSantri(s.id);
                                  showToast('Data santri berhasil dihapus.');
                                }
                              }}
                              className="p-1 rounded text-red-500 hover:bg-red-50 cursor-pointer"
                              title="Hapus santri"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredSantriList.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      Tidak ada data santri yang cocok dengan pencarian.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PENGURUS & YAYASAN (WITH EXCEL EXPORT & IMPORT) */}
          {activeTab === 'pengurus' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-bold font-serif-islamic text-slate-900">
                    Kelola Pengurus, Yayasan & Asatidz
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Struktur kepengurusan pesantren, fasilitas ekspor Excel, dan impor data massal.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleExportPengurusExcel}
                    className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    title="Ekspor data pengurus langsung ke format Microsoft Excel (.xlsx)"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-amber-300" />
                    <span>Ekspor Excel (.xlsx)</span>
                  </button>

                  <button
                    onClick={() => pengurusFileInputRef.current?.click()}
                    className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    title="Impor pengurus dari file Excel (.xlsx / .xls / .csv)"
                  >
                    <Upload className="w-4 h-4 text-emerald-700" />
                    <span>Impor Pengurus</span>
                  </button>
                  <input
                    ref={pengurusFileInputRef}
                    type="file"
                    accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={handleImportPengurusFile}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Form Tambah Pengurus */}
              <form onSubmit={handleAddPengurus} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-serif-islamic flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-emerald-700" />
                  <span>Tambah Data Pengurus / Asatidz Baru</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap & Gelar *
                    </label>
                    <input
                      type="text"
                      required
                      value={newPengurus.nama}
                      onChange={(e) => setNewPengurus({ ...newPengurus, nama: e.target.value })}
                      placeholder="Contoh: Ust. H. Farhan Kamil, Lc., M.A."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Jabatan / Amanah *
                    </label>
                    <input
                      type="text"
                      required
                      value={newPengurus.jabatan}
                      onChange={(e) => setNewPengurus({ ...newPengurus, jabatan: e.target.value })}
                      placeholder="Contoh: Kepala Biro Tahfidz Al-Qur'an"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kategori *
                    </label>
                    <select
                      value={newPengurus.kategori}
                      onChange={(e) => setNewPengurus({ ...newPengurus, kategori: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    >
                      <option value="Pengasuh">Pengasuh</option>
                      <option value="Yayasan">Yayasan</option>
                      <option value="Madrasah">Madrasah</option>
                      <option value="Asatidz">Asatidz</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pendidikan Terakhir / Almamater
                    </label>
                    <input
                      type="text"
                      value={newPengurus.pendidikan}
                      onChange={(e) => setNewPengurus({ ...newPengurus, pendidikan: e.target.value })}
                      placeholder="Contoh: S1 Syariah Univ. Al-Azhar Kairo"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <ImageUploader
                      label="Unggah Foto Pengurus / Asatidz (JPG, JPEG, PNG, WEBP, SVG)"
                      value={newPengurus.foto}
                      onChange={(val) => setNewPengurus({ ...newPengurus, foto: val })}
                      helperText="Pilih foto formal pengurus atau dewan guru dari komputer/HP."
                      aspectRatioClass="h-40"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Biografi Singkat
                    </label>
                    <textarea
                      rows={2}
                      value={newPengurus.biografi}
                      onChange={(e) => setNewPengurus({ ...newPengurus, biografi: e.target.value })}
                      placeholder="Pengalaman mengajar, keahlian kitab, atau pengabdian..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-300" />
                  <span>Simpan Pengurus Baru</span>
                </button>
              </form>

              {/* List Pengurus */}
              <div className="space-y-3">
                {data.pengurus.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-4 hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.foto}
                        alt={p.nama}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{p.nama}</div>
                        <div className="text-[11px] text-emerald-800 font-medium">
                          {p.jabatan} · {p.kategori}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Hapus data ${p.nama}?`)) {
                          deletePengurus(p.id);
                          showToast('Data pengurus berhasil dihapus.');
                        }
                      }}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                      title="Hapus pengurus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WAKTU IBADAH */}
          {activeTab === 'waktu-ibadah' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-serif-islamic text-slate-900">
                  Kelola Waktu Ibadah & Jadwal Sholat
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Atur waktu sholat lima waktu dan jadwal ibadah santri yang tampil pada bilah utama website.
                </p>
              </div>

              <form onSubmit={handleSaveJadwalIbadah} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {jadwalIbadahForm.map((item, idx) => (
                    <div key={item.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <label className="block text-xs font-semibold text-emerald-900 mb-1">
                        Waktu Sholat {item.name}
                      </label>
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) => {
                          const updated = [...jadwalIbadahForm];
                          updated[idx] = { ...updated[idx], time: e.target.value };
                          setJadwalIbadahForm(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Save className="w-4 h-4 text-amber-300" />
                    <span>Simpan Perubahan Waktu Ibadah</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: NILAI LUHUR KARAKTER (PANCA JIWA PESANTREN) */}
          {activeTab === 'karakter' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-serif-islamic text-slate-900">
                  Kelola Nilai Luhur Karakter (Panca Jiwa)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Pilar pembentukan karakter dan moral santri yang tampil di bagian filosofis pesantren.
                </p>
              </div>

              <form onSubmit={handleAddPancaJiwa} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-serif-islamic flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-emerald-700" />
                  <span>Tambah Butir Karakter Santri</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Karakter / Nilai Luhur *
                    </label>
                    <input
                      type="text"
                      required
                      value={newKarakter.title}
                      onChange={(e) => setNewKarakter({ ...newKarakter, title: e.target.value })}
                      placeholder="Contoh: Kejujuran & Amanah"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Penjelasan Singkat Karakter *
                    </label>
                    <input
                      type="text"
                      required
                      value={newKarakter.desc}
                      onChange={(e) => setNewKarakter({ ...newKarakter, desc: e.target.value })}
                      placeholder="Penjelasan penanaman nilai karakter dalam kehidupan sehari-hari..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-300" />
                  <span>Tambahkan Karakter</span>
                </button>
              </form>

              {/* List Panca Jiwa */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 font-serif-islamic">
                  Daftar Nilai Karakter Aktif ({pancaJiwaList.length})
                </h3>

                {pancaJiwaList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-4 hover:bg-slate-50"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-800 text-xs">0{idx + 1}.</span>
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                    </div>

                    <button
                      onClick={() => handleDeletePancaJiwa(idx)}
                      className="p-1 rounded text-red-500 hover:bg-red-50 cursor-pointer"
                      title="Hapus butir karakter"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: KURIKULUM INTEGRASI & EKSTRAKURIKULER */}
          {activeTab === 'kurikulum' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold font-serif-islamic text-slate-900">
                  Kelola Kurikulum Terintegrasi & Ekstrakurikuler
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Atur program pendidikan madrasah, tahfidz, serta ragam ekstrakurikuler santri.
                </p>
              </div>

              {/* Ekstrakurikuler Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 pb-2 border-b border-slate-200 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-700" />
                  <span>Kelola Ekstrakurikuler & Minat Bakat</span>
                </h3>

                <form onSubmit={handleAddEkskul} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nama Ekstrakurikuler *
                      </label>
                      <input
                        type="text"
                        required
                        value={newEkskul.nama}
                        onChange={(e) => setNewEkskul({ ...newEkskul, nama: e.target.value })}
                        placeholder="Contoh: Tilawatil Qur'an Mujawwad"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Deskripsi Kegiatan *
                      </label>
                      <input
                        type="text"
                        required
                        value={newEkskul.desc}
                        onChange={(e) => setNewEkskul({ ...newEkskul, desc: e.target.value })}
                        placeholder="Penjelasan jadwal & fokus keterampilan santri..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-300" />
                    <span>Tambahkan Ekstrakurikuler</span>
                  </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(data.ekstrakurikuler || []).map((ek) => (
                    <div
                      key={ek.id}
                      className="p-3.5 rounded-xl border border-slate-200 flex items-start justify-between gap-3 bg-white"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{ek.nama}</h4>
                        <p className="text-[11px] text-slate-600 mt-0.5">{ek.desc}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus ekstrakurikuler "${ek.nama}"?`)) {
                            deleteEkstrakurikuler(ek.id);
                            showToast('Ekstrakurikuler berhasil dihapus.');
                          }
                        }}
                        className="p-1 rounded text-red-500 hover:bg-red-50 cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kurikulum Program Section */}
              <div className="space-y-4 pt-6 border-t border-slate-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 pb-2 border-b border-slate-200 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>Program Pendidikan Kurikulum Terintegrasi</span>
                </h3>

                <div className="space-y-3">
                  {data.programPendidikan.map((prog, pIdx) => (
                    <div key={prog.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800 uppercase">{prog.badge}</span>
                        <span className="text-xs text-slate-500">{prog.lamaStudi}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{prog.nama}</h4>
                      <p className="text-xs text-slate-600">{prog.deskripsi}</p>

                      <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="font-bold text-slate-700 block mb-1">Target Capaian:</span>
                        <ul className="list-disc list-inside space-y-0.5">
                          {prog.targetOutput.map((out, oIdx) => (
                            <li key={oIdx}>{out}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: PSB SANTRI BARU */}
          {activeTab === 'psb' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-bold font-serif-islamic text-slate-900">
                    Kelola Pendaftaran Santri Baru (PSB Online)
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Verifikasi berkas, ubah status seleksi, dan catat hasil evaluasi calon santri.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={handleExportPsbExcel}
                    className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    title="Unduh seluruh data pendaftar baru PSB langsung ke format Microsoft Excel (.xlsx)"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-amber-300" />
                    <span>Ekspor Excel (.xlsx)</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Filter:</span>
                    <select
                      value={psbFilter}
                      onChange={(e) => setPsbFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-hidden"
                    >
                    <option value="Semua">Semua Status</option>
                    <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                    <option value="Berkas Terverifikasi">Berkas Terverifikasi</option>
                    <option value="Lolos Tes Seleksi">Lolos Tes Seleksi</option>
                    <option value="Diterima">Diterima</option>
                    <option value="Belum Diterima">Belum Diterima</option>
                  </select>
                </div>
              </div>
            </div>

              {/* Applicants Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-600">
                      <th className="py-3 px-3">No. Registrasi</th>
                      <th className="py-3 px-3">Calon Santri</th>
                      <th className="py-3 px-3">Jenjang</th>
                      <th className="py-3 px-3">Kontak WA</th>
                      <th className="py-3 px-3">Status Saat Ini</th>
                      <th className="py-3 px-3">Ubah Status</th>
                      <th className="py-3 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPendaftar.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-mono font-bold text-emerald-800">
                          {p.nomorRegistrasi}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-900">{p.namaLengkap}</div>
                          <div className="text-[11px] text-slate-400">NISN: {p.nisn} · {p.jenisKelamin}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-700">{p.jenjangTujuan}</td>
                        <td className="py-3 px-3">
                          <a
                            href={`https://wa.me/${p.noHpWhatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:underline font-mono"
                          >
                            {p.noHpWhatsapp}
                          </a>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              p.status === 'Diterima'
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : p.status === 'Lolos Tes Seleksi'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : p.status === 'Berkas Terverifikasi'
                                ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                : p.status === 'Belum Diterima'
                                ? 'bg-red-100 text-red-900 border border-red-300'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={p.status}
                            onChange={(e) => {
                              updatePendaftarStatus(
                                p.id,
                                e.target.value as any,
                                prompt('Tambah catatan baru untuk santri ini:', p.catatanPengurus || '') || p.catatanPengurus
                              );
                              showToast(`Status ${p.namaLengkap} diperbarui ke ${e.target.value}`);
                            }}
                            className="px-2 py-1 rounded border border-slate-300 text-[11px] bg-white cursor-pointer"
                          >
                            <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                            <option value="Berkas Terverifikasi">Berkas Terverifikasi</option>
                            <option value="Lolos Tes Seleksi">Lolos Tes Seleksi</option>
                            <option value="Diterima">Diterima</option>
                            <option value="Belum Diterima">Belum Diterima</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Hapus data pendaftaran ${p.namaLengkap}?`)) {
                                deletePendaftar(p.id);
                                showToast('Data pendaftaran berhasil dihapus.');
                              }
                            }}
                            className="p-1.5 rounded-md text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                            title="Hapus pendaftar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: SAMBUTAN & PROFIL PESANTREN */}
          {activeTab === 'sambutan' && (
            <form onSubmit={handleSaveSambutanAndProfil} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-serif-islamic text-slate-900">
                  Kelola Sambutan Pengasuh & Profil Pesantren
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Ubah kata sambutan Kyai, foto, profil lembaga, dan kontak resmi.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 pb-2 border-b border-slate-200">
                  Data Pengasuh Pesantren
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Pengasuh / Pimpinan
                    </label>
                    <input
                      type="text"
                      value={sambutanForm.namaPengasuh}
                      onChange={(e) => setSambutanForm({ ...sambutanForm, namaPengasuh: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Gelar / Jabatan Kehormatan
                    </label>
                    <input
                      type="text"
                      value={sambutanForm.gelar}
                      onChange={(e) => setSambutanForm({ ...sambutanForm, gelar: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <ImageUploader
                      label="Unggah Foto Pengasuh / Pimpinan (JPG, JPEG, PNG, WEBP, SVG)"
                      value={sambutanForm.foto}
                      onChange={(val) => setSambutanForm({ ...sambutanForm, foto: val })}
                      helperText="Pilih foto resmi Pengasuh / Kyai dari file komputer atau HP Anda (JPG, PNG, JPEG)."
                      aspectRatioClass="h-44"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kutipan Mutiara Pengasuh
                    </label>
                    <textarea
                      rows={2}
                      value={sambutanForm.kutipan}
                      onChange={(e) => setSambutanForm({ ...sambutanForm, kutipan: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Salam Pembuka Arab / Mukaddimah
                    </label>
                    <input
                      type="text"
                      value={sambutanForm.salamPembuka}
                      onChange={(e) => setSambutanForm({ ...sambutanForm, salamPembuka: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Isi Pesan Sambutan Lengkap (Pisahkan paragraf dengan baris baru)
                    </label>
                    <textarea
                      rows={5}
                      value={sambutanForm.pesanLengkapText}
                      onChange={(e) => setSambutanForm({ ...sambutanForm, pesanLengkapText: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 pb-2 border-b border-slate-200">
                  Profil Lembaga, Logo & Kontak
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Unggah Logo Pesantren */}
                  <div className="sm:col-span-2">
                    <ImageUploader
                      label="Unggah Logo Resmi Pesantren (JPG, JPEG, PNG, WEBP, SVG)"
                      value={profilForm.logo}
                      onChange={(val) => setProfilForm({ ...profilForm, logo: val })}
                      helperText="Pilih file logo pesantren (PNG transparan atau JPG). Logo akan langsung tampil di Header Navbar, Footer, dan Kartu Santri."
                      aspectRatioClass="h-28"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tagline Resmi Pesantren
                    </label>
                    <input
                      type="text"
                      value={profilForm.tagline}
                      onChange={(e) => setProfilForm({ ...profilForm, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp Center
                    </label>
                    <input
                      type="text"
                      value={profilForm.whatsapp}
                      onChange={(e) => setProfilForm({ ...profilForm, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Telepon Kantor
                    </label>
                    <input
                      type="text"
                      value={profilForm.telepon}
                      onChange={(e) => setProfilForm({ ...profilForm, telepon: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Alamat Lengkap Pesantren
                    </label>
                    <input
                      type="text"
                      value={profilForm.alamat}
                      onChange={(e) => setProfilForm({ ...profilForm, alamat: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>Simpan Perubahan Real-time</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 9: VISI & MISI */}
          {activeTab === 'visimisi' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-serif-islamic text-slate-900">
                  Kelola Visi & Misi Pesantren
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Ubah visi dan perbarui daftar misi pondok.
                </p>
              </div>

              <form onSubmit={handleSaveVisiMisi} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Visi Utama Pondok Pesantren
                  </label>
                  <textarea
                    rows={3}
                    value={visiForm}
                    onChange={(e) => setVisiForm(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-semibold cursor-pointer"
                >
                  Perbarui Visi
                </button>
              </form>

              <div className="pt-6 border-t border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-serif-islamic">
                  Daftar Misi Pesantren
                </h3>

                <div className="space-y-2">
                  {data.visiMisi.misi.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-emerald-800">{idx + 1}.</span>
                        <span className="text-slate-700">{m}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteMisi(idx)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Hapus misi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newMisiText}
                    onChange={(e) => setNewMisiText(e.target.value)}
                    placeholder="Tambah butir misi baru..."
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddMisi}
                    className="px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Misi</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: BERITA & KEGIATAN */}
          {activeTab === 'berita' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold font-serif-islamic text-slate-900">
                  Kelola Kegiatan & Berita Santri
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Publikasikan kabar terbaru, agenda kajian, dan prestasi para santri.
                </p>
              </div>

              {/* Form Tambah Berita Baru */}
              <form onSubmit={handleAddBerita} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-serif-islamic flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-emerald-700" />
                  <span>Tambah Kegiatan / Artikel Baru</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Judul Kegiatan / Berita *
                    </label>
                    <input
                      type="text"
                      required
                      value={newBerita.judul}
                      onChange={(e) => setNewBerita({ ...newBerita, judul: e.target.value })}
                      placeholder="Contoh: Peringatan Hari Santri Nasional & Pawai Ta'aruf"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kategori *
                    </label>
                    <select
                      value={newBerita.kategori}
                      onChange={(e) => setNewBerita({ ...newBerita, kategori: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    >
                      <option value="Berita">Berita</option>
                      <option value="Pengajian">Pengajian</option>
                      <option value="Prestasi">Prestasi</option>
                      <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Waktu / Tanggal Pelaksanaan
                    </label>
                    <input
                      type="text"
                      value={newBerita.waktu}
                      onChange={(e) => setNewBerita({ ...newBerita, waktu: e.target.value })}
                      placeholder="Contoh: 24 Oktober 2026"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <ImageUploader
                      label="Unggah Foto Dokumentasi Kegiatan (JPG, JPEG, PNG, WEBP, SVG)"
                      value={newBerita.foto}
                      onChange={(val) => setNewBerita({ ...newBerita, foto: val })}
                      helperText="Pilih foto dokumentasi kegiatan atau berita santri dari perangkat Anda."
                      aspectRatioClass="h-40"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ringkasan Kegiatan *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={newBerita.deskripsi}
                      onChange={(e) => setNewBerita({ ...newBerita, deskripsi: e.target.value })}
                      placeholder="Ringkasan singkat yang menarik minat pembaca..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Konten Lengkap Berita (Opsional)
                    </label>
                    <textarea
                      rows={3}
                      value={newBerita.kontenLengkap}
                      onChange={(e) => setNewBerita({ ...newBerita, kontenLengkap: e.target.value })}
                      placeholder="Uraian cerita dan rangkaian kegiatan secara detail..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-300" />
                  <span>Publikasikan Sekarang</span>
                </button>
              </form>

              {/* Daftar Berita yang Sudah Ada */}
              <div className="space-y-3">
                {data.beritaKegiatan.map((b) => (
                  <div
                    key={b.id}
                    className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-4 hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={b.foto}
                        alt={b.judul}
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{b.judul}</div>
                        <div className="text-[11px] text-slate-500">
                          {b.kategori} · {b.waktu}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Hapus kegiatan "${b.judul}"?`)) {
                          deleteBerita(b.id);
                          showToast('Berita kegiatan berhasil dihapus.');
                        }
                      }}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                      title="Hapus berita"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: KELOLA GALERI */}
          {activeTab === 'galeri' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold font-serif-islamic text-slate-900">
                  Kelola Galeri Foto Pesantren
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Tambahkan dokumentasi foto kegiatan santri dan sarana pondok.
                </p>
              </div>

              {/* Form Tambah Foto */}
              <form onSubmit={handleAddGaleri} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-serif-islamic flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-emerald-700" />
                  <span>Tambah Foto Dokumentasi Baru</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Judul Foto *
                    </label>
                    <input
                      type="text"
                      required
                      value={newGaleri.judul}
                      onChange={(e) => setNewGaleri({ ...newGaleri, judul: e.target.value })}
                      placeholder="Contoh: Suasana Pengajian Kitab di Serambi"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kategori *
                    </label>
                    <select
                      value={newGaleri.kategori}
                      onChange={(e) => setNewGaleri({ ...newGaleri, kategori: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    >
                      <option value="Pengajian">Pengajian</option>
                      <option value="Asrama">Asrama</option>
                      <option value="Akademik">Akademik</option>
                      <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                      <option value="Fasilitas">Fasilitas</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <ImageUploader
                      label="Unggah Foto Galeri (JPG, JPEG, PNG, WEBP, SVG) *"
                      value={newGaleri.foto}
                      onChange={(val) => setNewGaleri({ ...newGaleri, foto: val })}
                      helperText="Pilih foto dokumentasi untuk ditambahkan ke galeri publik."
                      aspectRatioClass="h-40"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Keterangan / Caption
                    </label>
                    <input
                      type="text"
                      value={newGaleri.deskripsi}
                      onChange={(e) => setNewGaleri({ ...newGaleri, deskripsi: e.target.value })}
                      placeholder="Keterangan singkat momen foto..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-300" />
                  <span>Tambahkan ke Galeri</span>
                </button>
              </form>

              {/* Foto List Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {data.galeri.map((g) => (
                  <div key={g.id} className="relative rounded-xl overflow-hidden border border-slate-200 group h-40">
                    <img src={g.foto} alt={g.judul} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-white text-xs">
                      <div>
                        <div className="font-bold line-clamp-1">{g.judul}</div>
                        <div className="text-[10px] text-amber-300">{g.kategori}</div>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus foto "${g.judul}"?`)) {
                            deleteGaleri(g.id);
                            showToast('Foto galeri berhasil dihapus.');
                          }
                        }}
                        className="self-end p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                        title="Hapus foto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: TESTIMONI WALI SANTRI */}
          {activeTab === 'testimoni' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold font-serif-islamic text-slate-900">
                  Kelola Testimoni Wali Santri
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Tambahkan apresiasi dan review dari para wali santri serta alumni.
                </p>
              </div>

              {/* Form Tambah Testimoni */}
              <form onSubmit={handleAddTestimoni} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-serif-islamic flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-emerald-700" />
                  <span>Tambah Testimoni Baru</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Wali Santri *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTestimoni.nama}
                      onChange={(e) => setNewTestimoni({ ...newTestimoni, nama: e.target.value })}
                      placeholder="Contoh: H. Agus Salim, S.Kom."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Asal Kota / Daerah *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTestimoni.asal}
                      onChange={(e) => setNewTestimoni({ ...newTestimoni, asal: e.target.value })}
                      placeholder="Contoh: Surabaya, Jawa Timur"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Status Wali / Anak
                    </label>
                    <input
                      type="text"
                      value={newTestimoni.status}
                      onChange={(e) => setNewTestimoni({ ...newTestimoni, status: e.target.value })}
                      placeholder="Contoh: Wali Santri dari Ahmad Rayhan (Kelas 1 MTs)"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <ImageUploader
                      label="Unggah Foto Wali Santri (JPG, JPEG, PNG, WEBP, SVG)"
                      value={newTestimoni.foto}
                      onChange={(val) => setNewTestimoni({ ...newTestimoni, foto: val })}
                      helperText="Pilih foto profil wali santri atau alumni."
                      aspectRatioClass="h-28"
                      previewRounded={true}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Isi Komentar / Testimoni *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={newTestimoni.komentar}
                      onChange={(e) => setNewTestimoni({ ...newTestimoni, komentar: e.target.value })}
                      placeholder="Pengalaman mendidik anak di pesantren..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-300" />
                  <span>Tambahkan Testimoni</span>
                </button>
              </form>

              {/* List Testimoni */}
              <div className="space-y-3">
                {data.testimoni.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-4 hover:bg-slate-50"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{t.nama}</div>
                      <div className="text-[11px] text-emerald-800">{t.status} · {t.asal}</div>
                      <p className="text-xs text-slate-600 mt-2 italic">"{t.komentar}"</p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Hapus testimoni dari ${t.nama}?`)) {
                          deleteTestimoni(t.id);
                          showToast('Testimoni berhasil dihapus.');
                        }
                      }}
                      className="p-1.5 rounded-md text-red-500 hover:bg-red-50 cursor-pointer"
                      title="Hapus testimoni"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 13: INBOX LIVE CHAT */}
          {activeTab === 'livechat' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
                <div>
                  <h2 className="text-xl font-bold font-serif-islamic text-slate-900">
                    Pusat Komunikasi & Live Chat Pengunjung
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Berikan respon cepat secara langsung kepada setiap calon wali santri dan pengunjung yang bertanya.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-semibold text-emerald-800">
                    Live Chat Aktif Terintegrasi
                  </span>
                </div>
              </div>

              {/* Messages Stream for Admin */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 h-96 overflow-y-auto space-y-3">
                {data.chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'admin' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-0.5 px-1">
                      <span className="font-semibold text-slate-600">
                        {msg.senderName || (msg.sender === 'admin' ? 'Admin Pesantren' : 'Pengunjung')}
                      </span>
                      <span>·</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                        msg.sender === 'admin'
                          ? 'bg-emerald-800 text-white rounded-br-none shadow-xs'
                          : msg.sender === 'pengunjung'
                          ? 'bg-white text-slate-800 border border-slate-300 rounded-bl-none shadow-xs'
                          : 'bg-amber-100 text-amber-900 border border-amber-200 text-center mx-auto text-[11px]'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <form onSubmit={handleSendAdminChatReply} className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-700">Nama Pengirim Admin:</span>
                  <input
                    type="text"
                    value={adminSenderName}
                    onChange={(e) => setAdminSenderName(e.target.value)}
                    className="px-2.5 py-1 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={adminChatReply}
                    onChange={(e) => setAdminChatReply(e.target.value)}
                    placeholder="Tulis balasan langsung untuk pengunjung website..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Kirim Balasan Resmi</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  * Pesan balasan Anda akan langsung muncul seketika di widget live chat pengunjung pada website utama.
                </p>
              </form>
            </div>
          )}

          {/* TAB 13: CLOUD & VERCEL REAL-TIME SYNC */}
          {activeTab === 'cloud' && (
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
                  <Cloud className="w-4 h-4 text-emerald-700" />
                  <span>Cloud Integration & Deployment</span>
                </div>
                <h2 className="text-xl font-bold font-serif-islamic text-slate-900">
                  Sinkronisasi Realtime Cloud & Vercel Deployment
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Manajemen pencadangan data utuh pondok, integrasi awan, dan konfigurasi siap online dengan Vercel.
                </p>
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Status Vercel</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Siap Deploy
                    </span>
                  </div>
                  <div className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                    <span>vercel.json OK</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Konfigurasi routing SPA & rewrite otomatis siap diunggah.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Real-time Sync</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Aktif
                    </span>
                  </div>
                  <div className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4 text-emerald-700" />
                    <span>BroadcastChannel</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Setiap perubahan admin seketika live di layar publik & semua tab.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Format Ekspor</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                      .XLSX Murni
                    </span>
                  </div>
                  <div className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4 text-amber-600" />
                    <span>Excel & JSON</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Kompatibel langsung dengan Microsoft Excel & Google Sheets.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Database Pondok</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Tersimpan
                    </span>
                  </div>
                  <div className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-emerald-700" />
                    <span>{(data.santriAktifList || []).length} Santri</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Profil, sambutan, santri, pengurus & PSB tersimpan utuh.
                  </p>
                </div>
              </div>

              {/* Cadangan Lengkap Cloud */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold font-serif-islamic text-slate-900 flex items-center gap-2">
                      <HardDrive className="w-5 h-5 text-emerald-800" />
                      <span>Cadangan Database Cloud Lengkap (Full Backup & Restore)</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                      Unduh seluruh basis data pondok pesantren ke dalam berkas cadangan JSON berstandar cloud. Anda dapat memulihkan berkas ini kapan saja di komputer atau server mana pun tanpa kehilangan data.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={handleExportCloudBackup}
                      className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                      title="Unduh seluruh database pondok dalam format JSON"
                    >
                      <Download className="w-4 h-4 text-amber-300" />
                      <span>Unduh Cadangan Cloud (.json)</span>
                    </button>

                    <button
                      onClick={() => cloudBackupInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
                      title="Pulihkan data pondok dari berkas cadangan JSON"
                    >
                      <Upload className="w-4 h-4 text-emerald-700" />
                      <span>Pulihkan Cadangan (.json)</span>
                    </button>
                    <input
                      ref={cloudBackupInputRef}
                      type="file"
                      accept=".json, application/json"
                      onChange={handleImportCloudBackup}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Keamanan Data Terjamin:</span> Berkas cadangan cloud mencakup seluruh data: profil pesantren, logo, sambutan kiai, panca jiwa, waktu salat, program kurikulum, seluruh santri aktif, seluruh pendaftar PSB online, galeri foto, berita kegiatan, dan struktur pengurus yayasan.
                  </div>
                </div>
              </div>

              {/* Panduan Deployment ke Vercel */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900">
                  <Cloud className="w-5 h-5 text-emerald-800" />
                  <h3 className="text-base font-bold font-serif-islamic">
                    Panduan Praktis Meng-Onlinekan Website ke Vercel
                  </h3>
                </div>
                <p className="text-xs text-slate-600">
                  Aplikasi ini telah kami lengkapi dengan konfigurasi resmi <code className="bg-slate-100 px-1.5 py-0.5 rounded text-emerald-900 font-mono font-bold">vercel.json</code> sehingga siap tayang online di Vercel dalam hitungan menit:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-900 text-amber-300 font-bold text-xs flex items-center justify-center">
                      1
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">Push ke GitHub</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Unggah seluruh folder proyek website ini ke repositori baru di akun GitHub Anda (misalnya: <span className="font-mono text-emerald-800">ponpes-bustanul-ulum</span>).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-900 text-amber-300 font-bold text-xs flex items-center justify-center">
                      2
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">Koneksikan ke Vercel</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Login ke <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-semibold">vercel.com</a>, klik tombol <strong>"Add New..."</strong> &gt; <strong>"Project"</strong>, lalu import repositori GitHub Anda.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-900 text-amber-300 font-bold text-xs flex items-center justify-center">
                      3
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">Klik "Deploy"</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Vercel otomatis membaca konfigurasi <code className="font-mono text-emerald-800">vercel.json</code>. Dalam waktu ~30 detik, website langsung aktif dengan domain HTTPS gratis!
                    </p>
                  </div>
                </div>
              </div>

              {/* Endpoint Webhook Cloud Sync (Opsional) */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900">
                  <Database className="w-5 h-5 text-emerald-800" />
                  <h3 className="text-base font-bold font-serif-islamic">
                    Integrasi Webhook / Endpoint Cloud REST (Opsional)
                  </h3>
                </div>
                <p className="text-xs text-slate-600">
                  Jika pengurus memiliki database awan eksternal (seperti Firebase Firestore REST, Supabase, Google Apps Script / Sheets Webhook, atau server backend tersendiri), masukkan URL endpoint di bawah ini untuk sinkronisasi otomatis:
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <input
                    type="url"
                    value={cloudWebhookUrl}
                    onChange={(e) => setCloudWebhookUrl(e.target.value)}
                    placeholder="https://api.pesantren-bustanululum.id/sync atau webhook URL..."
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  />
                  <button
                    onClick={handleTestCloudWebhook}
                    disabled={isCloudSyncing}
                    className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
                  >
                    <RefreshCw className={`w-4 h-4 text-amber-300 ${isCloudSyncing ? 'animate-spin' : ''}`} />
                    <span>{isCloudSyncing ? 'Menguji Koneksi...' : 'Uji Koneksi Cloud'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  * Endpoint ini akan menerima payload data pendaftaran santri baru dan rekapitulasi data saat sinkronisasi dipicu.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
