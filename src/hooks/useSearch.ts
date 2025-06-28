import { useState } from 'react';
import { db } from '../lib/supabase';

export const useSearch = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchEvents = async (query: string, categoryId?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await db.searchEvents(query, categoryId);
      
      if (error) throw error;
      
      setResults(data || []);
    } catch (err: any) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return {
    results,
    loading,
    error,
    searchEvents,
    clearResults
  };
};