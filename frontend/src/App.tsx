import React, { useEffect } from "react";

import "./App.css";

import { Box, Typography } from "@mui/material";
import Layout from "./components/Layout";
import { Navigate } from "react-router-dom";

function App() {
  const accessToken = localStorage.getItem("accessToken");
  console.log("accessToken:", accessToken);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/menus", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!accessToken) return <Navigate to={"/login"} />;
  };
  return (
    <Layout>
      <div className="App">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h3">Welcome this is Foodie </Typography>
        </Box>
      </div>
    </Layout>
  );
}

export default App;
