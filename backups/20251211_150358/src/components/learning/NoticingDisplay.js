import React from 'react';

/**
 * Noticing Hypothesis UI
 * From Matrix: Elevated from P2 to P1 per audit
 * Color-coded grammar, callouts, morpheme tables
 */

const NoticingDisplay = ({ dayData }) => {
  const enhancements = dayData?.noticingEnhancements;
  
  if (!enhancements) {
    // Fallback for days without enhanced data
    return null;
  }
  
  const { callouts, inputFlooding, morphemeDisplay, colorCodes } = enhancements;
  
  // Default color scheme for verb conjugations
  const defaultColors = {
    yo: '#E91E63',      // Pink
    tú: '#2196F3',      // Blue
    él: '#4CAF50',      // Green
    nosotros: '#9C27B0', // Purple
    vosotros: '#FF9800', // Orange
    ellos: '#00BCD4'     // Cyan
  };
  
  const colors = colorCodes || defaultColors;
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      borderRadius: 16,
      padding: 20,
      marginTop: 16
    }}>
      <h4 style={{ 
        margin: '0 0 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: '#333'
      }}>
        👀 Notice the Pattern
      </h4>
      
      {/* Callouts */}
      {callouts?.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          {callouts.map((callout, i) => (
            <div key={i} style={{
              padding: '12px 16px',
              borderRadius: 12,
              marginBottom: 10,
              background: callout.type === 'rule' ? '#FFF3E0' : '#E3F2FD',
              borderLeft: `4px solid ${callout.type === 'rule' ? '#FF9800' : '#2196F3'}`
            }}>
              <span style={{ marginRight: 8 }}>
                {callout.type === 'rule' ? '📏' : callout.type === 'pattern' ? '🔍' : '💡'}
              </span>
              {callout.text}
            </div>
          ))}
        </div>
      )}
      
      {/* Morpheme Display - Color-coded conjugation table */}
      {morphemeDisplay && (
        <div style={{
          background: '#fff',
          borderRadius: 12,
          padding: 16,
          marginBottom: 16
        }}>
          <h5 style={{ margin: '0 0 12px', color: '#333' }}>
            {morphemeDisplay.verb} - Conjugation
          </h5>
          <div style={{ 
            fontFamily: 'monospace',
            fontSize: 14,
            marginBottom: 12
          }}>
            Stem: <strong style={{ color: '#333' }}>{morphemeDisplay.stem}</strong>
          </div>
          
          <div style={{ display: 'grid', gap: 8 }}>
            {['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos'].map((pronoun, i) => {
              const colorKey = pronoun.split('/')[0];
              const ending = morphemeDisplay.endings?.[i] || '';
              
              return (
                <div key={pronoun} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  background: '#f8f9fa',
                  borderRadius: 8
                }}>
                  <span style={{ 
                    minWidth: 80, 
                    color: colors[colorKey] || '#666',
                    fontWeight: 600
                  }}>
                    {pronoun}
                  </span>
                  <span style={{ color: '#333' }}>{morphemeDisplay.stem}</span>
                  <span style={{ 
                    color: colors[colorKey] || '#333',
                    fontWeight: 700,
                    fontSize: 16
                  }}>
                    {ending}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Input Flooding - Multiple examples */}
      {inputFlooding?.length > 0 && (
        <div>
          <p style={{ 
            fontWeight: 600, 
            marginBottom: 12, 
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            📝 Practice with these examples:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {inputFlooding.map((example, i) => (
              <button
                key={i}
                onClick={() => {
                  const utter = new SpeechSynthesisUtterance(example);
                  utter.lang = 'es-ES';
                  utter.rate = 0.85;
                  speechSynthesis.speak(utter);
                }}
                style={{
                  background: '#fff',
                  padding: '10px 16px',
                  borderRadius: 20,
                  border: '1px solid #e0e0e0',
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                🔊 {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticingDisplay;
