import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Card({ children, content, ...props }) {
  return (
    <>
      <div className={`card ${content.class}`} {...props}>
        <div className="card-header">
          <div className="card-title">{content.title}</div>
        </div>
        <div className="card-body">
          {content.img && (
            <img
              src={content.img.url}
              className="card-img-top"
              alt={content.img.name}
            />
          )}
          <div className="card-text">{children}</div>
          {content.link && (
            <Link to={content.link.to}>{content.link.tittle}</Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;

Card.propTypes = {
  children: PropTypes.node,
  props: PropTypes.object,
  class: PropTypes.string,
  img: PropTypes.object,
  name: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.object,
  content: PropTypes.object,
};
