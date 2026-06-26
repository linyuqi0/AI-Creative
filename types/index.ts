export interface CreativeItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  tags: string[];
  author: string;
  likes: number;
  downloads: number;
  createdAt: string;
}

export interface ToolCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  href: string;
  stats: {
    label: string;
    value: string;
  };
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: string;
}
