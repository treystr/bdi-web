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
                title: 'Education That Empowers',
                description:
                    'We bring Bitcoin education to life through hands-on workshops and in-person training across Washington, DC. From beginners to small business owners, we teach practical skills for earning, saving, and transacting in sound money—laying the groundwork for a true Bitcoin circular economy.'
            },
            {
                icon: CodeXml,
                title: 'Open Guides & Free Resources',
                description:
                    'We create clear, actionable guides that make self-custody and Bitcoin use simple for everyone. All our materials are open-source and freely available, helping DC residents and local businesses build lasting confidence in using Bitcoin as everyday money.'
            },
            {
                icon: Shield,
                title: 'Privacy & Sovereignty Tools',
                description:
                    'Freedom requires privacy. We promote and teach privacy-preserving, censorship-resistant technologies that empower individuals and small businesses to protect their data, secure their savings, and transact freely within the Bitcoin economy.'
            },
            {
                icon: Smile,
                title: 'Community That Builds Together',
                description:
                    'A thriving Bitcoin economy grows from human connection. Through meetups, local business onboarding, and grassroots collaboration, we\'re strengthening Washington, DC\'s local network of Bitcoin users, educators, and builders—proving that real change starts at the community level.'
            }
        ]
    }
};


