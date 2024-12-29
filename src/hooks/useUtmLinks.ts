import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { UtmLink } from '../types';
import { useRealtimeUtmLinks } from './useRealtime';

export function useUtmLinks(campaignId: string) {
  const [links, setLinks] = useState<UtmLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Setup realtime subscription
  useRealtimeUtmLinks([campaignId]);

  const fetchLinks = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('utm_links')
        .select('*')
        .eq('campaign_id', campaignId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setLinks(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch UTM links'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (campaignId) {
      fetchLinks();
    }
  }, [campaignId]);

  return { links, loading, error, refetch: fetchLinks };
}