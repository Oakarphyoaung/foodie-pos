import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const login = async () => {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const responseData = await response.json();
      const accessToken = responseData.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    }
  };
  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 5 }}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          sx={{ my: 4 }}
          onChange={(evt) => setUser({ ...user, email: evt.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(evt) => setUser({ ...user, password: evt.target.value })}
        />
        <Button sx={{ mt: 4 }} onClick={login} variant="contained">
          Login
        </Button>
      </Box>
    </Layout>
  );
};

export default Login;
