export interface FaqItem {
    question: string;
    answer: string;
}

export interface FaqList {
    id: string;
    faqs: FaqItem[];
}

export const supporterFaqs: FaqList = {
    id: 'donations',
    faqs: [
        {
            question: "What is a Genesis Supporter?",
            answer: "The Genesis Supporters are members of DC’s local Bitcoin community who provided the earliest donations to help launch the Bitcoin District Initiative. This was a community-led effort, not a public campaign, and their contributions helped establish our educational programs, workshops, and outreach work across Washington, DC."
        },
        {
            question: "Do you have supporter tiers or membership levels?",
            answer: "No. We don’t have donor tiers or membership levels beyond our original Genesis Supporters. Every contribution—no matter the amount—helps advance our mission to build a grassroots Bitcoin circular economy in the Nation’s Capital. If you’d like to be recognized for your support, please reach out so we can include your preferred name or nym, avatar, and social link in our acknowledgments."
        },
        {
            question: "Can I remain anonymous?",
            answer: "Yes. Recognition is completely optional. You can choose to be listed anonymously, by nym, or with your real name. Bitcoin District Initiative respects your privacy and supports donors’ right to remain pseudonymous."
        },
        {
            question: "Can I edit or remove my recognition later?",
            answer: "Of course. You can update or remove your recognition at any time. Just contact us at hey@bitcoindistrictinitiative.org to change your preferred name, avatar, message, or remove your listing entirely."
        },
        {
            question: "What do donations support?",
            answer: "All donations support the educational and charitable mission of the Bitcoin District Initiative. Contributions fund hands-on Bitcoin workshops, merchant onboarding, educational materials, and open-source resources that strengthen economic freedom and personal sovereignty here in Washington, DC."
        }
    ]
};



