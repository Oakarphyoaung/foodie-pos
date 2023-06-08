import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import { AppContext } from "../contexts/AppContext";

const Menus = () => {
  const contextData = useContext(AppContext);
  const { updateData, ...data } = contextData;

  const accessToken = localStorage.getItem("accessToken");
  console.log("accessToken:", accessToken);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/menus", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const menusFromServer = await response.json();
    updateData({ ...data, menu: menusFromServer });
    console.log("contextData", contextData);
  };
  return (
    <div>
      <NavBar />
      <h1>Menus page</h1>
    </div>
  );
};

export default Menus;
