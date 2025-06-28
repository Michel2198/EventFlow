import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Database helpers
export const db = {
  // Profiles
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  updateProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  createProfile: async (profile: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();
    return { data, error };
  },

  // Events
  getEvents: async (limit = 20, offset = 0) => {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        organizer:profiles!organizer_id(*),
        category:event_categories(*),
        venue:venues(*),
        tickets:event_tickets(*),
        tables:event_tables(*)
      `)
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    return { data, error };
  },

  getEvent: async (eventId: string) => {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        organizer:profiles!organizer_id(*),
        category:event_categories(*),
        venue:venues(*),
        tickets:event_tickets(*),
        tables:event_tables(*)
      `)
      .eq('id', eventId)
      .single();
    return { data, error };
  },

  createEvent: async (event: any) => {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single();
    return { data, error };
  },

  updateEvent: async (eventId: string, updates: any) => {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', eventId)
      .select()
      .single();
    return { data, error };
  },

  // Event interactions
  likeEvent: async (eventId: string, userId: string) => {
    const { data, error } = await supabase
      .from('event_likes')
      .insert({ event_id: eventId, user_id: userId });
    return { data, error };
  },

  unlikeEvent: async (eventId: string, userId: string) => {
    const { data, error } = await supabase
      .from('event_likes')
      .delete()
      .eq('event_id', eventId)
      .eq('user_id', userId);
    return { data, error };
  },

  isEventLiked: async (eventId: string, userId: string) => {
    const { data, error } = await supabase
      .from('event_likes')
      .select('id')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .single();
    return { data: !!data, error };
  },

  // Comments
  getEventComments: async (eventId: string) => {
    const { data, error } = await supabase
      .from('event_comments')
      .select(`
        *,
        user:profiles!user_id(*),
        replies:event_comments!parent_id(
          *,
          user:profiles!user_id(*)
        )
      `)
      .eq('event_id', eventId)
      .is('parent_id', null)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  createComment: async (comment: any) => {
    const { data, error } = await supabase
      .from('event_comments')
      .insert(comment)
      .select(`
        *,
        user:profiles!user_id(*)
      `)
      .single();
    return { data, error };
  },

  // Follows
  followUser: async (followerId: string, followingId: string) => {
    const { data, error } = await supabase
      .from('follows')
      .insert({ follower_id: followerId, following_id: followingId });
    return { data, error };
  },

  unfollowUser: async (followerId: string, followingId: string) => {
    const { data, error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', followerId)
      .eq('following_id', followingId);
    return { data, error };
  },

  isFollowing: async (followerId: string, followingId: string) => {
    const { data, error } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .single();
    return { data: !!data, error };
  },

  getFollowing: async (userId: string) => {
    const { data, error } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', userId);
    return { data: data?.map(f => f.following_id) || [], error };
  },

  // Event attendance
  attendEvent: async (eventId: string, userId: string, ticketId?: string, tableId?: string, quantity = 1) => {
    const { data, error } = await supabase
      .from('event_attendees')
      .insert({
        event_id: eventId,
        user_id: userId,
        ticket_id: ticketId,
        table_id: tableId,
        quantity
      });
    return { data, error };
  },

  unattendEvent: async (eventId: string, userId: string) => {
    const { data, error } = await supabase
      .from('event_attendees')
      .delete()
      .eq('event_id', eventId)
      .eq('user_id', userId);
    return { data, error };
  },

  isAttending: async (eventId: string, userId: string) => {
    const { data, error } = await supabase
      .from('event_attendees')
      .select('id')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .single();
    return { data: !!data, error };
  },

  // Categories
  getCategories: async () => {
    const { data, error } = await supabase
      .from('event_categories')
      .select('*')
      .order('name');
    return { data, error };
  },

  // Search
  searchEvents: async (query: string, categoryId?: string) => {
    let queryBuilder = supabase
      .from('events')
      .select(`
        *,
        organizer:profiles!organizer_id(*),
        category:event_categories(*),
        venue:venues(*)
      `)
      .eq('is_published', true);

    if (query) {
      queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`);
    }

    if (categoryId) {
      queryBuilder = queryBuilder.eq('category_id', categoryId);
    }

    const { data, error } = await queryBuilder
      .order('created_at', { ascending: false })
      .limit(50);

    return { data, error };
  }
};