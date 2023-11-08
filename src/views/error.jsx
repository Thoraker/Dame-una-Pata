import { Link, useRouteError } from "react-router-dom";
import Container from "../components/container";

function Error() {
  const error = useRouteError();
  return (
    <Container>
      <div className="card mx-5 px-5 mt-3">
        <div className="card-body">
          <h2 className="card-title">Oh ohh...</h2>
          <p className="card-text">
            Ha ocurrido un error inesperado pero no te preocupes aquí hay un
            cachorro
          </p>
          <img
            src="https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NjEyMzZ8MHwxfHNlYXJjaHwxfHxwdXBweXxlbnwwfHx8fDE2ODY2NzYyNjd8MA&ixlib=rb-4.0.3&q=80&w=400"
            className="card-img d-block mx-auto"
            alt="Cachorro"
          />
          <p>{error.statusText || error.message}</p>
          <Link to="/" className="btn btn-primary">
            Volver
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Error;
