interface Category {
  name: string;
  slug: string;
  description: string;
}

export const categories: Category[] = [
  {
    name: 'Outreach',
    slug: 'outreach',
    description: 'Latest in outreach and community engagement'
  },
  {
    name: 'Announcements',
    slug: 'announcements',
    description: 'Latest announcements and updates from our team'
  },
  {
    name: 'Fundraising',
    slug: 'fundraising',
    description: 'Latest in fundraising and donations'
  },
  {
    name: 'Initiatives',
    slug: 'initiatives',
    description: 'Our ongoing initiatives and projects'
  },
  
];

// Helper function to get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(category => category.slug === slug);
}