import Login from "../components/login-form";
import Register from "../components/register-form";

function Auth() {
  return (
    <>
      <div className="card m-5">
        <div className="row">
          <div className="col m-3">
            <Login />
          </div>
          <div className="vr"></div>
          <div className="col m-3">
            <Register />
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
