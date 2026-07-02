(function () {
  const head = document.head;
  const theme = document.documentElement.dataset.theme || 'default';

  const palettes = {
    default: {
      accentDefault: '#38bdf8',
      accentBlue: '#2563eb',
      accentSky: '#0ea5e9',
      accentCyan: '#06b6d4',
      accentLight: '#7dd3fc',
    },
    baw: {
      accentDefault: '#fb923c',
      accentBlue: '#f97316',
      accentSky: '#fb923c',
      accentCyan: '#fdba74',
      accentLight: '#fed7aa',
    },
  };

  const p = palettes[theme] || palettes.default;

  function injectLink(rel, href, extra) {
    const el = document.createElement('link');
    el.rel = rel;
    el.href = href;
    if (extra) Object.assign(el, extra);
    head.appendChild(el);
  }

  function injectScript(src, onload) {
    const el = document.createElement('script');
    el.src = src;
    if (onload) el.onload = onload;
    head.appendChild(el);
  }

  function injectStyle(css) {
    const el = document.createElement('style');
    el.textContent = css;
    head.appendChild(el);
  }

  injectLink('preconnect', 'https://fonts.googleapis.com');
  injectLink('preconnect', 'https://fonts.gstatic.com', { crossOrigin: 'anonymous' });
  injectLink(
    'stylesheet',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
  );

  injectScript('https://cdn.tailwindcss.com', function () {
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Outfit', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            surface: {
              base: '#18181c',
              raised: '#202027',
              card: '#26262e',
              border: '#2e2e3a',
            },
            accent: {
              DEFAULT: p.accentDefault,
              blue: p.accentBlue,
              sky: p.accentSky,
              cyan: p.accentCyan,
              light: p.accentLight,
            },
          },
        },
      },
    };
  });

  const gradientText =
    theme === 'baw'
      ? `linear-gradient(135deg, ${p.accentBlue} 0%, ${p.accentSky} 100%)`
      : `linear-gradient(135deg, ${p.accentBlue} 0%, ${p.accentSky} 50%, ${p.accentCyan} 100%)`;

  const gradientBg =
    theme === 'baw'
      ? `linear-gradient(135deg, ${p.accentBlue} 0%, ${p.accentSky} 100%)`
      : `linear-gradient(135deg, ${p.accentBlue} 0%, ${p.accentSky} 50%, ${p.accentCyan} 100%)`;

  const ambientA = theme === 'baw' ? 'rgba(249, 115, 22, 0.12)' : 'rgba(37, 99, 235, 0.12)';
  const ambientB = theme === 'baw' ? 'rgba(251, 146, 60, 0.08)' : 'rgba(6, 182, 212, 0.08)';

  const stepGlowColor =
    theme === 'baw' ? `${p.accentBlue} !important` : `${p.accentSky} !important`;
  const stepGlowShadow = theme === 'baw' ? `rgba(249, 115, 22, 0.3)` : `rgba(14, 165, 233, 0.25)`;

  const heroGlowColor = theme === 'baw' ? `rgba(249, 115, 22, 0.25)` : `rgba(14, 165, 233, 0.2)`;

  injectStyle(`
    body { font-family: 'Outfit', sans-serif; }

    .gradient-text {
      background: ${gradientText};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .gradient-bg {
      background: ${gradientBg};
    }

    .ambient-glow {
      background:
        radial-gradient(ellipse 80% 50% at 20% -20%, ${ambientA} 0%, transparent 50%),
        radial-gradient(ellipse 60% 40% at 80% 100%, ${ambientB} 0%, transparent 50%);
    }

    .noise {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }

    .card-accent-line::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: ${gradientBg};
      opacity: 0;
      transition: opacity 0.3s;
      border-radius: 20px 20px 0 0;
    }
    .card-accent-line:hover::before { opacity: 1; }

    .step-highlight {
      border-color: ${stepGlowColor};
      box-shadow: 0 0 30px ${stepGlowShadow};
    }

    .hero-image-glow {
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4), 0 0 60px ${heroGlowColor};
    }
  `);
})();
