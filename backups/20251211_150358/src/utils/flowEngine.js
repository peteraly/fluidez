/**
 * Flow State Difficulty Engine
 * From Matrix: Rank #5 - Impact 10 - Flow State
 * Target: 65-80% success rate for optimal learning
 */

const TARGET_SUCCESS_RATE = 0.72;
const ADJUSTMENT_THRESHOLD = 0.10;
const ROLLING_WINDOW = 20;

export class FlowEngine {
  constructor() {
    this.attempts = [];
    this.currentDifficulty = 2; // 1=Easy, 2=Medium, 3=Hard
  }
  
  recordAttempt(correct) {
    this.attempts.push({ correct, timestamp: Date.now() });
    if (this.attempts.length > ROLLING_WINDOW) {
      this.attempts.shift();
    }
    return this.shouldAdjust();
  }
  
  getSuccessRate() {
    if (this.attempts.length < 5) return TARGET_SUCCESS_RATE;
    const correct = this.attempts.filter(a => a.correct).length;
    return correct / this.attempts.length;
  }
  
  shouldAdjust() {
    const rate = this.getSuccessRate();
    const deviation = Math.abs(rate - TARGET_SUCCESS_RATE);
    
    if (deviation > ADJUSTMENT_THRESHOLD) {
      if (rate > 0.85) {
        this.currentDifficulty = Math.min(3, this.currentDifficulty + 1);
        return { action: 'increase', message: "You're doing great! Let's try something harder." };
      } else if (rate < 0.55) {
        this.currentDifficulty = Math.max(1, this.currentDifficulty - 1);
        return { action: 'decrease', message: "Let's try something a bit easier." };
      }
    }
    return null;
  }
  
  getDifficultySettings() {
    const settings = {
      1: { hints: 'full', audioSpeed: 0.8, timeLimit: null, label: 'Practice' },
      2: { hints: 'partial', audioSpeed: 1.0, timeLimit: 30, label: 'Challenge' },
      3: { hints: 'none', audioSpeed: 1.1, timeLimit: 20, label: 'Master' }
    };
    return settings[this.currentDifficulty];
  }
  
  isInFlow() {
    const rate = this.getSuccessRate();
    return rate >= 0.65 && rate <= 0.80;
  }
  
  getFlowScore() {
    const rate = this.getSuccessRate();
    // Perfect flow at 72%, decreases as you move away
    return Math.max(0, 1 - Math.abs(rate - TARGET_SUCCESS_RATE) * 5);
  }
}
