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
                question: "What's the difference between 'Bitcoin District' and the 'Bitcoin District Initiative'?",
                answer: "Bitcoin District is the open community of all Bitcoiners in and around Washington DC—including individuals, businesses, organizations and companies throughout the region. Bitcoin District belongs to everyone and is owned by the community, not any single entity. The Bitcoin District Initiative is just one nonprofit organization operating within the District, focused specifically on community-level Bitcoin adoption through education and outreach. While we host events in Bitcoin District, the community itself is much larger than our organization and includes all the amazing Bitcoiners and Bitcoin-focused businesses that make up this vibrant ecosystem."
            },
            {
                question: "What is the Bitcoin District Initiative?",
                answer: "The Bitcoin District Initiative is a nonprofit dedicated to advancing public understanding of Bitcoin and freedom technologies in the Washington, DC area and beyond. We empower individuals and small businesses through accessible education, community meetups, and open-source resources to achieve financial independence and personal sovereignty."
            },
            {
                question: "Are my donations tax exempt?",
                answer: "We have filed for 501(c)(3) nonprofit status with the IRS and are currently awaiting determination. While we anticipate approval, donations made at this time may not be tax-deductible until our status is officially confirmed. We will update our community as soon as we receive a decision from the IRS."
            },
            {
                question: "Who can participate in your programs?",
                answer: "Anyone interested in learning about Bitcoin and privacy-preserving technologies is welcome! Our programs are designed for all levels, from beginners to experienced users, including individuals, small businesses, and community organizations in the DC area and beyond."
            },
            {
                question: "Are your events and resources free?",
                answer: "Most of our workshops, meetups, and educational materials are free to ensure accessibility for all. Some specialized programs may have nominal fees to cover costs, but we strive to keep everything affordable and inclusive. Check our website for specific event details."
            },
            {
                question: "How can I get involved with the Bitcoin District Initiative?",
                answer: "You can join our community by attending meetups, participating in workshops, volunteering, or making a donation to support our mission. Visit our website to sign up for events, access resources, or contact us to learn about volunteer opportunities."
            },
            {
                question: "Why focus on Bitcoin and not other cryptocurrencies?",
                answer: "We focus exclusively on Bitcoin because of its decentralized, open-source nature and its potential to empower individuals with financial sovereignty. Our mission is to provide clear, scam-free education, avoiding the speculative noise of the broader cryptocurrency space."
            },
            {
                question: "How do you ensure privacy and security in your programs?",
                answer: "We prioritize privacy by teaching self-custody practices and promoting open-source, privacy-preserving tools. Our educational programs emphasize secure Bitcoin use, and we adhere to strict confidentiality policies to protect participant information."
            },
            {
                question: "Can my business benefit from your programs?",
                answer: "Absolutely! We offer workshops and resources tailored to small businesses, helping them understand how to use Bitcoin for payments, enhance financial independence, and protect customer privacy. Contact us to explore partnership opportunities."
            },
        ]
    }
};