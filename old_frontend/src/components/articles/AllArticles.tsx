import ArticleCard from "@components/articles/ArticleCard";
import { Article, Tag } from "@lib/global";
import { getDataFromApi } from "@lib/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";
import ArticlePagination from "./ArticlePagination";

const PAGE_SIZE = 6;

type AllArticlesProps = {
  tags: Tag[];
};

export default function AllArticles({ tags }: AllArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getArticles(page, selectedTag).then((info) => {
      setArticles(info.articles);
      setTotalPages(info.totalPages);
      setLoading(false);
    });
  }, [page, selectedTag]);

  const updateTag = (tag: string) => {
    setSelectedTag(tag);
    setPage(1);
  };

  return (
    <div className="columns is-multiline">
      <div className="column is-full">
        <div className="buttons">
          <button
            className={clsx(
              "button is-small",
              selectedTag === "" && "is-primary"
            )}
            onClick={() => updateTag("")}
          >
            All Articles
          </button>
          {tags.map(({ name }) => (
            <button
              key={name}
              className={clsx(
                "button is-small",
                selectedTag === name && "is-primary"
              )}
              onClick={() => updateTag(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      {articles.map((article) => (
        <div key={article.slug} className="column is-4-desktop is-half-tablet">
          <ArticleCard article={article} />
        </div>
      ))}
      {!loading && articles.length === 0 && (
        <div className="column is-full">
          <p className="title is-4 has-text-centered">
            Sorry, there are no articles available in the {selectedTag}
            &nbsp;category.
          </p>
          <p className="subtitle is-6 has-text-centered">
            Please try again later.
          </p>
        </div>
      )}
      <div className="column is-full">
        <ArticlePagination
          current={page}
          total={totalPages}
          onPageSelect={(newPage) => {
            setPage(newPage);
            window.scroll(0, 0);
          }}
        />
      </div>
    </div>
  );
}

async function getArticles(page?: number, tag?: string) {
  const league = /college|pro/i.test(tag.toLowerCase())
    ? tag.toLowerCase()
    : null;

  const paging = `_limit=${PAGE_SIZE}&_start=${
    page ? (page - 1) * PAGE_SIZE : 0
  }&_sort=published_at:DESC`;
  const filters = league ? `&league=${league}` : tag ? `&tags.name=${tag}` : "";

  const articles = await getDataFromApi<Array<Article>>(
    `${import.meta.env.PUBLIC_CMS_URL}/articles?${paging}${filters}`
  );

  const total = await getDataFromApi<number>(
    `${import.meta.env.PUBLIC_CMS_URL}/articles/count?${paging}${filters}`
  );
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return { articles, totalPages };
}
