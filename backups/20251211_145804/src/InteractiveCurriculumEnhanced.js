import React, { useState, useEffect } from 'react';
import NoticingDisplay from './components/NoticingDisplay';
import ShadowingMode from './components/ShadowingMode';
import SessionTeaser from './components/SessionTeaser';
import RandomDelight from './components/RandomDelight';

// Import day data dynamically
const importDayData = async (dayNumber) => {
  try {
    const data = await import(`./content/days/day${String(dayNumber).padStart(2, '0')}.json`);
    return data.default || data;
  } catch (error) {
    console.error(`Failed to load day ${dayNumber}:`, error);
    return null;
  }
};

const InteractiveCurriculumEnhanced = ({ 
  currentDay = 1, 
  onBack,
  initialModule = 'grammar'
}) => {
  const [dayData, setDayData] = useState(null);
  const [activeModule, setActiveModule] = useState(initialModule);
  const [loading, setLoading] = useState(true);
  const [showShadowing, setShowShadowing] = useState(false);
  const [showSessionTeaser, setShowSessionTeaser] = useState(false);
  const [sessionProgress, setSessionProgress] = useState(0);

  // Load day data
  useEffect(() => {
    const loadDay = async () => {
      setLoading(true);
      const data = await importDayData(currentDay);
      setDayData(data);
      setLoading(false);
    };
    loadDay();
  }, [currentDay]);

  // Track session progress
  useEffect(() => {
    if (sessionProgress >= 100) {
      setShowSessionTeaser(true);
    }
  }, [sessionProgress]);

  const modules = [
    { id: 'grammar', label: '📖 Grammar', icon: '📖' },
    { id: 'vocabulary', label: '📝 Vocabulary', icon: '📝' },
    { id: 'listen', label: '🎧 Listen', icon: '🎧' },
    { id: 'read', label: '📚 Read', icon: '📚' }
  ];

  const handleModuleComplete = () => {
    setSessionProgress(prev => Math.min(prev + 25, 100));
  };

  if (loading) {
    return (
      <div className="curriculum-loading">
        <div className="loading-spinner">🌀</div>
        <p>Loading Day {currentDay}...</p>
      </div>
    );
  }

  if (!dayData) {
    return (
      <div className="curriculum-error">
        <p>Could not load day {currentDay}</p>
        <button onClick={onBack}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="interactive-curriculum-enhanced">
      {/* Random Delight - shows occasionally */}
      <RandomDelight triggerChance={0.1} />

      {/* Header */}
      <div className="curriculum-header">
        <button onClick={onBack} className="back-btn">← Back</button>
        <div className="day-info">
          <h2>Day {currentDay}</h2>
          <span className="day-theme">{dayData.theme || dayData.title}</span>
        </div>
        <div className="progress-ring">
          <span>{sessionProgress}%</span>
        </div>
      </div>

      {/* PT Stage Badge */}
      {dayData.processabilityTheory && (
        <div className="pt-badge">
          <span className="pt-stage">Stage {dayData.processabilityTheory.stage}</span>
          <span className="pt-name">{dayData.processabilityTheory.stageName}</span>
        </div>
      )}

      {/* Module Tabs */}
      <div className="module-tabs">
        {modules.map(module => (
          <button
            key={module.id}
            className={`module-tab ${activeModule === module.id ? 'active' : ''}`}
            onClick={() => setActiveModule(module.id)}
          >
            <span className="tab-icon">{module.icon}</span>
            <span className="tab-label">{module.label.split(' ')[1]}</span>
          </button>
        ))}
      </div>

      {/* Module Content */}
      <div className="module-content">
        {activeModule === 'grammar' && (
          <div className="grammar-module">
            <h3>📖 Grammar</h3>
            
            {/* Noticing Display - Uses the JSON enhancement data */}
            {dayData.noticingEnhancements && (
              <NoticingDisplay dayData={dayData} />
            )}

            {/* Original grammar content */}
            {dayData.grammar && (
              <div className="grammar-content">
                {dayData.grammar.explanation && (
                  <div className="grammar-explanation">
                    <h4>{dayData.grammar.title || 'Today\'s Grammar'}</h4>
                    <p>{dayData.grammar.explanation}</p>
                  </div>
                )}
                
                {dayData.grammar.examples && (
                  <div className="grammar-examples">
                    <h4>Examples</h4>
                    {dayData.grammar.examples.map((ex, i) => (
                      <div key={i} className="example-item">
                        <span className="spanish">{ex.spanish}</span>
                        <span className="english">{ex.english}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button 
              className="complete-module-btn"
              onClick={handleModuleComplete}
            >
              ✓ Got it!
            </button>
          </div>
        )}

        {activeModule === 'vocabulary' && (
          <div className="vocabulary-module">
            <h3>📝 Vocabulary</h3>
            
            {dayData.vocabulary && (
              <div className="vocab-grid">
                {(dayData.vocabulary.words || dayData.vocabulary).map((word, i) => (
                  <div key={i} className="vocab-card">
                    <span className="vocab-spanish">{word.spanish || word.word}</span>
                    <span className="vocab-english">{word.english || word.translation}</span>
                    {word.example && (
                      <span className="vocab-example">"{word.example}"</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button 
              className="complete-module-btn"
              onClick={handleModuleComplete}
            >
              ✓ Words Learned!
            </button>
          </div>
        )}

        {activeModule === 'listen' && (
          <div className="listen-module">
            <h3>🎧 Listen</h3>
            
            {/* Shadowing Mode Toggle */}
            {currentDay >= 7 && (
              <button 
                className="shadowing-toggle-btn"
                onClick={() => setShowShadowing(true)}
              >
                🎧 Try Shadowing Mode
              </button>
            )}

            {/* Shadowing Mode Modal */}
            {showShadowing && (
              <div className="shadowing-modal">
                <ShadowingMode 
                  dayData={dayData} 
                  onComplete={() => {
                    setShowShadowing(false);
                    handleModuleComplete();
                  }}
                  onClose={() => setShowShadowing(false)}
                />
              </div>
            )}

            {/* Original listen content */}
            {dayData.listen && !showShadowing && (
              <div className="listen-content">
                {dayData.listen.phrases && dayData.listen.phrases.map((phrase, i) => (
                  <div key={i} className="listen-phrase">
                    <span className="phrase-spanish">{phrase.spanish}</span>
                    <span className="phrase-english">{phrase.english}</span>
                    <button 
                      className="play-audio-btn"
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(phrase.spanish);
                        utterance.lang = 'es-ES';
                        speechSynthesis.speak(utterance);
                      }}
                    >
                      🔊 Play
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!showShadowing && (
              <button 
                className="complete-module-btn"
                onClick={handleModuleComplete}
              >
                ✓ Listened!
              </button>
            )}
          </div>
        )}

        {activeModule === 'read' && (
          <div className="read-module">
            <h3>📚 Read</h3>
            
            {dayData.reading && (
              <div className="reading-content">
                <div className="reading-passage">
                  <p className="passage-spanish">
                    {dayData.reading.passage || dayData.reading.spanish}
                  </p>
                  <p className="passage-english">
                    {dayData.reading.translation || dayData.reading.english}
                  </p>
                </div>

                {dayData.reading.questions && (
                  <div className="comprehension-questions">
                    <h4>Comprehension Check</h4>
                    {dayData.reading.questions.map((q, i) => (
                      <div key={i} className="question-item">
                        <p>{q.question}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button 
              className="complete-module-btn"
              onClick={handleModuleComplete}
            >
              ✓ Read!
            </button>
          </div>
        )}
      </div>

      {/* Session Teaser - shows when session complete */}
      {showSessionTeaser && (
        <SessionTeaser 
          currentDay={currentDay}
          onDismiss={() => {
            setShowSessionTeaser(false);
            onBack?.();
          }}
          onRemind={() => {
            setShowSessionTeaser(false);
            // Could integrate with notifications
            alert('We\'ll remind you tomorrow! 🔔');
          }}
        />
      )}
    </div>
  );
};

export default InteractiveCurriculumEnhanced;
