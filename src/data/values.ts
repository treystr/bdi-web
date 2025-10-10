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
                description: 'Knowledge is the foundation of freedom. At the Bitcoin District Initiative, we provide hands-on learning experiences that focus on Bitcoin as sound money—a fixed, decentralized, and sovereign system. By equipping individuals and communities with the tools to understand and use Bitcoin, we empower them to achieve personal sovereignty and confidently participate in a world built on economic freedom.'
            },
            {
                title: 'Advocacy for Personal Sovereignty',
                description: 'We champion individual autonomy and self-reliance. Bitcoin is more than a currency—it is a tool for liberation. By promoting self-custody and open participation, we help people take control of their savings and secure their future, free from centralized control and the risks of fragile fiat systems. Bitcoin enables anyone to be their own bank, ensuring wealth that is secure, durable, and beyond external interference.'
            },
            {
                title: 'Commitment to Privacy',
                description: 'Privacy is essential to true freedom. In an age of growing financial surveillance, we advocate for open-source tools that safeguard personal data and transaction confidentiality. By teaching our community how to use Bitcoin securely alongside privacy technologies, we ensure individuals can transact freely and protect their sovereignty in an increasingly interconnected world.'
            },
            {
                title: 'Community-Driven Collaboration',
                description: 'We believe in the strength of local, in-person connections. Through workshops, meetups, and outreach in Washington, DC, we create collaborative spaces where residents, local businesses, and organizations can learn, share, and grow together. By fostering relationships rooted in trust and knowledge, we drive grassroots Bitcoin adoption and build a resilient local network dedicated to advancing economic freedom.'
            },
            {
                title: 'Principled Innovation',
                description: 'We pursue Bitcoin and open-source advancements with integrity and humility. Our work is guided by transparency, accessibility, and responsibility, ensuring that education and outreach strengthen decentralization and serve the public good. Bitcoin is not just technology—it is a generational solution to broken monetary systems and a moral imperative to preserve freedom for the future.'
            }
        ]
    },
};
