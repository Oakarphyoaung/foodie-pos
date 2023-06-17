import { useContext, useState } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { config } from "../config/config";

const Locations = () => {
  const { locations, fetchData, company } = useContext(AppContext);

  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: company?.id,
  });
  const [updateLocation, setUpdateLocation] = useState({
    id: null,
    name: "",
    address: "",
    companyId: company?.id,
  });

  const accessToken = localStorage.getItem("accessToken");

  const createNewLocation = async () => {
    await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });

    fetchData();
    setNewLocation({ name: "", address: "", companyId: company?.id });
  };
  const updateLocationHandle = async (location: any) => {
    const locationsid = location.id;
    setUpdateLocation({
      ...updateLocation,
      id: locationsid,
      companyId: location.companies_id,
    });
    const response = await fetch(`${config.apiBaseUrl}/locations`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateLocation),
    });

    fetchData();
    setNewLocation({ name: "", address: "", companyId: company?.id });
    console.log(response.json);
  };

  return (
    <Layout title="Locations">
      <Box sx={{ ml: 3, mt: 5 }}>
        {locations.map((location, index) => {
          return (
            <Box
              sx={{ display: "flex", alignItems: "center", mb: 3 }}
              key={location.id}
            >
              <Typography variant="h5" sx={{ mr: 3 }}>
                {index + 1}.
              </Typography>
              <TextField
                defaultValue={location.name}
                sx={{ mr: 3 }}
                onChange={(evt) =>
                  setUpdateLocation({
                    ...updateLocation,
                    name: evt.target.value,
                  })
                }
              />
              <TextField
                defaultValue={location.address}
                sx={{ mr: 3 }}
                onChange={(evt) =>
                  setUpdateLocation({
                    ...updateLocation,
                    address: evt.target.value,
                  })
                }
              />
              <Button
                variant="contained"
                onClick={() => {
                  updateLocationHandle(location);
                }}
              >
                Update
              </Button>
            </Box>
          );
        })}
        <Box sx={{ ml: 5, display: "flex", alignItems: "center" }}>
          <TextField
            value={newLocation.name}
            sx={{ mr: 3 }}
            onChange={(evt) =>
              setNewLocation({ ...newLocation, name: evt.target.value })
            }
          />
          <TextField
            value={newLocation.address}
            sx={{ mr: 3 }}
            onChange={(evt) =>
              setNewLocation({ ...newLocation, address: evt.target.value })
            }
          />
          <Button variant="contained" onClick={createNewLocation}>
            Create
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default Locations;
