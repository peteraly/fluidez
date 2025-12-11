import day01 from './days/day01.json';
import flashcardsData from './flashcards.json';
import assessmentsData from './assessments.json';

// For now, we only have day01 fully in JSON
// The rest will use the inline curriculum until migrated
export const curriculumJSON = {
  1: day01,
};

export const flashcards = flashcardsData.cards;
export const assessments = assessmentsData;

export const getDay = (dayNumber) => curriculumJSON[dayNumber] || null;
export const getFlashcardsForDay = (dayNumber) => 
  flashcards.filter(card => card.day <= dayNumber);
export const getAssessment = (weekNumber) => 
  assessments[`week${weekNumber}`] || null;
