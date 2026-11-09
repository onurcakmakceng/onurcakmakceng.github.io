import { useState, useEffect } from 'react';
import { MEDIUM_RSS } from '../site.config';

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  description?: string;
  content?: string;
  enclosure?: { link?: string };
}

type State =
  { status: 'loading' } | { status: 'error' } | { status: 'success'; posts: MediumPost[] };

function estimateReadTime(content?: string): number {
  const wordCount = content?.replace(/<[^>]*>/g, '').split(/\s+/).length ?? 300;
  return Math.max(1, Math.round(wordCount / 200));
}

function stripHtml(html?: string): string {
  return html?.replace(/<[^>]*>/g, '') ?? '';
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

function PostCard({ post }: { post: MediumPost }) {
  const thumbnail = post.thumbnail || post.enclosure?.link || null;
  const date = new Date(post.pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const readTime = estimateReadTime(post.content);
  const description = stripHtml(post.description).slice(0, 140);

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener"
      className="group flex gap-4 p-4 bg-[#26262e] border border-[#2e2e3a] rounded-xl hover:border-[var(--color-accent)] hover:-translate-y-0.5 transition-all"
    >
      {thumbnail && (
        <img
          src={thumbnail}
          alt={post.title}
          className="w-20 h-20 rounded-lg object-cover shrink-0 bg-[#202027]"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      )}
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-slate-100 group-hover:text-[var(--color-accent)] transition-colors leading-snug mb-1 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-2">{description}...</p>
        <span className="text-xs text-slate-600 font-mono">
          {date} · {readTime} min read
        </span>
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
        if (data.status !== 'ok' || !data.items?.length) throw new Error();
        setState({ status: 'success', posts: data.items.slice(0, 5) });
      })
      .catch(() => setState({ status: 'error' }));
  }, []);

  if (state.status === 'loading') return <PostSkeleton />;

  if (state.status === 'error') {
    return (
      <p className="text-slate-500 text-sm">
        Couldn't load articles.{' '}
        <a
          href="https://medium.com/@onurcakmak"
          target="_blank"
          rel="noopener"
          className="text-[var(--color-accent)] hover:underline"
        >
          Read on Medium →
        </a>
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {state.posts.map((post) => (
        <PostCard key={post.link} post={post} />
      ))}
    </div>
  );
}
