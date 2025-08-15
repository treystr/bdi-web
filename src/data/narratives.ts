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
        content: 'The Bitcoin District Initiative is a nonprofit born from the heart of the Bitcoin District, a vibrant, open community where everyone in Washington, DC is welcome to learn about and engage with Bitcoin. While the Bitcoin District is the grassroots hub for enthusiasts, newcomers, and local businesses to connect and share knowledge, The Initiative amplifies these efforts with sustainable funding and broader outreach. Fueled by a passion for accessible education, we simplify Bitcoin’s complexities through hands-on workshops, practical resources, and community events, empowering residents and organizations with tools for personal sovereignty and economic freedom. Rooted in DC’s growing Bitcoin scene, The Initiative builds a collaborative network, driven by the belief that fixing money can change the world.'
    }
};
