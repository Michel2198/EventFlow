import React from 'react';
import { Home, Search, User, Plus } from 'lucide-react';

interface MobileNavigationProps {
  currentView: 'feed' | 'following' | 'search' | 'profile';
  onViewChange: (view: 'feed' | 'following' | 'search' | 'profile') => void;
  user: any;
  onAuthRequired: () => void;
  onCreateEvent: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentView,
  onViewChange,
  user,
  onAuthRequired,
  onCreateEvent
}) => {
  const handleProfileClick = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    onViewChange('profile');
  };

  const handleCreateClick = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    onCreateEvent();
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-black/90 backdrop-blur-lg border-t border-gray-800 safe-area-pb">
      <div className="flex items-center justify-around py-2">
        <button
          onClick={() => onViewChange('feed')}
          className={`p-3 rounded-full transition-all duration-200 ${
            currentView === 'feed' 
              ? 'text-white bg-gradient-to-r from-purple-500 to-pink-500' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Home size={24} />
        </button>
        
        <button
          onClick={() => onViewChange('search')}
          className={`p-3 rounded-full transition-all duration-200 ${
            currentView === 'search' 
              ? 'text-white bg-gradient-to-r from-purple-500 to-pink-500' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Search size={24} />
        </button>
        
        <button 
          onClick={handleCreateClick}
          className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        >
          <Plus size={24} />
        </button>
        
        <button
          onClick={handleProfileClick}
          className={`p-3 rounded-full transition-all duration-200 ${
            currentView === 'profile' 
              ? 'text-white bg-gradient-to-r from-purple-500 to-pink-500' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <User size={24} />
        </button>
      </div>
    </div>
  );
};