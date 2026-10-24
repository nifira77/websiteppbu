import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PesantrenState,
  ProfilPesantren,
  SambutanPengasuh,
  VisiMisi,
  KegiatanSantri,
  GaleriItem,
  PengurusYayasan,
  Testimoni,
  PendaftarSantri,
  ChatMessage,
  SantriAktif,
  JadwalIbadahItem,
  EkstrakurikulerItem,
  ProgramPendidikan
} from '../types';
import { initialPesantrenData } from '../data/defaultData';

interface PesantrenContextType {
  data: PesantrenState;
  // Navigation / View state
  activeView: 'public' | 'admin';
  setActiveView: (view: 'public' | 'admin') => void;
  activeMenuSection: string;
  setActiveMenuSection: (section: string) => void;
  // Auth state
  isAdminLoggedIn: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  // Admin Content Management
  updateProfil: (profil: Partial<ProfilPesantren>) => void;
  updateSambutan: (sambutan: Partial<SambutanPengasuh>) => void;
  updateVisiMisi: (visiMisi: Partial<VisiMisi>) => void;
  addBerita: (item: Omit<KegiatanSantri, 'id'>) => void;
  updateBerita: (id: string, item: Partial<KegiatanSantri>) => void;
  deleteBerita: (id: string) => void;
  addGaleri: (item: Omit<GaleriItem, 'id'>) => void;
  deleteGaleri: (id: string) => void;
  addPengurus: (item: Omit<PengurusYayasan, 'id'>) => void;
  updatePengurus: (id: string, item: Partial<PengurusYayasan>) => void;
  deletePengurus: (id: string) => void;
  importPengurusList: (newList: Omit<PengurusYayasan, 'id'>[]) => void;
  addTestimoni: (item: Omit<Testimoni, 'id'>) => void;
  deleteTestimoni: (id: string) => void;
  // Santri Management (CRUD, Import, Export)
  addSantri: (item: Omit<SantriAktif, 'id'>) => void;
  updateSantri: (id: string, item: Partial<SantriAktif>) => void;
  deleteSantri: (id: string) => void;
  importSantriList: (newList: Omit<SantriAktif, 'id'>[]) => void;
  // Waktu Ibadah Management
  updateJadwalIbadah: (items: JadwalIbadahItem[]) => void;
  // Nilai Luhur Karakter & Kurikulum & Ekstrakurikuler
  updatePancaJiwa: (items: { title: string; desc: string }[]) => void;
  updateProgramPendidikan: (items: ProgramPendidikan[]) => void;
  addEkstrakurikuler: (item: Omit<EkstrakurikulerItem, 'id'>) => void;
  updateEkstrakurikuler: (id: string, item: Partial<EkstrakurikulerItem>) => void;
  deleteEkstrakurikuler: (id: string) => void;
  // PSB Registration
  registerSantri: (santriData: Omit<PendaftarSantri, 'id' | 'nomorRegistrasi' | 'tanggalDaftar' | 'status'>) => PendaftarSantri;
  updatePendaftarStatus: (id: string, status: PendaftarSantri['status'], catatan?: string) => void;
  deletePendaftar: (id: string) => void;
  // Live Chat
  sendChatMessage: (text: string, sender: 'pengunjung' | 'admin', senderName?: string) => void;
  clearChat: () => void;
  // Reset & Backup Restore
  resetToDefaultData: () => void;
  restoreBackupData: (backupData: PesantrenState) => boolean;
}

const STORAGE_KEY = 'bustanul_ulum_pesantren_v3';
const AUTH_KEY = 'bustanul_ulum_admin_auth';

const PesantrenContext = createContext<PesantrenContextType | undefined>(undefined);

export const PesantrenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PesantrenState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialPesantrenData,
          ...parsed,
          santriAktifList: parsed.santriAktifList || initialPesantrenData.santriAktifList,
          jadwalIbadah: parsed.jadwalIbadah || initialPesantrenData.jadwalIbadah,
          ekstrakurikuler: parsed.ekstrakurikuler || initialPesantrenData.ekstrakurikuler,
          programPendidikan: parsed.programPendidikan || initialPesantrenData.programPendidikan,
          visiMisi: {
            ...initialPesantrenData.visiMisi,
            ...(parsed.visiMisi || {})
          }
        };
      }
    } catch {
      // ignore
    }
    return initialPesantrenData;
  });

  const [activeView, setActiveView] = useState<'public' | 'admin'>('public');
  const [activeMenuSection, setActiveMenuSection] = useState<string>('profil');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Sync to localStorage and broadcast real-time changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const channel = new BroadcastChannel('bustanul_ulum_realtime_sync');
        channel.postMessage({ type: 'DATA_UPDATED', payload: data });
        channel.close();
      }
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data]);

  // Listen for real-time broadcasts from other tabs/admin sessions
  useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;
    const channel = new BroadcastChannel('bustanul_ulum_realtime_sync');
    channel.onmessage = (ev) => {
      if (ev.data?.type === 'DATA_UPDATED' && ev.data.payload) {
        setData(ev.data.payload);
      }
    };
    return () => {
      channel.close();
    };
  }, []);

  const loginAdmin = (password: string): boolean => {
    if (password === 'admin123' || password === 'bustanul2026' || password === 'admin') {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(AUTH_KEY, 'true');
      } catch {
        // ignore
      }
      setIsLoginModalOpen(false);
      setActiveView('admin');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {
      // ignore
    }
    setActiveView('public');
  };

  const updateProfil = (profil: Partial<ProfilPesantren>) => {
    setData((prev) => ({
      ...prev,
      profil: { ...prev.profil, ...profil }
    }));
  };

  const updateSambutan = (sambutan: Partial<SambutanPengasuh>) => {
    setData((prev) => ({
      ...prev,
      sambutan: { ...prev.sambutan, ...sambutan }
    }));
  };

  const updateVisiMisi = (visiMisi: Partial<VisiMisi>) => {
    setData((prev) => ({
      ...prev,
      visiMisi: { ...prev.visiMisi, ...visiMisi }
    }));
  };

  const addBerita = (item: Omit<KegiatanSantri, 'id'>) => {
    const newItem: KegiatanSantri = {
      ...item,
      id: `keg-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      beritaKegiatan: [newItem, ...prev.beritaKegiatan]
    }));
  };

  const updateBerita = (id: string, item: Partial<KegiatanSantri>) => {
    setData((prev) => ({
      ...prev,
      beritaKegiatan: prev.beritaKegiatan.map((b) => (b.id === id ? { ...b, ...item } : b))
    }));
  };

  const deleteBerita = (id: string) => {
    setData((prev) => ({
      ...prev,
      beritaKegiatan: prev.beritaKegiatan.filter((b) => b.id !== id)
    }));
  };

  const addGaleri = (item: Omit<GaleriItem, 'id'>) => {
    const newItem: GaleriItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      galeri: [newItem, ...prev.galeri]
    }));
  };

  const deleteGaleri = (id: string) => {
    setData((prev) => ({
      ...prev,
      galeri: prev.galeri.filter((g) => g.id !== id)
    }));
  };

  const addPengurus = (item: Omit<PengurusYayasan, 'id'>) => {
    const newItem: PengurusYayasan = {
      ...item,
      id: `pgr-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      pengurus: [...prev.pengurus, newItem]
    }));
  };

  const updatePengurus = (id: string, item: Partial<PengurusYayasan>) => {
    setData((prev) => ({
      ...prev,
      pengurus: prev.pengurus.map((p) => (p.id === id ? { ...p, ...item } : p))
    }));
  };

  const deletePengurus = (id: string) => {
    setData((prev) => ({
      ...prev,
      pengurus: prev.pengurus.filter((p) => p.id !== id)
    }));
  };

  const importPengurusList = (newList: Omit<PengurusYayasan, 'id'>[]) => {
    const mapped: PengurusYayasan[] = newList.map((item, idx) => ({
      ...item,
      id: `pgr-import-${Date.now()}-${idx}`
    }));
    setData((prev) => ({
      ...prev,
      pengurus: [...prev.pengurus, ...mapped]
    }));
  };

  const addTestimoni = (item: Omit<Testimoni, 'id'>) => {
    const newItem: Testimoni = {
      ...item,
      id: `test-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      testimoni: [newItem, ...prev.testimoni]
    }));
  };

  const deleteTestimoni = (id: string) => {
    setData((prev) => ({
      ...prev,
      testimoni: prev.testimoni.filter((t) => t.id !== id)
    }));
  };

  // Santri Management
  const addSantri = (item: Omit<SantriAktif, 'id'>) => {
    const newItem: SantriAktif = {
      ...item,
      id: `santri-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      santriAktifList: [newItem, ...prev.santriAktifList]
    }));
  };

  const updateSantri = (id: string, item: Partial<SantriAktif>) => {
    setData((prev) => ({
      ...prev,
      santriAktifList: prev.santriAktifList.map((s) => (s.id === id ? { ...s, ...item } : s))
    }));
  };

  const deleteSantri = (id: string) => {
    setData((prev) => ({
      ...prev,
      santriAktifList: prev.santriAktifList.filter((s) => s.id !== id)
    }));
  };

  const importSantriList = (newList: Omit<SantriAktif, 'id'>[]) => {
    const mapped: SantriAktif[] = newList.map((item, idx) => ({
      ...item,
      id: `santri-import-${Date.now()}-${idx}`
    }));
    setData((prev) => ({
      ...prev,
      santriAktifList: [...mapped, ...prev.santriAktifList]
    }));
  };

  // Waktu Ibadah
  const updateJadwalIbadah = (items: JadwalIbadahItem[]) => {
    setData((prev) => ({
      ...prev,
      jadwalIbadah: items
    }));
  };

  // Panca Jiwa (Nilai Luhur Karakter)
  const updatePancaJiwa = (items: { title: string; desc: string }[]) => {
    setData((prev) => ({
      ...prev,
      visiMisi: {
        ...prev.visiMisi,
        pancaJiwa: items
      }
    }));
  };

  // Kurikulum / Program Pendidikan
  const updateProgramPendidikan = (items: ProgramPendidikan[]) => {
    setData((prev) => ({
      ...prev,
      programPendidikan: items
    }));
  };

  // Ekstrakurikuler
  const addEkstrakurikuler = (item: Omit<EkstrakurikulerItem, 'id'>) => {
    const newItem: EkstrakurikulerItem = {
      ...item,
      id: `eks-${Date.now()}`
    };
    setData((prev) => ({
      ...prev,
      ekstrakurikuler: [...prev.ekstrakurikuler, newItem]
    }));
  };

  const updateEkstrakurikuler = (id: string, item: Partial<EkstrakurikulerItem>) => {
    setData((prev) => ({
      ...prev,
      ekstrakurikuler: prev.ekstrakurikuler.map((e) => (e.id === id ? { ...e, ...item } : e))
    }));
  };

  const deleteEkstrakurikuler = (id: string) => {
    setData((prev) => ({
      ...prev,
      ekstrakurikuler: prev.ekstrakurikuler.filter((e) => e.id !== id)
    }));
  };

  // PSB
  const registerSantri = (
    santriData: Omit<PendaftarSantri, 'id' | 'nomorRegistrasi' | 'tanggalDaftar' | 'status'>
  ): PendaftarSantri => {
    const dateStr = new Date().toISOString().split('T')[0];
    const sequence = String(data.pendaftarList.length + 1).padStart(3, '0');
    const nomorRegistrasi = `PSB-BU-2026-${sequence}`;

    const newApplicant: PendaftarSantri = {
      ...santriData,
      id: `psb-${Date.now()}`,
      nomorRegistrasi,
      tanggalDaftar: dateStr,
      status: 'Menunggu Verifikasi',
      catatanPengurus: 'Pendaftaran berhasil dikirim melalui website. Menunggu verifikasi kelengkapan berkas.'
    };

    setData((prev) => ({
      ...prev,
      pendaftarList: [newApplicant, ...prev.pendaftarList]
    }));

    return newApplicant;
  };

  const updatePendaftarStatus = (id: string, status: PendaftarSantri['status'], catatan?: string) => {
    setData((prev) => ({
      ...prev,
      pendaftarList: prev.pendaftarList.map((p) =>
        p.id === id ? { ...p, status, ...(catatan !== undefined ? { catatanPengurus: catatan } : {}) } : p
      )
    }));
  };

  const deletePendaftar = (id: string) => {
    setData((prev) => ({
      ...prev,
      pendaftarList: prev.pendaftarList.filter((p) => p.id !== id)
    }));
  };

  const sendChatMessage = (text: string, sender: 'pengunjung' | 'admin', senderName?: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender,
      text,
      timestamp: timeStr,
      senderName: senderName || (sender === 'admin' ? 'Ustadz Hilman (Sekretariat PSB)' : 'Pengunjung Website')
    };

    setData((prev) => ({
      ...prev,
      chatMessages: [...prev.chatMessages, newMsg]
    }));

    if (sender === 'pengunjung') {
      setTimeout(() => {
        setData((prev) => {
          const autoReply: ChatMessage = {
            id: `msg-auto-${Date.now()}`,
            sender: 'admin',
            text: 'Terima kasih atas pesan Anda. Pengurus sekretariat kami telah menerima pertanyaan ini dan akan segera merespon secara langsung melalui sistem live chat ini atau WhatsApp kami.',
            timestamp: `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`,
            senderName: 'Sistem Sekretariat Otomatis'
          };
          return {
            ...prev,
            chatMessages: [...prev.chatMessages, autoReply]
          };
        });
      }, 1400);
    }
  };

  const clearChat = () => {
    setData((prev) => ({
      ...prev,
      chatMessages: [
        {
          id: 'msg-reset',
          sender: 'sistem',
          text: 'Ahlan wa Sahlan di Layanan Informasi Resmi Pondok Pesantren Bustanul Ulum. Pengurus kami siap membantu.',
          timestamp: '08:00'
        }
      ]
    }));
  };

  const resetToDefaultData = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh data ke pengaturan awal?')) {
      setData(initialPesantrenData);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const restoreBackupData = (backupData: PesantrenState): boolean => {
    try {
      if (!backupData || !backupData.profil || !backupData.sambutan) {
        return false;
      }
      setData({
        ...initialPesantrenData,
        ...backupData,
        santriAktifList: backupData.santriAktifList || initialPesantrenData.santriAktifList,
        jadwalIbadah: backupData.jadwalIbadah || initialPesantrenData.jadwalIbadah,
        ekstrakurikuler: backupData.ekstrakurikuler || initialPesantrenData.ekstrakurikuler,
        programPendidikan: backupData.programPendidikan || initialPesantrenData.programPendidikan
      });
      return true;
    } catch {
      return false;
    }
  };

  return (
    <PesantrenContext.Provider
      value={{
        data,
        activeView,
        setActiveView,
        activeMenuSection,
        setActiveMenuSection,
        isAdminLoggedIn,
        isLoginModalOpen,
        setIsLoginModalOpen,
        loginAdmin,
        logoutAdmin,
        updateProfil,
        updateSambutan,
        updateVisiMisi,
        addBerita,
        updateBerita,
        deleteBerita,
        addGaleri,
        deleteGaleri,
        addPengurus,
        updatePengurus,
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
        updateEkstrakurikuler,
        deleteEkstrakurikuler,
        registerSantri,
        updatePendaftarStatus,
        deletePendaftar,
        sendChatMessage,
        clearChat,
        resetToDefaultData,
        restoreBackupData
      }}
    >
      {children}
    </PesantrenContext.Provider>
  );
};

export const usePesantren = () => {
  const context = useContext(PesantrenContext);
  if (!context) {
    throw new Error('usePesantren must be used within a PesantrenProvider');
  }
  return context;
};
