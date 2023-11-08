import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-center bg-light text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <Link to="" className="me-4 text-reset">
            <i className="bi bi-facebook"></i>
          </Link>
          <Link to="" className="me-4 text-reset">
            <i className="bi bi-twitter-x"></i>
          </Link>

          <Link to="" className="me-4 text-reset">
            <i className="bi bi-google"></i>
          </Link>
          <Link to="" className="me-4 text-reset">
            <i className="bi bi-instagram"></i>
          </Link>
          <Link to="" className="me-4 text-reset">
            <i className="bi bi-linkedin"></i>
          </Link>
          <Link to="" className="me-4 text-reset">
            <i className="bi bi-github"></i>
          </Link>
        </div>
      </section>

      <section className="">
        <div className="text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-3 col-lg-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="bi bi-house-heart mx-3"></i>
                Dame una Pata
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>

            <div className="col-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" className="text-reset">
                  Angular
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Vue
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Laravel
                </a>
              </p>
            </div>

            <div className="col-3 col-lg-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </div>

            <div className="col-4 col-lg-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                {/* <MDBIcon icon="home" className="me-2" /> */}
                New York, NY 10012, US
              </p>
              <p>
                {/* <MDBIcon icon="envelope" className="me-3" /> */}
                info@example.com
              </p>
              <p>
                {/* <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88 */}
              </p>
              <p>
                {/* <MDBIcon icon="print" className="me-3" /> + 01 234 567 89 */}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2021 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
