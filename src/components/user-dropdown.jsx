import { Link } from "react-router-dom";
import { useStoreUser } from "../store/user-data";

const UserDropdown = () => {
  const user = useStoreUser((state) => state.user);
  return (
    <div className="dropdown">
      <button
        className="btn"
        id="userButton"
        type="button"
        data-bs-toggle="dropdown"
      >
        <div className="col">
          <img
            className="img-fluid"
            style={{ width: "auto", height: "55px" }}
            src={user.avatar}
          />
        </div>
      </button>

      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <h5 className="dropdown-header">{user.userName}</h5>
        </li>
        <li>
          <Link className="dropdown-item" to="/user">
            Mis Datos
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/user/pet">
            Mis Mensajes
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a
            href="/"
            onClick={() => alert("Cerrando sesión")}
            className="dropdown-item"
          >
            Cerrar sesión
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
