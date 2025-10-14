export interface Value {
    title: string;
    description: string;
}

export interface ValueList {
    id: string;
    values: Value[];
}

export const valueLists: Record<string, ValueList> = {
    main: {
        id: 'main',
        values: [
            {
                title: 'Empowerment through Education',
                description:
                    'Knowledge is the foundation of freedom. At the Bitcoin District Initiative, we offer hands-on learning experiences that make Bitcoin usable in everyday life. By teaching individuals and small businesses how to earn, save, and transact in sound money, we empower DC residents to participate directly in a growing Bitcoin circular economy built on personal sovereignty and economic freedom.'
            },
            {
                title: 'Advocacy for Personal Sovereignty',
                description:
                    'We stand for self-reliance and individual autonomy. Bitcoin is more than a technology—it is a pathway to true independence. Through self-custody education and practical use, we help people reclaim control over their savings and economic choices, free from the risks of centralized systems. A thriving circular economy begins when individuals take ownership of their own money.'
            },
            {
                title: 'Commitment to Privacy',
                description:
                    'Privacy is the cornerstone of a free and open society. In an era of financial surveillance, we promote privacy-preserving tools and practices that protect every participant in the circular economy. By combining Bitcoin education with privacy workshops, we ensure that residents and local businesses in DC can transact securely, with dignity and confidence.'
            },
            {
                title: 'Community-Driven Collaboration',
                description:
                    'A Bitcoin circular economy grows through human connection. Through meetups, workshops, and local partnerships, we bring together residents, educators, and small business owners to learn and build collectively. Each new collaboration strengthens DC’s local Bitcoin network and demonstrates how grassroots coordination can create lasting economic resilience.'
            },
            {
                title: 'Principled Innovation',
                description:
                    'We approach Bitcoin education and adoption with integrity, humility, and a commitment to open-source values. Our work prioritizes transparency, accessibility, and responsibility—ensuring innovation serves the public good and supports decentralization. By building honestly and openly, we set a model for how Bitcoin economies can grow sustainably and ethically.'
            }
        ]
    }
};
