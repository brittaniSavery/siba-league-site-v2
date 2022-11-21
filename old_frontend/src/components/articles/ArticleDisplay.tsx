import { Article } from "@lib/global";
import ReactMarkdown from "react-markdown";

type ArticleDisplayProps = {
  article: Article;
};

export default function ArticleDisplay({ article }: ArticleDisplayProps) {
  const { content } = article;

  return (
    <article className="content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
