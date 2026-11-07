/**
 * =========================================================================
 * BACKEND GOOGLE APPS SCRIPT (GAS) - DATABASE CLOUD 100% GRATIS SELAMANYA
 * Kuis Interaktif Matematika SD Kelas 3 (Semester Ganjil)
 * =========================================================================
 * 
 * Fitur Keamanan:
 * 1. Siswa hanya dapat mengirimkan nilai via POST (write-only).
 *    Respon server HANYA mengembalikan ringkasan nilai siswa yang bersangkutan.
 *    Data siswa lain 100% aman dan tidak pernah bocor ke perangkat siswa.
 * 2. Guru mengakses seluruh rekap nilai via GET dengan proteksi PIN 4 digit: 0123.
 * 3. Otomatis membuat header tabel dengan format rapi jika spreadsheet masih kosong.
 */

// PIN Rahasia Guru (dapat diubah sesuai kebutuhan guru)
var TEACHER_PIN = "0123";

// Nama Lembar Kerja di Google Spreadsheet
var SHEET_NAME = "Rekap_Nilai_Murid";

/**
 * 1. ENDPOINT POST: DITERIMA DARI SISWA SAAT SELESAI KUIS
 */
function doPost(e) {
  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    var sheet = getOrCreateSheet();
    var submissionId = "SUB-" + new Date().getTime().toString().slice(-6);
    var timestamp = data.waktu || new Date().toLocaleString("id-ID");

    // Catat baris baru ke Google Sheet
    sheet.appendRow([
      submissionId,
      timestamp,
      data.nama || "Anonim",
      data.kelas || "3A",
      Number(data.skor) || 0,
      Number(data.totalBenar) || 0,
      Number(data.totalSalah) || 0,
      Number(data.bab1Skor) || 0,
      Number(data.bab2Skor) || 0,
      Number(data.bab3Skor) || 0,
      data.status || (Number(data.skor) >= 75 ? "Tuntas" : "Perlu Bimbingan")
    ]);

    // Format respon: HANYA nilai murid bersangkutan yang dikembalikan
    var response = {
      success: true,
      message: "Nilai berhasil direkam ke Google Sheets guru.",
      studentResult: {
        id: submissionId,
        nama: data.nama,
        kelas: data.kelas,
        skor: data.skor,
        totalBenar: data.totalBenar,
        totalSalah: data.totalSalah,
        status: data.status
      }
    };

    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 2. ENDPOINT GET: DITERIMA DARI DASBOR GURU (DENGAN PIN 0123)
 */
function doGet(e) {
  try {
    var params = e.parameter || {};
    var pin = params.pin || "";
    var action = params.action || "";

    // Pemeriksaan Keamanan PIN Guru
    if (pin !== TEACHER_PIN) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: "Akses ditolak: PIN Guru salah atau tidak disertakan!"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = getOrCreateSheet();
    var dataRange = sheet.getDataRange();
    var values = dataRange.getValues();

    if (values.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          count: 0,
          data: []
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Ambil data siswa (lewati baris 0 yang merupakan header)
    var results = [];
    for (var i = 1; i < values.length; i++) {
      var row = values[i];
      results.push({
        id: row[0],
        waktu: row[1],
        nama: row[2],
        kelas: row[3],
        skor: Number(row[4]),
        totalBenar: Number(row[5]),
        totalSalah: Number(row[6]),
        bab1Skor: Number(row[7]),
        bab2Skor: Number(row[8]),
        bab3Skor: Number(row[9]),
        status: row[10]
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        count: results.length,
        data: results
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * FUNGSI HELPER: MEMASTIKAN SHEET & HEADER TERSEDIA
 */
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Jika baris pertama masih kosong, buat Header Kolom
  if (sheet.getLastRow() === 0) {
    var headers = [
      "ID Submission",
      "Waktu Selesai",
      "Nama Siswa",
      "Kelas",
      "Skor Akhir",
      "Total Benar",
      "Total Salah",
      "Bab 1 (%)",
      "Bab 2 (%)",
      "Bab 3 (%)",
      "Status KKM"
    ];
    sheet.appendRow(headers);

    // Format Header: Warna Biru Langit Ceria, Teks Putih Tebal
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0ea5e9");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

