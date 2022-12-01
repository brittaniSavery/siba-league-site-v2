import { LEAGUE } from "@content/constants";
import type { Article } from "@lib/types";
import clsx from "clsx";
import { lowerCase } from "lodash-es";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

type ArticlesTableProps = {
  articles: Article[];
  tags: string[];
};

export default function ArticlesTable({ articles, tags }: ArticlesTableProps) {
  const [activeTag, setActiveTag] = useState("all");
  const [currentArticles, setCurrentArticles] = useState<Article[]>(articles);

  useEffect(() => {
    const lowerCaseActiveTag = lowerCase(activeTag);

    switch (lowerCaseActiveTag) {
      case "all":
        setCurrentArticles(articles);
        break;
      case LEAGUE.college:
      case LEAGUE.pro: {
        const articlesByLeague = articles.filter(
          (article) => article.league === lowerCaseActiveTag
        );
        setCurrentArticles(articlesByLeague);
        break;
      }
      default: {
        const articlesByTag = articles.filter((article) =>
          article.tags.data.some((tag) => tag.attributes.name === activeTag)
        );
        setCurrentArticles(articlesByTag);
      }
    }
  }, [activeTag]);

  return (
    <>
      <div className="tags are-medium">
        <a
          className={clsx("tag", activeTag === "all" && "is-primary")}
          onClick={() => setActiveTag("all")}
        >
          All Articles
        </a>
        {tags.map((tag) => (
          <a
            key={tag}
            className={clsx("tag", activeTag === tag && "is-primary")}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </a>
        ))}
      </div>
      <div className="columns is-multiline">
        {currentArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </>
  );
}
