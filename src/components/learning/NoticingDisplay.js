import React from 'react';

const NoticingDisplay = ({ dayData }) => {
  const enh = dayData?.noticingEnhancements;
  if (!enh) return null;

  const colors = { yo: '#E91E63', tú: '#2196F3', él: '#4CAF50', nosotros: '#9C27B0', vosotros: '#FF9800', ellos: '#00BCD4' };

  return (
    <div style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', borderRadius: 16, padding: 20, marginTop: 16 }}>
      <h4 style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>👀 Notice the Pattern</h4>
      {enh.callouts?.map((c, i) => (
        <div key={i} style={{ padding: '12px 16px', borderRadius: 12, marginBottom: 10, background: c.type === 'rule' ? '#FFF3E0' : '#E3F2FD', borderLeft: `4px solid ${c.type === 'rule' ? '#FF9800' : '#2196F3'}` }}>
          {c.type === 'rule' ? '📏' : '🔍'} {c.text}
        </div>
      ))}
      {enh.morphemeDisplay && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <h5 style={{ margin: '0 0 12px' }}>{enh.morphemeDisplay.verb}</h5>
          <div style={{ fontFamily: 'monospace', marginBottom: 12 }}>Stem: <strong>{enh.morphemeDisplay.stem}</strong></div>
          {['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos'].map((p, i) => (
            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#f8f9fa', borderRadius: 8, marginBottom: 4 }}>
              <span style={{ minWidth: 80, color: colors[p.split('/')[0]], fontWeight: 600 }}>{p}</span>
              <span>{enh.morphemeDisplay.stem}</span>
              <span style={{ color: colors[p.split('/')[0]], fontWeight: 700 }}>{enh.morphemeDisplay.endings?.[i] || ''}</span>
            </div>
          ))}
        </div>
      )}
      {enh.inputFlooding?.length > 0 && (
        <div>
          <p style={{ fontWeight: 600, marginBottom: 12 }}>📝 Examples:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {enh.inputFlooding.map((ex, i) => (
              <button key={i} onClick={() => { const u = new SpeechSynthesisUtterance(ex); u.lang = 'es-ES'; speechSynthesis.speak(u); }} style={{ background: '#fff', padding: '10px 16px', borderRadius: 20, border: '1px solid #e0e0e0', cursor: 'pointer' }}>🔊 {ex}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticingDisplay;
