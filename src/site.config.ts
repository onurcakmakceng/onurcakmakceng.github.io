export const SITE = {
  name: 'Onur Cakmak',
  title: 'Onur Cakmak',
  description: 'Senior Software Engineer. Building software, tools, and ideas worth sharing.',
  url: 'https://onurcakmakceng.github.io',

  avatarUrl: 'https://avatars.githubusercontent.com/u/28986277?v=4',

  social: {
    github: 'https://github.com/onurcakmakceng',
    linkedin: 'https://www.linkedin.com/in/onur-cakmak-computer-engineer-hacettepe/',
    medium: 'https://medium.com/@onurcakmak',
    raindrop: 'https://onurcakmakcs.raindrop.page/',
  },

  author: {
    name: 'Onur Cakmak',
    bio: 'Senior Software Engineer at <a href="https://www.linkedin.com/company/metaphysic/" target="_blank" rel="noopener" class="text-slate-300 hover:text-[var(--color-accent)] transition-colors">Metaphysic.ai</a> <span class="text-slate-500 text-base">(Acquired by <a href="https://www.dneg.com" target="_blank" rel="noopener" class="hover:text-[var(--color-accent)] transition-colors">DNEG Group</a> and re-branded under <a href="https://brahma.io" target="_blank" rel="noopener" class="hover:text-[var(--color-accent)] transition-colors">Brahma AI</a>)</span>. I build software, developer tools, and write about things I learn along the way.',
    get copyright() {
      return `© ${new Date().getFullYear()} Onur Cakmak. All rights reserved.`;
    },
  },

  projects: [
    {
      name: 'Bookmark All Windows',
      description:
        'A browser extension that saves all tabs from all open windows into organized bookmark folders with a single click.',
      icon: '📚',
      tags: ['Chrome Extension'],
      pageUrl: '/bookmark-all-windows/',
      repoUrl: 'https://github.com/onurcakmakceng/bookmark-all-windows',
      licenseUrl: 'https://github.com/onurcakmakceng/bookmark-all-windows/blob/main/LICENSE',
    },
  ],
} as const;

export const MEDIUM_RSS = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://medium.com/feed/@onurcakmak')}`;
