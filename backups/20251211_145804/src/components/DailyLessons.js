/**
 * DailyLessons.js
 * 
 * Browse all 30 days of the Spanish curriculum.
 * Shows progress, allows navigation to any day, and provides lesson details.
 */

import React, { useState, useEffect } from 'react';
import { CURRICULUM, getDayContent, getWeekContent } from '../data/SpanishCurriculum30Day';

// Get completed days from localStorage
const getCompletedDays = () => {
  try {
    return JSON.parse(localStorage.getItem('fluidez_completed_days') || '[]');
  } catch {
    return [];
  }
};

const saveCompletedDay = (day) => {
  const completed = getCompletedDays();
  if (!completed.includes(day)) {
    completed.push(day);
    localStorage.setItem('fluidez_completed_days', JSON.stringify(completed));
  }
};

// Week labels with themes
const WEEKS = [
  { week: 1, name: "Foundations", emoji: "🌱", description: "Greetings, numbers, essential verbs" },
  { week: 2, name: "Daily Life", emoji: "🏠", description: "Family, time, food, restaurants" },
  { week: 3, name: "Practical Skills", emoji: "🗺️", description: "Directions, shopping, past tense" },
  { week: 4, name: "Fluency", emoji: "🚀", description: "Opinions, stories, advanced conversation" },
];

export default function DailyLessons({ onBack, onStartDay, currentDay = 1 }) {
  const [completedDays, setCompletedDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [expandedWeek, setExpandedWeek] = useState(1);

  useEffect(() => {
    setCompletedDays(getCompletedDays());
    // Expand the week containing current day
    setExpandedWeek(Math.ceil(currentDay / 7));
  }, [currentDay]);

  const isDayUnlocked = (dayNum) => {
    // Day 1 always unlocked, others unlock when previous is completed OR if it's current day or earlier
    return dayNum === 1 || 
           completedDays.includes(dayNum - 1) || 
           dayNum <= currentDay;
  };

  const isDayCompleted = (dayNum) => completedDays.includes(dayNum);

  const handleDayClick = (dayNum) => {
    if (isDayUnlocked(dayNum)) {
      setSelectedDay(selectedDay === dayNum ? null : dayNum);
    }
  };

  const handleStartLesson = (dayNum) => {
    if (onStartDay) {
      onStartDay(dayNum);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #065F46 0%, #047857 50%, #10B981 100%)',
      padding: '20px',
      paddingBottom: '100px',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    backButton: {
      background: 'rgba(255,255,255,0.2)',
      border: 'none',
      color: 'white',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      fontSize: '20px',
      cursor: 'pointer',
      marginRight: '15px',
    },
    title: {
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    subtitle: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: '14px',
    },
    progressCard: {
      background: 'rgba(255,255,255,0.15)',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '20px',
      backdropFilter: 'blur(10px)',
    },
    progressBar: {
      height: '8px',
      background: 'rgba(255,255,255,0.3)',
      borderRadius: '4px',
      overflow: 'hidden',
      marginTop: '10px',
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #FCD34D, #FBBF24)',
      borderRadius: '4px',
      transition: 'width 0.3s ease',
    },
    weekCard: {
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '16px',
      marginBottom: '15px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    },
    weekHeader: {
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
    },
    weekTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#065F46',
    },
    weekDescription: {
      fontSize: '12px',
      color: '#6B7280',
      marginTop: '2px',
    },
    weekProgress: {
      fontSize: '13px',
      color: '#059669',
      fontWeight: '500',
    },
    daysList: {
      padding: '10px',
    },
    dayItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 15px',
      borderRadius: '12px',
      marginBottom: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    dayItemUnlocked: {
      background: '#F9FAFB',
    },
    dayItemLocked: {
      background: '#F3F4F6',
      opacity: 0.6,
    },
    dayItemSelected: {
      background: '#ECFDF5',
      border: '2px solid #10B981',
    },
    dayItemCompleted: {
      background: '#F0FDF4',
    },
    dayNumber: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '600',
      marginRight: '12px',
    },
    dayNumberUnlocked: {
      background: '#E5E7EB',
      color: '#374151',
    },
    dayNumberCompleted: {
      background: '#10B981',
      color: 'white',
    },
    dayNumberLocked: {
      background: '#D1D5DB',
      color: '#9CA3AF',
    },
    dayNumberCurrent: {
      background: 'linear-gradient(135deg, #FCD34D, #FBBF24)',
      color: '#78350F',
    },
    dayInfo: {
      flex: 1,
    },
    dayTitle: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#1F2937',
    },
    dayFocus: {
      fontSize: '12px',
      color: '#6B7280',
      marginTop: '2px',
    },
    dayStatus: {
      fontSize: '18px',
    },
    expandedContent: {
      padding: '15px',
      background: '#F9FAFB',
      borderTop: '1px solid #E5E7EB',
    },
    vocabPreview: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '15px',
    },
    vocabChip: {
      background: '#ECFDF5',
      color: '#065F46',
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '12px',
    },
    grammarTitle: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '5px',
    },
    grammarText: {
      fontSize: '12px',
      color: '#6B7280',
      marginBottom: '15px',
    },
    startButton: {
      width: '100%',
      padding: '12px',
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    culturalNote: {
      background: '#FEF3C7',
      padding: '10px 12px',
      borderRadius: '8px',
      fontSize: '12px',
      color: '#92400E',
      marginTop: '10px',
    },
  };

  const totalCompleted = completedDays.length;
  const progressPercent = (totalCompleted / 30) * 100;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>←</button>
        <div>
          <div style={styles.title}>Daily Lessons</div>
          <div style={styles.subtitle}>30-day path to Spanish fluency</div>
        </div>
      </div>

      {/* Progress Overview */}
      <div style={styles.progressCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
          <span style={{ fontSize: '14px' }}>Your Progress</span>
          <span style={{ fontWeight: '600' }}>{totalCompleted}/30 days</span>
        </div>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progressPercent}%` }} />
        </div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', marginTop: '8px' }}>
          {totalCompleted === 0 ? "Start your journey today! 🌟" :
           totalCompleted < 7 ? "Great start! Keep the momentum going 💪" :
           totalCompleted < 14 ? "Week 1 complete! You're building a foundation 🏗️" :
           totalCompleted < 21 ? "Halfway there! Your Spanish is growing 🌱" :
           totalCompleted < 30 ? "Almost fluent! The finish line is in sight 🎯" :
           "¡Felicidades! You've completed the journey! 🎉"}
        </div>
      </div>

      {/* Weeks */}
      {WEEKS.map(({ week, name, emoji, description }) => {
        const weekDays = getWeekContent(week);
        const weekCompleted = weekDays.filter(d => isDayCompleted(d.day)).length;
        const isExpanded = expandedWeek === week;

        return (
          <div key={week} style={styles.weekCard}>
            <div 
              style={styles.weekHeader}
              onClick={() => setExpandedWeek(isExpanded ? null : week)}
            >
              <div>
                <div style={styles.weekTitle}>{emoji} Week {week}: {name}</div>
                <div style={styles.weekDescription}>{description}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={styles.weekProgress}>{weekCompleted}/7</span>
                <span style={{ fontSize: '18px', color: '#9CA3AF' }}>
                  {isExpanded ? '▼' : '▶'}
                </span>
              </div>
            </div>

            {isExpanded && (
              <div style={styles.daysList}>
                {weekDays.map((dayData) => {
                  const dayNum = dayData.day;
                  const unlocked = isDayUnlocked(dayNum);
                  const completed = isDayCompleted(dayNum);
                  const isCurrent = dayNum === currentDay;
                  const isSelected = selectedDay === dayNum;

                  return (
                    <div key={dayNum}>
                      <div
                        style={{
                          ...styles.dayItem,
                          ...(isSelected ? styles.dayItemSelected :
                              completed ? styles.dayItemCompleted :
                              unlocked ? styles.dayItemUnlocked : styles.dayItemLocked),
                        }}
                        onClick={() => handleDayClick(dayNum)}
                      >
                        <div style={{
                          ...styles.dayNumber,
                          ...(completed ? styles.dayNumberCompleted :
                              isCurrent ? styles.dayNumberCurrent :
                              unlocked ? styles.dayNumberUnlocked : styles.dayNumberLocked),
                        }}>
                          {completed ? '✓' : dayNum}
                        </div>
                        <div style={styles.dayInfo}>
                          <div style={styles.dayTitle}>{dayData.title}</div>
                          <div style={styles.dayFocus}>{dayData.focus} • {dayData.vocab?.length || 0} words</div>
                        </div>
                        <div style={styles.dayStatus}>
                          {completed ? '✅' : isCurrent ? '📍' : unlocked ? '→' : '🔒'}
                        </div>
                      </div>

                      {/* Expanded Day Details */}
                      {isSelected && unlocked && (
                        <div style={styles.expandedContent}>
                          {/* Vocab Preview */}
                          {dayData.vocab && dayData.vocab.length > 0 && (
                            <>
                              <div style={styles.grammarTitle}>📚 Vocabulary Preview</div>
                              <div style={styles.vocabPreview}>
                                {dayData.vocab.slice(0, 8).map((word, i) => (
                                  <span key={i} style={styles.vocabChip}>
                                    {word.spanish}
                                  </span>
                                ))}
                                {dayData.vocab.length > 8 && (
                                  <span style={styles.vocabChip}>+{dayData.vocab.length - 8} more</span>
                                )}
                              </div>
                            </>
                          )}

                          {/* Grammar Focus */}
                          {dayData.grammar && (
                            <>
                              <div style={styles.grammarTitle}>📖 {dayData.grammar.title}</div>
                              <div style={styles.grammarText}>{dayData.grammar.explanation}</div>
                            </>
                          )}

                          {/* Key Phrases */}
                          {dayData.phrases && dayData.phrases.length > 0 && (
                            <>
                              <div style={styles.grammarTitle}>💬 Key Phrases</div>
                              <div style={styles.vocabPreview}>
                                {dayData.phrases.slice(0, 4).map((phrase, i) => (
                                  <span key={i} style={styles.vocabChip}>
                                    {phrase.spanish}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}

                          {/* Cultural Note */}
                          {dayData.culturalNote && (
                            <div style={styles.culturalNote}>
                              💡 {dayData.culturalNote}
                            </div>
                          )}

                          {/* Start Button */}
                          <button 
                            style={styles.startButton}
                            onClick={() => handleStartLesson(dayNum)}
                          >
                            {completed ? '🔄 Review Day ' : '▶️ Start Day '}{dayNum}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Export helper to mark day as complete
export { saveCompletedDay, getCompletedDays };
