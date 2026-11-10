const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export interface OrganizationLink {
  name: string;
  url: string;
}

export interface CareerEntry {
  type: 'work' | 'education';
  title: string;
  organization: string;
  organizationUrl?: string;
  currentOrganization?: OrganizationLink;
  location?: string;
  note?: string;
  start: string;
  end?: string | null;
  description?: string;
}

function toMonthIndex(label: string): number {
  const parts = label.split(' ');
  if (parts.length === 1) return Number(parts[0]) * 12;
  const [month, year] = parts;
  return Number(year) * 12 + MONTHS.indexOf(month);
}

function currentMonthIndex(): number {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
}

export function isCurrentRole(entry: CareerEntry): boolean {
  return entry.type === 'work' && !entry.end;
}

export function formatRange(entry: CareerEntry): string {
  return `${entry.start} – ${entry.end ?? 'Present'}`;
}

export function formatDuration(entry: CareerEntry): string {
  const endIndex = entry.end ? toMonthIndex(entry.end) : currentMonthIndex();
  const totalMonths = Math.max(endIndex - toMonthIndex(entry.start), 1);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years && months) return `${years} yr ${months} mo`;
  if (years) return `${years} yr${years > 1 ? 's' : ''}`;
  return `${months} mo${months > 1 ? 's' : ''}`;
}

export function secondaryDetail(entry: CareerEntry): string | undefined {
  return entry.type === 'work' ? formatDuration(entry) : entry.note;
}
