import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';

const FacebookIntegration = () => {
  const [accessToken, setAccessToken] = useState('');
  const [accountId, setAccountId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('facebook_integrations')
        .insert([
          {
            access_token: accessToken,
            account_id: accountId,
          },
        ]);

      if (error) throw error;
      toast.success('Facebook integration saved successfully');
      setAccessToken('');
      setAccountId('');
    } catch (error) {
      toast.error('Failed to save Facebook integration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-muted">
      <h2 className="text-lg font-semibold mb-4">Connect Facebook Account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="accessToken" className="block text-sm font-medium mb-2">
            Access Token
          </label>
          <input
            id="accessToken"
            type="text"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            className="w-full px-4 py-2 bg-muted border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="accountId" className="block text-sm font-medium mb-2">
            Ad Account ID
          </label>
          <input
            id="accountId"
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="w-full px-4 py-2 bg-muted border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <Button type="submit" loading={loading}>
          Save Integration
        </Button>
      </form>

      <div className="mt-8">
        <h3 className="text-md font-semibold mb-2">How to get these values:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Go to Facebook Business Manager</li>
          <li>Navigate to System User settings</li>
          <li>Create a new System User or use existing one</li>
          <li>Generate a new token with ads_management permission</li>
          <li>Copy your Ad Account ID from Ads Manager</li>
        </ol>
      </div>
    </div>
  );
};

export default FacebookIntegration;