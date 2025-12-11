/**
 * VocabularyDisplay.js
 * 
 * Displays vocabulary from JSON files with categories and examples
 */

import React, { useState } from 'react';
import { getDayVocabulary } from '../curriculumLoader';

export default function VocabularyDisplay({ dayNum, onComplete }) {
  const [currentCategory, setCurrentCategory] = useState(0);
  const words = getDayVocabulary(dayNum);
  
  // Group by category
  const categories = {};
  words.forEach(word => {
    const cat = word.category || 'General';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(word);
  });
  
  const categoryNames = Object.keys(categories);
  const currentWords = categories[categoryNames[currentCategory]] || [];
  
  const styles = {
    container: {
      padding: '20px',
    },
    categoryTabs: {
      display: 'flex',
      gap: '8px',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    tab: {
      padding: '8px 16px',
      borderRadius: '20px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s',
    },
    activeTab: {
      background: '#059669',
      color: 'white',
    },
    inactiveTab: {
      background: '#E5E7EB',
      color: '#374151',
    },
    wordList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    wordCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    spanish: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#065F46',
    },
    english: {
      fontSize: '14px',
      color: '#6B7280',
      marginTop: '4px',
    },
    example: {
      fontSize: '13px',
      color: '#9CA3AF',
      marginTop: '8px',
      fontStyle: 'italic',
    },
    completeBtn: {
      marginTop: '20px',
      width: '100%',
      padding: '16px',
      background: 'linear-gradient(135deg, #059669, #10B981)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
    }
  };
  
  return (
    <div style={styles.container}>
      {categoryNames.length > 1 && (
        <div style={styles.categoryTabs}>
          {categoryNames.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setCurrentCategory(idx)}
              style={{
                ...styles.tab,
                ...(idx === currentCategory ? styles.activeTab : styles.inactiveTab)
              }}
            >
              {cat} ({categories[cat].length})
            </button>
          ))}
        </div>
      )}
      
      <div style={styles.wordList}>
        {currentWords.map((word, idx) => (
          <div key={idx} style={styles.wordCard}>
            <div style={styles.spanish}>🔊 {word.spanish}</div>
            <div style={styles.english}>{word.english}</div>
            {word.example && (
              <div style={styles.example}>"{word.example}"</div>
            )}
          </div>
        ))}
      </div>
      
      {currentCategory < categoryNames.length - 1 ? (
        <button 
          style={styles.completeBtn}
          onClick={() => setCurrentCategory(currentCategory + 1)}
        >
          Next: {categoryNames[currentCategory + 1]} →
        </button>
      ) : (
        <button 
          style={styles.completeBtn}
          onClick={onComplete}
        >
          Complete Vocabulary ✓
        </button>
      )}
    </div>
  );
}
