import PropTypes from "prop-types";

function Modal({ children, className, ...props }) {
  return (
    <>
      <div className="fixed-top d-block vh-100 vw-100 bg-dark bg-opacity-50 modal">
        <div className={`mt-5 mx-auto ${className}`} {...props}>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;

Modal.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
