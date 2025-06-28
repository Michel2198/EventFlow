import { useState, useEffect } from 'react';
import { auth, db } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthUser extends User {
  profile?: any;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { user: authUser } = await auth.getCurrentUser();
      
      if (authUser) {
        // Get user profile
        const { data: profile } = await db.getProfile(authUser.id);
        setUser({ ...authUser, profile });
      }
      
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Get user profile
        const { data: profile } = await db.getProfile(session.user.id);
        setUser({ ...session.user, profile });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    const { data, error } = await auth.signUp(email, password, userData);
    
    if (data.user && !error) {
      // Create profile
      const profileData = {
        id: data.user.id,
        username: userData.username,
        full_name: userData.full_name,
        bio: userData.bio || '',
        avatar_url: userData.avatar_url || '',
        location: userData.location || '',
        phone: userData.phone || ''
      };
      
      await db.createProfile(profileData);
    }
    
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    return await auth.signIn(email, password);
  };

  const signOut = async () => {
    const { error } = await auth.signOut();
    if (!error) {
      setUser(null);
    }
    return { error };
  };

  const updateProfile = async (updates: any) => {
    if (!user) return { error: new Error('No user logged in') };
    
    const { data, error } = await db.updateProfile(user.id, updates);
    
    if (data && !error) {
      setUser({ ...user, profile: data });
    }
    
    return { data, error };
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  };
};