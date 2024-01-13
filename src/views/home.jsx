import News from "../components/news";

function Home() {
  return (
    <>
      <div
        className="my-5 p-5 rounded-4"
        style={{
          backgroundImage: "url('src/assets/perro_callejero21_9.jpg')",
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "75%",
        }}
      >
        <div className="col-6 d-flex d-none d-lg-flex h-100">
          <div className="text-white m-5">
            <h1 className="mb-3">Bienvenidos</h1>
            <h4 className="mb-3">
              Regístrate, adopta y cambia una vida... tu propia vida.
            </h4>
            <button className="btn btn-outline-light btn-lg">
              Ingresa ahora
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex d-inline d-lg-none justify-content-center h-100">
        <div className="m-5">
          <h1 className="mb-3">Bienvenidos</h1>
          <h4 className="mb-3">
            Regístrate, adopta y cambia una vida... tu propia vida.
          </h4>
          <button className="btn btn-outline-dark btn-lg">Ingresa ahora</button>
        </div>
      </div>

      <div className="my-5 p-5 text-center bg-info-subtle border rounded-4">
        <News />
      </div>
    </>
  );
}

export default Home;
