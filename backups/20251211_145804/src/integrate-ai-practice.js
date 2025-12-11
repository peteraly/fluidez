/*
 * MANUAL INTEGRATION STEPS:
 * 
 * 1. Add this import at the top of App.js:
 *    import AIPractice from './AIPractice';
 * 
 * 2. Add this state variable in your App component:
 *    const [showAIPractice, setShowAIPractice] = useState(false);
 *    const [aiPracticeDay, setAIPracticeDay] = useState(null);
 * 
 * 3. Add this condition at the start of your render (before other screens):
 *    if (showAIPractice && aiPracticeDay) {
 *      return (
 *        <AIPractice 
 *          dayData={aiPracticeDay}
 *          onBack={() => {
 *            setShowAIPractice(false);
 *            setAIPracticeDay(null);
 *          }}
 *        />
 *      );
 *    }
 * 
 * 4. In your day detail view, add this card/button:
 *    <div 
 *      style={{ ...styles.card, cursor: 'pointer', background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', color: '#fff' }}
 *      onClick={() => {
 *        setAIPracticeDay(currentDayData);  // pass the current day's data
 *        setShowAIPractice(true);
 *      }}
 *    >
 *      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
 *        <span style={{ fontSize: 28 }}>🤖</span>
 *        <div>
 *          <h3 style={{ margin: 0, fontSize: 16 }}>AI Practice</h3>
 *          <p style={{ margin: '4px 0 0', opacity: 0.9, fontSize: 13 }}>
 *            Unlimited exercises on this topic
 *          </p>
 *        </div>
 *      </div>
 *    </div>
 */

console.log('See this file for integration instructions');
