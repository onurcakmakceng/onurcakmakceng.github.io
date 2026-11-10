import { useEffect, useState } from 'react';
import { loadArticles, type ArticleCollection } from './articles';

export type ArticlesState = { status: 'loading' } | ({ status: 'ready' } & ArticleCollection);

export function useArticles(): ArticlesState {
  const [state, setState] = useState<ArticlesState>({ status: 'loading' });

  useEffect(() => {
    let isActive = true;
    loadArticles().then((collection) => {
      if (isActive) setState({ status: 'ready', ...collection });
    });
    return () => {
      isActive = false;
    };
  }, []);

  return state;
}
