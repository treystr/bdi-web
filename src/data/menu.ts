// src/data/menu.ts

export interface MenuItem {
    name: string;
    link: string;
    children?: MenuItem[];
    showArrow?: boolean;
    mobileOnly?: boolean;
}

export interface SocialLink {
    name: string;
    url: string;
    icon: 'instagram' | 'twitter';
    ariaLabel: string;
}

export const headerMenu: MenuItem[] = [
    // { name: 'Theme Info', link: '/theme-info' },
    { name: 'Why Bitcoin?', link: '/why' },
    { name: 'Initiatives', link: '/initiatives' },
    { name: 'Resources', link: '/resources' },
    { 
      name: 'About Us', 
      link: '/about',
      showArrow: true,
      children: [
          { name: 'Transparency', link: '/transparency' },
          { name: 'FAQ', link: '/faq' }
      ]
  },
    { name: 'Join Bitcoin District', link: 'https://bitcoindistrict.org', mobileOnly: true }
];

export const socialLinks: SocialLink[] = [
    {
        name: 'Instagram',
        url: 'https://instagram.com/btcdistrict',
        icon: 'instagram',
        ariaLabel: 'Follow us on Instagram'
    },
    {
        name: 'X',
        url: 'https://x.com/btcdistrict',
        icon: 'twitter',
        ariaLabel: 'Follow us on X (formerly Twitter)'
    }
];

export const footerMenu = [
  { name: 'About', link: '/about' },
  { name: 'Donate', link: '/donate' },
//
//  { name: 'Transparency', link: '/transparency' },
//  { name: 'FAQ', link: '/faq' },
  { name: 'Blog', link: '/blog' },
  { name: 'Join Bitcoin District', link: 'https://bitcoindistrict.org' },
  { name: 'Contact Us', link: '/contact' }
];

export const legalMenu = [
    { name: 'Privacy', link: '/legal/privacy-policy' },
//    { name: 'Terms of Service', link: '/legal/terms-of-service' }
];

