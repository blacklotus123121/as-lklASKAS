/*
  # Create campaigns and links tables

  1. New Tables
    - `campaigns`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `name` (text)
      - `source` (text)
      - `medium` (text)
      - `content` (text, optional)
      - `term` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `utm_links`
      - `id` (uuid, primary key)
      - `campaign_id` (uuid, references campaigns)
      - `url` (text)
      - `clicks` (integer)
      - `last_clicked` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for campaign and link access
*/

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  source text NOT NULL,
  medium text NOT NULL,
  content text,
  term text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- UTM links table
CREATE TABLE IF NOT EXISTS utm_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  clicks integer DEFAULT 0,
  last_clicked timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE utm_links ENABLE ROW LEVEL SECURITY;

-- Policies for campaigns
CREATE POLICY "Users can CRUD own campaigns"
  ON campaigns
  TO authenticated
  USING (user_id = auth.uid());

-- Policies for utm_links
CREATE POLICY "Users can CRUD links for own campaigns"
  ON utm_links
  TO authenticated
  USING (
    campaign_id IN (
      SELECT id FROM campaigns WHERE user_id = auth.uid()
    )
  );

-- Update trigger for campaigns
CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();