/**
 * MODUL DATABASE CLOUD & PRIVASI NILAI
 * 
 * Arsitektur:
 * - Menggunakan Google Apps Script (GAS) Web App sebagai serverless API 100% Gratis Selamanya.
 * - Siswa hanya bisa mengirim nilai (POST) dan menerima ringkasan nilai miliknya sendiri.
 * - Guru mengakses seluruh rekap dengan otentikasi PIN 4 digit: 0123.
 * - Fallback cerdas ke LocalStorage: Aplikasi langsung siap pakai dan dapat didemokan seketika!
 */

class DatabaseManager {
  constructor() {
    this.STORAGE_KEY = 'quiz_math_submissions_v1';
    this.GAS_URL_KEY = 'quiz_gas_webapp_url';
    this.STUDENT_COMPLETED_KEY = 'quiz_student_completed_session';
    this.TEACHER_PIN = '0123';

    // URL Google Apps Script resmi yang telah di-deploy
    this.DEFAULT_GAS_URL = 'https://script.google.com/macros/s/AKfycbx57CTwLK-SwpXhhWVUgBBXlSLhFGOxPgzNOZxXkPx0F0FD82EwccDjDYvk1pcN6S6U6A/exec';

    // Ambil URL Google Apps Script dari local storage atau gunakan default
    const savedGasUrl = localStorage.getItem(this.GAS_URL_KEY);
    this.gasUrl = (savedGasUrl && savedGasUrl.startsWith('https://script.google.com')) ? savedGasUrl : this.DEFAULT_GAS_URL;

    // Inisialisasi data sampel awal jika penyimpanan lokal masih kosong
    this.seedInitialLocalData();
  }

  // Inisialisasi data: mulai murni kosong tanpa data palsu/dummy
  seedInitialLocalData() {
    // Kosong: tidak menyuntikkan data palsu agar data di dasbor selalu murni hasil pengerjaan siswa
  }

  // Ambil URL Google Apps Script yang tersimpan
  getGasUrl() {
    return this.gasUrl;
  }

  // Simpan / Perbarui URL Google Apps Script dari Dasbor Guru
  setGasUrl(url) {
    this.gasUrl = (url || '').trim();
    localStorage.setItem(this.GAS_URL_KEY, this.gasUrl);
  }

  // ==========================================
  // PEMERIKSAAN ATURAN 1X PENGERJAAN
  // ==========================================

  // Periksa apakah siswa dengan nama dan kelas ini sudah pernah submit
  isAlreadySubmitted(nama, kelas) {
    const cleanNama = (nama || '').trim().toLowerCase();
    const cleanKelas = (kelas || '').trim().toUpperCase();
    const key = `${cleanNama}_${cleanKelas}`;

    // Cek di penyimpanan data (tersinkron 1:1 dengan Google Spreadsheet)
    const all = this.getLocalSubmissions();
    const found = all.find(item => 
      (item.nama || '').trim().toLowerCase() === cleanNama && 
      (item.kelas || '').trim().toUpperCase() === cleanKelas
    );

    if (found) {
      return { submitted: true, data: found };
    }

    // Jika data siswa TIDAK ADA di rekapan spreadsheet (karena dihapus guru),
    // maka bersihkan status kunci lokal agar siswa dapat mengerjakan kembali
    const studentSession = localStorage.getItem(this.STUDENT_COMPLETED_KEY);
    if (studentSession) {
      try {
        const parsed = JSON.parse(studentSession);
        if (parsed.key === key) {
          localStorage.removeItem(this.STUDENT_COMPLETED_KEY);
        }
      } catch (e) {}
    }

    return { submitted: false };
  }

  // Verifikasi status ke Google Spreadsheet secara real-time (asinkron)
  async checkStudentStatusOnline(nama, kelas) {
    const cleanNama = (nama || '').trim();
    const cleanKelas = (kelas || '').trim();
    if (!cleanNama) return { submitted: false };

    if (this.gasUrl && this.gasUrl.startsWith('https://script.google.com')) {
      try {
        const url = `${this.gasUrl}?action=checkStudent&nama=${encodeURIComponent(cleanNama)}&kelas=${encodeURIComponent(cleanKelas)}&_t=${Date.now()}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            if (!json.exists) {
              // Guru telah menghapus baris siswa ini di Google Spreadsheet!
              // Bersihkan status kunci pengerjaan lokal di browser ini
              const sessionStr = localStorage.getItem(this.STUDENT_COMPLETED_KEY);
              if (sessionStr) {
                try {
                  const parsed = JSON.parse(sessionStr);
                  if ((parsed.nama || '').trim().toLowerCase() === cleanNama.toLowerCase()) {
                    localStorage.removeItem(this.STUDENT_COMPLETED_KEY);
                  }
                } catch (e) {}
              }
              return { submitted: false };
            } else {
              return { submitted: true, data: json.data };
            }
          }
        }
      } catch (e) {
        console.warn("Verifikasi status cloud tertunda, memakai lokal:", e);
      }
    }

    return this.isAlreadySubmitted(cleanNama, cleanKelas);
  }

  // Tandai bahwa sesi pengerjaan siswa ini telah selesai
  markStudentCompleted(submissionData) {
    const cleanNama = submissionData.nama.trim().toLowerCase();
    const cleanKelas = submissionData.kelas.trim().toUpperCase();
    const payload = {
      key: `${cleanNama}_${cleanKelas}`,
      ...submissionData
    };
    localStorage.setItem(this.STUDENT_COMPLETED_KEY, JSON.stringify(payload));
  }

  // ==========================================
  // PENGIRIMAN NILAI OLEH SISWA (POST)
  // ==========================================

  async submitQuizResult(resultData) {
    // 1. Simpan salinan di LocalStorage untuk keandalan data
    this.saveToLocal(resultData);
    this.markStudentCompleted(resultData);

    // 2. Jika URL Google Apps Script terpasang, kirim ke Cloud Google Sheets
    if (this.gasUrl && this.gasUrl.startsWith('https://script.google.com')) {
      try {
        await fetch(this.gasUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify({
            action: 'submitQuiz',
            ...resultData
          })
        });

        return {
          success: true,
          cloudSynced: true,
          studentResult: {
            nama: resultData.nama,
            kelas: resultData.kelas,
            skor: resultData.skor,
            totalBenar: resultData.totalBenar,
            totalSalah: resultData.totalSalah
          }
        };
      } catch (err) {
        console.warn("Sinkronisasi cloud GAS tertunda, tersimpan di lokal:", err);
        return {
          success: true,
          cloudSynced: false,
          studentResult: resultData
        };
      }
    }

    // Jika belum ada GAS URL, mode demo lokal berhasil
    return {
      success: true,
      cloudSynced: false,
      studentResult: resultData
    };
  }

  // ==========================================
  // AKSES DASBOR GURU (GET DENGAN PIN 0123)
  // ==========================================

  // Validasi PIN Guru
  verifyTeacherPin(pin) {
    return pin === this.TEACHER_PIN;
  }

  // Ambil rekapitulasi data seluruh siswa (Live Sync dengan Google Spreadsheet)
  async getTeacherDashboardData(pin) {
    if (!this.verifyTeacherPin(pin)) {
      throw new Error("PIN salah! Akses dasbor guru ditolak.");
    }

    // Jika terhubung ke Google Apps Script, Google Spreadsheet adalah SUMBER KEBENARAN UTAMA (Single Source of Truth)
    if (this.gasUrl && this.gasUrl.startsWith('https://script.google.com')) {
      try {
        // Parameter _t mencegah browser cache sehingga data selalu mencerminkan isi Google Sheets terkini
        const urlWithPin = `${this.gasUrl}?action=getSummary&pin=${encodeURIComponent(pin)}&_t=${Date.now()}`;
        const res = await fetch(urlWithPin);
        if (res.ok) {
          const cloudData = await res.json();
          if (cloudData.success && Array.isArray(cloudData.data)) {
            // Perbarui penyimpanan lokal agar PERSIS sama dengan Google Spreadsheet
            // Jika baris di spreadsheet dihapus atau disunting guru, di sini otomatis mengikuti 1:1!
            this.syncCloudDataToLocal(cloudData.data);
            return cloudData.data;
          }
        }
      } catch (e) {
        console.warn("Gagal menarik data cloud, memuat data lokal:", e);
      }
    }

    // Fallback offline
    return this.getLocalSubmissions();
  }

  // ==========================================
  // OPERASI PENYIMPANAN LOKAL (OFFLINE / FALLBACK)
  // ==========================================

  getLocalSubmissions() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveToLocal(newRecord) {
    const current = this.getLocalSubmissions();
    if (!newRecord.id) {
      newRecord.id = 'SUB-' + Date.now().toString().slice(-6);
    }
    current.unshift(newRecord);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(current));
  }

  // Sinkronisasi 1:1 Mengikuti Google Spreadsheet (Single Source of Truth)
  syncCloudDataToLocal(cloudList) {
    // 1. Gantikan data lokal secara penuh dengan data yang ada di Google Spreadsheet saat ini
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cloudList));

    // 2. Sinkronkan juga status sesi pengerjaan di browser ini:
    // Jika siswa di browser ini barisnya telah dihapus oleh guru di Google Spreadsheet,
    // maka batalkan status kunci pengerjaannya sehingga siswa bisa mengerjakan ulang!
    const sessionStr = localStorage.getItem(this.STUDENT_COMPLETED_KEY);
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        const stillInSheet = cloudList.some(item => 
          (item.nama || '').trim().toLowerCase() === (session.nama || '').trim().toLowerCase() &&
          (item.kelas || '').trim().toUpperCase() === (session.kelas || '').trim().toUpperCase()
        );
        if (!stillInSheet) {
          localStorage.removeItem(this.STUDENT_COMPLETED_KEY);
        }
      } catch (e) {}
    }
  }

  // Hapus semua data (hanya dari dalam Dasbor Guru setelah konfirmasi)
  async clearAllData(pin) {
    if (!this.verifyTeacherPin(pin)) {
      throw new Error("PIN salah! Hanya guru yang memiliki hak akses.");
    }

    // 1. Bersihkan seluruh penyimpanan lokal browser
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.STUDENT_COMPLETED_KEY);
    localStorage.removeItem('quiz_in_progress_state');

    // 2. Jika terhubung ke Google Apps Script, panggil API reset cloud
    if (this.gasUrl && this.gasUrl.startsWith('https://script.google.com')) {
      try {
        const resetUrl = `${this.gasUrl}?action=clearData&pin=${encodeURIComponent(pin)}`;
        await fetch(resetUrl, { mode: 'no-cors' });
      } catch (err) {
        console.warn("Panggilan reset cloud GAS:", err);
      }
    }

    return true;
  }
}

// Inisialisasi Instance Global
window.dbManager = new DatabaseManager();

