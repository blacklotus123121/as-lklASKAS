import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import FacebookIntegration from './FacebookIntegration';
import FacebookCampaigns from './FacebookCampaigns';
import FacebookPixel from './FacebookPixel';

const FacebookAds = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Facebook Ads Integration</h1>
      </div>

      <Tabs defaultValue="integration" className="w-full">
        <TabsList>
          <TabsTrigger value="integration">Integration Setup</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="pixel">Pixel & Events</TabsTrigger>
        </TabsList>

        <TabsContent value="integration">
          <FacebookIntegration />
        </TabsContent>

        <TabsContent value="campaigns">
          <FacebookCampaigns />
        </TabsContent>

        <TabsContent value="pixel">
          <FacebookPixel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacebookAds;