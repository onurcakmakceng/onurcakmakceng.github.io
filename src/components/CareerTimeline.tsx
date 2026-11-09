interface CareerEntry {
  type: 'work' | 'education';
  title: string;
  organization: string;
  organizationUrl?: string;
  location?: string;
  start: string;
  end?: string | null;
  description?: string;
}

function formatRange(start: string, end?: string | null) {
  return end ? `${start} – ${end}` : `${start} – Present`;
}

function durationLabel(start: string, end?: string | null) {
  const parse = (value: string) => {
    const parts = value.split(' ');
    if (parts.length === 1) return Number(parts[0]) * 12;
    const [month, year] = parts;
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return Number(year) * 12 + months.indexOf(month);
  };

  const now = new Date();
  const currentLabel = `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][now.getMonth()]} ${now.getFullYear()}`;

  const startIndex = parse(start);
  const endIndex = end ? parse(end) : parse(currentLabel);
  const totalMonths = Math.max(endIndex - startIndex, 1);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years && months) return `${years} yr ${months} mo`;
  if (years) return `${years} yr${years > 1 ? 's' : ''}`;
  return `${months} mo${months > 1 ? 's' : ''}`;
}

export default function CareerTimeline({ entries }: { entries: readonly CareerEntry[] }) {
  return (
    <div className="relative">
      <div aria-hidden className="absolute left-[5px] top-2 bottom-2 w-px bg-[#2e2e3a]" />

      <ol className="list-none m-0 p-0 space-y-0">
        {entries.map((entry) => {
          const isCurrent = entry.type === 'work' && !entry.end;

          return (
            <li key={`${entry.organization}-${entry.start}`} className="relative pl-8 py-3 group">
              <div
                className={`absolute left-0 top-[18px] z-10 h-[11px] w-[11px] rounded-full border-2 ${
                  isCurrent
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)] shadow-[0_0_8px_color-mix(in_srgb,var(--color-accent)_50%,transparent)]'
                    : entry.type === 'education'
                      ? 'border-[#64748b] bg-[#64748b]'
                      : 'border-[#3a3a48] bg-[#26262e] group-hover:border-[var(--color-accent)] transition-colors'
                }`}
              />

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3 className="text-[0.95rem] font-semibold text-slate-100 leading-snug">
                      {entry.title}
                    </h3>
                    <span className="text-slate-600 hidden sm:inline">·</span>
                    {entry.organizationUrl ? (
                      <a
                        href={entry.organizationUrl}
                        target="_blank"
                        rel="noopener"
                        className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors"
                      >
                        {entry.organization}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-400">{entry.organization}</span>
                    )}
                  </div>
                  {entry.location && (
                    <p className="text-xs text-slate-600 mt-0.5">{entry.location}</p>
                  )}
                </div>

                <div className="shrink-0 flex items-baseline gap-2 mt-0.5 sm:mt-0">
                  <span className="font-mono text-xs text-slate-500 whitespace-nowrap">
                    {formatRange(entry.start, entry.end)}
                  </span>
                  {entry.type === 'work' && (
                    <span className="font-mono text-[0.6rem] text-slate-600 whitespace-nowrap">
                      ({durationLabel(entry.start, entry.end)})
                    </span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
