import Login from "../components/login-form";
import Register from "../components/register-form";
import Card from "../components/ui/card";
import Container from "../components/ui/container";

function Auth() {
  const registerCardAttributes = {
    title: "Crea tu cuenta de usuario",
  };

  const loginCardAttributes = {
    title: "Ingresa a tu cuenta de usuario",
  };

  return (
    <Container containerClasses="my-3">
      <Card classes="border border-1 rounded m-3 p-3">
        <div className="row">
          <div className="col-2">
            <ul className="nav flex-column nav-pills" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active w-100"
                  id="register-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#register-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="register-tab-pane"
                  aria-selected="true"
                >
                  Regístrate
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link w-100"
                  id="login-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#login-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="login-tab-pane"
                  aria-selected="false"
                >
                  Ingresa
                </button>
              </li>
            </ul>
          </div>
          <div className="col">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="register-tab-pane"
                role="tabpanel"
                aria-labelledby="register-tab"
                tabIndex="0"
              >
                <Card title={registerCardAttributes.title} classes="col">
                  <Register />
                </Card>
              </div>

              <div
                className="tab-pane fade"
                id="login-tab-pane"
                role="tabpanel"
                aria-labelledby="login-tab"
                tabIndex="0"
              >
                <Card title={loginCardAttributes.title} classes="col">
                  <Login />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default Auth;
