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
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-800 bg-opacity-90 border-t border-blue-900 shadow-2xl backdrop-blur-md">
      <div className="flex justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-3 px-4 rounded-xl transition-all duration-300 transform group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900
                ${isActive 
                  ? 'text-blue-200 bg-gradient-to-r from-blue-800 to-cyan-600 scale-110 shadow-xl animate-glow' 
                  : 'text-gray-400 hover:text-blue-300 hover:bg-blue-900 hover:scale-105'}
              `}
            >
              <span className="transition-transform duration-300 group-hover:scale-125">
                <Icon size={26} className="drop-shadow-lg" />
              </span>
              <span className="text-xs mt-1 font-semibold tracking-wide group-hover:text-blue-200 transition-colors duration-300">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;