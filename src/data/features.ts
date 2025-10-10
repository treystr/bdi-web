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

export const featureLists: Record<string, FeatureList> = {
    main: {
        id: 'main',
        features: [
            {
                icon: Zap,
                title: 'Education & Workshops',
                description: 'Offer hands-on workshops and seminars in DC that make Bitcoin accessible, helping individuals and local businesses build confidence in achieving economic freedom and personal sovereignty.'
            },
            {
                icon: CodeXml,
                title: 'Guides & Open Resources',
                description: 'Create and share clear, practical guides that support Bitcoin adoption, self-custody, and privacy, empowering people to use sound money with confidence.'
            },
            {
                icon: Shield,
                title: 'Privacy & Freedom Tools',
                description: 'Champion privacy-preserving, censorship-resistant, and open-source technologies that strengthen self-sovereignty and protect individual rights.'
            },
            {
                icon: Smile,
                title: 'Community Engagement',
                description: 'Host meetups, local events, and grassroots collaborations in Washington, DC to grow a resilient, connected Bitcoin community.'
            }
        ]
    },
};

