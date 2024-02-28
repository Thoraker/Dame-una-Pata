import Login from "../components/login-form";
import Register from "../components/register-form";
import Card from "../components/ui/card";

function Auth() {
  const cardAttributes = {
    title: "Identifícate o crea tu usuario",
  };

  return (
    <>
      <Card title={cardAttributes.title}>
        <Register />
      </Card>

      <Card title={cardAttributes.title}>
        <Login />
      </Card>
    </>
  );
}

export default Auth;
