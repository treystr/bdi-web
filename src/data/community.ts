export interface Community {
    title: string;
    description: string;
}

// Direct key-based access - much cleaner!
export const community: Record<string, Community> = {
    education: {
        title: 'Bringing Education to You',
        description:
            'Bitcoin can feel overwhelming at first. Our in-person workshops and outreach programs bring practical education directly to residents, small businesses, and local organizations across Washington, DC. Each session is tailored to meet people where they are—building real understanding, confidence, and the skills to use Bitcoin in everyday life.'
    },
    'self-custody': {
        title: 'Mastering Self-Custody & Privacy',
        description:
            'In a circular economy, sovereignty starts with self-custody. Through hands-on workshops led by experienced guides, we teach participants how to secure their Bitcoin, protect their privacy, and operate independently from centralized systems—empowering them to truly own their money.'
    },
    'focused-learning': {
        title: 'Creating Focused Learning Spaces',
        description:
            'Our meetups and gatherings offer a focused, Bitcoin-only environment free from distractions, hype, or speculation. These spaces foster deep learning and genuine understanding of Bitcoin’s role as sound money within a growing local economy.'
    },
    'human-connections': {
        title: 'Fostering Human Connections',
        description:
            'A thriving circular economy depends on trust and collaboration. Our face-to-face meetups build relationships among residents, merchants, and educators—creating a supportive local network of Bitcoiners working together toward shared goals of freedom and resilience.'
    },
    'local-networks': {
        title: 'Building the DC Bitcoin Economy',
        description:
            'From our hub in the Nation’s Capital, we connect individuals, small businesses, and community leaders to build real Bitcoin commerce and collaboration. Each new connection strengthens the local circular economy and demonstrates how sound money can work at the neighborhood level.'
    },
    'lasting-impact': {
        title: 'Creating Lasting Impact',
        description:
            'By educating, connecting, and building together, we’re laying the groundwork for a self-sustaining Bitcoin circular economy in Washington, DC. What we build here can serve as a model for cities everywhere—a proof of concept for how sound money can thrive from the ground up.'
    }
};
