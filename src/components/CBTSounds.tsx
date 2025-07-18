import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, RotateCcw, Settings } from 'lucide-react';

interface SoundTrack {
  id: string;
  name: string;
  category: 'stress' | 'headache' | 'anxiety' | 'sleep';
  duration: number;
  description: string;
}

const CBTSounds: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<SoundTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  const soundTracks: SoundTrack[] = [
    {
      id: '1',
      name: 'Ocean Waves',
      category: 'stress',
      duration: 600,
      description: 'Gentle ocean sounds for stress relief',
    },
    {
      id: '2',
      name: 'Rain Forest',
      category: 'anxiety',
      duration: 900,
      description: 'Tropical rainforest ambience for anxiety',
    },
    {
      id: '3',
      name: 'Binaural Beats',
      category: 'headache',
      duration: 720,
      description: 'Alpha waves for headache relief',
    },
    {
      id: '4',
      name: 'White Noise',
      category: 'sleep',
      duration: 1800,
      description: 'Pure white noise for better sleep',
    },
    {
      id: '5',
      name: 'Meditation Bell',
      category: 'stress',
      duration: 300,
      description: 'Tibetan singing bowls for deep relaxation',
    },
    {
      id: '6',
      name: 'Nature Symphony',
      category: 'anxiety',
      duration: 1200,
      description: 'Birds and gentle breeze for calm',
    },
  ];

  const categories = [
    { id: 'stress', name: 'Stress Relief', color: 'bg-blue-900' },
    { id: 'anxiety', name: 'Anxiety', color: 'bg-green-900' },
    { id: 'headache', name: 'Headache', color: 'bg-purple-900' },
    { id: 'sleep', name: 'Sleep', color: 'bg-indigo-900' },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Simulate audio playback (since we don't have actual audio files)
        audioRef.current.play().catch(() => {
          // Fallback to visual-only playback simulation
          console.log('Audio playback simulated');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const selectTrack = (track: SoundTrack) => {
    setSelectedTrack(track);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="min-h-screen bg-black p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">CBT Sound Therapy</h1>
        <p className="text-gray-400">Therapeutic sounds for mental wellness</p>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Categories</h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${category.color} rounded-xl p-4 border border-gray-700`}
            >
              <h3 className="text-white font-medium">{category.name}</h3>
              <p className="text-gray-300 text-sm">
                {soundTracks.filter(track => track.category === category.id).length} tracks
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sound Tracks */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Available Sounds</h2>
        <div className="space-y-3">
          {soundTracks.map((track) => (
            <button
              key={track.id}
              onClick={() => selectTrack(track)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                selectedTrack?.id === track.id
                  ? 'bg-gray-800 border-white'
                  : 'bg-gray-900 border-gray-700 hover:bg-gray-800'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-medium">{track.name}</h3>
                  <p className="text-gray-400 text-sm">{track.description}</p>
                  <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full mt-2">
                    {categories.find(cat => cat.id === track.category)?.name}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">{formatTime(track.duration)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Player */}
      {selectedTrack && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 mx-4">
            <div className="text-center mb-4">
              <h3 className="text-white font-semibold">{selectedTrack.name}</h3>
              <p className="text-gray-400 text-sm">{selectedTrack.description}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-gray-400 text-sm mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(selectedTrack.duration)}</span>
              </div>
              <div className="bg-gray-800 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{
                    width: `${(currentTime / selectedTrack.duration) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-6 mb-4">
              <button
                onClick={resetTrack}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw size={20} />
              </button>

              <button
                onClick={togglePlayPause}
                className="bg-white text-black rounded-full p-4 hover:bg-gray-200 transition-all duration-200 hover:scale-105"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings size={20} />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-3">
              <Volume2 className="text-gray-400" size={16} />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 accent-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/placeholder-audio.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default CBTSounds;