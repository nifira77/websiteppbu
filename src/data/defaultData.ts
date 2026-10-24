import { PesantrenState } from '../types';

export const initialPesantrenData: PesantrenState = {
  profil: {
    nama: 'Pondok Pesantren Bustanul Ulum',
    tagline: 'Mencetak Generasi Qur\'ani, Berakhlakul Karimah, Tafaqquh Fiddin, dan Berwawasan Global',
    sejarahSingkat: 'Pondok Pesantren Bustanul Ulum didirikan pada tahun 1988 oleh para ulama dan sesepuh dengan tekad luhur memadukan kedalaman ilmu salafiyah (kitab kuning) dengan keunggulan akademik modern. Berdiri di atas lahan asri dan sejuk seluas 5 hektar, kini mengasuh lebih dari seribu santri putra dan putri dari berbagai pelosok Nusantara.',
    tahunBerdiri: 1988,
    alamat: 'Jl. Pesantren Luhur No. 45, Desa Sukamaju, Kec. Cisarua, Kab. Bogor, Jawa Barat 16750',
    kota: 'Bogor, Jawa Barat',
    telepon: '(0251) 8254-991',
    whatsapp: '0812-3456-7890',
    email: 'sekretariat@bustanululum.ponpes.id',
    akreditasi: 'Akreditasi A Unggul (Kemenag & Kemendikbud)',
    jumlahSantri: 1280,
    jumlahAsatidz: 56,
  },
  sambutan: {
    namaPengasuh: 'K.H. Dr. Ahmad Basyir Al-Hafidz, Lc., M.A.',
    gelar: 'Pengasuh Utama Pondok Pesantren Bustanul Ulum & Alumni Univ. Al-Azhar Kairo',
    foto: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600',
    kutipan: 'Pendidikan di pesantren bukan sekadar transfer ilmu pengetahuan, melainkan penanaman adab dan penempaan jiwa agar setiap santri menjadi lentera penerang bagi umat.',
    salamPembuka: 'Assalamu\'alaikum Warahmatullahi Wabarakatuh, Alhamdulillahi Rabbil \'Alamin, Wassholatu Wassalamu \'ala Asyrofil Anbiya\'i wal Mursalin.',
    pesanLengkap: [
      'Segala puji bagi Allah Subhanahu wa Ta\'ala yang telah meridhoi langkah kita dalam menegakkan syiar pendidikan Islam. Pondok Pesantren Bustanul Ulum senantiasa istiqomah membina putra-putri kaum muslimin agar berakar teguh pada akidah Ahlussunnah wal Jama\'ah an-Nahdliyyah, mendalami khazanah Turots Islam, serta cakap menghadapi tantangan peradaban modern.',
      'Kami meyakini bahwa adab mendahului ilmu. Di Bustanul Ulum, seluruh aspek kehidupan santri—mulai dari bangun sebelum fajar, sholat berjamaah lima waktu, halaqah tahfidz, kajian kitab kuning, hingga pembelajaran sains dan teknologi—dirancang sebagai laboratorium pembentukan karakter mulia.',
      'Kepada seluruh wali santri dan kaum muslimin, pintu kami selalu terbuka untuk bersilaturahmi dan berkolaborasi dalam mengantarkan anak-anak kita meraih kemuliaan di dunia dan akhirat. Selamat datang di gerbang ilmu, adab, dan berkah.'
    ]
  },
  visiMisi: {
    visi: 'Terwujudnya Lembaga Pendidikan Pesantren Unggul yang Melahirkan Ulama yang Cendekia dan Cendekiawan yang Berjiwa Ulama Berlandaskan Al-Qur\'an dan Sunnah.',
    misi: [
      'Menyelenggarakan pendidikan tahfidzul Qur\'an 30 juz yang mutqin dan berakar pada pemahaman tafsir amali.',
      'Menanamkan penguasaan kitab-kitab turots (Salafiyah) dengan metodologi sorogan, bandongan, dan bahtsul masa\'il.',
      'Mengharmonisasikan kurikulum nasional dengan kurikulum pesantren guna melahirkan lulusan berprestasi sains dan bahasa internasional.',
      'Membina kemandirian, kepemimpinan (leadership), kewirausahaan, serta kepedulian sosial santri berjiwa khidmah.',
      'Mewujudkan tata kelola kelembagaan pesantren yang amanah, profesional, transparan, dan berbasis teknologi informasi modern.'
    ],
    tujuan: [
      'Mencetak hafizh/hafizhah Al-Qur\'an yang berakhlak mulia.',
      'Melahirkan kader ulama muda yang kompeten membaca dan mengontekstualisasikan kitab kuning.',
      'Menghasilkan lulusan yang siap bersaing di perguruan tinggi favorit dalam maupun luar negeri.',
      'Membentuk pribadi santri yang mandiri, tangguh, toleran, dan berjiwa pahlawan.'
    ],
    pancaJiwa: [
      {
        title: 'Keikhlasan',
        desc: 'Mendasari seluruh niat beribadah, menuntut ilmu, dan mengabdi semata-mata mengharap ridha Allah SWT.'
      },
      {
        title: 'Kesederhanaan',
        desc: 'Bukan berarti pasif atau miskin, melainkan bersahaja, bersyukur, dan memiliki ketahanan mental tinggi.'
      },
      {
        title: 'Berdikari (Kemandirian)',
        desc: 'Mampu mengurus diri sendiri, tidak mudah bergantung kepada orang lain, dan berani berinisiatif.'
      },
      {
        title: 'Ukhuwah Islamiyah',
        desc: 'Persaudaraan erat lillahi ta\'ala antar santri yang berasal dari berbagai suku bangsa dan latar belakang.'
      },
      {
        title: 'Kebebasan Terbimbing',
        desc: 'Bebas berpikir kritis, berijtihad dan berkreasi dalam bingkai akhlakul karimah dan koridor syariat Islam.'
      }
    ]
  },
  beritaKegiatan: [
    {
      id: 'keg-1',
      judul: 'Khataman Akbar Al-Qur\'an & Imtihan Tahfidz Angkatan Ke-28',
      kategori: 'Berita',
      waktu: '18 Oktober 2026',
      deskripsi: 'Sebanyak 42 santri putra dan putri sukses menyelesaikan setoran hafalan 30 Juz Al-Qur\'an bil ghaib dengan sanad muttashil di hadapan Dewan Masyayikh.',
      foto: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800',
      penulis: 'Humas PP. Bustanul Ulum',
      kontenLengkap: 'Alhamdulillah, suasana haru dan syukur menyelimuti Masjid Jami\' Bustanul Ulum pada gelaran Wisuda Khataman Tahfidz ke-28. Acara dihadiri oleh segenap pengasuh, tamu undangan ulama internasional dari Mesir dan Yaman, serta ratusan wali santri yang menyematkan mahkota kemuliaan.'
    },
    {
      id: 'keg-2',
      judul: 'Kajian Sorogan Kitab Fathul Qorib & Ihya Ulumuddin Ba\'da Maghrib',
      kategori: 'Pengajian',
      waktu: 'Rutin Setiap Hari',
      deskripsi: 'Kajian kitab fiqih dan tasawuf mendalam yang dibimbing langsung oleh Pengasuh Pesantren bersama dewan asatidz senior di serambi masjid utama.',
      foto: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=800',
      penulis: 'Bagian Ta\'lim Pesantren',
      kontenLengkap: 'Metode sorogan dan bandongan tetap dipertahankan sebagai ruh pesantren salaf. Santri membaca secara teliti gramatika nahwu shorof dan membedah makna tersirat pada kitab-kitab turats rujukan ulama Nusantara.'
    },
    {
      id: 'keg-3',
      judul: 'Santri Bustanul Ulum Raih Juara 1 Musabaqah Qira\'atil Kutub (MQK) Nasional',
      kategori: 'Prestasi',
      waktu: '05 Oktober 2026',
      deskripsi: 'Ananda Muhammad Fatih santri kelas akhir MA berhasil menyabet Juara 1 MQK Cabang Fiqih Tingkat Ulya Nasional di Kementerian Agama RI.',
      foto: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
      penulis: 'Biro Prestasi Santri',
      kontenLengkap: 'Prestasi membanggakan ini membuktikan bahwa santri tidak hanya piawai menghafal kaidah nahwu shorof, namun juga kritis dalam menguraikan argumen hukum fikih kontemporer berbasis ibarat kutubus salaf.'
    },
    {
      id: 'keg-4',
      judul: 'Latihan Gabungan Seni Beladiri Pagar Nusa & Muhadharah 3 Bahasa',
      kategori: 'Ekstrakurikuler',
      waktu: 'Setiap Jumat & Ahad',
      deskripsi: 'Penguatan fisik santri melalui pencak silat dipadukan dengan latihan pidato dalam Bahasa Arab, Inggris, dan Indonesia untuk melatih mental kepemimpinan.',
      foto: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
      penulis: 'OSIS / Pengurus Santri',
      kontenLengkap: 'Selain ketajaman intelektual dan spiritual, santri diasah keberanian dan keterampilan diplomasinya melalui forum public speaking tiga bahasa serta ketahanan fisik beladiri tradisional.'
    }
  ],
  jadwalHarian: [
    { waktu: '03.30 - 04.30', kegiatan: 'Qiyamul Lail & Sholat Tahajjud Berjamaah', tempat: 'Masjid Jami\'', keterangan: 'Doa bersama & persiapan Sholat Shubuh' },
    { waktu: '04.30 - 05.30', kegiatan: 'Sholat Shubuh Berjamaah & Wirid Rotibul Haddad', tempat: 'Masjid Jami\'', keterangan: 'Wajib seluruh santri putra/putri' },
    { waktu: '05.30 - 06.30', kegiatan: 'Halaqah Tahfidzul Qur\'an & Setoran Ziyadah', tempat: 'Halaqah Asrama', keterangan: 'Didampingi Muhaffizh masing-masing' },
    { waktu: '06.30 - 07.15', kegiatan: 'Makan Pagi, Mandi, & Persiapan Sekolah Formal', tempat: 'Ruang Makan / Asrama', keterangan: 'Penerapan adab dan kedisiplinan' },
    { waktu: '07.15 - 12.00', kegiatan: 'KBM Sekolah Formal (MTs & MA Bustanul Ulum)', tempat: 'Gedung Madrasah', keterangan: 'Kurikulum Kemenag terpadu Pesantren' },
    { waktu: '12.00 - 13.00', kegiatan: 'Sholat Dzuhur Berjamaah & Makan Siang', tempat: 'Masjid Jami\'', keterangan: 'Istirahat sejenak (Qoilulah)' },
    { waktu: '13.00 - 15.00', kegiatan: 'KBM Formal Lanjutan / Laboratorium Sains', tempat: 'Gedung Madrasah & Lab', keterangan: 'Praktikum & diskusi akademik' },
    { waktu: '15.00 - 16.30', kegiatan: 'Sholat Ashar Berjamaah & Kajian Kitab Jurumiyyah / Matan Taqrib', tempat: 'Serambi Masjid', keterangan: 'Madrasah Diniyah Sore' },
    { waktu: '16.30 - 17.30', kegiatan: 'Olahraga Sore, Ekstrakurikuler, Kebersihan Lingkungan', tempat: 'Lapangan Olahraga & Area Ponpes', keterangan: 'Futsal, Memanah, Hadrah, Silat' },
    { waktu: '17.30 - 19.30', kegiatan: 'Sholat Maghrib, Tadarus Al-Qur\'an & Kajian Kitab Kuning Pengasuh', tempat: 'Masjid Jami\'', keterangan: 'Pengajian Akbar Kitab Ihya / Tafsir Jalalain' },
    { waktu: '19.30 - 20.30', kegiatan: 'Sholat Isya Berjamaah & Makan Malam', tempat: 'Masjid & Ruang Makan', keterangan: 'Santap malam bersama dengan adab Islam' },
    { waktu: '20.30 - 22.00', kegiatan: 'Muthala\'ah Terbimbing (Belajar Mandiri & Bahasa Arab/Inggris)', tempat: 'Ruang Belajar Asrama', keterangan: 'Didampingi Wali Asrama & Asatidz' },
    { waktu: '22.00 - 03.30', kegiatan: 'Istirahat Malam (Jam Wajib Tidur)', tempat: 'Kamar Asrama', keterangan: 'Lampu dipadamkan, penjagaan keamanan 24 jam' },
  ],
  galeri: [
    {
      id: 'gal-1',
      judul: 'Halaqah Al-Qur\'an Pagi di Masjid Jami\'',
      kategori: 'Pengajian',
      foto: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&q=80&w=800',
      deskripsi: 'Santri melantunkan tilawah dan setoran hafalan Al-Qur\'an ba\'da Subuh.',
      tanggal: '15 Oktober 2026'
    },
    {
      id: 'gal-2',
      judul: 'Gedung Asrama Santri & Suasana Kampus Asri',
      kategori: 'Asrama',
      foto: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800',
      deskripsi: 'Lingkungan pondok yang sejuk, bersih, dan asri mendukung konsentrasi belajar.',
      tanggal: '10 Oktober 2026'
    },
    {
      id: 'gal-3',
      judul: 'Praktikum Komputer & Bahasa Digital',
      kategori: 'Akademik',
      foto: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
      deskripsi: 'Santri mempelajari teknologi informasi, coding, dan literasi digital modern.',
      tanggal: '28 September 2026'
    },
    {
      id: 'gal-4',
      judul: 'Penampilan Grup Hadrah Al-Banjari Bustanul Ulum',
      kategori: 'Ekstrakurikuler',
      foto: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
      deskripsi: 'Gema sholawat dan tabuhan rebana dalam peringatan Maulid Nabi Muhammad SAW.',
      tanggal: '20 September 2026'
    },
    {
      id: 'gal-5',
      judul: 'Perpustakaan Maktabah Turats Islam',
      kategori: 'Fasilitas',
      foto: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800',
      deskripsi: 'Koleksi ribuan jilid kitab kuning klasik, ensiklopedia Islam, dan buku sains.',
      tanggal: '12 September 2026'
    },
    {
      id: 'gal-6',
      judul: 'Sidang Munaqasyah Kitab Kuning Fathul Wahhab',
      kategori: 'Pengajian',
      foto: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
      deskripsi: 'Ujian lisan pemahaman kitab kuning tingkat lanjut di hadapan dewan penilai.',
      tanggal: '05 September 2026'
    }
  ],
  pengurus: [
    {
      id: 'pgr-1',
      nama: 'K.H. Dr. Ahmad Basyir Al-Hafidz, Lc., M.A.',
      jabatan: 'Pengasuh Utama Pesantren',
      kategori: 'Pengasuh',
      foto: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600',
      biografi: 'Pakar Tafsir & Ulumul Qur\'an alumni S1-S3 Universitas Al-Azhar Kairo Mesir, mengabdikan diri lebih dari 30 tahun membina pesantren.',
      pendidikan: 'Doktor Tafsir Hadits Al-Azhar University, Kairo'
    },
    {
      id: 'pgr-2',
      nama: 'Nyai Hj. Siti Maryam Al-Hafidzah, M.Pd.',
      jabatan: 'Pengasuh Asrama Putri & Direktur Tahfidz Putri',
      kategori: 'Pengasuh',
      foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      biografi: 'Pemegang sanad tahfidz Al-Qur\'an riwayat Hafsh \'an \'Ashim, pembina rohani dan keibuan bagi ribuan santriwati Bustanul Ulum.',
      pendidikan: 'Magister Manajemen Pendidikan Islam'
    },
    {
      id: 'pgr-3',
      nama: 'Drs. H. Muhammad Ridwan, M.M.',
      jabatan: 'Ketua Pembina Yayasan Bustanul Ulum',
      kategori: 'Yayasan',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
      biografi: 'Tokoh pendidikan dan filantropi Islam nasional, mengarahkan pengembangan infrastruktur dan tata kelola yayasan secara modern.',
      pendidikan: 'Magister Manajemen Universitas Indonesia'
    },
    {
      id: 'pgr-4',
      nama: 'Ust. H. Fauzan Abdullah, Lc., M.Ag.',
      jabatan: 'Kepala Madrasah Aliyah & Koordinator Bahasa',
      kategori: 'Madrasah',
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
      biografi: 'Alumni Universitas Islam Madinah, memimpin kurikulum integratif sains, bahasa Arab, dan kitab kuning di madrasah aliyah.',
      pendidikan: 'S1 Hadits UIM Madinah, S2 UIN Syarif Hidayatullah'
    },
    {
      id: 'pgr-5',
      nama: 'Ust. H. Syamsul Arifin, S.Pd.I.',
      jabatan: 'Kepala Madrasah Tsanawiyah',
      kategori: 'Madrasah',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
      biografi: 'Berpengalaman lebih dari 20 tahun dalam manajemen pendidikan dasar Islam dan bimbingan konseling karakter remaja.',
      pendidikan: 'Sarjana Pendidikan Islam'
    },
    {
      id: 'pgr-6',
      nama: 'Ust. M. Zaki Mubarok, S.Th.I., M.H.',
      jabatan: 'Lurah Pondok (Kepala Keamanan & Kedisiplinan Santri)',
      kategori: 'Asatidz',
      foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
      biografi: 'Mengawasi ketertiban ibadah harian, pengasuhan kamar asrama, serta bimbingan kepemimpinan organisasi santri 24 jam.',
      pendidikan: 'Magister Hukum Islam'
    }
  ],
  testimoni: [
    {
      id: 'test-1',
      nama: 'Ir. H. Dedi Prasetyo, M.T.',
      asal: 'Bandung, Jawa Barat',
      status: 'Wali Santri dari Farhan (Alumni MA & Sekarang Mahasiswa ITB)',
      foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
      komentar: 'Alhamdulillah, keputusan memondokkan anak di Bustanul Ulum adalah anugerah terbesar bagi keluarga kami. Farhan tidak hanya hafal 30 juz Al-Qur\'an dan lancar membaca kitab kuning, tapi juga lulus tes SNBT masuk ITB jurusan Teknik Elektro. Adabnya kepada orang tua sangat membahagiakan.',
      rating: 5
    },
    {
      id: 'test-2',
      nama: 'Hj. Ratna Wulandari, S.E.',
      asal: 'Jakarta Selatan',
      status: 'Wali Santriwati dari Aisyah (Kelas 3 MTs Bustanul Ulum)',
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      komentar: 'Sistem pengasuhan asrama putri sangat amanah, bersih, dan penuh kasih sayang. Ustadzah dan Ibu Nyai mendampingi santriwati seperti anak kandung sendiri. Anak saya kini mandiri, rajin sholat malam, dan bahasa Arabnya sangat fasih.',
      rating: 5
    },
    {
      id: 'test-3',
      nama: 'H. Sudirman, S.Pd.',
      asal: 'Lampung',
      status: 'Wali Santri dari Raihan (Kelas 2 MA Takhassus)',
      foto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300',
      komentar: 'Pendaftaran online PSB sangat transparan dan informatif. Pihak pondok memberikan update berkala mengenai perkembangan akhlak dan nilai hafalan anak kami. Biaya sangat terjangkau dengan fasilitas yang representatif.',
      rating: 5
    }
  ],
  programPendidikan: [
    {
      id: 'prog-1',
      nama: 'Tahfidzul Qur\'an Takhassus (30 Juz)',
      jenjang: 'Putra & Putri (Berasrama)',
      deskripsi: 'Program intensif menghafal Al-Qur\'an 30 juz bersanad dengan bimbingan metode talaqqi harian, muraja\'ah terstruktur, serta pendalaman kaidah tajwid dan fashahah.',
      targetOutput: [
        'Hafal Al-Qur\'an 30 Juz Mutqin',
        'Memperoleh Ijazah Sanad Tahfidz',
        'Menguasai Tajwid Teoritis & Praktis (Matan Jazariyah)',
        'Mampu menjadi Imam Sholat Berjamaah & Da\'i'
      ],
      lamaStudi: '3 - 6 Tahun',
      badge: 'Program Unggulan'
    },
    {
      id: 'prog-2',
      nama: 'Kajian Kitab Kuning (Salafiyah / Dirasah Islamiyah)',
      jenjang: 'Ula, Wustho, & Ulya',
      deskripsi: 'Pendalaman khazanah Islam klasik turots Ahlussunnah wal Jama\'ah dengan kurikulum bertahap: Nahwu, Shorof, Fiqih, Ushul Fiqih, Hadits, Tafsir, dan Tasawuf.',
      targetOutput: [
        'Khatam Kitab Fathul Qorib, Imrithi, Alfiyah, dll.',
        'Mampu membaca dan menerjemahkan kitab gundul (Makna Pegon/Gandul)',
        'Keterampilan Bahtsul Masa\'il Fiqhiyyah',
        'Karakter Tawadhu\' & Berakhlak Mulia'
      ],
      lamaStudi: 'Terintegrasi Asrama',
      badge: 'Ciri Khas Pesantren'
    },
    {
      id: 'prog-3',
      nama: 'Madrasah Tsanawiyah (MTs) Terakreditasi A',
      jenjang: 'Setingkat SMP (Pendidikan Menengah Pertama)',
      deskripsi: 'Memadukan Kurikulum Merdeka Kementerian Agama RI dengan materi kepesantrenan. Didukung laboratorium sains modern dan penguasaan bahasa asing.',
      targetOutput: [
        'Lulus Ijazah Negara Akreditasi A',
        'Hafalan Minimal 5 - 10 Juz Al-Qur\'an',
        'Percakapan Aktif Bahasa Arab & Inggris',
        'Juara Kompetisi Sains Madrasah (KSM)'
      ],
      lamaStudi: '3 Tahun',
      badge: 'Pendidikan Formal'
    },
    {
      id: 'prog-4',
      nama: 'Madrasah Aliyah (MA) Terakreditasi A Unggul',
      jenjang: 'Setingkat SMA (Peminatan IPA, IPS, & Keagamaan)',
      deskripsi: 'Fokus persiapan menuju perguruan tinggi terbaik dalam dan luar negeri (Al-Azhar Kairo, Timur Tengah, ITB, UI, UGM) dengan bekal riset dan kepemimpinan.',
      targetOutput: [
        'Ijazah MA Formal + Syahadah Pesantren',
        'Kesiapan Masuk Kampus Top Nasional & Luar Negeri',
        'Karya Tulis Ilmiah Santri (KTI)',
        'Kepemimpinan Organisasi Santri Bustanul Ulum (OSBU)'
      ],
      lamaStudi: '3 Tahun',
      badge: 'Pendidikan Formal'
    }
  ],
  fasilitas: [
    {
      id: 'fas-1',
      nama: 'Masjid Jami\' Bustanul Ulum',
      deskripsi: 'Pusat spiritual pesantren dengan arsitektur klasik bernuansa kubah hijau, mampu menampung 2.500 jamaah untuk sholat lima waktu, kajian kitab, dan iktikaf.',
      foto: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80&w=800',
      kapasitas: '2.500 Jamaah'
    },
    {
      id: 'fas-2',
      nama: 'Kompleks Asrama Santri Putra & Putri Terpisah',
      deskripsi: 'Kamar asrama yang bersih dan berventilasi baik, dilengkapi lemari santri individual, ranjang bertingkat kokoh, dan fasilitas MCK memadai.',
      foto: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800',
      kapasitas: '4 Gedung Asrama'
    },
    {
      id: 'fas-3',
      nama: 'Maktabah (Perpustakaan Kitab & Digital)',
      deskripsi: 'Koleksi lengkap kitab kuning turots, tafsir mu\'tabarah, buku-buku sains modern, jurnal keislaman, serta akses komputer katalog digital.',
      foto: 'https://images.unsplash.com/photo-1507842229452-789274934358?auto=format&fit=crop&q=80&w=800',
      kapasitas: '15.000+ Judul Buku'
    },
    {
      id: 'fas-4',
      nama: 'Laboratorium Sains & Komputer Multimedia',
      deskripsi: 'Laboratorium modern untuk praktikum Fisika, Biologi, Kimia, serta komputer high-spec untuk pembelajaran coding dan desain santri.',
      foto: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
      kapasitas: '80 Unit PC'
    },
    {
      id: 'fas-5',
      nama: 'Pos Kesehatan Pesantren (Poskestren 24 Jam)',
      deskripsi: 'Klinik kesehatan internal dengan tenaga medis dokter dan perawat jaga, menyediakan obat-obatan esensial dan ruang istirahat rawat inap darurat.',
      foto: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      kapasitas: 'Dokter & Nakes Standby'
    },
    {
      id: 'fas-6',
      nama: 'Sarana Olahraga Terpadu',
      deskripsi: 'Lapangan futsal rumput sintetis, lapangan basket, bulu tangkis indoor, arena memanah (sunnah sport), dan tenis meja santri.',
      foto: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
      kapasitas: 'Area Olahraga Lengkap'
    }
  ],
  pendaftarList: [
    {
      id: 'psb-101',
      nomorRegistrasi: 'PSB-BU-2026-001',
      namaLengkap: 'Ahmad Rayhan Al-Faruqi',
      nisn: '0098765432',
      jenisKelamin: 'Laki-laki',
      tempatLahir: 'Jakarta',
      tanggalLahir: '2012-04-14',
      alamat: 'Jl. Melati No. 12, Tebet, Jakarta Selatan',
      asalSekolah: 'SD Islam Al-Azhar Jakarta',
      jenjangTujuan: 'MTs Bustanul Ulum',
      namaAyah: 'Bambang Supriyadi, S.T.',
      pekerjaanAyah: 'Wiraswasta',
      namaIbu: 'dr. Siti Aminah',
      noHpWhatsapp: '081299887766',
      tanggalDaftar: '2026-10-15',
      status: 'Diterima',
      catatanPengurus: 'Lulus tes baca kitab dasar, hafalan juz 30 lancar (Nilai: 94). Telah melunasi seragam dan biaya asrama.'
    },
    {
      id: 'psb-102',
      nomorRegistrasi: 'PSB-BU-2026-002',
      namaLengkap: 'Fatimah Zahra An-Nabila',
      nisn: '0087654321',
      jenisKelamin: 'Perempuan',
      tempatLahir: 'Bogor',
      tanggalLahir: '2010-08-22',
      alamat: 'Jl. Pajajaran Indah No. 4, Baranangsiang, Bogor',
      asalSekolah: 'SMP IT Ummul Qura Bogor',
      jenjangTujuan: 'MA Bustanul Ulum',
      namaAyah: 'H. Muhammad Yusuf',
      pekerjaanAyah: 'PNS Kemenag',
      namaIbu: 'Hj. Maryam Hasanah',
      noHpWhatsapp: '081388776655',
      tanggalDaftar: '2026-10-18',
      status: 'Lolos Tes Seleksi',
      catatanPengurus: 'Lolos wawancara dan tes akademik MA. Menunggu penempatan kamar santriwati.'
    },
    {
      id: 'psb-103',
      nomorRegistrasi: 'PSB-BU-2026-003',
      namaLengkap: 'Zainal Abidin Syarif',
      nisn: '0076543210',
      jenisKelamin: 'Laki-laki',
      tempatLahir: 'Surabaya',
      tanggalLahir: '2011-11-05',
      alamat: 'Kompleks Rungkut Harapan Blok B-7, Surabaya',
      asalSekolah: 'SD Negeri Rungkut 1',
      jenjangTujuan: 'Tahfidz Khusus (Takhassus)',
      namaAyah: 'Drs. H. Syarif Hidayatullah',
      pekerjaanAyah: 'Dosen',
      namaIbu: 'Umi Kalsum, M.Si.',
      noHpWhatsapp: '081122334455',
      tanggalDaftar: '2026-10-21',
      status: 'Berkas Terverifikasi',
      catatanPengurus: 'Berkas lengkap. Dijadwalkan ujian lisan tilawah pada gelombang berikutnya.'
    },
    {
      id: 'psb-104',
      nomorRegistrasi: 'PSB-BU-2026-004',
      namaLengkap: 'Muhammad Nabil Robbani',
      nisn: '0091234567',
      jenisKelamin: 'Laki-laki',
      tempatLahir: 'Tangerang',
      tanggalLahir: '2012-01-30',
      alamat: 'Perumahan BSD City Sektor 1.2, Tangerang Selatan',
      asalSekolah: 'MI Pembangunan Jakarta',
      jenjangTujuan: 'MTs Bustanul Ulum',
      namaAyah: 'Ir. Hendro Wibowo',
      pekerjaanAyah: 'Karyawan Swasta',
      namaIbu: 'Nur Laila, S.E.',
      noHpWhatsapp: '085712345678',
      tanggalDaftar: '2026-10-23',
      status: 'Menunggu Verifikasi',
      catatanPengurus: 'Pendaftar baru, menunggu konfirmasi upload scan KK dan Akta Kelahiran.'
    }
  ],
  chatMessages: [
    {
      id: 'msg-1',
      sender: 'sistem',
      text: 'Ahlan wa Sahlan di Layanan Informasi Resmi Pondok Pesantren Bustanul Ulum. Pengurus kami siap membantu menjawab pertanyaan Anda.',
      timestamp: '08:00'
    },
    {
      id: 'msg-2',
      sender: 'pengunjung',
      text: 'Assalamu\'alaikum, mohon informasi apakah pendaftaran santri baru untuk jenjang MTs tahun ajaran 2026/2027 sudah dibuka?',
      timestamp: '08:05',
      senderName: 'Ibu Rahmawati (Tangerang)'
    },
    {
      id: 'msg-3',
      sender: 'admin',
      text: 'Wa\'alaikumsalam Warahmatullahi Wabarakatuh Ibu Rahmawati. Betul sekali, Pendaftaran Santri Baru (PSB) Gelombang 1 telah dibuka secara online melalui website ini hingga kuota terpenuhi.',
      timestamp: '08:06',
      senderName: 'Ustadz Hilman (Sekretariat PSB)'
    },
    {
      id: 'msg-4',
      sender: 'pengunjung',
      text: 'Alhamdulillah. Apakah untuk santri MTs wajib mukim di asrama? Dan apa saja materi tes masuknya ustadz?',
      timestamp: '08:08',
      senderName: 'Ibu Rahmawati (Tangerang)'
    },
    {
      id: 'msg-5',
      sender: 'admin',
      text: 'Betul Ibu, seluruh santri wajib mukim di asrama untuk pembinaan 24 jam. Materi tes seleksi meliputi: 1) Tes Baca Tulis Al-Qur\'an & Praktik Ibadah Sholat, 2) Tes Akademik Dasar (Matematika & Bahasa Indonesia), dan 3) Wawancara komitmen calon santri dan orang tua.',
      timestamp: '08:10',
      senderName: 'Ustadz Hilman (Sekretariat PSB)'
    }
  ],
  santriAktifList: [
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
      jenisKelamin: 'Putra',
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
  ],
  jadwalIbadah: [
    { id: 'ibd-1', name: 'Subuh', time: '04:32 WIB' },
    { id: 'ibd-2', name: 'Terbit', time: '05:46 WIB' },
    { id: 'ibd-3', name: 'Dzuhur', time: '11:56 WIB' },
    { id: 'ibd-4', name: 'Ashar', time: '15:14 WIB' },
    { id: 'ibd-5', name: 'Maghrib', time: '18:02 WIB' },
    { id: 'ibd-6', name: 'Isya\'', time: '19:12 WIB' }
  ],
  ekstrakurikuler: [
    { id: 'eks-1', nama: 'Seni Hadrah & Sholawat Al-Banjari', desc: 'Pengembangan seni vokal islami dan ritme rebana klasik' },
    { id: 'eks-2', nama: 'Pencak Silat Pagar Nusa', desc: 'Bela diri tradisional, ketangkasan fisik, dan penjagaan diri' },
    { id: 'eks-3', nama: 'Muhadharah 3 Bahasa', desc: 'Latihan pidato & debat intensif (Arab, Inggris, Indonesia)' },
    { id: 'eks-4', nama: 'Klub IT & Robotika Santri', desc: 'Pemrograman web dasar, robotik Arduino, dan desain multimedia' },
    { id: 'eks-5', nama: 'Seni Kaligrafi Islam (Khath)', desc: 'Penulisan naskhi, tsuluts, diwani bersama kaligrafer profesional' },
    { id: 'eks-6', nama: 'Pramuka & Kepanduan Santri', desc: 'Kepemimpinan, survival asri pegunungan, dan kekompakan tim' }
  ]
};
