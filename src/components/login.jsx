import PropTypes from "prop-types";
import Modal from "./ui/modal";

function Login({ closeModal }) {
  return (
    <>
      <Modal style={{ width: 600 }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Ingresar</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">Formulario acá</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              Cerrar
            </button>
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Login;

Login.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
