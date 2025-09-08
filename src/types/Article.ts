export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  category: 'تقنية' | 'صحة' | 'رياضة' | 'ترفيه' | 'ثقافة';
  tags: string[];
  author: string;
  publishedAt: Date;
  isFeatured: boolean;
  views: number;
  readingTime: number;
  slug: string;
}

export interface Analytics {
  dailyVisitors: number;
  weeklyVisitors: number;
  monthlyVisitors: number;
  topArticles: Array<{
    id: string;
    title: string;
    views: number;
  }>;
  trafficSources: Array<{
    source: string;
    percentage: number;
  }>;
  topCountries: Array<{
    country: string;
    percentage: number;
  }>;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}