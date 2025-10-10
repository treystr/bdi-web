export interface Community {
    title: string;
    description: string;
}

// Direct key-based access - much cleaner!
export const community: Record<string, Community> = {
    education: {
        title: 'Bringing Education to You',
        description: 'Bitcoin can feel overwhelming at first. Our in-person meetups and outreach programs bring education directly to residents, local businesses, and local organizations—tailored to their level of understanding. This practical, hands-on approach builds confidence and helps people clearly see Bitcoin's role as sound money.'
    },
    'self-custody': {
        title: 'Mastering Self-Custody & Privacy',
        description: 'Bitcoin empowers individuals to be their own bank. Through workshops led by experienced guides, we teach self-custody and privacy tools so participants can secure their wealth, protect personal data, and live with greater independence from centralized control.'
    },
    'focused-learning': {
        title: 'Creating Focused Learning Spaces',
        description: 'The internet is crowded with distractions, hype, and misinformation. Our in-person gatherings provide a focused, Bitcoin-only environment where participants learn from trusted sources without the noise of altcoins or get-rich-quick schemes.'
    },
    'human-connections': {
        title: 'Fostering Human Connections',
        description: 'Face-to-face interactions build trust and community in ways that digital platforms cannot. These personal connections create a network of support among Bitcoin advocates, sparking collaboration, mentorship, and shared growth.'
    },
    'local-networks': {
        title: 'Building Local Bitcoin Networks',
        description: 'From our hub in Washington, DC, we encourage grassroots Bitcoin adoption by meeting the unique needs of local residents, businesses, and leaders. Strengthening these neighborhood-level connections helps expand Bitcoin’s decentralized network from the ground up.'
    },
    'lasting-impact': {
        title: 'Ensuring Lasting Impact',
        description: 'Strong, in-person communities lay the foundation for future generations to inherit a world where sound money thrives. By building together now, we secure a legacy of economic freedom and personal sovereignty.'
    }
};
