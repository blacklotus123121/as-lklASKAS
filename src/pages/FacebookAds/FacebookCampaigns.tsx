import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FacebookCampaign } from '../../types/facebook';
import { Button } from '../../components/ui/Button';

const FacebookCampaigns = () => {
  const [campaigns, setCampaigns] = useState<FacebookCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('facebook_campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Facebook Campaigns</h2>
        <Button>Sync Campaigns</Button>
      </div>

      <div className="bg-card border border-muted rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-muted">
              <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Budget</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td className="px-6 py-4 text-sm">{campaign.name}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    campaign.status === 'ACTIVE' 
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  ${campaign.daily_budget || campaign.lifetime_budget || 0}
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(campaign.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacebookCampaigns;