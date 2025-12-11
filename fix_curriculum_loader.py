#!/usr/bin/env python3
"""
Fix InteractiveCurriculum to load from enhanced JSON files
instead of hardcoded CURRICULUM object.
"""

import os
import re
from datetime import datetime

def main():
    filepath = 'src/InteractiveCurriculum.js'
    
    if not os.path.exists(filepath):
        print(f"❌ File not found: {filepath}")
        return
    
    # Backup
    backup_path = f"{filepath}.backup-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    with open(filepath, 'r') as f:
        original = f.read()
    with open(backup_path, 'w') as f:
        f.write(original)
    print(f"✅ Backup: {backup_path}")
    
    # Check if already using dynamic loading
    if "loadDayData" in original or "import day01" in original.lower():
        print("⚠️  Already appears to use dynamic loading")
    
    # Create the new component that loads from JSON
    new_component = '''import React, { useState, useEffect } from 'react';
import NoticingDisplay from './components/NoticingDisplay';
import ShadowingMode from './components/ShadowingMode';
import RandomDelight from './components/RandomDelight';
import SessionTeaser from './components/SessionTeaser';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

// Dynamic import for day data
const loadDayData = async (dayNum) => {
  try {
    const paddedDay = String(dayNum).padStart(2, '0');
    const module = await import(`./content/days/day${paddedDay}.json`);
    return module.default || module;
  } catch (error) {
    console.error(`Failed to load day ${dayNum}:`, error);
    return null;
  }
};

// TTS function
const speak = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'es-ES';
    utter.rate = 0.85;
    window.speechSynthesis.speak(utter);
  }
};

export default function InteractiveCurriculum({ day = 1, onBack, onComplete }) {
  const [dayData, setDayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('grammar');
  const [grammarIndex, setGrammarIndex] = useState(0);
  const [vocabIndex, setVocabIndex] = useState(0);
  const [showShadowing, setShowShadowing] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);

  // Load day data from JSON file
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await loadDayData(day);
      setDayData(data);
      setLoading(false);
    };
    load();
  }, [day]);

  if (loading) {
    return (
      <div style={{minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: 48, marginBottom: 16}}>🌀</div>
          <p>Loading Day {day}...</p>
        </div>
      </div>
    );
  }

  if (!dayData) {
    return (
      <div style={{minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <p>Could not load Day {day}</p>
          <button onClick={onBack} style={{marginTop: 16, padding: '10px 20px', background: theme.primary, color: '#fff', border: 'none', borderRadius: 8}}>Go Back</button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'grammar', label: '📖 Grammar' },
    { id: 'vocabulary', label: '📚 Vocab' },
    { id: 'listening', label: '🎧 Listen' },
    { id: 'reading', label: '📰 Read' }
  ];

  const currentGrammar = dayData.grammar?.[grammarIndex];
  const currentVocab = dayData.vocabulary?.[vocabIndex];

  return (
    <div style={{minHeight: '100vh', background: theme.bg, paddingBottom: 100}}>
      {/* Random Delight */}
      <RandomDelight triggerChance={0.08} />

      {/* Header */}
      <div style={{background: theme.primary, color: '#fff', padding: 16, display: 'flex', alignItems: 'center', gap: 16}}>
        <button onClick={onBack} style={{background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '8px 12px', borderRadius: 8, cursor: 'pointer'}}>← Back</button>
        <div style={{flex: 1}}>
          <div style={{fontWeight: 600, fontSize: 18}}>Day {day}: {dayData.title}</div>
          <div style={{fontSize: 13, opacity: 0.9}}>{dayData.subtitle} • {dayData.level}</div>
        </div>
        {/* PT Stage Badge */}
        {dayData.processabilityTheory && (
          <div style={{background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: 12, fontSize: 11}}>
            PT Stage {dayData.processabilityTheory.stage}
          </div>
        )}
      </div>

      {/* Tab Bar */}
      <div style={{display: 'flex', background: '#fff', borderBottom: '1px solid #e0e0e0', padding: 8}}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setGrammarIndex(0); setVocabIndex(0); setShowShadowing(false); }}
            style={{
              flex: 1, padding: '10px 8px', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500,
              background: activeTab === tab.id ? theme.primary : 'transparent',
              color: activeTab === tab.id ? '#fff' : theme.text
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{padding: 16}}>
        
        {/* GRAMMAR TAB */}
        {activeTab === 'grammar' && (
          <div>
            <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>📖 Grammar</h2>
            
            {dayData.grammar && dayData.grammar.length > 1 && (
              <div style={{display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap'}}>
                {dayData.grammar.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setGrammarIndex(i)}
                    style={{
                      padding: '6px 10px', borderRadius: 16, border: 'none', cursor: 'pointer', fontSize: 11,
                      background: i === grammarIndex ? theme.primary : '#e0e0e0',
                      color: i === grammarIndex ? '#fff' : theme.text
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
            
            {currentGrammar && (
              <div style={{background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
                <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 12, color: theme.primary}}>{currentGrammar.heading}</h3>
                <p style={{lineHeight: 1.6, marginBottom: 16}}>{currentGrammar.content}</p>
                
                {currentGrammar.examples && currentGrammar.examples.length > 0 && (
                  <div style={{background: '#f8f9fa', borderRadius: 8, padding: 12, marginBottom: 12}}>
                    <h4 style={{fontSize: 14, fontWeight: 600, marginBottom: 10}}>Examples:</h4>
                    {currentGrammar.examples.map((ex, i) => (
                      <button 
                        key={i} 
                        onClick={() => speak(ex.es)}
                        style={{
                          display: 'block', width: '100%', padding: '10px 12px', margin: '6px 0',
                          background: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', textAlign: 'left'
                        }}
                      >
                        <div style={{fontWeight: 600, color: '#d32f2f', marginBottom: 4}}>🔊 {ex.es}</div>
                        <div style={{fontSize: 13, color: theme.textLight}}>{ex.en}</div>
                      </button>
                    ))}
                  </div>
                )}
                
                {currentGrammar.tip && (
                  <div style={{background: '#e8f5e9', padding: 12, borderRadius: 8, color: '#2e7d32'}}>
                    💡 {currentGrammar.tip}
                  </div>
                )}
              </div>
            )}
            
            {/* NOTICING DISPLAY - Shows color-coded grammar patterns */}
            {dayData.noticingEnhancements && (
              <div style={{marginTop: 16}}>
                <NoticingDisplay dayData={dayData} />
              </div>
            )}
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16}}>
              <button 
                onClick={() => setGrammarIndex(Math.max(0, grammarIndex - 1))}
                disabled={grammarIndex === 0}
                style={{padding: '10px 16px', background: theme.primary, color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', opacity: grammarIndex === 0 ? 0.3 : 1}}
              >← Prev</button>
              <span>{grammarIndex + 1} / {dayData.grammar?.length || 1}</span>
              <button 
                onClick={() => setGrammarIndex(Math.min((dayData.grammar?.length || 1) - 1, grammarIndex + 1))}
                disabled={grammarIndex >= (dayData.grammar?.length || 1) - 1}
                style={{padding: '10px 16px', background: theme.primary, color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', opacity: grammarIndex >= (dayData.grammar?.length || 1) - 1 ? 0.3 : 1}}
              >Next →</button>
            </div>
          </div>
        )}

        {/* VOCABULARY TAB */}
        {activeTab === 'vocabulary' && (
          <div>
            <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>📚 Vocabulary</h2>
            
            {dayData.vocabulary && dayData.vocabulary.length > 0 && (
              <div style={{display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap'}}>
                {dayData.vocabulary.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setVocabIndex(i)}
                    style={{
                      padding: '8px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13,
                      background: i === vocabIndex ? theme.primary : '#f0f0f0',
                      color: i === vocabIndex ? '#fff' : theme.text
                    }}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>
            )}
            
            {currentVocab && (
              <div style={{background: '#fff', borderRadius: 12, padding: 16}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 12}}>
                  <h3 style={{fontSize: 16, fontWeight: 600}}>{currentVocab.category}</h3>
                  <span style={{color: theme.textLight, fontSize: 13}}>{currentVocab.words?.length || 0} words</span>
                </div>
                
                {currentVocab.words?.map((word, i) => (
                  <button 
                    key={i}
                    onClick={() => speak(word.es)}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
                      padding: '12px 14px', margin: '6px 0', background: '#f8f9fa', border: 'none', 
                      borderRadius: 8, cursor: 'pointer', textAlign: 'left'
                    }}
                  >
                    <span style={{fontWeight: 600, color: '#7b1fa2'}}>🔊 {word.es}</span>
                    <span style={{color: theme.textLight, textAlign: 'right', maxWidth: '50%'}}>= {word.en}</span>
                  </button>
                ))}
              </div>
            )}
            
            {(!dayData.vocabulary || dayData.vocabulary.length === 0) && (
              <div style={{background: '#fff', borderRadius: 12, padding: 20, textAlign: 'center'}}>
                <p style={{color: theme.textLight}}>Vocabulary coming soon for this day.</p>
              </div>
            )}
          </div>
        )}

        {/* LISTENING TAB */}
        {activeTab === 'listening' && (
          <div>
            <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>🎧 Listening Practice</h2>
            
            {/* SHADOWING MODE - Unlocks Day 7+ */}
            {day >= 7 && !showShadowing && (
              <button 
                onClick={() => setShowShadowing(true)}
                style={{
                  width: '100%', padding: 16, marginBottom: 16,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff', border: 'none', borderRadius: 12,
                  fontSize: 16, fontWeight: 600, cursor: 'pointer'
                }}
              >
                🎧 Try Shadowing Mode
              </button>
            )}
            
            {day < 7 && (
              <div style={{background: '#f5f5f5', padding: 16, borderRadius: 12, marginBottom: 16, textAlign: 'center'}}>
                <span style={{fontSize: 24}}>🔒</span>
                <p style={{margin: '8px 0 0', color: theme.textLight}}>Shadowing Mode unlocks on Day 7!</p>
              </div>
            )}
            
            {showShadowing && (
              <div style={{marginBottom: 16}}>
                <ShadowingMode 
                  dayData={dayData}
                  onComplete={() => setShowShadowing(false)}
                  onClose={() => setShowShadowing(false)}
                />
              </div>
            )}
            
            {!showShadowing && (
              <>
                <p style={{color: theme.textLight, marginBottom: 16}}>Tap each phrase to hear it, then repeat aloud:</p>
                
                <div style={{background: '#fff', borderRadius: 12, padding: 16}}>
                  {dayData.grammar?.slice(0, 3).flatMap((g, gi) => 
                    g.examples?.slice(0, 4).map((ex, i) => (
                      <button 
                        key={`g${gi}-${i}`}
                        onClick={() => speak(ex.es)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                          padding: '14px', margin: '6px 0', background: '#f0f7ff', border: 'none',
                          borderRadius: 8, cursor: 'pointer', textAlign: 'left'
                        }}
                      >
                        <span style={{fontSize: 20}}>🔊</span>
                        <span style={{fontSize: 15}}>{ex.es}</span>
                      </button>
                    ))
                  )}
                  
                  {dayData.vocabulary?.[0]?.words?.slice(0, 6).map((w, i) => (
                    <button 
                      key={`v${i}`}
                      onClick={() => speak(w.es)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                        padding: '14px', margin: '6px 0', background: '#f5f0ff', border: 'none',
                        borderRadius: 8, cursor: 'pointer', textAlign: 'left'
                      }}
                    >
                      <span style={{fontSize: 20}}>🔊</span>
                      <span style={{fontSize: 15}}>{w.es}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* READING TAB */}
        {activeTab === 'reading' && (
          <div>
            <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>📰 Reading & Culture</h2>
            
            {/* Reading Passage */}
            {dayData.reading && dayData.reading.passage && (
              <div style={{background: '#fff', borderRadius: 12, padding: 16, marginBottom: 16}}>
                <h3 style={{fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#1565c0'}}>📖 {dayData.reading.title}</h3>
                <div style={{background: '#f0f7ff', padding: 16, borderRadius: 8, marginBottom: 12}}>
                  <p style={{fontSize: 16, lineHeight: 1.8, fontStyle: 'italic'}}>{dayData.reading.passage}</p>
                </div>
                <button 
                  onClick={() => speak(dayData.reading.passage)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    width: '100%', padding: 12, background: theme.primary, color: '#fff',
                    border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14
                  }}
                >
                  🔊 Listen to Passage
                </button>
              </div>
            )}
            
            {/* Objectives */}
            {dayData.objectives && dayData.objectives.length > 0 && (
              <div style={{background: '#fff', borderRadius: 12, padding: 16, marginBottom: 16}}>
                <h3 style={{fontSize: 16, fontWeight: 600, marginBottom: 12, color: theme.primary}}>📎 Today's Objectives</h3>
                {dayData.objectives.map((obj, i) => (
                  <div key={i} style={{padding: '8px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 8}}>
                    <span style={{color: theme.primary}}>✓</span>
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Cultural Note */}
            {dayData.cultural && (
              <div style={{background: '#fff', borderRadius: 12, padding: 16, marginBottom: 16}}>
                <h3 style={{fontSize: 16, fontWeight: 600, marginBottom: 12, color: theme.primary}}>🌍 Cultural Note</h3>
                <p style={{lineHeight: 1.6}}>{dayData.cultural}</p>
              </div>
            )}
            
            {/* False Friends */}
            {dayData.falseFriends && dayData.falseFriends.length > 0 && (
              <div style={{background: '#fff', borderRadius: 12, padding: 16, marginBottom: 16}}>
                <h3 style={{fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#c62828'}}>⚠️ False Friends (¡Cuidado!)</h3>
                {dayData.falseFriends.map((ff, i) => (
                  <div key={i} style={{padding: 12, margin: '8px 0', background: '#fff5f5', borderRadius: 8}}>
                    <div style={{fontWeight: 600, fontSize: 16}}>{ff.es}</div>
                    <div style={{color: '#2e7d32', marginTop: 4}}>✓ Means: {ff.means}</div>
                    <div style={{color: '#c62828', marginTop: 2}}>✗ NOT: {ff.not} (= {ff.correct})</div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Multimedia */}
            {dayData.multimedia && dayData.multimedia.length > 0 && (
              <div style={{background: '#fff', borderRadius: 12, padding: 16}}>
                <h3 style={{fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#1565c0'}}>📺 Recommended Resources</h3>
                {dayData.multimedia.map((mm, i) => (
                  <div key={i} style={{padding: 12, margin: '8px 0', background: '#e3f2fd', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12}}>
                    <span style={{fontSize: 24}}>📺</span>
                    <div>
                      <div style={{fontWeight: 600}}>{mm.name}</div>
                      <div style={{fontSize: 13, color: theme.textLight}}>{mm.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Session Teaser */}
      {showTeaser && (
        <SessionTeaser 
          currentDay={day}
          onDismiss={() => { setShowTeaser(false); onComplete(); }}
          onRemind={() => { setShowTeaser(false); alert('We\\'ll remind you tomorrow! 🔔'); onComplete(); }}
        />
      )}

      {/* Complete Button */}
      <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, padding: 16, background: '#fff', borderTop: '1px solid #e0e0e0'}}>
        <button 
          onClick={() => setShowTeaser(true)}
          style={{width: '100%', padding: 16, background: theme.primary, color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer'}}
        >
          Complete Day {day} ✓
        </button>
      </div>
    </div>
  );
}
'''
    
    # Write the new component
    with open(filepath, 'w') as f:
        f.write(new_component)
    
    print("✅ InteractiveCurriculum.js replaced with enhanced version")
    print("")
    print("📋 What changed:")
    print("   • Now loads from JSON files (src/content/days/)")
    print("   • Shows PT Stage badge in header")
    print("   • NoticingDisplay in Grammar tab")
    print("   • ShadowingMode button in Listening tab (Day 7+)")
    print("   • RandomDelight (occasional surprises)")
    print("   • SessionTeaser when completing")
    print("")
    print("🚀 Test: npm start")
    print("🚀 Deploy: git add -A && git commit -m 'Load curriculum from JSON, add engagement' && git push && vercel --prod")

if __name__ == "__main__":
    main()
