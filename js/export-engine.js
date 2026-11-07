/**
 * MESIN EKSPOR LAPORAN MULTI-FORMAT (Excel, PDF, Word)
 * 
 * Menghasilkan berkas laporan rekapitulasi nilai murid untuk guru:
 * 1. Excel (.xlsx) via library SheetJS
 * 2. PDF (.pdf) via library jsPDF & AutoTable
 * 3. Word (.doc / .docx) via Formatted Document Blob
 */

class ExportEngine {
  constructor() {
    this.schoolName = "SD NEGERI / SWASTA KELAS 3";
    this.reportTitle = "REKAPITULASI NILAI KUIS INTERAKTIF MATEMATIKA SEMESTER GANJIL";
    this.curriculumRef = "Kurikulum Merdeka - Fase B (Bab 1, 2, dan 3)";
  }

  // Mendapatkan tanggal terformat Indonesia
  getFormattedDate() {
    const now = new Date();
    return now.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  getTimestampString() {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  }

  // Hitung ringkasan statistik
  calculateStats(data) {
    if (!data || data.length === 0) {
      return { total: 0, avg: 0, highest: 0, lowest: 0, passed: 0 };
    }
    const scores = data.map(d => Number(d.skor) || 0);
    const total = scores.length;
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = (sum / total).toFixed(1);
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const passed = data.filter(d => (Number(d.skor) || 0) >= 75).length;

    return { total, avg, highest, lowest, passed };
  }

  // ==========================================
  // 1. EKSPOR KE EXCEL (.xlsx)
  // ==========================================
  exportToExcel(data, activeFilter = 'Semua') {
    if (typeof XLSX === 'undefined') {
      alert("Library SheetJS belum termuat. Pastikan terhubung ke internet.");
      return;
    }

    const stats = this.calculateStats(data);
    const dateStr = this.getFormattedDate();

    // Baris header laporan
    const rows = [
      [this.reportTitle],
      [this.curriculumRef],
      [`Filter Kelas: ${activeFilter} | Tanggal Cetak: ${dateStr}`],
      [`Statistik: Total Murid = ${stats.total} | Rata-rata = ${stats.avg} | Tertinggi = ${stats.highest} | Terendah = ${stats.lowest} | Tuntas (>=75) = ${stats.passed}`],
      [], // Spasi kosong
      // Header Kolom
      [
        "No",
        "Nama Siswa",
        "Kelas",
        "Skor Akhir",
        "Benar",
        "Salah",
        "Bab 1: Bilangan Cacah (%)",
        "Bab 2: Kalimat MTK (%)",
        "Bab 3: Pengukuran (%)",
        "Waktu Pengerjaan",
        "Status Kelulusan"
      ]
    ];

    // Data Baris Siswa
    data.forEach((item, index) => {
      rows.push([
        index + 1,
        item.nama || "-",
        item.kelas || "-",
        Number(item.skor) || 0,
        Number(item.totalBenar) || 0,
        Number(item.totalSalah) || 0,
        Number(item.bab1Skor) || 0,
        Number(item.bab2Skor) || 0,
        Number(item.bab3Skor) || 0,
        item.waktu || "-",
        (Number(item.skor) || 0) >= 75 ? "Tuntas" : "Perlu Bimbingan"
      ]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(rows);

    // Mengatur lebar kolom agar rapi saat dibuka
    worksheet['!cols'] = [
      { wch: 6 },  // No
      { wch: 25 }, // Nama
      { wch: 8 },  // Kelas
      { wch: 12 }, // Skor
      { wch: 8 },  // Benar
      { wch: 8 },  // Salah
      { wch: 25 }, // Bab 1
      { wch: 22 }, // Bab 2
      { wch: 22 }, // Bab 3
      { wch: 22 }, // Waktu
      { wch: 18 }  // Status
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Nilai Siswa");

    const filename = `Laporan_Nilai_MTK_Kelas3_${activeFilter}_${this.getTimestampString()}.xlsx`;
    XLSX.writeFile(workbook, filename);
  }

  // ==========================================
  // 2. EKSPOR KE PDF (.pdf)
  // ==========================================
  exportToPDF(data, activeFilter = 'Semua') {
    if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
      alert("Library jsPDF belum termuat. Pastikan terhubung ke internet.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const stats = this.calculateStats(data);
    const dateStr = this.getFormattedDate();

    // Judul & Header Dokumen
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(this.reportTitle, 14, 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`${this.curriculumRef} | Kelas: ${activeFilter} | Tanggal: ${dateStr}`, 14, 22);

    // Ringkasan Statistik Kotak
    doc.setFillColor(240, 249, 255);
    doc.setDrawColor(186, 230, 253);
    doc.roundedRect(14, 26, 269, 14, 2, 2, 'FD');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(2, 132, 199);
    const statText = `RINGKASAN: Total Siswa = ${stats.total} | Nilai Rata-rata = ${stats.avg} | Nilai Tertinggi = ${stats.highest} | Nilai Terendah = ${stats.lowest} | Tuntas KKM = ${stats.passed} siswa (${stats.total > 0 ? ((stats.passed / stats.total) * 100).toFixed(0) : 0}%)`;
    doc.text(statText, 18, 35);
    doc.setTextColor(30, 41, 59);

    // Format Data Tabel
    const tableBody = data.map((item, idx) => [
      idx + 1,
      item.nama || "-",
      item.kelas || "-",
      item.skor || 0,
      item.totalBenar || 0,
      item.totalSalah || 0,
      `${item.bab1Skor || 0}%`,
      `${item.bab2Skor || 0}%`,
      `${item.bab3Skor || 0}%`,
      item.waktu || "-",
      (Number(item.skor) || 0) >= 75 ? "Tuntas" : "Bimbingan"
    ]);

    doc.autoTable({
      startY: 44,
      head: [[
        "No",
        "Nama Siswa",
        "Kelas",
        "Skor",
        "Benar",
        "Salah",
        "Bab 1",
        "Bab 2",
        "Bab 3",
        "Waktu Selesai",
        "Status"
      ]],
      body: tableBody,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        valign: 'middle'
      },
      headStyles: {
        fillColor: [14, 165, 233],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 50 },
        2: { cellWidth: 15, halign: 'center' },
        3: { cellWidth: 16, halign: 'center', fontStyle: 'bold' },
        4: { cellWidth: 14, halign: 'center' },
        5: { cellWidth: 14, halign: 'center' },
        6: { cellWidth: 18, halign: 'center' },
        7: { cellWidth: 18, halign: 'center' },
        8: { cellWidth: 18, halign: 'center' },
        9: { cellWidth: 40, halign: 'center' },
        10: { cellWidth: 26, halign: 'center' }
      },
      didParseCell: function(dataCell) {
        if (dataCell.section === 'body' && dataCell.column.index === 10) {
          if (dataCell.cell.raw === 'Tuntas') {
            dataCell.cell.styles.textColor = [22, 163, 74];
            dataCell.cell.styles.fontStyle = 'bold';
          } else {
            dataCell.cell.styles.textColor = [225, 29, 72];
          }
        }
      }
    });

    const finalY = doc.lastAutoTable.finalY || 150;
    
    // Tanda Tangan Guru
    if (finalY < 165) {
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Mengetahui,`, 220, finalY + 12);
      doc.text(`Guru Kelas Matematika`, 220, finalY + 17);
      doc.text(`( ......................................... )`, 220, finalY + 35);
    }

    const filename = `Laporan_Nilai_MTK_Kelas3_${activeFilter}_${this.getTimestampString()}.pdf`;
    doc.save(filename);
  }

  // ==========================================
  // 3. EKSPOR KE WORD (.doc / .docx)
  // ==========================================
  exportToWord(data, activeFilter = 'Semua') {
    const stats = this.calculateStats(data);
    const dateStr = this.getFormattedDate();

    let tableRowsHtml = '';
    data.forEach((item, index) => {
      const isPassed = (Number(item.skor) || 0) >= 75;
      const statusColor = isPassed ? '#16a34a' : '#e11d48';
      const statusText = isPassed ? 'Tuntas' : 'Perlu Bimbingan';

      tableRowsHtml += `
        <tr style="background-color: ${index % 2 === 0 ? '#ffffff' : '#f8fafc'};">
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${index + 1}</td>
          <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">${item.nama || '-'}</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${item.kelas || '-'}</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #0284c7;">${item.skor || 0}</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${item.totalBenar || 0}</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${item.totalSalah || 0}</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${item.bab1Skor || 0}%</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${item.bab2Skor || 0}%</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${item.bab3Skor || 0}%</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1; font-size: 11px;">${item.waktu || '-'}</td>
          <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: ${statusColor};">${statusText}</td>
        </tr>
      `;
    });

    const wordHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${this.reportTitle}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; color: #1e293b; margin: 20px; }
          h2 { font-size: 16pt; color: #0284c7; text-align: center; margin-bottom: 4px; text-transform: uppercase; }
          .subtitle { font-size: 11pt; text-align: center; color: #64748b; margin-bottom: 16px; }
          .stat-box { background: #f0f9ff; border: 1px solid #bae6fd; padding: 12px; border-radius: 6px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 10pt; }
          th { background-color: #0ea5e9; color: #ffffff; padding: 10px 6px; border: 1px solid #0284c7; text-align: center; }
          .footer-sign { margin-top: 40px; float: right; width: 250px; text-align: center; }
        </style>
      </head>
      <body>
        <h2>${this.reportTitle}</h2>
        <div class="subtitle">${this.curriculumRef} | Filter Kelas: ${activeFilter} | Tanggal: ${dateStr}</div>

        <div class="stat-box">
          <b>RINGKASAN HASIL EVALUASI:</b><br/>
          • Total Peserta: <b>${stats.total}</b> siswa<br/>
          • Rata-rata Nilai: <b>${stats.avg}</b><br/>
          • Nilai Tertinggi: <b>${stats.highest}</b> | Nilai Terendah: <b>${stats.lowest}</b><br/>
          • Ketuntasan KKM (&gt;= 75): <b>${stats.passed}</b> siswa (${stats.total > 0 ? ((stats.passed / stats.total) * 100).toFixed(0) : 0}%)
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 4%;">No</th>
              <th style="width: 22%;">Nama Siswa</th>
              <th style="width: 7%;">Kelas</th>
              <th style="width: 8%;">Skor</th>
              <th style="width: 6%;">Benar</th>
              <th style="width: 6%;">Salah</th>
              <th style="width: 11%;">Bab 1</th>
              <th style="width: 11%;">Bab 2</th>
              <th style="width: 11%;">Bab 3</th>
              <th style="width: 14%;">Waktu Selesai</th>
              <th style="width: 10%;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
          </tbody>
        </table>

        <div class="footer-sign">
          <p>Mengetahui,<br/>Guru Mata Pelajaran Matematika</p>
          <br/><br/><br/>
          <p><b>( .................................................... )</b><br/>NIP. .................................................</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + wordHtml], {
      type: 'application/msword;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Laporan_Nilai_MTK_Kelas3_${activeFilter}_${this.getTimestampString()}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// Inisialisasi Instance Global
window.exportEngine = new ExportEngine();
