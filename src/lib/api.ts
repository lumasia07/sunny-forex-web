function getApiBaseUrl(): string {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return 'http://localhost:8000/api/v1';
    }
    if (host.includes('sunnyremit.com')) {
      return 'https://cms.sunnyremit.com/api/v1';
    }
    // Fallback for custom server IPs or domain deployments
    return `${window.location.protocol}//${host}:8000/api/v1`;
  }

  return 'http://localhost:8000/api/v1';
}

export async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`API fetch error: ${response.statusText}`);
  }
  return response.json();
}

export interface ForexRate {
  id: number;
  currency_code: string;
  currency_name: string;
  flag_emoji: string;
  buy_rate: string;
  sell_rate: string;
  change_pct: string;
  is_active: boolean;
}

export interface Branch {
  id: number;
  name: string;
  area: string;
  address: string | null;
  hours: string;
  phone: string | null;
  map_url: string | null;
  latitude: string | null;
  longitude: string | null;
  sort_order: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  category: string;
  read_time: string;
  published_at: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
}

export interface ComplianceDocument {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string | null;
  file_name: string;
  file_size: string | null;
  file_type: string;
  download_url: string;
  updated_at: string;
}

export async function fetchDocuments(): Promise<ComplianceDocument[]> {
  try {
    return await fetchFromApi<ComplianceDocument[]>('documents');
  } catch (err) {
    console.warn('Failed to fetch CMS compliance documents, fallback to local assets:', err);
    return [];
  }
}
