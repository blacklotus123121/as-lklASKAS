export function buildUtmUrl(
  baseUrl: string,
  params: {
    source: string;
    medium: string;
    campaign: string;
    content?: string;
    term?: string;
  }
): string {
  const url = new URL(baseUrl);
  
  url.searchParams.set('utm_source', params.source);
  url.searchParams.set('utm_medium', params.medium);
  url.searchParams.set('utm_campaign', params.campaign);
  
  if (params.content) {
    url.searchParams.set('utm_content', params.content);
  }
  
  if (params.term) {
    url.searchParams.set('utm_term', params.term);
  }
  
  return url.toString();
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}