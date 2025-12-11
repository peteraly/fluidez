import React, { useState, useEffect } from 'react';

// Load all day JSON files from content/days
const loadEnhancedCurriculum = () => {
  const curriculum = {};
  try {
    const context = require.context('./content/days', false, /day\d+\.json$/);
    context.keys().forEach(key => {
      const dayNum = parseInt(key.match(/day(\d+)/)[1]);
      curriculum[dayNum] = context(key);
    });
  } catch (e) {
    console.log('Enhanced curriculum not loaded:', e);
  }
  return curriculum;
};

const enhancedData = loadEnhancedCurriculum();

// Text-to-speech helper
const speak = (text) => {
  if ('speechSynthesis' in window && text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }
};

// Sub-components for rendering enhanced content
const VocabWord = ({ word }) => (
  <div 
    onClick={() => speak(word.spanish)}
    style={{
      padding: '12px',
      margin: '6px 0',
      background: '#f8f9fa',
      borderRadius: '8px',
      cursor: 'pointer',
      borderLeft: '4px solid #9c27b0'
    }}
  >
    <span style={{ marginRight: '8px' }}>🔊</span>
    <strong style={{ color: '#d32f2f' }}>{word.spanish}</strong>
    <span style={{ color: '#666' }}> — {word.english}</span>
    {word.example && (
      <div style={{ fontStyle: 'italic', color: '#888', fontSize: '0.9em', marginTop: '4px' }}>
        "{word.example}"
      </div>
    )}
  </div>
);

const GrammarLesson = ({ screen }) => {
  if (screen.type === 'lesson') {
    return (
      <div style={{
        background: '#f0f7ff',
        padding: '16px',
        margin: '12px 0',
        borderRadius: '12px',
        borderLeft: '4px solid #2196f3'
      }}>
        <h4 style={{ color: '#1565c0', marginBottom: '10px' }}>{screen.heading}</h4>
        <p style={{ lineHeight: 1.6 }}>{screen.content}</p>
        {screen.examples && (
          <div style={{ marginTop: '12px' }}>
            {screen.examples.map((ex, i) => (
              <div 
                key={i} 
                onClick={() => speak(ex.spanish || ex)}
                style={{
                  padding: '10px',
                  margin: '6px 0',
                  background: 'white',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <strong style={{ color: '#d32f2f' }}>{ex.spanish || ex}</strong>
                {ex.english && <span style={{ color: '#666' }}> = {ex.english}</span>}
              </div>
            ))}
          </div>
        )}
        {screen.tip && (
          <div style={{
            background: '#e8f5e9',
            padding: '10px',
            borderRadius: '6px',
            marginTop: '12px',
            color: '#2e7d32'
          }}>
            💡 {screen.tip}
          </div>
        )}
      </div>
    );
  }
  if (screen.type === 'exercise') {
    return (
      <div style={{
        background: '#fff8e1',
        padding: '16px',
        margin: '12px 0',
        borderRadius: '12px',
        borderLeft: '4px solid #ff9800'
      }}>
        <p>✏️ {screen.instruction}</p>
      </div>
    );
  }
  return null;
};

// Main Enhanced Day Content Component
export const EnhancedDayContent = ({ day, section }) => {
  const dayData = enhancedData[day];
  
  if (!dayData) {
    return <div style={{ padding: '20px', color: '#666' }}>Enhanced content not available for Day {day}</div>;
  }

  // GRAMMAR SECTION
  if (section === 'grammar') {
    const grammar = dayData.grammar;
    const vosotros = grammar?.vosotros_reference;
    const vos = grammar?.vos_reference;
    
    return (
      <div style={{ padding: '16px' }}>
        <h3 style={{ color: '#1565c0', marginBottom: '16px' }}>{grammar?.title || 'Grammar'}</h3>
        
        {/* Vosotros Conjugations */}
        {vosotros && (
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '16px'
          }}>
            <h4>🇪🇸 VOSOTROS (Spain)</h4>
            {Object.entries(vosotros).map(([tense, forms]) => (
              <div key={tense} style={{ margin: '8px 0' }}>
                <strong>{tense}:</strong>
                {typeof forms === 'object' ? (
                  <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                    {Object.entries(forms).map(([verb, conj]) => (
                      <li key={verb}>{verb}: {conj}</li>
                    ))}
                  </ul>
                ) : (
                  <span> {forms}</span>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Vos Conjugations */}
        {vos && (
          <div style={{
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '16px'
          }}>
            <h4>🇦🇷 VOS (Argentina/Uruguay)</h4>
            {Object.entries(vos).map(([tense, forms]) => (
              <div key={tense} style={{ margin: '8px 0' }}>
                <strong>{tense}:</strong>
                {typeof forms === 'object' ? (
                  <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                    {Object.entries(forms).map(([verb, conj]) => (
                      <li key={verb}>{verb}: {conj}</li>
                    ))}
                  </ul>
                ) : (
                  <span> {forms}</span>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* All Grammar Screens */}
        {grammar?.screens?.map((screen, i) => (
          <GrammarLesson key={i} screen={screen} />
        ))}
        
        {/* Prepositions Guide (Day 18) */}
        {dayData.prepositions_guide && (
          <div style={{ background: '#fff3e0', padding: '20px', borderRadius: '12px', marginTop: '16px' }}>
            <h4>📘 Prepositions Guide</h4>
            {dayData.prepositions_guide.por_vs_para?.para_uses && (
              <>
                <h5 style={{ color: '#e65100' }}>PARA uses:</h5>
                {dayData.prepositions_guide.por_vs_para.para_uses.map((use, i) => (
                  <div key={i} style={{ padding: '8px', margin: '4px 0', background: 'white', borderRadius: '4px' }}>
                    <strong>{use.use}:</strong> {use.example}
                  </div>
                ))}
              </>
            )}
            {dayData.prepositions_guide.por_vs_para?.por_uses && (
              <>
                <h5 style={{ color: '#e65100', marginTop: '12px' }}>POR uses:</h5>
                {dayData.prepositions_guide.por_vs_para.por_uses.map((use, i) => (
                  <div key={i} style={{ padding: '8px', margin: '4px 0', background: 'white', borderRadius: '4px' }}>
                    <strong>{use.use}:</strong> {use.example}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
        
        {/* Gerunds vs Infinitives (Day 18) */}
        {dayData.gerunds_infinitives && (
          <div style={{ background: '#fce4ec', padding: '20px', borderRadius: '12px', marginTop: '16px' }}>
            <h4>📘 {dayData.gerunds_infinitives.title}</h4>
            <p style={{ fontStyle: 'italic', marginBottom: '12px' }}>{dayData.gerunds_infinitives.rule}</p>
            {dayData.gerunds_infinitives.common_errors?.map((err, i) => (
              <div key={i} style={{ padding: '10px', margin: '6px 0', background: 'white', borderRadius: '6px' }}>
                <span style={{ color: '#c62828' }}>❌ {err.wrong}</span>
                <span> → </span>
                <span style={{ color: '#2e7d32' }}>✅ {err.correct}</span>
                <div style={{ fontSize: '0.85em', color: '#666', marginTop: '4px' }}>{err.note}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // VOCABULARY SECTION
  if (section === 'vocabulary') {
    const vocab = dayData.vocabulary;
    const allWords = [];
    
    if (vocab?.screens) {
      vocab.screens.forEach(screen => {
        if (screen.words) {
          allWords.push({ category: screen.category, words: screen.words });
        }
      });
    }
    
    const totalCount = allWords.reduce((sum, g) => sum + g.words.length, 0);
    
    return (
      <div style={{ padding: '16px' }}>
        <h3 style={{ color: '#9c27b0', marginBottom: '16px' }}>
          {vocab?.title || 'Vocabulary'} 
          <span style={{ fontSize: '0.7em', marginLeft: '10px', color: '#666' }}>({totalCount} words)</span>
        </h3>
        
        {allWords.map((group, gi) => (
          <div key={gi} style={{ marginBottom: '24px' }}>
            {group.category && (
              <h4 style={{ 
                color: '#7b1fa2', 
                borderBottom: '2px solid #ce93d8',
                paddingBottom: '8px',
                marginBottom: '12px'
              }}>
                {group.category}
              </h4>
            )}
            {group.words.map((word, wi) => (
              <VocabWord key={wi} word={word} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  // CULTURAL/EXTRAS SECTION
  if (section === 'extras' || section === 'cultural') {
    return (
      <div style={{ padding: '16px' }}>
        {/* Cultural Notes */}
        {dayData.cultural && (
          <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '12px', marginBottom: '16px' }}>
            <h4>🌍 Cultural Notes</h4>
            <p>{dayData.cultural.content || dayData.cultural.screens?.[0]?.content}</p>
          </div>
        )}
        
        {/* False Friends */}
        {dayData.falseFriends?.words && (
          <div style={{ background: '#ffebee', padding: '20px', borderRadius: '12px', marginBottom: '16px' }}>
            <h4>⚠️ False Friends</h4>
            {dayData.falseFriends.words.map((word, i) => (
              <div key={i} style={{ padding: '10px', margin: '8px 0', background: 'white', borderRadius: '6px' }}>
                <strong>{word.spanish}</strong> = {word.means}
                <br/>
                <span style={{ color: '#c62828' }}>NOT: {word.notMean}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Idioms (Day 29) */}
        {dayData.idioms_extended && (
          <div style={{ background: '#f3e5f5', padding: '20px', borderRadius: '12px', marginBottom: '16px' }}>
            <h4>🗣️ Idioms ({dayData.idioms_extended.length})</h4>
            {dayData.idioms_extended.map((idiom, i) => (
              <div 
                key={i} 
                onClick={() => speak(idiom.spanish)}
                style={{ padding: '12px', margin: '8px 0', background: 'white', borderRadius: '8px', cursor: 'pointer' }}
              >
                <strong style={{ color: '#7b1fa2' }}>{idiom.spanish}</strong>
                <br/>= {idiom.english}
                {idiom.literal && <div style={{ fontSize: '0.85em', color: '#888' }}>(literal: {idiom.literal})</div>}
              </div>
            ))}
          </div>
        )}
        
        {/* Conversation Fillers (Day 29) */}
        {dayData.conversation_fillers && (
          <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '12px', marginBottom: '16px' }}>
            <h4>💬 Conversation Fillers</h4>
            {dayData.conversation_fillers.map((filler, i) => (
              <div 
                key={i}
                onClick={() => speak(filler.spanish)}
                style={{ padding: '10px', margin: '6px 0', background: 'white', borderRadius: '6px', cursor: 'pointer' }}
              >
                <strong>{filler.spanish}</strong> = {filler.english}
                {filler.example && <div style={{ fontStyle: 'italic', color: '#666', fontSize: '0.9em' }}>"{filler.example}"</div>}
              </div>
            ))}
          </div>
        )}
        
        {/* Regional Variations (Day 29) */}
        {dayData.regional_variations && (
          <div style={{ background: '#fff8e1', padding: '20px', borderRadius: '12px', marginBottom: '16px' }}>
            <h4>🌎 Regional Variations</h4>
            {Object.entries(dayData.regional_variations).map(([country, info]) => (
              <div key={country} style={{ padding: '12px', margin: '8px 0', background: 'white', borderRadius: '8px' }}>
                <h5 style={{ color: '#f57c00' }}>{country.toUpperCase()}</h5>
                <p><strong>Phrases:</strong> {info.phrases?.join(', ')}</p>
                <p><strong>Pronunciation:</strong> {info.pronunciation}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Multimedia Recommendations */}
        {dayData.multimedia?.items && (
          <div style={{ background: '#fafafa', padding: '20px', borderRadius: '12px', marginBottom: '16px' }}>
            <h4>📺 Multimedia Resources</h4>
            {dayData.multimedia.items.map((item, i) => (
              <div key={i} style={{ padding: '8px 0' }}>
                <strong>{item.name}</strong>: {item.description}
              </div>
            ))}
          </div>
        )}
        
        {/* Practical Scenarios */}
        {dayData.practical_scenarios && (
          <div style={{ background: '#e0f7fa', padding: '20px', borderRadius: '12px', marginBottom: '16px' }}>
            <h4>🎯 Practical Scenarios</h4>
            {Object.entries(dayData.practical_scenarios).map(([key, scenario]) => (
              <div key={key} style={{ marginBottom: '16px' }}>
                <h5 style={{ color: '#00838f' }}>{scenario.title || key}</h5>
                {scenario.phrases?.map((phrase, i) => (
                  <div 
                    key={i}
                    onClick={() => speak(phrase.spanish)}
                    style={{ padding: '10px', margin: '6px 0', background: 'white', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    <strong>{phrase.spanish}</strong>
                    <br/>{phrase.english}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return <div>Select a section</div>;
};

// Helper to check if enhanced data exists for a day
export const hasEnhancedData = (day) => {
  return !!enhancedData[day];
};

// Get enhanced day data
export const getEnhancedDayData = (day) => {
  return enhancedData[day];
};

// Get vocabulary count for a day
export const getVocabCount = (day) => {
  const dayData = enhancedData[day];
  if (!dayData?.vocabulary?.screens) return 0;
  return dayData.vocabulary.screens.reduce((sum, screen) => sum + (screen.words?.length || 0), 0);
};

export default { EnhancedDayContent, hasEnhancedData, getEnhancedDayData, getVocabCount };
