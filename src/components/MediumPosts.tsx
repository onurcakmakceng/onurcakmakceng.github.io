import { useState, useEffect } from 'react';
import { ADDITIONAL_ARTICLES, MEDIUM_RSS, SITE } from '../site.config';

const FEED_POST_LIMIT = 5;
const WORDS_PER_MINUTE = 200;
const DESCRIPTION_LENGTH = 140;
const TRACKING_PIXEL_PATTERN = /medium\.com\/_\/stat/;

interface MediumFeedItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  description?: string;
  content?: string;
  enclosure?: { link?: string };
}

interface Article {
  title: string;
  link: string;
  publishedAt: string;
  thumbnail?: string;
  description: string;
  readTimeMinutes: number;
  publication?: string;
  isCoAuthored?: boolean;
}

type State =
  | { status: 'loading' }
  | { status: 'error'; articles: Article[] }
  | { status: 'success'; articles: Article[] };

function stripHtml(html?: string): string {
  return (
    html
      ?.replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() ?? ''
  );
}

function estimateReadTime(content?: string): number {
  const wordCount = stripHtml(content).split(/\s+/).filter(Boolean).length || 300;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

function truncateAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:]+$/, '')}…`;
}

function firstContentImage(content?: string): string | undefined {
  const imageSources = [...(content ?? '').matchAll(/<img[^>]+src="([^"]+)"/g)].map(
    ([, src]) => src
  );
  return imageSources.find((src) => !TRACKING_PIXEL_PATTERN.test(src));
}

function canonicalLink(link: string): string {
  return link.split('?')[0].replace(/\/$/, '');
}

function fromFeedItem(item: MediumFeedItem): Article {
  return {
    title: item.title,
    link: item.link,
    publishedAt: item.pubDate,
    thumbnail: item.thumbnail || item.enclosure?.link || firstContentImage(item.content),
    description: truncateAtWord(stripHtml(item.description), DESCRIPTION_LENGTH),
    readTimeMinutes: estimateReadTime(item.content),
  };
}

function mergeArticles(feedArticles: Article[], additionalArticles: readonly Article[]): Article[] {
  const articlesByLink = new Map<string, Article>();
  for (const article of [...additionalArticles, ...feedArticles]) {
    const key = canonicalLink(article.link);
    if (!articlesByLink.has(key)) articlesByLink.set(key, article);
  }
  return [...articlesByLink.values()].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

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
  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const metadata = [
    date,
    `${article.readTimeMinutes} min read`,
    article.isCoAuthored && 'Co-authored',
    article.publication,
  ].filter(Boolean);

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
        <span className="text-xs text-slate-600 font-mono">{metadata.join(' · ')}</span>
      </div>
    </a>
  );
}

export default function MediumPosts() {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    fetch(MEDIUM_RSS)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 'ok' || !Array.isArray(data.items)) throw new Error();
        const feedArticles = (data.items as MediumFeedItem[])
          .slice(0, FEED_POST_LIMIT)
          .map(fromFeedItem);
        setState({
          status: 'success',
          articles: mergeArticles(feedArticles, ADDITIONAL_ARTICLES),
        });
      })
      .catch(() => setState({ status: 'error', articles: mergeArticles([], ADDITIONAL_ARTICLES) }));
  }, []);

  if (state.status === 'loading') return <PostSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      {state.articles.map((article) => (
        <ArticleCard key={article.link} article={article} />
      ))}
      {state.status === 'error' && (
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
