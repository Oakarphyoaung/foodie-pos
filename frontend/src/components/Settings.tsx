import React, { useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";

const Settings = () => {
  const { locations, company } = useContext(AppContext);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");

  useEffect(() => {
    if (locations.length) {
    }
    const locationIdFromLocalStorage =
      localStorage.getItem("selectedLocationId");
    if (locationIdFromLocalStorage) {
      setSelectedLocationId(locationIdFromLocalStorage);
    } else {
      const firstLocationId = String(locations[0].id);
      setSelectedLocationId(firstLocationId);
      localStorage.setItem("selectedLocationId", firstLocationId);
    }
  }, [locations]);

  console.log(selectedLocationId);
  const handleChange = (event: SelectChangeEvent) => {
    const locationId = event.target.value;
    setSelectedLocationId(locationId);
    localStorage.setItem("selectedLocationId", event.target.value);
  };

  return (
    <Layout>
      <Box sx={{ p: 3, width: "300px" }}>
        <TextField defaultValue={company?.name} />
        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Locations</InputLabel>
            <Select
              //@ts-ignore
              value={selectedLocationId}
              label="Locations"
              onChange={handleChange}
            >
              {locations.map((locations) => {
                return (
                  <MenuItem value={locations.id} key={locations.id}>
                    {locations.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Layout>
  );
};

export default Settings;
