# Website Resmi Pondok Pesantren Bustanul Ulum

Website profesional, modern, responsif, dan bernuansa islami elegan untuk **Pondok Pesantren Bustanul Ulum**.

---

## 🌟 Fitur Utama
1. **Landing Page Islami Elegan**:
   - Sambutan Pengasuh Pondok & kutipan kiai.
   - Visi, Misi & Nilai Luhur Karakter (Panca Jiwa Pondok).
   - Jadwal Waktu Ibadah / Salat 5 Waktu + Terbit (real-time otomatis).
   - Program Pendidikan Terpadu & Ekstrakurikuler santri.
   - Galeri Foto Dokumentasi & Berita/Kegiatan Santri.
   - Testimoni Wali Santri & Profil Lengkap Pesantren.
2. **Pendaftaran Santri Baru (PSB Online)**:
   - Formulir pendaftaran online multi-tahap lengkap dengan upload berkas.
   - Cetak Kartu / Bukti Pendaftaran Santri Baru dengan kop resmi pondok.
   - Manajemen verifikasi berkas dan update status seleksi oleh panitia PSB.
3. **Menu Santri & Kepengurusan**:
   - Menu Santri dengan sub-menu **Data Santri** dan **Daftar Santri PSB**.
   - Ekspor langsung ke format **Microsoft Excel (.xlsx)** asli (bukan sekadar CSV).
   - Impor data massal dari file **Excel (.xlsx / .xls / .csv)**.
   - Ekspor & Impor Pengurus Yayasan dan Dewan Asatidz.
4. **Navigasi Presisi**:
   - Indikator menu aktif bergaris bawah hijau tua dengan ketebalan presisi **2mm**.
   - Tombol **Login** admin tanpa background warna, menyatu elegan dengan navbar.
5. **Dashboard Admin CMS Real-time**:
   - Pengelolaan seluruh konten secara visual tanpa perlu coding ulang.
   - Live Chat terintegrasi antara pengunjung dan panitia/pengurus.
   - Unggah foto dan logo pesantren (JPG, JPEG, PNG, WEBP, SVG) dari perangkat.
6. **Sinkronisasi Cloud & Kesiapan Vercel**:
   - Ekspor dan pulihkan cadangan basis data cloud utuh (.json).
   - Real-time Cross-tab Sync dengan BroadcastChannel API.
   - Konfigurasi `vercel.json` siap deploy ke server Vercel.

---

## 🚀 Panduan Deploy Online ke Vercel

Aplikasi ini sudah 100% siap untuk di-onlinekan ke platform Vercel dengan konfigurasi `vercel.json` bawaan.

### Langkah 1: Push ke GitHub
```bash
git init
git add .
git commit -m "feat: Website Pondok Pesantren Bustanul Ulum"
git branch -M main
git remote add origin https://github.com/USERNAME/ponpes-bustanul-ulum.git
git push -u origin main
```

### Langkah 2: Deploy di Vercel
1. Buka [https://vercel.com](https://vercel.com) dan masuk ke akun Vercel Anda.
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Pilih repositori GitHub `ponpes-bustanul-ulum`.
4. Vercel akan otomatis mendeteksi:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Klik **"Deploy"**.
6. Dalam waktu ~30 detik, website Pondok Pesantren Bustanul Ulum resmi online dengan alamat publik (contoh: `https://ponpes-bustanul-ulum.vercel.app`) dan sertifikat SSL HTTPS otomatis aktif.

---

## 🔐 Kredensial Akses Admin
- Klik menu **Login** pada bagian kanan atas website.
- Masukkan password admin: `admin123` atau `bustanul2026`.
- Buka tab **Cloud & Vercel Sync** di dashboard untuk mengunduh cadangan data berkala.
