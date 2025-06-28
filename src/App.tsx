import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MobileNavigation } from './components/MobileNavigation';
import { Feed } from './components/Feed';
import { Following } from './components/Following';
import { Profile } from './components/Profile';
import { Search } from './components/Search';
import { EventModal } from './components/EventModal';
import { AuthModal } from './components/AuthModal';
import { CreateEventModal } from './components/CreateEventModal';
import { CommentsModal } from './components/CommentsModal';
import { RecommendationsSidebar } from './components/RecommendationsSidebar';
import { AppProvider } from './context/AppContext';

function App() {
  const [currentView, setCurrentView] = useState<'feed' | 'following' | 'search' | 'profile'>('feed');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showComments, setShowComments] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [viewingProfile, setViewingProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted state on app initialization
  useEffect(() => {
    const loadPersistedState = () => {
      try {
        // Load user session
        const savedUser = localStorage.getItem('eventflow_user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        }

        // Load last view
        const savedView = localStorage.getItem('eventflow_current_view');
        if (savedView && ['feed', 'following', 'search', 'profile'].includes(savedView)) {
          setCurrentView(savedView as any);
        }

        // Load viewing profile state
        const savedViewingProfile = localStorage.getItem('eventflow_viewing_profile');
        if (savedViewingProfile) {
          setViewingProfile(JSON.parse(savedViewingProfile));
        }
      } catch (error) {
        console.error('Error loading persisted state:', error);
        // Clear corrupted data
        localStorage.removeItem('eventflow_user');
        localStorage.removeItem('eventflow_current_view');
        localStorage.removeItem('eventflow_viewing_profile');
      } finally {
        setIsLoading(false);
      }
    };

    loadPersistedState();
  }, []);

  // Persist user session
  useEffect(() => {
    if (user) {
      localStorage.setItem('eventflow_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eventflow_user');
      // Clear other user-specific data when logging out
      localStorage.removeItem('eventflow_current_view');
      localStorage.removeItem('eventflow_viewing_profile');
    }
  }, [user]);

  // Persist current view
  useEffect(() => {
    if (user) {
      localStorage.setItem('eventflow_current_view', currentView);
    }
  }, [currentView, user]);

  // Persist viewing profile state
  useEffect(() => {
    if (viewingProfile) {
      localStorage.setItem('eventflow_viewing_profile', JSON.stringify(viewingProfile));
    } else {
      localStorage.removeItem('eventflow_viewing_profile');
    }
  }, [viewingProfile]);

  const handleViewChange = (view: 'feed' | 'following' | 'search' | 'profile') => {
    setCurrentView(view);
    
    // Clear viewing profile when changing views (except to profile)
    if (view !== 'profile') {
      setViewingProfile(null);
    }
  };

  const handleProfileClick = (profile: any) => {
    setViewingProfile(profile);
    setCurrentView('profile');
  };

  const handleBackToOwnProfile = () => {
    setViewingProfile(null);
    setCurrentView('profile');
  };

  const handleCommentsClick = (event: any) => {
    setShowComments(event);
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('feed');
    setViewingProfile(null);
    
    // Clear all persisted data
    localStorage.removeItem('eventflow_user');
    localStorage.removeItem('eventflow_current_view');
    localStorage.removeItem('eventflow_viewing_profile');
  };

  const renderView = () => {
    switch (currentView) {
      case 'following':
        return (
          <Following 
            onEventSelect={setSelectedEvent} 
            onProfileClick={handleProfileClick}
            onCommentsClick={handleCommentsClick}
          />
        );
      case 'search':
        return <Search onEventSelect={setSelectedEvent} />;
      case 'profile':
        return (
          <Profile 
            user={user} 
            onAuthRequired={() => setShowAuth(true)}
            viewingProfile={viewingProfile}
            onBackToOwnProfile={handleBackToOwnProfile}
          />
        );
      default:
        return (
          <Feed 
            onEventSelect={setSelectedEvent} 
            onProfileClick={handleProfileClick}
            onCommentsClick={handleCommentsClick}
          />
        );
    }
  };

  // Show loading screen while restoring state
  if (isLoading) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto animate-pulse">
            <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              EventFlow
            </h2>
            <p className="text-gray-400 text-sm">Loading your session...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AppProvider>
      <div className="h-screen bg-black text-white overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden lg:flex h-full">
          {/* Left Sidebar - Desktop Only */}
          <Sidebar 
            currentView={currentView}
            onViewChange={handleViewChange}
            user={user}
            onAuthRequired={() => setShowAuth(true)}
            onCreateEvent={() => setShowCreateEvent(true)}
            onLogout={handleLogout}
          />
          
          {/* Main Content */}
          <div className="flex-1 flex h-full overflow-hidden">
            {/* Content Area */}
            <div className="flex-1 h-full overflow-hidden max-w-[600px] mx-auto">
              {renderView()}
            </div>
            
            {/* Right Sidebar - Large Desktop Only */}
            <div className="hidden xl:block w-80 h-full overflow-hidden">
              <RecommendationsSidebar onEventSelect={setSelectedEvent} />
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden h-full overflow-hidden">
          <div className="bg-black relative h-full overflow-hidden max-w-md mx-auto">
            {renderView()}
            
            <MobileNavigation 
              currentView={currentView} 
              onViewChange={handleViewChange}
              user={user}
              onAuthRequired={() => setShowAuth(true)}
              onCreateEvent={() => setShowCreateEvent(true)}
            />
          </div>
        </div>
        
        {/* Modals */}
        {selectedEvent && (
          <EventModal 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)}
            user={user}
            onAuthRequired={() => setShowAuth(true)}
          />
        )}
        
        {showAuth && (
          <AuthModal 
            onClose={() => setShowAuth(false)}
            onLogin={handleLogin}
          />
        )}

        {showCreateEvent && (
          <CreateEventModal
            onClose={() => setShowCreateEvent(false)}
            user={user}
            onAuthRequired={() => setShowAuth(true)}
          />
        )}

        {showComments && (
          <CommentsModal
            event={showComments}
            onClose={() => setShowComments(null)}
            user={user}
            onAuthRequired={() => setShowAuth(true)}
          />
        )}
      </div>
    </AppProvider>
  );
}

export default App;