import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../supabase';

export function subscribeToUserCampaigns(userId: string, onChange: () => void): RealtimeChannel {
  return supabase
    .channel('campaign-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'campaigns',
        filter: `user_id=eq.${userId}`,
      },
      () => onChange()
    )
    .subscribe();
}

export function subscribeToUtmLinks(campaignIds: string[], onChange: () => void): RealtimeChannel {
  return supabase
    .channel('utm-link-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'utm_links',
        filter: `campaign_id=in.(${campaignIds.join(',')})`,
      },
      () => onChange()
    )
    .subscribe();
}

export function subscribeToCampaignStats(campaignId: string, onChange: () => void): RealtimeChannel {
  return supabase
    .channel('campaign-stats')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'utm_links',
        filter: `campaign_id=eq.${campaignId}`,
      },
      () => onChange()
    )
    .subscribe();
}