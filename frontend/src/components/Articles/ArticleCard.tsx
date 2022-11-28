import type { Article } from "@lib/types";

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const tags = article.tags.data.map((tag) => tag.attributes.name);
  return (
    <div className="column is-3-widescreen is-4-desktop is-half-tablet has-text-centered">
      <div className="card is-shadowless">
        <div className="card-image">
          <img src="https://via.placeholder.com/150" />
        </div>
        <div className="card-footer">
          <div className="tags card-footer-item">
            {tags.map((tag) => (
              <div key={tag} className="tag">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
