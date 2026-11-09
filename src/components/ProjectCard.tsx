import { ExternalLinkIcon, GitHubIcon } from './icons';

interface Project {
  name: string;
  description: string;
  icon: string;
  tags: readonly string[];
  pageUrl: string;
  repoUrl: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-accent-line bg-[#26262e] border border-[#2e2e3a] rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] cursor-pointer">
      <a
        href={project.pageUrl}
        className="absolute inset-0 z-0"
        aria-label={`View ${project.name} project page`}
      />
      <div className="w-11 h-11 bg-[#202027] rounded-xl flex items-center justify-center text-2xl mb-4">
        {project.icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono px-2.5 py-1 bg-[#202027] rounded text-[0.7rem] text-slate-500"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        <span className="inline-flex items-center gap-1.5 text-[var(--color-accent)] text-sm font-medium">
          <ExternalLinkIcon />
          Project Page
        </span>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-flex items-center gap-1.5 text-slate-500 text-sm font-medium hover:text-slate-300 transition-colors"
        >
          <GitHubIcon size={14} />
          Source
        </a>
      </div>
    </article>
  );
}
