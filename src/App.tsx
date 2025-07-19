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

  // Persist selected color theme for all tabs
  React.useEffect(() => {
    if (selectedFriend?.color) {
      localStorage.setItem('selectedFriendColor', selectedFriend.color);
    }
  }, [selectedFriend]);

  // Helper to map color theme to gradient class
  const getGradientClass = (color: string) => {
    if (!color) return '';
    if (color.includes('pink')) return 'gradient-pink-rose';
    if (color.includes('indigo')) return 'gradient-indigo-blue';
    if (color.includes('orange') || color.includes('yellow')) return 'gradient-orange-yellow';
    if (color.includes('purple') && color.includes('pink')) return 'gradient-purple-pink';
    if (color.includes('green') || color.includes('teal')) return 'gradient-green-teal';
    if (color.includes('blue') && color.includes('purple')) return 'gradient-blue-purple';
    return '';
  };

  const gradientClass = getGradientClass(selectedFriend.color);

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
      <div className={`max-w-md mx-auto min-h-screen relative theme-gradient-bg ${gradientClass}`}>
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