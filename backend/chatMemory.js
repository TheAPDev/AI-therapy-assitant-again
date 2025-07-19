// backend/chatMemory.js
// In-memory chat history per friend (for demo; use DB for production)

const chatHistory = {};

export function addChatMessage(friendId, message) {
  if (!chatHistory[friendId]) chatHistory[friendId] = [];
  chatHistory[friendId].push(message);
  // Keep only the latest 50 messages per friend
  if (chatHistory[friendId].length > 50) chatHistory[friendId] = chatHistory[friendId].slice(-50);
}

export function getChatHistory(friendId) {
  return chatHistory[friendId] || [];
}
