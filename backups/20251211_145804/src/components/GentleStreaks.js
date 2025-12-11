import React, { useState, useEffect } from 'react';

/**
 * GentleStreaks
 * 
 * Streak system that motivates without punishing.
 * - Celebrates consistency, not perfection
 * - "Freeze" days for life happening
 * - Focus on "practice days this month" not "days in a row"
 * - No guilt, just encouragement
 * 
 * Design principles:
 * - Missing a day is FINE - life happens
 * - Multiple metrics of success (not just streak)
 * - Celebrates return after breaks
 * - Never makes user feel bad
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
  warning: '#FFC107',
  fire: '#FF6B35'
};

// Gentle encouragement messages
const MESSAGES = {
  firstDay: [
    "Welcome! Every journey starts with a single step. 🌱",
    "¡Bienvenido! You're here - that's what matters!",
    "Day 1 of your Spanish adventure! 🎉"
  ],
  streak: [
    "You're building something amazing! 🔥",
    "Consistency is your superpower!",
    "Look at you go! Keep it up! 💪"
  ],
  returned: [
    "Welcome back! We missed you! 🤗",
    "Life happens - what matters is you're here now!",
    "¡Hola de nuevo! Ready to continue?",
    "Taking breaks is okay. Returning is what counts! 💚"
  ],
  milestone: {
    7: "One week! You're forming a habit! 🌟",
    14: "Two weeks strong! This is becoming part of you!",
    30: "ONE MONTH! You're officially committed! 🏆",
    50: "50 days! You're unstoppable! 🚀",
    100: "100 DAYS! Incredible dedication! 👑",
    365: "ONE YEAR! You're a legend! 🎊"
  }
};

// Get streak data from localStorage
function getStreakData() {
  const data = JSON.parse(localStorage.getItem('fluidez_streaks') || '{}');
  return {
    currentStreak: data.currentStreak || 0,
    longestStreak: data.longestStreak || 0,
    totalDays: data.totalDays || 0,
    lastPracticeDate: data.lastPracticeDate || null,
    freezesUsed: data.freezesUsed || 0,
    freezesAvailable: data.freezesAvailable || 2,
    practiceHistory: data.practiceHistory || [],
    monthlyGoal: data.monthlyGoal || 20,
    joinDate: data.joinDate || new Date().toISOString()
  };
}

// Save streak data
function saveStreakData(data) {
  localStorage.setItem('fluidez_streaks', JSON.stringify(data));
}

// Check if date is today
function isToday(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

// Check if date was yesterday
function isYesterday(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

// Get days since last practice
function getDaysSince(dateString) {
  if (!dateString) return Infinity;
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = today - date;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// Record today's practice
export function recordPractice() {
  const data = getStreakData();
  const today = new Date().toISOString().split('T')[0];
  
  // Already practiced today
  if (data.practiceHistory.includes(today)) {
    return { ...data, alreadyPracticed: true };
  }
  
  const daysSince = getDaysSince(data.lastPracticeDate);
  let streakStatus = 'continued';
  
  if (daysSince === 0) {
    // Same day, already counted
    return { ...data, alreadyPracticed: true };
  } else if (daysSince === 1 || data.currentStreak === 0) {
    // Yesterday or first day - continue/start streak
    data.currentStreak += 1;
    streakStatus = data.currentStreak === 1 ? 'started' : 'continued';
  } else if (daysSince <= 3 && data.freezesAvailable > 0) {
    // Missed 1-2 days but have freezes
    data.currentStreak += 1;
    data.freezesUsed += (daysSince - 1);
    data.freezesAvailable -= (daysSince - 1);
    streakStatus = 'saved';
  } else {
    // Streak broken, but that's okay!
    data.currentStreak = 1;
    streakStatus = 'restarted';
  }
  
  // Update records
  data.totalDays += 1;
  data.longestStreak = Math.max(data.longestStreak, data.currentStreak);
  data.lastPracticeDate = new Date().toISOString();
  data.practiceHistory.push(today);
  
  // Keep only last 365 days of history
  if (data.practiceHistory.length > 365) {
    data.practiceHistory = data.practiceHistory.slice(-365);
  }
  
  // Reset monthly freezes on 1st of month
  const now = new Date();
  if (now.getDate() === 1 && data.freezesAvailable < 2) {
    data.freezesAvailable = 2;
  }
  
  saveStreakData(data);
  
  return { ...data, streakStatus };
}

// Get this month's practice count
function getMonthlyProgress(practiceHistory) {
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  return practiceHistory.filter(date => date.startsWith(thisMonth)).length;
}

// Get appropriate message
function getMessage(data, streakStatus) {
  // Check for milestones first
  if (MESSAGES.milestone[data.currentStreak]) {
    return MESSAGES.milestone[data.currentStreak];
  }
  
  if (streakStatus === 'started' || data.totalDays === 1) {
    return MESSAGES.firstDay[Math.floor(Math.random() * MESSAGES.firstDay.length)];
  }
  
  if (streakStatus === 'restarted') {
    return MESSAGES.returned[Math.floor(Math.random() * MESSAGES.returned.length)];
  }
  
  return MESSAGES.streak[Math.floor(Math.random() * MESSAGES.streak.length)];
}

// Main component
export default function GentleStreaks({ onClose, compact = false }) {
  const [data, setData] = useState(getStreakData());
  const [message, setMessage] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  
  useEffect(() => {
    const streakData = getStreakData();
    setData(streakData);
    setMessage(getMessage(streakData, null));
  }, []);
  
  const monthlyProgress = getMonthlyProgress(data.practiceHistory);
  const monthlyPercentage = Math.min(100, Math.round((monthlyProgress / data.monthlyGoal) * 100));
  const practicedToday = isToday(data.lastPracticeDate);
  
  // Compact version for home screen
  if (compact) {
    return (
      <div style={styles.compactCard} onClick={onClose}>
        <div style={styles.compactLeft}>
          <span style={styles.fireEmoji}>{data.currentStreak > 0 ? '🔥' : '🌱'}</span>
          <div>
            <div style={styles.compactStreak}>{data.currentStreak} day streak</div>
            <div style={styles.compactSub}>{monthlyProgress}/{data.monthlyGoal} this month</div>
          </div>
        </div>
        {practicedToday && <span style={styles.checkmark}>✓</span>}
      </div>
    );
  }
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onClose} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Your Journey</h2>
        <div style={{ width: 40 }} />
      </div>
      
      <div style={styles.content}>
        {/* Main streak display */}
        <div style={styles.streakCard}>
          <div style={styles.streakCircle}>
            <span style={styles.streakNum}>{data.currentStreak}</span>
            <span style={styles.streakLabel}>day streak</span>
          </div>
          <p style={styles.message}>{message}</p>
          {practicedToday && (
            <div style={styles.todayBadge}>✓ Practiced today!</div>
          )}
        </div>
        
        {/* Monthly progress - the REAL metric */}
        <div style={styles.monthlyCard}>
          <div style={styles.monthlyHeader}>
            <span style={styles.monthlyTitle}>📅 This Month</span>
            <span style={styles.monthlyCount}>{monthlyProgress}/{data.monthlyGoal} days</span>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${monthlyPercentage}%` }} />
          </div>
          <p style={styles.monthlyTip}>
            {monthlyProgress >= data.monthlyGoal 
              ? "🎉 Monthly goal reached! You're amazing!" 
              : `${data.monthlyGoal - monthlyProgress} more days to hit your goal`}
          </p>
        </div>
        
        {/* Stats row */}
        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <span style={styles.statNum}>{data.totalDays}</span>
            <span style={styles.statLabel}>Total Days</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statNum}>{data.longestStreak}</span>
            <span style={styles.statLabel}>Best Streak</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statNum}>{data.freezesAvailable}</span>
            <span style={styles.statLabel}>Freeze Days</span>
          </div>
        </div>
        
        {/* Freeze explanation */}
        <div style={styles.freezeCard}>
          <h4 style={{ margin: '0 0 8px' }}>❄️ Streak Freezes</h4>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>
            Life happens! You get 2 freeze days per month. If you miss a day, 
            a freeze is automatically used to protect your streak. 
            {data.freezesAvailable === 0 && " (Resets on the 1st)"}
          </p>
        </div>
        
        {/* Calendar toggle */}
        <button 
          onClick={() => setShowCalendar(!showCalendar)}
          style={styles.calendarToggle}
        >
          {showCalendar ? '▲ Hide Calendar' : '▼ Show Practice Calendar'}
        </button>
        
        {/* Simple calendar */}
        {showCalendar && (
          <div style={styles.calendarCard}>
            <MiniCalendar practiceHistory={data.practiceHistory} />
          </div>
        )}
        
        {/* Gentle reminder */}
        <div style={styles.reminder}>
          <p>
            Remember: Missing days is completely normal. 
            What matters is that you keep coming back. 
            We're proud of you! 💚
          </p>
        </div>
      </div>
    </div>
  );
}

// Mini calendar component
function MiniCalendar({ practiceHistory }) {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  
  const monthStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  const practiceDays = new Set(
    practiceHistory
      .filter(d => d.startsWith(monthStr))
      .map(d => parseInt(d.split('-')[2]))
  );
  
  const days = [];
  // Empty cells for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} style={styles.calendarDay} />);
  }
  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const isPracticed = practiceDays.has(day);
    const isToday = day === today.getDate();
    days.push(
      <div 
        key={day} 
        style={{
          ...styles.calendarDay,
          background: isPracticed ? theme.success : 'transparent',
          color: isPracticed ? '#fff' : theme.text,
          border: isToday ? `2px solid ${theme.primary}` : 'none'
        }}
      >
        {day}
      </div>
    );
  }
  
  return (
    <div>
      <div style={styles.calendarHeader}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} style={styles.calendarHeaderDay}>{d}</div>
        ))}
      </div>
      <div style={styles.calendarGrid}>{days}</div>
    </div>
  );
}

// Streak notification for after practice
export function StreakNotification({ streakData, onDismiss }) {
  if (!streakData) return null;
  
  const isMilestone = MESSAGES.milestone[streakData.currentStreak];
  
  return (
    <div style={styles.notification}>
      <div style={styles.notificationContent}>
        <span style={{ fontSize: 32 }}>{isMilestone ? '🏆' : '🔥'}</span>
        <div>
          <div style={styles.notificationTitle}>
            {streakData.currentStreak} Day Streak!
          </div>
          <div style={styles.notificationSub}>
            {isMilestone || "Keep up the great work!"}
          </div>
        </div>
      </div>
      <button onClick={onDismiss} style={styles.notificationBtn}>Nice!</button>
    </div>
  );
}

// Export utility functions
export { getStreakData, isToday };

const styles = {
  container: {
    maxWidth: 500,
    margin: '0 auto',
    minHeight: '100vh',
    background: theme.bg,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    background: `linear-gradient(135deg, ${theme.fire} 0%, #FF8C42 100%)`,
    color: '#fff',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: { margin: 0, fontSize: 18, fontWeight: 600 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' },
  content: { padding: 20 },
  streakCard: {
    background: `linear-gradient(135deg, ${theme.fire} 0%, #FF8C42 100%)`,
    color: '#fff',
    padding: 30,
    borderRadius: 20,
    textAlign: 'center',
    marginBottom: 20
  },
  streakCircle: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px'
  },
  streakNum: { fontSize: 48, fontWeight: 700 },
  streakLabel: { fontSize: 14, opacity: 0.9 },
  message: { margin: 0, fontSize: 16, lineHeight: 1.5 },
  todayBadge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.25)',
    padding: '8px 16px',
    borderRadius: 20,
    marginTop: 16,
    fontSize: 14,
    fontWeight: 600
  },
  monthlyCard: {
    background: theme.surface,
    padding: 20,
    borderRadius: 16,
    border: `1px solid ${theme.border}`,
    marginBottom: 20
  },
  monthlyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  monthlyTitle: { fontWeight: 600, fontSize: 15 },
  monthlyCount: { color: theme.primary, fontWeight: 600 },
  progressBar: {
    height: 12,
    background: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
    borderRadius: 6,
    transition: 'width 0.3s'
  },
  monthlyTip: {
    margin: '12px 0 0',
    fontSize: 13,
    color: theme.textLight
  },
  statsRow: {
    display: 'flex',
    gap: 10,
    marginBottom: 20
  },
  statBox: {
    flex: 1,
    background: theme.surface,
    padding: 16,
    borderRadius: 12,
    textAlign: 'center',
    border: `1px solid ${theme.border}`
  },
  statNum: { display: 'block', fontSize: 24, fontWeight: 700, color: theme.primary },
  statLabel: { fontSize: 11, color: theme.textLight, textTransform: 'uppercase' },
  freezeCard: {
    background: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20
  },
  calendarToggle: {
    width: '100%',
    background: 'none',
    border: `1px solid ${theme.border}`,
    padding: 12,
    borderRadius: 8,
    color: theme.textLight,
    cursor: 'pointer',
    marginBottom: 16
  },
  calendarCard: {
    background: theme.surface,
    padding: 16,
    borderRadius: 12,
    border: `1px solid ${theme.border}`,
    marginBottom: 20
  },
  calendarHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 4,
    marginBottom: 8
  },
  calendarHeaderDay: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 600,
    color: theme.textLight
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 4
  },
  calendarDay: {
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500
  },
  reminder: {
    textAlign: 'center',
    padding: 16,
    color: theme.textLight,
    fontSize: 14,
    lineHeight: 1.6
  },
  // Compact styles
  compactCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.surface,
    padding: 14,
    borderRadius: 12,
    border: `1px solid ${theme.border}`,
    cursor: 'pointer'
  },
  compactLeft: { display: 'flex', alignItems: 'center', gap: 12 },
  fireEmoji: { fontSize: 28 },
  compactStreak: { fontWeight: 600, fontSize: 15 },
  compactSub: { fontSize: 12, color: theme.textLight },
  checkmark: { color: theme.success, fontSize: 20 },
  // Notification styles
  notification: {
    position: 'fixed',
    bottom: 20,
    left: 20,
    right: 20,
    maxWidth: 460,
    margin: '0 auto',
    background: theme.surface,
    borderRadius: 16,
    padding: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1000
  },
  notificationContent: { display: 'flex', alignItems: 'center', gap: 12 },
  notificationTitle: { fontWeight: 600, fontSize: 16 },
  notificationSub: { fontSize: 13, color: theme.textLight },
  notificationBtn: {
    background: theme.fire,
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: 8,
    fontWeight: 600,
    cursor: 'pointer'
  }
};
