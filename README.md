# Petualangan Kuis Matematika Ceria — SD Kelas 3 (Semester Ganjil)

Aplikasi kuis interaktif berbasis web untuk evaluasi pembelajaran Matematika Kelas 3 SD Semester Ganjil (Bab 1, 2, dan 3) dengan 50 bank soal resmi sesuai **Kurikulum Merdeka (Fase B)** Kemendikbudristek RI.

Aplikasi ini dirancang khusus untuk di-host secara gratis di **GitHub Pages** dan menggunakan arsitektur database cloud **100% Gratis Selamanya** dengan proteksi privasi hak akses: siswa hanya dapat melihat nilainya sendiri, sedangkan rekapitulasi seluruh kelas hanya dapat diakses oleh guru melalui PIN 4 digit: **`0123`**.

---

## 🌟 Fitur Utama

1. **Bank 50 Soal Sesuai Kurikulum Merdeka**:
   - **Bab 1: Bilangan Cacah sampai 1.000** (18 Soal): Mengenal lambang bilangan, nilai tempat (ratusan, puluhan, satuan), perbandingan & urutan bilangan, penjumlahan/pengurangan teknik menyimpan & meminjam, serta pola loncat.
   - **Bab 2: Kalimat Matematika** (16 Soal): Kalimat matematika terbuka, menentukan bilangan belum diketahui ($a + \dots = b$), sifat komutatif, dan soal cerita pemecahan masalah kontekstual.
   - **Bab 3: Pengukuran Panjang dan Berat** (16 Soal): Satuan baku panjang (km, m, cm) & alat ukur, satuan baku berat (kg, g) & jenis timbangan, konversi satuan, dan soal cerita kehidupan sehari-hari.
2. **Sistem Tingkat Kesulitan Adaptif (Adaptive Scaffolding)**:
   - Tingkat kesulitan soal (🟢 Mudah, 🟡 Sedang, 🔴 Tantangan) menyesuaikan performa siswa secara dinamis.
   - Menjawab benar berturut-turut memberikan bonus bintang streak dan tantangan tingkat lanjut.
   - Menjawab salah memberikan penyesuaian soal pendukung agar siswa tidak frustrasi (*Zone of Proximal Development*).
3. **Audio Interaktif & Suara Narasi Browser**:
   - **Efek Suara Sintetis (Web Audio API)**: Suara instan bebas file eksternal (anti broken link 404), meliputi nada benar ceria, nada salah edukatif lembut, nada tombol gelembung, dan fanfare kemenangan.
   - **Narasi Pembaca Soal (Speech Synthesis API)**: Membacakan soal dan opsi jawaban dalam Bahasa Indonesia (`id-ID`) yang sangat bermanfaat untuk tipe soal *"Dengarkan Lalu Jawab"*.
   - **Kontrol Audio Mandiri**: Tombol toggle ON/OFF untuk efek suara dan narasi suara pembaca soal.
4. **Umpan Balik Edukatif (Growth Mindset)**:
   - Jawaban Benar: Apresiasi memotivasi dan penjelasan konsep singkat.
   - Jawaban Salah: Penyemangat ramah anak dan pembahasan langkah pengerjaan yang benar langkah demi langkah.
5. **Pembatasan 1x Pengerjaan Siswa**:
   - Mencegah kecurangan atau pengulangan tes. Setelah selesai, nama dan kelas terkunci di penyimpanan lokal serta database. Siswa hanya dapat melihat kartu nilai pribadinya.
6. **Dasbor Guru Terproteksi (PIN `0123`)**:
   - **Statistik Lengkap**: Total peserta, nilai rata-rata, nilai tertinggi/terendah, dan persentase ketuntasan KKM (>= 75).
   - **Diagnostik Ketuntasan per Bab**: Menampilkan persentase daya serap materi Bab 1, Bab 2, dan Bab 3 untuk acuan remedial guru.
   - **Filter Cepat**: Tab Kelas 3A, 3B, 3C, 3D, dan kolom pencarian nama siswa.
   - **Ekspor Laporan Tiga Format**:
     - 📊 **Excel (.xlsx)** via SheetJS
     - 📑 **PDF (.pdf)** via jsPDF & AutoTable (dilengkapi kop resmi dan kolom tanda tangan guru)
     - 📝 **Word (.docx)** dokumen tabel terstruktur yang dapat disunting langsung di Microsoft Word.

---

## 🚀 Panduan Hosting ke GitHub Pages

Repositori tujuan: `https://github.com/Xez0/quiz-interaktif-mtk.git`

### Langkah-langkah Unggah ke GitHub:
1. Buka terminal (PowerShell atau Command Prompt) di dalam folder proyek ini:
   ```bash
   cd c:\Users\DELL\Downloads\tugas-kuliah\quiz-interaktif-mtk
   ```
2. Inisialisasi Git dan tambahkan seluruh berkas:
   ```bash
   git init
   git add .
   git commit -m "feat: rilis perdana aplikasi kuis interaktif matematika kelas 3 SD"
   ```
3. Hubungkan ke repositori GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/Xez0/quiz-interaktif-mtk.git
   git push -u origin main
   ```
4. Mengaktifkan GitHub Pages:
   - Buka halaman repositori Anda di browser: `https://github.com/Xez0/quiz-interaktif-mtk`
   - Masuk ke tab **Settings** (Pengaturan).
   - Pilih menu **Pages** di bilah kiri.
   - Pada bagian **Build and deployment > Branch**, pilih branch: `main` dan folder: `/ (root)`.
   - Klik **Save**.
   - Tunggu sekitar 1-2 menit, tautan website kuis Anda akan aktif di:  
     `https://xez0.github.io/quiz-interaktif-mtk/`

---

## ☁️ Panduan Database Cloud 100% Gratis (Google Sheets + Apps Script)

Aplikasi ini sudah dilengkapi dengan mode demo lokal (LocalStorage) sehingga langsung bisa dimainkan dan diuji coba. Jika ingin menghubungkannya ke Google Sheets agar nilai dari berbagai gawai murid langsung tersinkronisasi secara real-time, ikuti panduan mudah 2 menit berikut:

1. Buka [Google Spreadsheet](https://sheets.new) baru di browser Anda menggunakan akun Google guru.
2. Beri nama file, misalnya: **Rekap Nilai Kuis Matematika Kelas 3**.
3. Di bilah menu atas Google Sheets, klik **Ekstensi (Extensions)** ➔ **Apps Script**.
4. Hapus semua teks di editor Apps Script, lalu salin dan tempel seluruh isi berkas [`backend/Code.gs`](backend/Code.gs).
5. Klik ikon **Simpan (Save)** 💾 di atas.
6. Klik tombol biru **Terapkan (Deploy)** di pojok kanan atas ➔ pilih **Penerapan baru (New deployment)**.
7. Pada menu roda gigi (Select type), pilih **Aplikasi web (Web app)**:
   - **Deskripsi**: `API Kuis Matematika v1`
   - **Jalankan sebagai (Execute as)**: `Saya (email Anda)`
   - **Siapa yang memiliki akses (Who has access)**: **`Siapa saja (Anyone)`** *(Wajib agar siswa dapat mengirim nilai tanpa perlu login akun Google)*.
8. Klik **Terapkan (Deploy)**. Jika diminta otorisasi izin akun Google, klik *Lanjutkan (Advanced)* ➔ *Buka Proyek (Lanjutkan)*.
9. Salin tautan **URL Aplikasi Web (Web App URL)** yang berakhiran `/exec`.
10. Buka aplikasi kuis di web, klik tombol **🔒 Guru** (masukkan PIN: `0123`), lalu klik **⚙️ Database Cloud** dan tempelkan tautan URL tersebut. Klik **Simpan Konfigurasi**. Selesai!

---

## 🛡️ Keamanan & Privasi Nilai
- Siswa mengirimkan nilai melalui metode `POST` write-only. Respon yang dikembalikan server hanyalah konfirmasi nilai siswa bersangkutan. Tidak ada data nilai siswa lain yang terkirim ke gawai siswa.
- Dasbor Guru terkunci dengan PIN **`0123`** (dapat diubah di `backend/Code.gs` dan `js/database.js`).
- Setiap gawai siswa yang telah menyelesaikan kuis akan otomatis terkunci dari pengerjaan berulang.

---

## 📁 Struktur Berkas Proyek

```text
quiz-interaktif-mtk/
├── index.html              # Antarmuka SPA lengkap (Siswa + Dasbor Guru)
├── DESIGN.md               # Spesifikasi token desain, palet warna, tipografi, dan audio
├── README.md               # Dokumentasi lengkap proyek & panduan deployment
├── css/
│   └── style.css           # Desain modern, ceria, responsif berbasis token DESIGN.md
├── js/
│   ├── quiz-data.js        # Bank 50 soal lengkap Bab 1, 2, 3 Kurikulum Merdeka
│   ├── audio-engine.js     # Web Audio API (SFX sintetis) + Speech Synthesis (Narasi Suara)
│   ├── database.js         # Konektor Google Apps Script + Fallback LocalStorage & Cek 1x
│   ├── export-engine.js    # Modul unduh laporan Excel (.xlsx), PDF (.pdf), Word (.docx)
│   └── app.js              # Logika kuis, adaptif leveling, scoring, dan alur pengerjaan
└── backend/
    └── Code.gs             # Backend serverless Google Apps Script 100% gratis
```

---

## 📜 Lisensi & Hak Cipta
Dibuat untuk keperluan pendidikan dan asesmen formatif sekolah dasar. Bebas dikembangkan dan dimodifikasi untuk kemajuan pendidikan anak Indonesia.
