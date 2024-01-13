// Dependencias
import { Form, Formik } from "formik";
import * as Yup from "yup";

// Componentes
import MyTextInput from "./formik-ui/text-input";
import MySelect from "./formik-ui/select";

// Importación de variables
import avatar from "./data/avatars.json";
import Card from "./ui/card";

function Register() {
  const cardAttributes = {
    title: "Crea tu cuenta",
  };

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
          avatar: Yup.string()
            .oneOf(avatar, "Por favor selecciona un avatar")
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
        {({ values }) => {
          console.log(values);
          return (
            <Form>
              <Card title={cardAttributes.title}>
                <div className="row">
                  <div className="col-md-3 text-center">
                    <img
                      src={
                        values.avatar ||
                        "https://res.cloudinary.com/dqehz6slh/image/upload/v1689374344/avm3mcl5uxg74y3jkcdu.png"
                      }
                      className="img-fluid"
                      alt={
                        values.avatar ||
                        "https://res.cloudinary.com/dqehz6slh/image/upload/v1689374344/avm3mcl5uxg74y3jkcdu.png"
                      }
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
                  <div className="col-md-9">
                    <MyTextInput
                      label="Nombre de Usuario"
                      name="userName"
                      type="text"
                      placeholder="Usuario"
                    />
                    <MyTextInput
                      label="Contraseña"
                      name="password"
                      type="password"
                      placeholder="Contraseña"
                    />
                    <MyTextInput
                      label="Correo"
                      name="email"
                      type="email"
                      placeholder="Correo"
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
                  </div>
                  <div className="text-end">
                    <button type="submit" className="btn btn-primary me-1 w-25">
                      Enviar
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary ms-1 w-25"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default Register;
