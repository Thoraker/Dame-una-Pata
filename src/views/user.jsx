import { useStore } from "../store/data-storage";
import Container from "../components/ui/container";
import Card from "../components/ui/card";
import PetForm from "../components/pet-form";
import AddressForm from "../components/address-form";
import Register from "../components/register-form";

function User() {
  const user = useStore((state) => state.user);
  const userCardAttributes = {
    title: user.name,
  };

  return (
    <Container containerClasses="my-3">
      <Card title={userCardAttributes.title}>
        <div className="row">
          <div className="col-2">
            <ul className="nav flex-column nav-pills" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active w-100"
                  id="info-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#info-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="info-tab-pane"
                  aria-selected="true"
                >
                  Mis Datos
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link w-100"
                  id="pets-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#pets-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="pets-tab-pane"
                  aria-selected="false"
                >
                  Mis Mascotas
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link w-100"
                  id="address-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#address-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="address-tab-pane"
                  aria-selected="false"
                >
                  Mis Direcciones
                </button>
              </li>
            </ul>
          </div>
          <div className="col">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="info-tab-pane"
                role="tabpanel"
                aria-labelledby="info-tab"
                tabIndex="0"
              >
                <Card classes="col">
                  <fieldset disabled>
                    <Register />
                  </fieldset>
                </Card>
              </div>
              <div
                className="tab-pane fade"
                id="pets-tab-pane"
                role="tabpanel"
                aria-labelledby="pets-tab"
                tabIndex="0"
              >
                <Card classes="col">
                  <PetForm />
                </Card>
              </div>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade"
                  id="address-tab-pane"
                  role="tabpanel"
                  aria-labelledby="address-tab"
                  tabIndex="0"
                >
                  <Card classes="col">
                    <AddressForm />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default User;
