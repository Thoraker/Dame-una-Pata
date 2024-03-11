import { Link } from "react-router-dom";
import NoUserDropdown from "./no-user-dropdown";
import UserDropdown from "./user-dropdown";
import { useStore } from "../store/data-storage";

// Para cambiar links del header debe modificar archivos json de carpeta data
import sections from "../components/data/header-sections.json";

// Render del Header
function Header() {
  const user = useStore((state) => state.user);
  console.log(user);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
      <div className="container-fluid justify-content-between">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-flex text-center mx-5" id="logo">
          <Link
            className="navbar-brand fst-italic m-auto lh-1 text-wrap text-success"
            to="/"
          >
            <div className="flex-column">
              <div className="display-5 fw-bold">Dame</div>
              <div className="fs-2 fw-semibold">una Pata</div>
            </div>
          </Link>
        </div>
        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <ul className="col-8 mx-auto navbar-nav mb-lg-0 nav-justified">
            {sections.map(({ name, to }) => (
              <li className="nav-item" key={name}>
                <Link to={to} className="nav-link">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="justify-content-end">
          {user !== undefined ? <UserDropdown /> : <NoUserDropdown />}
        </div>
      </div>
    </nav>
  );
}

export default Header;
