import { SITE } from '../../site.config';
import { articleMetadata, type Article } from '../../lib/articles';
import { hideBrokenImage } from '../../lib/images';
import { useArticles } from '../../lib/useArticles';
import styles from './AluminumArticles.module.css';

const PLACEHOLDER_COUNT = 3;

function ArticleCard({ article }: { article: Article }) {
  return (
    <li>
      <a href={article.link} target="_blank" rel="noopener noreferrer" className={styles.card}>
        <div className={styles.media}>
          {article.thumbnail && (
            <img
              src={article.thumbnail}
              alt=""
              className={styles.thumbnail}
              loading="lazy"
              onError={hideBrokenImage}
            />
          )}
        </div>
        <div className={styles.body}>
          <p className={styles.meta}>{articleMetadata(article).join(' · ')}</p>
          <h3 className={styles.title}>{article.title}</h3>
          <p className={styles.description}>{article.description}</p>
        </div>
      </a>
    </li>
  );
}

export default function AluminumArticles() {
  const state = useArticles();

  if (state.status === 'loading') {
    return (
      <ul className={styles.grid} aria-busy="true">
        {Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => (
          <li key={index} className={styles.placeholder} />
        ))}
      </ul>
    );
  }

  return (
    <>
      <ul className={styles.grid}>
        {state.articles.map((article) => (
          <ArticleCard key={article.link} article={article} />
        ))}
      </ul>
      {!state.isFeedAvailable && (
        <p className={styles.notice}>
          Couldn't load the latest articles.{' '}
          <a href={SITE.social.medium} target="_blank" rel="noopener noreferrer">
            Read on Medium ›
          </a>
        </p>
      )}
    </>
  );
}
