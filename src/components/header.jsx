import { Link } from "react-router-dom";
import NoUserDropdown from "./no-user-dropdown";

// Para cambiar links del header debe modificar archivos json de carpeta data
import sections from "../data/header-sections.json";

// Renderización del Header
function Header() {
  return (
    <nav className="navbar pt-0 navbar-expand-lg bg-body-tertiary shadow">
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
            className="navbar-brand fst-italic mx-auto lh-1 text-wrap text-success"
            to="/"
          >
            <div className="flex-column">
              <div className="display-5 fw-bold">Dame</div>
              <div className="fs-2 fw-semibold">una Pata</div>
            </div>
          </Link>
        </div>
        <div
          className="offcanvas offcanvas-start mx-5 px-5"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <ul className="col-6 navbar-nav mb-lg-0 nav-justified">
            {sections.map((item) => (
              <li className="nav-item" key={item.name}>
                <Link to={item.path} className="nav-link">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="justify-content-end">
          <NoUserDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Header;
