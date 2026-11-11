# Redawn News — Material 3 Expressive Redesign

> **Redawn News** adalah portal berita modern berbahasa Indonesia yang dirancang ulang secara menyeluruh dengan mengadopsi prinsip desain **Material 3 Expressive (M3 You)** oleh Google, sistem motion berbasis fisika pegas (*spring easing*), serta arsitektur web statis murni yang cepat, modular, dan aksesibel.

---

## 🌟 Fitur Utama & Keunggulan

### 1. Desain Visual: Material 3 Expressive
- **Palet Tonal OKLCH**: Warna dievaluasi dalam ruang warna OKLCH untuk menjaga persepsi luminansi yang akurat di mode terang (*light*) dan mode gelap (*dark*).
- **Tipografi Variabel**: Menggunakan *Roboto Flex* dengan hierarki lengkap M3 (Display, Headline, Title, Body, dan Label).
- **Skala Bentuk (Shape Scale)**: Transisi radius mulai dari `--shape-xs` (4px) hingga `--shape-full` (999px pill) yang memberikan karakter visual yang ramah sekaligus terstruktur.
- **Elevasi Tonal**: Sistem elevasi 5 tingkat tanpa border kaku, memadukan bayangan halus dan kontainer permukaan (*surface containers*).
- **Aset Lokal Mandiri**: 27 sampul berita berupa seni vektor SVG mandiri di `assets/img/covers/`, menggantikan dependensi gambar eksternal yang lambat dan rentan rusak.

### 2. Motion System yang Responsif & Natural
- **Kurva Easing M3**: Pemanfaatan token kurva pegas ekspresif (`--ease-spring` dan `--ease-expressive`) serta *emphasized deceleration/acceleration*.
- **Hero Mask-Reveal**: Efek pembukaan gambar utama berita dengan transisi *clip-path* lembut saat elemen masuk ke viewport.
- **Morphing Nav Blob**: Indikator kategori berita berbentuk kapsul yang berpindah dan menyesuaikan ukuran secara organik mengikuti chip navigasi aktif dan *scrollspy*.
- **Circular Theme Transition**: Pergantian mode terang/gelap menggunakan *View Transitions API* dengan efek sapuan lingkaran (*circular reveal*) yang bersumber dari posisi tombol yang diklik.
- **Scroll Reveal Bertahap**: Animasi kemunculan kartu berita (*staggered reveal*) berbasis *IntersectionObserver*.
- **Aksesibilitas Gerak**: Pengaturan menyeluruh untuk pengguna dengan preferensi `prefers-reduced-motion: reduce`.

### 3. Pengalaman Pengguna (UI/UX) Lengkap
- **Pencarian Cepat (⌘K / Ctrl+K)**: Dialog pencarian instan dengan indeks pencarian lokal, navigasi papan ketik (panah atas/bawah, enter, esc), riwayat pencarian terbaru, dan saran topik hangat.
- **Daftar Baca / Bookmark**: Simpan berita favorit langsung ke *localStorage* dengan pemberitahuan *toast*, pembaruan lencana (*badge*) tersimpan secara real-time pada header desktop maupun bottom nav mobile.
- **Navigasi Bawah Mobile (Floating Bottom Bar)**: Navigasi cepat khusus layar kecil dengan efek *frosted glass* (*backdrop-filter*) yang ergonomis untuk navigasi satu tangan.
- **Daftar Isi Otomatis (TOC) & Scrollspy**: Daftar isi dinamis pada halaman detail artikel yang menyorot bagian yang sedang dibaca dan menutup otomatis pada perangkat bergerak.
- **Indikator Kemajuan Baca**: Bilah progres pembacaan artikel di bagian atas halaman serta cincin kemajuan melingkar pada tombol FAB *Back to Top*.
- **Polling & Debat Interaktif**: Komponen jajak pendapat editorial dengan animasi persentase real-time dan penyimpanan suara.
- **Filter Feed & Muat Lebih Banyak**: Penyaringan berita berdasarkan kategori dan tab tanpa memuat ulang halaman (*zero page reload*).
- **Ticker Berita Terkini**: Ticker berita berjalan (*breaking news*) dengan tombol jeda/lanjutkan.

---

## 📁 Struktur Direktori Proyek

```text
Mywebsite/
├── index.html                  # Halaman utama portal berita (beranda)
├── detail-putin-trump.html      # Templat halaman detail artikel dinamis (?id=...)
├── site.webmanifest            # Manifest Progressive Web App (PWA)
├── README.md                   # Dokumentasi teknis proyek
├── assets/
│   ├── css/
│   │   ├── tokens.css          # Design token M3 (OKLCH, tipografi, shape, motion)
│   │   ├── base.css            # Shell, reset, header, navigasi, ticker, footer
│   │   ├── components.css      # Komponen tombol, kartu, dialog, toast, poll, dsb.
│   │   └── pages.css           # Layout halaman beranda, bento grid, dan artikel
│   ├── js/
│   │   ├── data.js             # Basis data 27 artikel fiktif, kategori, & metadata
│   │   ├── app.js              # Interaksi bersama (tema, bookmark, search, poll, FAB)
│   │   └── article.js          # Renderer detail artikel, TOC scrollspy, & share links
│   └── img/
│       ├── brand/              # Aset identitas brand (mark.svg)
│       └── covers/             # 27 SVG cover berita beresolusi tinggi lokal
└── legacy/                     # Berkas CSS versi sebelumnya yang diarsipkan
    ├── hover.css
    ├── profil.css
    └── style.css
```

---

## 🚀 Cara Menjalankan Secara Lokal

Situs ini dibangun menggunakan standar web murni (Vanilla HTML5, CSS3, ES Modules), sehingga tidak membutuhkan build step atau dependensi eksternal (npm/webpack/vite).

### Menggunakan npm / Node.js (Direkomendasikan)
```bash
npm run dev
# atau: npm start
```
Buka browser dan akses:
`http://localhost:8080/index.html`

### Menggunakan Python
```bash
# Jalankan server lokal dari direktori root proyek
python3 -m http.server 8080
```

---

## 📰 Penggunaan Templat Artikel Dinamis

Halaman detail menggunakan satu templat efisien (`detail-putin-trump.html`) yang ditenagai oleh parameter URL `?id=<article-id>` dan basis data di `assets/js/data.js`.

Contoh tautan artikel:
- `detail-putin-trump.html?id=putin-trump` (Diplomasi internasional)
- `detail-putin-trump.html?id=spbu-ledakan` (Peristiwa nasional)
- `detail-putin-trump.html?id=ai-regulasi` (Teknologi & regulasi)
- `detail-putin-trump.html?id=bsu-cair` (Ekonomi & bantuan sosial)

Seluruh 27 artikel telah terhubung dengan data lengkap, tag, perkiraan waktu baca, biografi penulis, dan daftar artikel terkait yang relevan.

---

## ♿ Aksesibilitas & Standar Kualitas

- **Skor Audit**: Dirancang untuk memenuhi target skor **100 Aksesibilitas**, **100 Praktik Terbaik**, dan **100 SEO** pada audit browser Lighthouse.
- **Semantik Penuh**: Struktur HTML5 lengkap (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`).
- **Kontras Warna**: Semua kombinasi teks dan latar belakang memenuhi rasio kontras WCAG AA/AAA.
- **Navigasi Keyboard**: Fokus terlihat jelas dengan `:focus-visible`, tombol tutup dialog dengan `Esc`, dan pintasan global `⌘K` / `/`.
- **Aset Teks Alternatif**: Setiap gambar dilengkapi atribut `alt` yang deskriptif.

---

## ⚖️ Penafian Konten (*Disclaimer*)

Seluruh konten berita, nama tokoh, kutipan, organisasi, dan data statistik di dalam situs ini merupakan **karya fiktif** yang disusun semata-mata sebagai materi demonstrasi desain antarmuka, tata letak redaksional, dan purwarupa sistem interaksi jurnalisme modern.
