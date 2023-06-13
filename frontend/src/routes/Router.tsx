import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import AddonCategories from "../components/AddonCategories";
import Addons from "../components/Addons";
import Locations from "../components/Locations";
import MenuCategories from "../components/MenuCategories";
import Menus from "../components/Menus";
import Register from "../components/Register";
import Settings from "../components/Settings";
import Login from "../components/Login";
import Logout from "../components/Logout";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" Component={App} />
          <Route path="/orders" Component={App} />
          <Route path="/menus" Component={Menus} />
          <Route path="/menu-categories" Component={MenuCategories} />
          <Route path="/addons" Component={Addons} />
          <Route path="/addon-categories" Component={AddonCategories} />
          <Route path="/locations" Component={Locations} />
          <Route path="/settings" Component={Settings} />
        </Route>
        <Route path="/login" Component={Login} />
        <Route path="/logout" Component={Logout} />
        <Route path="/register" Component={Register} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
