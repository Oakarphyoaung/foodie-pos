import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Orders from "./components/Orders";
import Menus from "./components/Menus";
import Addons from "./components/Addons";
import AddonCategories from "./components/AddonCategories";
import MenuCategories from "./components/MenuCategories";
import Locations from "./components/Locations";
import Settings from "./components/Settings";
import AppProvider from "./contexts/AppContext";
import Logout from "./components/Logout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/menus",
    element: <Menus />,
  },
  {
    path: "/addons",
    element: <Addons />,
  },
  {
    path: "/addon-categories",
    element: <AddonCategories />,
  },
  {
    path: "/menu-categories",
    element: <MenuCategories />,
  },
  {
    path: "/locations",
    element: <Locations />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AppProvider>
    <RouterProvider router={routes} />
  </AppProvider>
);
