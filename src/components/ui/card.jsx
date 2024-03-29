import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Render the bootstrap card component
 * @param children React element to render in the card`s body
 * @param classes Additional card`s classes
 * @param title Card`s title
 * @param img Card`s image
 * @param link React router link object { to, tittle }
 * @param props
 * @returns
 */
function Card({ children, classes, title, img, link, ...props }) {
  return (
    <div className={`card ${classes}`} {...props}>
      {img && <img src={img.url} className="card-img-top" alt={img.name} />}
      <div className="card-body">
        {title && <div className="card-title">{title}</div>}
        <div className="card-text">{children}</div>
        {link && <Link to={link.to}>{link.title}</Link>}
      </div>
    </div>
  );
}

export default Card;

Card.propTypes = {
  children: PropTypes.node,
  props: PropTypes.object,
  classes: PropTypes.string,
  img: PropTypes.object,
  name: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.object,
  content: PropTypes.object,
};
