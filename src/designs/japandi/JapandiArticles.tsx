import { SITE } from '../../site.config';
import { articleMetadata, type Article } from '../../lib/articles';
import { hideBrokenImage } from '../../lib/images';
import { useArticles } from '../../lib/useArticles';
import styles from './JapandiArticles.module.css';

const PLACEHOLDER_COUNT = 3;

function ArticleRow({ article }: { article: Article }) {
  return (
    <li>
      <a href={article.link} target="_blank" rel="noopener noreferrer" className={styles.row}>
        <div className={styles.text}>
          <h3 className={styles.title}>{article.title}</h3>
          <p className={styles.description}>{article.description}</p>
          <p className={styles.meta}>{articleMetadata(article).join('  ·  ')}</p>
        </div>
        {article.thumbnail && (
          <img
            src={article.thumbnail}
            alt=""
            className={styles.thumbnail}
            loading="lazy"
            onError={hideBrokenImage}
          />
        )}
      </a>
    </li>
  );
}

export default function JapandiArticles() {
  const state = useArticles();

  if (state.status === 'loading') {
    return (
      <ul className={styles.list} aria-busy="true">
        {Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => (
          <li key={index} className={styles.placeholder} />
        ))}
      </ul>
    );
  }

  return (
    <>
      <ul className={styles.list}>
        {state.articles.map((article) => (
          <ArticleRow key={article.link} article={article} />
        ))}
      </ul>
      {!state.isFeedAvailable && (
        <p className={styles.notice}>
          Couldn't load the latest articles.{' '}
          <a href={SITE.social.medium} target="_blank" rel="noopener noreferrer">
            Read on Medium →
          </a>
        </p>
      )}
    </>
  );
}
