import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import { AppContext } from "../contexts/AppContext";

const MenuCategories = () => {
  const contextData = useContext(AppContext);
  const { updateData, ...data } = contextData;

  const accessToken = localStorage.getItem("accessToken");
  console.log("accessToken:", accessToken);

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
    console.log("contextData", contextData);
  };

  return (
    <div>
      <NavBar />
      <h1>MenuCategories Page</h1>
    </div>
  );
};

export default MenuCategories;
