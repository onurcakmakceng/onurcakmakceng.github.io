const SITE_CONFIG = {
  siteName: 'Onur Cakmak',
  siteTagline: 'Senior Software Engineer',

  baseUrl: 'https://onurcakmakeng.github.io',
  githubUrl: 'https://github.com/onurcakmakeng',
  linkedinUrl: 'https://linkedin.com/in/onurcakmak',
  mediumUrl: 'https://medium.com/@onurcakmak',
  raindropUrl: 'https://onurcakmakcs.raindrop.page/',

  author: {
    name: 'Onur Cakmak',
    bio: 'Senior Software Engineer at Metaphysic.ai. Building software, tools, and ideas worth sharing.',
    copyright: `© ${new Date().getFullYear()} Onur Cakmak. All rights reserved.`,
  },

  writing: [
    {
      title: "AI Code Generation Manifesto: Save Your Team's Collective Time",
      url: 'https://medium.com/@onurcakmak/ai-code-generation-manifesto-8782593e5db5',
      date: 'Aug 31, 2025',
      readTime: '2 min read',
      description:
        'A practical guide on how to use AI code generation responsibly — step by step, protecting team effort, and keeping PRs clean and reviewable.',
    },
  ],

  projects: {
    bookmarkAllWindows: {
      name: 'Bookmark All Windows',
      repoUrl: 'https://github.com/onurcakmakeng/bookmark-all-windows',
      pageUrl: '/bookmark-all-windows/',
      licenseUrl: 'https://github.com/onurcakmakeng/bookmark-all-windows/blob/main/LICENSE',
    },
  },
};

if (typeof window !== 'undefined') {
  window.SITE_CONFIG = SITE_CONFIG;
}
