export interface Narrative {
    title: string;
    content: string;
}

export const narratives: Record<string, Narrative> = {
    mission: {
        title: 'Our Mission',
        content: 'Building a Bitcoin Circular Economy in the Nation’s Capital'
    },
    'who-we-are': {
        title: 'Who We Are',
        content: 'The Bitcoin District Initiative is a nonprofit building a Bitcoin circular economy in the Nation’s Capital. Rooted in the grassroots energy of Washington, DC’s Bitcoin community, our mission is to make sound money usable in everyday life. We connect education, small business adoption, and community collaboration to create a living, local Bitcoin economy. Through practical workshops, in-person meetups, and open-source resources, we help residents and merchants understand and use Bitcoin as a tool for economic freedom and personal sovereignty. By strengthening local connections and promoting real Bitcoin usage, we’re proving that when a circular economy takes root in DC, it can take root anywhere.'
    }

};
