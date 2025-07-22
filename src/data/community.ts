export interface Community {
    title: string;
    description: string;
}

// Direct key-based access - much cleaner!
export const community: Record<string, Community> = {
    education: {
        title: 'Bringing Education to You',
        description: 'Bitcoin can feel overwhelming for those just starting out. Our in-person meetups and outreach programs bring education directly to individuals, groups, and small businesses in their own communities, tailored to their level of understanding. This hands-on, personalized approach fosters confidence and builds a clear, practical grasp of Bitcoin\'s potential.'
    },
    'self-custody': {
        title: 'Mastering Self-Custody & Privacy',
        description: 'Bitcoin\'s strength lies in its ability to empower individuals to be their own bank. By educating our community on self-custody and privacy tools through hands-on workshops with experienced guides, we ensure that they can fully realize Bitcoin\'s promise of financial autonomy and protection against corporate surveillance and control.'
    },
    'focused-learning': {
        title: 'Creating Focused Learning Spaces',
        description: 'In an online world flooded with crypto hype and misinformation, our in-person events provide a focused, Bitcoin-only space where participants can learn from experienced and trusted sources without the distraction of altcoin promotions or get-rich-quick schemes.'
    },
    'human-connections': {
        title: 'Fostering Human Connections',
        description: 'Face-to-face interactions build trust and community in ways that digital platforms cannot match. These personal bonds create a network of support among Bitcoin advocates, sparking collaboration and shared growth.'
    },
    'local-networks': {
        title: 'Building Local Bitcoin Networks',
        description: 'From our hub in Washington, DC, we spark grassroots Bitcoin adoption and education tailored to our community\'s unique needs. By engaging directly with residents, businesses, and leaders, we bolster Bitcoin\'s decentralized network from the ground up.'
    },
    'lasting-impact': {
        title: 'Ensuring Lasting Impact',
        description: 'Strong in-person communities help pave the way for future generations to inherit a world where sound money thrives, free from the constraints of traditional banking.'
    }
}; 