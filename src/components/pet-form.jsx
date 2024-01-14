import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyTextInput from "./formik-ui/text-input";
import MyCheckbox from "./formik-ui/check-box";
import Card from "./ui/card";

function PetForm() {
  const petCardProps = {
    title: "Tu Mascota",
  };
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          specie: "",
          age: "",
          size: "",
          forAdoption: true,
        }}
        validationSchema={Yup.object({
          petName: Yup.string()
            .min(3, "Debe tener 3 o mas caracteres")
            .max(50, "Debe tener menos de 50 caracteres")
            .required("Obligatorio"),
          specie: Yup.string()
            .min(3, "Debe tener 3 o mas caracteres")
            .max(50, "Debe tener menos de 50 caracteres")
            .required("Obligatorio"),
          age: Yup.string()
            .min(3, "Debe tener 3 o mas caracteres")
            .max(50, "Debe tener menos de 50 caracteres")
            .required("Obligatorio"),
          size: Yup.string()
            .min(3, "Debe tener 3 o mas caracteres")
            .max(50, "Debe tener menos de 50 caracteres")
            .required("Obligatorio"),
          forAdoption: Yup.boolean(),
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
          <Card content={petCardProps}>
            <MyTextInput
              label="Nombre de la Mascota"
              name="petName"
              type="text"
              placeholder="Mi Mascota"
            />
            <MyTextInput
              label="Especie"
              name="specie"
              type="text"
              placeholder="Perro"
            />
            <MyTextInput
              label="Edad"
              name="age"
              type="text"
              placeholder="Edad"
            />
            <MyTextInput
              label="Tamaño"
              name="size"
              type="text"
              placeholder="Mediano"
            />
            <MyCheckbox name="forAdoption">Disponible para adopción</MyCheckbox>
            <div className="text-end">
              <button type="submit" className="btn btn-primary me-1 w-25">
                Enviar
              </button>
              <button type="button" className="btn btn-secondary ms-1 w-25">
                Cerrar
              </button>
            </div>
          </Card>
        </Form>
      </Formik>
    </>
  );
}

export default PetForm;
