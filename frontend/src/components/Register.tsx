import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const register = async () => {
    const responce = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    console.log(await responce.json());
  };
  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 5 }}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          sx={{ minWidth: 300 }}
          onChange={(evt) => setUser({ ...user, name: evt.target.value })}
        />
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
        <Button sx={{ mt: 4 }} variant="contained" onClick={register}>
          Register
        </Button>
        <Link
          to={"/Login"}
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          {" "}
          <Typography variant="body1">
            Already registered? Login here
          </Typography>
        </Link>
      </Box>
    </Layout>
  );
};

export default Register;
