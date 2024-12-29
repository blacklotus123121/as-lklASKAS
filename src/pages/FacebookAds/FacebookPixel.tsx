import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';

const FacebookPixel = () => {
  const [pixelId, setPixelId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('facebook_integrations')
        .update({ pixel_id: pixelId })
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
      toast.success('Pixel ID saved successfully');
    } catch (error) {
      toast.error('Failed to save Pixel ID');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-card p-6 rounded-lg border border-muted">
        <h2 className="text-lg font-semibold mb-4">Facebook Pixel Setup</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pixelId" className="block text-sm font-medium mb-2">
              Pixel ID
            </label>
            <input
              id="pixelId"
              type="text"
              value={pixelId}
              onChange={(e) => setPixelId(e.target.value)}
              className="w-full px-4 py-2 bg-muted border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <Button type="submit" loading={loading}>
            Save Pixel ID
          </Button>
        </form>
      </div>

      <div className="bg-card p-6 rounded-lg border border-muted">
        <h2 className="text-lg font-semibold mb-4">UTM Tracking Code</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Add this code to your website to track UTM parameters and send them to Facebook.
        </p>
        
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<!-- LotusFy UTM Tracking Code -->
<script>
  !function(f,b,e,v,n,t,s) {
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    // Initialize Facebook Pixel
    fbq('init', '<YOUR-PIXEL-ID>');
    
    // Track UTM parameters
    var params = new URLSearchParams(window.location.search);
    var utmSource = params.get('utm_source');
    var utmMedium = params.get('utm_medium');
    var utmCampaign = params.get('utm_campaign');
    
    if(utmSource || utmMedium || utmCampaign) {
      fbq('trackCustom', 'UTMVisit', {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign
      });
    }
</script>`}</code>
        </pre>
      </div>
    </div>
  );
};

export default FacebookPixel;