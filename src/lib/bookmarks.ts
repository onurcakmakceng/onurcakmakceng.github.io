import { SITE } from '../site.config';

export type EmbedTheme = 'light' | 'dark';

export function bookmarksEmbedUrl(theme: EmbedTheme): string {
  return `${SITE.bookmarks.embedUrl}/no-header=true&theme=${theme}`;
}

export const BOOKMARKS_EMBED_STYLE = {
  '--bookmarks-expanded-height': `${SITE.bookmarks.expandedEmbedHeightPx}px`,
};
