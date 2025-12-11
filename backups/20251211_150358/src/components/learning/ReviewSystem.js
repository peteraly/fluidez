import React, { useState, useEffect, useCallback } from 'react';
import { calculateNextReview, getDueItems, getReviewStats } from '../../utils/srsEngine';
import SuccessAnimation from '../feedback/SuccessAnimation';

/**
 * Spaced Repetition Review System
 * From Matrix: Rank #1 - Impact 10 - CRITICAL
 * SM-2 Algorithm: 1d → 3d → 7d → 14d → 30d intervals
 */

const STORAGE_KEY = 'fluidez_srs_items';

const ReviewSystem = ({ vocabulary = [], onClose, onComplete }) => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0 });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Load SRS data
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let srsData = stored ? JSON.parse(stored) : {};
    
    // Merge vocabulary with SRS data
    const merged = vocabulary.map(word => ({
      ...word,
      ...(srsData[word.spanish] || {}),
      id: word.spanish
    }));
    
    // Get due items (max 20 per session)
    const due = getDueItems(merged).slice(0, 20);
    
    if (due.length === 0) {
      // Add new items if no reviews due
      const newItems = merged.filter(i => !i.dueDate).slice(0, 10);
      setItems(newItems);
    } else {
      setItems(due);
    }
  }, [vocabulary]);
  
  const currentItem = items[currentIndex];
  const stats = getReviewStats(items);
  
  const handleRating = useCallback((quality) => {
    if (!currentItem) return;
    
    // Update item with SRS algorithm
    const updated = calculateNextReview(currentItem, quality);
    
    // Save to localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    const srsData = stored ? JSON.parse(stored) : {};
    srsData[currentItem.spanish] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(srsData));
    
    // Update session stats
    setSessionStats(prev => ({
      reviewed: prev.reviewed + 1,
      correct: prev.correct + (quality >= 3 ? 1 : 0)
    }));
    
    // Show brief success flash for correct
    if (quality >= 3) {
      // Visual feedback
    }
    
    // Move to next or complete
    setShowAnswer(false);
    if (currentIndex >= items.length - 1) {
      setIsComplete(true);
      setShowSuccess(true);
      setTimeout(() => {
        onComplete?.(sessionStats);
      }, 2500);
    } else {
      setCurrentIndex(i => i + 1);
    }
  }, [currentItem, currentIndex, items.length, sessionStats, onComplete]);
  
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'es-ES';
      utter.rate = 0.85;
      speechSynthesis.speak(utter);
    }
  };
  
  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: 40 }}>
          <span style={{ fontSize: 64 }}>✨</span>
          <h2 style={{ marginTop: 16 }}>All caught up!</h2>
          <p style={{ color: '#666' }}>No reviews due right now</p>
          <button onClick={onClose} style={{
            marginTop: 20,
            padding: '12px 24px',
            background: '#2D5A27',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer'
          }}>
            Back to Lesson
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA' }}>
      <SuccessAnimation 
        show={showSuccess}
        type="standard"
        message={`${sessionStats.correct}/${sessionStats.reviewed} correct!`}
        xpGain={sessionStats.correct * 10}
      />
      
      {/* Header */}
      <div style={{
        background: '#7B1FA2',
        color: '#fff',
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: 8,
          cursor: 'pointer'
        }}>
          ← Back
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Review</div>
          <div style={{ fontWeight: 600 }}>{currentIndex + 1} of {items.length}</div>
        </div>
        <div style={{ fontSize: 14 }}>
          {sessionStats.correct}/{sessionStats.reviewed} ✓
        </div>
      </div>
      
      {/* Progress bar */}
      <div style={{ height: 4, background: 'rgba(123, 31, 162, 0.2)' }}>
        <div style={{
          height: '100%',
          background: '#7B1FA2',
          width: `${((currentIndex + 1) / items.length) * 100}%`,
          transition: 'width 0.3s ease'
        }} />
      </div>
      
      {/* Card */}
      {currentItem && (
        <div style={{ padding: 20 }}>
          <div 
            onClick={() => !showAnswer && setShowAnswer(true)}
            style={{
              background: '#fff',
              borderRadius: 20,
              padding: 40,
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              cursor: !showAnswer ? 'pointer' : 'default'
            }}
          >
            {/* Spanish word */}
            <button 
              onClick={(e) => { e.stopPropagation(); speak(currentItem.spanish); }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginBottom: 8
              }}
            >
              <span style={{ fontSize: 36, fontWeight: 600, color: '#333' }}>
                🔊 {currentItem.spanish}
              </span>
            </button>
            
            {/* Answer */}
            {showAnswer ? (
              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <div style={{ height: 2, background: '#e0e0e0', width: 100, margin: '0 auto 20px' }} />
                <p style={{ fontSize: 24, color: '#666' }}>{currentItem.english}</p>
                
                {/* SRS info */}
                {currentItem.interval && (
                  <p style={{ fontSize: 12, color: '#999', marginTop: 10 }}>
                    Next review: {currentItem.interval} day{currentItem.interval > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            ) : (
              <p style={{ color: '#999', marginTop: 20 }}>Tap to reveal answer</p>
            )}
          </div>
          
          {/* Rating buttons */}
          {showAnswer && (
            <div style={{ marginTop: 24 }}>
              <p style={{ textAlign: 'center', color: '#666', fontSize: 14, marginBottom: 12 }}>
                How well did you know it?
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {[
                  { q: 1, label: 'Again', color: '#FF5722', days: '1d' },
                  { q: 2, label: 'Hard', color: '#FF9800', days: `${Math.max(1, Math.floor((currentItem.interval || 1) * 0.5))}d` },
                  { q: 3, label: 'Good', color: '#4CAF50', days: `${Math.round((currentItem.interval || 1) * (currentItem.ease || 2.5))}d` },
                  { q: 4, label: 'Easy', color: '#2196F3', days: `${Math.round((currentItem.interval || 1) * (currentItem.ease || 2.5) * 1.3)}d` }
                ].map(({ q, label, color, days }) => (
                  <button
                    key={q}
                    onClick={() => handleRating(q)}
                    style={{
                      padding: '12px 8px',
                      background: color,
                      color: '#fff',
                      border: 'none',
                      borderRadius: 10,
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontWeight: 600 }}>{label}</div>
                    <div style={{ fontSize: 11, opacity: 0.8 }}>{days}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewSystem;
