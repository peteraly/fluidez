import { useCallback, useRef } from 'react';

// Sound URLs (using free sound effects)
const SOUNDS = {
  correct: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  incorrect: 'https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3',
  levelUp: 'https://assets.mixkit.co/active_storage/sfx/1997/1997-preview.mp3',
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  streak: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
  complete: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3'
};

export function useSound() {
  const audioRef = useRef({});
  const enabled = useRef(true);

  const play = useCallback((soundName) => {
    if (!enabled.current) return;
    
    try {
      if (!audioRef.current[soundName]) {
        audioRef.current[soundName] = new Audio(SOUNDS[soundName]);
        audioRef.current[soundName].volume = 0.5;
      }
      audioRef.current[soundName].currentTime = 0;
      audioRef.current[soundName].play().catch(() => {});
    } catch (e) {
      // Ignore audio errors
    }
  }, []);

  return {
    playCorrect: () => play('correct'),
    playIncorrect: () => play('incorrect'),
    playLevelUp: () => play('levelUp'),
    playClick: () => play('click'),
    playStreak: () => play('streak'),
    playComplete: () => play('complete'),
    setEnabled: (val) => { enabled.current = val; }
  };
}

export default useSound;
