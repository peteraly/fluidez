#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# FLUIDEZ ENGAGEMENT INTEGRATION SCRIPT
# ═══════════════════════════════════════════════════════════════════════════════
# Integrates the engagement components into InteractiveCurriculum.js and App.js
# Run from your fluidez directory: bash integrate_engagement.sh
# ═══════════════════════════════════════════════════════════════════════════════

echo "═══════════════════════════════════════════════════════════════════════════"
echo "     FLUIDEZ ENGAGEMENT INTEGRATION"
echo "═══════════════════════════════════════════════════════════════════════════"

# Step 0: Fix the missing directory from before
echo ""
echo "[0/4] Fixing engagement index..."
mkdir -p src/components/engagement
cat > src/components/engagement/index.js << 'EOF'
export { default as MariaGreeting } from '../MariaGreeting';
export { default as NoticingDisplay } from '../NoticingDisplay';
export { default as ShadowingMode } from '../ShadowingMode';
export { default as SessionTeaser } from '../SessionTeaser';
export { default as RandomDelight } from '../RandomDelight';
EOF
echo "  ✅ Fixed"

# Step 1: Backup files
echo ""
echo "[1/4] Creating backups..."
cp src/InteractiveCurriculum.js src/InteractiveCurriculum.js.backup-engagement
cp src/App.js src/App.js.backup-engagement
echo "  ✅ Backups created"

# Step 2: Create an enhanced InteractiveCurriculum with engagement features
echo ""
echo "[2/4] Creating enhanced InteractiveCurriculum..."

cat > src/InteractiveCurriculumEnhanced.js << 'ENHANCED_CURRICULUM'
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
ENHANCED_CURRICULUM

echo "  ✅ InteractiveCurriculumEnhanced.js created"

# Step 3: Add CSS for enhanced curriculum
echo ""
echo "[3/4] Adding enhanced curriculum styles..."

cat >> src/App.css << 'ENHANCED_CSS'

/* ═══════════════════════════════════════════════════════════════════════════════
   ENHANCED CURRICULUM STYLES
   ═══════════════════════════════════════════════════════════════════════════════ */

.interactive-curriculum-enhanced {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  padding-bottom: 100px;
}

.curriculum-loading,
.curriculum-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
}

.loading-spinner {
  font-size: 48px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.curriculum-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.back-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: #667eea;
  cursor: pointer;
  padding: 8px;
}

.day-info {
  text-align: center;
}

.day-info h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.day-theme {
  font-size: 14px;
  color: #666;
}

.progress-ring {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.pt-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f0f4ff;
  padding: 8px 16px;
  border-radius: 20px;
  margin-bottom: 16px;
  font-size: 13px;
}

.pt-stage {
  background: #667eea;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 600;
}

.pt-name {
  color: #667eea;
}

.module-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.module-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  background: #f5f5f5;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 70px;
}

.module-tab.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.tab-icon {
  font-size: 20px;
}

.tab-label {
  font-size: 12px;
  font-weight: 500;
}

.module-content {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.module-content h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #333;
}

.grammar-content,
.reading-content {
  margin-bottom: 20px;
}

.grammar-explanation {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
}

.grammar-explanation h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.grammar-explanation p {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

.grammar-examples {
  margin-top: 16px;
}

.grammar-examples h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #666;
}

.example-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 8px;
}

.example-item .spanish {
  font-weight: 600;
  color: #333;
}

.example-item .english {
  font-size: 14px;
  color: #666;
}

.vocab-grid {
  display: grid;
  gap: 12px;
}

.vocab-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
}

.vocab-spanish {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.vocab-english {
  color: #666;
}

.vocab-example {
  font-size: 13px;
  color: #888;
  font-style: italic;
  margin-top: 4px;
}

.listen-phrase {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 12px;
}

.phrase-spanish {
  font-size: 17px;
  font-weight: 600;
  color: #333;
}

.phrase-english {
  color: #666;
  font-size: 14px;
}

.play-audio-btn {
  align-self: flex-start;
  background: #667eea;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 8px;
}

.shadowing-toggle-btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
}

.shadowing-modal {
  margin-top: 20px;
}

.reading-passage {
  margin-bottom: 20px;
}

.passage-spanish {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
}

.passage-english {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  padding: 16px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
}

.comprehension-questions {
  margin-top: 20px;
}

.comprehension-questions h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #666;
}

.question-item {
  padding: 12px;
  background: #f0f4ff;
  border-radius: 8px;
  margin-bottom: 8px;
}

.question-item p {
  margin: 0;
  color: #333;
}

.complete-module-btn {
  width: 100%;
  background: #4CAF50;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: transform 0.2s;
}

.complete-module-btn:hover {
  transform: scale(1.02);
}
ENHANCED_CSS

echo "  ✅ Enhanced styles added"

# Step 4: Create a simple integration patch for App.js
echo ""
echo "[4/4] Creating App.js integration..."

# Check if InteractiveCurriculumEnhanced is already imported
if grep -q "InteractiveCurriculumEnhanced" src/App.js; then
  echo "  ⚠️  Already integrated"
else
  # Add import at the top (after the last import)
  # This is a simple approach - adds the import
  
  cat > src/patches/add_enhanced_curriculum.js << 'PATCH_INFO'
/*
  TO INTEGRATE THE ENHANCED CURRICULUM:
  
  1. In App.js, add this import near the top:
     import InteractiveCurriculumEnhanced from './InteractiveCurriculumEnhanced';
  
  2. Replace your existing curriculum usage with:
     <InteractiveCurriculumEnhanced 
       currentDay={currentDay}
       onBack={() => setShowCurriculum(false)}
     />
  
  Or, to use it alongside the existing curriculum, add a toggle:
     {useEnhancedCurriculum ? (
       <InteractiveCurriculumEnhanced ... />
     ) : (
       <InteractiveCurriculum ... />
     )}
*/
PATCH_INFO
  
  mkdir -p src/patches
  echo "  ✅ Integration notes created at src/patches/add_enhanced_curriculum.js"
fi

# Summary
echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
echo "     ✅ INTEGRATION COMPLETE!"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""
echo "📁 Files created/modified:"
echo "   • src/InteractiveCurriculumEnhanced.js (new enhanced component)"
echo "   • src/components/engagement/index.js (fixed)"
echo "   • src/App.css (enhanced styles added)"
echo ""
echo "📋 TO USE THE ENHANCED CURRICULUM:"
echo ""
echo "   Option A: Replace existing (recommended for testing)"
echo "   ─────────────────────────────────────────────────────"
echo "   In App.js, change:"
echo "     import InteractiveCurriculum from './InteractiveCurriculum';"
echo "   To:"
echo "     import InteractiveCurriculum from './InteractiveCurriculumEnhanced';"
echo ""
echo "   Option B: Add as new route/mode"
echo "   ─────────────────────────────────────────────────────"
echo "   Import both and toggle between them."
echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""
echo "🚀 QUICK TEST:"
echo "   npm start"
echo ""
echo "🚀 DEPLOY:"
echo "   git add -A && git commit -m 'Add enhanced curriculum with engagement features' && git push && vercel --prod"
echo ""
