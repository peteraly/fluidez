import React from 'react';

const STAGES = {
  1: { name: 'Words', icon: '🌱', color: '#81C784' },
  2: { name: 'Word Shapes', icon: '🌿', color: '#4CAF50' },
  3: { name: 'Phrases', icon: '🌳', color: '#388E3C' },
  4: { name: 'Sentences', icon: '🌲', color: '#2E7D32' },
  5: { name: 'Complex', icon: '🏔️', color: '#1B5E20' },
  6: { name: 'Fluent', icon: '⭐', color: '#FFD700' }
};

export default function PTStageDisplay({ stage = 1, compact = false }) {
  const s = STAGES[stage] || STAGES[1];
  
  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: `${s.color}22`, borderRadius: '12px', fontSize: '12px' }}>
        <span>{s.icon}</span>
        <span style={{ color: s.color, fontWeight: '600' }}>PT {stage}</span>
      </div>
    );
  }
  
  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '32px' }}>{s.icon}</span>
        <div>
          <div style={{ fontWeight: 'bold', color: s.color }}>Stage {stage}: {s.name}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
        {[1,2,3,4,5,6].map(n => (
          <div key={n} style={{ flex: 1, height: '6px', borderRadius: '3px', background: n <= stage ? STAGES[n].color : '#e0e0e0' }} />
        ))}
      </div>
    </div>
  );
}
