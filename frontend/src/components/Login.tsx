import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
          m: "0 auto",
          mt: 5,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          sx={{ minWidth: "300px" }}
          onChange={(evt) => setUser({ ...user, email: evt.target.value })}
        />
        <TextField
          id="outlined-basic"
          sx={{ minWidth: "300px", my: 2 }}
          label="Password"
          variant="outlined"
          type="password"
          onChange={(evt) => setUser({ ...user, password: evt.target.value })}
        />
        <Button sx={{ mt: 4 }} onClick={login} variant="contained">
          Login
        </Button>
        <Link
          to={"/register"}
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          {" "}
          <Typography variant="body1">New User ? Register Here</Typography>
        </Link>
      </Box>
    </Layout>
  );
};

export default Login;
