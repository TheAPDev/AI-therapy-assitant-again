// backend/music.js
// Backend for music section: serves music track data and (optionally) audio files

const express = require('express');
const router = express.Router();

// Example music tracks (should match frontend structure)
const musicTracks = [
  {
    id: '1',
    name: 'Ocean Waves',
    category: 'stress',
    duration: 600,
    description: 'Gentle ocean sounds for stress relief',
    url: '/music/ocean-waves.mp3',
  },
  {
    id: '2',
    name: 'Rain Forest',
    category: 'anxiety',
    duration: 900,
    description: 'Tropical rainforest ambience for anxiety',
    url: '/music/rain-forest.mp3',
  },
  {
    id: '3',
    name: 'Binaural Beats',
    category: 'headache',
    duration: 720,
    description: 'Alpha waves for headache relief',
    url: '/music/binaural-beats.mp3',
  },
  {
    id: '4',
    name: 'White Noise',
    category: 'sleep',
    duration: 1800,
    description: 'Pure white noise for better sleep',
    url: '/music/white-noise.mp3',
  },
  {
    id: '5',
    name: 'Meditation Bell',
    category: 'stress',
    duration: 300,
    description: 'Tibetan singing bowls for deep relaxation',
    url: '/music/meditation-bell.mp3',
  },
  {
    id: '6',
    name: 'Nature Symphony',
    category: 'anxiety',
    duration: 1200,
    description: 'Birds and gentle breeze for calm',
    url: '/music/nature-symphony.mp3',
  },
];

// GET /api/music - list all music tracks
router.get('/', (req, res) => {
  res.json(musicTracks);
});

module.exports = router;
