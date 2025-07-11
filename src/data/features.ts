import { Zap, Shield, Smile, CodeXml } from 'lucide-astro';

// Define the LucideIcon type based on the structure of Lucide icons
type LucideIcon = typeof Zap;

export interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

export interface FeatureList {
    id: string;
    features: Feature[];
}

// Example feature lists
export const featureLists: Record<string, FeatureList> = {
    main: {
        id: 'main',
        features: [
            {
                icon: Zap, // Workshop/learning icon
                title: 'Education & Workshops',
                description: 'Host workshops, seminars, and hands-on learning experiences to help individuals and small businesses achieve financial independence through Bitcoin.'
            },
            {
                icon: CodeXml, // Tools/resources icon
                title: 'Practical Tools & Guides',
                description: 'Develop and share user-friendly guides and materials that simplify Bitcoin adoption, self-custody, and privacy-focused practices.'
            },
            {
                icon: Shield, // Privacy/freedom icon
                title: 'Privacy & Freedom Advocacy',
                description: 'Promote privacy-preserving, censorship-resistant, and freedom-enhancing technologies for decentralized systems and self-sovereignty.'
            },
            {
                icon: Smile, // Community/events icon
                title: 'Community Outreach',
                description: 'Organize local events, meetups, and collaborations in DC to foster Bitcoin adoption, economic resilience, and a thriving grassroots community.'
            }
        ]
    },
};
