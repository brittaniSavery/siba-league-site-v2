import type { Article } from "@lib/types";
import { getFormattedDate } from "@lib/utils";
import { capitalize } from "lodash-es";
import { micromark } from "micromark";

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const {
    title,
    slug,
    image,
    publishedAt,
    summary,
    tags: strapiTags,
    league,
    author,
  } = article;
  const { url: imgUrl, alternativeText: imgAlt } = image.data.attributes;
  const { name: authorName, picture: authorPic } = author.data.attributes;
  const tags = [
    capitalize(league),
    ...strapiTags.data.map((tag) => tag.attributes.name),
  ];

  return (
    <div className="column is-4-desktop is-half-tablet has-text-centered">
      <div className="card is-shadowless">
        <div className="card-header is-shadowless">
          <a
            className="card-header-title is-justify-content-center title is-4"
            href={`/news/article/${slug}`}
          >
            {title}
          </a>
        </div>
        <div className="card-image">
          <img src={imgUrl} alt={imgAlt} />
        </div>
        <div className="card-content has-text-left">
          <div className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img
                  src={authorPic.data.attributes.url}
                  alt={authorPic.data.attributes.alternativeText}
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{authorName}</p>
              <p className="subtitle is-6">
                Published {getFormattedDate(publishedAt)}
              </p>
            </div>
          </div>
          <div className="content has-text-justified">{summary}</div>
        </div>
        <div className="card-footer">
          <div className="tags card-footer-item">
            {tags.sort().map((tag) => (
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
