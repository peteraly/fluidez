import React, { useState, useEffect } from 'react';

/**
 * CommunityChallenges
 * 
 * Group challenges that motivate learning together.
 * - Weekly themed challenges
 * - Personal goals within community context
 * - Leaderboards (optional, encouraging)
 * - Celebrate collective wins
 * 
 * Design principles:
 * - Competition is opt-in
 * - Everyone can "win" by completing their goal
 * - Focus on participation, not ranking
 * - Community celebration over individual glory
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
  accent: '#FF6B35',
  purple: '#9C27B0'
};

// Active challenges
const CHALLENGES = [
  {
    id: 'weekly-conversations',
    title: '💬 Conversation Week',
    description: 'Have 7 conversations with María this week',
    type: 'weekly',
    goal: 7,
    metric: 'conversations',
    reward: '🏆 Conversationalist Badge',
    participants: 234,
    completions: 89,
    endsIn: '3 days',
    tips: [
      'Even 2-minute chats count!',
      'Try different conversation starters',
      'Quality over quantity, but do show up!'
    ]
  },
  {
    id: 'culture-explorer',
    title: '🌎 Culture Explorer',
    description: 'Explore 3 cultural deep dives this week',
    type: 'weekly',
    goal: 3,
    metric: 'culture',
    reward: '🎭 Culture Enthusiast Badge',
    participants: 156,
    completions: 67,
    endsIn: '3 days',
    tips: [
      'Food topics are most popular!',
      'Listen to audio for each vocabulary word',
      'Try using new phrases with María'
    ]
  },
  {
    id: 'streak-warrior',
    title: '🔥 Streak Warrior',
    description: 'Maintain a 7-day streak',
    type: 'ongoing',
    goal: 7,
    metric: 'streak',
    reward: '⚡ Dedicated Learner Badge',
    participants: 412,
    completions: 203,
    endsIn: 'Ongoing',
    tips: [
      'Set a daily reminder',
      'Even 1 minute of practice counts',
      'Use freeze days wisely!'
    ]
  },
  {
    id: 'real-world-hero',
    title: '🌍 Real World Hero',
    description: 'Complete 2 real-world missions',
    type: 'weekly',
    goal: 2,
    metric: 'missions',
    reward: '🦸 Real World Hero Badge',
    participants: 98,
    completions: 31,
    endsIn: '3 days',
    tips: [
      'Start with solo missions',
      'Any attempt counts as progress',
      'Passive missions (listening) are great first steps'
    ]
  },
  {
    id: 'pattern-hunter',
    title: '🧩 Pattern Hunter',
    description: 'Discover 5 new patterns',
    type: 'weekly',
    goal: 5,
    metric: 'patterns',
    reward: '🔍 Pattern Master Badge',
    participants: 145,
    completions: 52,
    endsIn: '3 days',
    tips: [
      'Browse all categories',
      'Practice examples out loud',
      'Use patterns in conversations'
    ]
  }
];

// Get challenge progress from localStorage
function getChallengeProgress() {
  return JSON.parse(localStorage.getItem('fluidez_challenges') || JSON.stringify({
    joined: [],
    completed: [],
    progress: {}
  }));
}

// Save challenge progress
function saveChallengeProgress(data) {
  localStorage.setItem('fluidez_challenges', JSON.stringify(data));
}

// Calculate progress for a challenge
function calculateProgress(challengeId) {
  const challenge = CHALLENGES.find(c => c.id === challengeId);
  if (!challenge) return 0;

  // Read from various localStorage sources
  switch (challenge.metric) {
    case 'conversations':
      const chatStats = JSON.parse(localStorage.getItem('fluidez_chat_stats') || '{}');
      return chatStats.weeklyConversations || 0;
    case 'culture':
      const culture = JSON.parse(localStorage.getItem('fluidez_culture_viewed') || '[]');
      return culture.length;
    case 'streak':
      const streaks = JSON.parse(localStorage.getItem('fluidez_streaks') || '{}');
      return streaks.currentStreak || 0;
    case 'missions':
      const missions = JSON.parse(localStorage.getItem('fluidez_missions') || '[]');
      return missions.filter(m => m.completed).length;
    case 'patterns':
      const patterns = JSON.parse(localStorage.getItem('fluidez_patterns_discovered') || '[]');
      return patterns.length;
    default:
      return 0;
  }
}

export default function CommunityChallenges({ onBack }) {
  const [challengeData, setChallengeData] = useState(getChallengeProgress());
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [activeTab, setActiveTab] = useState('active');
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebratedChallenge, setCelebratedChallenge] = useState(null);

  useEffect(() => {
    // Check for newly completed challenges
    challengeData.joined.forEach(challengeId => {
      const progress = calculateProgress(challengeId);
      const challenge = CHALLENGES.find(c => c.id === challengeId);
      
      if (challenge && progress >= challenge.goal && !challengeData.completed.includes(challengeId)) {
        // Mark as completed
        const updated = {
          ...challengeData,
          completed: [...challengeData.completed, challengeId]
        };
        saveChallengeProgress(updated);
        setChallengeData(updated);
        
        // Show celebration
        setCelebratedChallenge(challenge);
        setShowCelebration(true);
      }
    });
  }, [challengeData]);

  const handleJoin = (challengeId) => {
    if (!challengeData.joined.includes(challengeId)) {
      const updated = {
        ...challengeData,
        joined: [...challengeData.joined, challengeId]
      };
      saveChallengeProgress(updated);
      setChallengeData(updated);
    }
    setSelectedChallenge(null);
  };

  const handleLeave = (challengeId) => {
    const updated = {
      ...challengeData,
      joined: challengeData.joined.filter(id => id !== challengeId)
    };
    saveChallengeProgress(updated);
    setChallengeData(updated);
    setSelectedChallenge(null);
  };

  const joinedChallenges = CHALLENGES.filter(c => challengeData.joined.includes(c.id));
  const availableChallenges = CHALLENGES.filter(c => !challengeData.joined.includes(c.id));
  const completedChallenges = CHALLENGES.filter(c => challengeData.completed.includes(c.id));

  // Challenge detail view
  if (selectedChallenge) {
    const isJoined = challengeData.joined.includes(selectedChallenge.id);
    const isCompleted = challengeData.completed.includes(selectedChallenge.id);
    const progress = calculateProgress(selectedChallenge.id);
    const percentage = Math.min(100, Math.round((progress / selectedChallenge.goal) * 100));

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => setSelectedChallenge(null)} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Challenge Details</h2>
          <div style={{ width: 40 }} />
        </div>

        <div style={styles.content}>
          <div style={styles.challengeHeader}>
            <h3 style={styles.challengeTitle}>{selectedChallenge.title}</h3>
            <p style={styles.challengeDesc}>{selectedChallenge.description}</p>
            <div style={styles.challengeMeta}>
              <span>👥 {selectedChallenge.participants} participating</span>
              <span>⏰ {selectedChallenge.endsIn}</span>
            </div>
          </div>

          {/* Progress */}
          {isJoined && (
            <div style={styles.progressSection}>
              <div style={styles.progressHeader}>
                <span>Your Progress</span>
                <span style={{ fontWeight: 600 }}>{progress}/{selectedChallenge.goal}</span>
              </div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${percentage}%` }} />
              </div>
              {isCompleted ? (
                <div style={styles.completedBadge}>✓ Completed!</div>
              ) : (
                <p style={styles.progressTip}>
                  {selectedChallenge.goal - progress} more to go!
                </p>
              )}
            </div>
          )}

          {/* Reward */}
          <div style={styles.rewardCard}>
            <span style={{ fontSize: 28 }}>🎁</span>
            <div>
              <div style={styles.rewardLabel}>Reward</div>
              <div style={styles.rewardValue}>{selectedChallenge.reward}</div>
            </div>
          </div>

          {/* Community progress */}
          <div style={styles.communitySection}>
            <h4 style={styles.sectionTitle}>Community Progress</h4>
            <div style={styles.communityStats}>
              <div style={styles.communityStat}>
                <span style={styles.communityNum}>{selectedChallenge.participants}</span>
                <span style={styles.communityLabel}>Joined</span>
              </div>
              <div style={styles.communityStat}>
                <span style={styles.communityNum}>{selectedChallenge.completions}</span>
                <span style={styles.communityLabel}>Completed</span>
              </div>
              <div style={styles.communityStat}>
                <span style={styles.communityNum}>
                  {Math.round((selectedChallenge.completions / selectedChallenge.participants) * 100)}%
                </span>
                <span style={styles.communityLabel}>Success Rate</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div style={styles.tipsSection}>
            <h4 style={styles.sectionTitle}>💡 Tips</h4>
            {selectedChallenge.tips.map((tip, i) => (
              <div key={i} style={styles.tipItem}>• {tip}</div>
            ))}
          </div>

          {/* Action button */}
          {!isJoined ? (
            <button onClick={() => handleJoin(selectedChallenge.id)} style={styles.joinBtn}>
              Join Challenge
            </button>
          ) : !isCompleted ? (
            <button onClick={() => handleLeave(selectedChallenge.id)} style={styles.leaveBtn}>
              Leave Challenge
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  // Celebration modal
  if (showCelebration && celebratedChallenge) {
    return (
      <div style={styles.celebrationOverlay}>
        <div style={styles.celebrationCard}>
          <span style={{ fontSize: 64 }}>🎉</span>
          <h2 style={{ margin: '16px 0 8px' }}>Challenge Complete!</h2>
          <p style={{ margin: '0 0 16px', color: theme.textLight }}>
            {celebratedChallenge.title}
          </p>
          <div style={styles.rewardEarned}>
            {celebratedChallenge.reward}
          </div>
          <p style={{ fontSize: 14, color: theme.textLight, marginTop: 16 }}>
            You're one of {celebratedChallenge.completions + 1} people who completed this!
          </p>
          <button 
            onClick={() => {
              setShowCelebration(false);
              setCelebratedChallenge(null);
            }}
            style={styles.celebrateBtn}
          >
            ¡Increíble!
          </button>
        </div>
      </div>
    );
  }

  // Main view
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Community Challenges</h2>
        <div style={{ width: 40 }} />
      </div>

      {/* Stats bar */}
      <div style={styles.statsBar}>
        <div style={styles.statItem}>
          <span style={styles.statNum}>{joinedChallenges.length}</span>
          <span style={styles.statLabel}>Active</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statNum}>{completedChallenges.length}</span>
          <span style={styles.statLabel}>Completed</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statNum}>{completedChallenges.length}</span>
          <span style={styles.statLabel}>Badges</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button 
          onClick={() => setActiveTab('active')}
          style={{ ...styles.tab, ...(activeTab === 'active' ? styles.tabActive : {}) }}
        >
          🎯 My Challenges
        </button>
        <button 
          onClick={() => setActiveTab('browse')}
          style={{ ...styles.tab, ...(activeTab === 'browse' ? styles.tabActive : {}) }}
        >
          🔍 Browse
        </button>
        <button 
          onClick={() => setActiveTab('completed')}
          style={{ ...styles.tab, ...(activeTab === 'completed' ? styles.tabActive : {}) }}
        >
          🏆 Completed
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === 'active' && (
          <>
            {joinedChallenges.length === 0 ? (
              <div style={styles.emptyState}>
                <span style={{ fontSize: 48 }}>🎯</span>
                <p>No active challenges!</p>
                <p style={{ fontSize: 13, color: theme.textLight }}>
                  Browse challenges to join one.
                </p>
              </div>
            ) : (
              joinedChallenges.map(challenge => {
                const progress = calculateProgress(challenge.id);
                const percentage = Math.min(100, Math.round((progress / challenge.goal) * 100));
                const isCompleted = challengeData.completed.includes(challenge.id);
                
                return (
                  <div 
                    key={challenge.id}
                    onClick={() => setSelectedChallenge(challenge)}
                    style={styles.challengeCard}
                  >
                    <div style={styles.challengeCardHeader}>
                      <span style={styles.challengeCardTitle}>{challenge.title}</span>
                      {isCompleted && <span style={styles.completedCheck}>✓</span>}
                    </div>
                    <div style={styles.miniProgress}>
                      <div style={{ ...styles.miniProgressFill, width: `${percentage}%` }} />
                    </div>
                    <div style={styles.challengeCardMeta}>
                      <span>{progress}/{challenge.goal}</span>
                      <span>⏰ {challenge.endsIn}</span>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}

        {activeTab === 'browse' && (
          <>
            {availableChallenges.length === 0 ? (
              <div style={styles.emptyState}>
                <span style={{ fontSize: 48 }}>🎉</span>
                <p>You've joined all challenges!</p>
              </div>
            ) : (
              availableChallenges.map(challenge => (
                <div 
                  key={challenge.id}
                  onClick={() => setSelectedChallenge(challenge)}
                  style={styles.challengeCard}
                >
                  <div style={styles.challengeCardTitle}>{challenge.title}</div>
                  <div style={styles.challengeCardDesc}>{challenge.description}</div>
                  <div style={styles.challengeCardMeta}>
                    <span>👥 {challenge.participants}</span>
                    <span>⏰ {challenge.endsIn}</span>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {activeTab === 'completed' && (
          <>
            {completedChallenges.length === 0 ? (
              <div style={styles.emptyState}>
                <span style={{ fontSize: 48 }}>🏆</span>
                <p>No completed challenges yet!</p>
                <p style={{ fontSize: 13, color: theme.textLight }}>
                  Join a challenge and complete it to earn badges.
                </p>
              </div>
            ) : (
              completedChallenges.map(challenge => (
                <div 
                  key={challenge.id}
                  style={styles.completedCard}
                >
                  <span style={{ fontSize: 32 }}>🏆</span>
                  <div style={styles.completedInfo}>
                    <div style={styles.completedTitle}>{challenge.title}</div>
                    <div style={styles.completedReward}>{challenge.reward}</div>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* Info */}
        <div style={styles.infoCard}>
          <h4 style={{ margin: '0 0 8px' }}>🤝 Better Together</h4>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
            Challenges reset weekly. Join as many as you like! 
            Everyone who completes the goal earns the badge - no competition, just community.
          </p>
        </div>
      </div>
    </div>
  );
}

// Get challenge stats
export function getChallengeStats() {
  const data = getChallengeProgress();
  return {
    active: data.joined.length,
    completed: data.completed.length
  };
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
    background: `linear-gradient(135deg, ${theme.purple} 0%, #7B1FA2 100%)`,
    color: '#fff',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: { margin: 0, fontSize: 18, fontWeight: 600 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' },
  statsBar: {
    display: 'flex',
    background: '#7B1FA2',
    padding: '16px 20px'
  },
  statItem: { flex: 1, textAlign: 'center', color: '#fff' },
  statNum: { display: 'block', fontSize: 24, fontWeight: 700 },
  statLabel: { fontSize: 12, opacity: 0.9 },
  tabs: { display: 'flex', background: theme.surface, borderBottom: `1px solid ${theme.border}` },
  tab: { flex: 1, padding: 12, border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, color: theme.textLight },
  tabActive: { color: theme.purple, fontWeight: 600, borderBottom: `2px solid ${theme.purple}` },
  content: { padding: 20 },
  challengeCard: {
    background: theme.surface,
    padding: 16,
    borderRadius: 14,
    border: `1px solid ${theme.border}`,
    marginBottom: 12,
    cursor: 'pointer'
  },
  challengeCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  challengeCardTitle: { fontWeight: 600, marginBottom: 6 },
  challengeCardDesc: { fontSize: 13, color: theme.textLight, marginBottom: 10 },
  challengeCardMeta: { display: 'flex', justifyContent: 'space-between', fontSize: 12, color: theme.textLight },
  completedCheck: { color: theme.success, fontWeight: 600 },
  miniProgress: { height: 6, background: '#E0E0E0', borderRadius: 3, marginBottom: 10, overflow: 'hidden' },
  miniProgressFill: { height: '100%', background: theme.purple, borderRadius: 3 },
  emptyState: { textAlign: 'center', padding: 40 },
  infoCard: { background: '#F3E5F5', padding: 16, borderRadius: 12, marginTop: 20 },
  // Detail view
  challengeHeader: { textAlign: 'center', marginBottom: 24 },
  challengeTitle: { margin: '0 0 8px', fontSize: 22 },
  challengeDesc: { margin: '0 0 12px', color: theme.textLight },
  challengeMeta: { display: 'flex', justifyContent: 'center', gap: 20, fontSize: 13, color: theme.textLight },
  progressSection: { background: theme.surface, padding: 20, borderRadius: 14, marginBottom: 16, border: `1px solid ${theme.border}` },
  progressHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: 10 },
  progressBar: { height: 10, background: '#E0E0E0', borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', background: `linear-gradient(90deg, ${theme.purple} 0%, #AB47BC 100%)`, borderRadius: 5 },
  progressTip: { margin: '10px 0 0', fontSize: 13, color: theme.textLight, textAlign: 'center' },
  completedBadge: { marginTop: 10, textAlign: 'center', color: theme.success, fontWeight: 600 },
  rewardCard: { display: 'flex', alignItems: 'center', gap: 14, background: '#FFF3E0', padding: 16, borderRadius: 12, marginBottom: 16 },
  rewardLabel: { fontSize: 12, color: theme.textLight },
  rewardValue: { fontWeight: 600, fontSize: 15 },
  communitySection: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 600, marginBottom: 12 },
  communityStats: { display: 'flex', gap: 10 },
  communityStat: { flex: 1, background: theme.surface, padding: 14, borderRadius: 10, textAlign: 'center', border: `1px solid ${theme.border}` },
  communityNum: { display: 'block', fontSize: 20, fontWeight: 700, color: theme.purple },
  communityLabel: { fontSize: 11, color: theme.textLight },
  tipsSection: { background: theme.surface, padding: 16, borderRadius: 12, marginBottom: 20, border: `1px solid ${theme.border}` },
  tipItem: { fontSize: 14, marginBottom: 8, lineHeight: 1.5 },
  joinBtn: { width: '100%', padding: 16, background: theme.purple, color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
  leaveBtn: { width: '100%', padding: 16, background: theme.surface, color: theme.textLight, border: `1px solid ${theme.border}`, borderRadius: 12, fontSize: 16, cursor: 'pointer' },
  // Completed view
  completedCard: { display: 'flex', alignItems: 'center', gap: 14, background: theme.surface, padding: 16, borderRadius: 14, border: `1px solid ${theme.border}`, marginBottom: 12 },
  completedInfo: { flex: 1 },
  completedTitle: { fontWeight: 600, marginBottom: 2 },
  completedReward: { fontSize: 13, color: theme.purple },
  // Celebration
  celebrationOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 },
  celebrationCard: { background: theme.surface, padding: 40, borderRadius: 20, textAlign: 'center', maxWidth: 340 },
  rewardEarned: { background: '#F3E5F5', padding: '12px 20px', borderRadius: 30, display: 'inline-block', fontWeight: 600, color: theme.purple },
  celebrateBtn: { marginTop: 24, padding: '14px 40px', background: theme.purple, color: '#fff', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer' }
};
