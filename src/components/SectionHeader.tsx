interface Props {
  label: string;
  title: string;
  description?: string;
  linkHref?: string;
  linkText?: string;
}

export default function SectionHeader({ label, title, description, linkHref, linkText }: Props) {
  return (
    <div className="mb-8">
      <p className="font-mono text-xs text-[var(--color-accent)] uppercase tracking-widest mb-1">
        {label}
      </p>
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {linkHref && linkText && (
          <a
            href={linkHref}
            target="_blank"
            rel="noopener"
            className="text-sm text-slate-500 hover:text-[var(--color-accent)] transition-colors"
          >
            {linkText}
          </a>
        )}
      </div>
      {description && <p className="text-slate-500 text-sm mt-1">{description}</p>}
    </div>
  );
}
