// Dependencias
import { Form, Formik } from "formik";
import * as Yup from "yup";

// Componentes
import MyTextInput from "./formik-ui/text-input";
import MySelect from "./formik-ui/select";

// Importación de variables
import avatar from "./data/avatars.json";

function Register() {
  return (
    <>
      <Formik
        initialValues={{
          userName: "",
          password: "",
          email: "",
          firstName: "",
          lastName: "",
          avatar:
            "https://res.cloudinary.com/dqehz6slh/image/upload/v1689374344/avm3mcl5uxg74y3jkcdu.png",
        }}
        validationSchema={Yup.object({
          userName: Yup.string()
            .min(3, "Debe tener 3 o mas caracteres")
            .max(50, "Debe tener menos de 50 caracteres")
            .required("Required"),
          password: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          firstName: Yup.string()
            .min(3, "Debe tener 3 o mas caracteres")
            .max(50, "Debe tener menos de 50 caracteres")
            .required("Required"),
          lastName: Yup.string()
            .min(3, "Debe tener 3 o mas caracteres")
            .max(50, "Debe tener menos de 50 caracteres")
            .required("Required"),
          avatar: Yup.string().oneOf(avatar).required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log("submit");
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values }) => {
          console.log(values);
          return (
            <Form>
              <div className="card">
                <div className="card-header text-center">Crea tu Cuenta</div>
                <div className="card-body">
                  <MyTextInput
                    label="Nombre de Usuario"
                    name="userName"
                    type="text"
                    placeholder="MiUsuario"
                  />
                  <MyTextInput
                    label="Correo"
                    name="email"
                    type="email"
                    placeholder="jane@formik.com"
                  />
                  <MyTextInput
                    label="Contraseña"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                  />
                  <MyTextInput
                    label="Nombre"
                    name="firstName"
                    type="text"
                    placeholder="Nombre"
                  />
                  <MyTextInput
                    label="Apellido"
                    name="lastName"
                    type="text"
                    placeholder="Apellido"
                  />
                  <MySelect label="Avatar" name="avatar">
                    <option value="">Selecciona un avatar</option>
                    {avatar.map((avatar, index) => (
                      <option key={avatar} value={avatar}>
                        {index + 1}
                      </option>
                    ))}
                  </MySelect>
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
          );
        }}
      </Formik>
    </>
  );
}

export default Register;
