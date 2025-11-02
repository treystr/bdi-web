export const siteConfig = {
  companyName: 'Bitcoin District Initiative',
  siteUrl: 'https://bitcoindistrictinitiative.org',
  Socials: {
      xSocial: 'https://x.com/btcd_init',
      Github: 'https://github.com/',
      Instagram: 'https://www.instagram.com/bitcoindistrictinitiative/',
      LinkedIn: 'https://www.linkedin.com/company/bitcoindistrictinitiative',
      Email: 'hey@bitcoindistrictinitiative.org',
      Phone: null,
      Location: 'Washington, DC',
  },
  socialLinks: [
    { icon: 'x', url: 'https://x.com/btcd_init' },
    { icon: 'instagram', url: 'https://www.instagram.com/btcdistrict/' },
    { icon: 'nostr', url: 'https://primal.net/p/nprofile1qqsgw7yl3m62uc0ffjl3ly5m8cqve63lprjdpkweejtemkl04r3vevsgzv27k' },
    { icon: 'linkedin', url: 'https://www.linkedin.com/company/bitcoindistrictinitiative' },
  ]
};

export const SEO = {
  Separator: '|',
  SiteName: 'Bitcoin District Initiative',
  defaultDescription: 'The Bitcoin District Initiative is a 501(c)(3) nonprofit building a grassroots Bitcoin circular economy in Washington, DC through education and business adoption.',
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