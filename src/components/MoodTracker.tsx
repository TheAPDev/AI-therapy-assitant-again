import React, { useState } from 'react';
import { Calendar, TrendingUp, BookOpen, Plus } from 'lucide-react';

interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  note: string;
  energy: number;
  stress: number;
}

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number>(5);
  const [note, setNote] = useState('');
  const [energy, setEnergy] = useState(5);
  const [stress, setStress] = useState(5);
  const [showJournal, setShowJournal] = useState(false);

  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    {
      id: '1',
      date: '2025-01-02',
      mood: 7,
      note: 'Had a productive day at work',
      energy: 8,
      stress: 4,
    },
    {
      id: '2',
      date: '2025-01-01',
      mood: 6,
      note: 'Feeling optimistic about the new year',
      energy: 7,
      stress: 3,
    },
  ]);

  const moods = [
    { value: 1, emoji: '😢', label: 'Very Low' },
    { value: 2, emoji: '😔', label: 'Low' },
    { value: 3, emoji: '😐', label: 'Neutral' },
    { value: 4, emoji: '🙂', label: 'Good' },
    { value: 5, emoji: '😊', label: 'Very Good' },
  ];

  const saveMoodEntry = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      note,
      energy,
      stress,
    };

    setMoodEntries(prev => [newEntry, ...prev]);
    setNote('');
    setSelectedMood(5);
    setEnergy(5);
    setStress(5);
  };

  if (showJournal) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Mood Journal</h1>
          <button
            onClick={() => setShowJournal(false)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700"
          >
            Back
          </button>
        </div>

        <div className="space-y-4">
          {moodEntries.map((entry) => (
            <div key={entry.id} className="bg-gray-900 rounded-xl p-4 border border-gray-700">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {moods.find(m => m.value === entry.mood)?.emoji}
                  </span>
                  <div>
                    <h3 className="text-white font-medium">
                      {moods.find(m => m.value === entry.mood)?.label}
                    </h3>
                    <p className="text-gray-400 text-sm">{entry.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-xs">
                    Energy: {entry.energy}/10 • Stress: {entry.stress}/10
                  </div>
                </div>
              </div>
              {entry.note && (
                <p className="text-gray-300 text-sm">{entry.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Mood Tracker</h1>
          <p className="text-gray-400">How are you feeling today?</p>
        </div>
        <button
          onClick={() => setShowJournal(true)}
          className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
        >
          <BookOpen size={20} />
        </button>
      </div>

      {/* Mood Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Your Mood</h2>
        <div className="grid grid-cols-5 gap-3">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                selectedMood === mood.value
                  ? 'bg-gray-800 border-white'
                  : 'bg-gray-900 border-gray-700 hover:bg-gray-800'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{mood.emoji}</div>
                <p className="text-white text-xs">{mood.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Energy Level */}
      <div className="mb-6">
        <h3 className="text-white font-medium mb-3">Energy Level</h3>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
          <div className="flex justify-between text-gray-400 text-sm mb-2">
            <span>Low</span>
            <span>High</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={energy}
            onChange={(e) => setEnergy(parseInt(e.target.value))}
            className="w-full accent-white"
          />
          <div className="text-center mt-2">
            <span className="text-white font-medium">{energy}/10</span>
          </div>
        </div>
      </div>

      {/* Stress Level */}
      <div className="mb-6">
        <h3 className="text-white font-medium mb-3">Stress Level</h3>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
          <div className="flex justify-between text-gray-400 text-sm mb-2">
            <span>Low</span>
            <span>High</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={stress}
            onChange={(e) => setStress(parseInt(e.target.value))}
            className="w-full accent-white"
          />
          <div className="text-center mt-2">
            <span className="text-white font-medium">{stress}/10</span>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="mb-8">
        <h3 className="text-white font-medium mb-3">Add a Note (Optional)</h3>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What's on your mind today?"
          className="w-full bg-gray-900 text-white rounded-xl p-4 border border-gray-700 focus:outline-none focus:border-gray-600 resize-none"
          rows={3}
        />
      </div>

      {/* Save Button */}
      <button
        onClick={saveMoodEntry}
        className="w-full bg-white text-black rounded-xl p-4 font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
      >
        <Plus size={20} />
        <span>Save Mood Entry</span>
      </button>

      {/* Recent Insights */}
      <div className="mt-8">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
          <div className="flex items-center mb-3">
            <TrendingUp className="text-white mr-2" size={20} />
            <h3 className="text-white font-medium">Recent Insight</h3>
          </div>
          <p className="text-gray-300 text-sm">
            Your mood has been trending upward over the past week. Keep up the positive momentum!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;