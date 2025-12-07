import React, { useState, useEffect } from 'react';
import { ProgressStorage, VocabularyStorage, MistakesStorage } from '../services/storage';

const theme = {
  primary: '#2D5A27',
  primaryLight: '#4A7C43',
  success: '#228B22',
  text: '#1A1A1A',
  textLight: '#666',
  border: '#E0E0E0',
  bg: '#FAFAFA',
  surface: '#FFF',
  streak: '#FF6B35',
  xp: '#FFD700'
};

export function Dashboard({ onClose }) {
  const [progress, setProgress] = useState(null);
  const [vocab, setVocab] = useState(null);
  const [weakAreas, setWeakAreas] = useState([]);

  useEffect(() => {
    setProgress(ProgressStorage.get());
    setVocab(VocabularyStorage.get());
    setWeakAreas(MistakesStorage.getWeakAreas());
  }, []);

  if (!progress) return null;

  const level = calculateLevel(progress.stats.totalXP);
  const nextLevelXP = getNextLevelXP(level);
  const levelProgress = (progress.stats.totalXP / nextLevelXP) * 100;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={onClose} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Your Progress</h2>
        <div style={{ width: 40 }} />
      </div>

      <div style={styles.content}>
        {/* Level Card */}
        <div style={styles.levelCard}>
          <div style={styles.levelBadge}>{level}</div>
          <div style={styles.levelInfo}>
            <div style={styles.levelTitle}>Level {level}</div>
            <div style={styles.levelSubtitle}>{getLevelName(level)}</div>
          </div>
          <div style={styles.xpBadge}>
            <span style={{ fontSize: 20 }}>⭐</span>
            <span style={styles.xpText}>{progress.stats.totalXP} XP</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressBarContainer}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${Math.min(levelProgress, 100)}%` }} />
          </div>
          <div style={styles.progressLabel}>
            {progress.stats.totalXP} / {nextLevelXP} XP to next level
          </div>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <StatCard 
            icon="🔥" 
            value={progress.streak.current} 
            label="Day Streak" 
            color={theme.streak}
            sublabel={`Best: ${progress.streak.longest}`}
          />
          <StatCard 
            icon="📚" 
            value={vocab?.summary?.total || 0} 
            label="Words Learned"
            color={theme.primary}
            sublabel={`${vocab?.summary?.mastered || 0} mastered`}
          />
          <StatCard 
            icon="⏱️" 
            value={progress.stats.totalMinutes} 
            label="Minutes" 
            color="#3B82F6"
            sublabel="Total practice"
          />
          <StatCard 
            icon="✅" 
            value={Object.keys(progress.daysCompleted).length} 
            label="Days Done" 
            color={theme.success}
            sublabel="of 30 days"
          />
        </div>

        {/* Streak Section */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🔥 Streak</h3>
          <div style={styles.streakDisplay}>
            <div style={styles.streakNumber}>{progress.streak.current}</div>
            <div style={styles.streakLabel}>days in a row</div>
          </div>
          <div style={styles.streakDots}>
            {[...Array(7)].map((_, i) => (
              <div 
                key={i} 
                style={{
                  ...styles.streakDot,
                  background: i < progress.streak.current % 7 ? theme.streak : theme.border
                }}
              />
            ))}
          </div>
          {progress.streak.current > 0 && (
            <div style={styles.streakMessage}>
              {progress.streak.current >= 7 
                ? "🎉 Amazing! Keep it up!"
                : `${7 - (progress.streak.current % 7)} more days to weekly goal!`}
            </div>
          )}
        </div>

        {/* Vocabulary Progress */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📖 Vocabulary</h3>
          <div style={styles.vocabBars}>
            <VocabBar 
              label="Mastered" 
              count={vocab?.summary?.mastered || 0} 
              total={vocab?.summary?.total || 1}
              color={theme.success}
            />
            <VocabBar 
              label="Learning" 
              count={vocab?.summary?.learning || 0} 
              total={vocab?.summary?.total || 1}
              color={theme.primary}
            />
            <VocabBar 
              label="New" 
              count={(vocab?.summary?.total || 0) - (vocab?.summary?.mastered || 0) - (vocab?.summary?.learning || 0)} 
              total={vocab?.summary?.total || 1}
              color={theme.border}
            />
          </div>
        </div>

        {/* Weak Areas */}
        {weakAreas.length > 0 && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>🎯 Areas to Practice</h3>
            {weakAreas.map((area, i) => (
              <div key={i} style={styles.weakArea}>
                <span style={styles.weakAreaName}>{formatPatternName(area.type)}</span>
                <span style={styles.weakAreaCount}>{area.count} mistakes</span>
              </div>
            ))}
          </div>
        )}

        {/* Achievements Preview */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🏆 Achievements</h3>
          <div style={styles.achievementsGrid}>
            <Achievement icon="🌟" name="First Steps" unlocked={progress.stats.totalSessions > 0} />
            <Achievement icon="🔥" name="7 Day Streak" unlocked={progress.streak.longest >= 7} />
            <Achievement icon="📚" name="100 Words" unlocked={(vocab?.summary?.total || 0) >= 100} />
            <Achievement icon="🎯" name="Perfect Score" unlocked={Object.values(progress.moduleProgress).some(m => m.score === 100)} />
            <Achievement icon="💬" name="Chatterbox" unlocked={progress.stats.conversationMinutes >= 30} />
            <Achievement icon="🏁" name="Day 30" unlocked={progress.daysCompleted[30]?.completed} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ icon, value, label, color, sublabel }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statIcon}>{icon}</div>
      <div style={{ ...styles.statValue, color }}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
      {sublabel && <div style={styles.statSublabel}>{sublabel}</div>}
    </div>
  );
}

function VocabBar({ label, count, total, color }) {
  const percent = total > 0 ? (count / total) * 100 : 0;
  return (
    <div style={styles.vocabBarItem}>
      <div style={styles.vocabBarLabel}>
        <span>{label}</span>
        <span>{count}</span>
      </div>
      <div style={styles.vocabBarTrack}>
        <div style={{ ...styles.vocabBarFill, width: `${percent}%`, background: color }} />
      </div>
    </div>
  );
}

function Achievement({ icon, name, unlocked }) {
  return (
    <div style={{ ...styles.achievement, opacity: unlocked ? 1 : 0.3 }}>
      <div style={styles.achievementIcon}>{icon}</div>
      <div style={styles.achievementName}>{name}</div>
      {unlocked && <div style={styles.achievementCheck}>✓</div>}
    </div>
  );
}

// Helper functions
function calculateLevel(xp) {
  if (xp < 500) return 'A1';
  if (xp < 1500) return 'A2';
  if (xp < 4000) return 'B1';
  if (xp < 8000) return 'B2';
  if (xp < 15000) return 'C1';
  return 'C2';
}

function getNextLevelXP(level) {
  const thresholds = { A1: 500, A2: 1500, B1: 4000, B2: 8000, C1: 15000, C2: 30000 };
  return thresholds[level] || 500;
}

function getLevelName(level) {
  const names = {
    A1: 'Beginner',
    A2: 'Elementary', 
    B1: 'Intermediate',
    B2: 'Upper Intermediate',
    C1: 'Advanced',
    C2: 'Mastery'
  };
  return names[level] || 'Beginner';
}

function formatPatternName(type) {
  return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '0 auto',
    minHeight: '100vh',
    background: theme.bg,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
    color: '#fff',
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: 24,
    cursor: 'pointer',
    padding: 8
  },
  title: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600
  },
  content: {
    padding: 20
  },
  levelCard: {
    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
    borderRadius: 16,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    color: '#fff',
    marginBottom: 16
  },
  levelBadge: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 700
  },
  levelInfo: {
    flex: 1
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 600
  },
  levelSubtitle: {
    fontSize: 14,
    opacity: 0.9
  },
  xpBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(255,255,255,0.2)',
    padding: '8px 12px',
    borderRadius: 20
  },
  xpText: {
    fontWeight: 600
  },
  progressBarContainer: {
    marginBottom: 24
  },
  progressBar: {
    height: 8,
    background: theme.border,
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: theme.xp,
    borderRadius: 4,
    transition: 'width 0.5s ease'
  },
  progressLabel: {
    fontSize: 12,
    color: theme.textLight,
    marginTop: 8,
    textAlign: 'center'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    marginBottom: 20
  },
  statCard: {
    background: theme.surface,
    borderRadius: 16,
    padding: 16,
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8
  },
  statValue: {
    fontSize: 28,
    fontWeight: 700
  },
  statLabel: {
    fontSize: 13,
    color: theme.textLight
  },
  statSublabel: {
    fontSize: 11,
    color: theme.textLight,
    marginTop: 4
  },
  card: {
    background: theme.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  cardTitle: {
    margin: '0 0 16px',
    fontSize: 16,
    fontWeight: 600
  },
  streakDisplay: {
    textAlign: 'center',
    marginBottom: 16
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 700,
    color: theme.streak
  },
  streakLabel: {
    fontSize: 14,
    color: theme.textLight
  },
  streakDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12
  },
  streakDot: {
    width: 12,
    height: 12,
    borderRadius: '50%'
  },
  streakMessage: {
    textAlign: 'center',
    fontSize: 14,
    color: theme.textLight
  },
  vocabBars: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  vocabBarItem: {},
  vocabBarLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 13,
    marginBottom: 6,
    color: theme.textLight
  },
  vocabBarTrack: {
    height: 8,
    background: theme.bg,
    borderRadius: 4,
    overflow: 'hidden'
  },
  vocabBarFill: {
    height: '100%',
    borderRadius: 4,
    transition: 'width 0.5s ease'
  },
  weakArea: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: `1px solid ${theme.border}`
  },
  weakAreaName: {
    fontWeight: 500
  },
  weakAreaCount: {
    color: theme.textLight,
    fontSize: 14
  },
  achievementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 12
  },
  achievement: {
    textAlign: 'center',
    padding: 12,
    background: theme.bg,
    borderRadius: 12,
    position: 'relative'
  },
  achievementIcon: {
    fontSize: 28,
    marginBottom: 4
  },
  achievementName: {
    fontSize: 11,
    color: theme.textLight
  },
  achievementCheck: {
    position: 'absolute',
    top: 4,
    right: 4,
    color: theme.success,
    fontSize: 12
  }
};

export default Dashboard;
