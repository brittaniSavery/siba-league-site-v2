import { Article } from "@lib/global";
import { generateArticleTags, getFormattedDate } from "@lib/utils";

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const { title, image, slug, summary, published_at, author } = article;

  const tags = generateArticleTags(article);

  return (
    <div className="card is-shadowless">
      <div className="card-image">
        <figure className="image is-square">
          <img src={image.url} alt={image.alternativeText} />
        </figure>
      </div>
      <div className="card-content">
        <h2 className="title is-4 mb-0">
          <a href={`/news/article/${slug}`}>{title}</a>
        </h2>
        <p className="mb-5">
          {author.name} &middot; {getFormattedDate(published_at)}
        </p>
        <p className="subtitle is-6">{summary}</p>
      </div>
      <div className="card-footer">
        <div className="tags card-footer-item">
          {tags.map(({ name }) => (
            <span key={`${slug}-${name}`} className="tag is-primary">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
