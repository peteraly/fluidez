import React, { useState, useEffect } from 'react';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function StreakCalendar({ onBack }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [practiceDays, setPracticeDays] = useState([]);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    // Load practice history
    const history = JSON.parse(localStorage.getItem('fluidez_practice_history') || '[]');
    setPracticeDays(history);
    
    // Calculate current streak
    const today = new Date().toDateString();
    let currentStreak = 0;
    let checkDate = new Date();
    
    while (true) {
      const dateStr = checkDate.toDateString();
      if (history.includes(dateStr)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (dateStr !== today) {
        break;
      } else {
        checkDate.setDate(checkDate.getDate() - 1);
      }
    }
    setStreak(currentStreak);
    
    // Calculate longest streak
    let longest = 0;
    let tempStreak = 0;
    const sortedDays = [...history].sort((a, b) => new Date(a) - new Date(b));
    
    for (let i = 0; i < sortedDays.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prev = new Date(sortedDays[i - 1]);
        const curr = new Date(sortedDays[i]);
        const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          tempStreak++;
        } else {
          longest = Math.max(longest, tempStreak);
          tempStreak = 1;
        }
      }
    }
    longest = Math.max(longest, tempStreak);
    setLongestStreak(longest);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const isPracticed = (day) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return practiceDays.includes(checkDate.toDateString());
  };

  const totalDays = practiceDays.length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Practice Calendar</h2>
        <div style={{ width: 40 }} />
      </div>

      <div style={styles.content}>
        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>🔥</span>
            <span style={styles.statValue}>{streak}</span>
            <span style={styles.statLabel}>Current Streak</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>⭐</span>
            <span style={styles.statValue}>{longestStreak}</span>
            <span style={styles.statLabel}>Best Streak</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>📚</span>
            <span style={styles.statValue}>{totalDays}</span>
            <span style={styles.statLabel}>Total Days</span>
          </div>
        </div>

        {/* Calendar */}
        <div style={styles.calendar}>
          {/* Month Navigation */}
          <div style={styles.monthNav}>
            <button onClick={prevMonth} style={styles.navBtn}>←</button>
            <span style={styles.monthTitle}>
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button onClick={nextMonth} style={styles.navBtn}>→</button>
          </div>

          {/* Day Headers */}
          <div style={styles.dayHeaders}>
            {DAYS.map(day => (
              <div key={day} style={styles.dayHeader}>{day}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={styles.calendarGrid}>
            {/* Empty cells for first week offset */}
            {Array(firstDay).fill(null).map((_, i) => (
              <div key={`empty-${i}`} style={styles.dayCell} />
            ))}
            
            {/* Day cells */}
            {Array(daysInMonth).fill(null).map((_, i) => {
              const day = i + 1;
              const practiced = isPracticed(day);
              const today = isToday(day);
              
              return (
                <div key={day} style={{
                  ...styles.dayCell,
                  background: practiced ? theme.primary : (today ? '#E8F5E9' : 'transparent'),
                  color: practiced ? '#fff' : theme.text,
                  border: today ? `2px solid ${theme.primary}` : 'none'
                }}>
                  {day}
                  {practiced && <span style={styles.checkDot}>✓</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div style={styles.legend}>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendDot, background: theme.primary }} />
            <span>Practiced</span>
          </div>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendDot, border: `2px solid ${theme.primary}`, background: '#E8F5E9' }} />
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to mark today as practiced
export function markPracticed() {
  const history = JSON.parse(localStorage.getItem('fluidez_practice_history') || '[]');
  const today = new Date().toDateString();
  if (!history.includes(today)) {
    history.push(today);
    localStorage.setItem('fluidez_practice_history', JSON.stringify(history));
  }
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  header: { background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { margin: 0, fontSize: 18 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' },
  content: { padding: 16 },
  statsRow: { display: 'flex', gap: 10, marginBottom: 20 },
  statCard: { flex: 1, background: theme.surface, borderRadius: 12, padding: 12, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  statIcon: { display: 'block', fontSize: 20, marginBottom: 4 },
  statValue: { display: 'block', fontSize: 24, fontWeight: 700, color: theme.primary },
  statLabel: { fontSize: 11, color: theme.textLight },
  calendar: { background: theme.surface, borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  monthNav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  navBtn: { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', padding: 8, color: theme.primary },
  monthTitle: { fontSize: 16, fontWeight: 600 },
  dayHeaders: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 8 },
  dayHeader: { textAlign: 'center', fontSize: 12, color: theme.textLight, fontWeight: 500 },
  calendarGrid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 },
  dayCell: { aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 8, fontSize: 14, position: 'relative' },
  checkDot: { fontSize: 8, marginTop: 2 },
  legend: { display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16 },
  legendItem: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: theme.textLight },
  legendDot: { width: 16, height: 16, borderRadius: 4 }
};
