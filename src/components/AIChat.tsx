import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Users, Plus, Edit3, Trash2, Settings } from 'lucide-react';
import { AIFriend } from '../App';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIChatProps {
  friend: AIFriend;
  friends: AIFriend[];
  setFriends: (friends: AIFriend[]) => void;
  setSelectedFriend: (friend: AIFriend) => void;
}

const AIChat: React.FC<AIChatProps> = ({ friend, friends, setFriends, setSelectedFriend }) => {
  const [showFriendSelector, setShowFriendSelector] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingFriend, setEditingFriend] = useState<AIFriend | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    personality: '',
    avatar: '🤖',
    specialties: [] as string[],
    voiceType: 'calm',
    responseStyle: 'gentle',
    color: 'from-blue-500 to-purple-600',
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi there! I'm ${friend.name} ${friend.avatar} I'm here to listen, support, and guide you through your thoughts and feelings. How are you doing today?`,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const avatarOptions = ['🤖', '👨‍⚕️', '👩‍⚕️', '🧠', '💙', '🌟', '🦋', '🌸', '🍃', '☀️'];
  const colorOptions = [
    { name: 'Blue Purple', value: 'from-blue-500 to-purple-600' },
    { name: 'Green Teal', value: 'from-green-500 to-teal-600' },
    { name: 'Pink Rose', value: 'from-pink-500 to-rose-600' },
    { name: 'Orange Yellow', value: 'from-orange-500 to-yellow-600' },
    { name: 'Indigo Blue', value: 'from-indigo-500 to-blue-600' },
    { name: 'Purple Pink', value: 'from-purple-500 to-pink-600' },
  ];

  const specialtyOptions = [
    'anxiety', 'depression', 'stress', 'relationships', 'work', 'sleep', 
    'self-esteem', 'trauma', 'grief', 'mindfulness', 'motivation', 'creativity'
  ];

  const personalityOptions = [
    'Empathetic and supportive',
    'Wise and philosophical',
    'Energetic and motivational',
    'Calm and meditative',
    'Analytical and logical',
    'Creative and inspiring',
    'Humorous and lighthearted',
    'Direct and practical',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Update messages when friend changes
    setMessages([
      {
        id: '1',
        text: `Hi there! I'm ${friend.name} ${friend.avatar} I'm here to listen, support, and guide you through your thoughts and feelings. How are you doing today?`,
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
  }, [friend]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText, friend),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string, friend: AIFriend): string => {
    const baseResponses = {
      gentle: [
        "Thank you for sharing that with me. It takes courage to express your feelings. Can you tell me more about what's been on your mind?",
        "I hear you, and your feelings are completely valid. What would you say is the most challenging part of what you're experiencing right now?",
        "That sounds really difficult. Remember that you're not alone in this. What are some small things that usually help you feel a bit better?",
      ],
      direct: [
        "I understand what you're saying. Let's focus on what specific steps we can take to address this situation.",
        "That's a challenging situation. What do you think would be the most practical first step to take?",
        "I can see why that would be difficult. What resources or support do you have available to help with this?",
      ],
      encouraging: [
        "You're showing incredible strength by reaching out and talking about this. What positive changes have you noticed in yourself recently?",
        "I believe in your ability to work through this. What's one small victory you've had lately that we can build on?",
        "You've overcome challenges before, and you have the resilience to handle this too. What strategies have worked for you in the past?",
      ],
      analytical: [
        "Let's break this down systematically. What patterns do you notice in when these feelings tend to arise?",
        "That's an interesting observation. How do you think your thoughts might be influencing your emotions in this situation?",
        "I'm curious about the connection between what you're experiencing and your daily routines. Have you noticed any correlations?",
      ],
    };

    const responses = baseResponses[friend.responseStyle as keyof typeof baseResponses] || baseResponses.gentle;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const resetForm = () => {
    setFormData({
      name: '',
      personality: '',
      avatar: '🤖',
      specialties: [],
      voiceType: 'calm',
      responseStyle: 'gentle',
      color: 'from-blue-500 to-purple-600',
    });
    setShowCreateForm(false);
    setEditingFriend(null);
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    const newFriend: AIFriend = {
      id: editingFriend ? editingFriend.id : Date.now().toString(),
      ...formData,
    };

    if (editingFriend) {
      setFriends(friends.map(f => f.id === editingFriend.id ? newFriend : f));
      setSelectedFriend(newFriend);
    } else {
      setFriends([...friends, newFriend]);
      setSelectedFriend(newFriend);
    }

    resetForm();
    setShowFriendSelector(false);
  };

  const deleteFriend = (friendId: string) => {
    if (friends.length === 1) return;
    
    const updatedFriends = friends.filter(f => f.id !== friendId);
    setFriends(updatedFriends);
    
    if (friend.id === friendId) {
      setSelectedFriend(updatedFriends[0]);
    }
  };

  const startEdit = (friendToEdit: AIFriend) => {
    setFormData({
      name: friendToEdit.name,
      personality: friendToEdit.personality,
      avatar: friendToEdit.avatar,
      specialties: friendToEdit.specialties,
      voiceType: friendToEdit.voiceType,
      responseStyle: friendToEdit.responseStyle,
      color: friendToEdit.color,
    });
    setEditingFriend(friendToEdit);
    setShowCreateForm(true);
  };

  const toggleSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  // Friend Creation Form
  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            {editingFriend ? 'Edit AI Friend' : 'Create New AI Friend'}
          </h1>
          <p className="text-gray-400">Customize your AI companion's personality</p>
        </div>

        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-white font-medium mb-2">Friend Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter a name for your AI friend"
              className="w-full bg-gray-800 text-white rounded-xl p-4 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-white font-medium mb-2">Avatar</label>
            <div className="grid grid-cols-5 gap-3">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setFormData(prev => ({ ...prev, avatar }))}
                  className={`p-4 rounded-xl border-2 text-2xl transition-all duration-200 ${
                    formData.avatar === avatar
                      ? 'border-blue-500 bg-gray-800'
                      : 'border-gray-700 bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          {/* Personality */}
          <div>
            <label className="block text-white font-medium mb-2">Personality</label>
            <select
              value={formData.personality}
              onChange={(e) => setFormData(prev => ({ ...prev, personality: e.target.value }))}
              className="w-full bg-gray-800 text-white rounded-xl p-4 border border-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select personality type</option>
              {personalityOptions.map((personality) => (
                <option key={personality} value={personality}>
                  {personality}
                </option>
              ))}
            </select>
          </div>

          {/* Color Theme */}
          <div>
            <label className="block text-white font-medium mb-2">Color Theme</label>
            <div className="grid grid-cols-2 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.color === color.value
                      ? 'border-white'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${color.value} mb-2`} />
                  <span className="text-white text-sm">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <label className="block text-white font-medium mb-2">Specialties (Select up to 4)</label>
            <div className="grid grid-cols-2 gap-2">
              {specialtyOptions.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => toggleSpecialty(specialty)}
                  disabled={!formData.specialties.includes(specialty) && formData.specialties.length >= 4}
                  className={`p-3 rounded-lg border text-sm transition-all duration-200 ${
                    formData.specialties.includes(specialty)
                      ? 'border-blue-500 bg-blue-500 bg-opacity-20 text-blue-300'
                      : 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>

          {/* Response Style */}
          <div>
            <label className="block text-white font-medium mb-2">Response Style</label>
            <select
              value={formData.responseStyle}
              onChange={(e) => setFormData(prev => ({ ...prev, responseStyle: e.target.value }))}
              className="w-full bg-gray-800 text-white rounded-xl p-4 border border-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="gentle">Gentle & Supportive</option>
              <option value="direct">Direct & Practical</option>
              <option value="encouraging">Encouraging & Motivational</option>
              <option value="analytical">Analytical & Thoughtful</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              onClick={handleSubmit}
              disabled={!formData.name.trim() || !formData.personality}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
            >
              {editingFriend ? 'Update Friend' : 'Create Friend'}
            </button>
            <button
              onClick={resetForm}
              className="flex-1 bg-gray-800 text-white rounded-xl p-4 font-semibold border border-gray-700 hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Friend Selector Modal
  if (showFriendSelector) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Choose AI Friend</h1>
            <p className="text-gray-400">Select or create your AI companion</p>
          </div>
          <button
            onClick={() => setShowFriendSelector(false)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700"
          >
            Back
          </button>
        </div>

        {/* Create New Friend Button */}
        <button
          onClick={() => setShowCreateForm(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 mb-6 font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>Create New AI Friend</span>
        </button>

        {/* Friends List */}
        <div className="space-y-3">
          {friends.map((friendOption) => (
            <div
              key={friendOption.id}
              className={`bg-gray-900 rounded-xl p-4 border transition-all duration-200 ${
                friend.id === friendOption.id
                  ? 'border-blue-500 bg-opacity-80'
                  : 'border-gray-700 hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedFriend(friendOption);
                    setShowFriendSelector(false);
                  }}
                  className="flex items-center space-x-3 flex-1"
                >
                  <div className="text-2xl">{friendOption.avatar}</div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold">{friendOption.name}</h3>
                    <p className="text-gray-400 text-sm">{friendOption.personality}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {friendOption.specialties.slice(0, 2).map((specialty) => (
                        <span
                          key={specialty}
                          className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
                
                <div className="flex items-center space-x-2">
                  {friend.id === friendOption.id && (
                    <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse" />
                  )}
                  <button
                    onClick={() => startEdit(friendOption)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                  {friends.length > 1 && (
                    <button
                      onClick={() => deleteFriend(friendOption.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className={`bg-gradient-to-r ${friend.color} border-b border-gray-700 p-6 shadow-xl`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4 animate-pulse">
              <span className="text-2xl">{friend.avatar}</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">{friend.name}</h2>
              <p className="text-white text-opacity-80 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                {friend.personality}
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {friend.specialties.slice(0, 2).map((specialty) => (
                  <span
                    key={specialty}
                    className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowFriendSelector(true)}
            className="bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition-all duration-200"
          >
            <Users size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 shadow-lg transform transition-all duration-300 hover:scale-105 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gradient-to-r from-gray-800 to-gray-700 text-white border border-gray-600'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'ai' && (
                  <Bot size={16} className="text-blue-300 mt-1 flex-shrink-0" />
                )}
                <p className="text-sm leading-relaxed font-medium">{message.text}</p>
                {message.sender === 'user' && (
                  <User size={16} className="text-blue-200 mt-1 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-4 border border-gray-600 shadow-lg animate-pulse">
              <div className="flex items-center space-x-2">
                <Bot size={16} className="text-blue-300" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700 p-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Share your thoughts and feelings..."
            className="flex-1 bg-gray-800 text-white rounded-full px-6 py-4 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 placeholder-gray-400"
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-4 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 shadow-lg"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;