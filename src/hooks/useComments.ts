import { useState, useEffect } from 'react';
import { db } from '../lib/supabase';

export const useComments = (eventId: string) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (eventId) {
      fetchComments();
    }
  }, [eventId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data, error } = await db.getEventComments(eventId);
      
      if (error) throw error;
      
      setComments(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string, userId: string, parentId?: string) => {
    try {
      const commentData = {
        event_id: eventId,
        user_id: userId,
        content,
        parent_id: parentId || null
      };

      const { data, error } = await db.createComment(commentData);
      
      if (error) throw error;
      
      if (parentId) {
        // Add reply to existing comment
        setComments(prev => prev.map(comment => 
          comment.id === parentId 
            ? { ...comment, replies: [...(comment.replies || []), data] }
            : comment
        ));
      } else {
        // Add new top-level comment
        setComments(prev => [data, ...prev]);
      }
      
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  };

  return {
    comments,
    loading,
    error,
    addComment,
    refreshComments: fetchComments
  };
};