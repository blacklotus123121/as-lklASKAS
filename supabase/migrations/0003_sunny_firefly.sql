/*
  # Create Facebook Ads integration tables

  1. New Tables
    - `facebook_integrations`
      - Account settings and tokens
    - `facebook_campaigns`
      - Synced campaign data
    - `facebook_ad_sets`
      - Ad set data
    - `facebook_ads`
      - Individual ad data
*/

CREATE TABLE IF NOT EXISTS facebook_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  access_token text NOT NULL,
  account_id text NOT NULL,
  webhook_secret text,
  pixel_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS facebook_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  fb_campaign_id text NOT NULL,
  name text NOT NULL,
  status text NOT NULL,
  daily_budget numeric,
  lifetime_budget numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS facebook_ad_sets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES facebook_campaigns(id) ON DELETE CASCADE NOT NULL,
  fb_ad_set_id text NOT NULL,
  name text NOT NULL,
  status text NOT NULL,
  budget numeric,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS facebook_ads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ad_set_id uuid REFERENCES facebook_ad_sets(id) ON DELETE CASCADE NOT NULL,
  fb_ad_id text NOT NULL,
  name text NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE facebook_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE facebook_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE facebook_ad_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE facebook_ads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their Facebook integration"
  ON facebook_integrations
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view their Facebook campaigns"
  ON facebook_campaigns
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view their Facebook ad sets"
  ON facebook_ad_sets
  TO authenticated
  USING (campaign_id IN (
    SELECT id FROM facebook_campaigns WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can view their Facebook ads"
  ON facebook_ads
  TO authenticated
  USING (ad_set_id IN (
    SELECT id FROM facebook_ad_sets WHERE campaign_id IN (
      SELECT id FROM facebook_campaigns WHERE user_id = auth.uid()
    )
  ));