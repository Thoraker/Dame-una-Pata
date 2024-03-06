import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyTextInput from "./formik-ui/text-input";
import Card from "./ui/card";

import { useStore } from "../store/data-storage";

function Login() {
  const { login } = useStore();

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
          login(values);
        }}
      >
        <Form>
          <Card title="Ingresa a tu cuenta">
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
          </Card>
        </Form>
      </Formik>
    </>
  );
}

export default Login;
