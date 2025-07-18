import React from 'react';
import { MessageCircle, Phone, Music, Heart, Users } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'voice', icon: Phone, label: 'Voice' },
    { id: 'sounds', icon: Music, label: 'Sounds' },
    { id: 'mood', icon: Heart, label: 'Mood' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gray-900 border-t border-gray-800">
      <div className="flex justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-3 px-4 rounded-xl transition-all duration-300 transform ${
                isActive 
                  ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 scale-110 shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800 hover:scale-105'
              }`}
            >
              <Icon size={22} />
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;