export interface Narrative {
    title: string;
    content: string;
}

export const narratives: Record<string, Narrative> = {
    mission: {
        title: 'Our Mission',
        content: 'Build a grassroots Bitcoin Circular Economy in the Nation’s Capital. The Bitcoin District Initiative is a 501(c)(3) nonprofit public charity advancing grassroots Bitcoin adoption in Washington, DC and beyond. Our objectives are to support local business adoption and foster circular Bitcoin economies, educate residents and communities through accessible workshops and meetups, and partner with other local initiatives to expand sustainable, Bitcoin-based economic networks nationwide. Guided by a volunteer board and rooted in transparency and open-source principles, we\’re building a foundation for real-world Bitcoin use that strengthens economic freedom and personal sovereignty from the ground up.'
    },
    'who-we-are': {
        title: 'Who We Are',
        content: 'The Bitcoin District Initiative is a 501(c)(3)nonprofit building a Bitcoin circular economy in the Nation\’s Capital.'
    }

};
