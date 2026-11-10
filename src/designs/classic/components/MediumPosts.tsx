import { SITE } from '../../../site.config';
import { articleMetadata, type Article } from '../../../lib/articles';
import { useArticles } from '../../../lib/useArticles';

function PostSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="h-24 rounded-xl bg-[#26262e] border border-[#2e2e3a] animate-pulse"
        />
      ))}
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 p-4 bg-[#26262e] border border-[#2e2e3a] rounded-xl hover:border-[var(--color-accent)] hover:-translate-y-0.5 transition-all"
    >
      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-20 h-20 rounded-lg object-cover shrink-0 bg-[#202027]"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      )}
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-slate-100 group-hover:text-[var(--color-accent)] transition-colors leading-snug mb-1 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-2">
          {article.description}
        </p>
        <span className="text-xs text-slate-600 font-mono">
          {articleMetadata(article).join(' · ')}
        </span>
      </div>
    </a>
  );
}

export default function MediumPosts() {
  const state = useArticles();

  if (state.status === 'loading') return <PostSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      {state.articles.map((article) => (
        <ArticleCard key={article.link} article={article} />
      ))}
      {!state.isFeedAvailable && (
        <p className="text-slate-500 text-sm">
          Couldn't load the latest articles.{' '}
          <a
            href={SITE.social.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:underline"
          >
            Read on Medium →
          </a>
        </p>
      )}
    </div>
  );
}
