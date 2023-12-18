import Markdown from "react-markdown";
import news from "./data/news.md";

function News() {
  return (
    <>
      <Markdown>{news}</Markdown>
    </>
  );
}

export default News;
