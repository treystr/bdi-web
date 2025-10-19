// src/data/menu.ts

export interface MenuItem {
    name: string;
    link: string;
    children?: MenuItem[];
    showArrow?: boolean;
    mobileOnly?: boolean;
}

export const headerMenu: MenuItem[] = [
    // { name: 'Theme Info', link: '/theme-info' },
    { name: 'About', link: '/about' },
    { name: 'Initiatives', link: '/initiatives' },
    { name: 'Resources', link: '/resources' },
    { name: 'Transparency', link: '/transparency' },
    { name: 'FAQ', link: '/faq' },
    { name: 'Join Bitcoin District', link: 'https://bitcoindistrict.org', mobileOnly: true }
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

