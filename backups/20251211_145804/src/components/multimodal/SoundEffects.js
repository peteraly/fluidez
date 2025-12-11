// Web Audio API Sound Effects - No external files needed
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
};

// Generate tones programmatically
export const playTone = (frequency, duration, type = 'sine', volume = 0.3) => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    console.log('Audio not available');
  }
};

// Pre-defined sound effects
export const SoundEffects = {
  // Success sounds
  success: () => {
    playTone(523.25, 0.1); // C5
    setTimeout(() => playTone(659.25, 0.1), 100); // E5
    setTimeout(() => playTone(783.99, 0.15), 200); // G5
  },
  
  // Correct answer
  correct: () => {
    playTone(880, 0.15, 'sine', 0.2);
  },
  
  // Wrong answer (gentle)
  incorrect: () => {
    playTone(200, 0.2, 'sine', 0.15);
  },
  
  // Click/tap
  tap: () => {
    playTone(1000, 0.05, 'sine', 0.1);
  },
  
  // Message received
  message: () => {
    playTone(600, 0.1, 'sine', 0.15);
    setTimeout(() => playTone(800, 0.1), 80);
  },
  
  // Encouragement
  encourage: () => {
    playTone(440, 0.1);
    setTimeout(() => playTone(554.37, 0.1), 100);
    setTimeout(() => playTone(659.25, 0.15), 200);
  },
  
  // Level up / milestone
  levelUp: () => {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.15), i * 100);
    });
  },
  
  // Thinking/waiting
  thinking: () => {
    playTone(300, 0.3, 'sine', 0.05);
  },
  
  // Start recording
  recordStart: () => {
    playTone(440, 0.1, 'sine', 0.2);
  },
  
  // Stop recording  
  recordStop: () => {
    playTone(880, 0.1, 'sine', 0.2);
  },
  
  // Ambient: Café
  ambientCafe: () => {
    // Simulate café chatter with random tones
    const play = () => {
      playTone(200 + Math.random() * 200, 0.5, 'sine', 0.02);
    };
    const interval = setInterval(play, 500);
    return () => clearInterval(interval);
  },
  
  // Ambient: Airport
  ambientAirport: () => {
    const play = () => {
      playTone(150 + Math.random() * 100, 1, 'sine', 0.015);
    };
    const interval = setInterval(play, 2000);
    return () => clearInterval(interval);
  }
};

export default SoundEffects;
