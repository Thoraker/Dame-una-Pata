import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Card({ children, cardProps }) {
  return (
    <>
      <div className="card">
        <div className="card-header text-center">
          <h5 className="card-title">{cardProps.title}</h5>
        </div>
        <div className="card-body">
          {cardProps.img && (
            <img
              src={cardProps.img.url}
              className="card-img-top"
              alt={cardProps.img.name}
            />
          )}
          <div className="card-text">{children}</div>
          {cardProps.link && <Link to={cardProps.link}>Go somewhere</Link>}
        </div>
      </div>
    </>
  );
}

export default Card;

Card.propTypes = {
  children: PropTypes.node,
  cardProps: PropTypes.object,
  img: PropTypes.object,
  name: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string,
};
