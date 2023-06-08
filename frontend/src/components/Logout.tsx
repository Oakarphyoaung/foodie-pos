import { Typography } from "@mui/material";
import React from "react";
import Layout from "./Layout";

const Logout = () => {
  return (
    <Layout>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        You are now logged out
      </Typography>
    </Layout>
  );
};

export default Logout;
