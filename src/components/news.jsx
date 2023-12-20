import Markdown from "react-markdown";
import news from "./data/news.md"; // Cambiar para actualizar la noticia en el home page

function News() {
  return (
    <>
      <Markdown>{news}</Markdown>
    </>
  );
}

export default News;
