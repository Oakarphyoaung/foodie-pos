import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import { AppContext } from "../contexts/AppContext";
import Layout from "./Layout";

const MenuCategories = () => {
  const contextData = useContext(AppContext);
  const { updateData, ...data } = contextData;

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/menuscategories", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    const menusFromServer = await response.json();
    updateData({ ...data, menuCategories: menusFromServer });
  };

  return (
    <Layout title="MenuCategories">
      <div>
        <h1>Menu Categories Page</h1>
      </div>
    </Layout>
  );
};

export default MenuCategories;
