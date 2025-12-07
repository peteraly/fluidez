import React, { useState } from 'react';

const theme = {
  primary: '#2D5A27',
  primaryLight: '#4A7C43',
  bg: '#FAFAFA',
  surface: '#FFF',
  text: '#1A1A1A',
  textLight: '#666'
};

const STEPS = [
  {
    icon: '👋',
    title: '¡Bienvenido a Fluidez!',
    subtitle: 'Your personal Spanish tutor',
    description: 'Learn conversational Spanish in 30 days with AI-powered practice.'
  },
  {
    icon: '🎯',
    title: "What's your goal?",
    subtitle: 'We\'ll personalize your journey',
    options: [
      { id: 'travel', icon: '✈️', label: 'Travel' },
      { id: 'work', icon: '💼', label: 'Career' },
      { id: 'family', icon: '👨‍👩‍👧', label: 'Family' },
      { id: 'fun', icon: '🎉', label: 'Fun' }
    ]
  },
  {
    icon: '📊',
    title: "What's your level?",
    subtitle: 'Be honest - we\'ll help you improve!',
    options: [
      { id: 'beginner', icon: '🌱', label: 'Complete beginner' },
      { id: 'some', icon: '🌿', label: 'Know some basics' },
      { id: 'intermediate', icon: '🌳', label: 'Can have simple conversations' }
    ]
  },
  {
    icon: '⏰',
    title: 'Daily practice goal?',
    subtitle: 'Consistency is key!',
    options: [
      { id: '5', icon: '⚡', label: '5 min/day' },
      { id: '15', icon: '🔥', label: '15 min/day' },
      { id: '30', icon: '💪', label: '30 min/day' }
    ]
  },
  {
    icon: '🚀',
    title: "You're all set!",
    subtitle: 'Let\'s start learning',
    description: 'María, your AI tutor, is excited to help you learn Spanish!'
  }
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({});

  const currentStep = STEPS[step];
  const isLastStep = step === STEPS.length - 1;

  const handleSelect = (optionId) => {
    setSelections({ ...selections, [step]: optionId });
  };

  const handleNext = () => {
    if (isLastStep) {
      // Save preferences
      localStorage.setItem('fluidez_onboarded', 'true');
      localStorage.setItem('fluidez_preferences', JSON.stringify(selections));
      onComplete();
    } else {
      setStep(s => s + 1);
    }
  };

  const canContinue = !currentStep.options || selections[step];

  return (
    <div style={styles.container}>
      {/* Progress dots */}
      <div style={styles.progress}>
        {STEPS.map((_, i) => (
          <div key={i} style={{
            ...styles.dot,
            background: i <= step ? theme.primary : '#E0E0E0'
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.icon}>{currentStep.icon}</div>
        <h1 style={styles.title}>{currentStep.title}</h1>
        <p style={styles.subtitle}>{currentStep.subtitle}</p>

        {currentStep.description && (
          <p style={styles.description}>{currentStep.description}</p>
        )}

        {currentStep.options && (
          <div style={styles.options}>
            {currentStep.options.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                style={{
                  ...styles.optionBtn,
                  borderColor: selections[step] === opt.id ? theme.primary : '#E0E0E0',
                  background: selections[step] === opt.id ? '#E8F5E9' : theme.surface
                }}
              >
                <span style={{ fontSize: 24 }}>{opt.icon}</span>
                <span style={{ fontSize: 15 }}>{opt.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={styles.nav}>
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} style={styles.backBtn}>
            ← Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canContinue}
          style={{
            ...styles.nextBtn,
            opacity: canContinue ? 1 : 0.5
          }}
        >
          {isLastStep ? "Let's Go! 🚀" : 'Continue'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, padding: 24, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  progress: { display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40 },
  dot: { width: 10, height: 10, borderRadius: '50%', transition: 'background 0.3s' },
  content: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
  icon: { fontSize: 64, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 700, margin: '0 0 8px', color: theme.text },
  subtitle: { fontSize: 16, color: theme.textLight, margin: '0 0 24px' },
  description: { fontSize: 15, color: theme.textLight, lineHeight: 1.6, maxWidth: 300 },
  options: { display: 'flex', flexDirection: 'column', gap: 12, width: '100%', marginTop: 16 },
  optionBtn: { display: 'flex', alignItems: 'center', gap: 16, padding: 16, background: theme.surface, border: '2px solid #E0E0E0', borderRadius: 16, cursor: 'pointer', textAlign: 'left' },
  nav: { display: 'flex', gap: 12, marginTop: 24 },
  backBtn: { padding: '14px 24px', background: 'transparent', border: 'none', fontSize: 16, cursor: 'pointer', color: theme.textLight },
  nextBtn: { flex: 1, padding: '14px 24px', background: theme.primary, color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer' }
};
