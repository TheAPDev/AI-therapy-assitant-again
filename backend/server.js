import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { addMoodEntry, getMoodEntries } from './memory.js';
import { addChatMessage, getChatHistory } from './chatMemory.js';

const app = express();
app.use(express.json());
app.use(cors());

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;

// Example NVIDIA API proxy endpoint
app.post('/api/nvidia', async (req, res) => {
  try {
    const { prompt, systemPrompt } = req.body;
    const response = await axios.post(
      'https://integrate.api.nvidia.com/v1/chat/completions',
      {
        model: 'nvidia/llama-3.1-nemotron-nano-4b-v1.1',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.6,
        top_p: 0.95,
        max_tokens: 1024 // Lowered for safety, adjust as needed
      },
      {
        headers: {
          'Authorization': `Bearer ${NVIDIA_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('NVIDIA API full response:', JSON.stringify(response.data, null, 2));
    // Try to extract reasoning_content if present, else use message content
    let aiReply = response.data.choices?.[0]?.message?.content || '';
    if (response.data.choices?.[0]?.delta?.reasoning_content) {
      aiReply = response.data.choices[0].delta.reasoning_content;
    }
    if (!aiReply) aiReply = 'No response from model.';
    res.json({ response: aiReply });
  } catch (error) {
    console.error('NVIDIA API error:', error?.response?.data || error.message);
    res.status(500).json({ error: error?.response?.data || error.message });
  }
});

// Mood memory endpoints
app.post('/api/mood', (req, res) => {
  const entry = req.body;
  if (!entry || !entry.id || !entry.date) {
    return res.status(400).json({ error: 'Invalid mood entry' });
  }
  addMoodEntry(entry);
  res.json({ success: true });
});

app.get('/api/mood', (req, res) => {
  res.json(getMoodEntries());
});

// Chat memory endpoints
app.post('/api/chat/:friendId', (req, res) => {
  const { friendId } = req.params;
  const message = req.body;
  if (!friendId || !message || !message.text || !message.sender) {
    return res.status(400).json({ error: 'Invalid chat message' });
  }
  addChatMessage(friendId, message);
  res.json({ success: true });
});

app.get('/api/chat/:friendId', (req, res) => {
  const { friendId } = req.params;
  res.json(getChatHistory(friendId));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
