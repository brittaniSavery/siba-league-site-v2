import clsx from "clsx";

type ArticlePaginationProps = {
  current: number;
  total: number;
  onPageSelect(newPage: number): void;
};

export default function ArticlePagination({
  current,
  total,
  onPageSelect,
}: ArticlePaginationProps) {
  const pages = [];

  if (total === 0) {
    return;
  }

  for (let i = 1; i <= total; i++) {
    pages.push(
      <li key={`article-pagination-${i}`}>
        <a
          className={clsx("pagination-link", current === i && "is-current")}
          aria-label={`Goto page ${i}"`}
          onClick={() => onPageSelect(i)}
        >
          {i}
        </a>
      </li>
    );
  }

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      {current !== 1 && (
        <a
          className="pagination-previous"
          onClick={() => onPageSelect(current - 1)}
        >
          Previous
        </a>
      )}
      {current !== total && (
        <a
          className="pagination-next"
          onClick={() => onPageSelect(current + 1)}
        >
          Next page
        </a>
      )}
      <ul className="pagination-list">{pages}</ul>
    </nav>
  );
}
