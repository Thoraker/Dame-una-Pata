import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyTextInput from "./formik-ui/text-input";
import MySelect from "./formik-ui/select";
import regionCommune from "./data/region-commune.json";
import MyCheckbox from "./formik-ui/check-box";
import Card from "./ui/card";

function Address() {
  const addressProps = {
    tittle: "Tu Dirección",
  };
  return (
    <>
      <Formik
        initialValues= {{
          street: "",
          buildingNumber: "",
          departmentNumber: "",
          region: "",
          commune: "",
          mainHouse: true,
        }}
        validationSchema= {
          Yup.object({
            street: Yup.string()
              .min(3, "Debe tener 3 o mas caracteres")
              .max(100, "Debe tener menos de 100 caracteres")
              .required("Obligatorio"),
            buildingNumber: Yup.string()
              .max(10, "Debe tener menos de 10 caracteres")
              .required("Obligatorio"),
            departmentNumber: Yup.string().max(
              10,
              "Debe tener menos de 10 caracteres"
            ),
            region: Yup.string()
              .max(10, "Debe tener menos de 100 caracteres")
              .required("Obligatorio"),
            commune: Yup.string()
              .max(100, "Debe tener menos de 100 caracteres")
              .required("Obligatorio"),
            mainHouse: Yup.boolean(),
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
          return (
            <Form>
              <Card content={addressProps}>
                <MyTextInput
                  label="Calle"
                  name="street"
                  type="text"
                  placeholder="Calle"
                />
                <MyTextInput
                  label="Numero"
                  name="buildingNumber"
                  type="text"
                  placeholder="000"
                />
                <MyTextInput
                  label="Departamento"
                  name="departmentNumber"
                  type="text"
                  placeholder="000"
                />
                <MySelect label="Región" name="region" id="region">
                  <option value="">Selecciona tu Región</option>
                  {regionCommune.map((reg) => (
                    <option key={reg.region_number} value={reg.region_number}>
                      {reg.region}
                    </option>
                  ))}
                </MySelect>
                <MySelect label="Comuna" name="commune">
                  <option value="">Selecciona tu Comuna</option>
                  {values.region &&
                    regionCommune[parseInt(values.region) - 1].comunas.map(
                      (comuna, index) => {
                        return (
                          <option key={index} value={comuna.code}>
                            {comuna.name}
                          </option>
                        );
                      }
                    )}
                </MySelect>
                <MyCheckbox name="mainHouse">Residencia principal</MyCheckbox>

                <div className="card-footer text-end">
                  <button type="submit" className="btn btn-primary">
                    Enviar
                  </button>
                  <button type="button" className="btn btn-secondary">
                    Cerrar
                  </button>
                </div>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default Address;
