// ============================================================================
// SOUND SYSTEM - Web Audio API sounds and ambient soundscapes
// ============================================================================

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let ambientInterval = null;
let currentAmbient = null;

const getCtx = () => {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
};

// Core tone generator
const playTone = (freq, duration, type = 'sine', vol = 0.2) => {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) { console.log('Audio error:', e); }
};

// Play chord (multiple tones)
const playChord = (freqs, duration, vol = 0.15) => {
  freqs.forEach(f => playTone(f, duration, 'sine', vol / freqs.length));
};

// Sound Effects Library
export const Sounds = {
  // === FEEDBACK SOUNDS ===
  success: () => {
    playTone(523, 0.1); 
    setTimeout(() => playTone(659, 0.1), 100); 
    setTimeout(() => playTone(784, 0.15), 200);
  },
  
  correct: () => playTone(880, 0.12, 'sine', 0.15),
  
  incorrect: () => playTone(220, 0.25, 'sine', 0.08),
  
  tap: () => playTone(1000, 0.04, 'sine', 0.08),
  
  message: () => { 
    playTone(600, 0.08, 'sine', 0.12); 
    setTimeout(() => playTone(800, 0.08, 'sine', 0.12), 60); 
  },
  
  hint: () => playTone(400, 0.2, 'triangle', 0.08),
  
  recording: () => playTone(440, 0.1, 'sine', 0.15),
  
  stopRecording: () => playTone(880, 0.1, 'sine', 0.15),
  
  // === EMOTIONAL SOUNDS ===
  celebration: () => {
    const notes = [523, 659, 784, 1047, 1319];
    notes.forEach((f, i) => setTimeout(() => playTone(f, 0.12, 'sine', 0.12 - i * 0.02), i * 60));
  },
  
  levelUp: () => {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playTone(f, 0.15), i * 80));
  },
  
  encourage: () => { 
    playTone(440, 0.08); 
    setTimeout(() => playTone(554, 0.08), 80); 
    setTimeout(() => playTone(659, 0.12), 160); 
  },
  
  warmWelcome: () => { 
    playChord([330, 415, 494], 0.3, 0.1);
  },
  
  gentleReminder: () => playTone(350, 0.35, 'sine', 0.04),
  
  achievement: () => {
    const melody = [523, 659, 784, 659, 784, 1047];
    melody.forEach((f, i) => setTimeout(() => playTone(f, 0.12), i * 100));
  },
  
  streak: () => {
    [392, 494, 587, 784].forEach((f, i) => setTimeout(() => playTone(f, 0.1, 'triangle', 0.12), i * 70));
  },
  
  // === AMBIENT SOUNDSCAPES ===
  ambientCafe: () => {
    stopAmbient();
    currentAmbient = 'cafe';
    const play = () => {
      if (currentAmbient !== 'cafe') return;
      playTone(180 + Math.random() * 150, 0.8, 'sine', 0.012);
      if (Math.random() > 0.7) playTone(800 + Math.random() * 400, 0.1, 'sine', 0.006);
      if (Math.random() > 0.9) playTone(1200 + Math.random() * 300, 0.05, 'sine', 0.004);
    };
    play();
    ambientInterval = setInterval(play, 350 + Math.random() * 200);
    return () => stopAmbient();
  },
  
  ambientAirport: () => {
    stopAmbient();
    currentAmbient = 'airport';
    const play = () => {
      if (currentAmbient !== 'airport') return;
      playTone(100 + Math.random() * 60, 2, 'sine', 0.01);
      if (Math.random() > 0.8) playTone(500 + Math.random() * 300, 0.5, 'triangle', 0.008);
    };
    play();
    ambientInterval = setInterval(play, 1500);
    return () => stopAmbient();
  },
  
  ambientRestaurant: () => {
    stopAmbient();
    currentAmbient = 'restaurant';
    const play = () => {
      if (currentAmbient !== 'restaurant') return;
      playTone(200 + Math.random() * 120, 0.6, 'sine', 0.01);
      if (Math.random() > 0.5) playTone(1000 + Math.random() * 600, 0.08, 'sine', 0.004);
    };
    play();
    ambientInterval = setInterval(play, 300);
    return () => stopAmbient();
  },
  
  ambientDoctor: () => {
    stopAmbient();
    currentAmbient = 'doctor';
    // Quiet, minimal ambient
    const play = () => {
      if (currentAmbient !== 'doctor') return;
      if (Math.random() > 0.8) playTone(300, 0.3, 'sine', 0.005);
    };
    ambientInterval = setInterval(play, 3000);
    return () => stopAmbient();
  },
  
  ambientStreet: () => {
    stopAmbient();
    currentAmbient = 'street';
    const play = () => {
      if (currentAmbient !== 'street') return;
      playTone(150 + Math.random() * 100, 1, 'sine', 0.01);
      if (Math.random() > 0.6) playTone(400 + Math.random() * 200, 0.3, 'sine', 0.006);
    };
    play();
    ambientInterval = setInterval(play, 600);
    return () => stopAmbient();
  },
  
  ambientBeach: () => {
    stopAmbient();
    currentAmbient = 'beach';
    const play = () => {
      if (currentAmbient !== 'beach') return;
      // Wave-like sound
      const waveFreq = 100 + Math.random() * 50;
      playTone(waveFreq, 2, 'sine', 0.015);
      setTimeout(() => playTone(waveFreq * 1.5, 1.5, 'sine', 0.01), 500);
    };
    play();
    ambientInterval = setInterval(play, 2500);
    return () => stopAmbient();
  },
  
  ambientHome: () => {
    stopAmbient();
    currentAmbient = 'home';
    // Very quiet, occasional sounds
    const play = () => {
      if (currentAmbient !== 'home') return;
      if (Math.random() > 0.9) playTone(250, 0.2, 'sine', 0.003);
    };
    ambientInterval = setInterval(play, 2000);
    return () => stopAmbient();
  }
};

// Stop ambient sound
const stopAmbient = () => {
  if (ambientInterval) {
    clearInterval(ambientInterval);
    ambientInterval = null;
  }
  currentAmbient = null;
};

Sounds.stopAmbient = stopAmbient;

// Get ambient for scenario
export const getAmbientForScenario = (scenarioId) => {
  const mapping = {
    restaurant: Sounds.ambientRestaurant,
    cafe: Sounds.ambientCafe,
    airport: Sounds.ambientAirport,
    hotel: Sounds.ambientCafe,
    doctor: Sounds.ambientDoctor,
    directions: Sounds.ambientStreet,
    street: Sounds.ambientStreet,
    beach: Sounds.ambientBeach,
    home: Sounds.ambientHome,
    daily: Sounds.ambientHome
  };
  return mapping[scenarioId] || Sounds.ambientHome;
};

export default Sounds;
