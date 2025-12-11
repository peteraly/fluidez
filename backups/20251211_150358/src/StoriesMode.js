import React, { useState } from 'react';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', success: '#228B22', error: '#CD5C5C', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

const STORIES = [
  {
    id: 'cafe',
    icon: '☕',
    title: 'Un Café en Madrid',
    level: 'A1',
    readTime: '2 min',
    paragraphs: [
      {
        spanish: 'María camina por las calles de Madrid. Es una mañana bonita de primavera. El sol brilla y los pájaros cantan.',
        english: 'María walks through the streets of Madrid. It is a beautiful spring morning. The sun shines and the birds sing.',
        vocab: [
          { word: 'camina', meaning: 'walks' },
          { word: 'calles', meaning: 'streets' },
          { word: 'mañana', meaning: 'morning' },
          { word: 'sol', meaning: 'sun' },
          { word: 'brilla', meaning: 'shines' }
        ]
      },
      {
        spanish: 'Ella entra en una cafetería pequeña. "Buenos días", dice el camarero con una sonrisa. "¿Qué desea?"',
        english: 'She enters a small café. "Good morning", says the waiter with a smile. "What would you like?"',
        vocab: [
          { word: 'entra', meaning: 'enters' },
          { word: 'cafetería', meaning: 'café' },
          { word: 'camarero', meaning: 'waiter' },
          { word: 'sonrisa', meaning: 'smile' },
          { word: 'desea', meaning: 'would like' }
        ]
      },
      {
        spanish: '"Un café con leche, por favor", responde María. Se sienta cerca de la ventana y mira a la gente pasar.',
        english: '"A coffee with milk, please", María responds. She sits near the window and watches the people pass by.',
        vocab: [
          { word: 'leche', meaning: 'milk' },
          { word: 'responde', meaning: 'responds' },
          { word: 'sienta', meaning: 'sits' },
          { word: 'ventana', meaning: 'window' },
          { word: 'gente', meaning: 'people' }
        ]
      }
    ],
    questions: [
      { q: '¿Dónde camina María?', a: 'Madrid', options: ['Barcelona', 'Madrid', 'Sevilla', 'Valencia'] },
      { q: '¿Qué tiempo hace?', a: 'Sol', options: ['Lluvia', 'Nieve', 'Sol', 'Viento'] },
      { q: '¿Qué pide María?', a: 'Café con leche', options: ['Té', 'Agua', 'Café con leche', 'Zumo'] }
    ]
  },
  {
    id: 'mercado',
    icon: '🍎',
    title: 'En el Mercado',
    level: 'A1',
    readTime: '2 min',
    paragraphs: [
      {
        spanish: 'Pedro va al mercado todos los sábados. Le gusta comprar frutas y verduras frescas. El mercado está lleno de colores y olores.',
        english: 'Pedro goes to the market every Saturday. He likes to buy fresh fruits and vegetables. The market is full of colors and smells.',
        vocab: [
          { word: 'mercado', meaning: 'market' },
          { word: 'sábados', meaning: 'Saturdays' },
          { word: 'frutas', meaning: 'fruits' },
          { word: 'verduras', meaning: 'vegetables' },
          { word: 'frescas', meaning: 'fresh' }
        ]
      },
      {
        spanish: '"¡Hola, Pedro!" dice la vendedora. "Tengo naranjas muy dulces hoy." Pedro compra un kilo de naranjas y dos kilos de manzanas.',
        english: '"Hello, Pedro!" says the vendor. "I have very sweet oranges today." Pedro buys a kilo of oranges and two kilos of apples.',
        vocab: [
          { word: 'vendedora', meaning: 'vendor (female)' },
          { word: 'naranjas', meaning: 'oranges' },
          { word: 'dulces', meaning: 'sweet' },
          { word: 'compra', meaning: 'buys' },
          { word: 'manzanas', meaning: 'apples' }
        ]
      },
      {
        spanish: 'También compra tomates rojos y lechuga verde. "¿Cuánto es?", pregunta. "Son cinco euros", responde la vendedora.',
        english: 'He also buys red tomatoes and green lettuce. "How much is it?", he asks. "It\'s five euros", the vendor responds.',
        vocab: [
          { word: 'tomates', meaning: 'tomatoes' },
          { word: 'lechuga', meaning: 'lettuce' },
          { word: 'cuánto', meaning: 'how much' },
          { word: 'euros', meaning: 'euros' },
          { word: 'pregunta', meaning: 'asks' }
        ]
      }
    ],
    questions: [
      { q: '¿Cuándo va Pedro al mercado?', a: 'Sábados', options: ['Lunes', 'Miércoles', 'Viernes', 'Sábados'] },
      { q: '¿Qué frutas compra Pedro?', a: 'Naranjas y manzanas', options: ['Plátanos', 'Naranjas y manzanas', 'Uvas', 'Fresas'] },
      { q: '¿Cuánto cuesta todo?', a: '5 euros', options: ['3 euros', '5 euros', '10 euros', '7 euros'] }
    ]
  },
  {
    id: 'playa',
    icon: '🏖️',
    title: 'Un Día en la Playa',
    level: 'A2',
    readTime: '3 min',
    paragraphs: [
      {
        spanish: 'La familia García decide ir a la playa. Es verano y hace mucho calor. Los niños están muy emocionados.',
        english: 'The García family decides to go to the beach. It is summer and it is very hot. The children are very excited.',
        vocab: [
          { word: 'familia', meaning: 'family' },
          { word: 'playa', meaning: 'beach' },
          { word: 'verano', meaning: 'summer' },
          { word: 'calor', meaning: 'heat/hot' },
          { word: 'emocionados', meaning: 'excited' }
        ]
      },
      {
        spanish: 'Llegan temprano por la mañana. El padre pone la sombrilla mientras la madre prepara las toallas. Los niños corren hacia el agua.',
        english: 'They arrive early in the morning. The father sets up the umbrella while the mother prepares the towels. The children run towards the water.',
        vocab: [
          { word: 'temprano', meaning: 'early' },
          { word: 'sombrilla', meaning: 'umbrella' },
          { word: 'toallas', meaning: 'towels' },
          { word: 'corren', meaning: 'run' },
          { word: 'agua', meaning: 'water' }
        ]
      },
      {
        spanish: '"¡Cuidado con las olas!", grita la madre. Los niños juegan en el agua y construyen castillos de arena. Es un día perfecto.',
        english: '"Be careful with the waves!", the mother shouts. The children play in the water and build sand castles. It is a perfect day.',
        vocab: [
          { word: 'cuidado', meaning: 'careful' },
          { word: 'olas', meaning: 'waves' },
          { word: 'juegan', meaning: 'play' },
          { word: 'castillos', meaning: 'castles' },
          { word: 'arena', meaning: 'sand' }
        ]
      },
      {
        spanish: 'Al mediodía, comen bocadillos y beben limonada fría. Después, descansan bajo la sombrilla. Los niños quieren quedarse para siempre.',
        english: 'At noon, they eat sandwiches and drink cold lemonade. Afterwards, they rest under the umbrella. The children want to stay forever.',
        vocab: [
          { word: 'mediodía', meaning: 'noon' },
          { word: 'bocadillos', meaning: 'sandwiches' },
          { word: 'limonada', meaning: 'lemonade' },
          { word: 'descansan', meaning: 'rest' },
          { word: 'quedarse', meaning: 'to stay' }
        ]
      }
    ],
    questions: [
      { q: '¿Qué estación es?', a: 'Verano', options: ['Primavera', 'Verano', 'Otoño', 'Invierno'] },
      { q: '¿Qué construyen los niños?', a: 'Castillos de arena', options: ['Castillos de arena', 'Una casa', 'Un barco', 'Una torre'] },
      { q: '¿Qué beben al mediodía?', a: 'Limonada', options: ['Agua', 'Café', 'Limonada', 'Té'] }
    ]
  },
  {
    id: 'trabajo',
    icon: '💼',
    title: 'El Primer Día de Trabajo',
    level: 'A2',
    readTime: '3 min',
    paragraphs: [
      {
        spanish: 'Ana está nerviosa. Hoy es su primer día en un trabajo nuevo. Se despierta muy temprano y se prepara con cuidado.',
        english: 'Ana is nervous. Today is her first day at a new job. She wakes up very early and prepares carefully.',
        vocab: [
          { word: 'nerviosa', meaning: 'nervous' },
          { word: 'primer', meaning: 'first' },
          { word: 'despierta', meaning: 'wakes up' },
          { word: 'prepara', meaning: 'prepares' },
          { word: 'cuidado', meaning: 'care' }
        ]
      },
      {
        spanish: 'Llega a la oficina a las ocho en punto. Su jefe, el señor Rodríguez, la recibe con amabilidad. "Bienvenida al equipo", dice.',
        english: 'She arrives at the office at eight o\'clock sharp. Her boss, Mr. Rodríguez, welcomes her kindly. "Welcome to the team", he says.',
        vocab: [
          { word: 'oficina', meaning: 'office' },
          { word: 'jefe', meaning: 'boss' },
          { word: 'recibe', meaning: 'welcomes' },
          { word: 'amabilidad', meaning: 'kindness' },
          { word: 'equipo', meaning: 'team' }
        ]
      },
      {
        spanish: 'Sus compañeros son muy simpáticos. Le muestran dónde está todo: la cocina, los baños, la sala de reuniones. Ana empieza a sentirse más cómoda.',
        english: 'Her colleagues are very nice. They show her where everything is: the kitchen, the bathrooms, the meeting room. Ana starts to feel more comfortable.',
        vocab: [
          { word: 'compañeros', meaning: 'colleagues' },
          { word: 'simpáticos', meaning: 'nice/friendly' },
          { word: 'muestran', meaning: 'show' },
          { word: 'cocina', meaning: 'kitchen' },
          { word: 'cómoda', meaning: 'comfortable' }
        ]
      },
      {
        spanish: 'Al final del día, Ana sonríe. Ha aprendido mucho y ha conocido a personas interesantes. Está contenta con su decisión.',
        english: 'At the end of the day, Ana smiles. She has learned a lot and has met interesting people. She is happy with her decision.',
        vocab: [
          { word: 'sonríe', meaning: 'smiles' },
          { word: 'aprendido', meaning: 'learned' },
          { word: 'conocido', meaning: 'met' },
          { word: 'contenta', meaning: 'happy' },
          { word: 'decisión', meaning: 'decision' }
        ]
      }
    ],
    questions: [
      { q: '¿Cómo se siente Ana al principio?', a: 'Nerviosa', options: ['Feliz', 'Nerviosa', 'Cansada', 'Aburrida'] },
      { q: '¿A qué hora llega Ana?', a: 'A las ocho', options: ['A las siete', 'A las ocho', 'A las nueve', 'A las diez'] },
      { q: '¿Cómo son los compañeros?', a: 'Simpáticos', options: ['Antipáticos', 'Simpáticos', 'Serios', 'Aburridos'] }
    ]
  },
  {
    id: 'viaje',
    icon: '✈️',
    title: 'El Viaje a México',
    level: 'B1',
    readTime: '4 min',
    paragraphs: [
      {
        spanish: 'Carlos siempre había soñado con visitar México. Por fin, después de años de ahorro, puede hacer realidad su sueño. Reserva un vuelo a la Ciudad de México.',
        english: 'Carlos had always dreamed of visiting Mexico. Finally, after years of saving, he can make his dream come true. He books a flight to Mexico City.',
        vocab: [
          { word: 'soñado', meaning: 'dreamed' },
          { word: 'ahorro', meaning: 'saving' },
          { word: 'sueño', meaning: 'dream' },
          { word: 'reserva', meaning: 'books' },
          { word: 'vuelo', meaning: 'flight' }
        ]
      },
      {
        spanish: 'El avión aterriza por la noche. Carlos está impresionado por el tamaño de la ciudad. Las luces brillan como estrellas en la tierra.',
        english: 'The plane lands at night. Carlos is impressed by the size of the city. The lights shine like stars on earth.',
        vocab: [
          { word: 'avión', meaning: 'plane' },
          { word: 'aterriza', meaning: 'lands' },
          { word: 'impresionado', meaning: 'impressed' },
          { word: 'tamaño', meaning: 'size' },
          { word: 'estrellas', meaning: 'stars' }
        ]
      },
      {
        spanish: 'Durante su estancia, visita las pirámides de Teotihuacán, el Museo de Antropología y el Zócalo. Prueba tacos, tamales y mole. Todo es delicioso.',
        english: 'During his stay, he visits the pyramids of Teotihuacán, the Museum of Anthropology, and the Zócalo. He tries tacos, tamales, and mole. Everything is delicious.',
        vocab: [
          { word: 'estancia', meaning: 'stay' },
          { word: 'pirámides', meaning: 'pyramids' },
          { word: 'museo', meaning: 'museum' },
          { word: 'prueba', meaning: 'tries' },
          { word: 'delicioso', meaning: 'delicious' }
        ]
      },
      {
        spanish: 'Lo que más le impresiona es la amabilidad de la gente. Todos son muy hospitalarios y siempre están dispuestos a ayudar. Carlos decide que volverá pronto.',
        english: 'What impresses him most is the kindness of the people. Everyone is very hospitable and always willing to help. Carlos decides he will return soon.',
        vocab: [
          { word: 'amabilidad', meaning: 'kindness' },
          { word: 'hospitalarios', meaning: 'hospitable' },
          { word: 'dispuestos', meaning: 'willing' },
          { word: 'ayudar', meaning: 'to help' },
          { word: 'volverá', meaning: 'will return' }
        ]
      }
    ],
    questions: [
      { q: '¿Cuándo aterriza el avión?', a: 'Por la noche', options: ['Por la mañana', 'Por la tarde', 'Por la noche', 'Al mediodía'] },
      { q: '¿Qué visita Carlos?', a: 'Las pirámides', options: ['La playa', 'Las pirámides', 'Las montañas', 'El desierto'] },
      { q: '¿Qué impresiona más a Carlos?', a: 'La amabilidad de la gente', options: ['La comida', 'El clima', 'La amabilidad de la gente', 'Los edificios'] }
    ]
  }
];

export default function StoriesMode({ onBack }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentPara, setCurrentPara] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const [inQuiz, setInQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [storyComplete, setStoryComplete] = useState(false);

  // Story selection
  if (!selectedStory) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Stories</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={styles.content}>
          <p style={{ textAlign: 'center', color: theme.textLight, marginBottom: 20 }}>
            Read short stories and test your comprehension
          </p>
          <div style={styles.storyList}>
            {STORIES.map(story => (
              <button key={story.id} onClick={() => setSelectedStory(story)} style={styles.storyCard}>
                <span style={{ fontSize: 36 }}>{story.icon}</span>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h3 style={{ margin: 0, fontSize: 16 }}>{story.title}</h3>
                  <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                    <span style={styles.badge}>{story.level}</span>
                    <span style={{ fontSize: 12, color: theme.textLight }}>📖 {story.readTime}</span>
                  </div>
                </div>
                <span style={{ color: theme.textLight }}>→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Story complete
  if (storyComplete) {
    const percentage = Math.round((quizScore / selectedStory.questions.length) * 100);
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => { setSelectedStory(null); setStoryComplete(false); setCurrentPara(0); setInQuiz(false); setQuizIndex(0); setQuizScore(0); }} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Story Complete!</h2>
          <div style={{ width: 40 }} />
        </div>
        <div style={{ ...styles.content, textAlign: 'center', paddingTop: 40 }}>
          <div style={{ fontSize: 64 }}>{percentage >= 80 ? '🌟' : percentage >= 50 ? '📖' : '💪'}</div>
          <h2 style={{ margin: '16px 0 8px' }}>{selectedStory.title}</h2>
          <p style={{ color: theme.textLight }}>Comprehension: {quizScore}/{selectedStory.questions.length} ({percentage}%)</p>
          <div style={styles.xpBadge}>+{(selectedStory.paragraphs.length * 5) + (quizScore * 10)} XP</div>
          <button onClick={() => { setSelectedStory(null); setStoryComplete(false); setCurrentPara(0); setInQuiz(false); setQuizIndex(0); setQuizScore(0); }} style={styles.primaryBtn}>
            Read Another Story
          </button>
        </div>
      </div>
    );
  }

  // Quiz mode
  if (inQuiz) {
    const question = selectedStory.questions[quizIndex];
    const isCorrect = selected === question.a;

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => setInQuiz(false)} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Comprehension</h2>
          <span style={styles.counter}>{quizIndex + 1}/{selectedStory.questions.length}</span>
        </div>
        <div style={styles.content}>
          <div style={styles.questionCard}>
            <p style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{question.q}</p>
          </div>
          <div style={styles.options}>
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => { if (!showResult) { setSelected(opt); setShowResult(true); if (opt === question.a) setQuizScore(s => s + 1); }}}
                disabled={showResult}
                style={{
                  ...styles.optionBtn,
                  borderColor: showResult ? (opt === question.a ? theme.success : (opt === selected ? theme.error : theme.border)) : theme.border,
                  background: showResult ? (opt === question.a ? '#E8F5E9' : (opt === selected && !isCorrect ? '#FFEBEE' : theme.surface)) : theme.surface
                }}
              >
                {opt} {showResult && opt === question.a && '✓'}
              </button>
            ))}
          </div>
          {showResult && (
            <button onClick={() => {
              if (quizIndex < selectedStory.questions.length - 1) {
                setQuizIndex(i => i + 1);
                setSelected(null);
                setShowResult(false);
              } else {
                setStoryComplete(true);
              }
            }} style={styles.primaryBtn}>
              {quizIndex < selectedStory.questions.length - 1 ? 'Next Question →' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Reading mode
  const para = selectedStory.paragraphs[currentPara];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => setSelectedStory(null)} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>{selectedStory.icon} {selectedStory.title}</h2>
        <span style={styles.counter}>{currentPara + 1}/{selectedStory.paragraphs.length}</span>
      </div>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${((currentPara + 1) / selectedStory.paragraphs.length) * 100}%` }} />
      </div>
      <div style={styles.content}>
        {/* Spanish text */}
        <div style={styles.textCard}>
          <p style={styles.spanishText}>{para.spanish}</p>
          <button onClick={() => setShowTranslation(!showTranslation)} style={styles.toggleBtn}>
            {showTranslation ? '🙈 Hide' : '👁️ Show'} Translation
          </button>
          {showTranslation && <p style={styles.englishText}>{para.english}</p>}
        </div>

        {/* Vocabulary */}
        <button onClick={() => setShowVocab(!showVocab)} style={styles.vocabToggle}>
          📚 Vocabulary ({para.vocab.length} words) {showVocab ? '▲' : '▼'}
        </button>
        {showVocab && (
          <div style={styles.vocabList}>
            {para.vocab.map((v, i) => (
              <div key={i} style={styles.vocabItem}>
                <span style={styles.vocabWord}>{v.word}</span>
                <span style={styles.vocabMeaning}>{v.meaning}</span>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div style={styles.navButtons}>
          <button
            onClick={() => { setCurrentPara(p => p - 1); setShowTranslation(false); setShowVocab(false); }}
            disabled={currentPara === 0}
            style={{ ...styles.navBtn, opacity: currentPara === 0 ? 0.5 : 1 }}
          >
            ← Previous
          </button>
          <button
            onClick={() => {
              if (currentPara < selectedStory.paragraphs.length - 1) {
                setCurrentPara(p => p + 1);
                setShowTranslation(false);
                setShowVocab(false);
              } else {
                setInQuiz(true);
              }
            }}
            style={styles.navBtnPrimary}
          >
            {currentPara < selectedStory.paragraphs.length - 1 ? 'Next →' : 'Take Quiz 📝'}
          </button>
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
  counter: { background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 12, fontSize: 14 },
  progressBar: { height: 4, background: theme.border },
  progressFill: { height: '100%', background: theme.success, transition: 'width 0.3s' },
  content: { padding: 20 },
  storyList: { display: 'flex', flexDirection: 'column', gap: 12 },
  storyCard: { display: 'flex', alignItems: 'center', gap: 16, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16, cursor: 'pointer', textAlign: 'left' },
  badge: { background: theme.bg, padding: '2px 8px', borderRadius: 8, fontSize: 11, color: theme.primary, fontWeight: 600 },
  textCard: { background: theme.surface, borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  spanishText: { fontSize: 18, lineHeight: 1.6, margin: '0 0 12px', color: theme.text },
  toggleBtn: { background: 'none', border: 'none', color: theme.primary, fontSize: 14, cursor: 'pointer', padding: 0 },
  englishText: { fontSize: 15, lineHeight: 1.5, margin: '12px 0 0', color: theme.textLight, fontStyle: 'italic', borderTop: `1px solid ${theme.border}`, paddingTop: 12 },
  vocabToggle: { width: '100%', background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 12, textAlign: 'left' },
  vocabList: { background: theme.surface, borderRadius: 12, padding: 12, marginBottom: 16 },
  vocabItem: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${theme.border}` },
  vocabWord: { fontWeight: 600, color: theme.primary },
  vocabMeaning: { color: theme.textLight },
  navButtons: { display: 'flex', gap: 12 },
  navBtn: { flex: 1, padding: 14, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, fontSize: 16, cursor: 'pointer' },
  navBtnPrimary: { flex: 1, padding: 14, background: theme.primary, color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
  questionCard: { background: theme.surface, borderRadius: 16, padding: 24, marginBottom: 20, textAlign: 'center' },
  options: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 },
  optionBtn: { padding: 16, fontSize: 16, border: '2px solid', borderRadius: 12, background: theme.surface, cursor: 'pointer', textAlign: 'left' },
  primaryBtn: { background: theme.primary, color: '#fff', border: 'none', padding: '14px 24px', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', width: '100%' },
  xpBadge: { display: 'inline-block', background: '#FFD700', color: '#000', padding: '8px 20px', borderRadius: 20, fontWeight: 700, marginTop: 16, marginBottom: 24 }
};
