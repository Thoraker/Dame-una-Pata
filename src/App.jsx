import { Outlet } from "react-router-dom";

import Footer from "./components/footer";
import Header from "./components/header";
import Container from "./components/ui/container";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;
