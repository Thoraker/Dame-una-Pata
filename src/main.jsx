import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// CSS
import "./index.css";

// Components
import App from "./App.jsx";
import Home from "./views/home.jsx";
import Error from "./views/error.jsx";
import AboutUs from "./views/about-us.jsx";
import Auth from "./views/auth.jsx";
import Adoption from "./views/adoption.jsx";
// import Address from "./components/address-form.jsx";
import CloudinaryUploadWidget from "./components/photo-uploader.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/adoption",
        element: <Adoption />,
      },
      {
        path: "/test",
        element: <CloudinaryUploadWidget />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
