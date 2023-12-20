import PropTypes from "prop-types";

function Container({ children, ...props }) {
  return (
    <div className="container-xxl" {...props}>
      {children}
    </div>
  );
}

export default Container;

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
