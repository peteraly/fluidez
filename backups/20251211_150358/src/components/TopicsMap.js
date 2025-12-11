import React, { useState, useEffect } from 'react';

// Available conversation topics
export const TOPICS = [
  { id: 'greetings', name: 'Greetings', emoji: '👋', color: '#4CAF50' },
  { id: 'food', name: 'Food & Dining', emoji: '🍽️', color: '#FF9800' },
  { id: 'travel', name: 'Travel', emoji: '✈️', color: '#2196F3' },
  { id: 'family', name: 'Family', emoji: '👨‍👩‍👧', color: '#E91E63' },
  { id: 'work', name: 'Work & Life', emoji: '💼', color: '#9C27B0' },
  { id: 'hobbies', name: 'Hobbies', emoji: '🎨', color: '#00BCD4' },
  { id: 'shopping', name: 'Shopping', emoji: '🛍️', color: '#FF5722' },
  { id: 'daily', name: 'Daily Life', emoji: '☀️', color: '#FFC107' },
  { id: 'opinions', name: 'Opinions', emoji: '💭', color: '#607D8B' },
  { id: 'weekend', name: 'Weekend Fun', emoji: '🎉', color: '#8BC34A' },
];

// Update topic stats after a conversation
export const updateTopicStats = (topicId) => {
  const stats = JSON.parse(localStorage.getItem('fluidez_topic_stats') || '{}');
  const now = new Date().toISOString();
  
  if (!stats[topicId]) {
    stats[topicId] = { count: 0, lastPracticed: null };
  }
  
  stats[topicId].count += 1;
  stats[topicId].lastPracticed = now;
  
  localStorage.setItem('fluidez_topic_stats', JSON.stringify(stats));
  return stats[topicId];
};

// Get topic stats
export const getTopicStats = () => {
  return JSON.parse(localStorage.getItem('fluidez_topic_stats') || '{}');
};

// Main component
const TopicsMap = ({ compact = false, onTopicSelect }) => {
  const [stats, setStats] = useState(getTopicStats());
  const [expanded, setExpanded] = useState(false);
  
  useEffect(() => {
    // Refresh stats periodically
    const interval = setInterval(() => {
      setStats(getTopicStats());
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const getTopicLevel = (topicId) => {
    const count = stats[topicId]?.count || 0;
    if (count >= 10) return 'strong';
    if (count >= 5) return 'growing';
    if (count >= 1) return 'started';
    return 'new';
  };
  
  const totalConversations = Object.values(stats).reduce((sum, s) => sum + (s.count || 0), 0);
  const activeTopics = Object.keys(stats).filter(k => stats[k]?.count > 0).length;
  
  const s = {
    container: {
      background: '#FFF',
      borderRadius: 16,
      padding: compact ? '16px' : '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    title: {
      margin: 0,
      fontSize: 16,
      fontWeight: 600,
      color: '#1a1a1a',
    },
    subtitle: {
      margin: 0,
      fontSize: 13,
      color: '#666',
    },
    statsRow: {
      display: 'flex',
      gap: 16,
      marginBottom: 16,
    },
    stat: {
      textAlign: 'center',
    },
    statValue: {
      fontSize: 24,
      fontWeight: 700,
      color: '#2D5A27',
    },
    statLabel: {
      fontSize: 11,
      color: '#888',
    },
    topicsGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
    },
    topicBubble: (level) => ({
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 12px',
      borderRadius: 20,
      fontSize: 13,
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s',
      background: level === 'new' ? '#f5f5f5' : 
                  level === 'started' ? '#E8F5E9' :
                  level === 'growing' ? '#C8E6C9' : '#A5D6A7',
      color: level === 'new' ? '#888' : '#2D5A27',
      border: level === 'new' ? '1px dashed #ccc' : 'none',
      opacity: level === 'new' ? 0.7 : 1,
    }),
    expandBtn: {
      background: 'none',
      border: 'none',
      color: '#2D5A27',
      fontSize: 13,
      cursor: 'pointer',
      padding: '4px 8px',
    },
  };
  
  const displayTopics = compact && !expanded ? TOPICS.slice(0, 6) : TOPICS;
  
  return (
    <div style={s.container}>
      <div style={s.header}>
        <div>
          <h3 style={s.title}>💬 Topics You Can Discuss</h3>
          <p style={s.subtitle}>Tap a topic to practice it</p>
        </div>
      </div>
      
      {!compact && (
        <div style={s.statsRow}>
          <div style={s.stat}>
            <div style={s.statValue}>{totalConversations}</div>
            <div style={s.statLabel}>Conversations</div>
          </div>
          <div style={s.stat}>
            <div style={s.statValue}>{activeTopics}/{TOPICS.length}</div>
            <div style={s.statLabel}>Topics Explored</div>
          </div>
        </div>
      )}
      
      <div style={s.topicsGrid}>
        {displayTopics.map(topic => {
          const level = getTopicLevel(topic.id);
          const count = stats[topic.id]?.count || 0;
          
          return (
            <div
              key={topic.id}
              style={s.topicBubble(level)}
              onClick={() => onTopicSelect && onTopicSelect(topic)}
              title={count > 0 ? `${count} conversation${count > 1 ? 's' : ''}` : 'Not practiced yet'}
            >
              <span>{topic.emoji}</span>
              <span>{topic.name}</span>
              {count > 0 && <span style={{ opacity: 0.7, fontSize: 11 }}>({count})</span>}
            </div>
          );
        })}
      </div>
      
      {compact && TOPICS.length > 6 && (
        <button style={s.expandBtn} onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less ↑' : `+${TOPICS.length - 6} more topics ↓`}
        </button>
      )}
    </div>
  );
};

export default TopicsMap;
