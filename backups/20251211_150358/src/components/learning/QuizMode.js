import React, { useState, useEffect, useCallback } from 'react';
import { FlowEngine } from '../../utils/flowEngine';
import ErrorState from '../feedback/ErrorState';
import SuccessAnimation from '../feedback/SuccessAnimation';

/**
 * Quiz Mode with Active Recall
 * From Matrix: Rank #7 - Impact 9 - Testing Effect
 * Retrieval practice strengthens memory more than restudying
 */

const QuizMode = ({ items, onComplete, onExit }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [flowEngine] = useState(() => new FlowEngine());
  
  // Generate quiz questions
  useEffect(() => {
    if (items && items.length > 0) {
      const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, 15);
      const qs = shuffled.map((item, i) => ({
        ...item,
        format: getQuestionFormat(item, i),
        distractors: generateDistractors(item, items)
      }));
      setQuestions(qs);
    }
  }, [items]);
  
  const currentQuestion = questions[currentIndex];
  
  const checkAnswer = useCallback(() => {
    if (!currentQuestion) return;
    
    const correct = normalizeAnswer(userAnswer) === normalizeAnswer(currentQuestion.english);
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(s => s + getPoints(currentQuestion.format, streak));
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
    
    flowEngine.recordAttempt(correct);
  }, [currentQuestion, userAnswer, streak, flowEngine]);
  
  const nextQuestion = useCallback(() => {
    setShowResult(false);
    setUserAnswer('');
    
    if (currentIndex >= questions.length - 1) {
      // Quiz complete
      setShowSuccess(true);
      setTimeout(() => {
        onComplete?.({ score, total: questions.length, correct: score });
      }, 2500);
    } else {
      setCurrentIndex(i => i + 1);
    }
  }, [currentIndex, questions.length, score, onComplete]);
  
  const handleMultipleChoice = (answer) => {
    setUserAnswer(answer);
    setTimeout(() => {
      const correct = normalizeAnswer(answer) === normalizeAnswer(currentQuestion.english);
      setIsCorrect(correct);
      setShowResult(true);
      
      if (correct) {
        setScore(s => s + 10);
        setStreak(s => s + 1);
      } else {
        setStreak(0);
      }
      
      flowEngine.recordAttempt(correct);
    }, 100);
  };
  
  if (!currentQuestion) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p>Loading quiz...</p>
      </div>
    );
  }
  
  const isMultipleChoice = currentQuestion.format === 'multiple_choice';
  
  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', paddingBottom: 100 }}>
      <SuccessAnimation 
        show={showSuccess} 
        type="standard" 
        xpGain={score}
        message={`${score} points!`}
      />
      
      {/* Header */}
      <div style={{
        background: '#2D5A27',
        color: '#fff',
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button 
          onClick={onExit}
          style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }}
        >
          ✕ Exit
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Question {currentIndex + 1} of {questions.length}</div>
          <div style={{ fontWeight: 600 }}>Score: {score}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {streak > 2 && <span>🔥</span>}
          <span style={{ fontWeight: 600 }}>{streak}</span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div style={{ height: 4, background: '#e0e0e0' }}>
        <div style={{
          height: '100%',
          background: '#4CAF50',
          width: `${((currentIndex + 1) / questions.length) * 100}%`,
          transition: 'width 0.3s ease'
        }} />
      </div>
      
      {/* Question */}
      <div style={{ padding: 20 }}>
        <div style={{
          background: '#fff',
          borderRadius: 16,
          padding: 24,
          marginBottom: 20,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <p style={{ color: '#666', fontSize: 14, marginBottom: 8 }}>
            {isMultipleChoice ? 'What does this mean?' : 'Type the English translation:'}
          </p>
          <h2 style={{ fontSize: 28, fontWeight: 600, color: '#333', margin: 0 }}>
            {currentQuestion.spanish}
          </h2>
        </div>
        
        {!showResult ? (
          <>
            {isMultipleChoice ? (
              <div style={{ display: 'grid', gap: 12 }}>
                {currentQuestion.distractors.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleMultipleChoice(option)}
                    style={{
                      padding: 16,
                      background: '#fff',
                      border: '2px solid #e0e0e0',
                      borderRadius: 12,
                      fontSize: 16,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && userAnswer && checkAnswer()}
                  placeholder="Type your answer..."
                  autoFocus
                  style={{
                    width: '100%',
                    padding: 16,
                    fontSize: 18,
                    border: '2px solid #e0e0e0',
                    borderRadius: 12,
                    outline: 'none',
                    marginBottom: 16
                  }}
                />
                <button
                  onClick={checkAnswer}
                  disabled={!userAnswer}
                  style={{
                    width: '100%',
                    padding: 16,
                    background: userAnswer ? '#2D5A27' : '#ccc',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: userAnswer ? 'pointer' : 'not-allowed'
                  }}
                >
                  Check
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {isCorrect ? (
              <div style={{
                background: 'rgba(76, 175, 80, 0.1)',
                border: '2px solid #4CAF50',
                borderRadius: 16,
                padding: 20,
                textAlign: 'center',
                marginBottom: 20
              }}>
                <span style={{ fontSize: 40 }}>✓</span>
                <p style={{ fontSize: 18, fontWeight: 600, color: '#4CAF50', margin: '10px 0 0' }}>
                  Correct! +{getPoints(currentQuestion.format, streak - 1)} points
                </p>
              </div>
            ) : (
              <ErrorState
                userAnswer={userAnswer}
                correctAnswer={currentQuestion.english}
                onContinue={nextQuestion}
                onPlayAudio={() => {
                  const utter = new SpeechSynthesisUtterance(currentQuestion.spanish);
                  utter.lang = 'es-ES';
                  speechSynthesis.speak(utter);
                }}
              />
            )}
            
            {isCorrect && (
              <button
                onClick={nextQuestion}
                style={{
                  width: '100%',
                  padding: 16,
                  background: '#2D5A27',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {currentIndex >= questions.length - 1 ? 'Finish Quiz' : 'Next Question →'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Helper functions
function getQuestionFormat(item, index) {
  // Start with multiple choice, progress to typing
  if (index < 5) return 'multiple_choice';
  if (index < 10) return Math.random() > 0.5 ? 'multiple_choice' : 'type';
  return 'type';
}

function generateDistractors(item, allItems) {
  const others = allItems.filter(i => i.spanish !== item.spanish);
  const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [item.english, ...shuffled.map(i => i.english)];
  return options.sort(() => Math.random() - 0.5);
}

function normalizeAnswer(answer) {
  return (answer || '').toLowerCase().trim().replace(/[¡¿!?.,]/g, '');
}

function getPoints(format, streak) {
  const base = format === 'type' ? 20 : 10;
  const bonus = Math.min(streak, 5) * 2;
  return base + bonus;
}

export default QuizMode;
