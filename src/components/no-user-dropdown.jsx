import { Link } from "react-router-dom";
import { useState } from "react";

const NoUserDropdown = () => {
  const [        , setShowLogin] = useState(false);

  function handleLogin() {
    setShowLogin(!showLogin);
  }

  return (
    <>
      <div className="dropdown">
        <button
          className="btn"
          id="noUserButton"
          type="button"
          data-bs-toggle="dropdown"
        >
          <div className="row">
            <img
              className="img-fluid"
              style={{ width: "auto", height: "55px" }}
              src="https://res.cloudinary.com/dqehz6slh/image/upload/v1689374344/avm3mcl5uxg74y3jkcdu.png"
            />
          </div>
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <h5 className="dropdown-header">Ingreso</h5>
          </li>
          <li>
            <Link className="dropdown-item" onClick={handleLogin}>
              Ingresa
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/auth">
              Regístrate
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/invited">
              Ingresa como Invitado
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NoUserDropdown;
