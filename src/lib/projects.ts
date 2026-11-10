export interface Project {
  name: string;
  description: string;
  tags: readonly string[];
  repoUrl: string;
  icon?: string;
  logoUrl?: string;
  pageUrl?: string;
  websiteUrl?: string;
}

export interface ProjectLink {
  href: string;
  label: string;
  isExternal: boolean;
}

export function primaryProjectLink(project: Project): ProjectLink {
  if (project.pageUrl) return { href: project.pageUrl, label: 'Project Page', isExternal: false };
  if (project.websiteUrl) return { href: project.websiteUrl, label: 'Website', isExternal: true };
  return { href: project.repoUrl, label: 'Repository', isExternal: true };
}

export function externalLinkAttributes(link: ProjectLink) {
  return link.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}
