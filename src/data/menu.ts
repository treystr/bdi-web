// src/data/menu.ts

export interface MenuItem {
    name: string;
    link: string;
    children?: MenuItem[];
    showArrow?: boolean;
}

export const headerMenu: MenuItem[] = [
    // { name: 'Theme Info', link: '/theme-info' },
    { name: 'About', link: '/about' },
    { name: 'Blog', link: '/blog' },
    { name: 'Transparency', link: '/transparency' },
    { name: 'FAQ', link: '/faq' }
];

export const footerMenu = [
  { name: 'About', link: '/about' },
  { name: 'Our Team', link: '/team' },
//
//  { name: 'Transparency', link: '/transparency' },
//  { name: 'FAQ', link: '/faq' },
  { name: 'Contact Us', link: '/contact' },
];

export const legalMenu = [
    { name: 'Privacy Policy', link: '/legal/privacy-policy' },
//    { name: 'Terms of Service', link: '/legal/terms-of-service' }
];

