import { ADDITIONAL_ARTICLES, MEDIUM_RSS } from '../site.config';

const FEED_POST_LIMIT = 5;
const WORDS_PER_MINUTE = 200;
const DESCRIPTION_LENGTH = 140;
const FALLBACK_WORD_COUNT = 300;
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

export interface Article {
  title: string;
  link: string;
  publishedAt: string;
  thumbnail?: string;
  description: string;
  readTimeMinutes: number;
  publication?: string;
  isCoAuthored?: boolean;
}

export interface ArticleCollection {
  articles: Article[];
  isFeedAvailable: boolean;
}

function stripHtml(html?: string): string {
  return (
    html
      ?.replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() ?? ''
  );
}

function estimateReadTime(content?: string): number {
  const wordCount = stripHtml(content).split(/\s+/).filter(Boolean).length || FALLBACK_WORD_COUNT;
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

function mergeArticles(feedArticles: Article[]): Article[] {
  const articlesByLink = new Map<string, Article>();
  for (const article of [...ADDITIONAL_ARTICLES, ...feedArticles]) {
    const key = canonicalLink(article.link);
    if (!articlesByLink.has(key)) articlesByLink.set(key, article);
  }
  return [...articlesByLink.values()].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

async function fetchFeedArticles(): Promise<Article[]> {
  const response = await fetch(MEDIUM_RSS);
  const data = await response.json();
  if (data.status !== 'ok' || !Array.isArray(data.items)) {
    throw new Error('Medium feed is unavailable');
  }
  return (data.items as MediumFeedItem[]).slice(0, FEED_POST_LIMIT).map(fromFeedItem);
}

export async function loadArticles(): Promise<ArticleCollection> {
  try {
    return { articles: mergeArticles(await fetchFeedArticles()), isFeedAvailable: true };
  } catch {
    return { articles: mergeArticles([]), isFeedAvailable: false };
  }
}

export function formatArticleDate(article: Article): string {
  return new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function articleMetadata(article: Article): string[] {
  return [
    formatArticleDate(article),
    `${article.readTimeMinutes} min read`,
    article.isCoAuthored ? 'Co-authored' : undefined,
    article.publication,
  ].filter((part): part is string => Boolean(part));
}
