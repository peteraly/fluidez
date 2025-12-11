import React from 'react';

const NoticingDisplay = ({ dayData }) => {
  if (!dayData?.noticingEnhancements) return null;
  
  const { colorScheme, colorCodes, callouts, inputFlooding, morphemeDisplay } = dayData.noticingEnhancements;

  const getCalloutStyle = (type) => {
    const styles = {
      pre_pattern: { background: '#E3F2FD', borderColor: '#2196F3' },
      post_pattern: { background: '#E8F5E9', borderColor: '#4CAF50' },
      rule: { background: '#FFF3E0', borderColor: '#FF9800' },
      exception: { background: '#FFEBEE', borderColor: '#F44336' },
      memory: { background: '#F3E5F5', borderColor: '#9C27B0' },
      comparison: { background: '#E0F7FA', borderColor: '#00BCD4' }
    };
    return styles[type] || styles.rule;
  };

  return (
    <div className="noticing-container">
      {/* Callouts */}
      {callouts?.map((callout, i) => (
        <div 
          key={i} 
          className="noticing-callout"
          style={{
            background: getCalloutStyle(callout.type).background,
            borderLeft: `4px solid ${getCalloutStyle(callout.type).borderColor}`
          }}
        >
          {callout.text}
        </div>
      ))}
      
      {/* Morpheme Display */}
      {morphemeDisplay && (
        <div className="morpheme-table">
          <h4 className="morpheme-verb">{morphemeDisplay.verb}</h4>
          <div className="morpheme-stem">Stem: <strong>{morphemeDisplay.stem}</strong></div>
          <div className="conjugation-grid">
            {['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos'].map((pronoun, i) => {
              const colors = colorCodes || {};
              const colorKeys = Object.keys(colors);
              const color = colors[colorKeys[i]] || '#333';
              
              return (
                <div key={i} className="conjugation-row">
                  <span className="pronoun">{pronoun}</span>
                  <span className="stem">{morphemeDisplay.stem}</span>
                  <span className="ending" style={{ color, fontWeight: 'bold' }}>
                    {morphemeDisplay.endings[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Input Flooding */}
      {inputFlooding?.length > 0 && (
        <div className="input-flooding">
          <p className="flooding-label">📝 Practice these examples:</p>
          <div className="examples-grid">
            {inputFlooding.map((example, i) => (
              <div key={i} className="example-chip">
                {example}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticingDisplay;
