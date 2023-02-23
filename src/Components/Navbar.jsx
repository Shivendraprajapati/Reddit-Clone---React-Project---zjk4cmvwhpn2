import { auth, provider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, IconButton, useTheme } from "@mui/material";
import Menu from "@mui/material/Menu";
import React, { useContext, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { ColorModeContext, tokens } from "../Theme";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { styled } from "@mui/material/styles";
import FormDialog from "./FormDialog";

export const Navbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user] = useAuthState(auth);
  const colors = tokens(theme.palette.mode);
  function handleUser() {
    if (!user) {
      const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider);
      };
      signInWithGoogle();
    } else {
      const signUserOut = async () => {
        await signOut(auth);
      };
      signUserOut();
    }
  }
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(colors.primary[400]),
    borderRadius: "30px",
    width: "7rem",
    backgroundColor: colors.grey[900],
    "&:hover": {
      backgroundColor: colors.grey[700],
    },
  }));
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        p={1}
        backgroundColor={colors.primary[400]}
        position="fixed"
        width="100vw"
        zIndex={100}
        maxHeight="8vh"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
            alt="reddit-logo"
            width={"35vw"}
            height={"35vh"}
          />
          <h3 style={{ marginLeft: "5px" }}>reddit</h3>
        </div>

        <Box
          display="flex"
          backgroundColor={colors.grey[900]}
          borderRadius="1.5rem"
        >
          <InputBase
            sx={{ ml: 2, flex: 1, width: "35vw" }}
            placeholder="Search Reddit"
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "35vw",
          }}
        >
          {user && <FormDialog />}

          <ColorButton variant="contained">
            <QrCodeScannerIcon />
            Get App
          </ColorButton>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                {user ? (
                  <Avatar
                    src={user?.photoURL || ""}
                    sx={{ width: 32, height: 32 }}
                  />
                ) : (
                  <AccountCircleOutlinedIcon sx={{ width: 34, height: 34 }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            signInWithGoogle
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <Divider />
            <MenuItem onClick={colorMode.toggleColorMode}>
              <ListItemIcon>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon fontSize="small" />
                ) : (
                  <LightModeOutlinedIcon fontSize="small" />
                )}
              </ListItemIcon>
              Switch Theme
            </MenuItem>
            <MenuItem onClick={handleUser}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              {user ? "Logout" : "Login"}
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};
