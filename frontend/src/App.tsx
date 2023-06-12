// import React, { useEffect } from "react";

// import "./App.css";

// import { Box, Typography } from "@mui/material";
// import Layout from "./components/Layout";
// import { Navigate } from "react-router-dom";

// function App() {
//   const accessToken = localStorage.getItem("accessToken");

//   useEffect(() => {
//     fetchData();
//   }, []);
//   const fetchData = async () => {
//     const response = await fetch("http://localhost:5000/menus", {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     if (!accessToken) return <Navigate to={"/login"} />;
//   };
//   return (
//     <Layout>
//       <div className="App">
//         <Box sx={{ mt: 5 }}>
//           <Typography variant="h3">Welcome this is Foodie Pose </Typography>
//         </Box>
//       </div>
//     </Layout>
//   );
// }

// export default App;

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function App() {
  // const accessToken = localStorage.getItem("accessToken");

  // useEffect(() => {
  //   fetchData();
  // }, []);
  // const fetchData = async () => {
  //   const response = await fetch("http://localhost:5000/menus", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   if (!accessToken) return <Navigate to={"/login"} />;
  // };
  return (
    <Layout title="Orders">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}

export default App;
