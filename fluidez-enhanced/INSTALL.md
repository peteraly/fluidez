# Installation Instructions

## Quick Install (Replace Existing)

```bash
# Navigate to your Fluidez directory
cd ~/fluidez

# Backup existing curriculum
cp -r src/content/days src/content/days-backup-$(date +%Y%m%d)

# Copy new enhanced curriculum
unzip fluidez-enhanced-curriculum.zip -d /tmp/
cp /tmp/fluidez-enhanced/days/*.json src/content/days/

# Verify installation
ls src/content/days/*.json | wc -l
# Should show: 30

# Restart the app
npm start
```

## Verify Content

After installation, check Day 22 should show:
- Title: "Introduction to Subjunctive"
- Level: B2
- WEIRDO triggers explanation

Day 29 should include:
- 20 idioms
- 15 conversation fillers
- Diminutives/augmentatives
- Regional variations

## Troubleshooting

### App still shows old content?
The app may have hardcoded curriculum. Check `src/App.js` around line 155. 
If you see `const curriculum = {`, it needs the dynamic loader.

Replace the hardcoded curriculum with:
```javascript
const curriculum = {};
const dayFiles = require.context('./content/days', false, /day\d+\.json$/);
dayFiles.keys().forEach(key => {
  const dayNum = parseInt(key.match(/day(\d+)/)[1]);
  const dayData = dayFiles(key);
  curriculum[dayNum] = {
    title: dayData.title,
    subtitle: dayData.subtitle,
    level: dayData.level,
    grammar: dayData.grammar,
    vocabulary: dayData.vocabulary,
    exercise: dayData.exercises || dayData.exercise,
    listening: dayData.listening,
    reading: dayData.reading,
    _raw: dayData
  };
});
```

### Days are locked?
Find the line with `const locked = day > currentDay` and change to:
```javascript
const locked = false; // Unlock all days for testing
```

## Content Summary

| Level | Days | Vocabulary | Grammar Focus |
|-------|------|------------|---------------|
| A1 | 1-7 | 400+ words | SER/ESTAR, present, vosotros/vos |
| A2 | 8-14 | 350+ words | Preterite, imperfect, reflexives |
| B1 | 15-21 | 350+ words | Future, commands, prepositions |
| B2 | 22-27 | 400+ words | Subjunctive complete, conditionals |
| C1-C2 | 28-30 | 500+ words | Advanced grammar, idioms, regional |

**Total: 2,000+ vocabulary words across 30 days**
