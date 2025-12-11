# FLUIDEZ UI INTEGRATION SNIPPETS

Copy these into your InteractiveCurriculum.js at the indicated locations.

---

## 1. HEADER - Add Streak & PT Stage Display

Find the header area (near `← Back`) and add:

```jsx
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <StreakDisplay compact />
  <PTStageDisplay stage={getPTStage(currentDay)} compact />
</div>
```

---

## 2. VOCABULARY TAB - Add Review & Quiz Buttons

In the vocabulary section, add these buttons:

```jsx
<div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
  <button onClick={() => setShowReview(true)} style={{
    flex: 1, padding: '14px', background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer'
  }}>📚 Review Words</button>
  <button onClick={() => setShowQuiz(true)} style={{
    flex: 1, padding: '14px', background: 'linear-gradient(135deg, #f093fb, #f5576c)',
    color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer'
  }}>📝 Quiz Me</button>
</div>
```

---

## 3. LISTENING TAB - Add Shadowing (Day 7+)

In the listening section:

```jsx
{currentDay >= 7 && (
  <button onClick={() => setShowShadowing(true)} style={{
    width: '100%', padding: '14px', marginTop: '16px',
    background: 'linear-gradient(135deg, #11998e, #38ef7d)',
    color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer'
  }}>🎧 Shadowing Mode</button>
)}
```

---

## 4. COMPLETE BUTTON - Update onClick

Change the Complete Day button to:

```jsx
onClick={() => {
  completeDay(currentDay);
  setShowSuccess(true);
}}
```

---

## 5. MODALS - Add Before Final </div>

Add these before the final closing `</div>` of your component:

```jsx
{showReview && (
  <div style={{ position: 'fixed', inset: 0, background: '#f5f5f5', zIndex: 100, overflow: 'auto' }}>
    <ReviewSystem vocabulary={getAllVocab(CURRICULUM[currentDay])} onClose={() => setShowReview(false)} />
  </div>
)}

{showQuiz && (
  <div style={{ position: 'fixed', inset: 0, background: '#f5f5f5', zIndex: 100, overflow: 'auto' }}>
    <QuizMode vocabulary={getAllVocab(CURRICULUM[currentDay])} onClose={() => setShowQuiz(false)} />
  </div>
)}

{showShadowing && (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ background: 'white', borderRadius: '20px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto' }}>
      <ShadowingMode dayNumber={currentDay} phrases={getShadowPhrases(CURRICULUM[currentDay])} onClose={() => setShowShadowing(false)} />
    </div>
  </div>
)}

<SuccessAnimation show={showSuccess} onComplete={() => setShowSuccess(false)} message={`Day ${currentDay} Complete!`} />
```

---

## QUICK TEST

After adding, run `npm start` and test:
1. ✅ Header shows 🔥 streak and 🌱 PT stage
2. ✅ Vocabulary tab has "Review Words" and "Quiz Me" buttons
3. ✅ Listening tab (Day 7+) has "Shadowing Mode" button
4. ✅ Completing a day shows success animation
