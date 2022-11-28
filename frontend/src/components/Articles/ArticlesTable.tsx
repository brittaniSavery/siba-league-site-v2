import type { Article, Tag } from "@lib/types";
import clsx from "clsx";
import { useState } from "react";
import ArticleCard from "./ArticleCard";

type ArticlesTableProps = {
  articles: Article[];
  tags: string[];
};

export default function ArticlesTable({ articles, tags }: ArticlesTableProps) {
  const [activeTag, setActiveTag] = useState("all");
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
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </>
  );
}
