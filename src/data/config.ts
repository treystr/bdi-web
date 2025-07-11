export const siteConfig = {
  companyName: 'Bitcoin District Initiative',
  siteUrl: 'https://bitcoindistrictinitiative.org',
  Socials: {
      xSocial: 'https://x.com/btcdistrict',
      Github: 'https://github.com/',
      Instagram: 'https://www.instagram.com/',
      LinkedIn: 'https://www.linkedin.com/company/',
      Email: 'hey@bitcoindistrictinitiative.org',
      Phone: null,
      Location: 'Washington, DC',
  },
  socialLinks: [
    { icon: 'x', url: 'https://x.com/btcd_init' },
    { icon: 'nostr', url: 'nostr:npub1yournostrpubkey' },
    { icon: 'meetup', url: 'https://www.meetup.com/bitcoin-district/' },
  ]
};

export const SEO = {
  Separator: '|',
  SiteName: 'Bitcoin District Initiative',
  defaultDescription: 'Building DC’s Grassroots Bitcoin Community',
};
  
export const blogSetting = {
  postsPerPage: 6   
}

export const themeSetting = {
  theme: 'hermes'
}

export const headerSetting = {
  headerMode: 'transition' // 'fixed' or 'transition'
}