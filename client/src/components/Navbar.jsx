import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../state/index";
import profileImage from "../asset/profile.jpeg";
import { useTheme } from "@emotion/react";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Box,
  Typography,
  Menu,
  MenuItem
} from "@mui/material";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, User }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [logout, setLogout] = useState(false);
  const handleLogout = () => setLogout(!logout);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/*  RIGHT SIDE */}
        <FlexBetween gap="1.5rem ">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                textTransform: "none",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{
                  objectFit: "cover",
                }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {User.name}
                </Typography>
                <Typography
                  fontSize="0.7rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {User.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px"
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
              <MenuItem onClick={handleLogout}>Log out
              </MenuItem>
            </Menu>
            <Typography >
                {logout && <MenuItem onClick={handleClose}>Not available at this moment</MenuItem>}
              </Typography>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
