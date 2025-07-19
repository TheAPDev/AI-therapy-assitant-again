// backend/memory.js
// Simple in-memory store for mood entries (for demo; replace with DB for production)

let moodEntries = [];

export function addMoodEntry(entry) {
  moodEntries.unshift(entry);
  // Keep only the latest 100 entries for demo
  if (moodEntries.length > 100) moodEntries = moodEntries.slice(0, 100);
}

export function getMoodEntries() {
  return moodEntries;
}
