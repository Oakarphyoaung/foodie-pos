import { createContext, useEffect, useState } from "react";
import { config } from "../config/config";
import {
  Addon,
  AddonCategory,
  Company,
  Menus,
  MenuCategory,
  MenuLocation,
  Location,
} from "../types/Types";

interface ContextTypes {
  menus: Menus[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  menuLocations: MenuLocation[];
  company: Company | null;
  updateData: (value: any) => void;
  fetchData: () => void;
}

const defaultContext: ContextTypes = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menuLocations: [],
  company: null,
  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext(defaultContext);

const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaultContext);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);
  const fetchData = async () => {
    console.log("config", config);
    console.log("accessToken", accessToken);

    const response = await fetch(`${config.apiBaseUrl}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("response", response);
    const responseJon = await response.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuLocations,
      company,
    } = responseJon;
    updateData({
      ...data,
      menus: menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuLocations,
      company,
    });
  };

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </AppContext.Provider>
  );
};
export default AppProvider;
