import { useState, useEffect } from 'react';
import { db } from '../lib/supabase';

export const useEvents = (limit = 20) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (offset = 0) => {
    try {
      setLoading(true);
      const { data, error } = await db.getEvents(limit, offset);
      
      if (error) throw error;
      
      if (offset === 0) {
        setEvents(data || []);
      } else {
        setEvents(prev => [...prev, ...(data || [])]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const refreshEvents = () => {
    fetchEvents(0);
  };

  const loadMoreEvents = () => {
    fetchEvents(events.length);
  };

  return {
    events,
    loading,
    error,
    refreshEvents,
    loadMoreEvents
  };
};

export const useEvent = (eventId: string) => {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const { data, error } = await db.getEvent(eventId);
        
        if (error) throw error;
        
        setEvent(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  return { event, loading, error };
};

export const useEventInteractions = (userId: string | undefined) => {
  const [likedEvents, setLikedEvents] = useState<string[]>([]);
  const [followedProfiles, setFollowedProfiles] = useState<string[]>([]);

  useEffect(() => {
    if (userId) {
      // Load user's liked events and followed profiles
      loadUserInteractions();
    }
  }, [userId]);

  const loadUserInteractions = async () => {
    if (!userId) return;

    try {
      // Load followed profiles
      const { data: following } = await db.getFollowing(userId);
      setFollowedProfiles(following || []);
    } catch (error) {
      console.error('Error loading user interactions:', error);
    }
  };

  const toggleLike = async (eventId: string) => {
    if (!userId) return;

    try {
      const isLiked = likedEvents.includes(eventId);
      
      if (isLiked) {
        await db.unlikeEvent(eventId, userId);
        setLikedEvents(prev => prev.filter(id => id !== eventId));
      } else {
        await db.likeEvent(eventId, userId);
        setLikedEvents(prev => [...prev, eventId]);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const toggleFollow = async (profileId: string) => {
    if (!userId) return;

    try {
      const isFollowing = followedProfiles.includes(profileId);
      
      if (isFollowing) {
        await db.unfollowUser(userId, profileId);
        setFollowedProfiles(prev => prev.filter(id => id !== profileId));
      } else {
        await db.followUser(userId, profileId);
        setFollowedProfiles(prev => [...prev, profileId]);
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const attendEvent = async (eventId: string, ticketId?: string, tableId?: string, quantity = 1) => {
    if (!userId) return;

    try {
      await db.attendEvent(eventId, userId, ticketId, tableId, quantity);
    } catch (error) {
      console.error('Error attending event:', error);
    }
  };

  return {
    likedEvents,
    followedProfiles,
    toggleLike,
    toggleFollow,
    attendEvent
  };
};