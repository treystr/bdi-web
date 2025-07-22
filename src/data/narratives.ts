export interface Narrative {
    title: string;
    content: string;
}

// Direct key-based access - much cleaner!
export const narratives: Record<string, Narrative> = {
    mission: {
        title: 'Our Mission',
        content: 'To advance grassroots Bitcoin adoption in Washington, DC by equipping residents, small businesses, and organizations with education, community, and privacy tools that foster financial sovereignty and economic freedom.'
    },
    'who-we-are': {
        title: 'Who We Are',
        content: 'The Bitcoin District Initiative is driven by a passion for grassroots education, making Bitcoin—the world\'s only truly decentralized, sound money—accessible and actionable for everyone in Washington, DC. While policy debates and corporate efforts have their place, our mission is to meet people where they are: everyday residents, small businesses, and local organizations. We break down Bitcoin\'s complexities to show its real-world value as a tool for empowerment and individual sovereignty. Fueled by the vibrant energy of DC\'s growing Bitcoin community, we\'re building a nonprofit platform to amplify these efforts, encouraging more people to embrace Bitcoin and fostering a collaborative, knowledgeable community rooted in the belief that fixing money can change the world.'
    }
};
