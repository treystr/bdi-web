import lemonadeImage from '@assets/images/905381-lemonade.jpg';
import defaultImage from '@assets/images/hero/default.jpg';
import smbImage from '@assets/images/smb.jpg';

export interface Initiative {
    id: string;
    title: string;
    shortDescription: string;
    cardImage: any; // ImageMetadata type from Astro
    status: 'active' | 'completed' | 'planned';
    featured: boolean;
    startDate: Date;
    targetDate?: Date;
    goalAmount?: number;
    currentAmount?: number;
    slug: string; // For linking to individual pages
}

export const initiatives: Initiative[] = [
    {
        id: '100-merchants-by-2026',
        title: "100 Merchants by 2026",
        shortDescription: "Growing Bitcoin adoption across 100 DC-area businesses by the end of 2026, building a thriving circular economy in the nation's capital.",
        cardImage: lemonadeImage,
        status: 'active',
        featured: true,
        startDate: new Date('2025-07-01'),
        targetDate: new Date('2026-12-31'),
        goalAmount: 0,
        currentAmount: 0,
        slug: '100-merchants-by-2026'
    },
    {
        id: 'local-business-surveys',
        title: "Local Business Surveys",
        shortDescription: "Gathering insights from 100 DC local businesses by end of 2025 to understand payment challenges and guide Bitcoin education programs.",
        cardImage: smbImage, // You can change this to a different image later
        status: 'active',
        featured: false,
        startDate: new Date('2025-09-01'),
        targetDate: new Date('2025-12-31'),
        goalAmount: 0,
        currentAmount: 0,
        slug: 'local-business-surveys'
    }
];

// Helper functions for filtering
export const getActiveInitiatives = () => initiatives.filter(init => init.status === 'active');
export const getFeaturedInitiatives = () => initiatives.filter(init => init.featured);
export const getInitiativeById = (id: string) => initiatives.find(init => init.id === id);

// Sort initiatives by featured first, then by start date (newest first)
export const getSortedInitiatives = () => {
    return [...initiatives].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.startDate.getTime() - a.startDate.getTime();
    });
};
