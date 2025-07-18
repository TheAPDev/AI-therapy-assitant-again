import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Star, Sparkles, Heart, Brain } from 'lucide-react';
import { AIFriend } from '../App';

interface FriendManagerProps {
  friends: AIFriend[];
  setFriends: (friends: AIFriend[]) => void;
  selectedFriend: AIFriend;
  setSelectedFriend: (friend: AIFriend) => void;
}

const FriendManager: React.FC<FriendManagerProps> = ({
  friends,
  setFriends,
  selectedFriend,
  setSelectedFriend,
}) => {
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
      if (selectedFriend.id === editingFriend.id) {
        setSelectedFriend(newFriend);
      }
    } else {
      setFriends([...friends, newFriend]);
    }

    resetForm();
  };

  const deleteFriend = (friendId: string) => {
    if (friends.length === 1) return; // Don't delete the last friend
    
    const updatedFriends = friends.filter(f => f.id !== friendId);
    setFriends(updatedFriends);
    
    if (selectedFriend.id === friendId) {
      setSelectedFriend(updatedFriends[0]);
    }
  };

  const startEdit = (friend: AIFriend) => {
    setFormData({
      name: friend.name,
      personality: friend.personality,
      avatar: friend.avatar,
      specialties: friend.specialties,
      voiceType: friend.voiceType,
      responseStyle: friend.responseStyle,
      color: friend.color,
    });
    setEditingFriend(friend);
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

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            {editingFriend ? 'Edit Friend' : 'Create New AI Friend'}
          </h1>
          <p className="text-gray-400">Customize your AI companion's personality and features</p>
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
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">AI Friends</h1>
          <p className="text-gray-400">Manage your AI companions</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-3 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Current Friend */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">Currently Active</h2>
        <div className={`bg-gradient-to-r ${selectedFriend.color} rounded-xl p-4 border border-gray-700`}>
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{selectedFriend.avatar}</div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg">{selectedFriend.name}</h3>
              <p className="text-white text-opacity-80 text-sm">{selectedFriend.personality}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedFriend.specialties.slice(0, 3).map((specialty) => (
                  <span
                    key={specialty}
                    className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            <Star className="text-yellow-400" size={20} />
          </div>
        </div>
      </div>

      {/* All Friends */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">All Friends ({friends.length})</h2>
        <div className="space-y-3">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className={`bg-gray-900 rounded-xl p-4 border transition-all duration-200 ${
                selectedFriend.id === friend.id
                  ? 'border-blue-500 bg-opacity-80'
                  : 'border-gray-700 hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedFriend(friend)}
                  className="flex items-center space-x-3 flex-1"
                >
                  <div className="text-2xl">{friend.avatar}</div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold">{friend.name}</h3>
                    <p className="text-gray-400 text-sm">{friend.personality}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {friend.specialties.slice(0, 2).map((specialty) => (
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
                  {selectedFriend.id === friend.id && (
                    <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse" />
                  )}
                  <button
                    onClick={() => startEdit(friend)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                  {friends.length > 1 && (
                    <button
                      onClick={() => deleteFriend(friend.id)}
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

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700 text-center">
          <Brain className="text-blue-400 mx-auto mb-2" size={24} />
          <p className="text-white font-semibold">{friends.length}</p>
          <p className="text-gray-400 text-sm">AI Friends</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700 text-center">
          <Sparkles className="text-purple-400 mx-auto mb-2" size={24} />
          <p className="text-white font-semibold">
            {new Set(friends.flatMap(f => f.specialties)).size}
          </p>
          <p className="text-gray-400 text-sm">Specialties</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700 text-center">
          <Heart className="text-pink-400 mx-auto mb-2" size={24} />
          <p className="text-white font-semibold">Active</p>
          <p className="text-gray-400 text-sm">Status</p>
        </div>
      </div>
    </div>
  );
};

export default FriendManager;