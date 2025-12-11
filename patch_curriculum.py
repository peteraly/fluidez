#!/usr/bin/env python3
"""
Patch InteractiveCurriculum.js to add engagement features
while preserving the existing design.
"""

import os
import re
from datetime import datetime

def main():
    filepath = 'src/InteractiveCurriculum.js'
    
    # Check file exists
    if not os.path.exists(filepath):
        print(f"❌ File not found: {filepath}")
        return
    
    # Read current content
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Backup
    backup_path = f"{filepath}.backup-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    with open(backup_path, 'w') as f:
        f.write(content)
    print(f"✅ Backup created: {backup_path}")
    
    # Track changes
    changes = []
    
    # PATCH 1: Add imports after first line
    if "import NoticingDisplay" not in content:
        import_block = """import NoticingDisplay from './components/NoticingDisplay';
import ShadowingMode from './components/ShadowingMode';
import RandomDelight from './components/RandomDelight';
import SessionTeaser from './components/SessionTeaser';
"""
        # Insert after first import line
        content = content.replace(
            "import React, { useState } from 'react';",
            "import React, { useState } from 'react';\n" + import_block
        )
        changes.append("Added engagement imports")
    
    # PATCH 2: Add state variables
    if "showShadowing" not in content:
        # Find the vocabIndex state and add after it
        content = content.replace(
            "const [vocabIndex, setVocabIndex] = useState(0);",
            """const [vocabIndex, setVocabIndex] = useState(0);
  const [showShadowing, setShowShadowing] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);"""
        )
        changes.append("Added showShadowing and showTeaser state")
    
    # PATCH 3: Add RandomDelight at the start of the return
    if "<RandomDelight" not in content:
        # Find the return statement's opening div and add RandomDelight
        content = content.replace(
            "<div style={{minHeight: '100vh', background: theme.bg, paddingBottom: 100}}>",
            """<div style={{minHeight: '100vh', background: theme.bg, paddingBottom: 100}}>
      {/* Random Delight - occasional surprises */}
      <RandomDelight triggerChance={0.08} />"""
        )
        changes.append("Added RandomDelight component")
    
    # PATCH 4: Add NoticingDisplay in Grammar tab (after the grammar card)
    if "<NoticingDisplay" not in content:
        # Find the grammar tip section and add NoticingDisplay after the card closes
        # Look for the closing of the grammar card
        grammar_card_pattern = r"(\{currentGrammar\.tip && \(\s*<div style=\{\{background: '#e8f5e9'.*?💡 \{currentGrammar\.tip\}\s*</div>\s*\)\})"
        match = re.search(grammar_card_pattern, content, re.DOTALL)
        if match:
            # Add NoticingDisplay after the tip
            replacement = match.group(1) + """
                
                {/* Noticing Hypothesis - Color-coded patterns */}
                <NoticingDisplay dayData={dayData} />"""
            content = content.replace(match.group(1), replacement)
            changes.append("Added NoticingDisplay in Grammar tab")
    
    # PATCH 5: Add Shadowing Mode button in Listening tab
    if "showShadowing" in content and "Try Shadowing Mode" not in content:
        # Find the listening tab content and add the shadowing button
        listening_header = '<h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>🎧 Listening Practice</h2>'
        if listening_header in content:
            shadowing_button = """<h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>🎧 Listening Practice</h2>
            
            {/* Shadowing Mode - unlocks Day 7 */}
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
            
            {showShadowing && (
              <div style={{marginBottom: 16}}>
                <ShadowingMode 
                  dayData={{shadowingMode: {enabled: true, phrases: dayData.vocabulary?.[0]?.words?.slice(0,5).map(w => ({spanish: w.es, focus: 'rhythm'})) || [], config: {speed: 0.9}}}}
                  onComplete={() => setShowShadowing(false)}
                  onClose={() => setShowShadowing(false)}
                />
              </div>
            )}"""
            content = content.replace(listening_header, shadowing_button)
            changes.append("Added Shadowing Mode button in Listening tab")
    
    # PATCH 6: Add SessionTeaser when completing
    if "showTeaser" in content and "<SessionTeaser" not in content:
        # Find the complete button and wrap with teaser logic
        complete_button_pattern = r'onClick=\{onComplete\}'
        if re.search(complete_button_pattern, content):
            content = re.sub(
                complete_button_pattern,
                'onClick={() => { setShowTeaser(true); }}',
                content,
                count=1  # Only replace first occurrence
            )
            changes.append("Modified Complete button to show teaser")
        
        # Add SessionTeaser component before the closing Complete Button div
        content = content.replace(
            "{/* Complete Button */}",
            """{/* Session Teaser */}
      {showTeaser && (
        <SessionTeaser 
          currentDay={day}
          onDismiss={() => { setShowTeaser(false); onComplete(); }}
          onRemind={() => { setShowTeaser(false); alert('We\\'ll remind you tomorrow! 🔔'); onComplete(); }}
        />
      )}

      {/* Complete Button */}"""
        )
        changes.append("Added SessionTeaser component")
    
    # Write patched content
    with open(filepath, 'w') as f:
        f.write(content)
    
    print("\n" + "="*70)
    print("     ✅ PATCH COMPLETE!")
    print("="*70)
    print(f"\n📝 Changes made ({len(changes)}):")
    for change in changes:
        print(f"   • {change}")
    
    if not changes:
        print("   (No changes needed - already patched or structure different)")
    
    print("\n🚀 Test now: npm start")
    print("🚀 Deploy:   git add -A && git commit -m 'Add engagement features' && git push && vercel --prod\n")

if __name__ == "__main__":
    main()
