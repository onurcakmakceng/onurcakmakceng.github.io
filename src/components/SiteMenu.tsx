import { useEffect, useId, useRef, useState } from 'react';
import { GitHubIcon, LinkedInIcon } from './icons';

interface MenuLink {
  href: string;
  label: string;
}

interface Props {
  links: readonly MenuLink[];
  linkedinUrl: string;
  githubUrl: string;
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      {open ? (
        <>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
    </svg>
  );
}

export default function SiteMenu({ links, linkedinUrl, githubUrl }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 hover:bg-[#26262e] hover:text-slate-100 transition-colors cursor-pointer"
      >
        <MenuIcon open={isOpen} />
      </button>

      {isOpen && (
        <div
          id={panelId}
          className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-[#2e2e3a] bg-[#202027] p-2 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
        >
          <ul className="list-none m-0 p-0">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-[#26262e] hover:text-slate-100 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex gap-1 border-t border-[#2e2e3a] pt-2">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-[#26262e] hover:text-slate-100 transition-colors"
            >
              <LinkedInIcon />
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-[#26262e] hover:text-slate-100 transition-colors"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
