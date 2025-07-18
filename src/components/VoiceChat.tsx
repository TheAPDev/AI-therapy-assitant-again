import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2 } from 'lucide-react';
import { AIFriend } from '../App';

interface VoiceChatProps {
  friend: AIFriend;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ friend }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = () => {
    setIsCallActive(true);
    setCallDuration(0);
  };

  const endCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!isCallActive) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
        <div className="text-center mb-12">
          <div className="bg-gray-800 rounded-full p-8 mb-6 border border-gray-700">
            <Phone className="text-white" size={64} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Voice Session with {friend.name}</h1>
          <p className="text-gray-400 mb-8">Connect with {friend.name} through voice</p>
        </div>

        <div className="w-full max-w-sm space-y-4 mb-8">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
            <h3 className="text-white font-semibold mb-2">Session Benefits</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Natural conversation flow</li>
              <li>• Emotion detection in voice</li>
              <li>• Real-time therapeutic guidance</li>
              <li>• Complete privacy & confidentiality</li>
            </ul>
          </div>
        </div>

        <button
          onClick={startCall}
          className="bg-white text-black rounded-full p-6 hover:bg-gray-200 transition-all duration-200 hover:scale-105"
        >
          <Phone size={32} />
        </button>
        <p className="text-gray-400 text-sm mt-4">Tap to start voice session</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      {/* Call Status */}
      <div className="text-center mb-12">
        <div className={`bg-gradient-to-r ${friend.color} rounded-full p-8 mb-6 border border-gray-700 animate-pulse`}>
          <span className="text-4xl">{friend.avatar}</span>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">{friend.name}</h2>
        <p className="text-gray-400 mb-4">Connected and listening</p>
        <div className="bg-gray-800 rounded-full px-4 py-2 border border-gray-700">
          <span className="text-white font-mono text-lg">{formatTime(callDuration)}</span>
        </div>
      </div>

      {/* Voice Visualization */}
      <div className="flex items-center justify-center mb-12 space-x-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 32 + 16 + 'px',
              animationDelay: i * 0.1 + 's',
            }}
          />
        ))}
      </div>

      {/* Call Controls */}
      <div className="flex items-center space-x-8">
        <button
          onClick={toggleMute}
          className={`p-4 rounded-full transition-all duration-200 ${
            isMuted 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-gray-800 hover:bg-gray-700 border border-gray-600'
          }`}
        >
          {isMuted ? <MicOff className="text-white" size={24} /> : <Mic className="text-white" size={24} />}
        </button>

        <button
          onClick={endCall}
          className="bg-red-600 hover:bg-red-700 rounded-full p-6 transition-all duration-200 hover:scale-105"
        >
          <PhoneOff className="text-white" size={32} />
        </button>
      </div>

      <p className="text-gray-400 text-sm mt-6">
        {isMuted ? 'Microphone muted' : 'Speak freely, I\'m here to listen'}
      </p>
    </div>
  );
};

export default VoiceChat;