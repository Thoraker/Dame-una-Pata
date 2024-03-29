import PropTypes from "prop-types";

function Modal({ children, modalClasses, ...props }) {
  return (
    <>
      <div className="fixed-top d-block vh-100 vw-100 bg-dark bg-opacity-50 modal">
        <div className={`mt-5 mx-auto ${modalClasses}`} {...props}>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  modalClasses: PropTypes.string,
  props: PropTypes.object,
};
