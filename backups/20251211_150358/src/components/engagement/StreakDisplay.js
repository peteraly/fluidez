import React, { useState, useEffect } from 'react';
import { getStreakData, getNextMilestone, getMilestoneProgress, getFlameState } from '../../utils/streakManager';

const StreakDisplay = ({ compact = false }) => {
  const [streak, setStreak] = useState(getStreakData());
  const [milestone, setMilestone] = useState(null);
  
  useEffect(() => {
    const data = getStreakData();
    setStreak(data);
    setMilestone(getMilestoneProgress(data.current));
  }, []);
  
  const flame = getFlameState(streak.current);
  
  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 20, filter: streak.current > 0 ? 'none' : 'grayscale(1)' }}>🔥</span>
        <span style={{ fontWeight: 600, color: flame.color }}>{streak.current}</span>
      </div>
    );
  }
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #fff5f0 0%, #fff 100%)',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <span style={{ 
          fontSize: 48,
          filter: streak.current > 0 ? 'none' : 'grayscale(1)',
          animation: flame.animation !== 'none' ? `${flame.animation} 1s infinite` : 'none'
        }}>🔥</span>
        <div>
          <div style={{ fontSize: 32, fontWeight: 700, color: flame.color }}>{streak.current}</div>
          <div style={{ color: '#666', fontSize: 14 }}>day streak</div>
        </div>
      </div>
      
      {milestone && (
        <>
          <div style={{
            background: '#f0f0f0',
            borderRadius: 10,
            height: 10,
            overflow: 'hidden',
            marginBottom: 8
          }}>
            <div style={{
              background: `linear-gradient(90deg, ${flame.color}, #FFD700)`,
              height: '100%',
              width: `${milestone.progress * 100}%`,
              borderRadius: 10,
              transition: 'width 0.5s ease'
            }} />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#666' }}>
              Day {streak.current} of {milestone.nextMilestone.days}
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#FF9800' }}>
              {milestone.nextMilestone.badge} {milestone.daysToNext} days to "{milestone.nextMilestone.name}"
            </span>
          </div>
          
          {milestone.isCloseToMilestone && (
            <div style={{
              marginTop: 12,
              padding: '10px 14px',
              background: 'rgba(255, 215, 0, 0.15)',
              borderRadius: 10,
              textAlign: 'center',
              fontSize: 14,
              color: '#996515'
            }}>
              ⭐ {milestone.daysToNext === 1 ? 'Tomorrow' : `${milestone.daysToNext} days`} until "{milestone.nextMilestone.name}" badge!
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StreakDisplay;
