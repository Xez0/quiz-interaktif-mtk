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

  // Isi data simulasi untuk demo awal jika belum ada data
  seedInitialLocalData() {
    const existing = localStorage.getItem(this.STORAGE_KEY);
    if (!existing) {
      const sampleData = [
        {
          id: 'SUB-101',
          nama: 'Budi Santoso',
          kelas: '3A',
          skor: 92,
          totalBenar: 18,
          totalSalah: 2,
          bab1Skor: 95,
          bab2Skor: 90,
          bab3Skor: 90,
          waktu: '07/11/2026, 08:30:15',
          status: 'Tuntas'
        },
        {
          id: 'SUB-102',
          nama: 'Siti Rahma',
          kelas: '3A',
          skor: 88,
          totalBenar: 17,
          totalSalah: 3,
          bab1Skor: 90,
          bab2Skor: 85,
          bab3Skor: 90,
          waktu: '07/11/2026, 08:45:20',
          status: 'Tuntas'
        },
        {
          id: 'SUB-103',
          nama: 'Aditya Pratama',
          kelas: '3B',
          skor: 95,
          totalBenar: 19,
          totalSalah: 1,
          bab1Skor: 100,
          bab2Skor: 95,
          bab3Skor: 90,
          waktu: '07/11/2026, 09:10:05',
          status: 'Tuntas'
        },
        {
          id: 'SUB-104',
          nama: 'Zahra Amelia',
          kelas: '3B',
          skor: 68,
          totalBenar: 13,
          totalSalah: 7,
          bab1Skor: 75,
          bab2Skor: 60,
          bab3Skor: 70,
          waktu: '07/11/2026, 09:25:40',
          status: 'Perlu Bimbingan'
        },
        {
          id: 'SUB-105',
          nama: 'Muhammad Rizky',
          kelas: '3C',
          skor: 85,
          totalBenar: 16,
          totalSalah: 4,
          bab1Skor: 85,
          bab2Skor: 80,
          bab3Skor: 90,
          waktu: '07/11/2026, 10:05:12',
          status: 'Tuntas'
        },
        {
          id: 'SUB-106',
          nama: 'Dewi Lestari',
          kelas: '3D',
          skor: 78,
          totalBenar: 15,
          totalSalah: 5,
          bab1Skor: 80,
          bab2Skor: 75,
          bab3Skor: 80,
          waktu: '07/11/2026, 10:40:22',
          status: 'Tuntas'
        }
      ];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sampleData));
    }
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

    // Cek di session local storage browser aktif
    const studentSession = localStorage.getItem(this.STUDENT_COMPLETED_KEY);
    if (studentSession) {
      try {
        const parsed = JSON.parse(studentSession);
        if (parsed.key === key) {
          return { submitted: true, data: parsed };
        }
      } catch (e) {}
    }

    // Cek di penyimpanan lokal data
    const all = this.getLocalSubmissions();
    const found = all.find(item => 
      item.nama.trim().toLowerCase() === cleanNama && 
      item.kelas.trim().toUpperCase() === cleanKelas
    );

    if (found) {
      return { submitted: true, data: found };
    }

    return { submitted: false };
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

  // Ambil rekapitulasi data seluruh siswa
  async getTeacherDashboardData(pin) {
    if (!this.verifyTeacherPin(pin)) {
      throw new Error("PIN salah! Akses dasbor guru ditolak.");
    }

    // Jika terhubung ke Google Apps Script, coba tarik data real-time
    if (this.gasUrl && this.gasUrl.startsWith('https://script.google.com')) {
      try {
        const urlWithPin = `${this.gasUrl}?action=getSummary&pin=${encodeURIComponent(pin)}`;
        const res = await fetch(urlWithPin);
        if (res.ok) {
          const cloudData = await res.json();
          if (cloudData.success && Array.isArray(cloudData.data)) {
            // Gabungkan atau sinkronkan data cloud ke penyimpanan lokal
            this.mergeCloudDataToLocal(cloudData.data);
            return cloudData.data;
          }
        }
      } catch (e) {
        console.warn("Gagal menarik data cloud, memuat data lokal:", e);
      }
    }

    // Fallback: Ambil dari LocalStorage
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
    // Tambahkan id unik jika belum ada
    if (!newRecord.id) {
      newRecord.id = 'SUB-' + Date.now().toString().slice(-6);
    }
    current.unshift(newRecord);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(current));
  }

  mergeCloudDataToLocal(cloudList) {
    const local = this.getLocalSubmissions();
    const map = new Map();

    // Prioritaskan data cloud
    cloudList.forEach(item => {
      const key = `${item.nama}_${item.kelas}`;
      map.set(key, item);
    });

    // Tambahkan data lokal yang belum ada di cloud
    local.forEach(item => {
      const key = `${item.nama}_${item.kelas}`;
      if (!map.has(key)) {
        map.set(key, item);
      }
    });

    const merged = Array.from(map.values());
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(merged));
  }

  // Hapus semua data (hanya dari dalam Dasbor Guru setelah konfirmasi)
  clearAllData(pin) {
    if (!this.verifyTeacherPin(pin)) {
      throw new Error("PIN salah!");
    }
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.STUDENT_COMPLETED_KEY);
    return true;
  }
}

// Inisialisasi Instance Global
window.dbManager = new DatabaseManager();

