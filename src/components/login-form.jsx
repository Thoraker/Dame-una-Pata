import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyTextInput from "./formik-ui/text-input";

function Login() {
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          userName: Yup.string()
            .min(3, "Debe tener 3 o mas caracteres")
            .max(50, "Debe tener menos de 50 caracteres")
            .required("Required"),
          password: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log("submit");
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <div className="card">
            <div className="card-header">Ingresa a tu cuenta</div>
            <div className="card-body">
              <MyTextInput
                label="Nombre de Usuario"
                name="userName"
                type="text"
                placeholder="MiUsuario"
              />
              <MyTextInput
                label="Contraseña"
                name="password"
                type="password"
                placeholder="Contraseña"
              />
            </div>
            <div className="card-footer text-end">
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
              <button type="button" className="btn btn-secondary">
                Cerrar
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default Login;
