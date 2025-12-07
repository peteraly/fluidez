import React, { useState, useEffect } from 'react';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0', gold: '#FFD700', silver: '#C0C0C0', bronze: '#CD7F32' };

const ACHIEVEMENTS = [
  // Getting Started
  { id: 'first_lesson', icon: '🌱', title: 'First Steps', desc: 'Complete your first lesson', xp: 10, tier: 'bronze' },
  { id: 'first_week', icon: '📚', title: 'Week One', desc: 'Complete 7 days of lessons', xp: 50, tier: 'silver' },
  { id: 'halfway', icon: '🎯', title: 'Halfway There', desc: 'Complete 15 days', xp: 100, tier: 'gold' },
  { id: 'graduate', icon: '🎓', title: 'Graduate', desc: 'Complete all 30 days', xp: 500, tier: 'gold' },
  
  // Streaks
  { id: 'streak_3', icon: '🔥', title: 'On Fire', desc: '3-day streak', xp: 15, tier: 'bronze' },
  { id: 'streak_7', icon: '🔥', title: 'Week Warrior', desc: '7-day streak', xp: 50, tier: 'silver' },
  { id: 'streak_30', icon: '🔥', title: 'Unstoppable', desc: '30-day streak', xp: 200, tier: 'gold' },
  
  // Practice
  { id: 'vocab_50', icon: '📖', title: 'Word Collector', desc: 'Master 50 vocabulary words', xp: 25, tier: 'bronze' },
  { id: 'vocab_200', icon: '📖', title: 'Lexicon Builder', desc: 'Master 200 vocabulary words', xp: 100, tier: 'silver' },
  { id: 'vocab_all', icon: '📖', title: 'Vocabulary Master', desc: 'Master all 421 words', xp: 300, tier: 'gold' },
  
  // Roleplay
  { id: 'roleplay_1', icon: '🎭', title: 'Actor', desc: 'Complete 1 roleplay scenario', xp: 20, tier: 'bronze' },
  { id: 'roleplay_all', icon: '🎭', title: 'Shapeshifter', desc: 'Complete all 6 roleplay scenarios', xp: 100, tier: 'gold' },
  
  // Grammar
  { id: 'grammar_1', icon: '📝', title: 'Grammar Starter', desc: 'Complete 1 grammar drill', xp: 15, tier: 'bronze' },
  { id: 'grammar_all', icon: '📝', title: 'Grammar Guru', desc: 'Complete all 6 grammar topics', xp: 100, tier: 'gold' },
  
  // Special
  { id: 'night_owl', icon: '🦉', title: 'Night Owl', desc: 'Practice after 10pm', xp: 10, tier: 'bronze' },
  { id: 'early_bird', icon: '🐦', title: 'Early Bird', desc: 'Practice before 7am', xp: 10, tier: 'bronze' },
  { id: 'perfectionist', icon: '💯', title: 'Perfectionist', desc: 'Get 100% on any quiz', xp: 25, tier: 'silver' },
];

export default function Achievements({ onBack }) {
  const [unlocked, setUnlocked] = useState([]);
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    // Load unlocked achievements
    const saved = JSON.parse(localStorage.getItem('fluidez_achievements') || '[]');
    setUnlocked(saved);
    
    // Calculate total XP
    const xp = saved.reduce((sum, id) => {
      const ach = ACHIEVEMENTS.find(a => a.id === id);
      return sum + (ach?.xp || 0);
    }, 0);
    setTotalXP(xp);
  }, []);

  const getTierColor = (tier) => {
    if (tier === 'gold') return theme.gold;
    if (tier === 'silver') return theme.silver;
    return theme.bronze;
  };

  const unlockedCount = unlocked.length;
  const totalCount = ACHIEVEMENTS.length;
  const progress = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Achievements</h2>
        <div style={{ width: 40 }} />
      </div>

      <div style={styles.content}>
        {/* Stats Card */}
        <div style={styles.statsCard}>
          <div style={styles.statRow}>
            <div style={styles.stat}>
              <span style={styles.statValue}>{unlockedCount}/{totalCount}</span>
              <span style={styles.statLabel}>Unlocked</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statValue}>{totalXP}</span>
              <span style={styles.statLabel}>Total XP</span>
            </div>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <p style={styles.progressText}>{progress}% complete</p>
        </div>

        {/* Achievement Grid */}
        <div style={styles.grid}>
          {ACHIEVEMENTS.map(ach => {
            const isUnlocked = unlocked.includes(ach.id);
            return (
              <div key={ach.id} style={{
                ...styles.achCard,
                opacity: isUnlocked ? 1 : 0.5,
                background: isUnlocked ? theme.surface : '#f5f5f5'
              }}>
                <div style={{
                  ...styles.iconCircle,
                  background: isUnlocked ? getTierColor(ach.tier) + '30' : '#e0e0e0',
                  borderColor: isUnlocked ? getTierColor(ach.tier) : '#ccc'
                }}>
                  <span style={{ fontSize: 24, filter: isUnlocked ? 'none' : 'grayscale(100%)' }}>
                    {ach.icon}
                  </span>
                </div>
                <h4 style={styles.achTitle}>{ach.title}</h4>
                <p style={styles.achDesc}>{ach.desc}</p>
                <div style={{
                  ...styles.xpBadge,
                  background: isUnlocked ? getTierColor(ach.tier) : '#ddd',
                  color: isUnlocked ? '#000' : '#999'
                }}>
                  +{ach.xp} XP
                </div>
                {isUnlocked && <div style={styles.checkmark}>✓</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Helper function to unlock achievement (call from anywhere)
export function unlockAchievement(id) {
  const saved = JSON.parse(localStorage.getItem('fluidez_achievements') || '[]');
  if (!saved.includes(id)) {
    saved.push(id);
    localStorage.setItem('fluidez_achievements', JSON.stringify(saved));
    
    // Show notification
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (ach) {
      // You could trigger a toast notification here
      console.log(`🏆 Achievement Unlocked: ${ach.title}`);
    }
    return true;
  }
  return false;
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  header: { background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { margin: 0, fontSize: 18 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' },
  content: { padding: 16 },
  statsCard: { background: theme.surface, borderRadius: 16, padding: 20, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  statRow: { display: 'flex', justifyContent: 'space-around', marginBottom: 16 },
  stat: { textAlign: 'center' },
  statValue: { display: 'block', fontSize: 28, fontWeight: 700, color: theme.primary },
  statLabel: { fontSize: 13, color: theme.textLight },
  progressBar: { height: 8, background: theme.border, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', background: theme.gold, borderRadius: 4, transition: 'width 0.5s' },
  progressText: { textAlign: 'center', fontSize: 13, color: theme.textLight, marginTop: 8 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  achCard: { position: 'relative', background: theme.surface, borderRadius: 16, padding: 16, textAlign: 'center', border: `1px solid ${theme.border}` },
  iconCircle: { width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', border: '3px solid' },
  achTitle: { margin: '0 0 4px', fontSize: 14, fontWeight: 600 },
  achDesc: { margin: '0 0 8px', fontSize: 11, color: theme.textLight },
  xpBadge: { display: 'inline-block', padding: '3px 10px', borderRadius: 10, fontSize: 11, fontWeight: 600 },
  checkmark: { position: 'absolute', top: 8, right: 8, width: 20, height: 20, background: theme.primary, color: '#fff', borderRadius: '50%', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }
};
