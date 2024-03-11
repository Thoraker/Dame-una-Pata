import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyTextInput from "./formik-ui/text-input";

import { useStore } from "../store/data-storage";
import { useNavigate } from "react-router-dom";

function Login() {
  const login = useStore((state) => state.login);
  const user = useStore((state) => state.user);

  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{ user: "", password: "" }}
        validationSchema={Yup.object({
          user: Yup.string()
            .min(3, "Debe tener 3 o mas caracteres")
            .max(50, "Debe tener menos de 50 caracteres")
            .required("Required"),
          password: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        })}
        onSubmit={(values) => {
          login(values)
            .then(() => navigate("/"))
            .then(() => console.log(user));
        }}
      >
        <Form>
          <MyTextInput
            label="Nombre de Usuario"
            name="user"
            type="text"
            placeholder="Usuario"
          />
          <MyTextInput
            label="Contraseña"
            name="password"
            type="password"
            placeholder="Contraseña"
          />
          <div className="text-end">
            <button type="submit" className="btn btn-primary me-1 w-25">
              Enviar
            </button>
            <button type="close" className="btn btn-secondary ms-1 w-25">
              Cerrar
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default Login;
