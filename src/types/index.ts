export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Campaign {
  id: string;
  name: string;
  source: string;
  medium: string;
  content?: string;
  term?: string;
  created_at: string;
  user_id: string;
}

export interface UtmLink {
  id: string;
  campaign_id: string;
  url: string;
  created_at: string;
  clicks: number;
  last_clicked: string | null;
}