import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import FacebookIntegration from './FacebookIntegration';
import FacebookCampaigns from './FacebookCampaigns';
import FacebookPixel from './FacebookPixel';

const Integrations = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Integrations</h1>
      </div>

      <Tabs defaultValue="facebook" className="w-full">
        <TabsList>
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
          <TabsTrigger value="google">Google (Coming Soon)</TabsTrigger>
          <TabsTrigger value="tiktok">TikTok (Coming Soon)</TabsTrigger>
        </TabsList>

        <TabsContent value="facebook">
          <Routes>
            <Route index element={<Navigate to="setup" replace />} />
            <Route path="setup" element={<FacebookIntegration />} />
            <Route path="campaigns" element={<FacebookCampaigns />} />
            <Route path="pixel" element={<FacebookPixel />} />
          </Routes>
        </TabsContent>

        <TabsContent value="google">
          <div className="bg-card p-6 rounded-lg border border-muted">
            <p className="text-muted-foreground">Google Ads integration coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="tiktok">
          <div className="bg-card p-6 rounded-lg border border-muted">
            <p className="text-muted-foreground">TikTok Ads integration coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Integrations;