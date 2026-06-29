const API_BASE_URL = 'http://localhost:8000/api/v1';

export async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);
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
