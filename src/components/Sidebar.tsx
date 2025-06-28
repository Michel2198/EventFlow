import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  Search, 
  User, 
  Plus, 
  Users, 
  Activity, 
  ChevronDown, 
  X, 
  Clock, 
  TrendingUp
} from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  currentView: 'feed' | 'following' | 'search' | 'profile';
  onViewChange: (view: 'feed' | 'following' | 'search' | 'profile') => void;
  user: any;
  onAuthRequired: () => void;
  onCreateEvent: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  user,
  onAuthRequired,
  onCreateEvent,
  onLogout
}) => {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchOverlayRef = useRef<HTMLDivElement>(null);

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

  const handleSearchClick = () => {
    setShowSearchOverlay(true);
  };

  const handleSearchClose = () => {
    setShowSearchOverlay(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = (query: string) => {
    console.log('Searching for:', query);
    onViewChange('search');
    setShowSearchOverlay(false);
    setSearchQuery('');
  };

  // Handle click outside to close search overlay
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchOverlayRef.current && !searchOverlayRef.current.contains(event.target as Node)) {
        handleSearchClose();
      }
    };

    if (showSearchOverlay) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchOverlay]);

  // Regular app menu items
  const menuItems = [
    { id: 'feed', icon: Home, label: 'For You', action: () => onViewChange('feed') },
    { id: 'search', icon: Search, label: 'Explore', action: () => onViewChange('search') },
    { id: 'following', icon: Users, label: 'Following', action: () => onViewChange('following') },
    { id: 'create', icon: Plus, label: 'Create Event', action: handleCreateClick },
    { id: 'friends', icon: Users, label: 'Friends', action: () => {} },
    { id: 'live', icon: Activity, label: 'LIVE', action: () => {} },
    { id: 'profile', icon: User, label: 'Profile', action: handleProfileClick },
  ];

  const followingAccounts = [
    {
      id: 'nefla',
      name: 'nefla',
      username: 'nefla_ai',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face',
      verified: true
    },
    {
      id: 'jade',
      name: 'Jade🌸🌸',
      username: '_jade_0121_',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100&h=100&fit=crop&crop=face',
      verified: false
    },
    {
      id: 'anthony',
      name: 'J.Anthony',
      username: '_anthony_music',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=100&h=100&fit=crop&crop=face',
      verified: false
    },
    {
      id: 'lulu',
      name: 'Lulu Candles',
      username: 'lulucandlescollection',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=100&h=100&fit=crop&crop=face',
      verified: false
    },
    {
      id: 'isabel',
      name: 'Isabel Puerta, MSc',
      username: 'isabelpuertafertilidad',
      avatar: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?w=100&h=100&fit=crop&crop=face',
      verified: false
    }
  ];

  const recentSearches = [
    'jazz concerts',
    'food festivals', 
    'rooftop parties',
    'art galleries'
  ];

  const suggestions = [
    'pool parties',
    'live music venues',
    'wine tasting events',
    'comedy shows',
    'dance classes',
    'networking events',
    'outdoor concerts',
    'food trucks'
  ];

  const trendingSearches = [
    'summer festivals',
    'weekend events',
    'date night ideas'
  ];

  return (
    <div className="relative">
      {/* Main Sidebar - Shrinks to icon mode when search is open */}
      <div className={`bg-black flex flex-col h-screen sticky top-0 transition-all duration-300 flex-shrink-0 ${
        showSearchOverlay ? 'w-20' : 'w-64 xl:w-72'
      }`}>
        {/* Logo */}
        <div className={`p-6 ${showSearchOverlay ? 'flex justify-center' : ''}`}>
          {showSearchOverlay ? (
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-0.5" />
            </div>
          ) : (
            <Logo size="lg" />
          )}
        </div>

        {/* Search Field - Hidden when overlay is open */}
        {!showSearchOverlay && (
          <div className="px-6 mb-4">
            <button
              onClick={handleSearchClick}
              className="w-full bg-gray-900 hover:bg-gray-800 transition-colors rounded-full py-3 px-4 flex items-center space-x-3 text-left"
            >
              <Search className="text-gray-400" size={20} />
              <span className="text-gray-400 text-sm">Search events...</span>
            </button>
          </div>
        )}

        {/* Main Navigation */}
        <div className="flex-1 py-4">
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={item.action}
                    className={`w-full flex items-center transition-colors rounded-lg hover:bg-gray-900 ${
                      showSearchOverlay 
                        ? 'justify-center px-4 py-4' 
                        : 'space-x-3 px-3 py-3 text-left'
                    } ${
                      isActive ? 'text-purple-400 bg-purple-500/10' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <IconComponent size={24} className="flex-shrink-0" />
                    {!showSearchOverlay && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </button>
                  
                  {/* Tooltip for icon mode */}
                  {showSearchOverlay && (
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Following Accounts Section - Only for logged in users and not in icon mode */}
          {user && !showSearchOverlay && (
            <>
              {/* Very Subtle Divider */}
              <div className="mx-6 my-4 border-t border-gray-900/50"></div>

              <div className="px-6">
                <h3 className="text-gray-400 font-medium text-sm mb-3">Following accounts</h3>
                <div className="space-y-2">
                  {followingAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer group mx-3"
                    >
                      <img
                        src={account.avatar}
                        alt={account.name}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <p className="text-white font-medium text-sm truncate">{account.name}</p>
                          {account.verified && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-400 text-xs truncate">_{account.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* See more button */}
                <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mt-3 p-2 rounded-lg hover:bg-gray-900 w-full mx-3">
                  <ChevronDown size={16} />
                  <span className="text-sm font-medium">See more</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Bottom Section */}
        <div className={`p-4 space-y-4 ${showSearchOverlay ? 'flex flex-col items-center' : ''}`}>
          {/* Login Button - Only for non-logged in users */}
          {!user && !showSearchOverlay && (
            <button
              onClick={onAuthRequired}
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Log In
            </button>
          )}

          {/* User Section - Only for logged in users */}
          {user && (
            <div className={`flex items-center ${showSearchOverlay ? 'justify-center relative group' : 'space-x-3'}`}>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              {!showSearchOverlay ? (
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{user.name}</p>
                  <p className="text-gray-400 text-sm truncate">@{user.username}</p>
                </div>
              ) : (
                /* Tooltip for user avatar in icon mode */
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {user.name}
                </div>
              )}
            </div>
          )}

          {/* Company Links - Hidden in icon mode */}
          {!showSearchOverlay && (
            <div className="text-gray-500 text-sm space-y-1">
              <div>
                <a href="#" className="hover:text-gray-400 transition-colors">Company</a>
              </div>
              <div>
                <a href="#" className="hover:text-gray-400 transition-colors">Program</a>
              </div>
              <div>
                <a href="#" className="hover:text-gray-400 transition-colors">Terms & Policies</a>
              </div>
              <div className="pt-1">
                <span className="text-gray-600">© 2025 EventFlow</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Overlay - Slides in from the left */}
      {showSearchOverlay && (
        <div 
          ref={searchOverlayRef}
          className="fixed top-0 left-20 w-80 h-full bg-black border-r border-gray-800 z-50 transform transition-transform duration-300 ease-out"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-white font-semibold text-lg">Search</h2>
            <button
              onClick={handleSearchClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Input */}
          <div className="p-4 border-b border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    handleSearchSubmit(searchQuery.trim());
                  }
                }}
                className="w-full bg-gray-900 text-white placeholder-gray-400 rounded-full py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
            </div>
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto">
            {searchQuery === '' ? (
              <div className="p-4 space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <h3 className="text-white font-medium text-sm mb-3 flex items-center">
                      <Clock size={16} className="mr-2" />
                      Recent searches
                    </h3>
                    <div className="space-y-2 px-2">
                      {recentSearches.map((search, index) => (
                        <div key={index} className="flex items-center justify-between group">
                          <button
                            onClick={() => handleSearchSubmit(search)}
                            className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors text-sm py-2 flex-1 text-left hover:bg-gray-900 rounded-lg px-2"
                          >
                            <Clock size={14} className="text-gray-500" />
                            <span>{search}</span>
                          </button>
                          <button className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-300 transition-all p-1">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* You may like */}
                <div>
                  <h3 className="text-white font-medium text-sm mb-3">You may like</h3>
                  <div className="space-y-2 px-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearchSubmit(suggestion)}
                        className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors text-sm py-2 w-full text-left hover:bg-gray-900 rounded-lg px-2"
                      >
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trending */}
                <div>
                  <h3 className="text-white font-medium text-sm mb-3 flex items-center">
                    <TrendingUp size={16} className="mr-2 text-red-500" />
                    <span className="text-red-500">trending searches</span>
                  </h3>
                  <div className="space-y-2 px-2">
                    {trendingSearches.map((trend, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearchSubmit(trend)}
                        className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors text-sm py-2 w-full text-left hover:bg-gray-900 rounded-lg px-2"
                      >
                        <TrendingUp size={14} className="text-red-500" />
                        <span>{trend}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <p className="text-gray-400 text-sm">Search results for "{searchQuery}"</p>
                {/* Add search results here */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};