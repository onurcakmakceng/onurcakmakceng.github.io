export const BOOKMARK_ALL_WINDOWS = {
  name: 'Bookmark All Windows',
  description:
    'A browser extension that saves all tabs from all open windows into organized bookmark folders with a single click.',
  icon: '📚',
  tags: ['Chrome Extension'],
  pageUrl: '/bookmark-all-windows/',
  repoUrl: 'https://github.com/onurcakmakceng/bookmark-all-windows',
  licenseUrl: 'https://github.com/onurcakmakceng/bookmark-all-windows/blob/main/LICENSE',
} as const;

export const ANTEON = {
  name: 'Anteon (formerly Ddosify)',
  description:
    'Co-founded open-source eBPF-based Kubernetes monitoring and performance testing platform with 8.5K+ GitHub stars.',
  logoUrl: 'https://avatars.githubusercontent.com/u/75415501?s=88&v=4',
  tags: ['Go', 'Kubernetes', 'eBPF', 'Load Testing'],
  websiteUrl: 'https://getanteon.com',
  repoUrl: 'https://github.com/getanteon/anteon',
} as const;

export const SITE = {
  name: 'Onur Cakmak',
  title: 'Onur Cakmak',
  description:
    'Senior Software Engineer with 8+ years of experience. Passionate about quality products, deep technical learning, and building things people love to use.',
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
    get copyright() {
      return `© ${new Date().getFullYear()} Onur Cakmak. All rights reserved.`;
    },
  },

  career: [
    {
      type: 'work',
      title: 'Senior Software Engineer',
      organization: 'Metaphysic.ai',
      organizationUrl: 'https://www.linkedin.com/company/metaphysic-ai/',
      currentOrganization: {
        name: 'Brahma AI',
        url: 'https://www.linkedin.com/company/brahmaai/',
      },
      location: 'London, United Kingdom',
      start: 'Jul 2023',
      end: null,
      description:
        'VFX pipeline tooling and GenAI R&D platform. Backend with Python/Django on AWS, frontend with React and TypeScript.',
    },
    {
      type: 'work',
      title: 'Software Engineer',
      organization: 'Trendyol Group',
      organizationUrl: 'https://www.linkedin.com/company/trendyolgroup/',
      location: 'Istanbul, Turkey',
      start: 'Feb 2023',
      end: 'Jul 2023',
      description: "Backend engineering for one of Europe's largest e-commerce platforms.",
    },
    {
      type: 'work',
      title: 'Co-Founder',
      organization: 'Ddosify (Anteon)',
      organizationUrl: 'https://www.linkedin.com/company/getanteon/',
      location: 'Ankara, Turkey',
      start: 'Aug 2021',
      end: 'Aug 2022',
      description:
        'Built the cloud load testing platform. Python/Django microservices, React frontend, Docker, PostgreSQL, RabbitMQ.',
    },
    {
      type: 'work',
      title: 'Software Engineer',
      organization: 'Dream Games',
      organizationUrl: 'https://www.linkedin.com/company/dreamgames/',
      location: 'Istanbul, Turkey',
      start: 'Apr 2021',
      end: 'Jul 2021',
      description: 'Match-3 puzzle game development.',
    },
    {
      type: 'work',
      title: 'Software Engineer',
      organization: 'Aselsan',
      organizationUrl: 'https://www.linkedin.com/company/aselsan/',
      location: 'Ankara, Turkey',
      start: 'Oct 2017',
      end: 'Oct 2020',
      description: 'ICT systems with C#, .NET Core, RESTful services, SignalR, and SQL Server.',
    },
    {
      type: 'work',
      title: 'Software Engineer',
      organization: 'HAVELSAN',
      organizationUrl: 'https://www.linkedin.com/company/havelsan/',
      location: 'Ankara, Turkey',
      start: 'Jan 2017',
      end: 'Aug 2017',
      description: 'SIEM project development with Java, Spring Boot, Hadoop, Kafka, and AngularJS.',
    },
    {
      type: 'education',
      title: 'B.S. Computer Engineering',
      organization: 'Hacettepe University',
      organizationUrl: 'https://www.linkedin.com/school/hacettepe-university/',
      location: 'Ankara, Turkey',
      note: 'GPA 3.62/4.00',
      start: '2013',
      end: '2017',
      description: "Graduated with honors from one of Turkey's top engineering programs.",
    },
  ],

  projects: [ANTEON, BOOKMARK_ALL_WINDOWS],
} as const;

export const MEDIUM_RSS = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://medium.com/feed/@onurcakmak')}`;
