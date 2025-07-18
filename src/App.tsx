import React, { useState } from 'react';
import AIChat from './components/AIChat';
import VoiceChat from './components/VoiceChat';
import CBTSounds from './components/CBTSounds';
import MoodTracker from './components/MoodTracker';
import FriendManager from './components/FriendManager';
import Navigation from './components/Navigation';

export interface AIFriend {
  id: string;
  name: string;
  personality: string;
  avatar: string;
  specialties: string[];
  voiceType: string;
  responseStyle: string;
  color: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [friends, setFriends] = useState<AIFriend[]>([
    {
      id: '1',
      name: 'Alex',
      personality: 'Empathetic and supportive',
      avatar: '🤖',
      specialties: ['anxiety', 'stress'],
      voiceType: 'calm',
      responseStyle: 'gentle',
      color: 'from-blue-500 to-purple-600'
    }
  ]);
  const [selectedFriend, setSelectedFriend] = useState<AIFriend>(friends[0]);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <AIChat 
            friend={selectedFriend} 
            friends={friends}
            setFriends={setFriends}
            setSelectedFriend={setSelectedFriend}
          />
        );
      case 'voice':
        return <VoiceChat friend={selectedFriend} />;
      case 'sounds':
        return <CBTSounds />;
      case 'mood':
        return <MoodTracker />;
      default:
        return (
          <AIChat 
            friend={selectedFriend} 
            friends={friends}
            setFriends={setFriends}
            setSelectedFriend={setSelectedFriend}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto bg-black min-h-screen relative">
        {/* Main Content */}
        <div className="pb-20">
          {renderActiveComponent()}
        </div>
        
        {/* Bottom Navigation */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;