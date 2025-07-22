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
                description: 'Knowledge is the key to true freedom. At the Bitcoin District Initiative, we provide hands-on educational programs that focus on Bitcoin as sound money—a fixed, decentralized, and sovereign form of currency. By equipping individuals and communities with the skills to understand and use Bitcoin, we empower them to achieve financial independence and participate confidently in the digital economy.'
            },
            {
                title: 'Advocacy for Personal Sovereignty',
                description: 'We stand for individual autonomy and self-reliance. Bitcoin is not just a currency; it’s a tool for personal liberation. By promoting Bitcoin and self-custody, we enable people to take control of their financial futures, free from the control of centralized institutions and the risks of traditional fiat systems. Bitcoin allows anyone to be their own bank, ensuring their wealth is secure and untouchable by external forces.'
            },
            {
                title: 'Commitment to Privacy',
                description: 'Privacy is essential to genuine freedom. In a world where financial surveillance is increasingly common, we champion open-source technologies that safeguard personal data and transaction privacy. By teaching our community how to use Bitcoin and privacy tools, we ensure they can transact securely and maintain their sovereignty in an interconnected digital landscape.'
            },
            {
                title: 'Community-Driven Collaboration',
                description: 'We believe in the power of local, in-person connections. Through workshops, meetups, and events in Washington, DC, we foster an open, collaborative space where people can learn, share ideas, and grow together. By bringing together diverse perspectives, we strengthen our community and drive grassroots Bitcoin adoption, creating a resilient network of Bitcoiners dedicated to advancing economic freedom.'
            },
            {
                title: 'Principled Innovation',
                description: 'We pursue Bitcoin and open-source advancements with integrity and responsibility. Our work is guided by transparency, accessibility, and ethical practices, ensuring that our education and outreach efforts support decentralization and serve the greater public good. Bitcoin is not just a financial instrument; it’s a moral imperative—a generational solution to the flaws of traditional monetary systems.'
            }
        ]
    },
};
