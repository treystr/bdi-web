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
                    "The Bitcoin District Initiative is a nonprofit building a Bitcoin circular economy in the Nation’s Capital. Through education, workshops, and local business engagement, we help residents and merchants understand and use Bitcoin as sound money—advancing economic freedom, personal sovereignty, and community resilience in Washington, DC."
            },
            {
                question: "What's the difference between 'Bitcoin District' and the 'Bitcoin District Initiative'?",
                answer:
                    "Bitcoin District is the open community of all Bitcoiners in and around Washington, DC—it belongs to everyone and represents the city’s growing grassroots Bitcoin movement. The Bitcoin District Initiative is a nonprofit working within that community to organize education, business adoption, and outreach programs that strengthen DC’s local Bitcoin economy."
            },
            {
                question: "Who can participate in your programs?",
                answer:
                    "Everyone is welcome. Our programs are designed for individuals, businesses, and community groups at all levels—from those new to Bitcoin to experienced users who want to deepen their understanding of self-custody, privacy, and circular economy principles."
            },
            {
                question: "Are your events and resources free?",
                answer:
                    "Most of our workshops, meetups, and educational materials are free to ensure accessibility for all. Some specialized programs may include small cost-recovery fees, but our priority is keeping education open and affordable for the DC community."
            },
            {
                question: "Can my business benefit from your programs?",
                answer:
                    "Yes. We work directly with local businesses to help them understand and adopt Bitcoin for payments, savings, and community engagement. Through workshops and partnerships, we support merchants in joining DC’s growing Bitcoin circular economy—strengthening local commerce through sound money."
            },
            {
                question: "How can I get involved with the Bitcoin District Initiative?",
                answer:
                    "You can get involved by attending meetups, joining workshops, volunteering, or donating to support our mission. Visit our website to see upcoming events, sign up for updates, or contact us directly about business partnerships or volunteer opportunities."
            },
            {
                question: "Are my donations tax-exempt?",
                answer:
                    "Yes! The Bitcoin District Initiative is a 501(c)(3) tax-exempt nonprofit organization. Your donations are fully tax-deductible to the extent allowed by law. We recommend consulting with your tax advisor for guidance on deducting your contribution."
            },
            {
                question: "Why focus only on Bitcoin?",
                answer:
                    "We focus exclusively on Bitcoin because it is the only truly decentralized, open-source monetary network with a fixed supply and no central control. Bitcoin stands apart as a tool for economic freedom and self-sovereignty—not speculation. Our mission is to teach Bitcoin’s real-world use, free from distraction or hype."
            },
            {
                question: "How do you ensure privacy and security in your programs?",
                answer:
                    "We teach best practices for self-custody, secure wallet setup, and safe transacting. All our workshops promote open-source, privacy-preserving tools and follow strict confidentiality standards to protect participant information."
            },
            {
                question: "Do you only operate in Washington, DC?",
                answer:
                    "Our primary mission is to build a working Bitcoin circular economy in Washington, DC. However, our educational model and open resources are designed to inspire and support other communities seeking to replicate this effort beyond the District."
            },
            {
                question: "How can I stay updated on events and initiatives?",
                answer:
                    "Subscribe to our newsletter and event calendar to stay informed. We also share updates through our website, social media, and the broader Bitcoin District community channels—so you’ll always know what’s happening in DC’s growing Bitcoin scene."
            }
        ]
    }
};
