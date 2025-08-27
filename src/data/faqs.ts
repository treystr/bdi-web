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
                answer: "The Bitcoin District Initiative is a nonprofit dedicated to advancing public understanding of Bitcoin and freedom technologies in Washington, DC and beyond. Through education, community meetups, and open-source resources, we empower individuals and small businesses to achieve financial independence and personal sovereignty."
            },
            {
                question: "What's the difference between 'Bitcoin District' and the 'Bitcoin District Initiative'?",
                answer: "Bitcoin District is the open community of all Bitcoiners in and around Washington, DC—including individuals, businesses, and organizations across the region. It belongs to everyone and is owned by the community, not any single entity. The Bitcoin District Initiative is one nonprofit operating within this broader District, focused specifically on grassroots education and adoption. While we host events in Bitcoin District, the community itself is much larger than our organization."
            },
            {
                question: "Who can participate in your programs?",
                answer: "Anyone interested in learning about Bitcoin and privacy-preserving technologies is welcome. Our programs are designed for all levels—from beginners to experienced users—including individuals, small businesses, and community groups."
            },
            {
                question: "Are your events and resources free?",
                answer: "Most of our workshops, meetups, and educational materials are free to ensure accessibility for all. Some specialized programs may include small fees to cover costs, but our priority is keeping everything affordable and inclusive."
            },
            {
                question: "Can my business benefit from your programs?",
                answer: "Absolutely. We provide workshops and resources tailored to small businesses, helping owners explore Bitcoin for payments, improve financial independence, and protect customer privacy. We also conduct outreach and market research to better understand local business needs."
            },
            {
                question: "How can I get involved with the Bitcoin District Initiative?",
                answer: "You can join by attending meetups, participating in workshops, volunteering, or making a donation to support our mission. Visit our website to see upcoming events, sign up for updates, or contact us directly about volunteer opportunities."
            },
            {
                question: "Are my donations tax-exempt?",
                answer: "We have filed for 501(c)(3) nonprofit status with the IRS and are awaiting determination. While we expect approval, donations made now may not be tax-deductible until our status is confirmed. We’ll update the community as soon as a decision is made."
            },
            {
                question: "Why focus on Bitcoin and not other cryptocurrencies?",
                answer: "We focus exclusively on Bitcoin because of its decentralized, open-source design and its proven ability to empower individuals with financial sovereignty. Our mission is to provide clear, scam-free education without the distractions of speculative tokens or projects."
            },
            {
                question: "How do you ensure privacy and security in your programs?",
                answer: "We teach best practices for self-custody and promote open-source, privacy-preserving tools. Our workshops emphasize safe Bitcoin use, and we uphold strict confidentiality policies to protect participant information."
            },
            {
                question: "Do you only operate in Washington, DC?",
                answer: "Our primary focus is the DC region, but our educational resources, outreach models, and community connections are designed to inspire and support Bitcoin adoption well beyond the District."
            },
            {
                question: "How can I stay updated on events and initiatives?",
                answer: "The best way is to subscribe to our event calendar and newsletter. We also share updates through social media and Bitcoin District community channels, so you’ll always know what’s happening locally."
            }
        ]
    }
};
