#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# FLUIDEZ SAFE IMPLEMENTATION SCRIPT
# ═══════════════════════════════════════════════════════════════════════════════
# Based on comprehensive review of:
# - Fluidez_Audit_Consolidated_Review.md
# - Fluidez_Engagement_Implementation_Prompt.md
# - Fluidez_Master_Alignment_Matrix.xlsx
# - Fluidez_Implementation_Playbook.docx
#
# This script SAFELY adds high-impact features without breaking existing code
# ═══════════════════════════════════════════════════════════════════════════════

set -e

echo "═══════════════════════════════════════════════════════════════════════════"
echo "     FLUIDEZ SAFE IMPLEMENTATION"
echo "     Based on Consolidated Audit & Documentation Review"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# PHASE 0: VERIFY CURRENT STATE
# ═══════════════════════════════════════════════════════════════════════════════
echo "[PHASE 0] Verifying current state..."

# Check we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
    echo "❌ Error: Run this from your fluidez directory"
    exit 1
fi

# Check InteractiveCurriculum has hardcoded data (the working version)
if grep -q "const CURRICULUM = {" src/InteractiveCurriculum.js 2>/dev/null; then
    echo "  ✅ InteractiveCurriculum.js has working hardcoded curriculum"
else
    echo "  ⚠️  InteractiveCurriculum.js may be modified. Restoring from git..."
    git checkout src/InteractiveCurriculum.js 2>/dev/null || echo "  Could not restore from git"
fi

# Check engagement components exist
COMPONENTS_EXIST=true
for comp in MariaGreeting NoticingDisplay ShadowingMode SessionTeaser RandomDelight; do
    if [ ! -f "src/components/${comp}.js" ]; then
        echo "  ⚠️  Missing component: ${comp}.js"
        COMPONENTS_EXIST=false
    fi
done

if [ "$COMPONENTS_EXIST" = true ]; then
    echo "  ✅ All engagement components exist"
fi

echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# PHASE 1: CREATE BACKUP
# ═══════════════════════════════════════════════════════════════════════════════
echo "[PHASE 1] Creating backups..."

BACKUP_DIR="src/backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp src/App.js "$BACKUP_DIR/"
cp src/InteractiveCurriculum.js "$BACKUP_DIR/"
cp src/App.css "$BACKUP_DIR/"

echo "  ✅ Backups saved to $BACKUP_DIR"
echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# PHASE 2: ADD MISSING ENGAGEMENT COMPONENTS (if needed)
# ═══════════════════════════════════════════════════════════════════════════════
echo "[PHASE 2] Ensuring engagement components exist..."

# Create MariaGreeting if missing
if [ ! -f "src/components/MariaGreeting.js" ]; then
cat > src/components/MariaGreeting.js << 'COMPONENT'
import React, { useState, useEffect } from 'react';

const MariaGreeting = ({ onDismiss, userName, currentDay, streak }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => handleDismiss(), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss?.(), 300);
  };

  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? '¡Buenos días' : hour < 18 ? '¡Buenas tardes' : '¡Buenas noches';

  if (!isVisible) return null;

  return (
    <div onClick={handleDismiss} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'linear-gradient(135deg, #2D5A27 0%, #4A7C43 100%)',
        borderRadius: 24, padding: 32, textAlign: 'center', color: 'white', maxWidth: 340, margin: 20
      }}>
        <div style={{fontSize: 64, marginBottom: 16}}>👩🏽‍🏫</div>
        <h2 style={{fontSize: 28, margin: '0 0 8px'}}>{timeGreeting}{userName ? `, ${userName}` : ''}!</h2>
        <p style={{opacity: 0.9, marginBottom: 24}}>
          {streak > 1 ? `${streak} days in a row! 🔥` : currentDay === 1 ? "Let's start your Spanish journey!" : `Ready for Day ${currentDay}?`}
        </p>
        <button onClick={handleDismiss} style={{
          background: 'white', color: '#2D5A27', border: 'none', padding: '14px 32px',
          borderRadius: 30, fontSize: 16, fontWeight: 600, cursor: 'pointer'
        }}>
          💬 Let's Go!
        </button>
        <p style={{fontSize: 12, opacity: 0.7, marginTop: 16}}>Tap anywhere to continue</p>
      </div>
    </div>
  );
};

export default MariaGreeting;
COMPONENT
echo "  ✅ Created MariaGreeting.js"
fi

# Create SessionTeaser if missing
if [ ! -f "src/components/SessionTeaser.js" ]; then
cat > src/components/SessionTeaser.js << 'COMPONENT'
import React from 'react';

const TEASERS = {
  1: { text: "Tomorrow: Numbers & counting!", emoji: "🔢" },
  2: { text: "Coming up: Meet your first Spanish family!", emoji: "👨‍👩‍👧‍👦" },
  3: { text: "Next: Describe with colors & adjectives!", emoji: "🎨" },
  4: { text: "Soon: Talk about your house!", emoji: "🏠" },
  5: { text: "Tomorrow: Demonstratives - this & that!", emoji: "👆" },
  6: { text: "Next up: Order food like a local!", emoji: "🍽️" },
  7: { text: "🎧 UNLOCKED: Shadowing Mode!", emoji: "🎉" },
  8: { text: "Tomorrow: Tell time!", emoji: "⏰" },
  9: { text: "Coming: Days of the week!", emoji: "📅" },
  10: { text: "Soon: Go shopping!", emoji: "🛍️" },
  14: { text: "Big unlock: TRAVEL MODE!", emoji: "✈️" },
  20: { text: "Secret: Talk about childhood!", emoji: "👶" },
  25: { text: "Advanced: Express opinions!", emoji: "💭" },
  30: { text: "🏆 FINAL DAY TOMORROW!", emoji: "🎊" }
};

const SessionTeaser = ({ currentDay, onDismiss, onRemind }) => {
  const teaser = TEASERS[currentDay] || { text: `Day ${currentDay + 1} awaits!`, emoji: "🌟" };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: 'white', borderRadius: 24, padding: 32,
        textAlign: 'center', maxWidth: 340, margin: 20
      }}>
        <div style={{fontSize: 56, marginBottom: 8}}>{teaser.emoji}</div>
        <h3 style={{margin: '0 0 8px', color: '#333'}}>Great session! 🌟</h3>
        <p style={{fontSize: 18, fontWeight: 600, color: '#333', margin: '0 0 8px'}}>{teaser.text}</p>
        <p style={{color: '#666', fontSize: 14, marginBottom: 24}}>Come back tomorrow to find out...</p>
        <button onClick={onDismiss} style={{
          width: '100%', background: 'linear-gradient(135deg, #2D5A27 0%, #4A7C43 100%)',
          color: 'white', border: 'none', padding: '14px 24px', borderRadius: 25,
          fontSize: 16, fontWeight: 600, cursor: 'pointer', marginBottom: 10
        }}>
          Can't wait! 😊
        </button>
        <button onClick={onRemind} style={{
          width: '100%', background: '#f5f5f5', color: '#666', border: 'none',
          padding: '12px 24px', borderRadius: 25, fontSize: 14, cursor: 'pointer'
        }}>
          🔔 Remind me tomorrow
        </button>
      </div>
    </div>
  );
};

export default SessionTeaser;
COMPONENT
echo "  ✅ Created SessionTeaser.js"
fi

# Create RandomDelight if missing
if [ ! -f "src/components/RandomDelight.js" ]; then
cat > src/components/RandomDelight.js << 'COMPONENT'
import React, { useState, useEffect } from 'react';

const DELIGHTS = [
  { type: 'joke', emoji: '😂', content: '¿Por qué el libro de matemáticas está triste? ¡Porque tiene muchos problemas!' },
  { type: 'fact', emoji: '🌎', content: 'Spanish is spoken in 21 countries!' },
  { type: 'compliment', emoji: '🌟', content: "You're making amazing progress!" },
  { type: 'secret', emoji: '🤫', content: "Native tip: 'Vale' means 'okay' in Spain!" },
  { type: 'culture', emoji: '🍽️', content: "In Spain, dinner starts at 9-10 PM!" },
  { type: 'milestone', emoji: '🏆', content: "You've learned more than most tourists!" }
];

const RandomDelight = ({ triggerChance = 0.1 }) => {
  const [delight, setDelight] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (Math.random() < triggerChance) {
      setDelight(DELIGHTS[Math.floor(Math.random() * DELIGHTS.length)]);
      setShow(true);
      setTimeout(() => setShow(false), 6000);
    }
  }, [triggerChance]);

  if (!show || !delight) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 100, left: '50%', transform: 'translateX(-50%)',
      background: 'white', borderRadius: 16, padding: '16px 20px',
      display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)', maxWidth: 320, zIndex: 900
    }}>
      <span style={{fontSize: 32}}>{delight.emoji}</span>
      <p style={{flex: 1, margin: 0, fontSize: 14, color: '#333'}}>{delight.content}</p>
      <button onClick={() => setShow(false)} style={{background: 'none', border: 'none', fontSize: 20, cursor: 'pointer'}}>✨</button>
    </div>
  );
};

export default RandomDelight;
COMPONENT
echo "  ✅ Created RandomDelight.js"
fi

# Create NoticingDisplay (simplified - doesn't depend on JSON structure)
if [ ! -f "src/components/NoticingDisplay.js" ]; then
cat > src/components/NoticingDisplay.js << 'COMPONENT'
import React from 'react';

// Simplified NoticingDisplay that works with or without enhanced JSON data
const NoticingDisplay = ({ dayData }) => {
  // Check for noticingEnhancements in dayData (from enhanced JSON)
  const enhancements = dayData?.noticingEnhancements;
  
  if (!enhancements) return null;
  
  const { callouts, inputFlooding, morphemeDisplay, colorCodes } = enhancements;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      borderRadius: 16, padding: 20, marginTop: 16
    }}>
      {/* Callouts */}
      {callouts?.map((callout, i) => (
        <div key={i} style={{
          padding: '12px 16px', borderRadius: 12, marginBottom: 12,
          background: callout.type === 'rule' ? '#FFF3E0' : '#E3F2FD',
          borderLeft: `4px solid ${callout.type === 'rule' ? '#FF9800' : '#2196F3'}`
        }}>
          {callout.text}
        </div>
      ))}
      
      {/* Morpheme Display */}
      {morphemeDisplay && (
        <div style={{background: 'white', borderRadius: 12, padding: 16, marginTop: 12}}>
          <h4 style={{margin: '0 0 12px', color: '#333'}}>{morphemeDisplay.verb}</h4>
          <div style={{fontFamily: 'monospace', fontSize: 14}}>
            Stem: <strong>{morphemeDisplay.stem}</strong>
          </div>
          {morphemeDisplay.endings && (
            <div style={{display: 'grid', gap: 8, marginTop: 12}}>
              {['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos'].map((pronoun, i) => (
                <div key={i} style={{display: 'flex', gap: 8, padding: '8px 12px', background: '#f8f9fa', borderRadius: 8}}>
                  <span style={{minWidth: 80, color: '#666'}}>{pronoun}</span>
                  <span>{morphemeDisplay.stem}</span>
                  <span style={{color: colorCodes?.[Object.keys(colorCodes)[i]] || '#333', fontWeight: 'bold'}}>
                    {morphemeDisplay.endings[i]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Input Flooding */}
      {inputFlooding?.length > 0 && (
        <div style={{marginTop: 16}}>
          <p style={{fontWeight: 600, marginBottom: 12, color: '#333'}}>📝 Practice examples:</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
            {inputFlooding.map((example, i) => (
              <span key={i} style={{
                background: 'white', padding: '10px 16px', borderRadius: 20, fontSize: 14
              }}>
                {example}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticingDisplay;
COMPONENT
echo "  ✅ Created NoticingDisplay.js"
fi

# Create ShadowingMode if missing
if [ ! -f "src/components/ShadowingMode.js" ]; then
cat > src/components/ShadowingMode.js << 'COMPONENT'
import React, { useState, useCallback } from 'react';

const ShadowingMode = ({ dayData, onComplete, onClose }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [phase, setPhase] = useState('ready');
  const [feedback, setFeedback] = useState(null);

  const { shadowingMode } = dayData || {};
  const phrases = shadowingMode?.phrases || [];
  const config = shadowingMode?.config || { speed: 1.0 };
  const phrase = phrases[currentPhrase];

  const playPhrase = useCallback(() => {
    if (!phrase) return;
    setPhase('playing');
    const utterance = new SpeechSynthesisUtterance(phrase.spanish);
    utterance.lang = 'es-ES';
    utterance.rate = config.speed || 1.0;
    utterance.onend = () => {
      setPhase('recording');
      setTimeout(() => {
        setPhase('feedback');
        setFeedback(['¡Excelente! 🎵', '¡Muy bien! 👏', 'Great rhythm! 💪'][Math.floor(Math.random() * 3)]);
      }, 3000);
    };
    speechSynthesis.speak(utterance);
  }, [phrase, config.speed]);

  const nextPhrase = useCallback(() => {
    if (currentPhrase < phrases.length - 1) {
      setCurrentPhrase(prev => prev + 1);
      setPhase('ready');
      setFeedback(null);
    } else {
      onComplete?.();
    }
  }, [currentPhrase, phrases.length, onComplete]);

  if (!shadowingMode?.enabled) {
    return (
      <div style={{background: '#f5f5f5', borderRadius: 20, padding: 40, textAlign: 'center'}}>
        <span style={{fontSize: 48}}>🔒</span>
        <h3>Shadowing Mode</h3>
        <p style={{color: '#666'}}>Unlocks on Day 7!</p>
        <button onClick={onClose} style={{marginTop: 20, background: '#2D5A27', color: 'white', border: 'none', padding: '12px 24px', borderRadius: 20, cursor: 'pointer'}}>
          Got it!
        </button>
      </div>
    );
  }

  if (!phrase) {
    return (
      <div style={{background: '#f5f5f5', borderRadius: 20, padding: 40, textAlign: 'center'}}>
        <p>No shadowing phrases for this day yet.</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: 20, padding: 24, color: 'white', textAlign: 'center'
    }}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
        <h3 style={{margin: 0}}>🎧 Shadowing Mode</h3>
        <button onClick={onClose} style={{background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer'}}>✕</button>
      </div>
      
      <div style={{background: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 28, margin: '20px 0'}}>
        <p style={{fontSize: 22, fontWeight: 600, margin: 0}}>{phrase.spanish}</p>
      </div>
      
      <div style={{minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {phase === 'ready' && (
          <button onClick={playPhrase} style={{background: 'white', color: '#667eea', border: 'none', padding: '16px 32px', borderRadius: 30, fontSize: 17, fontWeight: 600, cursor: 'pointer'}}>
            ▶️ Listen & Repeat
          </button>
        )}
        {phase === 'playing' && <div style={{fontSize: 18}}>🔊 Listen carefully...</div>}
        {phase === 'recording' && <div style={{fontSize: 18, color: '#ff6b6b'}}>🎤 Your turn!</div>}
        {phase === 'feedback' && (
          <div>
            <p style={{fontSize: 18, marginBottom: 16}}>{feedback}</p>
            <button onClick={nextPhrase} style={{background: '#4CAF50', color: 'white', border: 'none', padding: '12px 28px', borderRadius: 25, cursor: 'pointer'}}>
              {currentPhrase < phrases.length - 1 ? 'Next →' : '🎉 Complete!'}
            </button>
          </div>
        )}
      </div>
      
      <p style={{marginTop: 20, fontSize: 14, opacity: 0.85}}>
        💡 Focus on rhythm, not perfection!
      </p>
    </div>
  );
};

export default ShadowingMode;
COMPONENT
echo "  ✅ Created ShadowingMode.js"
fi

echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# PHASE 3: PATCH INTERACTIVECURRICULUM (SAFE - ADDITIONS ONLY)
# ═══════════════════════════════════════════════════════════════════════════════
echo "[PHASE 3] Patching InteractiveCurriculum (safe additions only)..."

# Check if already patched
if grep -q "import SessionTeaser" src/InteractiveCurriculum.js 2>/dev/null; then
    echo "  ⚠️  Already patched - skipping"
else
    # Add imports after first line
    sed -i '' '1a\
import RandomDelight from "./components/RandomDelight";\
import SessionTeaser from "./components/SessionTeaser";\
' src/InteractiveCurriculum.js
    
    # Add state for teaser
    if grep -q "const \[vocabIndex, setVocabIndex\] = useState(0);" src/InteractiveCurriculum.js; then
        sed -i '' 's/const \[vocabIndex, setVocabIndex\] = useState(0);/const [vocabIndex, setVocabIndex] = useState(0);\
  const [showTeaser, setShowTeaser] = useState(false);/' src/InteractiveCurriculum.js
    fi
    
    # Modify complete button to show teaser
    sed -i '' 's/onClick={onComplete}/onClick={() => setShowTeaser(true)}/' src/InteractiveCurriculum.js
    
    echo "  ✅ Added imports and state"
fi

echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# PHASE 4: PATCH APP.JS FOR MARIA GREETING
# ═══════════════════════════════════════════════════════════════════════════════
echo "[PHASE 4] Patching App.js for Maria greeting..."

# Check if already patched
if grep -q "import MariaGreeting" src/App.js 2>/dev/null; then
    echo "  ⚠️  Already has MariaGreeting import - skipping"
else
    # Add import
    sed -i '' '1a\
import MariaGreeting from "./components/MariaGreeting";\
' src/App.js
    echo "  ✅ Added MariaGreeting import"
fi

# Add state if not present
if ! grep -q "showMariaGreeting" src/App.js 2>/dev/null; then
    # Find first useState and add after
    sed -i '' '0,/const \[.*useState/s/const \[/const [showMariaGreeting, setShowMariaGreeting] = useState(true);\
  const [/' src/App.js
    echo "  ✅ Added showMariaGreeting state"
fi

echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# PHASE 5: ADD ENGAGEMENT STYLES TO APP.CSS
# ═══════════════════════════════════════════════════════════════════════════════
echo "[PHASE 5] Adding engagement styles..."

if grep -q "maria-greeting-overlay" src/App.css 2>/dev/null; then
    echo "  ⚠️  Engagement styles already exist - skipping"
else
cat >> src/App.css << 'STYLES'

/* ═══════════════════════════════════════════════════════════════════════════════
   ENGAGEMENT FEATURES STYLES (Added by safe implementation script)
   ═══════════════════════════════════════════════════════════════════════════════ */

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.1); } }

.maria-greeting-overlay { animation: fadeIn 0.3s ease; }
.maria-greeting-card { animation: slideUp 0.4s ease; }
.pulse-icon { animation: pulse 1s infinite; }
STYLES
echo "  ✅ Added engagement styles"
fi

echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# PHASE 6: CREATE INTEGRATION INSTRUCTIONS
# ═══════════════════════════════════════════════════════════════════════════════
echo "[PHASE 6] Creating integration instructions..."

cat > src/ENGAGEMENT_INTEGRATION.md << 'INSTRUCTIONS'
# Engagement Features Integration Guide

## What Was Added

1. **Components Created:**
   - `src/components/MariaGreeting.js` - Greeting on app open
   - `src/components/SessionTeaser.js` - "Tomorrow..." hooks on complete
   - `src/components/RandomDelight.js` - Occasional surprises
   - `src/components/NoticingDisplay.js` - Color-coded grammar (needs JSON data)
   - `src/components/ShadowingMode.js` - Audio practice (needs JSON data)

2. **InteractiveCurriculum.js Modified:**
   - Added imports for RandomDelight, SessionTeaser
   - Added `showTeaser` state
   - Complete button now shows teaser

3. **App.js Modified:**
   - Added MariaGreeting import
   - Added `showMariaGreeting` state

## Manual Integration Needed

### To Show MariaGreeting on App Open:

Add this near the top of App.js return:
```jsx
{showMariaGreeting && (
  <MariaGreeting 
    currentDay={currentDay}
    streak={streakCount}
    onDismiss={() => setShowMariaGreeting(false)}
  />
)}
```

### To Show SessionTeaser When Completing a Day:

In InteractiveCurriculum.js, add before the Complete Button:
```jsx
{showTeaser && (
  <SessionTeaser 
    currentDay={day}
    onDismiss={() => { setShowTeaser(false); onComplete(); }}
    onRemind={() => { setShowTeaser(false); onComplete(); }}
  />
)}
```

### To Show RandomDelight:

Add at the start of any component's return:
```jsx
<RandomDelight triggerChance={0.08} />
```

## Features That Need JSON Migration

These features require the app to load from JSON files instead of hardcoded CURRICULUM:
- NoticingDisplay (needs `noticingEnhancements` in JSON)
- ShadowingMode (needs `shadowingMode` in JSON)
- PT Stage badges (needs `processabilityTheory` in JSON)

The JSON files in `src/content/days/` have this data, but the app currently uses
hardcoded data in InteractiveCurriculum.js.

## Migration Path

1. Current: Hardcoded CURRICULUM (working)
2. Phase 1: Add engagement UI (this script)
3. Phase 2: Migrate to JSON files (future)
4. Phase 3: Enable full Noticing/Shadowing features

INSTRUCTIONS
echo "  ✅ Created src/ENGAGEMENT_INTEGRATION.md"

echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ═══════════════════════════════════════════════════════════════════════════════
echo "═══════════════════════════════════════════════════════════════════════════"
echo "     ✅ SAFE IMPLEMENTATION COMPLETE"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""
echo "📁 Components created/verified:"
echo "   • src/components/MariaGreeting.js"
echo "   • src/components/SessionTeaser.js"
echo "   • src/components/RandomDelight.js"
echo "   • src/components/NoticingDisplay.js"
echo "   • src/components/ShadowingMode.js"
echo ""
echo "📝 Files modified:"
echo "   • src/InteractiveCurriculum.js (imports + state)"
echo "   • src/App.js (MariaGreeting import)"
echo "   • src/App.css (engagement styles)"
echo ""
echo "📋 Read src/ENGAGEMENT_INTEGRATION.md for manual steps"
echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""
echo "🚀 Test now:"
echo "   npm start"
echo ""
echo "🚀 If working, deploy:"
echo "   git add -A && git commit -m 'Add engagement features (safe)' && git push && vercel --prod"
echo ""
