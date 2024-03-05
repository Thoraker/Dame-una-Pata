import Login from "../components/login-form";
import Register from "../components/register-form";
import Card from "../components/ui/card";

function Auth() {
  const cardAttributes = {
    title: "Identifícate o crea tu usuario",
  };

  return (
    <div className="row m-3 gx-5">
      <Card title={cardAttributes.title} cardClass={"col"}>
        <Register />
      </Card>
      <Card title={cardAttributes.title} cardClass={"col"}>
        <Login />
      </Card>
    </div>
  );
}

export default Auth;
