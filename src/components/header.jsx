import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow rounded-bottom">
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
        <div className="col d-flex text-center" id="logo">
          <Link
            className="navbar-brand fst-italic m-3 mx-auto lh-1 text-wrap text-danger"
            to="/"
          >
            <div className="flex-column">
              <div className="fs-1 fw-bold">Dame</div>
              <div className="fs-3">una Pata</div>
            </div>
          </Link>
        </div>
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <ul className="navbar-nav mb-lg-0 nav-justified ">
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Regístrate
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/adoption" className="nav-link">
                Adopción
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/foundations" className="nav-link">
                Amigos
              </Link>
            </li>
            <li className="nav-item"></li>
          </ul>
        </div>
        <div className="col d-flex justify-content-end me-3">
          {state.store.usuario.user !== "" ? (
            <UserDropdown />
          ) : (
            <NoUserDropdown />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
