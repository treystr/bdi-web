// Type definitions for social links
export type SocialIconType = 'x' | 'instagram' | 'github' | 'linkedin' | 'mail' | 'nostr' | 'tiktok' | 'calendar';
export type SocialLocation = 'header' | 'footer' | 'all';

export interface SocialLink {
  icon: SocialIconType;
  url: string;
  enabled: boolean;
  visibleIn: SocialLocation[];
}

export const siteConfig = {
  companyName: 'Bitcoin District Initiative',
  siteUrl: 'https://bitcoindistrictinitiative.org',
  Socials: {
      xSocial: 'https://x.com/BTCDCInitiative',
      Github: 'https://github.com/',
      Instagram: 'https://www.instagram.com/bitcoindistrictinitiative/',
      LinkedIn: 'https://www.linkedin.com/company/bitcoindistrictinitiative',
      Email: 'hey@bitcoindistrictinitiative.org',
      Phone: null,
      Location: 'Washington, DC',
  },
  socialLinks: [
    { 
      icon: 'x' as SocialIconType, 
      url: 'https://x.com/BTCDCInitiative',
      enabled: true,
      visibleIn: ['header', 'footer'] as SocialLocation[]
    },
    { 
      icon: 'instagram' as SocialIconType, 
      url: 'https://www.instagram.com/btcdistrict/',
      enabled: true,
      visibleIn: ['header', 'footer'] as SocialLocation[]
    },
    { 
      icon: 'tiktok' as SocialIconType, 
      url: 'https://tiktok.com/@bitcoindistrict',
      enabled: false,
      visibleIn: ['footer'] as SocialLocation[]
    },
    { 
      icon: 'nostr' as SocialIconType, 
      url: 'https://primal.net/p/nprofile1qqsgw7yl3m62uc0ffjl3ly5m8cqve63lprjdpkweejtemkl04r3vevsgzv27k',
      enabled: true,
      visibleIn: ['footer'] as SocialLocation[]
    },
    { 
      icon: 'linkedin' as SocialIconType, 
      url: 'https://www.linkedin.com/company/bitcoindistrictinitiative',
      enabled: true,
      visibleIn: ['footer'] as SocialLocation[]
    },
    { 
      icon: 'calendar' as SocialIconType, 
      url: 'https://luma.com/bitcoindistrict?k=c',
      enabled: true,
      visibleIn: ['header', 'footer'] as SocialLocation[]
    },
  ] as SocialLink[]
};

/**
 * Get filtered social links for a specific location
 * @param location - The location to filter by ('header', 'footer', or 'all')
 * @returns Array of enabled social links visible in the specified location
 */
export function getSocialLinksByLocation(location: SocialLocation): SocialLink[] {
  return siteConfig.socialLinks.filter(link => {
    // Must be enabled globally
    if (!link.enabled) return false;
    
    // If location is 'all', return all enabled links
    if (location === 'all') return true;
    
    // Check if link is visible in the specified location
    return link.visibleIn.includes(location) || link.visibleIn.includes('all');
  });
}

export const SEO = {
  Separator: '|',
  SiteName: 'Bitcoin District Initiative',
  defaultDescription: 'A 501(c)(3) nonprofit building a grassroots Bitcoin circular economy in Washington, DC through education and business adoption.',
  defaultOgImage: '/og-default.jpg',
};
  
export const blogSetting = {
  postsPerPage: 6   
}

export const themeSetting = {
  theme: 'satoshi'
}

export const headerSetting = {
  headerMode: 'transition' // 'fixed' or 'transition'
}

export const layoutSetting = {
  containerWidths: {
    hero: '1200px',
    content: '1100px', 
    article: '800px'
  }
}

export const announcementBarSetting = {
  enabled: true,
  text: 'GOT QUESTIONS? JUST ASK!',
  link: '/contact',
  showOnPages: ['/', '/index'], // Pages to show the announcement bar on (empty array = all pages)
  backgroundColor: 'bg-primary', // Use theme primary color (orange)
  textColor: 'text-white',
  dismissible: false // Future feature: allow users to dismiss
}

export const formspree = {
  contactFormEndpoint: 'https://formspree.io/f/movpgkwr',
  recaptchaSiteKey: '6LfucgQsAAAAAL82ooj_hFKMPs0ki9BaY1hxMlcl'
}

// Google Analytics configuration
// Note: Analytics is automatically disabled in development mode (npm run dev)
// It will only run in production builds, regardless of the enabled setting
export const googleAnalytics = {
  id: 'G-WJS960PW5M', // Google Analytics 4 (GA4) measurement ID
  enabled: true // Set to false to disable Google Analytics
}