# Engagement Features Integration Guide

## What Was Added

1. **Components Created:**
   - `src/components/MariaGreeting.js` - Greeting on app open
   - `src/components/SessionTeaser.js` - "Tomorrow..." hooks on complete
   - `src/components/RandomDelight.js` - Occasional surprises
   - `src/components/NoticingDisplay.js` - Color-coded grammar (needs JSON data)
   - `src/components/ShadowingMode.js` - Audio practice (needs JSON data)

2. **InteractiveCurriculum.js Modified:**
   - Added imports for RandomDelight, SessionTeaser
   - Added `showTeaser` state
   - Complete button now shows teaser

3. **App.js Modified:**
   - Added MariaGreeting import
   - Added `showMariaGreeting` state

## Manual Integration Needed

### To Show MariaGreeting on App Open:

Add this near the top of App.js return:
```jsx
{showMariaGreeting && (
  <MariaGreeting 
    currentDay={currentDay}
    streak={streakCount}
    onDismiss={() => setShowMariaGreeting(false)}
  />
)}
```

### To Show SessionTeaser When Completing a Day:

In InteractiveCurriculum.js, add before the Complete Button:
```jsx
{showTeaser && (
  <SessionTeaser 
    currentDay={day}
    onDismiss={() => { setShowTeaser(false); onComplete(); }}
    onRemind={() => { setShowTeaser(false); onComplete(); }}
  />
)}
```

### To Show RandomDelight:

Add at the start of any component's return:
```jsx
<RandomDelight triggerChance={0.08} />
```

## Features That Need JSON Migration

These features require the app to load from JSON files instead of hardcoded CURRICULUM:
- NoticingDisplay (needs `noticingEnhancements` in JSON)
- ShadowingMode (needs `shadowingMode` in JSON)
- PT Stage badges (needs `processabilityTheory` in JSON)

The JSON files in `src/content/days/` have this data, but the app currently uses
hardcoded data in InteractiveCurriculum.js.

## Migration Path

1. Current: Hardcoded CURRICULUM (working)
2. Phase 1: Add engagement UI (this script)
3. Phase 2: Migrate to JSON files (future)
4. Phase 3: Enable full Noticing/Shadowing features

