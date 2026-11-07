# DESIGN.md — Petualangan Matematika Ceria (Kelas 3 SD)

Sistem desain antarmuka ramah anak untuk Aplikasi Kuis Interaktif Matematika SD Kelas 3 Semester Ganjil (Bab 1, 2, dan 3). Mengadopsi prinsip desain dari `awesome-design-md` yang dipadukan dengan standar desain edukasi modern (inspirasi: Duolingo, Khan Academy Kids, dan Apple Kid-Friendly UI).

---

## 1. Visual Theme & Atmosphere
- **Suasana**: Ceria, hangat, membangkitkan rasa ingin tahu, dan ramah anak (*joyful, encouraging, playful, and approachable*).
- **Filosofi Interaksi**: *Tactile & Chubby*. Tombol memiliki kedalaman 3D empuk yang memuaskan ketika ditekan, kartu bertepi lengkung besar (*rounded*), dan ruang sentuh lega (*fat-finger friendly*) agar nyaman digunakan di tablet sekolah atau ponsel orang tua.
- **Tone of Voice (Pedagogis)**: Menguatkan (*empowering*), mengapresiasi setiap usaha, dan memberikan koreksi tanpa menghakimi (*growth mindset*).

---

## 2. Color Palette & Roles

| Token Name | Hex Code | Peran Fungsional | Deskripsi Visual |
| :--- | :--- | :--- | :--- |
| `--color-sky-500` | `#0ea5e9` | Primary Brand / Action | Biru langit cerah, tombol utama |
| `--color-sky-600` | `#0284c7` | Primary Dark (3D Shadow) | Bayangan dasar tombol biru |
| `--color-sky-100` | `#e0f2fe` | Primary Light / Tint | Latar belakang lencana & sorotan |
| `--color-sun-400` | `#facc15` | Accent / Stars / Reward | Kuning matahari, bintang prestasi |
| `--color-sun-600` | `#ca8a04` | Accent Dark (3D Shadow) | Bayangan dasar tombol emas/kuning |
| `--color-mint-500`| `#22c55e` | Success / Jawaban Benar | Hijau segar ramah anak |
| `--color-mint-600`| `#16a34a` | Success Dark (3D Shadow) | Bayangan dasar tombol sukses |
| `--color-coral-500`| `#f43f5e`| Warm Alert / Koreksi | Merah muda koral lembut (tidak menakutkan) |
| `--color-coral-600`| `#e11d48`| Coral Dark (3D Shadow) | Bayangan dasar tombol koral |
| `--color-purple-500`| `#a855f7`| Bab 2 / Kalimat Matematika | Ungu imajinatif |
| `--color-orange-500`| `#f97316`| Bab 3 / Pengukuran | Oranye enerjik |
| `--color-cloud-50` | `#f8fafc` | Surface Canvas (Background)| Putih awan lembut dengan saturasi sejuk |
| `--color-cloud-100`| `#f1f5f9` | Card Surface / Borders | Warna kartu kontras rendah |
| `--color-slate-800`| `#1e293b` | Ink Primary (Text Utama) | Teks arang berdaya kontras tinggi |
| `--color-slate-500`| `#64748b` | Ink Muted (Keterangan) | Teks sekunder untuk label instruksi |

---

## 3. Typography Rules
Menggunakan kombinasi font Google Fonts yang terbaca jelas dan berkarakter ramah:
- **Display & Headings**: `Fredoka`, sans-serif membulat (*rounded geometry*), `font-weight: 600 - 700`.
- **Body & Options**: `Nunito`, sans-serif dengan proporsi ramah pembaca cilik, `font-weight: 500 - 800`.
- **Skala Ukuran**:
  - `Display / Judul Kuis`: `28px` - `36px` (Mobile: `24px` - `28px`), `line-height: 1.2`
  - `Soal Kuis`: `20px` - `24px` (Mobile: `18px` - `20px`), `line-height: 1.4`
  - `Opsi Jawaban`: `18px` - `20px`, `line-height: 1.3`, `font-weight: 700`
  - `Label & Badges`: `13px` - `15px`, `font-weight: 800`, `letter-spacing: 0.5px`

---

## 4. Component Stylings

### A. Chunky 3D Buttons (Gaya Tactile Ramah Anak)
```css
.btn-chunky {
  border-radius: 18px;
  border: 2px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 6px 0 var(--btn-shadow-color);
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  min-height: 52px;
}
.btn-chunky:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 0 var(--btn-shadow-color);
}
.btn-chunky:active {
  transform: translateY(4px);
  box-shadow: 0 2px 0 var(--btn-shadow-color);
}
```

### B. Option Cards (Pilihan Ganda A, B, C, D)
- Sudut membulat `border-radius: 20px`.
- Latar putih dengan border `2px solid #e2e8f0`.
- Efek hover: Terangkat halus dengan highlight warna biru muda.
- Status Benar: Hijau mint ceria (`#22c55e`) dengan border tebal dan ikon centang bintang.
- Status Salah: Koral cerah (`#f43f5e`) dengan getaran halus (*shake animation*).

### C. Audio Indicator & Badges
- Tombol audio "Dengarkan Soal 🔊" berukuran besar dan mudah ditekan.
- Animasi denyut halus (*pulsing wave*) saat audio narasi sedang dibacakan.
- Badge tingkat kesulitan:
  - 🟢 **Mudah**: Latar hijau lembut, ikon 1 bintang
  - 🟡 **Sedang**: Latar kuning lembut, ikon 2 bintang
  - 🔴 **Tantangan**: Latar oranye/koral lembut, ikon 3 bintang

---

## 5. Audio Cues & Interaction Sound Design
- **Benar**: Arpeggio Mayor ceria (C5 - E5 - G5 - C6) durasi 0.35s.
- **Salah**: Duotone edukatif menenangkan (G4 - Eb4) durasi 0.30s.
- **Klik Tombol**: Synthesized Bubble Pop frekuensi 400Hz ke 800Hz durasi 0.08s.
- **Fanfare Kemenangan**: Melodi selebrasi multi-nada riang disertai letupan confetti.
- **Narasi Suara**: Web Speech Synthesis API (`id-ID`) dengan intonasi hangat, kecepatan baca normal (`rate: 0.95`) agar mudah ditangkap siswa kelas 3 SD.

---

## 6. Layout & Responsiveness
- Berbasis Flexbox dan CSS Grid modern.
- Target sentuh minimal: `48px x 48px` untuk setiap elemen interaktif.
- Mendukung layar ponsel (360px - 480px), tablet (768px - 1024px), dan layar proyektor / laptop kelas (1200px+).
