import type { ComponentType } from 'react';

interface Props {
  title: string;
  description?: string;
  linkHref?: string;
  linkText?: string;
  linkIcon?: ComponentType<{ size?: number }>;
}

export default function SectionHeader({
  title,
  description,
  linkHref,
  linkText,
  linkIcon: LinkIcon,
}: Props) {
  return (
    <div className="mb-8">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {linkHref && linkText && (
          <a
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[var(--color-accent)] transition-colors"
          >
            {LinkIcon && <LinkIcon size={14} />}
            {linkText}
          </a>
        )}
      </div>
      {description && <p className="text-slate-500 text-sm mt-1 max-w-xl">{description}</p>}
    </div>
  );
}
