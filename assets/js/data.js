/* ==========================================================================
   REDAWN — Sumber data editorial (demo)
   Semua berita di sini bersifat fiktif untuk keperluan demonstrasi desain.
   ========================================================================== */

window.REDAWN = (() => {
  const categories = {
    terbaru: "Terbaru",
    nasional: "Nasional",
    internasional: "Internasional",
    hukum: "Hukum",
    politik: "Politik",
    ekonomi: "Ekonomi",
    teknologi: "Teknologi",
    olahraga: "Olahraga",
    jabodetabek: "Jabodetabek",
    "gaya-hidup": "Gaya Hidup",
    opini: "Opini",
    infografis: "Infografis",
    foto: "Foto",
    video: "Video",
  };

  const articles = [
    {
      id: "putin-trump",
      cat: "internasional",
      title: "Putin dan Trump Bahas Masa Depan Hubungan Internasional di Pertemuan Tertutup",
      deck:
        "Perundingan maraton di Helsinki dilaporkan membahas gencatan senjata, sanksi energi, dan kerangka dialog keamanan Eropa. Tidak ada pernyataan bersama yang dirilis.",
      author: "Nadia Prameswari",
      role: "Reporter Internasional",
      date: "2026-11-11T17:05:00+07:00",
      read: 7,
      views: 48210,
      tags: ["Diplomasi", "Rusia", "Amerika Serikat", "Eropa"],
      caption:
        "Konvoi delegasi meninggalkan lokasi perundingan di Helsinki, Finlandia, Selasa malam waktu setempat.",
      body: [
        {
          type: "p",
          text:
            "PERTEMUAN antara Presiden Rusia Vladimir Putin dan Presiden Amerika Serikat Donald Trump berlangsung tertutup selama hampir empat jam di Helsinki, Finlandia. Kedua delegasi menyebut pembicaraan berlangsung \u201ckonstruktif\u201d, tetapi tidak ada pernyataan bersama maupun konferensi pers yang digelar setelah pertemuan berakhir.",
        },
        {
          type: "p",
          text:
            "Menurut dua pejabat yang mengetahui jalannya perundingan, agenda utama mencakup upaya gencatan senjata bertahap, pelonggaran sanksi sektor energi, serta pembentukan jalur komunikasi militer untuk mencegah salah perhitungan di kawasan Eropa Timur. Kedua pihak belum menyepakati tenggat waktu apa pun.",
        },
        { type: "h2", text: "Tiga agenda yang dibahas" },
        {
          type: "list",
          items: [
            "Kerangka gencatan senjata bertahap dengan pemantauan pihak ketiga.",
            "Peninjauan sanksi energi yang selama ini menekan ekspor dan logistik.",
            "Pembentukan hotline militer untuk mengurangi risiko eskalasi.",
          ],
        },
        {
          type: "quote",
          text:
            "Tidak ada kesepakatan besar hari ini. Yang ada adalah kesediaan untuk terus berbicara, dan itu sendiri sudah menjadi perubahan nada.",
          cite: "Pejabat senior yang tidak ingin disebutkan namanya",
        },
        {
          type: "h2",
          text: "Sinyal yang dibaca pasar",
        },
        {
          type: "p",
          text:
            "Analis menilai hasil pertemuan lebih bersifat simbolik ketimbang substantif. Pasar keuangan merespons hati-hati: indeks saham Eropa ditutup tipis menguat, sementara harga minyak bergerak stabil. Sejumlah duta besar negara NATO meminta penjelasan rinci mengenai isi pembicaraan.",
        },
        {
          type: "h2",
          text: "Apa yang dipantau berikutnya",
        },
        {
          type: "p",
          text:
            "Kantor kepresidenan Rusia dan Gedung Putih belum merespons permintaan konfirmasi mengenai detail pertemuan. Diplomat di Brussels mengatakan putaran pembicaraan berikutnya dijadwalkan dalam beberapa pekan ke depan, dengan lokasi yang belum dipastikan.",
        },
        {
          type: "list",
          items: [
            "Apakah kedua pihak menyepakati kerangka pemantauan gencatan senjata sebelum akhir tahun.",
            "Sejauh mana pelonggaran sanksi energi dibahas dalam pertemuan teknis.",
            "Apakah saluran komunikasi militer akan diumumkan secara resmi.",
          ],
        },
        {
          type: "facts",
          title: "Ringkasan cepat",
          items: [
            "Lokasi: Helsinki, Finlandia.",
            "Durasi: sekitar 3 jam 50 menit.",
            "Hasil: belum ada pernyataan bersama.",
            "Tindak lanjut: pembicaraan teknis dalam beberapa pekan.",
          ],
        },
      ],
    },
    {
      id: "spbu-ledakan",
      cat: "nasional",
      title: "Ledakan Guncang SPBU di Kawasan Industri, 45 Orang Luka-luka",
      deck:
        "Kebakaran diduga bermula dari kebocoran pipa distribusi. Tim pemadam masih melakukan pendinginan di lokasi.",
      author: "Bagas Prakoso",
      role: "Reporter Nasional",
      date: "2026-11-11T16:40:00+07:00",
      read: 5,
      views: 39840,
      tags: ["Kebakaran", "Keselamatan", "Jawa Barat"],
      caption: "Asap tebal membubung dari lokasi kebakaran di kawasan industri, Selasa sore.",
      body: [
        {
          type: "p",
          text:
            "Ledakan terjadi di sebuah stasiun pengisian bahan bakar umum di kawasan industri, Selasa sore. Sedikitnya 45 orang mengalami luka ringan hingga sedang dan telah dilarikan ke tiga rumah sakit terdekat.",
        },
        {
          type: "p",
          text:
            "Kepala dinas pemadam kebakaran setempat mengatakan api diduga berasal dari kebocoran pipa distribusi yang kemudian tersulut. Petugas membutuhkan waktu sekitar dua jam untuk mengendalikan api dan masih melakukan pendinginan.",
        },
        {
          type: "h2",
          text: "Evakuasi dan penanganan",
        },
        {
          type: "p",
          text:
            "Warga di radius 500 meter dievakuasi sementara. Pemerintah daerah menyiapkan posko kesehatan dan dapur umum. Jalur utama menuju kawasan industri dialihkan hingga proses pembersihan selesai.",
        },
        {
          type: "p",
          text:
            "Badan keselamatan kerja akan memeriksa riwayat perawatan fasilitas tersebut. Perusahaan pengelola belum memberikan keterangan resmi dan menyatakan sedang berkoordinasi dengan otoritas.",
        },
      ],
    },
    {
      id: "sekolah-rakyat",
      cat: "nasional",
      title: "100 Sekolah Rakyat Dibuka 14 Juli, Tampung 9.700 Siswa",
      deck:
        "Program perluasan akses pendidikan menjangkau daerah tertinggal. Pendaftaran dibuka bertahap dengan kuota per kabupaten.",
      author: "Sari Anindita",
      role: "Reporter Pendidikan",
      date: "2026-11-11T15:20:00+07:00",
      read: 4,
      views: 21430,
      tags: ["Pendidikan", "Sekolah Rakyat", "Kebijakan"],
      caption: "Suasana ruang kelas baru di salah satu sekolah rakyat.",
      body: [
        {
          type: "p",
          text:
            "Sebanyak 100 Sekolah Rakyat dijadwalkan mulai beroperasi pada 14 Juli mendatang. Program ini menargetkan 9.700 siswa dari keluarga prasejahtera di 64 kabupaten.",
        },
        {
          type: "p",
          text:
            "Menurut keterangan penyelenggara, kurikulum memadukan pembelajaran umum dengan keterampilan praktis. Setiap sekolah akan didampingi tenaga pengajar yang direkrut melalui seleksi terbuka.",
        },
        {
          type: "list",
          items: [
            "Pendaftaran dibuka bertahap mulai pekan depan.",
            "Prioritas diberikan kepada siswa dari keluarga penerima bantuan sosial.",
            "Fasilitas asrama tersedia untuk daerah dengan jarak tempuh jauh.",
          ],
        },
        {
          type: "p",
          text:
            "Pengamat pendidikan mengapresiasi perluasan akses, tetapi mengingatkan pentingnya keberlanjutan anggaran dan kualitas pengajaran. Evaluasi independen diusulkan dilakukan setiap semester.",
        },
      ],
    },
    {
      id: "bsu-cair",
      cat: "ekonomi",
      title: "BSU Belum Cair? Ini Arti Notifikasi dan Cara Cek Status Bantuan",
      deck:
        "Status penerima dapat dicek lewat kanal resmi. Waspadai tautan tidak dikenal yang meminta data pribadi.",
      author: "Rangga Wicaksana",
      role: "Reporter Ekonomi",
      date: "2026-11-11T14:10:00+07:00",
      read: 4,
      views: 51220,
      tags: ["Bantuan Sosial", "Keuangan", "Panduan"],
      caption: "Ilustrasi uang kertas rupiah dan dokumen administrasi.",
      body: [
        {
          type: "p",
          text:
            "Sebagian penerima bantuan sosial melaporkan belum menerima dana tahap terakhir. Notifikasi yang muncul di aplikasi tidak selalu berarti dana gagal disalurkan; dalam banyak kasus status masih dalam proses verifikasi rekening.",
        },
        {
          type: "h2",
          text: "Cara mengecek status",
        },
        {
          type: "list",
          items: [
            "Masuk ke kanal resmi dan gunakan nomor induk yang terdaftar.",
            "Periksa status verifikasi rekening pada menu riwayat.",
            "Hubungi layanan resmi bila status tidak berubah lebih dari 14 hari.",
          ],
        },
        {
          type: "p",
          text:
            "Otoritas mengingatkan penerima untuk tidak membagikan kode OTP atau mengklik tautan yang meminta data pribadi. Penyaluran dilakukan langsung ke rekening penerima tanpa biaya administrasi.",
        },
      ],
    },
    {
      id: "notaris-citarum",
      cat: "hukum",
      title: "Pembunuh Notaris Wanita yang Tewas Terikat di Sungai Citarum Ditangkap",
      deck:
        "Polisi menetapkan dua tersangka setelah memeriksa rekaman kamera pengawas dan keterangan saksi.",
      author: "Kezia Manurung",
      role: "Reporter Hukum",
      date: "2026-11-11T13:30:00+07:00",
      read: 5,
      views: 44670,
      tags: ["Kriminal", "Citarum", "Penegakan Hukum"],
      caption: "Petugas kepolisian saat menggelar konferensi pers di markas.",
      body: [
        {
          type: "p",
          text:
            "Polisi menangkap dua orang yang diduga terlibat dalam kasus tewasnya seorang notaris di kawasan Sungai Citarum. Penangkapan dilakukan di dua lokasi berbeda pada Selasa malam.",
        },
        {
          type: "p",
          text:
            "Menurut kepolisian, motif sementara mengarah pada sengketa dokumen kepemilikan aset. Penyidik telah menyita sejumlah barang bukti, termasuk dokumen dan perangkat elektronik.",
        },
        {
          type: "p",
          text:
            "Kuasa hukum keluarga meminta proses hukum berjalan transparan. Polisi menyatakan akan mengumumkan perkembangan penyidikan secara berkala dan mengimbau masyarakat tidak menyebarkan spekulasi.",
        },
      ],
    },
    {
      id: "dubes-as",
      cat: "politik",
      title: "Usai Uji Kelayakan Calon Dubes AS: \u201cDoakan Dulu, Masih Proses\u201d",
      deck:
        "Komisi terkait masih mendalami rekam jejak dan program kerja calon sebelum mengambil keputusan.",
      author: "Tirta Wijaya",
      role: "Reporter Politik",
      date: "2026-11-11T12:45:00+07:00",
      read: 3,
      views: 18920,
      tags: ["Diplomasi", "DPR", "Kebijakan Luar Negeri"],
      caption: "Suasana uji kelayakan calon duta besar di gedung parlemen.",
      body: [
        {
          type: "p",
          text:
            "Uji kelayakan calon duta besar untuk Amerika Serikat berlangsung selama hampir tiga jam. Anggota komisi mendalami prioritas diplomasi, perlindungan warga negara, dan kerja sama ekonomi.",
        },
        {
          type: "p",
          text:
            "Saat ditemui wartawan, calon menolak memberi keterangan rinci. \u201cDoakan dulu, masih proses,\u201d katanya singkat sebelum meninggalkan ruang sidang.",
        },
        {
          type: "p",
          text:
            "Keputusan akhir akan diambil dalam rapat pleno. Komisi menyatakan tidak ada tenggat khusus, tetapi proses diupayakan selesai sebelum akhir sesi masa sidang.",
        },
      ],
    },
    {
      id: "mrt-fase2",
      cat: "jabodetabek",
      title: "Proyek MRT Fase 2 Dilanjutkan, Target Rampung Akhir Tahun Depan",
      deck:
        "Pengerjaan terowongan bawah tanah memasuki segmen tersulit. Rekayasa lalu lintas disiapkan di sejumlah titik.",
      author: "Dimas Arya",
      role: "Reporter Jabodetabek",
      date: "2026-11-11T11:55:00+07:00",
      read: 4,
      views: 23780,
      tags: ["MRT", "Transportasi", "Jakarta"],
      caption: "Jalan protokol Jakarta dengan lalu lintas padat pada jam sibuk.",
      body: [
        {
          type: "p",
          text:
            "Pembangunan MRT Fase 2 terus berlanjut dengan target rampung akhir tahun depan. Proyek ini akan menghubungkan kawasan utara dan selatan Jakarta melalui jalur bawah tanah sepanjang lebih dari 11 kilometer.",
        },
        {
          type: "p",
          text:
            "Kontraktor melaporkan progres terowongan mencapai 68 persen. Segmen yang melewati kawasan bersejarah menjadi bagian paling menantang karena membutuhkan pemantauan getaran harian.",
        },
        {
          type: "p",
          text:
            "Pemprov menyiapkan rekayasa lalu lintas di delapan titik selama masa konstruksi. Warga diminta memanfaatkan transportasi umum dan memantau informasi resmi sebelum berkendara.",
        },
      ],
    },
    {
      id: "banjir-rob",
      cat: "jabodetabek",
      title: "Banjir Rob Mengancam Kawasan Pesisir Jakarta Utara, Warga Diminta Waspada",
      deck:
        "Puncak pasang diperkirakan terjadi dini hari. Pompa dan tanggul darurat disiagakan di titik rawan.",
      author: "Maya Kusuma",
      role: "Reporter Lingkungan",
      date: "2026-11-11T10:20:00+07:00",
      read: 3,
      views: 17440,
      tags: ["Banjir Rob", "Jakarta Utara", "Cuaca"],
      caption: "Kawasan pesisir Jakarta Utara saat air laut pasang.",
      body: [
        {
          type: "p",
          text:
            "Badan meteorologi memperkirakan banjir rob melanda sejumlah kawasan pesisir Jakarta Utara pada dini hari nanti. Ketinggian air diprediksi mencapai 20 hingga 40 sentimeter di jalan lingkungan.",
        },
        {
          type: "p",
          text:
            "Petugas menyiagakan pompa mobile dan tanggul darurat di enam kelurahan. Warga diminta memindahkan kendaraan ke tempat lebih tinggi dan menyiapkan kebutuhan darurat.",
        },
        {
          type: "p",
          text:
            "Operasi modifikasi cuaca dan perbaikan tanggul laut disebut masih berlangsung. Pemerintah daerah membuka posko pengungsian di balai warga jika ketinggian air meningkat.",
        },
      ],
    },
    {
      id: "festival-betawi",
      cat: "jabodetabek",
      title: "Festival Budaya Betawi Kembali Digelar di Monas, Meriahkan Jakarta",
      deck:
        "Pawai ondel-ondel, lenong, dan pasar kuliner tradisional menjadi daya tarik utama akhir pekan ini.",
      author: "Alya Rahmawati",
      role: "Reporter Budaya",
      date: "2026-11-11T09:45:00+07:00",
      read: 3,
      views: 13220,
      tags: ["Budaya", "Betawi", "Jakarta"],
      caption: "Ondel-ondel dan warga dalam pawai budaya Betawi.",
      body: [
        {
          type: "p",
          text:
            "Festival Budaya Betawi kembali digelar di kawasan Monumen Nasional selama tiga hari. Acara dibuka dengan pawai ondel-ondel dan pertunjukan lenong di panggung utama.",
        },
        {
          type: "p",
          text:
            "Sebanyak 120 pelaku usaha mikro, kecil, dan menengah mengisi pasar kuliner tradisional. Pengunjung juga dapat mengikuti lokakarya membatik dan membuat kue khas Betawi.",
        },
        {
          type: "p",
          text:
            "Panitia memperkirakan 60 ribu pengunjung hadir hingga hari terakhir. Pengelola kawasan mengimbau pengunjung menggunakan transportasi umum untuk mengurangi kepadatan.",
        },
      ],
    },
    {
      id: "energi-global",
      cat: "internasional",
      title: "Krisis Energi Global: Negara-negara Berusaha Mencari Solusi Jangka Panjang",
      deck:
        "Harga energi yang volatil mendorong percepatan transisi dan diversifikasi pasokan di banyak negara.",
      author: "Nadia Prameswari",
      role: "Reporter Internasional",
      date: "2026-11-10T20:10:00+07:00",
      read: 6,
      views: 28910,
      tags: ["Energi", "Geopolitik", "Transisi"],
      caption: "Para pemimpin negara dalam sesi konferensi energi internasional.",
      body: [
        {
          type: "p",
          text:
            "Krisis energi yang berkepanjangan mendorong negara-negara untuk mempercepat diversifikasi pasokan. Dalam forum energi internasional, sejumlah negara mengusulkan kerja sama penyimpanan strategis dan percepatan proyek energi terbarukan.",
        },
        {
          type: "p",
          text:
            "Harga yang volatil membuat perencanaan jangka panjang semakin sulit, terutama bagi negara pengimpor. Beberapa delegasi mendorong reformasi pasar agar lebih tahan terhadap guncangan geopolitik.",
        },
        {
          type: "p",
          text:
            "Pengamat menilai transisi energi tetap menjadi jalan keluar paling realistis, tetapi membutuhkan pendanaan besar dan kepastian regulasi. Negara berkembang meminta dukungan teknologi dan pembiayaan yang adil.",
        },
      ],
    },
    {
      id: "pbb-gencatan",
      cat: "internasional",
      title: "PBB Serukan Gencatan Senjata Segera di Zona Konflik Timur Tengah",
      deck:
        "Dewan Keamanan menggelar sesi darurat setelah lonjakan korban sipil dalam sepekan terakhir.",
      author: "Ilham Nurhadi",
      role: "Reporter Internasional",
      date: "2026-11-10T18:30:00+07:00",
      read: 5,
      views: 25110,
      tags: ["PBB", "Konflik", "Timur Tengah"],
      caption: "Sidang darurat Dewan Keamanan PBB di New York.",
      body: [
        {
          type: "p",
          text:
            "Sekretaris Jenderal PBB menyerukan gencatan senjata segera di zona konflik Timur Tengah. Seruan disampaikan dalam sidang darurat Dewan Keamanan setelah lonjakan korban sipil dalam sepekan terakhir.",
        },
        {
          type: "p",
          text:
            "Sejumlah negara anggota mendorong resolusi yang menuntut penghentian pertempuran dan pembukaan jalur bantuan kemanusiaan. Namun, perundingan mengenai draf masih alot.",
        },
        {
          type: "p",
          text:
            "Organisasi kemanusiaan memperingatkan risiko krisis pangan dan wabah penyakit di lokasi pengungsian. Akses bantuan disebut semakin terbatas akibat pertempuran dan kerusakan infrastruktur.",
        },
      ],
    },
    {
      id: "g7-bantuan",
      cat: "internasional",
      title: "Negara G7 Sepakati Paket Bantuan Ekonomi untuk Negara Berkembang",
      deck:
        "Pendanaan diarahkan ke infrastruktur hijau, kesehatan, dan transformasi digital.",
      author: "Arya Pinandita",
      role: "Reporter Ekonomi Global",
      date: "2026-11-10T16:05:00+07:00",
      read: 4,
      views: 15760,
      tags: ["G7", "Bantuan", "Ekonomi"],
      caption: "Pertemuan para menteri keuangan negara G7.",
      body: [
        {
          type: "p",
          text:
            "Negara-negara G7 menyepakati paket bantuan ekonomi untuk negara berkembang dengan prioritas infrastruktur hijau, layanan kesehatan, dan transformasi digital. Kesepakatan dicapai setelah dua hari perundingan.",
        },
        {
          type: "p",
          text:
            "Paket tersebut menggabungkan hibah, pinjaman lunak, dan jaminan investasi. Penerima diharapkan menyusun rencana penggunaan dana yang transparan dan terukur.",
        },
        {
          type: "p",
          text:
            "Organisasi masyarakat sipil menyambut baik komitmen tersebut, tetapi meminta mekanisme pemantauan yang jelas. Mereka menekankan pentingnya keterlibatan komunitas lokal dalam setiap proyek.",
        },
      ],
    },
    {
      id: "iklim-panen",
      cat: "internasional",
      title: "Perubahan Iklim Mempengaruhi Hasil Panen Global, Ancaman Ketahanan Pangan",
      deck:
        "Musim tanam yang bergeser menurunkan produksi di sejumlah wilayah. Negara berkembang paling rentan terdampak.",
      author: "Maya Kusuma",
      role: "Reporter Lingkungan",
      date: "2026-11-10T14:40:00+07:00",
      read: 5,
      views: 14110,
      tags: ["Iklim", "Pangan", "Pertanian"],
      caption: "Lahan pertanian dengan pola tanam yang berubah.",
      body: [
        {
          type: "p",
          text:
            "Perubahan pola curah hujan dan suhu ekstrem menurunkan hasil panen di sejumlah negara. Laporan terbaru menyebut musim tanam bergeser hingga tiga pekan di kawasan tropis.",
        },
        {
          type: "p",
          text:
            "Petani kecil menghadapi risiko paling besar karena keterbatasan akses terhadap asuransi, teknologi, dan informasi iklim. Ketahanan pangan jangka panjang dinilai membutuhkan investasi adaptasi.",
        },
        {
          type: "p",
          text:
            "Pemerintah dan lembaga internasional mendorong penggunaan varietas tahan iklim serta perbaikan irigasi. Para ahli menekankan perlunya data cuaca yang lebih akurat di tingkat lokal.",
        },
      ],
    },
    {
      id: "ma-perceraian",
      cat: "hukum",
      title: "Mahkamah Agung Keluarkan Aturan Baru Terkait Perceraian",
      deck:
        "Aturan mengatur prosedur mediasi dan pemeriksaan dokumen secara lebih rinci.",
      author: "Kezia Manurung",
      role: "Reporter Hukum",
      date: "2026-11-10T13:15:00+07:00",
      read: 3,
      views: 19870,
      tags: ["Mahkamah Agung", "Perceraian", "Regulasi"],
      caption: "Gedung pengadilan dengan bendera merah putih.",
      body: [
        {
          type: "p",
          text:
            "Mahkamah Agung menerbitkan aturan baru mengenai prosedur perkara perceraian. Aturan ini memperjelas tahapan mediasi dan kelengkapan dokumen yang harus dipenuhi para pihak.",
        },
        {
          type: "p",
          text:
            "Menurut keterangan humas, tujuan aturan adalah mempercepat proses tanpa mengabaikan perlindungan hak anak dan perempuan. Pengadilan diminta menyediakan layanan konsultasi hukum.",
        },
        {
          type: "p",
          text:
            "Praktisi hukum menilai aturan ini membantu mengurangi variasi praktik antarpengadilan. Namun, mereka mengingatkan beban administrasi di daerah dengan sumber daya terbatas.",
        },
      ],
    },
    {
      id: "ruu-kesehatan",
      cat: "politik",
      title: "Rancangan Undang-Undang Omnibus Law Kesehatan Masuk Tahap Finalisasi",
      deck:
        "Panitia kerja menargetkan pembahasan pasal krusial selesai pada sesi berikutnya.",
      author: "Tirta Wijaya",
      role: "Reporter Politik",
      date: "2026-11-10T11:30:00+07:00",
      read: 5,
      views: 16230,
      tags: ["RUU Kesehatan", "DPR", "Kebijakan"],
      caption: "Rapat panitia kerja di ruang sidang parlemen.",
      body: [
        {
          type: "p",
          text:
            "Rancangan Undang-Undang Kesehatan memasuki tahap finalisasi setelah panitia kerja menyelesaikan pembahasan sebagian besar pasal. Sejumlah isu krusial masih menyisakan perdebatan.",
        },
        {
          type: "p",
          text:
            "Poin yang menjadi perhatian mencakup tata kelola tenaga medis, pendanaan layanan, dan perlindungan data pasien. Pemerintah menyatakan akan menyiapkan aturan turunan sebelum undang-undang berlaku.",
        },
        {
          type: "p",
          text:
            "Organisasi profesi meminta keterlibatan mereka dalam penyusunan aturan pelaksana. Mereka menekankan pentingnya uji publik agar kebijakan dapat diterapkan secara realistis.",
        },
      ],
    },
    {
      id: "koalisi-pilpres",
      cat: "politik",
      title: "Koalisi Partai Politik Bahas Strategi Menjelang Pilpres Mendatang",
      deck:
        "Partai-partai menjajaki kesepakatan program dan pembagian peran dalam struktur kampanye.",
      author: "Tirta Wijaya",
      role: "Reporter Politik",
      date: "2026-11-10T10:05:00+07:00",
      read: 4,
      views: 12340,
      tags: ["Pilpres", "Koalisi", "Partai"],
      caption: "Pertemuan tertutup pimpinan partai politik.",
      body: [
        {
          type: "p",
          text:
            "Pimpinan sejumlah partai politik menggelar pertemuan tertutup untuk membahas strategi menjelang pemilihan presiden. Pembicaraan mencakup kesepakatan program dan pembagian peran dalam struktur kampanye.",
        },
        {
          type: "p",
          text:
            "Juru bicara masing-masing partai menegaskan belum ada keputusan final mengenai siapa yang akan diusung. Mereka menyebut pembahasan masih pada tahap penjajakan.",
        },
        {
          type: "p",
          text:
            "Pengamat politik menilai koalisi besar cenderung mengurangi kontestasi gagasan. Mereka mendorong partai untuk mempublikasikan platform secara terbuka sejak awal.",
        },
      ],
    },
    {
      id: "ai-regulasi",
      cat: "teknologi",
      title: "Debat Panas Antara Akademisi dan Praktisi Mengenai Regulasi AI",
      deck:
        "Satu pihak mendorong aturan ketat, pihak lain khawatir inovasi terhambat. Keduanya sepakat transparansi jadi kunci.",
      author: "Arya Pinandita",
      role: "Reporter Teknologi",
      date: "2026-11-09T19:20:00+07:00",
      read: 6,
      views: 34780,
      tags: ["Kecerdasan Buatan", "Regulasi", "Teknologi"],
      caption: "Ilustrasi abstrak jaringan saraf dan data.",
      body: [
        {
          type: "p",
          text:
            "Debat publik mengenai regulasi kecerdasan buatan berlangsung panas. Akademisi mendorong pengawasan ketat untuk melindungi masyarakat, sementara praktisi industri mengingatkan risiko inovasi terhambat oleh aturan yang terlalu kaku.",
        },
        {
          type: "p",
          text:
            "Keduanya sepakat pada satu hal: transparansi dan keterbukaan data menjadi kunci. Mereka juga menyarankan pendekatan berbasis risiko, dengan kewajiban berbeda untuk aplikasi berisiko rendah dan tinggi.",
        },
        {
          type: "quote",
          text:
            "Regulasi yang baik bukan yang paling cepat, tetapi yang mampu menyeimbangkan perlindungan dan ruang bereksperimen.",
          cite: "Akademisi kebijakan teknologi",
        },
        {
          type: "p",
          text:
            "Pemerintah menyatakan tengah menyusun kerangka regulasi dan membuka ruang konsultasi publik. Draf awal diharapkan dapat dibahas pada kuartal berikutnya.",
        },
      ],
    },
    {
      id: "pln-terbarukan",
      cat: "ekonomi",
      title: "PLN Perluas Jaringan Energi Terbarukan, Investasi Capai Rp42 Triliun",
      deck:
        "Pembangunan pembangkit surya dan angin menyasar kawasan timur dengan potensi besar.",
      author: "Rangga Wicaksana",
      role: "Reporter Ekonomi",
      date: "2026-11-09T16:50:00+07:00",
      read: 5,
      views: 14980,
      tags: ["Energi Terbarukan", "Investasi", "PLN"],
      caption: "Panel surya di kawasan pembangkit energi terbarukan.",
      body: [
        {
          type: "p",
          text:
            "Perusahaan listrik negara meningkatkan investasi energi terbarukan menjadi Rp42 triliun untuk tahun depan. Dana tersebut dialokasikan untuk pembangkit surya, angin, dan penguatan jaringan transmisi.",
        },
        {
          type: "p",
          text:
            "Fokus pengembangan berada di kawasan timur yang memiliki potensi surya dan angin lebih tinggi. Perusahaan menargetkan tambahan kapasitas 1,8 gigawatt dalam dua tahun.",
        },
        {
          type: "p",
          text:
            "Pengamat energi menyoroti pentingnya kesiapan jaringan dan skema penyimpanan. Tanpa itu, tambahan kapasitas terbarukan berisiko tidak terserap optimal.",
        },
      ],
    },
    {
      id: "korupsi-ikn",
      cat: "hukum",
      title: "Investigasi Eksklusif: Jejak Penyimpangan di Proyek Megah Ibu Kota",
      deck:
        "Dokumen internal menunjukkan sejumlah pengadaan berjalan tanpa evaluasi yang memadai.",
      author: "Ilham Nurhadi",
      role: "Tim Investigasi",
      date: "2026-11-09T14:10:00+07:00",
      read: 9,
      views: 41880,
      tags: ["Investigasi", "Pengadaan", "Ibu Kota"],
      caption: "Dokumen dan arsip pengadaan proyek infrastruktur.",
      body: [
        {
          type: "p",
          text:
            "Tim investigasi menelusuri sejumlah dokumen pengadaan proyek ibu kota baru. Temuan awal menunjukkan beberapa paket pekerjaan berjalan tanpa evaluasi teknis yang memadai.",
        },
        {
          type: "p",
          text:
            "Dokumen yang diperoleh mencantumkan percepatan jadwal sebagai alasan utama. Namun, tidak ditemukan catatan penilaian risiko yang biasanya menyertai perubahan kontrak.",
        },
        {
          type: "p",
          text:
            "Otoritas terkait menyatakan akan memeriksa temuan tersebut. Mereka mengimbau agar proses investigasi tidak diganggu dan menegaskan komitmen pada transparansi.",
        },
        {
          type: "note",
          text:
            "Artikel ini merupakan bagian dari simulasi investigasi untuk demo desain. Nama, angka, dan dokumen bersifat fiktif.",
        },
      ],
    },
    {
      id: "timnas",
      cat: "olahraga",
      title: "Timnas Melaju ke Semifinal Usai Menang Dramatis di Menit Akhir",
      deck:
        "Gol penentu tercipta pada menit ke-89 setelah tekanan bertubi-tubi sepanjang babak kedua.",
      author: "Bimo Saputra",
      role: "Reporter Olahraga",
      date: "2026-11-09T22:40:00+07:00",
      read: 4,
      views: 37210,
      tags: ["Sepak Bola", "Timnas", "Semifinal"],
      caption: "Selebrasi pemain setelah gol penentu di menit akhir.",
      body: [
        {
          type: "p",
          text:
            "Timnas memastikan tiket semifinal setelah menang dramatis 2-1. Gol penentu tercipta pada menit ke-89 memanfaatkan kemelut di depan gawang lawan.",
        },
        {
          type: "p",
          text:
            "Sepanjang babak kedua, timnas mendominasi penguasaan bola dengan 14 tembakan. Pelatih menyebut pergantian pemain menjadi kunci meningkatnya intensitas.",
        },
        {
          type: "p",
          text:
            "Di semifinal, timnas akan menghadapi pemenang laga lainnya. Tim pelatih memilih fokus pada pemulihan kondisi pemain dan evaluasi pertahanan.",
        },
      ],
    },
    {
      id: "startup-ai",
      cat: "teknologi",
      title: "Startup Lokal Kembangkan Asisten AI Berbahasa Daerah",
      deck:
        "Model dilatih dengan korpus percakapan sehari-hari dan dievaluasi bersama komunitas penutur.",
      author: "Arya Pinandita",
      role: "Reporter Teknologi",
      date: "2026-11-09T11:25:00+07:00",
      read: 5,
      views: 20540,
      tags: ["Startup", "AI", "Bahasa"],
      caption: "Ilustrasi abstrak komputasi dan bahasa.",
      body: [
        {
          type: "p",
          text:
            "Sebuah startup lokal mengembangkan asisten berbasis kecerdasan buatan yang mampu memahami beberapa bahasa daerah. Model dilatih menggunakan korpus percakapan sehari-hari yang dikumpulkan bersama komunitas.",
        },
        {
          type: "p",
          text:
            "Pengembang menekankan pendekatan partisipatif: penutur asli dilibatkan dalam evaluasi kualitas terjemahan dan konteks budaya. Hal ini untuk menghindari kesalahan makna yang sering terjadi pada model umum.",
        },
        {
          type: "p",
          text:
            "Produk masih dalam tahap uji terbatas. Startup berencana membuka akses lebih luas setelah menyelesaikan audit privasi dan keamanan data.",
        },
      ],
    },
    {
      id: "kuliner",
      cat: "gaya-hidup",
      title: "Menjelajah Kuliner Pasar Lama: Dari Sarapan Hingga Tengah Malam",
      deck:
        "Deretan warung legendaris menawarkan cita rasa yang bertahan lintas generasi.",
      author: "Alya Rahmawati",
      role: "Reporter Gaya Hidup",
      date: "2026-11-08T20:00:00+07:00",
      read: 6,
      views: 11880,
      tags: ["Kuliner", "Pasar", "Wisata"],
      caption: "Suasana pasar lama dengan deretan warung kuliner.",
      body: [
        {
          type: "p",
          text:
            "Pasar lama menyimpan banyak cerita kuliner yang bertahan lintas generasi. Mulai dari sarapan bubur hingga hidangan tengah malam, deretan warung di kawasan ini selalu ramai pengunjung.",
        },
        {
          type: "p",
          text:
            "Salah satu pedagang mengaku telah berjualan sejak 1987. Resep keluarga dan hubungan personal dengan pelanggan menjadi alasan warungnya tetap bertahan.",
        },
        {
          type: "p",
          text:
            "Pengelola kawasan tengah menata ulang area kuliner agar lebih nyaman dan higienis. Pedagang berharap penataan tetap mempertahankan karakter pasar tradisional.",
        },
      ],
    },
    {
      id: "dbd-infografis",
      cat: "infografis",
      title: "Infografis: Persebaran Kasus Demam Berdarah di Jabodetabek",
      deck:
        "Data sebulan terakhir menunjukkan lonjakan di sejumlah kecamatan padat penduduk.",
      author: "Redaksi Data",
      role: "Tim Visual",
      date: "2026-11-08T15:30:00+07:00",
      read: 3,
      views: 9670,
      tags: ["Infografis", "Kesehatan", "Data"],
      caption: "Infografis persebaran kasus demam berdarah.",
      body: [
        {
          type: "p",
          text:
            "Kasus demam berdarah di Jabodetabek menunjukkan tren peningkatan dalam sebulan terakhir. Kecamatan dengan kepadatan penduduk tinggi mencatat angka tertinggi.",
        },
        {
          type: "p",
          text:
            "Dinas kesehatan mengimbau warga melakukan pemberantasan sarang nyamuk secara rutin. Pengasapan dinilai tidak cukup tanpa pengelolaan genangan air di lingkungan rumah.",
        },
        {
          type: "p",
          text:
            "Data dalam infografis ini diolah dari laporan mingguan puskesmas dan bersifat ilustratif untuk demo desain.",
        },
      ],
    },
    {
      id: "upacara-adat",
      cat: "foto",
      title: "Foto-foto Indahnya Tradisi Upacara Adat di Pedalaman Sulawesi",
      deck:
        "Rangkaian prosesi penuh makna yang diwariskan dari generasi ke generasi.",
      author: "Alya Rahmawati",
      role: "Fotografer",
      date: "2026-11-08T10:10:00+07:00",
      read: 4,
      views: 8760,
      tags: ["Foto", "Budaya", "Sulawesi"],
      caption: "Warga mengenakan pakaian adat dalam prosesi upacara.",
      body: [
        {
          type: "p",
          text:
            "Rangkaian upacara adat di pedalaman Sulawesi berlangsung selama tiga hari. Warga dari berbagai desa berkumpul untuk mengikuti prosesi yang diwariskan turun-temurun.",
        },
        {
          type: "p",
          text:
            "Setiap tahapan memiliki makna tersendiri, mulai dari persiapan sesajen hingga puncak doa bersama. Pakaian dan musik tradisional menjadi bagian tak terpisahkan.",
        },
        {
          type: "p",
          text:
            "Fotografer mencatat momen kebersamaan warga dan detail tekstil yang jarang terlihat. Karya foto ini merupakan bagian dari seri dokumentasi budaya.",
        },
      ],
    },
    {
      id: "longsor-sumbar",
      cat: "video",
      title: "Video Detik-detik Penyelamatan Korban Longsor di Sumatera Barat",
      deck:
        "Tim SAR mengevakuasi warga menggunakan peralatan manual di medan yang sulit dijangkau.",
      author: "Bimo Saputra",
      role: "Tim Video",
      date: "2026-11-07T21:15:00+07:00",
      read: 3,
      views: 26430,
      tags: ["Video", "Longsor", "SAR"],
      caption: "Tim SAR mengevakuasi warga dari lokasi longsor.",
      body: [
        {
          type: "p",
          text:
            "Tim SAR mengevakuasi sejumlah warga setelah longsor menimbun akses jalan di Sumatera Barat. Medan yang licin dan hujan yang masih turun memperlambat proses evakuasi.",
        },
        {
          type: "p",
          text:
            "Peralatan berat baru bisa didatangkan setelah jalur alternatif dibuka. Sementara itu, petugas menggunakan peralatan manual untuk menjangkau titik terdalam.",
        },
        {
          type: "p",
          text:
            "Warga diimbau tetap waspada terhadap potensi longsor susulan. Posko darurat menyediakan kebutuhan dasar bagi keluarga terdampak.",
        },
      ],
    },
    {
      id: "opini-energi",
      cat: "opini",
      title: "Transisi Energi Tidak Cukup dengan Janji, Butuh Akuntabilitas",
      deck:
        "Kebijakan energi perlu indikator yang terukur, transparan, dan dapat diaudit publik.",
      author: "Prof. Anindya Kusumastuti",
      role: "Pengamat Kebijakan Energi",
      date: "2026-11-07T09:00:00+07:00",
      read: 7,
      views: 10230,
      tags: ["Opini", "Energi", "Kebijakan"],
      caption: "Ilustrasi lanskap energi terbarukan.",
      body: [
        {
          type: "p",
          text:
            "Janji transisi energi terus diulang setiap tahun, tetapi tanpa indikator yang terukur janji itu sulit dievaluasi. Kita membutuhkan kerangka akuntabilitas yang jelas, mulai dari target kapasitas hingga evaluasi dampak sosial.",
        },
        {
          type: "p",
          text:
            "Persoalannya bukan sekadar pendanaan. Tata kelola, kapasitas teknis, dan koordinasi antarsektor sama pentingnya. Tanpa itu, proyek besar cenderung berhenti pada seremoni.",
        },
        {
          type: "p",
          text:
            "Publik berhak mendapatkan laporan berkala yang mudah diakses. Transparansi bukan beban, melainkan cara membangun kepercayaan dan memperbaiki kebijakan lebih cepat.",
        },
      ],
    },
    {
      id: "umkm-digital",
      cat: "opini",
      title: "Opini: Tantangan Ekonomi Digital dan Peran UMKM di Indonesia",
      deck:
        "Digitalisasi membuka pasar baru, tetapi kesenjangan literasi dan akses pembiayaan masih nyata.",
      author: "Dr. Rayhan Mahendra",
      role: "Ekonom",
      date: "2026-11-06T14:00:00+07:00",
      read: 6,
      views: 11450,
      tags: ["Opini", "UMKM", "Ekonomi Digital"],
      caption: "Meja kerja dengan laptop dan catatan.",
      body: [
        {
          type: "p",
          text:
            "Digitalisasi memberi UMKM akses pasar yang jauh lebih luas. Namun, manfaat itu belum merata karena kesenjangan literasi digital dan akses pembiayaan masih cukup besar.",
        },
        {
          type: "p",
          text:
            "Pelatihan yang berkelanjutan lebih dibutuhkan daripada program sesaat. Pendampingan harus disesuaikan dengan jenis usaha dan konteks lokal.",
        },
        {
          type: "p",
          text:
            "Kolaborasi antara pemerintah, platform, dan lembaga keuangan menjadi kunci. Tanpa ekosistem yang saling mendukung, transformasi digital hanya akan dirasakan segelintir pelaku usaha.",
        },
      ],
    },
  ];

  return {
    updated: "2026-11-11T18:20:00+07:00",
    categories,
    articles,
    topics: [
      "Pemilu 2029",
      "Transisi energi",
      "Kecerdasan buatan",
      "Ekonomi digital",
      "Transportasi publik",
      "Perubahan iklim",
      "Kesehatan masyarakat",
      "Sepak bola nasional",
    ],
  };
})();
