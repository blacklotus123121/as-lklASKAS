export interface FacebookIntegration {
  id: string;
  access_token: string;
  account_id: string;
  webhook_secret?: string;
  pixel_id?: string;
}

export interface FacebookCampaign {
  id: string;
  fb_campaign_id: string;
  name: string;
  status: string;
  daily_budget?: number;
  lifetime_budget?: number;
}

export interface FacebookAdSet {
  id: string;
  campaign_id: string;
  fb_ad_set_id: string;
  name: string;
  status: string;
  budget: number;
}

export interface FacebookAd {
  id: string;
  ad_set_id: string;
  fb_ad_id: string;
  name: string;
  status: string;
}