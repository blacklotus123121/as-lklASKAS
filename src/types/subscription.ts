export interface Subscription {
  id: string;
  plan_id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  status: string;
  commission_paid: boolean;
}