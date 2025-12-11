import React from 'react';

/**
 * Processability Theory Stage Display
 * From Matrix: PT Audit - 6 stages across 30 days
 */

const PT_STAGES = {
  1: { name: 'Lemma Access', description: 'Words & Formulas', color: '#E8F5E9', icon: '🌱' },
  2: { name: 'Category Procedure', description: 'Lexical Morphology', color: '#E3F2FD', icon: '📝' },
  3: { name: 'Phrasal Procedure', description: 'Within Phrases', color: '#FFF3E0', icon: '🔗' },
  4: { name: 'S-Procedure', description: 'Subject-Verb Agreement', color: '#FCE4EC', icon: '⚡' },
  5: { name: 'S-bar Procedure', description: 'Subordinate Clauses', color: '#F3E5F5', icon: '🎯' },
  6: { name: 'Discourse', description: 'Full Integration', color: '#E0F7FA', icon: '🏆' }
};

const PTStageDisplay = ({ stage, compact = false }) => {
  const stageData = PT_STAGES[stage] || PT_STAGES[1];
  
  if (compact) {
    return (
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: stageData.color,
        padding: '4px 10px',
        borderRadius: 12,
        fontSize: 12
      }}>
        <span>{stageData.icon}</span>
        <span style={{ fontWeight: 600 }}>PT {stage}</span>
      </div>
    );
  }
  
  return (
    <div style={{
      background: stageData.color,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 32 }}>{stageData.icon}</span>
        <div>
          <div style={{ fontWeight: 600, color: '#333' }}>
            Stage {stage}: {stageData.name}
          </div>
          <div style={{ fontSize: 13, color: '#666' }}>
            {stageData.description}
          </div>
        </div>
      </div>
      
      {/* Progress through stages */}
      <div style={{
        display: 'flex',
        gap: 4,
        marginTop: 12
      }}>
        {[1, 2, 3, 4, 5, 6].map(s => (
          <div
            key={s}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: s <= stage ? '#4CAF50' : '#e0e0e0'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export { PT_STAGES };
export default PTStageDisplay;
