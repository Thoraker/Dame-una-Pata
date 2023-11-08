function Home() {
  return (
    <div
      className="p-5 text-center"
      style={{
        backgroundImage: "url('src/assets/perro_callejero21_9.jpg')",
        height: "400px",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="col-8 d-flex justify-content-center align-items-center h-100">
        <div className="text-white">
          <h1 className="mb-3">Bienvenidos</h1>
          <h4 className="mb-3">Regístrate, adopta y cambia tu vida.</h4>
          <button className="btn btn-outline-light btn-lg">
            Ingresa ahora
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
