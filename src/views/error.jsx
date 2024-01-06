import { Link, useRouteError } from "react-router-dom";
import Container from "../components/ui/container";
import Card from "../components/ui/card";

function Error() {
  const error = useRouteError();
  const cardProps = {
    class: "mx-5 mt-3",
    title: "Oh ohh...",
    img: {
      url: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NjEyMzZ8MHwxfHNlYXJjaHwxfHxwdXBweXxlbnwwfHx8fDE2ODY2NzYyNjd8MA&ixlib=rb-4.0.3&q=80&w=400",
      name: "Cachorro",
    },
    link: {
      title: "Inicio",
      to: "/",
    },
  };

  return (
    <Container>
      <Card content={cardProps}>
        Ha ocurrido un error inesperado pero no te preocupes aquí hay un
        cachorro
        <p>{error.statusText || error.message}</p>
        <Link to="/" className="btn btn-primary">
          Volver
        </Link>
      </Card>
    </Container>
  );
}

export default Error;
