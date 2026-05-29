const SITE_CONFIG = {
  siteName: 'Onur Cakmak',
  siteTagline: 'Building useful tools for developers',
  
  baseUrl: 'https://onurcakmakeng.github.io',
  githubUrl: 'https://github.com/onurcakmakeng',
  
  author: {
    name: 'Onur Cakmak',
    copyright: `© ${new Date().getFullYear()} Onur Cakmak. All rights reserved.`
  },

  projects: {
    bookmarkAllWindows: {
      name: 'Bookmark All Windows',
      repoUrl: 'https://github.com/onurcakmakeng/bookmark-all-windows',
      pageUrl: '/bookmark-all-windows/',
      licenseUrl: 'https://github.com/onurcakmakeng/bookmark-all-windows/blob/main/LICENSE'
    }
  }
};

if (typeof window !== 'undefined') {
  window.SITE_CONFIG = SITE_CONFIG;
}

