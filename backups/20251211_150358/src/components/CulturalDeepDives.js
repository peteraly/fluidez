import React, { useState, useEffect } from 'react';

/**
 * CulturalDeepDives
 * 
 * Learn Spanish through authentic cultural content:
 * - Food & recipes
 * - Music & artists
 * - Traditions & holidays
 * - Regional differences
 * 
 * Design principles:
 * - Culture makes language meaningful
 * - Stories behind words matter
 * - Regional authenticity
 * - Celebrates diversity of Spanish-speaking world
 */

const theme = {
  primary: '#2D5A27',
  primaryLight: '#4A7C43',
  bg: '#FAFAFA',
  surface: '#FFF',
  text: '#1A1A1A',
  textLight: '#666',
  border: '#E0E0E0',
  success: '#4CAF50'
};

// Cultural content organized by category
const CULTURAL_CONTENT = {
  food: {
    title: '🍽️ Food & Cuisine',
    color: '#FF6B6B',
    items: [
      {
        id: 'tacos',
        title: 'El Arte del Taco',
        subtitle: 'More than just a food - a cultural icon',
        emoji: '🌮',
        content: {
          intro: 'The taco is over 500 years old, originating in the silver mines of Mexico where workers wrapped food in tortillas.',
          vocabulary: [
            { spanish: 'la tortilla', english: 'tortilla (flatbread)', note: 'From Spanish "torta" (cake)' },
            { spanish: 'el cilantro', english: 'cilantro', note: 'Essential topping' },
            { spanish: 'la cebolla', english: 'onion', note: 'Usually raw, finely diced' },
            { spanish: 'la salsa', english: 'sauce', note: 'From "sal" (salt)' },
            { spanish: 'el trompo', english: 'spinning spit', note: 'For al pastor' }
          ],
          phrases: [
            { spanish: '¿Con todo?', english: 'With everything?', context: 'What vendors ask - cilantro, onion, salsa' },
            { spanish: 'Unos tacos, por favor', english: 'Some tacos, please', context: 'Ordering at a taquería' },
            { spanish: '¿Qué salsa me recomienda?', english: 'Which salsa do you recommend?', context: 'Asking for help' }
          ],
          funFact: 'Tacos al pastor came from Lebanese immigrants who brought shawarma to Mexico in the early 1900s!',
          regions: {
            'Mexico City': 'Tacos al pastor, suadero',
            'Baja California': 'Fish tacos (tacos de pescado)',
            'Tijuana': 'Tacos de birria',
            'Oaxaca': 'Tlayudas (giant taco-like dish)'
          }
        }
      },
      {
        id: 'cafe',
        title: 'La Cultura del Café',
        subtitle: 'Coffee rituals across Latin America',
        emoji: '☕',
        content: {
          intro: 'Coffee culture varies dramatically across Spanish-speaking countries, from Cuban cortaditos to Mexican café de olla.',
          vocabulary: [
            { spanish: 'el café', english: 'coffee', note: 'From Arabic "qahwah"' },
            { spanish: 'un cortadito', english: 'Cuban espresso with milk', note: '"Cut" with milk' },
            { spanish: 'café de olla', english: 'clay pot coffee', note: 'Mexican spiced coffee' },
            { spanish: 'la canela', english: 'cinnamon', note: 'Common in Mexican coffee' },
            { spanish: 'el piloncillo', english: 'raw cane sugar', note: 'Traditional sweetener' }
          ],
          phrases: [
            { spanish: '¿Me pone un cafecito?', english: 'Can I get a little coffee?', context: 'Affectionate way to order' },
            { spanish: 'Bien cargado', english: 'Strong (loaded)', context: 'How you like it' },
            { spanish: '¿Tiene leche de almendra?', english: 'Do you have almond milk?', context: 'Modern cafés' }
          ],
          funFact: 'Colombia produces some of the world\'s best coffee, but traditionally Colombians drank "tinto" - weak, sweet black coffee!',
          regions: {
            'Cuba': 'Cortadito, café cubano (very sweet espresso)',
            'Mexico': 'Café de olla with cinnamon and piloncillo',
            'Colombia': 'Tinto (light coffee), now specialty coffee',
            'Argentina': 'Café con leche, strong Italian influence'
          }
        }
      },
      {
        id: 'dulces',
        title: 'Dulces Tradicionales',
        subtitle: 'Traditional sweets and their stories',
        emoji: '🍬',
        content: {
          intro: 'Every Spanish-speaking country has beloved traditional sweets, often tied to holidays and celebrations.',
          vocabulary: [
            { spanish: 'el dulce', english: 'sweet/candy', note: 'From Latin "dulcis"' },
            { spanish: 'el churro', english: 'fried dough stick', note: 'Spanish origin' },
            { spanish: 'el flan', english: 'caramel custard', note: 'From French via Spain' },
            { spanish: 'el pan dulce', english: 'sweet bread', note: 'Mexican tradition' },
            { spanish: 'las galletas', english: 'cookies', note: 'From French "galette"' }
          ],
          phrases: [
            { spanish: '¿Qué tiene de postre?', english: 'What do you have for dessert?', context: 'At restaurants' },
            { spanish: '¡Qué rico!', english: 'How delicious!', context: 'Expressing enjoyment' },
            { spanish: 'Un antojo', english: 'A craving', context: 'When you really want something sweet' }
          ],
          funFact: 'Churros were likely brought to Spain by Portuguese sailors who copied a Chinese fried dough called "youtiao"!',
          regions: {
            'Spain': 'Churros con chocolate for breakfast',
            'Mexico': 'Pan dulce with coffee in the evening',
            'Argentina': 'Alfajores (dulce de leche cookies)',
            'Peru': 'Picarones (sweet potato donuts)'
          }
        }
      }
    ]
  },
  music: {
    title: '🎵 Music & Dance',
    color: '#9B59B6',
    items: [
      {
        id: 'reggaeton',
        title: 'El Reggaetón',
        subtitle: 'From Puerto Rico to the world',
        emoji: '🎤',
        content: {
          intro: 'Born in Puerto Rico in the 1990s, reggaetón fuses reggae, hip-hop, and Latin rhythms. Now it\'s a global phenomenon.',
          vocabulary: [
            { spanish: 'el perreo', english: 'reggaetón dancing', note: 'From "perro" (dog)' },
            { spanish: 'el dembow', english: 'reggaetón beat', note: 'The signature rhythm' },
            { spanish: 'la calle', english: 'the street', note: 'Common theme in lyrics' },
            { spanish: 'el flow', english: 'flow/style', note: 'How you rap/sing' },
            { spanish: 'prender', english: 'to light up/turn on', note: '"Prende la fiesta"' }
          ],
          phrases: [
            { spanish: '¡Esto está que arde!', english: 'This is fire!', context: 'When a song is great' },
            { spanish: 'Dale', english: 'Go for it / Hit it', context: 'Pitbull\'s catchphrase' },
            { spanish: '¡Qué canción más pegajosa!', english: 'What a catchy song!', context: 'When it\'s stuck in your head' }
          ],
          funFact: 'Bad Bunny became the most-streamed artist on Spotify in 2020, 2021, and 2022 - all singing in Spanish!',
          artists: ['Bad Bunny', 'Daddy Yankee', 'J Balvin', 'Karol G', 'Ozuna']
        }
      },
      {
        id: 'salsa',
        title: 'El Sabor de la Salsa',
        subtitle: 'The rhythm that moves the world',
        emoji: '💃',
        content: {
          intro: 'Salsa emerged in New York in the 1960s when Cuban and Puerto Rican musicians fused their sounds. The name means "sauce" - a mix of flavors!',
          vocabulary: [
            { spanish: 'la clave', english: 'the key rhythm', note: 'The heartbeat of salsa' },
            { spanish: 'el sonero', english: 'salsa singer', note: 'Often improvises' },
            { spanish: 'el tumbao', english: 'bass pattern', note: 'The groove' },
            { spanish: 'la rumba', english: 'party/dance', note: 'Cuban origin' },
            { spanish: 'gozar', english: 'to enjoy/groove', note: '"¡Goza!"' }
          ],
          phrases: [
            { spanish: '¡Azúcar!', english: 'Sugar!', context: 'Celia Cruz\'s famous exclamation' },
            { spanish: '¿Bailamos?', english: 'Shall we dance?', context: 'Invitation to dance' },
            { spanish: '¡Qué sabrosura!', english: 'How delicious/groovy!', context: 'When the music is good' }
          ],
          funFact: 'Celia Cruz, the "Queen of Salsa," recorded over 70 albums and won multiple Grammys!',
          artists: ['Celia Cruz', 'Héctor Lavoe', 'Marc Anthony', 'Rubén Blades', 'Willie Colón']
        }
      }
    ]
  },
  traditions: {
    title: '🎊 Traditions & Holidays',
    color: '#E67E22',
    items: [
      {
        id: 'muertos',
        title: 'Día de los Muertos',
        subtitle: 'Celebrating life through death',
        emoji: '💀',
        content: {
          intro: 'This Mexican tradition (Nov 1-2) honors deceased loved ones with altars, marigolds, and their favorite foods. It\'s a celebration, not mourning!',
          vocabulary: [
            { spanish: 'la ofrenda', english: 'altar/offering', note: 'Built for the deceased' },
            { spanish: 'la calavera', english: 'skull', note: 'Sugar skulls are common' },
            { spanish: 'el cempasúchil', english: 'marigold flower', note: 'Guides spirits home' },
            { spanish: 'el pan de muerto', english: 'bread of the dead', note: 'Sweet bread for the holiday' },
            { spanish: 'los ancestros', english: 'ancestors', note: 'Those who came before' }
          ],
          phrases: [
            { spanish: '¿Ya pusiste la ofrenda?', english: 'Did you set up the altar?', context: 'Preparing for the holiday' },
            { spanish: 'Recordamos a los que ya no están', english: 'We remember those no longer here', context: 'The spirit of the day' },
            { spanish: '¡Que vivan los muertos!', english: 'Long live the dead!', context: 'Celebration cry' }
          ],
          funFact: 'UNESCO recognized Día de los Muertos as an Intangible Cultural Heritage of Humanity in 2008!',
          regions: {
            'Michoacán': 'Most traditional celebrations, island of Janitzio',
            'Oaxaca': 'Elaborate comparsa parades',
            'Mexico City': 'Giant parade (started for James Bond film!)',
            'Mixquic': 'Cemetery candlelight vigils'
          }
        }
      },
      {
        id: 'quinceanera',
        title: 'La Quinceañera',
        subtitle: 'Celebrating 15 years',
        emoji: '👗',
        content: {
          intro: 'This coming-of-age celebration for 15-year-old girls marks the transition from childhood to womanhood, with origins in Aztec and Spanish traditions.',
          vocabulary: [
            { spanish: 'la quinceañera', english: '15-year-old girl/the party', note: 'Both meanings' },
            { spanish: 'los chambelanes', english: 'male court/escorts', note: 'Usually 14 boys' },
            { spanish: 'las damas', english: 'female court', note: 'Usually 14 girls' },
            { spanish: 'el vals', english: 'the waltz', note: 'Traditional first dance' },
            { spanish: 'la última muñeca', english: 'the last doll', note: 'Symbolizing childhood' }
          ],
          phrases: [
            { spanish: '¡Felices quince!', english: 'Happy 15th!', context: 'Birthday greeting' },
            { spanish: 'El cambio de zapatillas', english: 'The changing of shoes', context: 'Ritual from flats to heels' },
            { spanish: '¡Que los cumplas feliz!', english: 'May you have a happy birthday!', context: 'Birthday song' }
          ],
          funFact: 'The tradition of 15 chambelanes and damas represents the quinceañera\'s first 15 years of life!',
          elements: ['Coronation (tiara)', 'Last doll ceremony', 'Father-daughter waltz', 'Toast', 'Cake']
        }
      }
    ]
  },
  regions: {
    title: '🌎 Regional Spanish',
    color: '#3498DB',
    items: [
      {
        id: 'mexico-spain',
        title: 'México vs. España',
        subtitle: 'Same language, different flavors',
        emoji: '🇲🇽',
        content: {
          intro: 'Mexican and Spanish differ in pronunciation, vocabulary, and formality. Both are correct - just different!',
          vocabulary: [
            { spanish: 'carro / coche', english: 'car', note: 'Mexico / Spain' },
            { spanish: 'computadora / ordenador', english: 'computer', note: 'Mexico / Spain' },
            { spanish: 'celular / móvil', english: 'cell phone', note: 'Mexico / Spain' },
            { spanish: 'platicar / hablar', english: 'to chat', note: 'Mexico uses platicar more' },
            { spanish: 'ahorita / ahora', english: 'right now', note: 'Mexico loves diminutives' }
          ],
          phrases: [
            { spanish: '¿Qué onda?', english: 'What\'s up?', context: 'Mexican slang' },
            { spanish: '¿Qué tal, tío?', english: 'What\'s up, dude?', context: 'Spanish slang' },
            { spanish: '¡Órale!', english: 'Wow! / Okay! / Let\'s go!', context: 'Mexican - many meanings!' }
          ],
          funFact: 'In Spain, "coger" means "to grab," but in Mexico it\'s vulgar! Mexicans say "agarrar" instead.',
          differences: [
            'Ustedes vs. Vosotros (Spain uses both, Mexico only ustedes)',
            'Pronunciation of "c" and "z" (Spain: "th" sound)',
            'Formality (Mexico tends to be more formal)',
            'Speed (Spaniards often speak faster)'
          ]
        }
      },
      {
        id: 'argentina',
        title: 'El Español Argentino',
        subtitle: 'Che, ¿qué onda?',
        emoji: '🇦🇷',
        content: {
          intro: 'Argentine Spanish is known for its Italian influence, unique "vos" pronoun, and distinctive "sh" sound for "ll" and "y".',
          vocabulary: [
            { spanish: 'che', english: 'hey/buddy', note: 'Famous Argentine word' },
            { spanish: 'bárbaro', english: 'great/awesome', note: 'Common expression' },
            { spanish: 'laburo', english: 'work/job', note: 'From Italian "lavoro"' },
            { spanish: 'pibe/piba', english: 'kid/guy/girl', note: 'Informal' },
            { spanish: 'mina', english: 'woman/girl', note: 'Slang (can be informal)' }
          ],
          phrases: [
            { spanish: '¿Vos sabés?', english: 'Do you know?', context: 'Vos instead of tú' },
            { spanish: '¡Qué boludo!', english: 'What an idiot!', context: 'Common (mild) insult' },
            { spanish: 'Dale, nos vemos', english: 'Okay, see you', context: 'Casual goodbye' }
          ],
          funFact: 'The "vos" pronoun also exists in parts of Central America, but with different conjugations!',
          unique: [
            'Voseo: "vos tenés" instead of "tú tienes"',
            'Yeísmo: "ll" sounds like "sh" (calle = "ca-she")',
            'Italian vocabulary influence',
            'Lunfardo: Buenos Aires slang'
          ]
        }
      }
    ]
  }
};

export default function CulturalDeepDives({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewedItems, setViewedItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('fluidez_culture_viewed') || '[]');
    setViewedItems(saved);
  }, []);

  const markViewed = (itemId) => {
    if (!viewedItems.includes(itemId)) {
      const updated = [...viewedItems, itemId];
      setViewedItems(updated);
      localStorage.setItem('fluidez_culture_viewed', JSON.stringify(updated));
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-MX';
      utterance.rate = 0.85;
      speechSynthesis.speak(utterance);
    }
  };

  // Item detail view
  if (selectedItem) {
    const content = selectedItem.content;
    markViewed(selectedItem.id);

    return (
      <div style={styles.container}>
        <div style={{ ...styles.header, background: selectedCategory.color }}>
          <button onClick={() => setSelectedItem(null)} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>{selectedItem.title}</h2>
          <div style={{ width: 40 }} />
        </div>

        <div style={styles.content}>
          {/* Intro */}
          <div style={styles.introCard}>
            <span style={{ fontSize: 48 }}>{selectedItem.emoji}</span>
            <p style={styles.introText}>{content.intro}</p>
          </div>

          {/* Vocabulary */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>📚 Vocabulary</h3>
            {content.vocabulary.map((word, i) => (
              <div key={i} style={styles.vocabCard}>
                <div style={styles.vocabMain}>
                  <button onClick={() => speak(word.spanish)} style={styles.speakBtn}>🔊</button>
                  <span style={styles.vocabSpanish}>{word.spanish}</span>
                  <span style={styles.vocabEnglish}>{word.english}</span>
                </div>
                {word.note && <div style={styles.vocabNote}>{word.note}</div>}
              </div>
            ))}
          </div>

          {/* Phrases */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>💬 Useful Phrases</h3>
            {content.phrases.map((phrase, i) => (
              <div key={i} style={styles.phraseCard}>
                <div style={styles.phraseMain}>
                  <button onClick={() => speak(phrase.spanish)} style={styles.speakBtn}>🔊</button>
                  <div>
                    <div style={styles.phraseSpanish}>{phrase.spanish}</div>
                    <div style={styles.phraseEnglish}>{phrase.english}</div>
                  </div>
                </div>
                <div style={styles.phraseContext}>{phrase.context}</div>
              </div>
            ))}
          </div>

          {/* Fun Fact */}
          <div style={styles.funFactCard}>
            <span style={{ fontSize: 24 }}>💡</span>
            <p style={{ margin: 0, flex: 1 }}>{content.funFact}</p>
          </div>

          {/* Regions or other special content */}
          {content.regions && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🗺️ Regional Variations</h3>
              {Object.entries(content.regions).map(([region, desc], i) => (
                <div key={i} style={styles.regionItem}>
                  <span style={styles.regionName}>{region}</span>
                  <span style={styles.regionDesc}>{desc}</span>
                </div>
              ))}
            </div>
          )}

          {content.artists && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🎤 Notable Artists</h3>
              <div style={styles.artistsRow}>
                {content.artists.map((artist, i) => (
                  <span key={i} style={styles.artistTag}>{artist}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Category view
  if (selectedCategory) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.header, background: selectedCategory.color }}>
          <button onClick={() => setSelectedCategory(null)} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>{selectedCategory.title}</h2>
          <div style={{ width: 40 }} />
        </div>

        <div style={styles.content}>
          {selectedCategory.items.map((item, i) => (
            <div
              key={i}
              onClick={() => setSelectedItem(item)}
              style={styles.itemCard}
            >
              <span style={{ fontSize: 36 }}>{item.emoji}</span>
              <div style={styles.itemInfo}>
                <div style={styles.itemTitle}>
                  {viewedItems.includes(item.id) && <span style={{ marginRight: 6 }}>✓</span>}
                  {item.title}
                </div>
                <div style={styles.itemSubtitle}>{item.subtitle}</div>
              </div>
              <span style={styles.arrow}>→</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Main category selection
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>🌎 Cultural Deep Dives</h2>
        <div style={{ width: 40 }} />
      </div>

      <div style={styles.content}>
        <p style={styles.intro}>
          Language is more than words - it's culture! Explore the stories, 
          traditions, and flavors behind Spanish.
        </p>

        <div style={styles.categoryGrid}>
          {Object.entries(CULTURAL_CONTENT).map(([key, category]) => {
            const viewedCount = category.items.filter(i => viewedItems.includes(i.id)).length;
            return (
              <div
                key={key}
                onClick={() => setSelectedCategory(category)}
                style={{ ...styles.categoryCard, borderColor: category.color }}
              >
                <div style={{ ...styles.categoryIcon, background: category.color }}>
                  {category.title.split(' ')[0]}
                </div>
                <div style={styles.categoryTitle}>
                  {category.title.split(' ').slice(1).join(' ')}
                </div>
                <div style={styles.categoryProgress}>
                  {viewedCount}/{category.items.length} explored
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Get cultural progress
export function getCulturalProgress() {
  const viewed = JSON.parse(localStorage.getItem('fluidez_culture_viewed') || '[]');
  const total = Object.values(CULTURAL_CONTENT).reduce((sum, cat) => sum + cat.items.length, 0);
  return {
    viewed: viewed.length,
    total,
    percentage: Math.round((viewed.length / total) * 100)
  };
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '0 auto',
    minHeight: '100vh',
    background: theme.bg,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
    color: '#fff',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: { margin: 0, fontSize: 18, fontWeight: 600 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' },
  content: { padding: 20 },
  intro: { color: theme.textLight, marginBottom: 20, lineHeight: 1.5 },
  categoryGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  categoryCard: {
    background: theme.surface,
    padding: 16,
    borderRadius: 14,
    border: '2px solid',
    cursor: 'pointer',
    textAlign: 'center'
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 10px',
    fontSize: 24
  },
  categoryTitle: { fontWeight: 600, fontSize: 14, marginBottom: 4 },
  categoryProgress: { fontSize: 11, color: theme.textLight },
  itemCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    background: theme.surface,
    padding: 16,
    borderRadius: 14,
    border: `1px solid ${theme.border}`,
    marginBottom: 12,
    cursor: 'pointer'
  },
  itemInfo: { flex: 1 },
  itemTitle: { fontWeight: 600, fontSize: 15, marginBottom: 2 },
  itemSubtitle: { fontSize: 13, color: theme.textLight },
  arrow: { color: theme.textLight, fontSize: 18 },
  introCard: {
    background: theme.surface,
    padding: 24,
    borderRadius: 16,
    textAlign: 'center',
    marginBottom: 24,
    border: `1px solid ${theme.border}`
  },
  introText: { margin: '16px 0 0', lineHeight: 1.6, color: theme.text },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 600, marginBottom: 12 },
  vocabCard: {
    background: theme.surface,
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    border: `1px solid ${theme.border}`
  },
  vocabMain: { display: 'flex', alignItems: 'center', gap: 10 },
  speakBtn: { background: 'none', border: 'none', fontSize: 18, cursor: 'pointer' },
  vocabSpanish: { fontWeight: 600, color: theme.primary },
  vocabEnglish: { color: theme.textLight, marginLeft: 8 },
  vocabNote: { fontSize: 12, color: theme.textLight, marginTop: 6, marginLeft: 34 },
  phraseCard: {
    background: theme.surface,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    border: `1px solid ${theme.border}`
  },
  phraseMain: { display: 'flex', alignItems: 'flex-start', gap: 10 },
  phraseSpanish: { fontWeight: 600, color: theme.primary, marginBottom: 2 },
  phraseEnglish: { color: theme.text },
  phraseContext: {
    fontSize: 12,
    color: theme.textLight,
    marginTop: 8,
    marginLeft: 34,
    fontStyle: 'italic'
  },
  funFactCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    background: '#FFF3E0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24
  },
  regionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: `1px solid ${theme.border}`
  },
  regionName: { fontWeight: 600, color: theme.primary },
  regionDesc: { color: theme.textLight, fontSize: 13, textAlign: 'right', flex: 1, marginLeft: 16 },
  artistsRow: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  artistTag: {
    background: '#E8F5E9',
    color: theme.primary,
    padding: '6px 12px',
    borderRadius: 20,
    fontSize: 13
  }
};
