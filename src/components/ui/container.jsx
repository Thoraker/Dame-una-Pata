import PropTypes from "prop-types";

function Container({ children, containerClasses, ...props }) {
  return (
    <div className={`container-xxl ${containerClasses}`} {...props}>
      {children}
    </div>
  );
}

export default Container;

Container.propTypes = {
  children: PropTypes.node.isRequired,
  containerClasses: PropTypes.string,
};
