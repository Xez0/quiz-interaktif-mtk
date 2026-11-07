/**
 * BANK 50 SOAL MATEMATIKA KELAS 3 SD SEMESTER GANJIL
 * Kurikulum Merdeka - Fase B (Kemendikbudristek RI)
 * 
 * Cakupan Materi:
 * - Bab 1: Bilangan Cacah sampai 1.000 (18 Soal, ID 1-18)
 * - Bab 2: Kalimat Matematika (16 Soal, ID 19-34)
 * - Bab 3: Pengukuran Panjang dan Berat (16 Soal, ID 35-50)
 */

const QUIZ_DATA = [
  // ========================================================
  // BAB 1: BILANGAN CACAH SAMPAI 1.000 (18 SOAL)
  // ========================================================
  {
    id: 1,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "easy",
    question: "Lambang bilangan dari 'Empat ratus tujuh puluh lima' ditulis...",
    options: ["457", "475", "574", "745"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Hebat sekali! Kamu membaca dan menulis bilangan tiga angka dengan sangat teliti!",
    explanation: "Empat ratus (400) + tujuh puluh (70) + lima (5) jika digabungkan menjadi lambang bilangan 475."
  },
  {
    id: 2,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "easy",
    question: "Bilangan 608 jika dibaca dengan kata-kata adalah...",
    options: ["Enam ratus delapan", "Enam ratus delapan puluh", "Enam puluh delapan", "Delapan ratus enam"],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Tepat sekali! Kamu cermat melihat angka nol di posisi puluhan!",
    explanation: "Pada bilangan 608, angka 6 bernilai ratusan, angka 0 puluhan (tidak dibaca puluhan), dan 8 adalah satuan. Jadi dibaca 'Enam ratus delapan'."
  },
  {
    id: 3,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "easy",
    question: "Pada bilangan 835, angka 3 menempati nilai tempat...",
    options: ["Satuan", "Puluhan", "Ratusan", "Ribuan"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Pintar! Kamu memahami nilai tempat puluhan dengan benar!",
    explanation: "Pada bilangan 835: angka 8 menempati Ratusan (800), angka 3 menempati Puluhan (30), dan angka 5 menempati Satuan (5)."
  },
  {
    id: 4,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "easy",
    question: "Dengarkan baik-baik: Nilai tempat dari angka 7 pada bilangan 742 adalah...",
    options: ["Satuan", "Puluhan", "Ratusan", "Ribuan"],
    answer: 2,
    isAudioQuestion: true,
    appreciation: "Luar biasa! Pendengaran dan nalarmu sangat tajam!",
    explanation: "Angka 7 berada di posisi paling depan pada bilangan 3 angka 742, yang berarti menempati nilai tempat Ratusan (nilainya 700)."
  },
  {
    id: 5,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "easy",
    question: "Bentuk panjang dari bilangan 592 adalah...",
    options: [
      "50 + 90 + 2",
      "500 + 9 + 2",
      "500 + 90 + 2",
      "500 + 900 + 2"
    ],
    answer: 2,
    isAudioQuestion: false,
    appreciation: "Bagus sekali! Menguraikan bilangan berdasarkan nilai tempat sudah kamu kuasai!",
    explanation: "Bilangan 592 tersusun dari 5 ratusan (500) + 9 puluhan (90) + 2 satuan (2) = 500 + 90 + 2."
  },
  {
    id: 6,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "easy",
    question: "Tanda pembanding yang tepat untuk mengisi titik-titik pada: 348 ... 384 adalah...",
    options: ["> (lebih dari)", "< (kurang dari)", "= (sama dengan)", "+ (tambah)"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Tepat sekali! Membandingkan nilai puluhan membuatmu menemukan jawaban yang benar!",
    explanation: "Ratusannya sama (3), tetapi puluhannya berbeda: 4 puluhan lebih kecil dari 8 puluhan. Jadi 348 < 384 (348 kurang dari 384)."
  },
  {
    id: 7,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "easy",
    question: "Urutan bilangan berikut dari yang TERKECIL ke terbesar adalah: 420, 240, 310",
    options: [
      "240, 310, 420",
      "420, 310, 240",
      "310, 240, 420",
      "240, 420, 310"
    ],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Keren! Kamu sangat cermat mengurutkan bilangan dari yang paling kecil!",
    explanation: "Bandingkan angka ratusannya: 240 (ratusan 2), 310 (ratusan 3), dan 420 (ratusan 4). Urutan dari terkecil adalah 240, 310, 420."
  },
  {
    id: 8,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "medium",
    question: "Hasil penjumlahan dari 235 + 142 adalah...",
    options: ["367", "377", "378", "477"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Hebat! Penjumlahan bersusun tanpa menyimpan sudah kamu selesaikan dengan mulus!",
    explanation: "Hitung dari satuan: 5 + 2 = 7. Puluhan: 3 + 4 = 7. Ratusan: 2 + 1 = 3. Hasilnya adalah 377."
  },
  {
    id: 9,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "medium",
    question: "Hasil dari 358 + 264 dengan teknik menyimpan adalah...",
    options: ["612", "622", "618", "522"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Luar biasa! Ketelitianmu dalam teknik menyimpan sangat jempolan!",
    explanation: "Satuan: 8 + 4 = 12 (tulis 2, simpan 1 di puluhan). Puluhan: 1 + 5 + 6 = 12 (tulis 2, simpan 1 di ratusan). Ratusan: 1 + 3 + 2 = 6. Jadi 622."
  },
  {
    id: 10,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "medium",
    question: "Hasil pengurangan dari 576 - 243 adalah...",
    options: ["333", "323", "343", "334"],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Mantap! Pengurangan bilangan ratusan berhasil kamu kerjakan dengan benar!",
    explanation: "Satuan: 6 - 3 = 3. Puluhan: 7 - 4 = 3. Ratusan: 5 - 2 = 3. Hasil akhirnya adalah 333."
  },
  {
    id: 11,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "medium",
    question: "Hasil dari 624 - 158 dengan teknik meminjam adalah...",
    options: ["466", "476", "566", "468"],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Keren sekali! Teknik meminjam pada pengurangan berhasil kamu kuasai!",
    explanation: "Satuan: 4 - 8 (pinjam 1 puluhan jadi 14 - 8 = 6). Puluhan tersisa 1 (pinjam 1 ratusan jadi 11 - 5 = 6). Ratusan tersisa 5 - 1 = 4. Hasilnya 466."
  },
  {
    id: 12,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "medium",
    question: "Perhatikan pola bilangan loncat berikut: 120, 125, 130, ..., 140. Bilangan yang tepat untuk mengisi titik-titik adalah...",
    options: ["132", "135", "136", "138"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Pintar! Kamu berhasil menemukan aturan pola bilangan loncat 5!",
    explanation: "Setiap bilangan bertambah 5 (+5). Jadi setelah 130 adalah 130 + 5 = 135."
  },
  {
    id: 13,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "medium",
    question: "Dengarkan baik-baik: Ada pola bilangan loncat sepuluh: 450, 460, 470, .... Angka berikutnya adalah...",
    options: ["475", "480", "490", "500"],
    answer: 1,
    isAudioQuestion: true,
    appreciation: "Tepat sekali! Kamu menyimak dengan teliti dan menghitung loncat 10 dengan benar!",
    explanation: "Pola bilangan selalu bertambah 10 (+10). Setelah 470 ditambah 10 menjadi 480."
  },
  {
    id: 14,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "medium",
    question: "Bilangan yang terletak tepat di antara 699 dan 701 adalah...",
    options: ["698", "700", "702", "710"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Hebat! Kamu memahami urutan bilangan melintasi angka ratusan!",
    explanation: "Setelah bilangan 699 bertambah 1 menjadi 700, lalu bilangan berikutnya adalah 701."
  },
  {
    id: 15,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "hard",
    question: "Di perpustakaan SD Cendekia terdapat 345 buku cerita dan 280 buku pelajaran. Jumlah seluruh buku di perpustakaan adalah...",
    options: ["615 buku", "625 buku", "525 buku", "635 buku"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Luar biasa! Kamu pintar menyelesaikan soal cerita penjumlahan ratusan!",
    explanation: "Jumlah seluruh buku = 345 + 280. Hitung: 5 + 0 = 5; 4 + 8 = 12 (simpan 1); 1 + 3 + 2 = 6. Jadi total buku adalah 625 buku."
  },
  {
    id: 16,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "hard",
    question: "Pak Budi memanen 750 butir telur ayam. Sebanyak 185 butir telur telah terjual ke pasar. Sisa telur Pak Budi sekarang adalah...",
    options: ["565 butir", "575 butir", "665 butir", "555 butir"],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Super! Soal cerita pengurangan ratusan berhasil kamu selesaikan dengan teliti!",
    explanation: "Sisa telur = 750 - 185. Pengurangan: 0 pinjam 1 puluhan jadi 10 - 5 = 5; 4 pinjam 1 ratusan jadi 14 - 8 = 6; 6 - 1 = 5. Hasilnya 565 butir."
  },
  {
    id: 17,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "hard",
    question: "Aku adalah sebuah bilangan tiga angka. Angka ratusanku 7, angka puluhanku 2 lebih banyak dari ratusan, dan angka satuanku 4. Bilangan berapakah aku?",
    options: ["754", "794", "784", "974"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Luar biasa cerdas! Teka-teki nilai tempat berhasil kamu pecahkan!",
    explanation: "Ratusan = 7. Puluhan = 7 + 2 = 9. Satuan = 4. Jika dirangkai menjadi bilangan 794."
  },
  {
    id: 18,
    babId: 1,
    babTitle: "Bab 1: Bilangan Cacah sampai 1.000",
    difficulty: "hard",
    question: "Ahmad memiliki 240 kelereng. Kakak memberinya 135 kelereng lagi. Keesokan harinya, Ahmad memberikan 50 kelereng kepada temannya. Kelereng Ahmad sekarang adalah...",
    options: ["325 kelereng", "315 kelereng", "335 kelereng", "375 kelereng"],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Hebat luar biasa! Soal operasi hitung campuran bertahap berhasil kamu tuntaskan!",
    explanation: "Langkah 1: 240 + 135 = 375 kelereng. Langkah 2: 375 - 50 = 325 kelereng. Jadi kelereng Ahmad tersisa 325 butir."
  },

  // ========================================================
  // BAB 2: KALIMAT MATEMATIKA (16 SOAL)
  // ========================================================
  {
    id: 19,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "easy",
    question: "Perhatikan kalimat matematika ini: 15 + ... = 20. Bilangan yang tepat untuk mengisi titik-titik adalah...",
    options: ["4", "5", "6", "10"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Tepat sekali! Kamu menemukan bilangan yang belum diketahui dengan cepat!",
    explanation: "Untuk mencari bilangan yang belum diketahui pada penjumlahan: 20 - 15 = 5. Jadi 15 + 5 = 20."
  },
  {
    id: 20,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "easy",
    question: "Kalimat matematika: ... - 8 = 12. Bilangan yang tepat pada titik-titik adalah...",
    options: ["18", "20", "22", "4"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Hebat! Kamu memahami hubungan antara pengurangan dan penjumlahan!",
    explanation: "Bilangan awal pada pengurangan dapat dicari dengan menjumlahkan hasilnya: 12 + 8 = 20. Terbukti: 20 - 8 = 12."
  },
  {
    id: 21,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "easy",
    question: "Ibu membeli 12 buah apel, lalu Ibu membeli lagi 8 buah apel. Kalimat matematika yang sesuai adalah...",
    options: ["12 - 8 = 4", "12 + 8 = 20", "12 x 8 = 96", "20 - 12 = 8"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Bagus sekali! Kamu pintar menerjemahkan cerita ke dalam kalimat matematika!",
    explanation: "Karena apel dibeli lagi (bertambah), operasinya adalah penjumlahan: 12 + 8 = 20."
  },
  {
    id: 22,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "easy",
    question: "Dengarkan baik-baik: Ada kalimat 30 ditambah berapa supaya hasilnya menjadi 50?",
    options: ["10", "15", "20", "25"],
    answer: 2,
    isAudioQuestion: true,
    appreciation: "Keren! Menyimak soal suara dan berhitung di kepalamu sangat lancar!",
    explanation: "Kalimat matematikanya adalah 30 + ... = 50. Cara mencarinya: 50 - 30 = 20."
  },
  {
    id: 23,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "easy",
    question: "Jika 45 + 25 = 70, maka kalimat pengurangan yang berkaitan adalah...",
    options: ["70 - 25 = 45", "70 + 45 = 115", "45 - 25 = 20", "70 - 10 = 60"],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Pintar! Penjumlahan dan pengurangan memang saling berpasangan!",
    explanation: "Operasi penjumlahan saling berkebalikan dengan pengurangan. Jika 45 + 25 = 70, maka 70 - 25 = 45 dan 70 - 45 = 25."
  },
  {
    id: 24,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "easy",
    question: "Nilai n yang memenuhi kalimat matematika: 50 - n = 35 adalah...",
    options: ["15", "25", "85", "10"],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Tepat sekali! Menemukan nilai simbol n semakin mahir!",
    explanation: "Untuk mencari pengurang: 50 - 35 = 15. Jadi nilai n adalah 15."
  },
  {
    id: 25,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "medium",
    question: "Tentukan nilai titik-titik pada kalimat: 125 + ... = 200",
    options: ["65", "75", "85", "95"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Hebat! Pengurangan ratusan untuk mencari bilangan hilang kamu kerjakan dengan teliti!",
    explanation: "Hitung: 200 - 125. 200 - 100 = 100, lalu 100 - 25 = 75. Jadi 125 + 75 = 200."
  },
  {
    id: 26,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "medium",
    question: "Kalimat matematika: ... - 140 = 210. Bilangan yang tepat adalah...",
    options: ["340", "350", "360", "70"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Mantap! Kamu langsung menjumlahkan hasil dan pengurangnya!",
    explanation: "Bilangan mula-mula = 210 + 140 = 350. Pembuktian: 350 - 140 = 210."
  },
  {
    id: 27,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "medium",
    question: "Dina memiliki beberapa pita. Setelah diberi ibu 28 buah pita lagi, kini pita Dina menjadi 75 buah. Berapa buah pita Dina mula-mula?",
    options: ["47 pita", "57 pita", "43 pita", "103 pita"],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Luar biasa! Kalimat matematika soal cerita pita terjawab dengan tepat!",
    explanation: "Kalimat matematika: pita awal + 28 = 75. Pita awal = 75 - 28 = 47 pita."
  },
  {
    id: 28,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "medium",
    question: "Dengarkan baik-baik: Sebuah toko memiliki 150 kotak susu. Setelah terjual sebagian, tersisa 65 kotak susu. Berapa banyak susu yang terjual?",
    options: ["75 kotak", "85 kotak", "95 kotak", "115 kotak"],
    answer: 1,
    isAudioQuestion: true,
    appreciation: "Pintar sekali! Soal audio penalaran cerita terjawab dengan sempurna!",
    explanation: "Kalimat matematika: 150 - susu terjual = 65. Susu terjual = 150 - 65 = 85 kotak."
  },
  {
    id: 29,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "medium",
    question: "Manakah kalimat matematika yang menunjukkan sifat pertukaran (komutatif) pada penjumlahan?",
    options: [
      "14 + 26 = 26 + 14",
      "14 + 26 = 40 - 0",
      "14 - 10 = 26 - 22",
      "14 + 0 = 14"
    ],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Keren! Kamu memahami bahwa urutan bilangan yang ditukar menghasilkan jumlah yang sama!",
    explanation: "Sifat pertukaran (komutatif): urutan angka boleh dibolak-balik dan hasilnya tetap sama: a + b = b + a (14 + 26 = 26 + 14 = 40)."
  },
  {
    id: 30,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "medium",
    question: "Tentukan nilai n pada kalimat: 320 - n = 175",
    options: ["135", "145", "155", "495"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Hebat! Pengurangan bilangan ratusan untuk mencari n sangat akurat!",
    explanation: "Nilai n = 320 - 175 = 145. Terbukti: 320 - 145 = 175."
  },
  {
    id: 31,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "hard",
    question: "Pak RT menyiapkan 250 kotak nasi. Pada acara pertama dibagikan 120 kotak, dan acara kedua dibagikan sejumlah kotak nasi lagi hingga tersisa 40 kotak. Berapa kotak nasi yang dibagikan pada acara kedua?",
    options: ["80 kotak", "90 kotak", "100 kotak", "70 kotak"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Hebat tingkat tinggi! Soal cerita dua tahap berhasil kamu pecahkan!",
    explanation: "Setelah acara pertama: 250 - 120 = 130 kotak. Tersisa 40 kotak, maka pada acara kedua dibagikan: 130 - 40 = 90 kotak."
  },
  {
    id: 32,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "hard",
    question: "Jumlah dua bilangan adalah 500. Jika salah satu bilangan adalah 265, berapakah bilangan yang lainnya?",
    options: ["225", "235", "245", "335"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Luar biasa! Mengurai penjumlahan dua bilangan dilakukan dengan sangat cermat!",
    explanation: "Kalimat matematika: 265 + ... = 500. Bilangan lainnya = 500 - 265 = 235."
  },
  {
    id: 33,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "hard",
    question: "Selisih antara dua bilangan adalah 85. Bilangan yang lebih kecil adalah 140. Berapakah bilangan yang lebih besar?",
    options: ["215", "225", "235", "55"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Pintar sekali! Kamu memahami arti selisih bilangan dengan tepat!",
    explanation: "Selisih = bilangan besar - bilangan kecil. Maka: bilangan besar - 140 = 85. Bilangan besar = 140 + 85 = 225."
  },
  {
    id: 34,
    babId: 2,
    babTitle: "Bab 2: Kalimat Matematika",
    difficulty: "hard",
    question: "Koleksi buku komik Doni ada 85 buah. Doni membeli lagi sejumlah komik (p) dan memberikan 15 komik kepada sepupunya. Sekarang komik Doni ada 100 buah. Berapakah nilai p (komik yang dibeli)?",
    options: ["25", "30", "35", "20"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Super jenius! Kalimat matematika dengan operasi kombinasi berhasil kamu taklukkan!",
    explanation: "Persamaan: 85 + p - 15 = 100. Sederhanakan: (85 - 15) + p = 100 -> 70 + p = 100. Maka p = 100 - 70 = 30 komik."
  },

  // ========================================================
  // BAB 3: PENGUKURAN PANJANG DAN BERAT (16 SOAL)
  // ========================================================
  {
    id: 35,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "easy",
    question: "Alat yang paling tepat digunakan untuk mengukur panjang pensil atau buku tulis adalah...",
    options: ["Meteran pita", "Penggaris", "Meteran rol", "Timbangan"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Tepat sekali! Penggaris adalah alat ukur yang paling praktis untuk benda kecil di kelas!",
    explanation: "Penggaris memiliki ukuran sekitar 30 cm sehingga sangat pas untuk mengukur pensil, penghapus, dan buku."
  },
  {
    id: 36,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "easy",
    question: "1 meter (m) sama dengan berapa sentimeter (cm)?",
    options: ["10 cm", "100 cm", "1.000 cm", "50 cm"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Bagus! Kamu mengingat konversi dasar meter ke sentimeter dengan baik!",
    explanation: "1 meter sama dengan 100 sentimeter (1 m = 100 cm)."
  },
  {
    id: 37,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "easy",
    question: "1 kilogram (kg) setara dengan berapa gram (g)?",
    options: ["10 g", "100 g", "500 g", "1.000 g"],
    answer: 3,
    isAudioQuestion: false,
    appreciation: "Mantap! Konversi kilogram ke gram sudah kamu kuasai!",
    explanation: "1 kilogram sama dengan 1.000 gram (1 kg = 1.000 g)."
  },
  {
    id: 38,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "easy",
    question: "Dengarkan baik-baik: Alat yang tepat untuk menimbang tepung terigu saat membuat kue adalah...",
    options: ["Timbangan badan", "Timbangan dapur / kue", "Meteran pita", "Penggaris"],
    answer: 1,
    isAudioQuestion: true,
    appreciation: "Hebat! Kamu memilih timbangan dapur yang teliti untuk bahan makanan!",
    explanation: "Timbangan dapur atau timbangan kue dirancang untuk menakar bahan makanan ringan dalam satuan gram."
  },
  {
    id: 39,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "easy",
    question: "Panjang tali rafia Siti adalah 3 meter. Jika diubah ke satuan sentimeter (cm), panjang tali tersebut adalah...",
    options: ["30 cm", "300 cm", "3.000 cm", "33 cm"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Keren! Menghitung 3 meter menjadi sentimeter sangat mudah bagimu!",
    explanation: "Karena 1 m = 100 cm, maka 3 m = 3 x 100 cm = 300 cm."
  },
  {
    id: 40,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "easy",
    question: "Satuan baku yang paling tepat untuk mengukur jarak antarkota yang jauh (misalnya Jakarta ke Bandung) adalah...",
    options: ["Sentimeter (cm)", "Meter (m)", "Kilometer (km)", "Gram (g)"],
    answer: 2,
    isAudioQuestion: false,
    appreciation: "Tepat sekali! Kilometer adalah satuan baku untuk jarak jauh di perjalanan!",
    explanation: "Jarak antarkota diukur dengan satuan kilometer (km), di mana 1 km = 1.000 meter."
  },
  {
    id: 41,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "medium",
    question: "Panjang papan tulis di kelas adalah 2 meter 45 sentimeter. Panjang papan tulis tersebut dalam satuan sentimeter (cm) adalah...",
    options: ["245 cm", "205 cm", "2.045 cm", "65 cm"],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Luar biasa! Menggabungkan meter dan sentimeter dijawab dengan sempurna!",
    explanation: "2 m = 200 cm. Ditambah 45 cm menjadi: 200 cm + 45 cm = 245 cm."
  },
  {
    id: 42,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "medium",
    question: "Panjang sebuah pita adalah 450 cm. Panjang pita tersebut sama dengan...",
    options: [
      "4 meter 5 sentimeter",
      "4 meter 50 sentimeter",
      "40 meter 5 sentimeter",
      "45 meter"
    ],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Pintar! Mengubah sentimeter kembali ke meter dan sentimeter sangat tepat!",
    explanation: "450 cm = 400 cm + 50 cm. Karena 400 cm = 4 m, maka hasilnya adalah 4 meter 50 sentimeter."
  },
  {
    id: 43,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "medium",
    question: "Ibu membeli 3 kg gula pasir dan 500 gram garam di warung. Total berat belanjaan Ibu dalam satuan gram adalah...",
    options: ["3.500 gram", "350 gram", "800 gram", "3.050 gram"],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Hebat! Kamu mengubah kilogram ke gram lalu menjumlahkannya dengan teliti!",
    explanation: "3 kg = 3.000 gram. Total belanjaan = 3.000 g + 500 g = 3.500 gram."
  },
  {
    id: 44,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "medium",
    question: "Dengarkan baik-baik: Sebuah semangka memiliki berat 2.400 gram. Berat semangka itu jika diuraikan adalah...",
    options: [
      "2 kg lebih 40 gram",
      "2 kg lebih 400 gram",
      "24 kg",
      "20 kg lebih 4 gram"
    ],
    answer: 1,
    isAudioQuestion: true,
    appreciation: "Keren sekali! Penangkapan audio dan penguraian berat sangat memuaskan!",
    explanation: "2.400 gram = 2.000 gram + 400 gram. 2.000 gram = 2 kg, jadi beratnya 2 kg lebih 400 gram."
  },
  {
    id: 45,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "medium",
    question: "Edo mempunyai tongkat kayu sepanjang 180 cm. Beni mempunyai tongkat sepanjang 120 cm. Berapakah panjang kedua tongkat jika disambung?",
    options: ["300 cm (3 meter)", "200 cm (2 meter)", "300 meter", "350 cm"],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Tepat sekali! Menghitung sambungan tongkat dan konversi ke meter sangat rapi!",
    explanation: "180 cm + 120 cm = 300 cm. Karena 300 cm = 3 meter, jawaban yang tepat adalah 300 cm (3 meter)."
  },
  {
    id: 46,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "medium",
    question: "Sebuah karung berisi 5 kg beras. Ibu telah menggunakan 1.500 gram beras untuk dimasak. Sisa beras di dalam karung sekarang adalah...",
    options: ["3.500 gram", "4.500 gram", "3.000 gram", "2.500 gram"],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Mantap! Menyamakan satuan ke gram sebelum mengurangi sudah sangat tepat!",
    explanation: "5 kg = 5.000 gram. Sisa beras = 5.000 gram - 1.500 gram = 3.500 gram (atau 3 kg 500 gram)."
  },
  {
    id: 47,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "hard",
    question: "Ayah memiliki kawat sepanjang 5 meter. Ayah memotong kawat tersebut untuk mengikat pagar sepanjang 220 cm dan jemuran sepanjang 150 cm. Sisa kawat Ayah sekarang adalah...",
    options: ["130 cm", "140 cm", "120 cm", "230 cm"],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Luar biasa teliti! Soal cerita pengurangan panjang dua tahap berhasil kamu tuntaskan!",
    explanation: "5 meter = 500 cm. Total kawat yang dipotong: 220 cm + 150 cm = 370 cm. Sisa kawat = 500 cm - 370 cm = 130 cm (1 meter 30 cm)."
  },
  {
    id: 48,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "hard",
    question: "Ibu membeli 2 kg apel, 1 kg anggur, dan 750 gram stroberi di pasar buah. Berapa total berat seluruh buah yang dibeli Ibu dalam satuan gram?",
    options: ["3.750 gram", "3.250 gram", "4.750 gram", "2.750 gram"],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Pintar sekali! Menjumlahkan tiga jenis buah dengan konversi gram terselesaikan dengan hebat!",
    explanation: "Apel = 2 kg = 2.000 g. Anggur = 1 kg = 1.000 g. Stroberi = 750 g. Total berat = 2.000 + 1.000 + 750 = 3.750 gram."
  },
  {
    id: 49,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "hard",
    question: "Di dalam kardus ada 4 kantong gula pasir. Masing-masing kantong beratnya 500 gram. Berapa kilogram (kg) total berat seluruh gula di dalam kardus?",
    options: ["1 kg", "2 kg", "3 kg", "4 kg"],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Super! Kamu mengalikan berat kantong dan mengubahnya kembali ke kilogram!",
    explanation: "Total berat dalam gram = 4 x 500 gram = 2.000 gram. Karena 1.000 gram = 1 kg, maka 2.000 gram = 2 kg."
  },
  {
    id: 50,
    babId: 3,
    babTitle: "Bab 3: Pengukuran Panjang dan Berat",
    difficulty: "hard",
    question: "Jarak dari rumah Lani ke sekolah adalah 1 km 250 meter. Lani sudah berjalan kaki sejauh 800 meter. Berapa meter lagi sisa jarak yang harus ditempuh Lani untuk sampai ke sekolah?",
    options: ["450 meter", "550 meter", "350 meter", "650 meter"],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Luar biasa juara! Soal tantangan pamungkas jarak dan konversi meter berhasil kamu selesaikan dengan gemilang!",
    explanation: "Total jarak = 1 km 250 m = 1.000 m + 250 m = 1.250 meter. Sisa jarak = 1.250 m - 800 m = 450 meter."
  }
];

// Metadata Bab untuk Statistik Dasbor Guru
const BAB_META = {
  1: {
    title: "Bab 1: Bilangan Cacah sampai 1.000",
    totalQuestions: 18,
    color: "#0ea5e9"
  },
  2: {
    title: "Bab 2: Kalimat Matematika",
    totalQuestions: 16,
    color: "#a855f7"
  },
  3: {
    title: "Bab 3: Pengukuran Panjang dan Berat",
    totalQuestions: 16,
    color: "#f97316"
  }
};
