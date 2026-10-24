export interface SambutanPengasuh {
  namaPengasuh: string;
  gelar: string;
  foto: string;
  kutipan: string;
  pesanLengkap: string[];
  salamPembuka: string;
}

export interface VisiMisi {
  visi: string;
  misi: string[];
  tujuan: string[];
  pancaJiwa: { title: string; desc: string }[];
}

export interface ProfilPesantren {
  nama: string;
  tagline: string;
  sejarahSingkat: string;
  tahunBerdiri: number;
  alamat: string;
  kota: string;
  telepon: string;
  whatsapp: string;
  email: string;
  akreditasi: string;
  jumlahSantri: number;
  jumlahAsatidz: number;
  logo?: string;
}

export interface KegiatanSantri {
  id: string;
  judul: string;
  kategori: 'Berita' | 'Pengajian' | 'Prestasi' | 'Ekstrakurikuler';
  waktu: string;
  deskripsi: string;
  foto: string;
  kontenLengkap?: string;
  penulis?: string;
}

export interface JadwalHarian {
  waktu: string;
  kegiatan: string;
  tempat: string;
  keterangan: string;
}

export interface GaleriItem {
  id: string;
  judul: string;
  kategori: 'Pengajian' | 'Asrama' | 'Akademik' | 'Ekstrakurikuler' | 'Fasilitas';
  foto: string;
  deskripsi: string;
  tanggal: string;
}

export interface PengurusYayasan {
  id: string;
  nama: string;
  jabatan: string;
  kategori: 'Pengasuh' | 'Yayasan' | 'Madrasah' | 'Asatidz';
  foto: string;
  biografi: string;
  pendidikan: string;
}

export interface Testimoni {
  id: string;
  nama: string;
  asal: string;
  status: string;
  foto: string;
  komentar: string;
  rating: number;
}

export interface ProgramPendidikan {
  id: string;
  nama: string;
  jenjang: string;
  deskripsi: string;
  targetOutput: string[];
  lamaStudi: string;
  badge: string;
}

export interface FasilitasItem {
  id: string;
  nama: string;
  deskripsi: string;
  foto: string;
  kapasitas?: string;
}

export interface PendaftarSantri {
  id: string;
  nomorRegistrasi: string;
  namaLengkap: string;
  nisn: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  asalSekolah: string;
  jenjangTujuan: 'MTs Bustanul Ulum' | 'MA Bustanul Ulum' | 'Tahfidz Khusus (Takhassus)' | 'Madrasah Diniyah Salafiyah';
  namaAyah: string;
  pekerjaanAyah: string;
  namaIbu: string;
  noHpWhatsapp: string;
  tanggalDaftar: string;
  status: 'Menunggu Verifikasi' | 'Berkas Terverifikasi' | 'Lolos Tes Seleksi' | 'Diterima' | 'Belum Diterima';
  catatanPengurus?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'pengunjung' | 'admin' | 'sistem';
  text: string;
  timestamp: string;
  senderName?: string;
}

export interface SantriAktif {
  id: string;
  nis: string;
  nama: string;
  jenjang: 'MTs Bustanul Ulum' | 'MA Bustanul Ulum' | 'Tahfidz Takhassus' | string;
  kelas: string;
  jenisKelamin: 'Putra' | 'Putri';
  kamar: string;
  asalKota: string;
  hafalan: string;
  prestasi: string;
}

export interface JadwalIbadahItem {
  id: string;
  name: string;
  time: string;
}

export interface EkstrakurikulerItem {
  id: string;
  nama: string;
  desc: string;
}

export interface PesantrenState {
  profil: ProfilPesantren;
  sambutan: SambutanPengasuh;
  visiMisi: VisiMisi;
  beritaKegiatan: KegiatanSantri[];
  jadwalHarian: JadwalHarian[];
  galeri: GaleriItem[];
  pengurus: PengurusYayasan[];
  testimoni: Testimoni[];
  programPendidikan: ProgramPendidikan[];
  fasilitas: FasilitasItem[];
  pendaftarList: PendaftarSantri[];
  chatMessages: ChatMessage[];
  santriAktifList: SantriAktif[];
  jadwalIbadah: JadwalIbadahItem[];
  ekstrakurikuler: EkstrakurikulerItem[];
}
