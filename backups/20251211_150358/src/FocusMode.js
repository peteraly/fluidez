import React, { useState } from 'react';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

export default function FocusMode({ onSelectFeature, onBack }) {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const dailyPlans = [
    {
      id: 'quick',
      title: '⚡ Quick Practice',
      duration: '5 min',
      description: 'Perfect for busy days',
      steps: [
        { feature: 'lesson', name: 'Quick Lesson Review', time: '2 min' },
        { feature: 'voice', name: 'Voice Chat', time: '3 min' }
      ]
    },
    {
      id: 'standard',
      title: '📚 Standard Session',
      duration: '15 min',
      description: 'Recommended daily practice',
      steps: [
        { feature: 'lesson', name: 'Today\'s Lesson', time: '5 min' },
        { feature: 'roleplay', name: 'Roleplay Practice', time: '5 min' },
        { feature: 'voice', name: 'Free Conversation', time: '5 min' }
      ]
    },
    {
      id: 'deep',
      title: '🏋️ Deep Dive',
      duration: '30 min',
      description: 'Maximum fluency gains',
      steps: [
        { feature: 'lesson', name: 'Full Lesson', time: '10 min' },
        { feature: 'grammar', name: 'Grammar Drills', time: '5 min' },
        { feature: 'roleplay', name: 'Roleplay Scenario', time: '10 min' },
        { feature: 'voice', name: 'Voice Chat', time: '5 min' }
      ]
    }
  ];

  if (selectedPlan) {
    const plan = dailyPlans.find(p => p.id === selectedPlan);
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => setSelectedPlan(null)} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>{plan.title}</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={styles.content}>
          <div style={styles.planHeader}>
            <span style={styles.duration}>{plan.duration}</span>
            <p style={{ color: theme.textLight, margin: 0 }}>{plan.description}</p>
          </div>
          
          <h3 style={{ margin: '24px 0 12px' }}>Today's Flow:</h3>
          <div style={styles.stepList}>
            {plan.steps.map((step, i) => (
              <button 
                key={i} 
                onClick={() => onSelectFeature(step.feature)}
                style={styles.stepCard}
              >
                <span style={styles.stepNumber}>{i + 1}</span>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontWeight: 600 }}>{step.name}</div>
                  <div style={{ fontSize: 12, color: theme.textLight }}>{step.time}</div>
                </div>
                <span>→</span>
              </button>
            ))}
          </div>

          <div style={styles.tip}>
            💡 Complete all steps for maximum fluency gains!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>🎯 Focus Mode</h2>
        <div style={{ width: 40 }} />
      </div>
      <div style={styles.content}>
        <p style={{ color: theme.textLight, textAlign: 'center', marginBottom: 20 }}>
          Choose your daily practice intensity
        </p>
        
        {dailyPlans.map(plan => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            style={styles.planCard}
          >
            <div style={{ flex: 1, textAlign: 'left' }}>
              <h3 style={{ margin: '0 0 4px' }}>{plan.title}</h3>
              <p style={{ margin: 0, color: theme.textLight, fontSize: 14 }}>
                {plan.description}
              </p>
            </div>
            <div style={styles.durationBadge}>{plan.duration}</div>
          </button>
        ))}

        <div style={styles.infoCard}>
          <h4 style={{ margin: '0 0 8px' }}>🔥 Pro Tip</h4>
          <p style={{ margin: 0, color: theme.textLight, fontSize: 14 }}>
            Consistency beats intensity. 15 minutes daily is better than 2 hours once a week!
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  header: { background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { margin: 0, fontSize: 18 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' },
  content: { padding: 20 },
  planCard: { display: 'flex', alignItems: 'center', width: '100%', background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 20, marginBottom: 12, cursor: 'pointer', textAlign: 'left' },
  durationBadge: { background: theme.primary, color: '#fff', padding: '6px 14px', borderRadius: 20, fontSize: 14, fontWeight: 600 },
  planHeader: { background: theme.surface, padding: 20, borderRadius: 16, textAlign: 'center', border: `1px solid ${theme.border}` },
  duration: { fontSize: 32, fontWeight: 700, color: theme.primary },
  stepList: { display: 'flex', flexDirection: 'column', gap: 12 },
  stepCard: { display: 'flex', alignItems: 'center', gap: 12, width: '100%', background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 16, cursor: 'pointer' },
  stepNumber: { width: 28, height: 28, borderRadius: '50%', background: theme.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600 },
  tip: { background: '#E8F5E9', padding: 16, borderRadius: 12, marginTop: 24, textAlign: 'center' },
  infoCard: { background: theme.surface, padding: 20, borderRadius: 16, marginTop: 24, border: `1px solid ${theme.border}` }
};
