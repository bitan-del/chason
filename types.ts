export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface GeminiResponse {
  concept: string;
  tagline: string;
  keywords: string[];
}