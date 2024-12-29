import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Campaign } from '../types';
import { useRealtimeCampaigns } from './useRealtime';
import { useAuth } from '../contexts/AuthContext';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  // Setup realtime subscription
  useRealtimeCampaigns();

  const fetchCampaigns = async () => {
    try {
      if (!user) return;

      const { data, error: fetchError } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setCampaigns(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch campaigns'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [user]);

  return { campaigns, loading, error, refetch: fetchCampaigns };
}