import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const sidebarMenuItems = [
  { id: 1, label: "Orders", icon: <LocalMallIcon />, route: "/orders" },
  { id: 2, label: "Menus", icon: <LocalDiningIcon />, route: "/menus" },
  {
    id: 3,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/menu-categories",
  },
  { id: 4, label: "Addons", icon: <LocalDiningIcon />, route: "/addons" },
  {
    id: 5,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/addon-categories",
  },
  {
    id: 6,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/locations",
  },
  { id: 7, label: "Settings", icon: <SettingsIcon />, route: "/settings" },
];

const NavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const accessToken = localStorage.getItem("accessToken");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderDrawer = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <List>
        {sidebarMenuItems.slice(0, 6).map((icon) => (
          <Link
            to={icon.route}
            key={icon.id}
            style={{ textDecoration: "none", color: "#313131" }}
          >
            <ListItem key={icon.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon.icon}</ListItemIcon>
                <ListItemText primary={icon.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {sidebarMenuItems.slice(-1).map((icon) => (
          <Link
            to={icon.route}
            key={icon.id}
            style={{ textDecoration: "none", color: "#313131" }}
          >
            <ListItem key={icon.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon.icon}</ListItemIcon>
                <ListItemText primary={icon.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            onClick={() => setOpen(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Foodie POS
          </Typography>

          {accessToken ? (
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer", userSelect: "none" }}
              onClick={() => {
                localStorage.removeItem("accessToken");
                navigate("/logout");
              }}
            >
              Log out
            </Typography>
          ) : (
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer", userSelect: "none" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              {window.location.pathname === "/login" ? "" : "Login"}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Box>
        <Drawer open={open} onClose={() => setOpen(false)}>
          {renderDrawer()}
        </Drawer>
      </Box>
    </Box>
  );
};
export default NavBar;
