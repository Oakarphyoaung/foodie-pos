import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import { Box, Typography } from "@mui/material";
import Layout from "./components/Layout";

function App() {
  const accessToken = localStorage.getItem("accessToken");
  console.log("accessToken:P", accessToken);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/menus");
    console.log(await response.json());
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
