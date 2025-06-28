import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useEventInteractions } from '../hooks/useEvents';

interface AppContextType {
  // Auth
  user: any;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  updateProfile: (updates: any) => Promise<any>;
  
  // Event interactions
  followedProfiles: string[];
  likedEvents: string[];
  toggleFollow: (profileId: string) => Promise<void>;
  toggleLike: (eventId: string) => Promise<void>;
  attendEvent: (eventId: string, ticketId?: string, tableId?: string, quantity?: number) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const auth = useAuth();
  const interactions = useEventInteractions(auth.user?.id);

  return (
    <AppContext.Provider value={{
      ...auth,
      ...interactions
    }}>
      {children}
    </AppContext.Provider>
  );
};