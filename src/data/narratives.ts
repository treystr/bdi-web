export interface Narrative {
    title: string;
    content: string;
}

export const narratives: Record<string, Narrative> = {
    mission: {
        title: 'Our Mission',
        content: 'To advance grassroots Bitcoin adoption in Washington, DC by equipping residents, local businesses, and local organizations with hands-on education, community support, and privacy tools that foster personal sovereignty and economic freedom.'
    },
    'who-we-are': {
        title: 'Who We Are',
        content: 'The Bitcoin District Initiative is a nonprofit dedicated to making Bitcoin accessible and actionable for everyone in Washington, DC. Born from the grassroots energy of the Bitcoin District, our work amplifies community-led efforts with sustainable funding, structured programs, and outreach that reaches beyond early adopters. We provide practical workshops, in-person meetups, and open-source resources that simplify Bitcoin\'s complexities, showing its real-world value as sound, decentralized money. By fostering a collaborative local network, we empower residents, local businesses, and organizations to embrace Bitcoin as a tool for economic freedom and personal empowerment—driven by the belief that fixing money can change the world.'
    }
};
