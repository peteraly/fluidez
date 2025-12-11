import React from 'react';
import { getStreakData, getFlameIntensity, getNextMilestone } from '../../utils/streakManager';

export default function StreakDisplay({ compact = false }) {
  const data = getStreakData();
  const { emoji, color } = getFlameIntensity(data.currentStreak);
  const next = getNextMilestone(data.currentStreak);
  
  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: 'rgba(255,255,255,0.15)', borderRadius: '12px' }}>
        <span style={{ fontSize: '16px' }}>{emoji}</span>
        <span style={{ fontWeight: 'bold', color }}>{data.currentStreak}</span>
      </div>
    );
  }
  
  const progress = next ? Math.round((data.currentStreak / next) * 100) : 100;
  
  return (
    <div style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', borderRadius: '16px', padding: '20px', color: 'white', textAlign: 'center' }}>
      <div style={{ fontSize: '48px' }}>{emoji}</div>
      <div style={{ fontSize: '36px', fontWeight: 'bold', color }}>{data.currentStreak}</div>
      <div style={{ fontSize: '14px', opacity: 0.7 }}>day streak</div>
      {next && (
        <div style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '12px', opacity: 0.6, marginBottom: '4px' }}>Next: {next} days</div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: '3px' }} />
          </div>
        </div>
      )}
    </div>
  );
}
