export interface FaqItem {
    question: string;
    answer: string;
}

export interface FaqList {
    id: string;
    faqs: FaqItem[];
}

export const faqLists: Record<string, FaqList> = {
    main: {
        id: 'main',
        faqs: [
            {
                question: "What is the Bitcoin District Initiative?",
                answer:
                    "The Bitcoin District Initiative is a 501(c)(3) nonprofit organization that grew out of the grassroots Bitcoin District community in Washington, DC. We're organized and mission-driven, turning community energy into action through education, outreach, and local business onboarding to build a real Bitcoin circular economy in the Nation's Capital."
            },
            {
                question: "How can I get involved with the Bitcoin District Initiative?",
                answer:
                    "You can get involved by donating, volunteering or participating in our workshops. Check our website for announcements and events."
            },
            {
                question: "Are my donations tax-exempt?",
                answer:
                    "Yes! The Bitcoin District Initiative is a 501(c)(3) tax-exempt not-for-profit organization. Your donations are fully tax-deductible to the extent allowed by law. We recommend consulting with your tax advisor for guidance on deducting your contribution."
            },
            {
                question: "Why focus only on Bitcoin?",
                answer:
                    "We focus exclusively on Bitcoin because it is the only truly decentralized, open-source monetary network with a fixed supply and no central control. Bitcoin stands apart as a tool for economic freedom and self-sovereignty—not speculation. Our mission is to teach Bitcoin’s real-world use, free from distraction or hype."
            },
            {
                question: "Where do you operate?",
                answer:
                    "Our primary mission is to build a working Bitcoin circular economy in Washington, DC. However, our educational model and open resources are designed to inspire and support other communities seeking to replicate this effort beyond the District."
            },
            {
                question: "How can I stay updated on events and initiatives?",
                answer:
                    "Subscribe to our newsletter and event calendar to stay informed. We also share updates through our website, social media, and the broader Bitcoin District community channels—so you’ll always know what’s happening in DC’s growing Bitcoin scene."
            },
            {
                question: "What’s the difference between Bitcoin District and this \"Initiative\"?",
                answer:
                    "Bitcoin District is the grassroots Bitcoin community in Washington, DC—an organic, social network of meetups and learning where people connect over sound money and personal sovereignty. The Bitcoin District Initiative grew out of that same community as a 501(c)(3) nonprofit that’s organized and mission-driven, turning community energy into action through education, outreach, and local business onboarding to build a real Bitcoin circular economy in DC."
            }
                 
        ]
    }
};
