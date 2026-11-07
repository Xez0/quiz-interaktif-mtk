/**
 * LOGIKA UTAMA APLIKASI KUIS INTERAKTIF MATEMATIKA SD KELAS 3
 * 
 * Fitur:
 * - Form Identitas Siswa (Nama & Kelas 3A-3D)
 * - Sistem Tingkat Kesulitan Otomatis (Adaptive Difficulty Scaffolding)
 * - Pilihan Mode: Petualangan Adaptif (20 Soal) atau Jelajah Lengkap (50 Soal)
 * - Audio Narasi Soal & Efek Suara Web Audio API
 * - Umpan Balik Edukatif (Apresiasi saat benar, Pembahasan bersahabat saat salah)
 * - Pembatasan 1x Pengerjaan Siswa
 * - Dasbor Guru Terproteksi PIN 4 digit: 0123
 * - Unduh Laporan Multi-Format: Excel, PDF, dan Word
 */

class QuizApp {
  constructor() {
    this.currentScreen = 'welcome-screen';
    this.currentStudent = { nama: '', kelas: '3A', mode: 'adaptive' };
    
    // Status Kuis Aktif
    this.questionQueue = [];
    this.currentIndex = 0;
    this.currentQuestion = null;
    this.selectedOptionIndex = null;
    this.answersHistory = [];
    this.streakCount = 0;
    this.currentDifficulty = 'easy'; // 'easy' | 'medium' | 'hard'
    this.startTime = null;

    // Filter Dasbor Guru
    this.teacherClassFilter = 'Semua';
    this.teacherSearchQuery = '';
    this.teacherData = [];

    // Reset via URL param jika diminta (?reset=0123 atau ?reset=true)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset') === '0123' || urlParams.get('reset') === 'true') {
      window.dbManager.clearAllData('0123');
      const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    }

    this.initDOM();
    this.bindEvents();
    this.checkReturningStudent();
  }

  // Bind Referensi Elemen DOM
  initDOM() {
    // Screens
    this.screens = {
      welcome: document.getElementById('welcome-screen'),
      quiz: document.getElementById('quiz-screen'),
      calculating: document.getElementById('calculating-screen'),
      result: document.getElementById('result-screen'),
      teacher: document.getElementById('teacher-screen')
    };

    // Calculating Elements
    this.calcProgressFill = document.getElementById('calc-progress-fill');
    this.calcStatusText = document.getElementById('calc-status-text');

    // Audio Buttons
    this.btnToggleSFX = document.getElementById('btn-toggle-sfx');
    this.btnToggleNarration = document.getElementById('btn-toggle-narration');
    this.btnListenQuestion = document.getElementById('btn-listen-question');

    // Welcome Form
    this.studentNameInput = document.getElementById('student-name');
    this.studentClassSelect = document.getElementById('student-class');
    this.btnStartQuiz = document.getElementById('btn-start-quiz');
    this.alreadyNotice = document.getElementById('already-notice');

    // Quiz Elements
    this.badgeDifficulty = document.getElementById('badge-difficulty');
    this.badgeBab = document.getElementById('badge-bab');
    this.textProgress = document.getElementById('text-progress');
    this.progressBarFill = document.getElementById('progress-bar-fill');
    this.streakIndicator = document.getElementById('streak-indicator');
    this.questionText = document.getElementById('question-text');
    this.optionsContainer = document.getElementById('options-container');

    // Feedback Modal
    this.feedbackModal = document.getElementById('feedback-modal');
    this.feedbackIcon = document.getElementById('feedback-icon');
    this.feedbackTitle = document.getElementById('feedback-title');
    this.feedbackAppreciation = document.getElementById('feedback-appreciation');
    this.feedbackExplanation = document.getElementById('feedback-explanation');
    this.btnNextQuestion = document.getElementById('btn-next-question');

    // Result Elements
    this.resultStudentName = document.getElementById('result-student-name');
    this.resultScoreNumber = document.getElementById('result-score-number');
    this.resultStatusBadge = document.getElementById('result-status-badge');
    this.resultCorrectCount = document.getElementById('result-correct-count');
    this.resultWrongCount = document.getElementById('result-wrong-count');
    this.resultBab1Bar = document.getElementById('result-bab1-bar');
    this.resultBab1Score = document.getElementById('result-bab1-score');
    this.resultBab2Bar = document.getElementById('result-bab2-bar');
    this.resultBab2Score = document.getElementById('result-bab2-score');
    this.resultBab3Bar = document.getElementById('result-bab3-bar');
    this.resultBab3Score = document.getElementById('result-bab3-score');
    this.resultAdvice = document.getElementById('result-advice');

    // Teacher Pin Modal
    this.teacherPinModal = document.getElementById('teacher-pin-modal');
    this.teacherPinInput = document.getElementById('teacher-pin-input');
    this.teacherPinError = document.getElementById('teacher-pin-error');
    this.btnSubmitPin = document.getElementById('btn-submit-pin');
    this.btnClosePinModal = document.getElementById('btn-close-pin-modal');
    this.btnOpenTeacherModal = document.getElementById('btn-open-teacher-modal');

    // Teacher Dashboard Elements
    this.teacherStatTotal = document.getElementById('teacher-stat-total');
    this.teacherStatAvg = document.getElementById('teacher-stat-avg');
    this.teacherStatHighest = document.getElementById('teacher-stat-highest');
    this.teacherStatLowest = document.getElementById('teacher-stat-lowest');
    this.teacherStatPassed = document.getElementById('teacher-stat-passed');
    this.teacherBab1Stat = document.getElementById('teacher-bab1-stat');
    this.teacherBab2Stat = document.getElementById('teacher-bab2-stat');
    this.teacherBab3Stat = document.getElementById('teacher-bab3-stat');
    this.teacherTableBody = document.getElementById('teacher-table-body');
    this.teacherSearchInput = document.getElementById('teacher-search-input');
    this.teacherClassTabs = document.querySelectorAll('.class-tab-btn');
    this.btnExitTeacher = document.getElementById('btn-exit-teacher');
    this.btnClearAllData = document.getElementById('btn-clear-all-data');

    // Export Buttons
    this.btnExportExcel = document.getElementById('btn-export-excel');
    this.btnExportPDF = document.getElementById('btn-export-pdf');
    this.btnExportWord = document.getElementById('btn-export-word');

    // Settings GAS Modal
    this.btnOpenGasSettings = document.getElementById('btn-open-gas-settings');
    this.gasSettingsModal = document.getElementById('gas-settings-modal');
    this.gasUrlInput = document.getElementById('gas-url-input');
    this.btnSaveGasUrl = document.getElementById('btn-save-gas-url');
    this.btnCloseGasModal = document.getElementById('btn-close-gas-modal');
  }

  // Hubungkan Event Listener
  bindEvents() {
    // Audio toggles
    this.btnToggleSFX.addEventListener('click', () => {
      const state = window.audioEngine.toggleSFX();
      this.updateAudioIcons();
    });

    this.btnToggleNarration.addEventListener('click', () => {
      const state = window.audioEngine.toggleNarration();
      this.updateAudioIcons();
    });

    this.btnListenQuestion.addEventListener('click', () => {
      window.audioEngine.playClick();
      this.readCurrentQuestionAloud();
    });

    // Start Quiz
    this.btnStartQuiz.addEventListener('click', () => this.handleStartQuiz());

    // Input Name validation
    this.studentNameInput.addEventListener('input', () => {
      this.checkStudentSubmissionEligibility();
    });
    this.studentClassSelect.addEventListener('change', () => {
      this.checkStudentSubmissionEligibility();
    });

    // Next Question Button
    this.btnNextQuestion.addEventListener('click', () => {
      window.audioEngine.playClick();
      this.closeFeedbackModal();
      this.advanceToNextQuestion();
    });

    // Teacher Access
    this.btnOpenTeacherModal.addEventListener('click', () => {
      window.audioEngine.playClick();
      this.openTeacherPinModal();
    });
    this.btnClosePinModal.addEventListener('click', () => {
      window.audioEngine.playClick();
      this.closeTeacherPinModal();
    });
    this.btnSubmitPin.addEventListener('click', () => this.handlePinSubmission());
    this.teacherPinInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handlePinSubmission();
    });

    // Teacher Dashboard Actions
    this.btnExitTeacher.addEventListener('click', () => {
      window.audioEngine.playClick();
      this.showScreen('welcome');
    });

    // Filter Tabs
    this.teacherClassTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        window.audioEngine.playClick();
        this.teacherClassTabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        this.teacherClassFilter = e.target.dataset.kelas;
        this.renderTeacherTable();
      });
    });

    // Search Input
    this.teacherSearchInput.addEventListener('input', (e) => {
      this.teacherSearchQuery = e.target.value.toLowerCase();
      this.renderTeacherTable();
    });

    // Export Buttons
    this.btnExportExcel.addEventListener('click', () => {
      window.audioEngine.playClick();
      const filtered = this.getFilteredTeacherData();
      window.exportEngine.exportToExcel(filtered, this.teacherClassFilter);
    });

    this.btnExportPDF.addEventListener('click', () => {
      window.audioEngine.playClick();
      const filtered = this.getFilteredTeacherData();
      window.exportEngine.exportToPDF(filtered, this.teacherClassFilter);
    });

    this.btnExportWord.addEventListener('click', () => {
      window.audioEngine.playClick();
      const filtered = this.getFilteredTeacherData();
      window.exportEngine.exportToWord(filtered, this.teacherClassFilter);
    });

    // Reset Semua Data Ujian (Dasbor Guru)
    if (this.btnClearAllData) {
      this.btnClearAllData.addEventListener('click', async () => {
        window.audioEngine.playClick();
        const confirmed = confirm(
          "⚠️ PERINGATAN GURU:\nApakah Bapak/Ibu yakin ingin menghapus SELURUH rekaman nilai ujian?\n\n" +
          "• Tabel di dasbor akan dikosongkan (0 siswa).\n" +
          "• Catatan pengerjaan sebelumnya di perangkat ini akan dibersihkan sehingga bisa mengerjakan ulang jika diperlukan.\n" +
          "• Perintah reset akan dikirimkan ke cloud Google Sheets."
        );
        if (!confirmed) return;

        try {
          await window.dbManager.clearAllData('0123');
          this.teacherData = [];
          this.renderTeacherTable();
          this.renderTeacherStats();
          if (this.alreadyNotice) {
            this.alreadyNotice.classList.add('hidden');
          }
          if (this.btnStartQuiz) {
            this.btnStartQuiz.disabled = false;
            this.btnStartQuiz.classList.remove('hidden');
          }
          alert("✅ Semua data ujian sebelumnya berhasil dibersihkan!");
        } catch (err) {
          alert("Gagal mereset data: " + err.message);
        }
      });
    }

    // GAS Settings Modal
    this.btnOpenGasSettings.addEventListener('click', () => {
      window.audioEngine.playClick();
      this.gasUrlInput.value = window.dbManager.getGasUrl();
      this.gasSettingsModal.classList.remove('hidden');
    });
    this.btnCloseGasModal.addEventListener('click', () => {
      window.audioEngine.playClick();
      this.gasSettingsModal.classList.add('hidden');
    });
    this.btnSaveGasUrl.addEventListener('click', () => {
      window.audioEngine.playClick();
      window.dbManager.setGasUrl(this.gasUrlInput.value);
      this.gasSettingsModal.classList.add('hidden');
      alert("Alamat Google Apps Script berhasil disimpan!");
      this.refreshTeacherData();
    });

    // Keypad PIN numbers click
    document.querySelectorAll('.pin-key').forEach(key => {
      key.addEventListener('click', (e) => {
        window.audioEngine.playClick();
        const num = e.target.dataset.num;
        if (num === 'C') {
          this.teacherPinInput.value = '';
        } else if (num === 'DEL') {
          this.teacherPinInput.value = this.teacherPinInput.value.slice(0, -1);
        } else {
          if (this.teacherPinInput.value.length < 4) {
            this.teacherPinInput.value += num;
          }
        }
      });
    });
  }

  // Update Status Ikon Audio di Header
  updateAudioIcons() {
    this.btnToggleSFX.innerHTML = window.audioEngine.sfxEnabled ? '🔊 Efek: ON' : '🔈 Efek: OFF';
    this.btnToggleSFX.classList.toggle('active', window.audioEngine.sfxEnabled);

    this.btnToggleNarration.innerHTML = window.audioEngine.narrationEnabled ? '🗣️ Narasi: ON' : '🤐 Narasi: OFF';
    this.btnToggleNarration.classList.toggle('active', window.audioEngine.narrationEnabled);
  }

  // Ganti Layar Tampilan Aktif
  showScreen(screenName) {
    window.audioEngine.stopSpeaking();
    Object.keys(this.screens).forEach(key => {
      this.screens[key].classList.add('hidden');
    });
    if (this.screens[screenName]) {
      this.screens[screenName].classList.remove('hidden');
      this.currentScreen = screenName;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ==========================================
  // ATURAN 1X PENGERJAAN & CEK SISWA (RESUME / PERMANENT LOCK)
  // ==========================================

  checkReturningStudent() {
    this.updateAudioIcons();

    // 1. Prioritas Utama: Jika siswa sudah pernah menyelesaikan kuis (SUBMITTED)
    // Siswa TIDAK PERNAH bisa mengulang lagi, langsung kunci ke layar hasil miliknya
    const sessionStr = localStorage.getItem(window.dbManager.STUDENT_COMPLETED_KEY);
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session && session.nama && session.skor !== undefined) {
          this.renderResultScreen(session);
          return;
        }
      } catch (e) {}
    }

    // 2. Jika belum submit, cek apakah kuis sedang berjalan lalu tertutup / crash (AUTO-RECOVERY)
    const inProgressStr = localStorage.getItem('quiz_in_progress_state');
    if (inProgressStr) {
      try {
        const prog = JSON.parse(inProgressStr);
        if (prog && prog.student && prog.student.nama && prog.currentIndex < 50) {
          this.showResumeNotice(prog);
          return;
        }
      } catch (e) {}
    }
  }

  showResumeNotice(prog) {
    this.alreadyNotice.innerHTML = `
      <div class="alert-box alert-info" style="border: 2px solid #38bdf8; background: #e0f2fe;">
        <strong style="font-size: 1.1rem; color: #0284c7;">🔄 Lanjutkan Kuis Terakhirmu!</strong><br/>
        Halo <b>${prog.student.nama}</b> (${prog.student.kelas}), sistem mendeteksi kamu sedang mengerjakan kuis dan belum selesai.<br/>
        Terakhir di <b>Soal ke-${prog.currentIndex + 1} dari 50</b>.<br/>
        <div style="margin-top: 14px;">
          <button type="button" class="btn-chunky btn-primary btn-block" id="btn-resume-quiz">
            Lanjutkan Soal ke-${prog.currentIndex + 1} 🚀
          </button>
        </div>
      </div>
    `;
    this.alreadyNotice.classList.remove('hidden');
    this.btnStartQuiz.classList.add('hidden');

    const btnResume = document.getElementById('btn-resume-quiz');
    if (btnResume) {
      btnResume.addEventListener('click', () => {
        window.audioEngine.playClick();
        this.currentStudent = prog.student;
        this.currentIndex = prog.currentIndex;
        this.currentDifficulty = prog.currentDifficulty || 'easy';
        this.streakCount = prog.streakCount || 0;
        this.answersHistory = prog.answersHistory || [];
        this.startTime = prog.startTime ? new Date(prog.startTime) : new Date();

        // Pulihkan susunan acak opsi yang sebelumnya telah diacak untuk siswa ini
        if (prog.questionQueue && prog.questionQueue.length === 50) {
          this.questionQueue = prog.questionQueue;
        } else {
          this.setupQuestionQueue();
        }

        this.showScreen('quiz');
        this.loadQuestionAtCurrentIndex();
      });
    }
  }

  saveProgress() {
    if (!this.currentStudent || !this.currentStudent.nama) return;
    if (this.currentIndex >= 50) return;

    const progress = {
      student: this.currentStudent,
      currentIndex: this.currentIndex,
      currentDifficulty: this.currentDifficulty,
      streakCount: this.streakCount,
      answersHistory: this.answersHistory,
      questionQueue: this.questionQueue, // Simpan urutan acak opsi milik siswa ini
      startTime: this.startTime,
      updatedAt: Date.now()
    };
    localStorage.setItem('quiz_in_progress_state', JSON.stringify(progress));
  }

  checkStudentSubmissionEligibility() {
    const nama = this.studentNameInput.value.trim();
    const kelas = this.studentClassSelect.value;
    if (!nama) {
      this.alreadyNotice.classList.add('hidden');
      this.btnStartQuiz.disabled = false;
      return;
    }

    const check = window.dbManager.isAlreadySubmitted(nama, kelas);
    if (check.submitted) {
      this.alreadyNotice.innerHTML = `
        <div class="alert-box alert-warning">
          <strong>⚠️ Kamu Sudah Mengerjakan!</strong><br/>
          Halo <b>${check.data.nama}</b> dari <b>${check.data.kelas}</b>, kamu telah menyelesaikan kuis ini dengan skor <b>${check.data.skor}</b>.<br/>
          <small>Sesuai aturan ujian, setiap siswa hanya dapat mengerjakan 1 kali saja.</small>
          <div style="margin-top: 10px;">
            <button type="button" class="btn-chunky btn-primary btn-sm" id="btn-view-my-score">
              Lihat Nilai Saya 📄
            </button>
          </div>
        </div>
      `;
      this.alreadyNotice.classList.remove('hidden');
      this.btnStartQuiz.disabled = true;

      const btnView = document.getElementById('btn-view-my-score');
      if (btnView) {
        btnView.addEventListener('click', () => {
          this.renderResultScreen(check.data);
        });
      }
    } else {
      this.alreadyNotice.classList.add('hidden');
      this.btnStartQuiz.disabled = false;
    }
  }

  displayPreviousResultNotice(data) {
    this.alreadyNotice.innerHTML = `
      <div class="alert-box alert-info">
        <strong>👋 Selamat Datang Kembali, ${data.nama}!</strong><br/>
        Kamu sudah menyelesaikan kuis untuk <b>${data.kelas}</b> dengan nilai <b>${data.skor}</b>.
        <div style="margin-top: 10px;">
          <button type="button" class="btn-chunky btn-primary btn-sm" id="btn-view-my-score-top">
            Buka Kartu Nilai Saya ➔
          </button>
        </div>
      </div>
    `;
    this.alreadyNotice.classList.remove('hidden');
    const btn = document.getElementById('btn-view-my-score-top');
    if (btn) {
      btn.addEventListener('click', () => this.renderResultScreen(data));
    }
  }

  // ==========================================
  // LOGIKA ADAPTIF & ALUR KUIS
  // ==========================================

  handleStartQuiz() {
    const nama = this.studentNameInput.value.trim();
    const kelas = this.studentClassSelect.value;

    if (!nama) {
      alert("Silakan ketik nama lengkapmu terlebih dahulu ya!");
      this.studentNameInput.focus();
      return;
    }

    // Pastikan dicek lagi
    const check = window.dbManager.isAlreadySubmitted(nama, kelas);
    if (check.submitted) {
      alert(`Hai ${nama}, kamu sudah mengerjakan kuis ini sebelumnya dan meraih nilai ${check.data.skor}.`);
      this.renderResultScreen(check.data);
      return;
    }

    window.audioEngine.playClick();
    this.currentStudent = { nama, kelas };
    this.startTime = new Date();
    this.answersHistory = [];
    this.streakCount = 0;
    this.currentIndex = 0;
    this.currentDifficulty = 'easy';

    // Buat antrean 50 soal lengkap
    this.setupQuestionQueue();
    this.showScreen('quiz');
    this.loadQuestionAtCurrentIndex();
  }

  setupQuestionQueue() {
    // 50 Soal Matematika Lengkap Bab 1, 2, dan 3 Sesuai Kurikulum Merdeka
    // Fitur Anti-Nyontek Total (Dual-Layer Randomization):
    // 1. Urutan 50 soal diacak per siswa (Siswa A soal No. 1 berbeda dengan Siswa B)
    // 2. Urutan pilihan jawaban A, B, C, D di dalam tiap soal juga diacak per siswa

    // Langkah 1: Kloning dan acak urutan soal (Fisher-Yates)
    const shuffledBank = [...QUIZ_DATA];
    for (let i = shuffledBank.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledBank[i], shuffledBank[j]] = [shuffledBank[j], shuffledBank[i]];
    }

    // Langkah 2: Acak opsi jawaban di dalam masing-masing soal
    this.questionQueue = shuffledBank.map(q => {
      const correctText = q.options[q.answer];
      const shuffledOptions = [...q.options];

      // Acak posisi pilihan jawaban
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }

      // Kunci jawaban secara otomatis melacak indeks posisi baru
      const newAnswerIndex = shuffledOptions.indexOf(correctText);

      return {
        ...q,
        options: shuffledOptions,
        answer: newAnswerIndex
      };
    });
  }

  loadQuestionAtCurrentIndex() {
    if (this.currentIndex >= this.questionQueue.length) {
      this.finishQuiz();
      return;
    }

    this.currentQuestion = this.questionQueue[this.currentIndex];
    this.selectedOptionIndex = null;

    // Update Progres & Header
    const currentNum = this.currentIndex + 1;
    const totalNum = this.questionQueue.length;
    this.textProgress.innerText = `Soal ${currentNum} dari ${totalNum}`;
    const pct = Math.round((this.currentIndex / totalNum) * 100);
    this.progressBarFill.style.width = `${pct}%`;

    // Update Badge
    this.badgeBab.innerText = this.currentQuestion.babTitle;
    this.renderDifficultyBadge(this.currentQuestion.difficulty);

    // Update Streak Indicator
    if (this.streakCount >= 2) {
      this.streakIndicator.innerHTML = `🔥 <b>${this.streakCount}x</b> Benar Beruntun!`;
      this.streakIndicator.classList.remove('hidden');
    } else {
      this.streakIndicator.classList.add('hidden');
    }

    // Render Teks Soal
    this.questionText.innerHTML = this.currentQuestion.question;

    // Render Opsi Jawaban
    this.renderOptions(this.currentQuestion.options);

    // Simpan progres ke LocalStorage (proteksi crash / reload)
    this.saveProgress();

    // Audio Narasi Otomatis (jika aktif)
    if (window.audioEngine.narrationEnabled) {
      this.readCurrentQuestionAloud();
    }
  }

  renderDifficultyBadge(diff) {
    this.badgeDifficulty.className = 'badge-diff';
    if (diff === 'easy') {
      this.badgeDifficulty.classList.add('diff-easy');
      this.badgeDifficulty.innerHTML = '🟢 Mudah ⭐';
    } else if (diff === 'medium') {
      this.badgeDifficulty.classList.add('diff-medium');
      this.badgeDifficulty.innerHTML = '🟡 Sedang ⭐⭐';
    } else {
      this.badgeDifficulty.classList.add('diff-hard');
      this.badgeDifficulty.innerHTML = '🔴 Tantangan ⭐⭐⭐';
    }
  }

  renderOptions(options) {
    this.optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    options.forEach((optText, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-card';
      btn.dataset.index = index;

      btn.innerHTML = `
        <span class="option-letter">${letters[index]}</span>
        <span class="option-text">${optText}</span>
      `;

      btn.addEventListener('click', () => this.handleOptionSelect(index));
      this.optionsContainer.appendChild(btn);
    });
  }

  readCurrentQuestionAloud() {
    if (!this.currentQuestion) return;
    const letters = ['A', 'B', 'C', 'D'];
    let textToSpeak = this.currentQuestion.question + ". Pilihan jawabannya adalah: ";
    this.currentQuestion.options.forEach((opt, idx) => {
      textToSpeak += `${letters[idx]}, ${opt}. `;
    });

    this.btnListenQuestion.classList.add('pulsing');
    window.audioEngine.speak(
      textToSpeak,
      () => this.btnListenQuestion.classList.add('pulsing'),
      () => this.btnListenQuestion.classList.remove('pulsing')
    );
  }

  handleOptionSelect(selectedIndex) {
    if (this.selectedOptionIndex !== null) return; // Mencegah double click
    this.selectedOptionIndex = selectedIndex;

    const isCorrect = selectedIndex === this.currentQuestion.answer;
    const allButtons = this.optionsContainer.querySelectorAll('.option-card');

    // Beri penanda visual pada tombol
    allButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === this.currentQuestion.answer) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex) {
        btn.classList.add('wrong');
      }
    });

    // Catat histori pengerjaan
    this.answersHistory.push({
      questionId: this.currentQuestion.id,
      babId: this.currentQuestion.babId,
      difficulty: this.currentQuestion.difficulty,
      selectedIndex,
      correctIndex: this.currentQuestion.answer,
      isCorrect
    });

    // Simpan progres terkini
    this.saveProgress();

    // Logika Adaptif & Audio
    if (isCorrect) {
      this.streakCount++;
      if (this.streakCount >= 3) {
        window.audioEngine.playStreak();
      } else {
        window.audioEngine.playCorrect();
      }
      this.adaptDifficulty(true);
    } else {
      this.streakCount = 0;
      window.audioEngine.playWrong();
      this.adaptDifficulty(false);
    }

    // Tampilkan Umpan Balik Edukatif
    setTimeout(() => {
      this.showFeedbackModal(isCorrect);
    }, 450);
  }

  // Mesin Penyesuaian Tingkat Kesulitan Otomatis (Adaptive Scaffolding)
  adaptDifficulty(isCorrect) {
    if (isCorrect) {
      if (this.currentDifficulty === 'easy' && this.streakCount >= 2) {
        this.currentDifficulty = 'medium';
      } else if (this.currentDifficulty === 'medium' && this.streakCount >= 3) {
        this.currentDifficulty = 'hard';
      }
    } else {
      // Jika salah berturut-turut pada tantangan, turunkan ke tingkat sedang agar tetap termotivasi
      if (this.currentDifficulty === 'hard') {
        this.currentDifficulty = 'medium';
      }
    }
  }

  // ==========================================
  // MODAL UMPAN BALIK EDUKATIF
  // ==========================================

  showFeedbackModal(isCorrect) {
    window.audioEngine.stopSpeaking();
    this.feedbackModal.classList.remove('hidden');

    if (isCorrect) {
      this.feedbackIcon.innerHTML = '🌟🎉';
      this.feedbackTitle.innerText = 'Jawabanmu Tepat Sekali!';
      this.feedbackTitle.className = 'feedback-title text-success';
      this.feedbackAppreciation.innerText = this.currentQuestion.appreciation;
      this.feedbackExplanation.innerHTML = `<b>Penjelasan Singkat:</b> ${this.currentQuestion.explanation}`;

      // Narasi Umpan Balik
      if (window.audioEngine.narrationEnabled) {
        window.audioEngine.speak(`${this.currentQuestion.appreciation}. ${this.currentQuestion.explanation}`);
      }
    } else {
      this.feedbackIcon.innerHTML = '💡💪';
      this.feedbackTitle.innerText = 'Yuk, Pelajari Caranya!';
      this.feedbackTitle.className = 'feedback-title text-warm';
      this.feedbackAppreciation.innerText = "Tidak apa-apa, belajar dari kesalahan membuatmu semakin pintar!";
      this.feedbackExplanation.innerHTML = `<b>Langkah yang Benar:</b> ${this.currentQuestion.explanation}`;

      // Narasi Umpan Balik
      if (window.audioEngine.narrationEnabled) {
        window.audioEngine.speak(`Tidak apa-apa! Mari kita pelajari caranya: ${this.currentQuestion.explanation}`);
      }
    }
  }

  closeFeedbackModal() {
    this.feedbackModal.classList.add('hidden');
    window.audioEngine.stopSpeaking();
  }

  advanceToNextQuestion() {
    this.currentIndex++;
    this.loadQuestionAtCurrentIndex();
  }

  // ==========================================
  // SELESAI KUIS & REKAP NILAI SISWA
  // ==========================================

  async finishQuiz() {
    window.audioEngine.stopSpeaking();

    // 1. Tampilkan Segera Layar Animasi Menghitung (Menghilangkan kesan delay/hang)
    this.showScreen('calculating');
    if (this.calcProgressFill) this.calcProgressFill.style.width = '25%';
    if (this.calcStatusText) this.calcStatusText.innerText = 'Merekap hasil jawaban Bab 1, 2, dan 3...';

    const totalQuestions = this.answersHistory.length;
    const correctCount = this.answersHistory.filter(a => a.isCorrect).length;
    const wrongCount = totalQuestions - correctCount;
    const finalScore = Math.round((correctCount / totalQuestions) * 100);

    // Hitung per Bab
    const babScores = this.calculateBabScores();

    // Waktu selesai
    const now = new Date();
    const timeFormatted = now.toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const submissionData = {
      nama: this.currentStudent.nama,
      kelas: this.currentStudent.kelas,
      skor: finalScore,
      totalBenar: correctCount,
      totalSalah: wrongCount,
      bab1Skor: babScores[1],
      bab2Skor: babScores[2],
      bab3Skor: babScores[3],
      waktu: timeFormatted,
      status: finalScore >= 75 ? 'Tuntas' : 'Perlu Bimbingan'
    };

    // Update progres animasi secara bertahap
    setTimeout(() => {
      if (this.calcProgressFill) this.calcProgressFill.style.width = '70%';
      if (this.calcStatusText) this.calcStatusText.innerText = 'Menyimpan catatan hasil belajarmu...';
    }, 400);

    // Kirim ke database cloud secara paralel bersamaan dengan animasi
    const dbPromise = window.dbManager.submitQuizResult(submissionData);
    const minAnimPromise = new Promise(resolve => setTimeout(resolve, 1200));

    // Tunggu sinkronisasi dan durasi animasi minimal selesai
    await Promise.all([dbPromise, minAnimPromise]);

    if (this.calcProgressFill) this.calcProgressFill.style.width = '100%';
    if (this.calcStatusText) this.calcStatusText.innerText = 'Selesai! Menyiapkan kartu nilaimu...';

    // Hapus penyimpanan sementara in-progress karena pengerjaan telah selesai resmi
    localStorage.removeItem('quiz_in_progress_state');

    // Transisi halus ke Layar Hasil
    setTimeout(() => {
      window.audioEngine.playVictory();
      this.renderResultScreen(submissionData);
    }, 350);
  }

  calculateBabScores() {
    const babCounts = {
      1: { total: 0, correct: 0 },
      2: { total: 0, correct: 0 },
      3: { total: 0, correct: 0 }
    };

    this.answersHistory.forEach(a => {
      if (babCounts[a.babId]) {
        babCounts[a.babId].total++;
        if (a.isCorrect) babCounts[a.babId].correct++;
      }
    });

    const res = {};
    [1, 2, 3].forEach(bId => {
      const b = babCounts[bId];
      res[bId] = b.total > 0 ? Math.round((b.correct / b.total) * 100) : 100;
    });

    return res;
  }

  animateScoreCounter(targetScore) {
    const el = this.resultScoreNumber;
    el.innerText = '0';
    const duration = 1100;
    const start = performance.now();

    const frame = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.innerText = Math.round(ease * targetScore);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.innerText = targetScore;
        if (targetScore >= 75 && typeof confetti === 'function') {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.58 }
          });
        }
      }
    };
    requestAnimationFrame(frame);
  }

  renderResultScreen(data) {
    this.showScreen('result');
    this.resultStudentName.innerText = `${data.nama} (${data.kelas})`;
    this.animateScoreCounter(Number(data.skor) || 0);
    this.resultCorrectCount.innerText = data.totalBenar;
    this.resultWrongCount.innerText = data.totalSalah;

    // Status Badge
    const isPassed = Number(data.skor) >= 75;
    this.resultStatusBadge.className = 'status-pill ' + (isPassed ? 'status-tuntas' : 'status-bimbingan');
    this.resultStatusBadge.innerText = isPassed ? 'TUNTAS (KKM TERCAPAI) 🎉' : 'PERLU BIMBINGAN BELAJAR 📚';

    // Bab Bars
    this.resultBab1Bar.style.width = `${data.bab1Skor || 0}%`;
    this.resultBab1Score.innerText = `${data.bab1Skor || 0}%`;

    this.resultBab2Bar.style.width = `${data.bab2Skor || 0}%`;
    this.resultBab2Score.innerText = `${data.bab2Skor || 0}%`;

    this.resultBab3Bar.style.width = `${data.bab3Skor || 0}%`;
    this.resultBab3Score.innerText = `${data.bab3Skor || 0}%`;

    // Pesan Pedagogis Edukatif
    if (data.skor >= 90) {
      this.resultAdvice.innerText = "Luar biasa istimewa! Kamu menguasai seluruh konsep bilangan cacah, kalimat matematika, dan pengukuran dengan sangat gemilang. Pertahankan prestasimu ya!";
    } else if (data.skor >= 75) {
      this.resultAdvice.innerText = "Selamat, kamu sudah mencapai KKM ketuntasan dengan baik! Tetap rajin berlatih soal cerita matematika agar pemahamanmu semakin matang.";
    } else {
      this.resultAdvice.innerText = "Tetap semangat! Jangan berkecil hati. Mintalah bimbingan Bapak/Ibu guru untuk mengulang materi pengukuran atau kalimat matematika yang belum kamu pahami.";
    }
  }

  // ==========================================
  // DASBOR GURU (PIN 0123)
  // ==========================================

  openTeacherPinModal() {
    this.teacherPinInput.value = '';
    this.teacherPinError.classList.add('hidden');
    this.teacherPinModal.classList.remove('hidden');
    this.teacherPinInput.focus();
  }

  closeTeacherPinModal() {
    this.teacherPinModal.classList.add('hidden');
  }

  async handlePinSubmission() {
    const pin = this.teacherPinInput.value.trim();
    if (window.dbManager.verifyTeacherPin(pin)) {
      this.closeTeacherPinModal();
      this.showScreen('teacher');
      await this.refreshTeacherData(pin);
    } else {
      this.teacherPinError.innerText = "PIN Salah! Hanya Guru yang memiliki akses.";
      this.teacherPinError.classList.remove('hidden');
      this.teacherPinInput.value = '';
      window.audioEngine.playWrong();
    }
  }

  async refreshTeacherData(pin = '0123') {
    try {
      this.teacherData = await window.dbManager.getTeacherDashboardData(pin);
      this.renderTeacherStats();
      this.renderTeacherTable();
    } catch (e) {
      alert("Gagal memuat data dasbor: " + e.message);
    }
  }

  getFilteredTeacherData() {
    let list = [...this.teacherData];

    // Filter Kelas
    if (this.teacherClassFilter !== 'Semua') {
      list = list.filter(item => item.kelas === this.teacherClassFilter);
    }

    // Filter Search
    if (this.teacherSearchQuery) {
      list = list.filter(item => 
        (item.nama || '').toLowerCase().includes(this.teacherSearchQuery)
      );
    }

    return list;
  }

  renderTeacherStats() {
    const filtered = this.getFilteredTeacherData();
    const stats = window.exportEngine.calculateStats(filtered);

    this.teacherStatTotal.innerText = stats.total;
    this.teacherStatAvg.innerText = stats.avg;
    this.teacherStatHighest.innerText = stats.highest;
    this.teacherStatLowest.innerText = stats.lowest;
    this.teacherStatPassed.innerText = stats.passed;

    // Rata-rata per Bab
    if (filtered.length > 0) {
      const avgBab1 = (filtered.reduce((acc, curr) => acc + (Number(curr.bab1Skor) || 0), 0) / filtered.length).toFixed(0);
      const avgBab2 = (filtered.reduce((acc, curr) => acc + (Number(curr.bab2Skor) || 0), 0) / filtered.length).toFixed(0);
      const avgBab3 = (filtered.reduce((acc, curr) => acc + (Number(curr.bab3Skor) || 0), 0) / filtered.length).toFixed(0);

      this.teacherBab1Stat.style.width = `${avgBab1}%`;
      this.teacherBab1Stat.innerText = `${avgBab1}%`;

      this.teacherBab2Stat.style.width = `${avgBab2}%`;
      this.teacherBab2Stat.innerText = `${avgBab2}%`;

      this.teacherBab3Stat.style.width = `${avgBab3}%`;
      this.teacherBab3Stat.innerText = `${avgBab3}%`;
    } else {
      this.teacherBab1Stat.style.width = '0%';
      this.teacherBab1Stat.innerText = '0%';
      this.teacherBab2Stat.style.width = '0%';
      this.teacherBab2Stat.innerText = '0%';
      this.teacherBab3Stat.style.width = '0%';
      this.teacherBab3Stat.innerText = '0%';
    }
  }

  renderTeacherTable() {
    const list = this.getFilteredTeacherData();
    this.renderTeacherStats();
    this.teacherTableBody.innerHTML = '';

    if (list.length === 0) {
      this.teacherTableBody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align: center; padding: 24px; color: #64748b;">
            Belum ada data siswa untuk kelas atau pencarian ini.
          </td>
        </tr>
      `;
      return;
    }

    list.forEach((item, idx) => {
      const tr = document.createElement('tr');
      const isPassed = (Number(item.skor) || 0) >= 75;

      tr.innerHTML = `
        <td style="text-align: center;">${idx + 1}</td>
        <td><b>${item.nama}</b></td>
        <td style="text-align: center;"><span class="badge-class">${item.kelas}</span></td>
        <td style="text-align: center;"><b>${item.skor}</b></td>
        <td style="text-align: center; color: #16a34a;">${item.totalBenar || 0}</td>
        <td style="text-align: center; color: #e11d48;">${item.totalSalah || 0}</td>
        <td style="text-align: center;">${item.bab1Skor || 0}%</td>
        <td style="text-align: center;">${item.bab2Skor || 0}%</td>
        <td style="text-align: center;">${item.bab3Skor || 0}%</td>
        <td style="text-align: center; font-size: 12px; color: #64748b;">${item.waktu || '-'}</td>
        <td style="text-align: center;">
          <span class="status-pill ${isPassed ? 'status-tuntas' : 'status-bimbingan'}">
            ${isPassed ? 'Tuntas' : 'Bimbingan'}
          </span>
        </td>
      `;

      this.teacherTableBody.appendChild(tr);
    });
  }
}

// Inisialisasi Aplikasi Saat Halaman Selesai Dimuat
document.addEventListener('DOMContentLoaded', () => {
  window.quizApp = new QuizApp();
});

