import { useContext, useEffect } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Menus = () => {
  const { menus } = useContext(AppContext);

  const sampleMenuImageUrl =
    "https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/Spicy%20seasoned%20seafood%20noodles.png";

  return (
    <Layout title="Menus">
      <Box sx={{ ml: 3, mt: 5, display: "flex" }}>
        {menus.map((menu) => {
          return (
            <Card sx={{ maxWidth: 345, mr: 5 }} key={menu.id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={sampleMenuImageUrl}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {menu.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </Layout>
  );
};

export default Menus;
