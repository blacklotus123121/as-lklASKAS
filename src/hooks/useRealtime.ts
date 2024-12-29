import { useEffect, useState } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToUserCampaigns, subscribeToUtmLinks, subscribeToCampaignStats } from '../lib/supabase/subscriptions';

export function useRealtimeCampaigns() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!user) return;

    const channel = subscribeToUserCampaigns(user.id, () => {
      // Trigger campaign data refresh
    });

    setSubscription(channel);

    return () => {
      channel.unsubscribe();
    };
  }, [user]);

  return subscription;
}

export function useRealtimeUtmLinks(campaignIds: string[]) {
  const [subscription, setSubscription] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!campaignIds.length) return;

    const channel = subscribeToUtmLinks(campaignIds, () => {
      // Trigger UTM links data refresh
    });

    setSubscription(channel);

    return () => {
      channel.unsubscribe();
    };
  }, [campaignIds]);

  return subscription;
}

export function useRealtimeCampaignStats(campaignId: string) {
  const [subscription, setSubscription] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!campaignId) return;

    const channel = subscribeToCampaignStats(campaignId, () => {
      // Trigger campaign stats refresh
    });

    setSubscription(channel);

    return () => {
      channel.unsubscribe();
    };
  }, [campaignId]);

  return subscription;
}