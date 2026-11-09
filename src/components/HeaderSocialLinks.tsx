import { useEffect, useState } from 'react';
import { GitHubIcon, LinkedInIcon } from './icons';

const STICKY_HEADER_OFFSET_PX = 72;

interface Props {
  linkedinUrl: string;
  githubUrl: string;
  revealAfterElementId: string;
}

export default function HeaderSocialLinks({ linkedinUrl, githubUrl, revealAfterElementId }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(revealAfterElementId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const hasScrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setIsVisible(hasScrolledPast);
      },
      { rootMargin: `-${STICKY_HEADER_OFFSET_PX}px 0px 0px 0px` }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [revealAfterElementId]);

  const links = [
    { href: linkedinUrl, label: 'LinkedIn', Icon: LinkedInIcon },
    { href: githubUrl, label: 'GitHub', Icon: GitHubIcon },
  ];

  return (
    <div
      aria-hidden={!isVisible}
      className={`flex items-center gap-1 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          tabIndex={isVisible ? 0 : -1}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-[#26262e] hover:text-slate-100 transition-colors"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
