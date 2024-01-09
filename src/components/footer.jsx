import { Link } from "react-router-dom";

// Para cambiar links del footer debe modificar archivos json de carpeta data
import socialNetworks from "../components/data/footer-social-network.json";
import sections from "../components/data/footer-sections.json";
import usefulLinks from "../components/data/footer-useful-links.json";

function Footer() {
  return (
    <footer className="text-center bg-light text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Síguenos en nuestras redes sociales:</span>
        </div>
        <div>
          {socialNetworks.map(({ name, icon, to }) => (
            <Link to={to} className="me-4 text-reset" key={name}>
              <i className={icon}></i>
            </Link>
          ))}
        </div>
      </section>

      <section className="">
        <div className="text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-3 col-lg-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="bi bi-house-heart me-3"></i>
                Dame una Pata
              </h6>
              <p>
                Nuestra misión cambiar vidas, darle un hogar a tu mascota, o
                mascotas para tu hogar.
              </p>
            </div>

            <div className="col-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Secciones</h6>
              {sections.map(({ name, to }) => (
                <p key={name}>
                  <Link to={to} className="text-reset">
                    {name}
                  </Link>
                </p>
              ))}
            </div>

            <div className="col-3 col-lg-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Links Útiles</h6>
              {usefulLinks.map(({ name, to }) => (
                <p key={name}>
                  <Link to={to} className="text-reset">
                    {name}
                  </Link>
                </p>
              ))}
            </div>

            <div className="col-4 col-lg-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contactos</h6>
              <p>
                <i className="bi bi-house me-3"></i>
                Santiago, Región Metropolitana, Chile
              </p>
              <p>
                <i className="bi bi-envelope me-3"></i>
                info@example.com
              </p>
              <p>
                <i className="bi bi-phone me-3"></i>+ 56 9 1234 5678
              </p>
              <p>
                <i className="bi bi-printer me-3"></i>+ 56 9 1234 5678
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4 bg-secondary bg-opacity-25">
        © 2023 Copyright: Realizado con
        <a className="text-reset fw-bold ms-1" href="https://getbootstrap.com/">
          Bootstrap
        </a>
      </div>
    </footer>
  );
}

export default Footer;
