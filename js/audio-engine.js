/**
 * MESIN AUDIO INTERAKTIF (Web Audio API Synthesizer + Speech Synthesis API)
 * 
 * 100% Bebas Ketergantungan Eksternal:
 * - Efek suara (SFX) disintesis langsung menggunakan Web Audio API (Osilator nada murni).
 * - Bebas broken link 404 pada hosting GitHub Pages.
 * - Narasi suara menggunakan Browser Web Speech Synthesis API dengan bahasa Indonesia (id-ID).
 */

class AudioEngine {
  constructor() {
    this.audioCtx = null;
    this.sfxEnabled = localStorage.getItem('quiz_sfx_enabled') !== 'false';
    this.narrationEnabled = localStorage.getItem('quiz_narration_enabled') !== 'false';
    this.currentUtterance = null;
    this.synth = window.speechSynthesis || null;
    this.indonesianVoice = null;

    this.initSpeechVoices();
  }

  // Inisialisasi AudioContext saat ada interaksi pengguna pertama kali
  ensureAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Mencari suara bahasa Indonesia pada SpeechSynthesis browser
  initSpeechVoices() {
    if (!this.synth) return;

    const findVoice = () => {
      const voices = this.synth.getVoices();
      // Prioritaskan suara bahasa Indonesia (id, id-ID, id_ID)
      this.indonesianVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID')) || null;
    };

    findVoice();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = findVoice;
    }
  }

  // ==========================================
  // EFEK SUARA SINTETIS (SFX Web Audio API)
  // ==========================================

  // Bunyi Gelembung Lembut saat Menekan Tombol / Memilih Opsi
  playClick() {
    if (!this.sfxEnabled) return;
    try {
      this.ensureAudioContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      const now = this.audioCtx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.06);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn("Audio SFX Error:", e);
    }
  }

  // Bunyi Ceria Saat Menjawab Benar (Major Arpeggio C5 - E5 - G5 - C6)
  playCorrect() {
    if (!this.sfxEnabled) return;
    try {
      this.ensureAudioContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const noteDuration = 0.07;

      notes.forEach((freq, index) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const startTime = now + (index * noteDuration);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration + 0.1);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + noteDuration + 0.12);
      });
    } catch (e) {
      console.warn("Audio SFX Error:", e);
    }
  }

  // Bunyi Edukatif Menenangkan Saat Salah (Duotone G4 - Eb4, tidak mengagetkan)
  playWrong() {
    if (!this.sfxEnabled) return;
    try {
      this.ensureAudioContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const notes = [392.00, 311.13]; // G4, Eb4
      const noteDuration = 0.14;

      notes.forEach((freq, index) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const startTime = now + (index * noteDuration);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration + 0.08);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + noteDuration + 0.1);
      });
    } catch (e) {
      console.warn("Audio SFX Error:", e);
    }
  }

  // Bunyi Bonus Bintang saat Streak Benar Berturut-turut
  playStreak() {
    if (!this.sfxEnabled) return;
    try {
      this.ensureAudioContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const freqs = [659.25, 880.00, 1174.66, 1318.51];
      freqs.forEach((f, i) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const t = now + (i * 0.05);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);

        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(t);
        osc.stop(t + 0.16);
      });
    } catch (e) {
      console.warn("Audio SFX Error:", e);
    }
  }

  // Bunyi Kemenangan / Fanfare saat Kuis Selesai
  playVictory() {
    if (!this.sfxEnabled) return;
    try {
      this.ensureAudioContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      // Melodi ceria: G4, C5, E5, G5, E5, G5
      const melody = [
        { f: 392.00, d: 0.1 },
        { f: 523.25, d: 0.1 },
        { f: 659.25, d: 0.1 },
        { f: 783.99, d: 0.2 },
        { f: 659.25, d: 0.1 },
        { f: 783.99, d: 0.4 }
      ];

      let elapsed = 0;
      melody.forEach(item => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const t = now + elapsed;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, t);

        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + item.d + 0.05);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(t);
        osc.stop(t + item.d + 0.08);

        elapsed += item.d;
      });
    } catch (e) {
      console.warn("Audio SFX Error:", e);
    }
  }

  // ==========================================
  // NARASI SUARA BROWSER (Speech Synthesis API)
  // ==========================================

  // Berhenti Membaca Narasi
  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // Membaca Teks Bahasa Indonesia
  speak(text, onStart, onEnd) {
    if (!this.synth) return;
    this.stopSpeaking();

    // Bersihkan karakter simbol berlebih agar pelafalan natural
    const cleanText = text
      .replace(/\.\.\./g, ' titik-titik ')
      .replace(/\s\.\.\s/g, ' titik-titik ')
      .replace(/(\d+)\s*cm\b/gi, '$1 sentimeter')
      .replace(/(\d+)\s*m\b/gi, '$1 meter')
      .replace(/(\d+)\s*km\b/gi, '$1 kilometer')
      .replace(/(\d+)\s*kg\b/gi, '$1 kilogram')
      .replace(/(\d+)\s*g\b/gi, '$1 gram')
      .replace(/\+/g, ' ditambah ')
      .replace(/-/g, ' dikurang ')
      .replace(/=/g, ' sama dengan ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.rate = 0.92; // Kecepatan nyaman untuk anak SD
    utterance.pitch = 1.05; // Nada ramah dan hangat

    if (this.indonesianVoice) {
      utterance.voice = this.indonesianVoice;
    }

    utterance.onstart = () => {
      if (typeof onStart === 'function') onStart();
    };

    utterance.onend = () => {
      if (typeof onEnd === 'function') onEnd();
    };

    utterance.onerror = (err) => {
      console.warn("Speech Synthesis Warning:", err);
      if (typeof onEnd === 'function') onEnd();
    };

    this.synth.speak(utterance);
    this.currentUtterance = utterance;
  }

  // ==========================================
  // TOGGLE & PENGATURAN SUARA
  // ==========================================

  toggleSFX() {
    this.sfxEnabled = !this.sfxEnabled;
    localStorage.setItem('quiz_sfx_enabled', this.sfxEnabled);
    if (this.sfxEnabled) {
      this.playClick();
    }
    return this.sfxEnabled;
  }

  toggleNarration() {
    this.narrationEnabled = !this.narrationEnabled;
    localStorage.setItem('quiz_narration_enabled', this.narrationEnabled);
    if (!this.narrationEnabled) {
      this.stopSpeaking();
    }
    return this.narrationEnabled;
  }
}

// Inisialisasi Instance Global
window.audioEngine = new AudioEngine();
