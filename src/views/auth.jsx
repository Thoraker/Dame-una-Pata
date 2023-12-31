import Login from "../components/login-form";
import Register from "../components/register-form";

function Auth() {
  return (
    <>
      <div className="card m-5">
        <div className="row">
          <div className="col m-5">
            <Login />
          </div>
          <div className="vr p-0"></div>
          <div className="col m-5">
            <Register />
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
