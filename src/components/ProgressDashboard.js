import React, { useState, useEffect } from 'react';

/**
 * ProgressDashboard
 * 
 * Visual overview of the learner's journey.
 * - Celebrates progress, not perfection
 * - Multiple success metrics (not just "level")
 * - Shows growth over time
 * - Connects effort to outcomes
 * 
 * Design principles:
 * - Every metric should feel encouraging
 * - Comparisons are to past self, never others
 * - Qualitative growth matters as much as quantitative
 */

const theme = {
  primary: '#2D5A27',
  primaryLight: '#4A7C43',
  bg: '#FAFAFA',
  surface: '#FFF',
  text: '#1A1A1A',
  textLight: '#666',
  border: '#E0E0E0',
  success: '#4CAF50',
  accent: '#FF6B35'
};

// Titles based on conversation count
const JOURNEY_TITLES = [
  { min: 0, title: 'Curious Explorer', emoji: '🌱' },
  { min: 5, title: 'Brave Beginner', emoji: '🌿' },
  { min: 15, title: 'Growing Speaker', emoji: '🌳' },
  { min: 30, title: 'Confident Conversationalist', emoji: '🌲' },
  { min: 50, title: 'Fluent Friend', emoji: '🌴' },
  { min: 100, title: 'Spanish Soul', emoji: '🌺' },
  { min: 200, title: 'Language Legend', emoji: '👑' }
];

// Milestone messages
const MILESTONES = {
  firstConversation: "You had your first conversation! The hardest step is starting. 🎉",
  tenConversations: "10 conversations! You're building real momentum!",
  oneHourTotal: "One hour of practice! That's dedication! ⏰",
  fiveHourTotal: "5 hours of Spanish! You're transforming! 🦋",
  weekStreak: "A full week of practice! Habits are forming! 📅",
  monthStreak: "A month of consistency! Incredible! 🏆",
  hundredMessages: "100 messages sent! Look at you communicate! 💬",
  firstMission: "First real-world mission completed! 🌍",
  firstStory: "First story journey finished! 📖"
};

// Get all stats from various localStorage sources
function getAllStats() {
  // Voice chat stats
  const chatStats = JSON.parse(localStorage.getItem('fluidez_chat_stats') || '{}');
  
  // Streak data
  const streakData = JSON.parse(localStorage.getItem('fluidez_streaks') || '{}');
  
  // Achievements
  const achievements = JSON.parse(localStorage.getItem('fluidez_achievements') || '[]');
  
  // Missions
  const missions = JSON.parse(localStorage.getItem('fluidez_missions') || '[]');
  
  // Stories
  const stories = JSON.parse(localStorage.getItem('fluidez_story_progress') || '{}');
  
  // Reflections
  const reflections = JSON.parse(localStorage.getItem('fluidez_reflections') || '[]');
  
  // Patterns discovered
  const patterns = JSON.parse(localStorage.getItem('fluidez_patterns_discovered') || '[]');
  
  // Cultural content
  const culture = JSON.parse(localStorage.getItem('fluidez_culture_viewed') || '[]');
  
  // María's memory
  const memory = JSON.parse(localStorage.getItem('fluidez_maria_memory') || '{}');
  
  return {
    // Conversations
    totalConversations: chatStats.totalConversations || 0,
    totalMessages: chatStats.totalMessages || 0,
    totalMinutes: chatStats.totalMinutes || 0,
    averageSessionLength: chatStats.totalConversations > 0 
      ? Math.round((chatStats.totalMinutes || 0) / chatStats.totalConversations) 
      : 0,
    longestConversation: chatStats.longestConversation || 0,
    
    // Streaks
    currentStreak: streakData.currentStreak || 0,
    longestStreak: streakData.longestStreak || 0,
    totalDays: streakData.totalDays || 0,
    
    // Progress items
    achievementsCount: achievements.length,
    missionsCompleted: missions.filter(m => m.completed).length,
    storiesCompleted: Object.values(stories).filter(s => s.completed).length,
    reflectionsCount: reflections.length,
    patternsDiscovered: patterns.length,
    cultureExplored: culture.length,
    
    // Memory items (things María knows)
    memoryItems: Object.values(memory).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0),
    
    // Raw data for detailed views
    _raw: { chatStats, streakData, achievements, missions, stories, reflections, patterns }
  };
}

// Calculate journey title
function getJourneyTitle(conversations) {
  let title = JOURNEY_TITLES[0];
  for (const t of JOURNEY_TITLES) {
    if (conversations >= t.min) title = t;
  }
  return title;
}

// Check for new milestones
function checkMilestones(stats, previousStats) {
  const newMilestones = [];
  
  if (stats.totalConversations >= 1 && (previousStats?.totalConversations || 0) < 1) {
    newMilestones.push('firstConversation');
  }
  if (stats.totalConversations >= 10 && (previousStats?.totalConversations || 0) < 10) {
    newMilestones.push('tenConversations');
  }
  if (stats.totalMinutes >= 60 && (previousStats?.totalMinutes || 0) < 60) {
    newMilestones.push('oneHourTotal');
  }
  if (stats.totalMinutes >= 300 && (previousStats?.totalMinutes || 0) < 300) {
    newMilestones.push('fiveHourTotal');
  }
  if (stats.currentStreak >= 7 && (previousStats?.currentStreak || 0) < 7) {
    newMilestones.push('weekStreak');
  }
  if (stats.currentStreak >= 30 && (previousStats?.currentStreak || 0) < 30) {
    newMilestones.push('monthStreak');
  }
  if (stats.totalMessages >= 100 && (previousStats?.totalMessages || 0) < 100) {
    newMilestones.push('hundredMessages');
  }
  
  return newMilestones;
}

// Format minutes nicely
function formatTime(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export default function ProgressDashboard({ onBack }) {
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [newMilestone, setNewMilestone] = useState(null);
  
  useEffect(() => {
    const currentStats = getAllStats();
    setStats(currentStats);
    
    // Check for new milestones
    const previousStats = JSON.parse(localStorage.getItem('fluidez_previous_stats') || 'null');
    const milestones = checkMilestones(currentStats, previousStats);
    if (milestones.length > 0) {
      setNewMilestone(milestones[0]);
    }
    
    // Save current stats for next comparison
    localStorage.setItem('fluidez_previous_stats', JSON.stringify(currentStats));
  }, []);
  
  if (!stats) return null;
  
  const journeyTitle = getJourneyTitle(stats.totalConversations);
  const nextTitle = JOURNEY_TITLES.find(t => t.min > stats.totalConversations);
  
  return (
    <div style={styles.container}>
      {/* Milestone popup */}
      {newMilestone && (
        <div style={styles.milestoneOverlay}>
          <div style={styles.milestoneCard}>
            <span style={{ fontSize: 48 }}>🎉</span>
            <h3 style={{ margin: '16px 0 8px' }}>New Milestone!</h3>
            <p style={{ margin: 0, lineHeight: 1.5 }}>{MILESTONES[newMilestone]}</p>
            <button 
              onClick={() => setNewMilestone(null)}
              style={styles.milestoneBtn}
            >
              ¡Increíble!
            </button>
          </div>
        </div>
      )}
      
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Your Journey</h2>
        <div style={{ width: 40 }} />
      </div>
      
      {/* Journey title card */}
      <div style={styles.titleCard}>
        <span style={{ fontSize: 48 }}>{journeyTitle.emoji}</span>
        <div style={styles.titleText}>{journeyTitle.title}</div>
        {nextTitle && (
          <div style={styles.nextTitle}>
            {nextTitle.emoji} {stats.totalConversations}/{nextTitle.min} conversations to "{nextTitle.title}"
          </div>
        )}
      </div>
      
      {/* Tab navigation */}
      <div style={styles.tabs}>
        {['overview', 'time', 'growth'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.tabActive : {})
            }}
          >
            {tab === 'overview' ? '📊 Overview' : tab === 'time' ? '⏱️ Time' : '🌱 Growth'}
          </button>
        ))}
      </div>
      
      <div style={styles.content}>
        {activeTab === 'overview' && (
          <>
            {/* Main stats */}
            <div style={styles.statsGrid}>
              <StatCard 
                emoji="💬" 
                value={stats.totalConversations} 
                label="Conversations"
                color="#4CAF50"
              />
              <StatCard 
                emoji="⏱️" 
                value={formatTime(stats.totalMinutes)} 
                label="Total Time"
                color="#2196F3"
              />
              <StatCard 
                emoji="🔥" 
                value={stats.currentStreak} 
                label="Day Streak"
                color="#FF6B35"
              />
              <StatCard 
                emoji="📅" 
                value={stats.totalDays} 
                label="Practice Days"
                color="#9C27B0"
              />
            </div>
            
            {/* Journey highlights */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Journey Highlights</h3>
              
              <HighlightRow 
                emoji="🏆" 
                label="Best streak" 
                value={`${stats.longestStreak} days`}
              />
              <HighlightRow 
                emoji="📝" 
                label="Messages sent" 
                value={stats.totalMessages}
              />
              <HighlightRow 
                emoji="⭐" 
                label="Achievements earned" 
                value={stats.achievementsCount}
              />
              <HighlightRow 
                emoji="🌍" 
                label="Real-world missions" 
                value={stats.missionsCompleted}
              />
              <HighlightRow 
                emoji="📖" 
                label="Stories completed" 
                value={stats.storiesCompleted}
              />
            </div>
          </>
        )}
        
        {activeTab === 'time' && (
          <>
            {/* Time stats */}
            <div style={styles.timeCard}>
              <div style={styles.bigStat}>
                <span style={styles.bigNum}>{formatTime(stats.totalMinutes)}</span>
                <span style={styles.bigLabel}>Total practice time</span>
              </div>
              
              <div style={styles.timeGrid}>
                <div style={styles.timeItem}>
                  <span style={styles.timeNum}>{stats.averageSessionLength}</span>
                  <span style={styles.timeLabel}>Avg. minutes/session</span>
                </div>
                <div style={styles.timeItem}>
                  <span style={styles.timeNum}>{stats.longestConversation}</span>
                  <span style={styles.timeLabel}>Longest session (min)</span>
                </div>
              </div>
            </div>
            
            {/* Time encouragement */}
            <div style={styles.encouragement}>
              {stats.totalMinutes < 60 && (
                <p>Every minute counts! You're building a foundation. 🌱</p>
              )}
              {stats.totalMinutes >= 60 && stats.totalMinutes < 300 && (
                <p>Over an hour of practice! Your brain is forming new connections. 🧠</p>
              )}
              {stats.totalMinutes >= 300 && stats.totalMinutes < 600 && (
                <p>5+ hours! You're developing real intuition for Spanish. ✨</p>
              )}
              {stats.totalMinutes >= 600 && (
                <p>10+ hours invested in yourself! That's commitment. 💪</p>
              )}
            </div>
            
            {/* Projected growth */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>If You Keep Going...</h3>
              <div style={styles.projectionCard}>
                <ProjectionItem 
                  label="In 1 week" 
                  value={`~${Math.round(stats.averageSessionLength * 7 / 60 * 10) / 10} more hours`}
                />
                <ProjectionItem 
                  label="In 1 month" 
                  value={`~${Math.round(stats.averageSessionLength * 30 / 60)} more hours`}
                />
                <ProjectionItem 
                  label="In 1 year" 
                  value={`~${Math.round(stats.averageSessionLength * 365 / 60)} more hours`}
                />
              </div>
              <p style={styles.projectionNote}>
                Research shows that consistent practice matters more than long sessions. 
                You're doing great! 💚
              </p>
            </div>
          </>
        )}
        
        {activeTab === 'growth' && (
          <>
            {/* Growth indicators */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Skills Growing</h3>
              
              <GrowthBar 
                label="Speaking Confidence" 
                value={Math.min(100, stats.totalConversations * 3)}
                color="#4CAF50"
              />
              <GrowthBar 
                label="Vocabulary" 
                value={Math.min(100, stats.patternsDiscovered * 10 + stats.cultureExplored * 5)}
                color="#2196F3"
              />
              <GrowthBar 
                label="Cultural Understanding" 
                value={Math.min(100, stats.cultureExplored * 12)}
                color="#FF9800"
              />
              <GrowthBar 
                label="Real-World Skills" 
                value={Math.min(100, stats.missionsCompleted * 15)}
                color="#9C27B0"
              />
            </div>
            
            {/* What María knows about you */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>María Knows...</h3>
              <div style={styles.mariaCard}>
                <span style={{ fontSize: 36 }}>👩‍🦰</span>
                <div>
                  <div style={styles.mariaText}>
                    {stats.memoryItems} things about you
                  </div>
                  <div style={styles.mariaSub}>
                    Your conversations are becoming more personal!
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reflections insight */}
            {stats.reflectionsCount > 0 && (
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Self-Awareness</h3>
                <div style={styles.reflectionCard}>
                  <span style={{ fontSize: 24 }}>🪞</span>
                  <div>
                    <strong>{stats.reflectionsCount}</strong> reflections recorded
                    <div style={styles.reflectionSub}>
                      Taking time to reflect deepens learning
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Encouragement */}
            <div style={styles.growthMessage}>
              <p>
                Growth isn't always visible day-to-day, but look at all you've done! 
                Every conversation, every reflection, every mission - it all adds up. 
                You're becoming a Spanish speaker. 🌟
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Sub-components
function StatCard({ emoji, value, label, color }) {
  return (
    <div style={styles.statCard}>
      <span style={{ fontSize: 24 }}>{emoji}</span>
      <div style={{ ...styles.statValue, color }}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

function HighlightRow({ emoji, label, value }) {
  return (
    <div style={styles.highlightRow}>
      <span style={{ marginRight: 10 }}>{emoji}</span>
      <span style={styles.highlightLabel}>{label}</span>
      <span style={styles.highlightValue}>{value}</span>
    </div>
  );
}

function ProjectionItem({ label, value }) {
  return (
    <div style={styles.projectionItem}>
      <span style={styles.projectionLabel}>{label}</span>
      <span style={styles.projectionValue}>{value}</span>
    </div>
  );
}

function GrowthBar({ label, value, color }) {
  return (
    <div style={styles.growthItem}>
      <div style={styles.growthHeader}>
        <span>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div style={styles.growthTrack}>
        <div style={{ ...styles.growthFill, width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

// Export utility
export { getAllStats };

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
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: { margin: 0, fontSize: 18, fontWeight: 600 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' },
  titleCard: {
    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
    color: '#fff',
    padding: '30px 20px',
    textAlign: 'center'
  },
  titleText: { fontSize: 24, fontWeight: 700, margin: '12px 0 8px' },
  nextTitle: { fontSize: 13, opacity: 0.9 },
  tabs: {
    display: 'flex',
    borderBottom: `1px solid ${theme.border}`,
    background: theme.surface
  },
  tab: {
    flex: 1,
    padding: 14,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: 13,
    color: theme.textLight
  },
  tabActive: {
    color: theme.primary,
    fontWeight: 600,
    borderBottom: `2px solid ${theme.primary}`
  },
  content: { padding: 20 },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    marginBottom: 24
  },
  statCard: {
    background: theme.surface,
    padding: 16,
    borderRadius: 12,
    textAlign: 'center',
    border: `1px solid ${theme.border}`
  },
  statValue: { fontSize: 28, fontWeight: 700, margin: '8px 0 4px' },
  statLabel: { fontSize: 12, color: theme.textLight },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 600, marginBottom: 12 },
  highlightRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: `1px solid ${theme.border}`
  },
  highlightLabel: { flex: 1, color: theme.text },
  highlightValue: { fontWeight: 600, color: theme.primary },
  timeCard: {
    background: theme.surface,
    padding: 24,
    borderRadius: 16,
    textAlign: 'center',
    marginBottom: 20,
    border: `1px solid ${theme.border}`
  },
  bigStat: { marginBottom: 20 },
  bigNum: { fontSize: 48, fontWeight: 700, color: theme.primary },
  bigLabel: { display: 'block', fontSize: 14, color: theme.textLight, marginTop: 4 },
  timeGrid: { display: 'flex', justifyContent: 'space-around' },
  timeItem: { textAlign: 'center' },
  timeNum: { display: 'block', fontSize: 24, fontWeight: 600, color: theme.text },
  timeLabel: { fontSize: 11, color: theme.textLight },
  encouragement: {
    background: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    textAlign: 'center',
    marginBottom: 20
  },
  projectionCard: {
    background: theme.surface,
    padding: 16,
    borderRadius: 12,
    border: `1px solid ${theme.border}`
  },
  projectionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: `1px solid ${theme.border}`
  },
  projectionLabel: { color: theme.textLight },
  projectionValue: { fontWeight: 600, color: theme.primary },
  projectionNote: {
    fontSize: 13,
    color: theme.textLight,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 1.5
  },
  growthItem: { marginBottom: 16 },
  growthHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 6,
    fontSize: 14
  },
  growthTrack: {
    height: 8,
    background: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden'
  },
  growthFill: {
    height: '100%',
    borderRadius: 4,
    transition: 'width 0.5s ease'
  },
  mariaCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: theme.surface,
    padding: 16,
    borderRadius: 12,
    border: `1px solid ${theme.border}`
  },
  mariaText: { fontWeight: 600, fontSize: 15 },
  mariaSub: { fontSize: 13, color: theme.textLight, marginTop: 2 },
  reflectionCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: '#FFF3E0',
    padding: 14,
    borderRadius: 12
  },
  reflectionSub: { fontSize: 12, color: theme.textLight, marginTop: 2 },
  growthMessage: {
    background: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 1.6
  },
  // Milestone overlay
  milestoneOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 20
  },
  milestoneCard: {
    background: theme.surface,
    padding: 32,
    borderRadius: 20,
    textAlign: 'center',
    maxWidth: 320
  },
  milestoneBtn: {
    marginTop: 20,
    background: theme.primary,
    color: '#fff',
    border: 'none',
    padding: '12px 32px',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer'
  }
};
