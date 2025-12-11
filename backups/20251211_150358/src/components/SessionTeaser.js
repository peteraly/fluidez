import React from 'react';

const TEASERS = {
  1: { text: "Tomorrow: Learn to count to 100!", emoji: "🔢", hook: "Numbers open up so many conversations..." },
  2: { text: "Coming up: Meet your first Spanish family!", emoji: "👨‍👩‍👧‍👦", hook: "Family vocab is essential!" },
  3: { text: "Next: Describe anything with colors!", emoji: "🎨", hook: "Make your Spanish more vivid..." },
  4: { text: "Soon: Give your home a Spanish tour!", emoji: "🏠", hook: "Talk about where you live..." },
  5: { text: "Tomorrow: Demonstratives - point at anything!", emoji: "👆", hook: "Este, esta, esto..." },
  6: { text: "Next up: Order food like a local!", emoji: "🍽️", hook: "Restaurant Spanish is a game-changer..." },
  7: { text: "🎧 UNLOCKED: Shadowing Mode!", emoji: "🎉", hook: "Practice pronunciation with audio!" },
  8: { text: "Tomorrow: Tell time in Spanish!", emoji: "⏰", hook: "Never miss a meeting again..." },
  9: { text: "Coming: Master the days of the week!", emoji: "📅", hook: "Plan your vida in Spanish..." },
  10: { text: "Soon: Go shopping in Spanish!", emoji: "🛍️", hook: "¿Cuánto cuesta?" },
  11: { text: "Next: Talk about your body & health!", emoji: "💪", hook: "Essential for emergencies..." },
  12: { text: "Tomorrow: Give and get directions!", emoji: "🗺️", hook: "Never get lost again..." },
  13: { text: "Coming: Transportation vocabulary!", emoji: "🚗", hook: "Get around anywhere..." },
  14: { text: "✈️ TRAVEL MODE unlocking soon!", emoji: "🌎", hook: "Your Spanish adventure begins..." },
  15: { text: "Next: Daily routine - reflexive verbs!", emoji: "🌅", hook: "Me levanto, me ducho..." },
  16: { text: "Tomorrow: Work & professions!", emoji: "💼", hook: "What do you do?" },
  17: { text: "Coming: Hobbies & gustar!", emoji: "⚽", hook: "Talk about what you love..." },
  18: { text: "Next: Past tense - tell stories!", emoji: "📖", hook: "Ayer, la semana pasada..." },
  19: { text: "Tomorrow: More past tense!", emoji: "⏮️", hook: "Complete the picture..." },
  20: { text: "👶 Unlock: Talk about childhood!", emoji: "🎈", hook: "Cuando era niño..." },
  21: { text: "Next: Plan your travels!", emoji: "✈️", hook: "Voy a viajar a..." },
  22: { text: "Tomorrow: Hotel conversations!", emoji: "🏨", hook: "Book like a pro..." },
  23: { text: "Coming: Sightseeing vocabulary!", emoji: "📸", hook: "Explore in Spanish..." },
  24: { text: "Next: Handle emergencies!", emoji: "🚨", hook: "Important safety vocab..." },
  25: { text: "Tomorrow: Technology & present perfect!", emoji: "📱", hook: "He aprendido mucho..." },
  26: { text: "💭 Unlock: Express opinions!", emoji: "🗣️", hook: "Creo que, pienso que..." },
  27: { text: "Next: Subjunctive introduction!", emoji: "✨", hook: "Advanced grammar unlocked..." },
  28: { text: "Tomorrow: Hypotheticals!", emoji: "🤔", hook: "Si pudiera..." },
  29: { text: "Coming: Master storytelling!", emoji: "📚", hook: "Put it all together..." },
  30: { text: "🏆 FINAL DAY: You made it!", emoji: "🎊", hook: "Celebrate your journey!" }
};

const SessionTeaser = ({ currentDay, onDismiss, onRemind }) => {
  const teaser = TEASERS[currentDay] || TEASERS[1];

  return (
    <div className="session-teaser-overlay">
      <div className="session-teaser-card">
        <div className="teaser-celebration">
          <span className="teaser-emoji">{teaser.emoji}</span>
          <h3>Great session! 🌟</h3>
        </div>
        
        <div className="teaser-content">
          <p className="teaser-main">{teaser.text}</p>
          <p className="teaser-hook">{teaser.hook}</p>
        </div>

        <div className="teaser-actions">
          <button onClick={onDismiss} className="teaser-primary">
            Can't wait! 😊
          </button>
          <button onClick={onRemind} className="teaser-secondary">
            🔔 Remind me tomorrow
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionTeaser;
