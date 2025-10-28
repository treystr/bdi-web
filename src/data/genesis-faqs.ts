export interface FaqItem {
    question: string;
    answer: string;
}

export interface FaqList {
    id: string;
    faqs: FaqItem[];
}

export const genesisFaqs: FaqList = {
    id: 'genesis',
    faqs: [
        {
            question: "How do I become a Genesis Donor?",
            answer: "Donate 100,000 sats or more using our Zaprite payment link. After your donation is confirmed, we'll reach out to gather your preferred display information—whether you'd like to be recognized by name, nym, or remain anonymous."
        },
        {
            question: "Can I remain anonymous?",
            answer: "Yes! Recognition on this page is completely optional. You can choose to be listed anonymously, use a pseudonym (nym), or provide your real name. Your privacy is respected, and you control how you're recognized."
        },
        {
            question: "Can I edit or remove my listing later?",
            answer: "Absolutely. Contact us anytime at hey@bitcoindistrictinitiative.org to update your information, change your display name, modify your message, or request removal from the Genesis Donors page."
        },
        {
            question: "What will my donation support?",
            answer: "Your Genesis donation helps fund the foundational work of the Bitcoin District Initiative: hosting educational workshops, onboarding local businesses to accept Bitcoin, printing educational materials, attending community markets and events, and developing open-source resources. You're helping build DC's Bitcoin circular economy from the ground up."
        }
    ]
};

